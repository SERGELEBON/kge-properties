#!/usr/bin/env python3
"""Extract structured content from scraped Elementor pages into JSON."""
import re, json, os, html as htmllib
from html.parser import HTMLParser

PAGES_DIR = '/tmp/siteclone/pages'
OUT = '/tmp/siteclone/content.json'

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_main = 0
        self.skip = 0
        self.items = []
        self.cur_tag = None
        self.cur_attrs = {}
        self.text_buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get('class', '')
        if tag in ('script', 'style', 'noscript'):
            self.skip += 1
            return
        if tag == 'main':
            self.in_main += 1
            return
        if not self.in_main:
            return
        if tag == 'header' or tag == 'nav':
            self.skip += 1
            return
        if tag in ('h1','h2','h3','h4','h5','h6','p','li','blockquote','span','div'):
            if tag == 'div' and not re.search(r'elementor-(heading|text-editor|button|widget-image|image-box|icon-box)', cls):
                return
            if tag == 'span' and not re.search(r'elementor-(button|heading)', cls):
                return
            if self.cur_tag is None:
                self.cur_tag = tag
                self.cur_attrs = a
                self.text_buf = []
        elif tag == 'img':
            src = a.get('src', '')
            alt = a.get('alt', '')
            if src and self.in_main and not self.skip:
                self.items.append({'type': 'img', 'src': src, 'alt': alt})

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'noscript', 'header', 'nav'):
            if self.skip: self.skip -= 1
            return
        if tag == 'main':
            self.in_main = max(0, self.in_main - 1)
            return
        if not self.in_main or self.skip:
            return
        if tag in ('h1','h2','h3','h4','h5','h6','p','li','blockquote','div','span') and self.cur_tag == tag:
            text = ' '.join(''.join(self.text_buf).split())
            if text:
                typ = 'heading' if tag.startswith('h') else tag
                item = {'type': typ, 'level': tag if tag.startswith('h') else None, 'text': htmllib.unescape(text)}
                self.items.append(item)
            self.cur_tag = None
            self.cur_attrs = {}
            self.text_buf = []

    def handle_data(self, data):
        if self.cur_tag is not None and not self.skip:
            self.text_buf.append(data)

def extract(path):
    html = open(path, encoding='utf-8').read()
    # Slice to main content: from data-elementor-type="wp-page" to data-elementor-type="footer"
    i = html.find('data-elementor-type="wp-page"')
    j = html.find('data-elementor-type="footer"')
    if i != -1:
        html = html[i:] if j == -1 or j < i else html[i:j]
    ex = Extractor()
    if '<main' not in html:
        ex.in_main = 1  # sliced content has no main wrapper
    try:
        ex.feed(html)
    except Exception as e:
        print('parse err', path, e)
    return ex.items

result = {}
for f in sorted(os.listdir(PAGES_DIR)):
    if not f.endswith('.html'): continue
    name = f[:-5]
    items = extract(os.path.join(PAGES_DIR, f))
    clean = []
    for it in items:
        if clean and it.get('text') and clean[-1].get('text') == it['text']:
            continue
        clean.append(it)
    result[name] = clean
    print(f"{name}: {len(clean)} items")

json.dump(result, open(OUT, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print("saved", OUT)
