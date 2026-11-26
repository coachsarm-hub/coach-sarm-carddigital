#!/usr/bin/env python3
"""
Builds courses-data.json, 21 static SEO course pages under courses/<code>.html,
and sitemap.xml from index.html.
"""
import html
import json
import os
import re
import subprocess
from datetime import date

BASE_URL = "https://coachsarm-hub.github.io/coach-sarm-carddigital"

def extract_courses():
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()

    # Use node to evaluate COURSE_PROFILE from index.html accurately
    js_match = re.search(r"const COURSE_PROFILE\s*=\s*(\{.*?\});", content, re.DOTALL)
    if not js_match:
        raise RuntimeError("Could not find COURSE_PROFILE in index.html")
    profile_json = subprocess.check_output(
        ["node", "-e", f"console.log(JSON.stringify({js_match.group(1)}))"],
        text=True,
    )
    profiles = json.loads(profile_json)

    # Parse article.course cards from HTML
    card_pattern = re.compile(
        r'<article class="course" data-cat="([^"]+)">(.*?)</article>',
        re.DOTALL,
    )
    courses = []
    for cat, body in card_pattern.findall(content):
        title_m = re.search(r"<h3>(.*?)</h3>", body, re.DOTALL)
        code_m = re.search(r'<span class="code">รหัส\s*([^<]+)</span>', body)
        level_m = re.search(r'<span class="level">([^<]+)</span>', body)
        docs = [
            {"href": html.unescape(href), "label": label.replace(" ↗", "").strip()}
            for href, label in re.findall(
                r'<a class="course-link"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', body
            )
        ]
        code = code_m.group(1).strip() if code_m else ""
        title = html.unescape(title_m.group(1).strip()) if title_m else ""
        level = html.unescape(level_m.group(1).strip()) if level_m else ""
        prof = profiles.get(code, {})
        courses.append(
            {
                "code": code,
                "title": title,
                "level": level,
                "category": cat,
                "objective": prof.get(
                    "objective",
                    "เพื่อเสริมความรู้และทักษะตามหัวข้อหลักสูตร โปรดตรวจสอบวัตถุประสงค์ฉบับเต็มจากเอกสารทางการ",
                ),
                "benefits": prof.get(
                    "benefits",
                    [
                        "ดูหัวข้อและขอบเขตการเรียนในเอกสารหลักสูตร",
                        "สอบถามรูปแบบการอบรมและรายละเอียดจากผู้จัด",
                        "เลือกเนื้อหาที่สอดคล้องกับเป้าหมายการทำงาน",
                    ],
                ),
                "eligibility": prof.get(
                    "eligibility",
                    "คุณสมบัติตามประกาศรับสมัครของหน่วยงานผู้จัด กรุณาติดต่อเพื่อยืนยันก่อนสมัคร",
                ),
                "docs": docs,
            }
        )
    return courses


def render_course_page(course):
    code = course["code"]
    title = course["title"]
    level = course["level"]
    objective = course["objective"]
    eligibility = course["eligibility"]
    benefits = course["benefits"]
    docs = course["docs"]

    page_url = f"{BASE_URL}/courses/{code}.html"
    esc_title = html.escape(title)
    esc_obj = html.escape(objective)
    esc_level = html.escape(level)
    esc_elig = html.escape(eligibility)

    docs_html = (
        '<div class="course-detail-docs">'
        + "".join(
            f'<a href="{html.escape(d["href"])}" target="_blank" rel="noopener">{html.escape(d["label"])} ↗</a>'
            for d in docs
        )
        + "</div>"
        if docs
        else '<p class="course-detail-missing">ยังไม่มีเอกสารหลักสูตรแนบ กรุณาติดต่อเพื่อสอบถามรายละเอียดและยืนยันเงื่อนไขการอบรม</p>'
    )

    note_text = (
        "วัตถุประสงค์และผลลัพธ์ข้างต้นเป็นบทสรุปย่อ ไม่ใช่ถ้อยคำทางการ โปรดอ้างอิงเอกสารหลักสูตรสำหรับรายละเอียดและคุณสมบัติฉบับเต็ม"
        if docs
        else "ยังไม่มีเอกสารหลักสูตรแนบ ข้อมูลสรุปนี้ใช้ประกอบการพิจารณาเบื้องต้น โปรดติดต่อผู้จัดเพื่อยืนยันรายละเอียดและคุณสมบัติ"
    )

    benefits_html = "".join(f"<li>{html.escape(b)}</li>" for b in benefits)

    schema_json = json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": title,
            "courseCode": code,
            "description": objective,
            "educationalLevel": level,
            "inLanguage": "th",
            "provider": {
                "@type": "Person",
                "name": "นายสุทธิพจน์ ศรีแสนยงค์ (Coach Sam)",
                "url": f"{BASE_URL}/",
            },
        },
        ensure_ascii=False,
        indent=2,
    )

    return f"""<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc_title} | Coach Sam</title>
<meta name="description" content="{esc_obj} (รหัสหลักสูตร {code} · {esc_level})">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0c1c35">
<link rel="canonical" href="{page_url}">
<link rel="icon" type="image/x-icon" href="../favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
<meta property="og:type" content="article">
<meta property="og:title" content="{esc_title} | Coach Sam">
<meta property="og:description" content="{esc_obj}">
<meta property="og:url" content="{page_url}">
<meta property="og:site_name" content="Coach Sam Digital &amp; AI Academy">
<meta property="og:image" content="{BASE_URL}/images/og-image.jpg">
<meta property="og:locale" content="th_TH">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc_title} | Coach Sam">
<meta name="twitter:description" content="{esc_obj}">
<meta name="twitter:image" content="{BASE_URL}/images/og-image.jpg">
<script type="application/ld+json">
{schema_json}
</script>
<style>
:root{{--navy:#0c1c35;--gold:#c7a55b;--gold2:#ead9a9;--ink:#172235;--muted:#647087;--line:#e4e8ee;--serif:Georgia,'Times New Roman',serif}}
*{{box-sizing:border-box}}
body{{margin:0;color:var(--ink);font-family:system-ui,-apple-system,'Segoe UI',Tahoma,sans-serif;line-height:1.72;background:#f6f7f9}}
a{{color:inherit}}
.topbar{{background:var(--navy);color:#edf1f7;font-size:.82rem}}
.wrap{{width:min(1160px,calc(100% - 40px));margin:auto}}
.topbar .wrap{{display:flex;justify-content:space-between;gap:1rem;padding:.42rem 0}}
.nav{{position:sticky;top:0;background:rgba(255,255,255,.96);backdrop-filter:blur(12px);z-index:20;border-bottom:1px solid #edf0f3}}
.navin{{height:76px;display:flex;align-items:center;justify-content:space-between;gap:1rem}}
.brand{{font:700 1.12rem var(--serif);letter-spacing:.08em;color:var(--navy);text-decoration:none}}
.brand small{{display:block;font:500 .62rem system-ui;letter-spacing:.21em;color:var(--gold);margin-top:-3px}}
.nav-cta,.btn{{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:4px;padding:.77rem 1.12rem;text-decoration:none;font-weight:650;border:1px solid transparent;transition:.2s;cursor:pointer;font:inherit}}
.nav-cta{{background:var(--gold);color:#172235}}
.btn.navy{{background:var(--navy);color:#fff}}
.btn.back-course{{border:1px solid #ccd4df;color:var(--navy);background:#fff}}
.btn:hover,.nav-cta:hover{{transform:translateY(-2px);box-shadow:0 8px 20px #17223520}}
.course-detail-page{{min-height:70vh;padding:2.2rem 0 4rem;background:linear-gradient(180deg,#f6f7f9 0,#fff 340px)}}
.course-detail-wrap{{width:min(920px,calc(100% - 36px));margin:auto}}
.course-breadcrumb{{display:flex;flex-wrap:wrap;gap:.55rem;align-items:center;color:var(--muted);font-size:.82rem;margin:0 0 1.4rem}}
.course-breadcrumb a{{color:#866522;text-decoration:none}}
.course-breadcrumb a:hover{{text-decoration:underline}}
.course-detail-card{{background:#fff;border:1px solid var(--line);border-top:4px solid var(--gold);border-radius:12px;padding:clamp(1.15rem,4vw,2.25rem);box-shadow:0 16px 46px #0c1c350d}}
.course-detail-kicker{{color:#98752d;text-transform:uppercase;letter-spacing:.13em;font-size:.72rem;font-weight:750}}
.course-detail-heading-row{{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem}}
.course-detail-title{{font:500 clamp(1.65rem,4vw,2.45rem)/1.27 var(--serif);color:var(--navy);margin:.35rem 0 .65rem}}
.course-share-button{{flex:none;display:inline-flex;align-items:center;justify-content:center;gap:.45rem;min-height:42px;padding:.55rem .85rem;border:1px solid #cbd3de;border-radius:5px;background:#fff;color:var(--navy);font:650 .88rem system-ui;cursor:pointer}}
.course-share-button:hover{{border-color:var(--gold)}}
.course-share-status{{min-height:1.4em;color:var(--muted);font-size:.82rem;margin:.35rem 0 .7rem}}
.course-detail-meta{{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 1.5rem}}
.course-detail-meta span{{padding:.26rem .6rem;border-radius:4px;background:#f0f3f7;color:#526177;font-size:.78rem}}
.course-detail-intro{{color:var(--muted);margin:0 0 1.4rem}}
.course-info-section{{padding:1.05rem 0;border-top:1px solid var(--line)}}
.course-info-section h2{{font:600 1.05rem system-ui;color:var(--navy);margin:0 0 .55rem}}
.course-info-section p{{margin:0;color:#526177}}
.course-info-section ul{{margin:.35rem 0 0;padding-left:1.25rem;color:#526177}}
.course-info-section li{{padding:.16rem 0}}
.course-detail-docs{{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:.8rem}}
.course-detail-docs a{{border:1px solid #e3d7b8;border-radius:4px;padding:.4rem .65rem;background:#fffdf8;color:#80601f;text-decoration:none;font-size:.82rem;font-weight:650}}
.course-detail-missing{{padding:1rem;background:#f5f6f8;border-radius:6px;color:#687489}}
.course-detail-note{{padding:.8rem 1rem;background:#faf7ee;border-left:3px solid var(--gold);color:#66552d;font-size:.82rem;margin:1rem 0 0}}
.course-detail-actions{{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.6rem}}
.footer{{background:#081426;color:#aab6c5;padding:1.3rem 0;font-size:.78rem}}
.footer .wrap{{display:flex;justify-content:space-between;gap:1rem}}
@media(max-width:600px){{.topbar span:first-child{{display:none}}.course-detail-heading-row{{display:block}}.course-share-button{{margin:.2rem 0 .5rem}}.course-detail-actions{{display:grid}}.course-detail-actions .btn{{width:100%}}.footer .wrap{{display:block;text-align:center}}}}
</style>
</head>
<body>
<div class="topbar"><div class="wrap"><span>COACH SAM · DIGITAL &amp; AI ACADEMY</span><span>วิทยากรและที่ปรึกษาด้านเทคโนโลยีดิจิทัล</span></div></div>
<header class="nav"><nav class="wrap navin" aria-label="เมนูหลัก"><a class="brand" href="../index.html#home">COACH SAM<small>DIGITAL &amp; AI ACADEMY</small></a><a class="nav-cta" href="../index.html#contact">เชิญเป็นวิทยากร ↗</a></nav></header>
<main class="course-detail-page">
 <div class="course-detail-wrap">
  <nav class="course-breadcrumb" aria-label="เส้นทางนำทาง"><a href="../index.html#home">หน้าแรก</a><span aria-hidden="true">/</span><a href="../index.html#courses">หลักสูตรฝึกอบรม</a><span aria-hidden="true">/</span><span aria-current="page">{esc_title}</span></nav>
  <article class="course-detail-card">
   <div class="course-detail-kicker">Course overview</div>
   <div class="course-detail-heading-row">
    <h1 class="course-detail-title">{esc_title}</h1>
    <button class="course-share-button" id="shareCourseButton" type="button">แชร์หลักสูตร</button>
   </div>
   <p class="course-share-status" id="courseShareStatus" role="status" aria-live="polite"></p>
   <div class="course-detail-meta"><span>รหัส {code}</span><span>{esc_level}</span></div>
   <p class="course-detail-intro">บทสรุปย่อจากชื่อและหัวข้อหลักสูตร เพื่อช่วยเลือกหลักสูตรเบื้องต้น รายละเอียดทางการให้ยึดตามเอกสารหรือประกาศของหน่วยงานผู้จัด</p>
   <section class="course-info-section"><h2>วัตถุประสงค์</h2><p>{esc_obj}</p></section>
   <section class="course-info-section"><h2>สิ่งที่คาดว่าจะได้รับจากหลักสูตร</h2><ul>{benefits_html}</ul></section>
   <section class="course-info-section"><h2>คุณสมบัติผู้เข้าร่วมอบรม</h2><p>{esc_elig}</p></section>
   <section class="course-info-section"><h2>เอกสารและรายละเอียดหลักสูตร</h2>{docs_html}</section>
   <p class="course-detail-note">{note_text}</p>
   <div class="course-detail-actions">
    <button class="btn navy" type="button" data-open-pretest data-course-code="{code}" data-course-title="{esc_title}">สำรวจก่อนเรียน (Pre-Test)</button>
    <a class="btn back-course" href="../index.html#courses">กลับไปหน้าหลักสูตรอบรม</a>
   </div>
  </article>
 </div>
</main>
<footer class="footer"><div class="wrap"><span>© 2026 Coach Sam · Digital &amp; AI Academy</span><a href="../index.html#home" style="color:var(--gold2);text-decoration:none">กลับหน้าหลัก ↑</a></div></footer>
<script>
document.getElementById('shareCourseButton').addEventListener('click',async()=>{{
 const status=document.getElementById('courseShareStatus');
 const shareData={{title:{json.dumps(title, ensure_ascii=False)},text:'หลักสูตรฝึกอบรม Coach Sam',url:location.href}};
 if(navigator.share){{try{{await navigator.share(shareData);status.textContent='เปิดเมนูแชร์หลักสูตรแล้ว';return}}catch(e){{if(e&&e.name==='AbortError')return}}}}
 try{{if(navigator.clipboard&&navigator.clipboard.writeText){{await navigator.clipboard.writeText(location.href);status.textContent='คัดลอกลิงก์หลักสูตรแล้ว';return}}}}catch(e){{}}
 const f=document.createElement('textarea');f.value=location.href;f.setAttribute('readonly','');f.style.position='fixed';f.style.opacity='0';document.body.appendChild(f);f.select();
 let ok=false;try{{ok=document.execCommand('copy')}}catch(e){{}}f.remove();
 status.textContent=ok?'คัดลอกลิงก์หลักสูตรแล้ว':'คัดลอกลิงก์นี้: '+location.href;
}});
</script>
<script src="../pretest.js?v=35" defer></script>
</body>
</html>
"""


def main():
    courses = extract_courses()
    with open("courses-data.json", "w", encoding="utf-8") as f:
        json.dump(courses, f, ensure_ascii=False, indent=2)

    os.makedirs("courses", exist_ok=True)
    for c in courses:
        out_path = os.path.join("courses", f'{c["code"]}.html')
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(render_course_page(c))

    today = date.today().isoformat()
    urls = [
        f'  <url><loc>{BASE_URL}/</loc><lastmod>{today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>'
    ]
    for c in courses:
        urls.append(
            f'  <url><loc>{BASE_URL}/courses/{c["code"]}.html</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>'
        )
    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n"
    )
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap)

    print(f"Generated courses-data.json, {len(courses)} static course pages, and sitemap.xml")


if __name__ == "__main__":
    main()
