/**
 * Coach Sam Pre-Test response receiver for Google Sheets.
 *
 * Install as a bound Apps Script project from the target spreadsheet:
 * Extensions > Apps Script. Then run setupPretestSheets() once and deploy
 * this project as a Web app (execute as the owner, access: anyone).
 *
 * The static site should POST an x-www-form-urlencoded field named "payload"
 * to the deployed /exec URL, targeting a hidden iframe. The response iframe
 * posts a small success/failure message to the fixed GitHub Pages origin.
 * No student data is returned in the response message.
 */

const PRETEST_CONFIG = Object.freeze({
  spreadsheetId: '1P8KFKRGPi4YklfihtVHX-nXwudjaHEtzpqmOBn8J1-Y',
  parentOrigin: 'https://coachsarm-hub.github.io',
  questionCount: 10,
  consentVersion: '2026-11-18-v1',
  requestIdColumn: 23
});

// Sheet tabs use course codes so they remain short, unique, and easy to match.
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


const PRETEST_COURSE_GROUP = Object.freeze({
  '0920014220601': 'project', '10120014220115': 'aiCoding', '0920224190208': 'vision',
  '0920084220103': 'web', '0920084220104': 'web', '0920084220105': 'web',
  '0920224220118': 'ecommerce', '0920224220110': 'tourismApp', '0920014220305': 'ux',
  '10120014220103': 'web', '10020084220605': 'web', '10120014220610': 'productivity',
  '2220017230213': 'marketing', '50200172304104': 'business', '0920014220605': 'analytics',
  '0920014220405': 'analytics', '2220017320213': 'tourismAI', '0920224220116': 'google',
  '0920014220406': 'microsoftAI', '10120014220801': 'genAI', '10120014220504': 'law'
});
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

/** Creates missing per-course tabs and formats their header rows. Safe to rerun. */
function setupPretestSheets() {
  const spreadsheet = SpreadsheetApp.openById(PRETEST_CONFIG.spreadsheetId);
  PRETEST_COURSES.forEach(function (course) {
    const sheet = getOrCreateCourseSheet_(spreadsheet, course);
    formatCourseSheet_(sheet);
  });
  return 'Ready: ' + PRETEST_COURSES.length + ' course tabs.';
}

/** Lightweight deployment check; does not create or change any sheet. */
function doGet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(PRETEST_CONFIG.spreadsheetId);
    const existingNames = spreadsheet.getSheets().map(function (sheet) { return sheet.getName(); });
    const missingCourses = PRETEST_COURSES.filter(function (course) {
      return existingNames.indexOf(course.code) === -1;
    }).map(function (course) { return course.code; });
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: missingCourses.length === 0,
        service: 'Coach Sam Pre-Test receiver',
        sheetConnected: true,
        courseCount: PRETEST_COURSES.length,
        courseSheetCount: PRETEST_COURSES.length - missingCourses.length,
        questionCount: PRETEST_CONFIG.questionCount,
        missingCourseSheets: missingCourses
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        service: 'Coach Sam Pre-Test receiver',
        sheetConnected: false,
        message: 'ไม่สามารถเชื่อมต่อ Google Sheets ได้'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Receives one completed test and appends it to the matching course tab. */
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
      message: 'บันทึกผลไม่สำเร็จ กรุณาตรวจข้อมูลแล้วลองส่งอีกครั้ง'
    });
  }
}

function findCourse_(courseCode) {
  const code = String(courseCode || '').trim();
  const course = PRETEST_COURSES.find(function (item) { return item.code === code; });
  if (!course) throw new Error('Unknown course code');
  return course;
}

function validateRequestId_(value) {
  const id = String(value || '').trim();
  if (!/^[A-Za-z0-9_-]{12,80}$/.test(id)) throw new Error('Invalid submission ID');
  return id;
}

function normalizeSubmission_(payload, course) {
  const fullName = cleanText_(payload.fullNameTh, 120);
  const email = cleanText_(payload.email, 160).toLowerCase();
  const lineId = cleanText_(payload.lineId, 60);
  const phone = cleanText_(payload.phone, 32);
  const province = cleanText_(payload.province, 80);

  if (fullName.length < 2 || !/[\u0E00-\u0E7F]/.test(fullName)) {
    throw new Error('Invalid Thai full name');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
  if (!lineId || !phone || !province) throw new Error('Missing contact fields');
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 9 || phoneDigits.length > 15) throw new Error('Invalid phone');
  if (payload.consent !== true) throw new Error('Consent is required');

  const answers = payload.answers;
  if (!Array.isArray(answers) || answers.length !== PRETEST_CONFIG.questionCount) {
    throw new Error('Expected exactly 10 answers');
  }
  const normalizedAnswers = answers.map(function (answer) {
    const value = Number(answer);
    if (!Number.isInteger(value) || value < 0 || value > 3) throw new Error('Invalid answer value');
    return value;
  });
  const group = PRETEST_COURSE_GROUP[course.code];
  const answerKey = PRETEST_ANSWER_KEYS[group];
  if (!answerKey || answerKey.length !== PRETEST_CONFIG.questionCount) throw new Error('Answer key is missing');
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
  lock.waitLock(20000);
  try {
    const spreadsheet = SpreadsheetApp.openById(PRETEST_CONFIG.spreadsheetId);
    const sheet = getOrCreateCourseSheet_(spreadsheet, submission.course);
    const lastRow = sheet.getLastRow();

    if (lastRow > 1) {
      const idRange = sheet.getRange(2, PRETEST_CONFIG.requestIdColumn, lastRow - 1, 1);
      const existing = idRange.createTextFinder(submission.requestId)
        .matchEntireCell(true)
        .findNext();
      if (existing) return { duplicate: true };
    }

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
      ...submission.answers.map(sheetSafeText_),
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
  sheet.setRowHeight(1, 42);
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

// Prevent user-submitted strings from being interpreted as Sheets formulas.
function sheetSafeText_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+@\-]/.test(text) ? "'" + text : text;
}

/** Returns a minimal HTML response that notifies the parent site. */
function postMessageResponse_(message) {
  const messageJson = JSON.stringify(message).replace(/</g, '\\u003c');
  const originJson = JSON.stringify(PRETEST_CONFIG.parentOrigin);
  const html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<script>window.top.postMessage(' + messageJson + ',' + originJson + ');</script>' +
    '</body></html>';
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
