COACH SAM — Digital Business Card

ไฟล์และโครงสร้างสำหรับอัปโหลดขึ้น GitHub:
- index.html (หน้าเว็บหลัก มีสไตล์ CSS, สคริปต์ และระบบ Pre-Test)
- images/ (โฟลเดอร์ภาพโปรไฟล์และ QR Code รองรับทั้ง WebP และ fallback PNG/JPG โหลดเร็วระดับต่ำกว่า 100 KB)
- CoachSamPretest.gs (โค้ด Apps Script สำหรับผูกกับ Google Sheets ปลายทาง)
- CoachSamPretest-ติดตั้ง.txt (คู่มือและ endpoint เชื่อมต่อ)

อัปโหลดผ่านเว็บไซต์ GitHub:
1. เปิด https://github.com/coachsarm-hub/coach-sarm-carddigital
2. หากอัปโหลดผ่านเว็บ: เลือก Add file > Upload files
3. ลาก index.html และโฟลเดอร์ images/ ขึ้นไป แล้ว commit changes เข้าสู่ branch main
(หรือใช้คำสั่ง git push จากเครื่อง หากตั้งค่า Personal Access Token / SSH เรียบร้อยแล้ว)

เปิดใช้งาน GitHub Pages:
1. เข้า Settings > Pages
2. ใน Build and deployment เลือก Deploy from a branch
3. เลือก branch main และ folder /(root) แล้วกด Save
4. รอ GitHub Pages เผยแพร่ จากนั้นเปิด URL ที่แสดงในหน้า Settings > Pages
5. ใช้ URL นั้นทำ QR Code หรือบันทึกลง NFC card/tag
