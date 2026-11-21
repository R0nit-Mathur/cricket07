/**
 * download-worker.js — off-thread file downloader for Cricket 07 Web
 *
 * Receives: { type: 'download', base: string, root: string, jobs: Array<{ f, dest, renameTo? }> }
 * Sends:
 *   { type: 'net', n: number }          — bytes received in this chunk
 *   { type: 'note', text: string }       — human-readable progress note
 *   { type: 'done' }                     — all jobs finished
 *   { type: 'error', message: string }   — fatal error
 *   { type: 'unsupported', message }     — OPFS or fetch not available
 */

'use strict';

// Check OPFS availability
if (typeof self.navigator === 'undefined' || !('storage' in self.navigator)) {
  self.postMessage({ type: 'unsupported', message: 'StorageManager not available in this Worker context' });
}

self.onmessage = async (ev) => {
  const { type, base, root, jobs } = ev.data;
  if (type !== 'download') return;

  // Verify OPFS is available
  let rootDir;
  try {
    rootDir = await navigator.storage.getDirectory();
  } catch (e) {
    self.postMessage({ type: 'unsupported', message: 'OPFS not available: ' + e.message });
    return;
  }

  // Resolve the game directory handle
  async function getDir(handle, path) {
    const parts = path.split('/').filter(Boolean);
    let cur = handle;
    for (const part of parts) {
      cur = await cur.getDirectoryHandle(part, { create: true });
    }
    return cur;
  }

  // Write a stream into an OPFS file
  async function writeFile(dirHandle, name, response) {
    const fileHandle = await dirHandle.getFileHandle(name, { create: true });
    const writable = await fileHandle.createWritable({ keepExistingData: false });
    const reader = response.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await writable.write(value);
        self.postMessage({ type: 'net', n: value.byteLength });
      }
      await writable.close();
    } catch (e) {
      await writable.abort();
      throw e;
    }
  }

  const gameDir = root ? await getDir(rootDir, root) : rootDir;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const { f, dest, renameTo } = job;

    // dest path may be like "data/Cricket07.cracked.exe" — split into dir + filename
    const destParts = dest.split('/');
    const destName = destParts.pop();
    const destDir = destParts.length ? await getDir(gameDir, destParts.join('/')) : gameDir;

    const url = base + (f.path || dest);
    self.postMessage({ type: 'note', text: `Downloading ${destName} (${i + 1}/${jobs.length})…` });

    try {
      const resp = await fetch(url, { cache: 'no-store' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${url}`);
      await writeFile(destDir, destName, resp);
    } catch (e) {
      self.postMessage({ type: 'error', message: e.message });
      return;
    }

    // If the game wants a rename after a .part write, do it now
    if (renameTo) {
      const finalParts = renameTo.split('/');
      const finalName = finalParts.pop();
      const finalDir = finalParts.length ? await getDir(gameDir, finalParts.join('/')) : gameDir;
      try {
        // Move: read + rewrite under new name, delete old
        const srcHandle = await destDir.getFileHandle(destName);
        const srcFile = await srcHandle.getFile();
        const dstHandle = await finalDir.getFileHandle(finalName, { create: true });
        const writable = await dstHandle.createWritable({ keepExistingData: false });
        await writable.write(await srcFile.arrayBuffer());
        await writable.close();
        await destDir.removeEntry(destName);
      } catch (e) {
        // non-fatal: file may already be in final location
        console.warn('[download-worker] rename failed:', e.message);
      }
    }
  }

  self.postMessage({ type: 'done' });
};
