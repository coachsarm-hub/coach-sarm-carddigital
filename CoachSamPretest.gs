/**
 * ============================================================================
 * COACH SAM — Pre-Test Response Receiver for Google Sheets (Version 2.0)
 * ============================================================================
 * 
 * ระบบรับผลแบบทดสอบก่อนเรียน (Pre-Test) ทั้ง 21 หลักสูตร และบันทึกแยกแท็บอัตโนมัติ
 * - ป้องกัน CORS ด้วยวิธี Form Post Handshake ผ่าน Hidden Iframe + postMessage
 * - ตรวจเฉลยและคำนวณคะแนนบน Server-side เพื่อความถูกต้องและปลอดภัย
 * - บันทึกคำตอบเป็นตัวอักษรตัวเลือก (A, B, C, D) ให้อ่านง่ายในสเปรดชีต
 * - ป้องกัน Race Condition ด้วย LockService และป้องกัน Formula Injection
 */

const PRETEST_CONFIG = Object.freeze({
  // Google Sheet ID ปลายทาง (หากติดตั้งแบบ Extensions > Apps Script สามารถใช้ค่าเดิมหรือดึงชีตปัจจุบันอัตโนมัติ)
  spreadsheetId: '1P8KFKRGPi4YklfihtVHX-nXwudjaHEtzpqmOBn8J1-Y',
  // โดเมนของหน้าเว็บที่ได้รับอนุญาตให้รับข้อความ postMessage
  parentOrigin: 'https://coachsarm-hub.github.io',
  questionCount: 10,
  consentVersion: '2026-11-18-v1',
  requestIdColumn: 23 // คอลัมน์ W: Submission ID สำหรับตรวจสอบรายการซ้ำ
});

// รายการหลักสูตรทั้ง 21 รายการ (แยกชีตตามรหัสหลักสูตรเพื่อความกระชับและไม่ซ้ำกัน)
const PRETEST_COURSES = Object.freeze([
  { code: '0920014220601', name: 'การบริหารโครงการพัฒนาซอฟต์แวร์', group: 'ระดับสูง' },
  { code: '10120014220115', name: 'AI Assisted Coding Fundamentals พัฒนานวัตกรรมดิจิทัล', group: 'ระดับสูง' },
  { code: '0920224190208', name: 'การเขียนโปรแกรมประมวลผลภาพและเทคโนโลยีปัญญาประดิษฐ์', group: 'ระดับสูง' },
  { code: '0920084220103', name: 'การพัฒนาเว็ปแอปพลิเคชัน ระดับ 1', group: 'ระดับสูง' },
  { code: '0920084220104', name: 'การพัฒนาเว็ปแอปพลิเคชัน ระดับ 2', group: 'ระดับสูง' },
  { code: '0920084220105', name: 'การพัฒนาเว็ปแอปพลิเคชัน ระดับ 3', group: 'ระดับสูง' },
  { code: '0920224220118', name: 'การพัฒนา Web E-Comerce ร้านค้าออนไลน์', group: 'ระดับสูง' },
  { code: '0920224220110', name: 'การสร้างแอพพลิเคชั่นเพื่อการท่องเที่ยว', group: 'ระดับสูง' },
  { code: '0920014220305', name: 'การออกแบบประสบการณ์ผู้ใช้และส่วนติดต่อผู้ใช้ (UX-UI)', group: 'ระดับสูง' },
  { code: '10120014220103', name: 'การพัฒนาโปรแกรม Web Application ด้วย React', group: 'ระดับสูง' },
  { code: '10020084220605', name: 'โปรแกรมภาษา JavaScript สำหรับการพัฒนาเว็บไซต์', group: 'ระดับสูง' },
  { code: '10120014220610', name: 'การประยุกต์ใช้ AI เพื่อเพิ่มประสิทธิภาพงานเอกสารและการสื่อสาร', group: 'ระดับกลาง' },
  { code: '2220017230213', name: 'Content Marketing และ การขายออนไลน์ด้วยเทคโนโลยีปัญญาประดิษฐ์ (AI)', group: 'ระดับกลาง' },
  { code: '50200172304104', name: 'การทำธุรกิจผ่านเครือข่ายออนไลน์', group: 'ระดับกลาง' },
  { code: '0920014220605', name: 'การวิเคราะห์ข้อมูลด้วยโปรแกรม Power BI', group: 'ระดับกลาง' },
  { code: '0920014220405', name: 'การวิเคราะห์ข้อมูลด้วย Excel และ Power BI', group: 'ระดับกลาง' },
  { code: '2220017320213', name: 'เทคโนโลยีปัญญาประดิษฐ์สําหรับธุรกิจท่องเที่ยวและบริการ(AI for Hospitality and Tourism)', group: 'ระดับกลาง' },
  { code: '0920224220116', name: 'ยกระดับ การใช้ Google Application เพื่อธุรกิจ (Using of Google Application for Business)', group: 'ระดับกลาง' },
  { code: '0920014220406', name: 'การใช้ Microsoft AI Skills for Everyone (สำหรับองค์กรและภาคธุรกิจ)', group: 'สถานประกอบกิจการ' },
  { code: '10120014220801', name: 'การใช้งาน Generative AI ในองค์กรและภาคธุรกิจ', group: 'สถานประกอบกิจการ' },
  { code: '10120014220504', name: 'กฎหมายดิจิทัลสำหรับผู้ใช้งานทั่วไป', group: 'สถานประกอบกิจการ' }
]);

// แมปหลักสูตรเข้ากับชุดข้อสอบ 16 กลุ่มวิชา
const PRETEST_COURSE_GROUP = Object.freeze({
  '0920014220601': 'project', '10120014220115': 'aiCoding', '0920224190208': 'vision',
  '0920084220103': 'web', '0920084220104': 'web', '0920084220105': 'web',
  '0920224220118': 'ecommerce', '0920224220110': 'tourismApp', '0920014220305': 'ux',
  '10120014220103': 'web', '10020084220605': 'web', '10120014220610': 'productivity',
  '2220017230213': 'marketing', '50200172304104': 'business', '0920014220605': 'analytics',
  '0920014220405': 'analytics', '2220017320213': 'tourismAI', '0920224220116': 'google',
  '0920014220406': 'microsoftAI', '10120014220801': 'genAI', '10120014220504': 'law'
});

/**
 * เฉลยคำตอบตามกลุ่มวิชา:
 * ในคลังข้อสอบ ตัวเลือกแรก (Index 0) คือคำตอบที่ถูกต้อง
 * เมื่อแสดงผลหน้าเว็บ จะสุ่มสลับตัวเลือก (Fisher-Yates) แต่คงค่า originalIndex (0..3) ไว้
 * ดังนั้นคำตอบที่ถูกต้องตาม originalIndex คือ 0 เสมอ
 */
const PRETEST_ANSWER_KEYS = Object.freeze({
  project: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  aiCoding: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  vision: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  web: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  ecommerce: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  tourismApp: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  ux: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  productivity: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  marketing: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  business: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  analytics: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  tourismAI: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  google: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  microsoftAI: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  genAI: Object.freeze([0,0,0,0,0,0,0,0,0,0]),
  law: Object.freeze([0,0,0,0,0,0,0,0,0,0])
});

const PRETEST_HEADERS = Object.freeze([
  'วันเวลาส่ง',
  'รหัสหลักสูตร',
  'ชื่อหลักสูตร',
  'ชื่อ-สกุล (ภาษาไทย)',
  'อีเมล',
  'Line ID',
  'เบอร์โทร',
  'จังหวัดที่อยู่',
  'ยินยอมให้ใช้ข้อมูลเพื่อประเมินผล',
  'คะแนน',
  'คะแนนเต็ม',
  'เปอร์เซ็นต์',
  'คำตอบข้อ 1', 'คำตอบข้อ 2', 'คำตอบข้อ 3', 'คำตอบข้อ 4', 'คำตอบข้อ 5',
  'คำตอบข้อ 6', 'คำตอบข้อ 7', 'คำตอบข้อ 8', 'คำตอบข้อ 9', 'คำตอบข้อ 10',
  'Submission ID',
  'รุ่นข้อความยินยอม'
]);

/**
 * ฟังก์ชันเตรียมชีต: สั่งรันครั้งแรกเพียงครั้งเดียวเพื่อสร้างและจัดรูปแบบแท็บทั้ง 21 หลักสูตร
 */
function setupPretestSheets() {
  const spreadsheet = getSpreadsheet_();
  PRETEST_COURSES.forEach(function (course) {
    const sheet = getOrCreateCourseSheet_(spreadsheet, course);
    formatCourseSheet_(sheet);
  });
  return 'สำเร็จ: เตรียมแท็บหลักสูตรเรียบร้อยแล้ว ' + PRETEST_COURSES.length + ' แท็บ';
}

/**
 * Health Check: สำหรับเปิดดูสถานะการเชื่อมต่อผ่าน Web App URL ตรงๆ
 */
function doGet() {
  try {
    const spreadsheet = getSpreadsheet_();
    const existingNames = spreadsheet.getSheets().map(function (sheet) { return sheet.getName(); });
    const missingCourses = PRETEST_COURSES.filter(function (course) {
      return existingNames.indexOf(course.code) === -1;
    }).map(function (course) { return course.code; });

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: missingCourses.length === 0,
        service: 'Coach Sam Pre-Test Receiver v2.0',
        sheetConnected: true,
        sheetTitle: spreadsheet.getName(),
        courseCount: PRETEST_COURSES.length,
        readySheetCount: PRETEST_COURSES.length - missingCourses.length,
        missingCourseSheets: missingCourses
      }, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        service: 'Coach Sam Pre-Test Receiver v2.0',
        sheetConnected: false,
        message: 'ไม่สามารถเปิด Google Sheet ได้ กรุณาตรวจสอบสิทธิ์หรือ ID: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Endpoint รับข้อมูลการส่งข้อสอบและบันทึกลงในชีต
 */
function doPost(e) {
  let requestId = '';
  try {
    const rawPayload = e && e.parameter && e.parameter.payload;
    if (!rawPayload) throw new Error('ไม่พบข้อมูลแบบทดสอบ');

    const payload = JSON.parse(rawPayload);
    requestId = validateRequestId_(payload.requestId);
    const course = findCourse_(payload.courseCode);
    const submission = normalizeSubmission_(payload, course);
    const result = saveSubmission_(submission);

    return postMessageResponse_({
      ok: true,
      requestId: requestId,
      duplicate: result.duplicate,
      score: submission.score,
      maxScore: PRETEST_CONFIG.questionCount
    });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return postMessageResponse_({
      ok: false,
      requestId: requestId,
      message: 'บันทึกผลไม่สำเร็จ: ' + (error.message || 'กรุณาตรวจข้อมูลแล้วลองใหม่อีกครั้ง')
    });
  }
}

function getSpreadsheet_() {
  if (PRETEST_CONFIG.spreadsheetId) {
    try {
      return SpreadsheetApp.openById(PRETEST_CONFIG.spreadsheetId);
    } catch (err) {
      // หาก openById ติดสิทธิ์ ให้ลองดึง Active Spreadsheet
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function findCourse_(courseCode) {
  const code = String(courseCode || '').trim();
  const course = PRETEST_COURSES.find(function (item) { return item.code === code; });
  if (!course) throw new Error('ไม่พบรหัสหลักสูตร ' + code);
  return course;
}

function validateRequestId_(value) {
  const id = String(value || '').trim();
  if (!/^[A-Za-z0-9_-]{12,80}$/.test(id)) throw new Error('Submission ID ไม่ถูกต้อง');
  return id;
}

function normalizeSubmission_(payload, course) {
  const fullName = cleanText_(payload.fullNameTh, 120);
  const email = cleanText_(payload.email, 160).toLowerCase();
  const lineId = cleanText_(payload.lineId, 60);
  const phone = cleanText_(payload.phone, 32);
  const province = cleanText_(payload.province, 80);

  if (fullName.length < 2 || !/[\u0E00-\u0E7F]/.test(fullName)) {
    throw new Error('กรุณาระบุชื่อ-นามสกุลภาษาไทยให้ถูกต้อง');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('รูปแบบอีเมลไม่ถูกต้อง');
  if (!lineId || !phone || !province) throw new Error('กรุณากรอกข้อมูลติดต่อให้ครบถ้วน');
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 9 || phoneDigits.length > 15) throw new Error('เบอร์โทรศัพท์ไม่ถูกต้อง');
  if (payload.consent !== true) throw new Error('กรุณากดยินยอมการใช้ข้อมูลเพื่อประเมินผล');

  const answers = payload.answers;
  if (!Array.isArray(answers) || answers.length !== PRETEST_CONFIG.questionCount) {
    throw new Error('ต้องส่งคำตอบครบ 10 ข้อ');
  }
  const normalizedAnswers = answers.map(function (answer) {
    const value = Number(answer);
    if (!Number.isInteger(value) || value < 0 || value > 3) throw new Error('ค่าคำตอบไม่ถูกต้อง');
    return value;
  });

  // ตรวจคะแนนบน Server
  const group = PRETEST_COURSE_GROUP[course.code];
  const answerKey = PRETEST_ANSWER_KEYS[group];
  if (!answerKey || answerKey.length !== PRETEST_CONFIG.questionCount) throw new Error('ไม่พบคีย์เฉลยคำตอบ');
  const score = normalizedAnswers.reduce(function (total, answer, index) {
    return total + (answer === answerKey[index] ? 1 : 0);
  }, 0);

  return {
    requestId: validateRequestId_(payload.requestId),
    course: course,
    fullName: fullName,
    email: email,
    lineId: lineId,
    phone: phone,
    province: province,
    consent: true,
    score: score,
    answers: normalizedAnswers
  };
}

function saveSubmission_(submission) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // รอคิวได้สูงสุด 20 วินาที ป้องกันข้อมูลชนกัน
  try {
    const spreadsheet = getSpreadsheet_();
    const sheet = getOrCreateCourseSheet_(spreadsheet, submission.course);
    const lastRow = sheet.getLastRow();

    // ตรวจสอบ Submission ID ซ้ำ
    if (lastRow > 1) {
      const idRange = sheet.getRange(2, PRETEST_CONFIG.requestIdColumn, lastRow - 1, 1);
      const existing = idRange.createTextFinder(submission.requestId)
        .matchEntireCell(true)
        .findNext();
      if (existing) return { duplicate: true };
    }

    const answerLabels = ['A', 'B', 'C', 'D'];
    const row = [
      new Date(),
      submission.course.code,
      sheetSafeText_(submission.course.name),
      sheetSafeText_(submission.fullName),
      sheetSafeText_(submission.email),
      sheetSafeText_(submission.lineId),
      sheetSafeText_(submission.phone),
      sheetSafeText_(submission.province),
      'ยินยอม',
      submission.score,
      PRETEST_CONFIG.questionCount,
      Math.round(submission.score / PRETEST_CONFIG.questionCount * 100),
      ...submission.answers.map(function(ans) { return answerLabels[ans] || sheetSafeText_(ans); }),
      submission.requestId,
      PRETEST_CONFIG.consentVersion
    ];

    const rowNumber = Math.max(sheet.getLastRow() + 1, 2);
    sheet.getRange(rowNumber, 1, 1, PRETEST_HEADERS.length).setValues([row]);
    return { duplicate: false };
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateCourseSheet_(spreadsheet, course) {
  let sheet = spreadsheet.getSheetByName(course.code);
  if (!sheet) sheet = spreadsheet.insertSheet(course.code);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, PRETEST_HEADERS.length).setValues([PRETEST_HEADERS]);
    formatCourseSheet_(sheet);
  }
  return sheet;
}

function formatCourseSheet_(sheet) {
  const header = sheet.getRange(1, 1, 1, PRETEST_HEADERS.length);
  header
    .setValues([PRETEST_HEADERS])
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#0c1c35')
    .setWrap(true);
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 40);
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange('J:L').setNumberFormat('0');
  sheet.getRange('A:X').setVerticalAlignment('middle');
  if (!sheet.getFilter()) sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), PRETEST_HEADERS.length).createFilter();
}

function cleanText_(value, maxLength) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function sheetSafeText_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+@\-]/.test(text) ? "'" + text : text;
}

function postMessageResponse_(message) {
  const messageJson = JSON.stringify(message).replace(/</g, '\\u003c');
  const originJson = JSON.stringify(PRETEST_CONFIG.parentOrigin);
  const html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<script>window.top.postMessage(' + messageJson + ',' + originJson + ');</script>' +
    '</body></html>';
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
