#!/usr/bin/env python3
"""Optimize large images: resize to max 1600px width, re-encode, keep extension."""
import os
from PIL import Image

IMG = '/tmp/siteclone/images'
MAX_KB = 350
saved = 0
for root, dirs, files in os.walk(IMG):
    for f in files:
        p = os.path.join(root, f)
        size_kb = os.path.getsize(p) / 1024
        if size_kb <= MAX_KB:
            continue
        ext = f.lower().split('.')[-1]
        try:
            img = Image.open(p)
            w, h = img.size
            # resize if too wide
            if w > 1600:
                nh = int(h * 1600 / w)
                img = img.resize((1600, nh), Image.LANCZOS)
            out = img
            if ext in ('jpg', 'jpeg'):
                out = out.convert('RGB')
                out.save(p, 'JPEG', quality=82, optimize=True, progressive=True)
            elif ext == 'png':
                # convert big photos saved as png to png-8? keep png but reduce
                if img.mode in ('RGBA', 'P', 'LA'):
                    out = img.convert('RGBA')
                else:
                    out = out.convert('RGB')
                out.save(p, 'PNG', optimize=True)
            elif ext == 'webp':
                out.save(p, 'WEBP', quality=80, method=4)
            nsz = os.path.getsize(p) / 1024
            if nsz < size_kb:
                saved += (size_kb - nsz)
        except Exception as e:
            print('ERR', p, e)

print(f'Saved {saved/1024:.1f} MB total')
