#!/usr/bin/env python3
import os
import shutil

src_path = "/tmp/extracted_ros/KD.ros/KD.ros"
if not os.path.exists(src_path):
    print("Source roster not found at", src_path)
    exit(1)

with open(src_path, "rb") as f:
    data = bytearray(f.read())

replacements = {
    # India
    b"S.DHAWAN\x00": b"S.GILL\x00",
    b"M.VIJAY\x00": b"Y.JAISWAL\x00",
    b"S.BINNY\x00": b"H.PANDYA\x00",
    b"S.RAINA\x00": b"S.YADAV\x00",
    b"P.PATEL\x00": b"R.PANT\x00",
    b"R.ASHWIN\x00": b"R.JADEJA\x00",
    b"S.ARVIND\x00": b"J.BUMRAH\x00",
    b"H.SINGH\x00": b"M.SIRAJ\x00",
    b"D.KULKARNI\x00": b"K.YADAV\x00",
    b"G.GAMBHIR\x00": b"K.RAHUL\x00",
    
    # Australia
    b"D.WARNER\x00": b"T.HEAD\x00",
    b"S.WATSON\x00": b"M.LABUSCH\x00",
    b"S.MARSH\x00": b"M.MARSH\x00",
    b"B.HADDIN\x00": b"A.CAREY\x00",
    b"X.DOHERTY\x00": b"A.ZAMPA\x00",
    b"M.JOHNSON\x00": b"N.LYON\x00",
    
    # England
    b"E.MORGAN\x00": b"B.STOKES\x00",
    b"A.COOK\x00": b"H.BROOK\x00",
    b"I.BELL\x00": b"J.BAIRSTOW\x00",
    b"R.BOPARA\x00": b"L.LIVING\x00",
    b"S.FINN\x00": b"C.WOAKES\x00",
    b"J.ANDERSON\x00": b"J.ARCHER\x00",
    b"S.BROAD\x00": b"M.WOOD\x00",
    b"J.ROY\x00": b"R.AHMED\x00",
    
    # South Africa
    b"V.PHILANDER\x00": b"T.BAVUMA\x00",
    b"K.ABBOTT\x00": b"Q.DE KOCK\x00",
    b"P.DUMINY\x00": b"A.MARKRAM\x00",
    b"E.VILLIERS\x00": b"H.KLAASEN\x00",
    b"C.MORRIS\x00": b"M.JANSEN\x00",
    b"I.TAHIR\x00": b"K.MAHARAJ\x00",
    b"A.PHANGISO\x00": b"A.NORTJE\x00",
    b"D.WIESE\x00": b"L.NGIDI\x00",
    
    # Pakistan
    b"M.HAFIZ\x00": b"B.AZAM\x00",
    b"S.MALIK\x00": b"M.RIZWAN\x00",
    b"A.SHEHZAD\x00": b"F.ZAMAN\x00",
    b"N.JAMSHED\x00": b"S.AYUB\x00",
    b"S.MAQSOOD\x00": b"I.AHMED\x00",
    b"Y.SHAH\x00": b"N.SHAH\x00",
    b"W.RIAZ\x00": b"H.RAUF\x00",
    b"J.KHAN\x00": b"A.JAMAL\x00",
    b"H.SOHAIL\x00": b"A.SALMAN\x00",
    
    # New Zealand
    b"M.GUPTILL\x00": b"D.CONWAY\x00",
    b"R.TAYLOR\x00": b"D.MITCHELL\x00",
    b"C.ANDERSON\x00": b"G.PHILLIPS\x00",
    b"D.VETTORI\x00": b"R.RAVINDRA\x00",
    b"D.BRACEWELL\x00": b"M.SANTNER\x00",
    b"A.MILNE\x00": b"L.FERGUSON\x00",
}

replaced = 0
for old, new in replacements.items():
    pos = data.find(old)
    if pos != -1:
        pad_len = len(old) - len(new)
        replacement = new + (b"\x00" * pad_len)
        data[pos:pos+len(old)] = replacement
        replaced += 1
        print(f"Replaced {old.decode('latin1', 'ignore')} -> {new.decode('latin1', 'ignore')} at 0x{pos:X}")
    else:
        print(f"Not found: {old.decode('latin1', 'ignore')}")

print(f"Successfully replaced {replaced}/{len(replacements)} player slots.")

# Output modern roster
os.makedirs("public/rosters/MODERN26.ros", exist_ok=True)
with open("public/rosters/MODERN26.ros/MODERN26.ros", "wb") as f:
    f.write(data)
with open("public/rosters/MODERN26.ros_file", "wb") as f:
    f.write(data)

print("Generated public/rosters/MODERN26.ros/MODERN26.ros successfully.")

