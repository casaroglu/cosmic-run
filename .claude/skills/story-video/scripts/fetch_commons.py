#!/usr/bin/env python3
"""Download public-domain images for a story from Wikimedia Commons.

Every entry in the story's "images" that has a "search" query and whose file is
missing gets searched on Commons; the largest PUBLIC-DOMAIN match (preferring
titles containing "prefer") is downloaded to the entry's "file" path.
Wikimedia's robot policy needs a contact in the User-Agent: set COMMONS_CONTACT
(a URL or e-mail you are happy to share with Wikimedia).

usage: COMMONS_CONTACT=https://github.com/you/repo fetch_commons.py STORY.json
"""
import json, os, sys, time, urllib.error, urllib.parse, urllib.request

contact = os.environ.get("COMMONS_CONTACT")
if not contact:
    sys.exit("set COMMONS_CONTACT (URL or e-mail) - required by Wikimedia's robot policy")
UA = {"User-Agent": f"story-video/1.0 ({contact}) python-urllib"}


def get(url, binary=False):
    for attempt in range(6):
        try:
            r = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60)
            return r.read() if binary else json.load(r)
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
            print("  429 - backing off", flush=True)
            time.sleep(30 * (attempt + 1))
    sys.exit("Wikimedia keeps rate-limiting this IP; try later or from another network")


story_path = sys.argv[1]
story = json.load(open(story_path))
base = os.path.dirname(os.path.abspath(story_path))
for key, img in story.get("images", {}).items():
    dest = os.path.join(base, img["file"])
    if os.path.exists(dest) or not img.get("search"):
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    r = get("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query", "generator": "search", "gsrsearch": img["search"] + " filetype:bitmap",
        "gsrnamespace": 6, "gsrlimit": 8, "prop": "imageinfo", "iiprop": "url|size|extmetadata",
        "iiurlwidth": 2560, "format": "json"}))
    cands = []
    for p in r.get("query", {}).get("pages", {}).values():
        ii = p["imageinfo"][0]
        lic = ii.get("extmetadata", {}).get("LicenseShortName", {}).get("value", "").lower()
        if "public domain" in lic and min(ii["width"], ii["height"]) >= 800:
            pref = img.get("prefer", "").lower()
            cands.append((bool(pref) and pref in p["title"].lower(), ii["width"] * ii["height"], p["title"], ii))
    if not cands:
        print(f"{key}: no public-domain match for {img['search']!r}")
        continue
    _, _, title, ii = max(cands, key=lambda c: (c[0], c[1]))
    time.sleep(4)
    data = get(ii.get("thumburl") if ii["width"] > 2560 else ii["url"], binary=True)
    if data[:3] != b"\xff\xd8\xff":
        print(f"{key}: download was not a JPEG, skipped")
        continue
    open(dest, "wb").write(data)
    print(f"{key}: {title} -> {img['file']} ({len(data) // 1024} KB)  {ii.get('descriptionurl')}")
    time.sleep(6)
