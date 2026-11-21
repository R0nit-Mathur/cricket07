// High-Fidelity AudioWorklet for EA Sports Cricket 07 / Cricket 11
// Features zero-allocation linear interpolation resampling for 44.1kHz -> 48kHz/96kHz hardware.
class C07Ring extends AudioWorkletProcessor {
  constructor() {
    super();
    this.memory = null;
    this.base = 0;
    this.srcPos = 0;
    this.port.onmessage = (e) => {
      this.memory = e.data.memory;
      this.base = e.data.ring;
    };
  }

  process(inputs, outputs) {
    const out = outputs[0];
    const L = out[0], R = out[1] || out[0];
    if (!this.memory) { L.fill(0); R.fill(0); return true; }

    const buf = this.memory.buffer;
    if (!this.u32 || this.u32.buffer !== buf) {
      this.u32 = new Uint32Array(buf);
      this.f32 = new Float32Array(buf);
    }

    const hdr = this.base >> 2;
    const inRate = this.u32[hdr + 2] || 44100;
    const frames = this.u32[hdr + 3];
    const data = hdr + 4;

    const w = Atomics.load(this.u32, hdr);
    const r = Atomics.load(this.u32, hdr + 1);
    const avail = (w - r) >>> 0;

    const ratio = inRate / sampleRate;

    if (Math.abs(ratio - 1.0) < 0.001) {
      // 1:1 match
      const n = Math.min(avail, L.length);
      for (let i = 0; i < n; i++) {
        const k = ((r + i) >>> 0) % frames;
        L[i] = this.f32[data + 2 * k];
        R[i] = this.f32[data + 2 * k + 1];
      }
      for (let i = n; i < L.length; i++) { L[i] = 0; R[i] = 0; }
      Atomics.store(this.u32, hdr + 1, (r + n) >>> 0);
    } else {
      // Linear interpolation resampler
      let pos = this.srcPos || 0;
      let filled = 0;
      for (let i = 0; i < L.length; i++) {
        const readIdx = Math.floor(pos);
        if (readIdx + 1 >= avail) {
          for (let j = i; j < L.length; j++) { L[j] = 0; R[j] = 0; }
          break;
        }
        const frac = pos - readIdx;
        const k0 = ((r + readIdx) >>> 0) % frames;
        const k1 = ((r + readIdx + 1) >>> 0) % frames;
        const l0 = this.f32[data + 2 * k0], l1 = this.f32[data + 2 * k1];
        const r0 = this.f32[data + 2 * k0 + 1], r1 = this.f32[data + 2 * k1 + 1];
        L[i] = l0 + (l1 - l0) * frac;
        R[i] = r0 + (r1 - r0) * frac;
        pos += ratio;
        filled++;
      }
      const wholeSteps = Math.floor(pos);
      this.srcPos = pos - wholeSteps;
      if (wholeSteps > 0) {
        Atomics.store(this.u32, hdr + 1, (r + wholeSteps) >>> 0);
      }
    }
    return true;
  }
}

registerProcessor('c07-ring', C07Ring);
registerProcessor('rc-ring', C07Ring);
