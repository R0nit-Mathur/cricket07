#!/usr/bin/env python3
"""
EA Sports Cricket 07 - FSH (SHPI) Texture Converter & Asset Pipeline
Converts standard PNG images into authentic EA Sports .fsh files with 0 external dependencies.
Format: 32-bit ARGB8888 (FSH code 0x7D), fully uncompressed for pristine HD texture quality.
"""

import os
import sys
import zlib
import struct

def read_png_rgba(data: bytes):
    """Zero-dependency pure Python PNG decoder using zlib."""
    if data[:8] != b'\x89PNG\r\n\x1a\n':
        raise ValueError('Invalid PNG header')
    pos = 8
    w = h = bit_depth = color_type = None
    idat = []
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        ctype = data[pos+4:pos+8]
        chunk = data[pos+8:pos+8+length]
        pos += 12 + length
        if ctype == b'IHDR':
            w, h, bit_depth, color_type = struct.unpack('>IIBB', chunk[:10])
        elif ctype == b'IDAT':
            idat.append(chunk)
        elif ctype == b'IEND':
            break

    raw = zlib.decompress(b''.join(idat))
    bpp = 4 if color_type == 6 else (3 if color_type == 2 else 1)
    if bpp not in (3, 4):
        raise ValueError(f'Unsupported PNG color type: {color_type} (must be RGB or RGBA)')
    
    stride = w * bpp
    out = bytearray(w * h * 4)
    line_len = stride + 1
    prev = bytearray(stride)
    curr = bytearray(stride)

    for y in range(h):
        off = y * line_len
        ft = raw[off]
        line = raw[off+1:off+1+stride]
        for x in range(stride):
            v = line[x]
            a = curr[x - bpp] if x >= bpp else 0
            b = prev[x]
            c = prev[x - bpp] if x >= bpp else 0
            if ft == 0: val = v
            elif ft == 1: val = (v + a) & 0xff
            elif ft == 2: val = (v + b) & 0xff
            elif ft == 3: val = (v + ((a + b) >> 1)) & 0xff
            elif ft == 4:
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                val = (v + pr) & 0xff
            else:
                val = v
            curr[x] = val
        prev[:] = curr

        row_out = y * w * 4
        if bpp == 4:
            for x in range(w):
                px = x * 4
                out[row_out + px] = curr[px + 2]     # B
                out[row_out + px + 1] = curr[px + 1] # G
                out[row_out + px + 2] = curr[px]     # R
                out[row_out + px + 3] = curr[px + 3] # A
        else:
            for x in range(w):
                px = x * 3
                opx = x * 4
                out[row_out + opx] = curr[px + 2]    # B
                out[row_out + opx + 1] = curr[px + 1]# G
                out[row_out + opx + 2] = curr[px]    # R
                out[row_out + opx + 3] = 255         # A
    return w, h, bytes(out)

def encode_fsh(width: int, height: int, bgra_data: bytes, tag: bytes = b'0000') -> bytes:
    """Encodes raw BGRA pixel data into an EA Sports SHPI/FSH binary."""
    # FSH Image Header (16 bytes):
    # byte 0: code 0x7D (ARGB8888)
    # bytes 1-3: padding (0,0,0)
    # bytes 4-5: width (u16 le)
    # bytes 6-7: height (u16 le)
    # bytes 8-15: misc metadata / center coordinates
    img_hdr = struct.pack('<BBBBHH', 0x7D, 0, 0, 0, width, height) + b'\x00' * 8
    img_payload = img_hdr + bgra_data

    # Directory entry is 8 bytes per image (4-byte tag + 4-byte offset)
    header_size = 16 + 8
    total_size = header_size + len(img_payload)

    # SHPI Header (16 bytes):
    # bytes 0-3: 'SHPI'
    # bytes 4-7: total file length
    # bytes 8-11: number of directory entries (1)
    # bytes 12-15: directory tag / magic ('G264')
    shpi_hdr = b'SHPI' + struct.pack('<II', total_size, 1) + b'G264'
    dir_entry = tag.ljust(4, b'\x00')[:4] + struct.pack('<I', header_size)

    return shpi_hdr + dir_entry + img_payload

def convert_png_to_fsh(png_path: str, fsh_path: str, tag: bytes = b'0000'):
    with open(png_path, 'rb') as f:
        png_data = f.read()
    w, h, bgra = read_png_rgba(png_data)
    fsh_data = encode_fsh(w, h, bgra, tag)
    os.makedirs(os.path.dirname(fsh_path) or '.', exist_ok=True)
    with open(fsh_path, 'wb') as f:
        f.write(fsh_data)
    print(f'[fsh-pack] {png_path} ({w}x{h}) -> {fsh_path} ({len(fsh_data)} bytes)')

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: pack_fsh.py <input.png> <output.fsh> [tag=0000]')
        sys.exit(1)
    tag = sys.argv[3].encode('latin1') if len(sys.argv) > 3 else b'0000'
    convert_png_to_fsh(sys.argv[1], sys.argv[2], tag)
