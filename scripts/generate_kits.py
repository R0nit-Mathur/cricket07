#!/usr/bin/env python3
"""
Procedural 2026 HD Kit & Asset Generator for EA Sports Cricket 07
Generates authentic high-res 1024x1024 jersey, pitch, adboard and ball textures
and compiles them into EA Sports SHPI (.fsh) binary format.
Zero external dependencies (pure Python standard library).
"""

import os
import sys
import math
import struct
import zlib

class ImageCanvas:
    """Pure-Python RGBA drawing canvas."""
    def __init__(self, width: int, height: int, bg=(0, 0, 0, 0)):
        self.width = width
        self.height = height
        self.data = bytearray(width * height * 4)
        if bg != (0, 0, 0, 0):
            r, g, b, a = bg
            for i in range(0, len(self.data), 4):
                self.data[i] = r
                self.data[i+1] = g
                self.data[i+2] = b
                self.data[i+3] = a

    def set_pixel(self, x: int, y: int, color):
        if 0 <= x < self.width and 0 <= y < self.height:
            idx = (y * self.width + x) * 4
            r, g, b, a = color
            if a == 255 or self.data[idx+3] == 0:
                self.data[idx] = r
                self.data[idx+1] = g
                self.data[idx+2] = b
                self.data[idx+3] = a
            else:
                # Alpha blend
                alpha = a / 255.0
                inv_a = 1.0 - alpha
                self.data[idx] = int(r * alpha + self.data[idx] * inv_a)
                self.data[idx+1] = int(g * alpha + self.data[idx+1] * inv_a)
                self.data[idx+2] = int(b * alpha + self.data[idx+2] * inv_a)
                self.data[idx+3] = min(255, int(a + self.data[idx+3] * inv_a))

    def fill_rect(self, x0: int, y0: int, w: int, h: int, color):
        x1 = max(0, min(self.width, x0 + w))
        y1 = max(0, min(self.height, y0 + h))
        x0 = max(0, x0)
        y0 = max(0, y0)
        for y in range(y0, y1):
            row_idx = (y * self.width + x0) * 4
            for x in range(x0, x1):
                self.set_pixel(x, y, color)

    def draw_stripe(self, x0: int, y0: int, x1: int, y1: int, thickness: int, color):
        # Bresenham-like thick line
        dx = x1 - x0
        dy = y1 - y0
        dist = math.hypot(dx, dy)
        if dist == 0:
            return
        steps = int(dist * 2)
        half_t = thickness / 2.0
        for s in range(steps):
            t = s / steps
            cx = x0 + dx * t
            cy = y0 + dy * t
            for ox in range(int(-half_t), int(half_t) + 1):
                for oy in range(int(-half_t), int(half_t) + 1):
                    if ox*ox + oy*oy <= half_t * half_t:
                        self.set_pixel(int(cx + ox), int(cy + oy), color)

    def draw_circle(self, cx: int, cy: int, radius: int, color, fill=True):
        r2 = radius * radius
        for y in range(max(0, cy - radius), min(self.height, cy + radius + 1)):
            for x in range(max(0, cx - radius), min(self.width, cx + radius + 1)):
                d2 = (x - cx)**2 + (y - cy)**2
                if fill and d2 <= r2:
                    self.set_pixel(x, y, color)
                elif not fill and abs(d2 - r2) <= radius * 2:
                    self.set_pixel(x, y, color)

    def draw_text_badge(self, x0: int, y0: int, w: int, h: int, text: str, bg_color, text_color):
        """Draws a clean stylized rectangular sponsor/team badge."""
        self.fill_rect(x0, y0, w, h, bg_color)
        # Inner border
        border_col = (min(255, bg_color[0] + 40), min(255, bg_color[1] + 40), min(255, bg_color[2] + 40), 255)
        for x in range(x0, x0 + w):
            self.set_pixel(x, y0, border_col)
            self.set_pixel(x, y0 + h - 1, border_col)
        for y in range(y0, y0 + h):
            self.set_pixel(x0, y, border_col)
            self.set_pixel(x0 + w - 1, y, border_col)
        # Draw bold geometric block letter representation for crisp low-res visibility
        pad_x = 8
        avail_w = w - pad_x * 2
        char_w = max(4, avail_w // max(1, len(text)))
        for i, ch in enumerate(text):
            cx = x0 + pad_x + i * char_w
            cy = y0 + h // 4
            cw = max(3, char_w - 3)
            ch_h = h // 2
            # Draw bold geometric glyph
            self.fill_rect(cx, cy, cw, ch_h, text_color)

    def to_bgra(self) -> bytes:
        out = bytearray(len(self.data))
        for i in range(0, len(self.data), 4):
            out[i] = self.data[i+2]     # B
            out[i+1] = self.data[i+1]   # G
            out[i+2] = self.data[i]     # R
            out[i+3] = self.data[i+3]   # A
        return bytes(out)

    def to_fsh(self, tag: bytes = b'0000') -> bytes:
        bgra = self.to_bgra()
        img_hdr = struct.pack('<BBBBHH', 0x7D, 0, 0, 0, self.width, self.height) + b'\x00' * 8
        img_payload = img_hdr + bgra
        header_size = 16 + 8
        total_size = header_size + len(img_payload)
        shpi_hdr = b'SHPI' + struct.pack('<II', total_size, 1) + b'G264'
        dir_entry = tag.ljust(4, b'\x00')[:4] + struct.pack('<I', header_size)
        return shpi_hdr + dir_entry + img_payload


def generate_jersey(primary, secondary, accent, team_name, sponsor, pattern='stripes'):
    """Generates an authentic UV-mapped cricket jersey layout (1024x1024)."""
    c = ImageCanvas(1024, 1024, primary)

    # UV layout in Cricket 07:
    # 0,0 to 512,512: Torso Front
    # 512,0 to 1024,512: Torso Back
    # 0,512 to 512,1024: Sleeves & Collar
    # 512,512 to 1024,1024: Trousers & Pads

    # 1. Torso Front:
    # Collar & shoulder accents
    c.fill_rect(100, 20, 312, 60, secondary)
    c.draw_circle(256, 40, 45, accent, fill=False)

    # Chest sponsor banner
    c.draw_text_badge(120, 220, 272, 70, sponsor, secondary, accent)

    # Team crest on left chest
    c.draw_circle(170, 140, 30, accent, fill=True)
    c.draw_circle(170, 140, 24, primary, fill=True)

    # Design patterns
    if pattern == 'stripes':
        for x in range(120, 390, 40):
            c.draw_stripe(x, 100, x - 20, 480, 8, secondary)
    elif pattern == 'wings':
        c.draw_stripe(80, 80, 240, 480, 14, secondary)
        c.draw_stripe(432, 80, 272, 480, 14, secondary)
        c.draw_stripe(90, 100, 230, 480, 6, accent)
        c.draw_stripe(422, 100, 282, 480, 6, accent)
    elif pattern == 'modern_slash':
        c.draw_stripe(60, 480, 450, 100, 24, secondary)
        c.draw_stripe(80, 480, 470, 100, 10, accent)

    # 2. Torso Back:
    c.fill_rect(512 + 100, 20, 312, 60, secondary)
    # Team name across upper back
    c.draw_text_badge(512 + 150, 100, 212, 45, team_name, secondary, accent)
    # Number zone (clean primary background)
    c.draw_circle(512 + 256, 260, 90, secondary, fill=False)

    # 3. Sleeves & Accents:
    c.fill_rect(40, 560, 200, 400, secondary)
    c.fill_rect(272, 560, 200, 400, secondary)
    c.draw_stripe(40, 920, 240, 920, 20, accent)
    c.draw_stripe(272, 920, 472, 920, 20, accent)

    # 4. Trousers:
    c.fill_rect(540, 540, 440, 440, primary)
    # Side stripes
    c.draw_stripe(580, 540, 580, 980, 20, secondary)
    c.draw_stripe(600, 540, 600, 980, 10, accent)
    c.draw_stripe(940, 540, 940, 980, 20, secondary)
    c.draw_stripe(920, 540, 920, 980, 10, accent)

    return c

def generate_pitch():
    """Generates a high-res authentic cricket pitch (1024x512)."""
    c = ImageCanvas(1024, 512, (186, 150, 106, 255)) # Warm red clay / loam pitch base
    # Soil grain and grass edges
    for y in range(0, 512):
        for x in range(0, 1024):
            # Edge grass blend
            if y < 35 or y > 475:
                blend = math.sin((y / 512.0) * math.pi)
                if (x + y * 7) % 5 == 0:
                    c.set_pixel(x, y, (46, 125, 50, 255))
            # Subtle pitch soil variations
            if (x * 13 + y * 23) % 29 == 0:
                c.set_pixel(x, y, (168, 134, 92, 255))
            elif (x * 17 + y * 19) % 31 == 0:
                c.set_pixel(x, y, (202, 168, 122, 255))

    # Popping Creases & Bowling Creases (Bright Crisp White)
    white = (245, 245, 245, 255)
    # Crease 1 (Batting end, left: x=140)
    c.fill_rect(140, 60, 4, 392, white)
    # Return creases
    c.fill_rect(140, 150, 80, 4, white)
    c.fill_rect(140, 360, 80, 4, white)

    # Crease 2 (Bowling end, right: x=884)
    c.fill_rect(884, 60, 4, 392, white)
    # Return creases
    c.fill_rect(804, 150, 80, 4, white)
    c.fill_rect(804, 360, 80, 4, white)

    # Worn foothole marks near batting/bowling creases
    worn = (145, 115, 80, 255)
    c.fill_rect(170, 220, 35, 70, worn)
    c.fill_rect(820, 220, 35, 70, worn)

    return c

def generate_adboards():
    """Generates 2026 TATA IPL perimeter boundary boards (2048x128)."""
    c = ImageCanvas(2048, 128, (15, 23, 42, 255))
    sponsors = [
        ("TATA IPL", (0, 75, 160, 255), (255, 255, 255, 255)),
        ("DREAM11", (215, 25, 32, 255), (255, 255, 255, 255)),
        ("RUPAY", (0, 114, 206, 255), (255, 102, 0, 255)),
        ("CEAT", (0, 48, 135, 255), (255, 103, 31, 255)),
        ("ARAMCO", (0, 132, 61, 255), (255, 255, 255, 255)),
        ("JIOCINEMA", (230, 0, 126, 255), (255, 255, 255, 255)),
        ("ANGEL ONE", (249, 115, 22, 255), (255, 255, 255, 255)),
        ("VISIT SAUDI", (16, 185, 129, 255), (255, 255, 255, 255)),
    ]
    slot_w = 2048 // len(sponsors)
    for i, (name, bg, fg) in enumerate(sponsors):
        sx = i * slot_w
        c.fill_rect(sx + 8, 12, slot_w - 16, 104, bg)
        c.draw_text_badge(sx + 24, 32, slot_w - 48, 64, name, bg, fg)
    return c

def generate_ball():
    """Generates official White Kookaburra Turf ball (256x256)."""
    c = ImageCanvas(256, 256, (0, 0, 0, 0))
    # Ball sphere
    ball_white = (248, 250, 252, 255)
    c.draw_circle(128, 128, 120, ball_white, fill=True)
    # Seam (dark green thread with double parallel stitches)
    seam_col = (20, 83, 45, 255)
    gold_badge = (217, 119, 6, 255)
    c.draw_stripe(128, 10, 128, 246, 6, seam_col)
    for y in range(20, 236, 8):
        c.draw_stripe(123, y, 133, y + 4, 2, seam_col)
    # Kookaburra Gold Emblem
    c.draw_circle(85, 128, 18, gold_badge, fill=True)
    c.draw_circle(85, 128, 12, ball_white, fill=True)
    return c

def main():
    out_dir = sys.argv[1] if len(sys.argv) > 1 else 'public/patch'
    os.makedirs(out_dir, exist_ok=True)
    print(f'[asset-gen] Generating 2026 Remaster HD Kits & Textures into {out_dir}...')

    kits = [
        # (filename, primary, secondary, accent, team_name, sponsor, pattern)
        ('c032.fsh', (11, 35, 65, 255), (255, 111, 0, 255), (255, 255, 255, 255), 'INDIA', 'DREAM11', 'stripes'),
        ('c002.fsh', (255, 209, 0, 255), (0, 71, 27, 255), (255, 255, 255, 255), 'AUSTRALIA', 'ALINTA', 'wings'),
        ('c040.fsh', (253, 185, 19, 255), (0, 51, 102, 255), (242, 101, 34, 255), 'CSK', 'EUROGRIP', 'wings'),
        ('c041.fsh', (0, 75, 160, 255), (209, 171, 62, 255), (255, 255, 255, 255), 'MUMBAI', 'SLICE', 'modern_slash'),
        ('c042.fsh', (215, 25, 32, 255), (28, 28, 28, 255), (225, 169, 56, 255), 'RCB', 'QATAR', 'wings'),
        ('c043.fsh', (58, 34, 93, 255), (243, 190, 18, 255), (255, 255, 255, 255), 'KKR', 'JOY', 'modern_slash'),
        ('c048.fsh', (27, 33, 51, 255), (200, 160, 98, 255), (0, 200, 230, 255), 'TITANS', 'ATHER', 'modern_slash'),
        ('c045.fsh', (242, 101, 34, 255), (17, 17, 17, 255), (255, 200, 0, 255), 'SUNRISERS', 'DREAM11', 'wings'),
        ('c044.fsh', (234, 26, 133, 255), (37, 74, 165, 255), (255, 255, 255, 255), 'ROYALS', 'LUMINOUS', 'stripes'),
        ('c046.fsh', (0, 76, 151, 255), (227, 27, 35, 255), (255, 255, 255, 255), 'CAPITALS', 'HERO', 'modern_slash'),
        ('c049.fsh', (0, 163, 224, 255), (20, 30, 55, 255), (255, 120, 0, 255), 'GIANTS', 'MY11CIRCLE', 'wings'),
        ('c047.fsh', (215, 25, 32, 255), (253, 185, 19, 255), (255, 255, 255, 255), 'PUNJAB', 'DREAM11', 'stripes'),
    ]

    for fname, p, s, a, name, sponsor, pat in kits:
        canvas = generate_jersey(p, s, a, name, sponsor, pat)
        fsh_bytes = canvas.to_fsh()
        out_path = os.path.join(out_dir, fname)
        with open(out_path, 'wb') as f:
            f.write(fsh_bytes)
        print(f'  ✓ Kit generated: {fname} -> {name} ({len(fsh_bytes)} bytes)')

    # Pitch & Turf
    pitch = generate_pitch()
    with open(os.path.join(out_dir, 'pitch.fsh'), 'wb') as f:
        f.write(pitch.to_fsh())
    print('  ✓ HD Pitch generated: pitch.fsh')

    # Adboards
    adboards = generate_adboards()
    with open(os.path.join(out_dir, 'adboards.fsh'), 'wb') as f:
        f.write(adboards.to_fsh())
    print('  ✓ TATA IPL Perimeter Adboards generated: adboards.fsh')

    # White Match Ball
    ball = generate_ball()
    with open(os.path.join(out_dir, 'ball.fsh'), 'wb') as f:
        f.write(ball.to_fsh())
    print('  ✓ Official White Kookaburra Match Ball generated: ball.fsh')

    print('[asset-gen] Complete! All 2026 Kits & Stadium Textures generated successfully.')

if __name__ == '__main__':
    main()
