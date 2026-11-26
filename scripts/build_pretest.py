#!/usr/bin/env python3
"""Extracts quiz bank and generates standalone shared pretest.js for all course pages."""
import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

ep_m = re.search(r"const PRETEST_ENDPOINT\s*=\s*'([^']+)';", html)
grp_m = re.search(r"(const PRETEST_GROUPS=\{.*?\};)", html, re.DOTALL)
map_m = re.search(r"(const COURSE_PRETEST_GROUP=\{.*?\};)", html, re.DOTALL)

if not (ep_m and grp_m and map_m):
    raise RuntimeError("Could not find pretest blocks in index.html")

template = r'''/* Coach Sam Pre-Test Shared Module (v3.5) */
(function () {
  const PRETEST_ENDPOINT = '__ENDPOINT__';
  __GROUPS__
  __MAPPING__
  const THAI_PROVINCES = [
    'กรุงเทพมหานคร','กระบี่','กาญจนบุรี','กาฬสินธุ์','กำแพงเพชร','ขอนแก่น','จันทบุรี','ฉะเชิงเทรา','ชลบุรี','ชัยนาท',
    'ชัยภูมิ','ชุมพร','เชียงราย','เชียงใหม่','ตรัง','ตราด','ตาก','นครนายก','นครปฐม','นครพนม',
    'นครราชสีมา','นครศรีธรรมราช','นครสวรรค์','นนทบุรี','นราธิวาส','น่าน','บึงกาฬ','บุรีรัมย์','ปทุมธานี','ประจวบคีรีขันธ์',
    'ปราจีนบุรี','ปัตตานี','พระนครศรีอยุธยา','พะเยา','พังงา','พัทลุง','พิจิตร','พิษณุโลก','เพชรบุรี','เพชรบูรณ์',
    'แพร่','ภูเก็ต','มหาสารคาม','มุกดาหาร','แม่ฮ่องสอน','ยโสธร','ยะลา','ร้อยเอ็ด','ระนอง','ระยอง',
    'ราชบุรี','ลพบุรี','ลำปาง','ลำพูน','เลย','ศรีสะเกษ','สกลนคร','สงขลา','สตูล','สมุทรปราการ',
    'สมุทรสงคราม','สมุทรสาคร','สระแก้ว','สระบุรี','สิงห์บุรี','สุโขทัย','สุพรรณบุรี','สุราษฎร์ธานี','สุรินทร์','หนองคาย',
    'หนองบัวลำภู','อ่างทอง','อำนาจเจริญ','อุดรธานี','อุตรดิตถ์','อุทัยธานี','อุบลราชธานี'
  ];

  function ensureModalDom() {
    if (document.getElementById('pretestModal')) return;
    const style = document.createElement('style');
    style.textContent = `
      .pretest-modal[hidden],.pretest-view[hidden]{display:none!important}
      .pretest-modal{position:fixed;inset:0;z-index:1000;background:rgba(8,18,34,.72);display:grid;place-items:center;padding:1rem}
      .pretest-dialog{width:min(760px,100%);max-height:min(90vh,900px);overflow:auto;background:#fff;border-radius:18px;box-shadow:0 20px 80px #07152a80;padding:clamp(1rem,4vw,2rem);position:relative;color:#172235}
      .pretest-dialog h2{color:#0c1c35;margin:.15rem 2.5rem .2rem 0}
      .pretest-close{position:absolute;right:1rem;top:1rem;border:1px solid #e4e8ee;border-radius:50%;width:42px;height:42px;background:#fff;font-size:1.4rem;cursor:pointer;color:#0c1c35}
      .pretest-code{color:#647087;margin-top:0}
      .pretest-progress{position:sticky;top:0;z-index:2;background:#fff;padding:.45rem 0 .65rem;border-bottom:1px solid #e4e8ee;margin-bottom:.75rem;display:flex;flex-direction:column;gap:.35rem;font-size:.82rem;color:#0c1c35;font-weight:600}
      .pretest-progress-track{height:6px;background:#e8edf3;border-radius:999px;overflow:hidden}
      .pretest-progress-bar{height:100%;width:0;background:linear-gradient(90deg,#0c1c35,#c7a55b);border-radius:999px;transition:width .25s ease}
      .quiz-question{border:1px solid #e4e8ee;border-radius:12px;padding:.75rem 1rem 1rem;margin:1rem 0}
      .quiz-question legend{font-weight:700;padding:0 .3rem}
      .quiz-question legend span{color:#99752d;margin-right:.35rem}
      .quiz-choice{display:flex;align-items:flex-start;gap:.6rem;padding:.48rem .3rem;cursor:pointer}
      .quiz-choice input{margin-top:.45rem;accent-color:#0c1c35}
      .choice-letter{font-weight:700;color:#99752d;min-width:1.3rem}
      .pretest-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
      .pretest-field{display:flex;flex-direction:column;gap:.25rem}
      .pretest-field.full{grid-column:1/-1}
      .pretest-field input,.pretest-field select{font:inherit;border:1px solid #bbc4d0;border-radius:8px;padding:.68rem .75rem;min-width:0}
      .pretest-field input:focus,.pretest-field select:focus{outline:3px solid #ead9a9;border-color:#98752e}
      .pretest-consent{display:flex;gap:.6rem;align-items:flex-start;margin:1rem 0}
      .pretest-consent input{margin-top:.5rem}
      .pretest-actions{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:1rem}
      .pretest-primary{background:#0c1c35;color:#fff;border:0;border-radius:9px;padding:.72rem 1.1rem;font-weight:700;cursor:pointer;font:inherit}
      .pretest-primary:disabled{opacity:.55;cursor:wait}
      .pretest-status{min-height:1.6em;color:#8a4c00;margin-top:.75rem}
      .pretest-score{font:700 2.6rem Georgia,'Times New Roman',serif;color:#99752d;margin:.3rem 0}
      .pretest-spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(138,76,0,.25);border-top-color:#8a4c00;border-radius:50%;animation:pretestSpin .7s linear infinite;vertical-align:-2px;margin-right:.4rem}
      @keyframes pretestSpin{to{transform:rotate(360deg)}}
      .modal-open{overflow:hidden}
      @media(max-width:600px){.pretest-form-grid{grid-template-columns:1fr}.pretest-field.full{grid-column:auto}.pretest-dialog{max-height:94vh;padding:1rem}}
    `;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="pretest-modal" id="pretestModal" role="presentation" hidden>
        <section class="pretest-dialog" role="dialog" aria-modal="true" aria-labelledby="pretestTitle" aria-describedby="pretestCode">
          <button type="button" class="pretest-close" id="closePretest" aria-label="ปิดหน้าต่าง">×</button>
          <h2 id="pretestTitle">แบบทดสอบก่อนเรียน</h2>
          <p id="pretestCode" class="pretest-code"></p>
          <div class="pretest-view" id="pretestQuizView">
            <p>เลือกคำตอบที่เหมาะสมที่สุดให้ครบทั้ง 10 ข้อ</p>
            <div class="pretest-progress" id="pretestProgress">
              <span>ความคืบหน้า: <strong id="pretestAnsweredCount">0</strong> / 10 ข้อ</span>
              <div class="pretest-progress-track"><div class="pretest-progress-bar" id="pretestProgressBar"></div></div>
            </div>
            <form id="pretestQuizForm">
              <div id="pretestQuestions"></div>
              <div class="pretest-actions"><button class="pretest-primary" type="submit">ส่งข้อสอบ</button></div>
            </form>
          </div>
          <div class="pretest-view" id="pretestContactView" hidden>
            <p>กรอกข้อมูลเพื่อบันทึกผลและรับคะแนนประเมิน</p>
            <form id="pretestContactForm">
              <div class="pretest-form-grid">
                <label class="pretest-field full">ชื่อ-สกุล (ภาษาไทย หรือ อังกฤษ)<input id="pretestName" name="fullNameTh" autocomplete="name" required maxlength="120" placeholder="เช่น สุทธิพจน์ ศรีแสนยงค์ หรือ Suttiphod Sriseanyong"></label>
                <label class="pretest-field">อีเมล<input name="email" type="email" autocomplete="email" required maxlength="254"></label>
                <label class="pretest-field">Line ID<input name="lineId" autocomplete="off" required maxlength="100"></label>
                <label class="pretest-field">เบอร์โทร<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="30"></label>
                <label class="pretest-field">จังหวัดที่อยู่<select name="province" id="pretestProvince" required><option value="">เลือกจังหวัด</option></select></label>
              </div>
              <label class="pretest-consent"><input type="checkbox" name="consent" required><span>ยินยอมให้เก็บข้อมูลติดต่อและผลคะแนนเพื่อประเมินการเรียนรู้และจัดทำสถิติการอบรม</span></label>
              <div class="pretest-actions">
                <button class="pretest-primary" type="button" id="pretestBack">กลับไปแก้คำตอบ</button>
                <button class="pretest-primary" id="pretestSendButton" type="submit">รับคะแนนประเมิน</button>
              </div>
            </form>
          </div>
          <div class="pretest-view" id="pretestResultView" hidden>
            <p>คะแนน Pre-Test ของคุณ</p>
            <div class="pretest-score"><span id="pretestScore"></span> <small id="pretestPercent"></small></div>
            <p>บันทึกผลใน Google Sheets เรียบร้อยแล้ว</p>
            <button class="pretest-primary" type="button" id="pretestDone">เสร็จสิ้น</button>
          </div>
          <p class="pretest-status" id="pretestStatus" role="status" aria-live="polite"></p>
        </section>
      </div>
      <iframe name="pretestResponseFrame" id="pretestResponseFrame" title="ผลการส่งแบบทดสอบ" hidden></iframe>
      <form id="pretestPostForm" method="post" target="pretestResponseFrame" action="${PRETEST_ENDPOINT}" hidden><input id="pretestPayload" name="payload"></form>
    `;
    document.body.appendChild(wrap);
  }

  ensureModalDom();

  const pretestModal = document.getElementById('pretestModal');
  const pretestFrame = document.getElementById('pretestResponseFrame');
  const pretestPostForm = document.getElementById('pretestPostForm');
  const pretestPayloadField = document.getElementById('pretestPayload');
  const pretestStatus = document.getElementById('pretestStatus');
  if (pretestPostForm) pretestPostForm.action = PRETEST_ENDPOINT;

  const provinceSelect = document.getElementById('pretestProvince');
  if (provinceSelect && provinceSelect.options.length <= 1) {
    THAI_PROVINCES.forEach(name => {
      const o = document.createElement('option');
      o.value = name;
      o.textContent = name;
      provinceSelect.append(o);
    });
  }

  let activePretest = null;
  let currentRequestId = null;
  let submitTimeout = null;

  function createSubmissionId() {
    return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  }

  function openPretestByCode(code, title) {
    const group = COURSE_PRETEST_GROUP[code];
    const questions = PRETEST_GROUPS[group];
    if (!questions || questions.length !== 10) {
      alert('ยังไม่พบชุดข้อสอบสำหรับหลักสูตรนี้');
      return;
    }
    currentRequestId = createSubmissionId();
    activePretest = { code, title: title || ('หลักสูตร ' + code), questions, answers: null, requestId: currentRequestId };
    document.getElementById('pretestQuizForm').reset();
    document.getElementById('pretestContactForm').reset();
    document.getElementById('pretestSendButton').disabled = false;
    document.getElementById('pretestTitle').textContent = activePretest.title;
    document.getElementById('pretestCode').textContent = 'รหัสหลักสูตร ' + code;
    document.getElementById('pretestQuizView').hidden = false;
    document.getElementById('pretestContactView').hidden = true;
    document.getElementById('pretestResultView').hidden = true;
    document.getElementById('pretestQuestions').innerHTML = questions.map((item, index) => {
      const options = item[1].map((choice, originalIndex) => ({ choice, originalIndex }));
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      return `<fieldset class="quiz-question"><legend><span>ข้อ ${index + 1}</span> ${item[0]}</legend>${options.map((option, displayIndex) => `<label class="quiz-choice"><input type="radio" name="q${index}" value="${option.originalIndex}" required><span class="choice-letter">${'ABCD'[displayIndex]}</span><span>${option.choice}</span></label>`).join('')}</fieldset>`;
    }).join('');
    document.getElementById('pretestAnsweredCount').textContent = '0';
    document.getElementById('pretestProgressBar').style.width = '0%';
    pretestStatus.textContent = '';
    pretestModal.hidden = false;
    document.body.classList.add('modal-open');
    document.getElementById('closePretest').focus();
  }

  function closePretest() {
    if (submitTimeout) clearTimeout(submitTimeout);
    pretestModal.hidden = true;
    document.body.classList.remove('modal-open');
    activePretest = null;
    currentRequestId = null;
  }

  function handlePretestResponse(data) {
    if (submitTimeout) clearTimeout(submitTimeout);
    document.getElementById('pretestSendButton').disabled = false;
    if (!data || !data.ok) {
      pretestStatus.textContent = (data && data.message) || 'บันทึกผลไม่สำเร็จ กรุณาลองใหม่';
      return;
    }
    document.getElementById('pretestContactView').hidden = true;
    document.getElementById('pretestResultView').hidden = false;
    document.getElementById('pretestScore').textContent = `${data.score} / ${data.maxScore}`;
    document.getElementById('pretestPercent').textContent = `${Math.round(data.score / data.maxScore * 100)}%`;
    pretestStatus.textContent = data.duplicate ? 'รายการนี้ถูกบันทึกแล้ว' : 'บันทึกผลใน Google Sheets เรียบร้อย';
    document.getElementById('pretestDone').focus();
  }

  document.getElementById('pretestQuestions').addEventListener('change', () => {
    const count = document.querySelectorAll('#pretestQuestions input[type="radio"]:checked').length;
    document.getElementById('pretestAnsweredCount').textContent = String(count);
    document.getElementById('pretestProgressBar').style.width = (count * 10) + '%';
  });

  document.getElementById('closePretest').addEventListener('click', closePretest);
  document.getElementById('pretestDone').addEventListener('click', closePretest);
  pretestModal.addEventListener('click', event => { if (event.target === pretestModal) closePretest(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !pretestModal.hidden) closePretest(); });

  document.getElementById('pretestQuizForm').addEventListener('submit', event => {
    event.preventDefault();
    const values = activePretest.questions.map((_, index) => new FormData(event.currentTarget).get('q' + index));
    if (values.some(value => !value)) {
      pretestStatus.textContent = 'กรุณาตอบคำถามให้ครบทั้ง 10 ข้อ';
      return;
    }
    activePretest.answers = values.map(Number);
    document.getElementById('pretestQuizView').hidden = true;
    document.getElementById('pretestContactView').hidden = false;
    pretestStatus.textContent = 'กรอกข้อมูลเพื่อบันทึกผลและรับคะแนนประเมิน';
    document.getElementById('pretestName').focus();
  });

  document.getElementById('pretestBack').addEventListener('click', () => {
    document.getElementById('pretestContactView').hidden = true;
    document.getElementById('pretestQuizView').hidden = false;
    pretestStatus.textContent = 'ตรวจคำตอบก่อนส่งได้ครับ';
  });

  document.getElementById('pretestContactForm').addEventListener('submit', async event => {
    event.preventDefault();
    if (!activePretest || !activePretest.answers) {
      pretestStatus.textContent = 'ไม่พบคำตอบ กรุณาทำข้อสอบอีกครั้ง';
      return;
    }
    const values = new FormData(event.currentTarget);
    currentRequestId = activePretest.requestId;
    const payload = {
      requestId: currentRequestId,
      courseCode: activePretest.code,
      fullNameTh: values.get('fullNameTh'),
      email: values.get('email'),
      lineId: values.get('lineId'),
      phone: values.get('phone'),
      province: values.get('province'),
      consent: values.get('consent') === 'on',
      answers: activePretest.answers,
      responseMode: 'json'
    };
    document.getElementById('pretestSendButton').disabled = true;
    pretestStatus.innerHTML = '<span class="pretest-spinner" aria-hidden="true"></span>กำลังบันทึกผลแบบทดสอบและตรวจคะแนน…';
    try {
      const controller = new AbortController();
      submitTimeout = setTimeout(() => controller.abort(), 25000);
      const res = await fetch(PRETEST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        redirect: 'follow',
        signal: controller.signal
      });
      clearTimeout(submitTimeout);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (data.requestId === currentRequestId) {
        handlePretestResponse(data);
        return;
      }
      throw new Error('Invalid response ID');
    } catch (err) {
      if (err && err.name === 'AbortError') {
        document.getElementById('pretestSendButton').disabled = false;
        pretestStatus.textContent = 'การเชื่อมต่อใช้เวลานานกว่าปกติ กรุณาลองกดส่งอีกครั้ง';
        return;
      }
      delete payload.responseMode;
      pretestPayloadField.value = JSON.stringify(payload);
      pretestPostForm.submit();
      submitTimeout = setTimeout(() => {
        document.getElementById('pretestSendButton').disabled = false;
        pretestStatus.textContent = 'ยังไม่ได้รับคำยืนยันจากชีต ผลอาจบันทึกแล้ว หากลองส่งซ้ำ ระบบจะตรวจรายการเดิม';
      }, 30000);
    }
  });

  window.addEventListener('message', event => {
    if (event.source !== pretestFrame.contentWindow) return;
    if ((!event.origin.endsWith('googleusercontent.com') && !event.origin.endsWith('google.com')) || !event.data || event.data.requestId !== currentRequestId) return;
    handlePretestResponse(event.data);
  });

  document.querySelectorAll('[data-open-pretest]').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-course-code');
      const title = btn.getAttribute('data-course-title');
      if (code) openPretestByCode(code, title);
    });
  });

  window.openCoachSamPretest = openPretestByCode;
})();
'''

pretest_js = (
    template
    .replace('__ENDPOINT__', ep_m.group(1))
    .replace('__GROUPS__', grp_m.group(1))
    .replace('__MAPPING__', map_m.group(1))
)

with open("pretest.js", "w", encoding="utf-8") as out:
    out.write(pretest_js)

print(f"Generated pretest.js successfully ({len(pretest_js.encode('utf-8'))} bytes)")
