/**
 * ============================================================================
 * COACH SAM — Pre-Test Response Receiver for Google Sheets (Version 3.0)
 * ============================================================================
 * 
 * ระบบรับผลแบบทดสอบก่อนเรียน (Pre-Test) ทั้ง 21 หลักสูตร และบันทึกผลอัตโนมัติ
 * 
 * ความสามารถของเวอร์ชัน 3.0:
 * 1. รองรับ Direct Fetch JSON API (responseMode: 'json') สำหรับความเสถียรสูงสุดบนมือถือ
 *    และ LINE/Facebook In-App Browser (พร้อมยังคงรองรับ Hidden Iframe postMessage เดิม)
 * 2. ใช้ CacheService ตรวจ Submission ID ซ้ำแบบทันที ลดคอขวด LockService เมื่อมีผู้สอบส่งพร้อมกันจำนวนมาก
 * 3. บันทึก 2 ระดับ: แท็บ "รวมผลสอบทุกหลักสูตร" (Master) และแท็บย่อย 21 หลักสูตร
 * 4. Auto-Detect Spreadsheet: ตรวจจับชีตที่สคริปต์นี้ผูกอยู่โดยอัตโนมัติ (getActiveSpreadsheet)
 * 5. รองรับชื่อทั้งภาษาไทยและภาษาอังกฤษ ตรวจเฉลยบน Server-side และแปลงคำตอบเป็น A, B, C, D
 */

const PRETEST_CONFIG = Object.freeze({
  fallbackSpreadsheetId: '1P8KFKRGPi4YklfihtVHX-nXwudjaHEtzpqmOBn8J1-Y',
  dashboardSheetName: 'Dashboard',
  masterSheetName: 'รวมผลสอบทุกหลักสูตร',
  questionCount: 10,
  consentVersion: '2026-11-18-v1',
  requestIdColumn: 23, // คอลัมน์ W: Submission ID
  dedupeCacheTtlSeconds: 600, // เก็บ cache กันส่งซ้ำ 10 นาที
  notifyOnSubmit: false, // เปลี่ยนเป็น true หากต้องการรับอีเมลแจ้งเตือนทันทีเมื่อมีผู้สอบส่งผล
  notifyEmail: 'coach.sarm@gmail.com'
});

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
  'ชื่อ-สกุล',
  'อีเมล',
  'Line ID',
  'เบอร์โทร',
  'จังหวัดที่อยู่',
  'ยินยอม',
  'คะแนน',
  'คะแนนเต็ม',
  'เปอร์เซ็นต์',
  'คำตอบข้อ 1', 'คำตอบข้อ 2', 'คำตอบข้อ 3', 'คำตอบข้อ 4', 'คำตอบข้อ 5',
  'คำตอบข้อ 6', 'คำตอบข้อ 7', 'คำตอบข้อ 8', 'คำตอบข้อ 9', 'คำตอบข้อ 10',
  'Submission ID',
  'รุ่นข้อความยินยอม'
]);

/** สั่งรันครั้งเดียวเพื่อสร้างแท็บ Dashboard, แท็บ Master และแท็บทั้ง 21 หลักสูตร */
function setupPretestSheets() {
  const spreadsheet = getSpreadsheet_();
  getOrCreateMasterSheet_(spreadsheet);
  setupDashboardSheet_(spreadsheet);
  PRETEST_COURSES.forEach(function (course) {
    const sheet = getOrCreateCourseSheet_(spreadsheet, course);
    formatCourseSheet_(sheet, '#0c1c35');
  });
  return 'สำเร็จ: เตรียมแท็บ Dashboard, Master และแท็บหลักสูตรเรียบร้อยแล้ว รวม ' + (PRETEST_COURSES.length + 2) + ' แท็บ';
}

/** Health Check: เปิดดูสถานะการเชื่อมต่อผ่าน Web App URL */
function doGet() {
  try {
    const spreadsheet = getSpreadsheet_();
    const existingNames = spreadsheet.getSheets().map(function (sheet) { return sheet.getName(); });
    const missingCourses = PRETEST_COURSES.filter(function (course) {
      return existingNames.indexOf(course.code) === -1;
    }).map(function (course) { return course.code; });

    return jsonResponse_({
      ok: true,
      service: 'Coach Sam Pre-Test Receiver v3.0',
      sheetConnected: true,
      sheetTitle: spreadsheet.getName(),
      sheetId: spreadsheet.getId(),
      hasMasterSheet: existingNames.indexOf(PRETEST_CONFIG.masterSheetName) !== -1,
      courseCount: PRETEST_COURSES.length,
      readySheetCount: PRETEST_COURSES.length - missingCourses.length,
      missingCourseSheets: missingCourses
    });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return jsonResponse_({
      ok: false,
      service: 'Coach Sam Pre-Test Receiver v3.0',
      sheetConnected: false,
      message: 'ไม่สามารถเปิด Google Sheet ได้: ' + error.message
    });
  }
}

/** Endpoint รับข้อมูลการส่งข้อสอบ รองรับทั้ง fetch JSON และ Hidden Form Iframe */
function doPost(e) {
  let requestId = '';
  let isJsonMode = false;
  try {
    let rawPayload = '';
    if (e && e.parameter && e.parameter.payload) {
      rawPayload = e.parameter.payload;
    } else if (e && e.postData && e.postData.contents) {
      const contents = e.postData.contents;
      if (contents.startsWith('payload=')) {
        rawPayload = decodeURIComponent(contents.slice(8).replace(/\+/g, ' '));
      } else {
        rawPayload = contents;
      }
    }

    if (!rawPayload) throw new Error('ไม่พบข้อมูลแบบทดสอบ (Empty payload)');

    const payload = JSON.parse(rawPayload);
    isJsonMode = payload.responseMode === 'json';
    requestId = validateRequestId_(payload.requestId);
    const course = findCourse_(payload.courseCode);
    const submission = normalizeSubmission_(payload, course);

    console.log('กำลังบันทึกข้อมูลหลักสูตร:', course.code, 'ผู้เรียน:', submission.fullName);
    const result = saveSubmission_(submission);
    console.log('บันทึกผลสำเร็จ คะแนน:', submission.score, 'ซ้ำ:', result.duplicate);

    if (!result.duplicate && PRETEST_CONFIG.notifyOnSubmit && PRETEST_CONFIG.notifyEmail) {
      sendNotificationEmail_(submission);
    }

    const responseData = {
      ok: true,
      requestId: requestId,
      duplicate: result.duplicate,
      score: submission.score,
      maxScore: PRETEST_CONFIG.questionCount
    };

    return isJsonMode ? jsonResponse_(responseData) : postMessageResponse_(responseData);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการบันทึก:', error && error.stack ? error.stack : error);
    const errData = {
      ok: false,
      requestId: requestId,
      message: 'บันทึกผลไม่สำเร็จ: ' + (error.message || 'กรุณาตรวจข้อมูลแล้วลองใหม่อีกครั้ง')
    };
    return isJsonMode ? jsonResponse_(errData) : postMessageResponse_(errData);
  }
}

function getSpreadsheet_() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}

  if (PRETEST_CONFIG.fallbackSpreadsheetId) {
    try {
      return SpreadsheetApp.openById(PRETEST_CONFIG.fallbackSpreadsheetId);
    } catch (err) {}
  }

  throw new Error('ไม่พบ Google Sheet ปลายทาง กรุณาเปิด Extensions > Apps Script จากสเปรดชีตเป้าหมาย');
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

  if (fullName.length < 2) {
    throw new Error('กรุณาระบุชื่อ-นามสกุลให้ถูกต้อง (อย่างน้อย 2 ตัวอักษร)');
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

/**
 * บันทึกข้อมูลลงทั้งแท็บรวม (Master) และแท็บแยกรายวิชา พร้อม CacheService ลดคอขวด LockService
 */
function saveSubmission_(submission) {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'sub_' + submission.requestId;
  if (cache.get(cacheKey)) {
    return { duplicate: true };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    // ตรวจซ้ำใน Cache อีกครั้งหลังได้ Lock
    if (cache.get(cacheKey)) {
      return { duplicate: true };
    }

    const spreadsheet = getSpreadsheet_();
    const masterSheet = getOrCreateMasterSheet_(spreadsheet);
    const courseSheet = getOrCreateCourseSheet_(spreadsheet, submission.course);

    // ตรวจซ้ำใน Master Sheet (เฉพาะ 500 แถวล่าสุดเพื่อความเร็วสูงสุด)
    const masterLastRow = masterSheet.getLastRow();
    if (masterLastRow > 1) {
      const startRow = Math.max(2, masterLastRow - 499);
      const idRange = masterSheet.getRange(startRow, PRETEST_CONFIG.requestIdColumn, masterLastRow - startRow + 1, 1);
      const existing = idRange.createTextFinder(submission.requestId)
        .matchEntireCell(true)
        .findNext();
      if (existing) {
        cache.put(cacheKey, '1', PRETEST_CONFIG.dedupeCacheTtlSeconds);
        return { duplicate: true };
      }
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

    masterSheet.appendRow(row);
    courseSheet.appendRow(row);

    cache.put(cacheKey, '1', PRETEST_CONFIG.dedupeCacheTtlSeconds);
    return { duplicate: false };
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateMasterSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(PRETEST_CONFIG.masterSheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(PRETEST_CONFIG.masterSheetName, 0);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, PRETEST_HEADERS.length).setValues([PRETEST_HEADERS]);
    formatCourseSheet_(sheet, '#102a4e');
  }
  return sheet;
}

/** สร้างแท็บ Dashboard สรุปภาพรวมและคะแนนเฉลี่ยรายวิชาอัตโนมัติ */
function setupDashboardSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(PRETEST_CONFIG.dashboardSheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(PRETEST_CONFIG.dashboardSheetName, 0);
  }
  sheet.clear();
  sheet.getRange('A1:E1').merge()
    .setValue('COACH SAM — Pre-Test Summary Dashboard')
    .setFontSize(14).setFontWeight('bold').setFontColor('#ffffff').setBackground('#0c1c35')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 44);

  const master = "'" + PRETEST_CONFIG.masterSheetName + "'";
  sheet.getRange('A3:C3').setValues([['จำนวนผู้เข้าสอบทั้งหมด', 'คะแนนเฉลี่ยรวม (เต็ม 10)', 'เปอร์เซ็นต์เฉลี่ยรวม (%)']])
    .setFontWeight('bold').setBackground('#eef2f7').setFontColor('#0c1c35');
  sheet.getRange('A4').setFormula('=MAX(0, COUNTA(' + master + '!A2:A))').setNumberFormat('#,##0');
  sheet.getRange('B4').setFormula('=IFERROR(AVERAGE(' + master + '!J2:J), 0)').setNumberFormat('0.00');
  sheet.getRange('C4').setFormula('=IFERROR(AVERAGE(' + master + '!L2:L), 0)').setNumberFormat('0.0"%"');
  sheet.getRange('A4:C4').setFontSize(16).setFontWeight('bold').setFontColor('#99752d');

  sheet.getRange('A6').setValue('สรุปผลแยกตามรายหลักสูตร').setFontWeight('bold').setFontSize(11).setFontColor('#0c1c35');
  sheet.getRange('A7:E7').setValues([['รหัสหลักสูตร', 'ชื่อหลักสูตร', 'จำนวนผู้เข้าสอบ', 'คะแนนเฉลี่ย', 'เปอร์เซ็นต์เฉลี่ย (%)']])
    .setFontWeight('bold').setFontColor('#ffffff').setBackground('#142b4c');
  sheet.getRange('A8').setFormula(
    '=IFERROR(QUERY(' + master + '!A2:L, "SELECT B, C, COUNT(A), AVG(J), AVG(L) WHERE A IS NOT NULL GROUP BY B, C ORDER BY COUNT(A) DESC LABEL B \'\', C \'\', COUNT(A) \'\', AVG(J) \'\', AVG(L) \'\'", 0), "ยังไม่มีข้อมูลผู้เข้าสอบ")'
  );
  sheet.getRange('D8:D100').setNumberFormat('0.00');
  sheet.getRange('E8:E100').setNumberFormat('0.0');
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 420);
  sheet.setColumnWidths(3, 3, 150);
  return sheet;
}

function sendNotificationEmail_(submission) {
  try {
    const pct = Math.round(submission.score / PRETEST_CONFIG.questionCount * 100);
    const subject = '[Pre-Test] ' + submission.course.code + ' - ' + submission.fullName + ' (' + submission.score + '/' + PRETEST_CONFIG.questionCount + ')';
    const body =
      'มีผู้ส่งแบบทดสอบก่อนเรียนใหม่\n\n' +
      'หลักสูตร: ' + submission.course.code + ' ' + submission.course.name + '\n' +
      'ชื่อ-สกุล: ' + submission.fullName + '\n' +
      'คะแนน: ' + submission.score + ' / ' + PRETEST_CONFIG.questionCount + ' (' + pct + '%)\n' +
      'จังหวัด: ' + submission.province + '\n' +
      'เบอร์โทร: ' + submission.phone + '\n' +
      'LINE ID: ' + submission.lineId + '\n' +
      'อีเมล: ' + submission.email + '\n';
    MailApp.sendEmail(PRETEST_CONFIG.notifyEmail, subject, body);
  } catch (err) {
    console.warn('ส่งอีเมลแจ้งเตือนไม่สำเร็จ (ไม่กระทบการบันทึกชีต):', err);
  }
}

function getOrCreateCourseSheet_(spreadsheet, course) {
  let sheet = spreadsheet.getSheetByName(course.code);
  if (!sheet) sheet = spreadsheet.insertSheet(course.code);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, PRETEST_HEADERS.length).setValues([PRETEST_HEADERS]);
    formatCourseSheet_(sheet, '#0c1c35');
  }
  return sheet;
}

function formatCourseSheet_(sheet, headerColor) {
  const header = sheet.getRange(1, 1, 1, PRETEST_HEADERS.length);
  header
    .setValues([PRETEST_HEADERS])
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground(headerColor || '#0c1c35')
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

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function postMessageResponse_(message) {
  const messageJson = JSON.stringify(message).replace(/</g, '\\u003c');
  const html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<script>window.top.postMessage(' + messageJson + ', "*");</script>' +
    '</body></html>';
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
