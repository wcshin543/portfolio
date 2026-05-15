#!/usr/bin/env python3
"""
Notion 업로드 스크립트 — 신완철
사용법:
  python notion_upload.py 주간보고 "C:/path/to/주간보고.docx"
  python notion_upload.py 완료보고서 "C:/path/to/완료보고서.docx"

환경 변수:
  NOTION_TOKEN  : Notion Integration Secret Token (secret_xxx...)
  NOTION_PAGE_ID: 부모 페이지 ID (기본값: c8713b58832a4494aff10e862ddafe12)
"""

import os
import sys
import json
import zipfile
import re
import urllib.request
import urllib.error
from datetime import datetime, timezone

NOTION_TOKEN   = os.environ.get("NOTION_TOKEN", "")
NOTION_PAGE_ID = os.environ.get("NOTION_PAGE_ID", "c8713b58832a4494aff10e862ddafe12")
NOTION_API     = "https://api.notion.com/v1"
NOTION_VERSION = "2022-06-28"

# ── 유틸 ──────────────────────────────────────────────────

def notion_request(method, path, body=None):
    url = f"{NOTION_API}{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(
        url, data=data, method=method,
        headers={
            "Authorization": f"Bearer {NOTION_TOKEN}",
            "Notion-Version": NOTION_VERSION,
            "Content-Type": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(f"[오류] Notion API {e.code}: {e.read().decode()}")
        sys.exit(1)

def extract_docx_paragraphs(path):
    """docx에서 단락 목록을 추출합니다."""
    try:
        with zipfile.ZipFile(path) as z:
            with z.open("word/document.xml") as f:
                xml = f.read().decode("utf-8")
    except Exception as e:
        print(f"[오류] 파일을 읽을 수 없습니다: {e}")
        sys.exit(1)

    # <w:p> 단락별로 텍스트 추출
    paragraphs = []
    for para in re.findall(r'<w:p[ >].*?</w:p>', xml, re.DOTALL):
        texts = re.findall(r'<w:t[^>]*>([^<]*)</w:t>', para)
        text = "".join(texts).strip()
        if text:
            paragraphs.append(text)
    return paragraphs

def extract_txt(path):
    with open(path, encoding="utf-8", errors="ignore") as f:
        return [l.rstrip() for l in f if l.strip()]

def read_file(path):
    ext = os.path.splitext(path)[1].lower()
    if ext == ".docx":
        return extract_docx_paragraphs(path)
    elif ext in (".txt", ".md"):
        return extract_txt(path)
    else:
        print(f"[오류] 지원하지 않는 파일 형식: {ext}  (.docx / .txt / .md 만 가능)")
        sys.exit(1)

# ── Notion 블록 생성 ──────────────────────────────────────

def rich_text(text):
    return [{"type": "text", "text": {"content": text[:2000]}}]

def heading2_block(text):
    return {"object": "block", "type": "heading_2",
            "heading_2": {"rich_text": rich_text(text)}}

def heading3_block(text):
    return {"object": "block", "type": "heading_3",
            "heading_3": {"rich_text": rich_text(text)}}

def para_block(text):
    return {"object": "block", "type": "paragraph",
            "paragraph": {"rich_text": rich_text(text)}}

def bullet_block(text):
    return {"object": "block", "type": "bulleted_list_item",
            "bulleted_list_item": {"rich_text": rich_text(text)}}

def divider_block():
    return {"object": "block", "type": "divider", "divider": {}}

def callout_block(text, icon="📋"):
    return {"object": "block", "type": "callout",
            "callout": {"rich_text": rich_text(text), "icon": {"type": "emoji", "emoji": icon}}}

def paragraphs_to_blocks(paragraphs):
    """단락 목록을 Notion 블록으로 변환합니다."""
    blocks = []
    for p in paragraphs:
        stripped = p.strip()
        if not stripped:
            continue
        # 제목 패턴 감지
        if stripped.startswith("■") or stripped.startswith("【"):
            blocks.append(heading3_block(stripped))
        elif stripped.startswith("□") or stripped.startswith("▶"):
            blocks.append(heading3_block(stripped.lstrip("□▶ ")))
        # 글머리 기호 패턴
        elif stripped.startswith(("-", "·", "•", "○", "·")):
            blocks.append(bullet_block(stripped.lstrip("-·•○ ")))
        elif re.match(r'^[\d]+[.)\.]', stripped):
            blocks.append(bullet_block(stripped))
        else:
            blocks.append(para_block(stripped))
    return blocks

# ── 메인 ──────────────────────────────────────────────────

def create_page(doc_type, file_path):
    if not NOTION_TOKEN:
        print("[오류] NOTION_TOKEN 환경 변수가 설정되지 않았습니다.")
        print("  set NOTION_TOKEN=secret_xxxxxxxx  (Windows)")
        sys.exit(1)

    filename = os.path.basename(file_path)
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y.%m.%d")

    paragraphs = read_file(file_path)
    content_blocks = paragraphs_to_blocks(paragraphs)

    # 제목 결정
    if doc_type == "주간보고":
        title = f"📅 {date_str} 주간 업무 보고"
        icon = "📅"
    elif doc_type == "완료보고서":
        title = f"✅ {date_str} 프로젝트 완료 보고서"
        icon = "✅"
    else:
        title = f"📄 {date_str} {doc_type}"
        icon = "📄"

    # 상단 메타 블록
    meta_blocks = [
        callout_block(f"파일: {filename}  |  업로드: {now.strftime('%Y-%m-%d %H:%M')} KST", icon),
        divider_block(),
    ]
    all_blocks = meta_blocks + content_blocks[:95]  # Notion API 한번에 100블록 제한

    page_body = {
        "parent": {"type": "page_id", "page_id": NOTION_PAGE_ID},
        "icon": {"type": "emoji", "emoji": icon},
        "properties": {
            "title": {"title": rich_text(title)}
        },
        "children": all_blocks,
    }

    print(f"[{doc_type}] '{title}' 페이지 생성 중...")
    result = notion_request("POST", "/pages", page_body)
    page_id = result.get("id", "")
    page_url = result.get("url", "")

    # 100블록 초과 시 추가 append
    if len(content_blocks) > 95:
        remaining = content_blocks[95:]
        chunk_size = 100
        for i in range(0, len(remaining), chunk_size):
            chunk = remaining[i:i + chunk_size]
            notion_request("PATCH", f"/blocks/{page_id}/children", {"children": chunk})
        print(f"  추가 블록 {len(remaining)}개 업로드 완료")

    print(f"[완료] 페이지가 생성되었습니다!")
    print(f"  URL: {page_url}")
    return page_url


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("사용법: python notion_upload.py <문서유형> <파일경로>")
        print("  문서유형: 주간보고 | 완료보고서 | 기타")
        print("  예시: python notion_upload.py 주간보고 C:/Users/kgh/Downloads/주간보고.docx")
        sys.exit(0)

    doc_type  = sys.argv[1]
    file_path = sys.argv[2]

    if not os.path.exists(file_path):
        print(f"[오류] 파일이 없습니다: {file_path}")
        sys.exit(1)

    create_page(doc_type, file_path)
