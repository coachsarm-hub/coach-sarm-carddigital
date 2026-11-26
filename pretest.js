/* Coach Sam Pre-Test Shared Module (v3.5) */
(function () {
  const PRETEST_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyvMaG-azDpYqQqua-F7myoJIYj5TIrnE6g5Ytky_x5kuvYno9x-Sqm1PHWYWMPmG90/exec';
  const PRETEST_GROUPS={
project:[
['วงจรโครงการพัฒนาซอฟต์แวร์โดยทั่วไปเริ่มจากอะไร',['วางแผนโครงการ','ปิดโครงการ','ส่งมอบระบบ','บำรุงรักษา']],
['ขอบเขตโครงการใช้ระบุสิ่งใด',['ผลลัพธ์และงานที่รวมในโครงการ','วันหยุดของทีม','งบกำไรของบริษัท','รายชื่อผู้ขายทั้งหมด']],
['แผนงานแบบ Gantt ช่วยเรื่องใด',['แสดงกิจกรรมและช่วงเวลา','ตรวจข้อผิดพลาดโค้ด','ออกแบบฐานข้อมูล','คำนวณภาษี']],
['เมื่อมีคำขอเปลี่ยนแปลง ควรทำอย่างไร',['ประเมินผลกระทบก่อนอนุมัติ','เพิ่มงานทันที','ยกเลิกโครงการ','ข้ามการบันทึก']],
['ความเสี่ยงของโครงการควรจัดการอย่างไร',['ระบุ ประเมิน และวางแผนตอบสนอง','รอให้เกิดแล้วค่อยคิด','ซ่อนจากทีม','ตัดงบสำรองทั้งหมด']],
['การประชุมยืนรายวันใน Agile มีเป้าหมายหลักอะไร',['ประสานงานและเปิดเผยอุปสรรค','อนุมัติค่าใช้จ่าย','ประเมินผลรายปี','สรุปสัญญา']],
['เกณฑ์ยอมรับงานช่วยให้ทีมทราบอะไร',['เงื่อนไขที่งานต้องผ่าน','ใครมีวันลา','เครื่องมือที่ห้ามใช้','ราคาขายสินค้า']],
['เมื่อพบงานล่าช้า ผู้จัดการควรเริ่มจากอะไร',['ตรวจสาเหตุและผลกระทบต่อแผน','ตำหนิผู้ทำงานทันที','ลบงานออกจากแผน','หยุดสื่อสารกับลูกค้า']],
['การทดสอบรับมอบระบบทำโดยใครเป็นหลัก',['ผู้ใช้หรือตัวแทนธุรกิจ','ผู้ขายอุปกรณ์เท่านั้น','ฝ่ายบัญชีเท่านั้น','ผู้ดูแลอาคาร']],
['เอกสารบทเรียนหลังโครงการมีประโยชน์อย่างไร',['นำประสบการณ์ไปปรับปรุงโครงการถัดไป','ใช้แทนซอร์สโค้ด','ปิดสิทธิ์ผู้ใช้','ลดจำนวนการทดสอบ']]
],
aiCoding:[
['AI coding assistant เหมาะกับการใช้งานแบบใด',['ช่วยร่างหรืออธิบายโค้ดให้ผู้พัฒนาตรวจ','อนุมัติงบประมาณแทนทีม','แทนการทดสอบทั้งหมด','จัดการสิทธิ์องค์กรเอง']],
['ก่อนนำโค้ดที่ AI สร้างไปใช้ ควรทำอะไร',['ตรวจความถูกต้องและความปลอดภัย','เผยแพร่ทันที','ลบชุดทดสอบ','ส่งรหัสผ่านให้โมเดล']],
['Prompt ที่ดีควรมีอะไร',['บริบท เป้าหมาย และข้อจำกัด','คำสั่งคลุมเครืออย่างเดียว','ข้อมูลส่วนตัวทั้งหมด','เฉพาะชื่อไฟล์']],
['Unit test ใช้ตรวจอะไร',['พฤติกรรมของส่วนย่อยของโปรแกรม','ความเร็วอินเทอร์เน็ตสำนักงาน','สีของโลโก้','สิทธิ์วันลา']],
['หาก AI อ้างชื่อฟังก์ชันที่ไม่มีจริง ควรทำอย่างไร',['ตรวจเอกสารและรันทดสอบ','เชื่อคำตอบทันที','ลบโปรเจกต์','เปลี่ยนภาษาโปรแกรม']],
['การส่ง secret key เข้า prompt มีความเสี่ยงอะไร',['ข้อมูลรับรองอาจรั่วไหล','โค้ดจะเร็วขึ้นเสมอ','สร้างชุดทดสอบอัตโนมัติ','ลดขนาดไฟล์']],
['การใช้ version control ช่วยเรื่องใด',['ติดตามและย้อนการเปลี่ยนแปลง','ซ่อน bug ทุกชนิด','แทนระบบสำรองทั้งหมด','เพิ่มความเร็ว CPU']],
['แนวทาง Human-in-the-loop หมายถึงอะไร',['คนตรวจและตัดสินใจในจุดสำคัญ','AI ทำงานโดยไม่มีการกำกับ','ปิดการบันทึกผล','ให้ผู้ใช้แชร์รหัสผ่าน']],
['เมื่อ AI เสนอ dependency ใหม่ ควรตรวจอะไร',['แหล่งที่มา ความปลอดภัย และใบอนุญาต','สีไอคอนเท่านั้น','ขนาดหน้าจอ','จำนวนผู้ใช้ในทีม']],
['AI ช่วยพัฒนานวัตกรรมได้ดีที่สุดเมื่อใด',['ใช้เป็นผู้ช่วยและตรวจผลด้วยเกณฑ์ชัดเจน','ให้สิทธิ์ทุกระบบโดยไม่จำกัด','แทนการคุยกับผู้ใช้','ไม่ต้องทดสอบต้นแบบ']]
],
vision:[
['ภาพดิจิทัลแบบ raster ประกอบจากอะไร',['พิกเซล','แถวข้อมูลข้อความเท่านั้น','คลื่นเสียง','รายการ URL']],
['ภาพระดับสีเทาเก็บข้อมูลหลักแบบใด',['ค่าความสว่างต่อพิกเซล','พิกัด GPS','เสียงต่อเฟรม','ชื่อผู้ใช้']],
['การ resize ภาพเปลี่ยนสิ่งใด',['จำนวนพิกเซลและมิติภาพ','ชื่อไฟล์อย่างเดียว','สิทธิ์เข้าถึง','ค่า label โดยอัตโนมัติ']],
['ชุดข้อมูลฝึกสอนควรแยกส่วนใดเพื่อประเมินโมเดล',['training, validation และ test','บัญชีผู้ใช้และรหัสผ่าน','ภาพสีและเสียงเท่านั้น','ไฟล์บีบอัดกับไฟล์เอกสาร']],
['Overfitting คืออะไร',['โมเดลจำข้อมูลฝึกแต่ทั่วไปกับข้อมูลใหม่ได้ไม่ดี','โมเดลไม่เรียนรู้อะไรเลย','ภาพมีความละเอียดสูง','โปรแกรมใช้หน่วยความจำน้อย']],
['Data augmentation มีประโยชน์อย่างไร',['เพิ่มความหลากหลายของตัวอย่างฝึก','ลบ label ทั้งหมด','แทนการแบ่งชุดทดสอบ','เปลี่ยนภาพเป็นข้อความเสมอ']],
['Confusion matrix ใช้ดูอะไร',['ผลจำแนกถูกและผิดตามคลาส','ขนาดภาพต้นฉบับ','เวลาสร้างไฟล์','รายชื่อผู้พัฒนา']],
['Object detection ต่างจาก image classification อย่างไร',['ระบุตำแหน่งวัตถุพร้อมชนิด','จำแนกภาพทั้งภาพอย่างเดียว','สร้างเสียงจากภาพ','จัดเก็บไฟล์บนคลาวด์']],
['การปรับ contrast ส่งผลหลักต่ออะไร',['ความแตกต่างระหว่างส่วนมืดและสว่าง','จำนวนผู้ใช้ระบบ','ชื่อโมเดล','ชนิดฐานข้อมูล']],
['ก่อนนำภาพบุคคลไปใช้ฝึกโมเดล ควรคำนึงถึงอะไร',['สิทธิ ความยินยอม และความเป็นส่วนตัว','ขนาดหน้าจอผู้ดูแล','สีของสายสัญญาณ','ความเร็วพิมพ์']]
],
web:[
['HTML ใช้ทำหน้าที่หลักอะไร',['กำหนดโครงสร้างเนื้อหาเว็บ','จัดเก็บรหัสผ่านผู้ใช้','ประมวลผลภาพด้วย GPU','ตั้งค่าเครือข่าย Wi-Fi']],
['CSS ใช้ทำอะไร',['กำหนดรูปแบบและการจัดวาง','จัดการข้อมูลบนเซิร์ฟเวอร์เท่านั้น','แทน HTML','สร้างฐานข้อมูล']],
['JavaScript ในเว็บช่วยทำอะไร',['เพิ่มพฤติกรรมโต้ตอบ','แทนระบบปฏิบัติการ','จัดการสายไฟ','สร้างไฟล์ PDF ทุกชนิด']],
['ตัวแปร const ใน JavaScript มีลักษณะอย่างไร',['ไม่สามารถกำหนดค่าใหม่ให้ binding เดิม','เป็นตัวแปร global เสมอ','เก็บได้เฉพาะตัวเลข','ใช้ได้เฉพาะใน HTML']],
['DOM หมายถึงอะไร',['โครงสร้างเอกสารที่สคริปต์เข้าถึงได้','ชื่อฐานข้อมูล JavaScript','เครื่องมือบีบอัดรูป','มาตรฐานอีเมล']],
['HTTP status 404 โดยทั่วไปหมายถึงอะไร',['ไม่พบทรัพยากรที่ร้องขอ','สำเร็จเสมอ','ไม่มีอินเทอร์เน็ตในโลก','เซิร์ฟเวอร์ปิดปรับปรุงเท่านั้น']],
['React ใช้แนวคิด component เพื่ออะไร',['แบ่ง UI เป็นส่วนที่นำกลับมาใช้ได้','เข้ารหัสรหัสผ่าน','แทน CSS ทั้งหมด','เชื่อมต่อจอภาพ']],
['เหตุใดควรตรวจ input จากผู้ใช้',['ลดข้อมูลผิดรูปแบบและความเสี่ยง','ทำให้เว็บไม่ต้องมี backend','เพิ่มขนาดภาพ','ปิดการเข้าถึงคีย์บอร์ด']],
['Responsive design ช่วยอะไร',['ให้หน้าเว็บปรับกับขนาดหน้าจอ','แสดงหน้าเดียวกันเฉพาะ desktop','ปิด JavaScript','แทนการทดสอบ']],
['การใช้ HTTPS ให้ประโยชน์หลักข้อใด',['เข้ารหัสการสื่อสารระหว่าง browser กับ server','รับประกันว่าเว็บไม่มี bug','ทำให้ผู้ใช้ไม่ต้องยืนยันตัวตน','ลบข้อมูลเก่าทุกวัน']]
],
ecommerce:[
['หน้าสินค้าที่ดีควรให้ข้อมูลใดครบ',['ราคา รายละเอียด ภาพ และเงื่อนไข','ชื่อร้านอย่างเดียว','เบอร์ส่วนตัวลูกค้าทุกคน','รหัสหลังบ้าน']],
['Conversion rate ใช้วัดอะไร',['สัดส่วนผู้เข้าชมที่ทำเป้าหมายสำเร็จ','จำนวนสินค้าคงคลัง','ความเร็วพิมพ์','จำนวนพนักงาน']],
['ตะกร้าสินค้ามีหน้าที่อะไร',['รวบรวมรายการก่อนสั่งซื้อ','เก็บรหัสผ่านเป็นข้อความ','แทนระบบชำระเงิน','คำนวณภาษีทุกประเทศอัตโนมัติ']],
['ข้อมูลใดควรใช้ยืนยันคำสั่งซื้อ',['รายการสินค้า ยอดรวม และข้อมูลจัดส่งที่จำเป็น','รหัสผ่านบัญชีลูกค้า','ข้อมูลบัตรเต็มในชีตสาธารณะ','ประวัติท่องเว็บทั้งหมด']],
['การจัดการสต็อกที่ดีช่วยอะไร',['ลดการขายเกินจำนวนคงเหลือ','เพิ่มรูปสินค้าเอง','แทนการขนส่ง','ลบคำสั่งซื้อ']],
['รีวิวลูกค้าควรจัดการอย่างไร',['แสดงตามจริงและมีแนวทางดูแลเนื้อหา','สร้างรีวิวปลอม','เผยแพร่ข้อมูลส่วนตัวผู้รีวิว','ลบรีวิวลบทั้งหมด']],
['การทดสอบ checkout ควรครอบคลุมอะไร',['การคำนวณยอด ชำระเงิน และยืนยันคำสั่งซื้อ','หน้าเข้าสู่ระบบอย่างเดียว','สีพื้นหลัง','จำนวนผู้ติดตาม']],
['HTTPS สำคัญกับร้านค้าออนไลน์อย่างไร',['ช่วยปกป้องข้อมูลระหว่างส่ง','ยืนยันคุณภาพสินค้า','แทนระบบชำระเงิน','ยกเลิกการคืนสินค้า']],
['ตะกร้าถูกทิ้งกลางทางอาจแก้ได้ด้วยอะไร',['ลดขั้นตอนและแจ้งค่าใช้จ่ายชัดเจน','ซ่อนค่าจัดส่งจนจบ','บังคับเก็บข้อมูลเกินจำเป็น','ปิดช่องทางช่วยเหลือ']],
['ตัวชี้วัดใดเหมาะประเมินการขายออนไลน์',['ยอดสั่งซื้อและอัตราการซื้อสำเร็จ','จำนวนไฟล์บนเครื่อง','ความยาวชื่อเว็บไซต์','รุ่นคีย์บอร์ด']]
],
tourismApp:[
['แอปท่องเที่ยวควรแสดงข้อมูลใดให้ผู้ใช้วางแผนได้',['สถานที่ เวลาเปิด และการเดินทาง','รหัสผ่านผู้ดูแล','ข้อมูลบัตรประชาชนผู้เดินทางอื่น','ซอร์สโค้ด']],
['การใช้ตำแหน่ง GPS ควรทำอย่างไร',['ขออนุญาตและอธิบายเหตุผล','เปิดตลอดโดยไม่แจ้ง','แชร์ตำแหน่งสาธารณะ','เก็บตำแหน่งไม่มีกำหนด']],
['แผนที่ในแอปช่วยผู้ใช้ด้านใด',['ค้นหาเส้นทางและตำแหน่งสถานที่','ชำระเงินอัตโนมัติ','ตรวจสอบพาสปอร์ต','แทนการสำรองข้อมูล']],
['ข้อมูลเวลาเปิดสถานที่ควรจัดการอย่างไร',['ระบุแหล่งและปรับปรุงเมื่อเปลี่ยน','คงข้อมูลเก่าเสมอ','ไม่ต้องแสดงวันหยุด','ให้ผู้ใช้เดาเอง']],
['การออกแบบแอปสำหรับนักท่องเที่ยวควรคำนึงถึงอะไร',['ภาษา การเชื่อมต่อ และการเข้าถึง','รุ่นอุปกรณ์ของผู้พัฒนา','สีที่ชอบของทีมเท่านั้น','ขนาดฐานข้อมูลอย่างเดียว']],
['ข้อมูลออฟไลน์มีประโยชน์เมื่อใด',['พื้นที่เชื่อมต่ออินเทอร์เน็ตไม่เสถียร','ทุกครั้งที่มี Wi-Fi','เมื่อปิดแอป','ใช้แทนข้อมูลล่าสุดทั้งหมด']],
['รีวิวสถานที่ช่วยการตัดสินใจอย่างไร',['ให้ข้อมูลประสบการณ์จากผู้ใช้','รับรองความปลอดภัยแน่นอน','แทนข้อมูลทางการ','บอกเวลาเปิดปัจจุบันได้เสมอ']],
['ระบบจองควรยืนยันอะไรหลังทำรายการ',['วันเวลา รายการ และสถานะการจอง','รหัสผ่านผู้ให้บริการ','รายชื่อผู้จองคนอื่น','ตำแหน่งต่อเนื่อง']],
['การแจ้งเตือนควรส่งเมื่อใด',['เมื่อเกี่ยวข้องและผู้ใช้ยินยอม','ส่งโฆษณาทุกนาที','ส่งข้อมูลส่วนตัวถึงทุกคน','ส่งแม้ปิดสิทธิ์แล้ว']],
['การทดสอบแอปท่องเที่ยวควรทดลองกับใคร',['ผู้ใช้และสถานการณ์เดินทางจริง','ทีมพัฒนาเพียงคนเดียว','เฉพาะผู้ดูแลระบบ','ไม่มีผู้ใช้']]
],
ux:[
['UX มุ่งเน้นเรื่องใด',['ประสบการณ์โดยรวมของผู้ใช้','สีของปุ่มอย่างเดียว','โครงสร้างเซิร์ฟเวอร์','ภาษาที่ใช้เขียน backend']],
['UI หมายถึงส่วนใดเป็นหลัก',['องค์ประกอบที่ผู้ใช้มองเห็นและโต้ตอบ','กระบวนการบัญชี','ความเร็วเครือข่าย','ฐานข้อมูล']],
['การสัมภาษณ์ผู้ใช้ช่วยให้ได้อะไร',['ความต้องการและปัญหาจากผู้ใช้จริง','คำตอบที่ทีมเดาไว้','ยอดขายที่รับประกัน','โค้ดสำเร็จรูป']],
['Wireframe ใช้ทำอะไร',['วางโครงหน้าจอก่อนลงรายละเอียดภาพ','ทดสอบความปลอดภัยเครือข่าย','เก็บข้อมูลส่วนตัว','แทน prototype ที่คลิกได้ทุกกรณี']],
['Prototype มีประโยชน์อย่างไร',['ทดลองแนวคิดและรับ feedback ก่อนพัฒนาเต็ม','แทนระบบจริงเสมอ','ใช้เก็บข้อมูลจริงโดยไม่แจ้ง','รับประกันยอดขาย']],
['ความ contrast ที่เพียงพอช่วยใคร',['ผู้ใช้ที่มีข้อจำกัดด้านการมองเห็น','เฉพาะผู้ดูแลระบบ','เฉพาะเครื่องพิมพ์','ผู้พัฒนา backend เท่านั้น']],
['การทดสอบ usability สังเกตอะไร',['ผู้ใช้ทำงานสำเร็จและติดขัดตรงไหน','สีที่ผู้พัฒนาชอบ','จำนวนไฟล์ใน repository','สเปคเซิร์ฟเวอร์']],
['Navigation ที่ชัดช่วยอย่างไร',['ผู้ใช้หาสิ่งที่ต้องการได้ง่าย','ทำให้เว็บไม่ต้องมีเนื้อหา','ลดความจำเป็นด้านความปลอดภัย','ลบขั้นตอนทั้งหมด']],
['การออกแบบกับผู้ใช้หมายถึงอะไร',['ใช้หลักฐานจากผู้ใช้ในกระบวนการออกแบบ','ให้ทีมตัดสินใจโดยไม่ทดสอบ','ออกแบบให้สวยอย่างเดียว','ทำให้เหมือนคู่แข่งทุกอย่าง']],
['หลังได้ผลทดสอบ usability ควรทำอะไร',['จัดลำดับปัญหาและปรับต้นแบบ','เพิกเฉยต่อผู้ใช้','ลบผลทดสอบ','หยุดเก็บ feedback']]
],
productivity:[
['ก่อนใช้ AI ช่วยเขียนเอกสาร ควรกำหนดอะไร',['เป้าหมาย ผู้อ่าน และรูปแบบผลลัพธ์','รหัสผ่านบัญชี','ข้อมูลลับทั้งหมด','คำสั่งให้แต่งข้อมูล']],
['ผลลัพธ์จาก AI ควรทำอย่างไร',['ตรวจข้อเท็จจริงและแก้ไขก่อนส่ง','ส่งต่อทันทีทุกกรณี','ถือว่าเป็นคำตอบทางการ','ไม่ต้องอ่าน']],
['ข้อมูลใดไม่ควรใส่ในเครื่องมือ AI สาธารณะโดยไม่อนุญาต',['ข้อมูลส่วนบุคคลหรือข้อมูลลับ','คำถามทั่วไป','ข้อความสาธารณะ','คำสั่งจัดรูปแบบ']],
['การให้ AI สรุปเอกสารควรระบุอะไร',['บริบทและความยาวสรุปที่ต้องการ','ชื่อผู้ใช้และรหัสผ่าน','ให้ละเว้นข้อเท็จจริง','ห้ามตรวจคำตอบ']],
['AI ช่วยร่างอีเมลได้อย่างไร',['สร้างร่างให้คนตรวจโทนและเนื้อหา','ส่งอีเมลแทนโดยไม่ตรวจ','เลือกผู้รับเองทุกครั้ง','รับประกันความถูกต้อง']],
['เมื่อข้อความ AI มีข้อมูลไม่ตรงต้นฉบับ ควรทำอย่างไร',['แก้ให้ตรงและอ้างอิงต้นทาง','เก็บไว้เพราะอ่านลื่น','เพิ่มข้อมูลสมมติ','ลบแหล่งอ้างอิง']],
['การสื่อสารที่เข้าถึงง่ายควรใช้ภาษาแบบใด',['ชัดเจน กระชับ เหมาะกับผู้รับ','ซับซ้อนโดยไม่จำเป็น','ใช้ศัพท์ย่อทั้งหมด','ไม่ระบุจุดประสงค์']],
['ทำไมควรหลีกเลี่ยงการป้อนข้อมูลอ่อนไหว',['ลดความเสี่ยงการเปิดเผยข้อมูล','ทำให้ AI ตอบเร็วขึ้น','เพิ่มความละเอียดภาพ','แก้คำผิดอัตโนมัติ']],
['การทำงานร่วมกับ AI ที่เหมาะสมคืออะไร',['ให้ AI ช่วยงานซ้ำและให้คนตรวจผล','มอบอำนาจตัดสินใจทุกเรื่อง','ไม่รับผิดชอบต่อผลลัพธ์','ปิดการตรวจสอบ']],
['Prompt ควรปรับอย่างไรเมื่อคำตอบไม่ตรง',['เพิ่มบริบทและข้อกำหนดให้ชัด','ใส่ข้อมูลลับเพิ่ม','ตัดเป้าหมายออก','ขอให้เดา']]
],
marketing:[
['Content marketing เริ่มจากการเข้าใจอะไร',['กลุ่มเป้าหมายและความต้องการ','สีโลโก้อย่างเดียว','ชื่อโดเมน','จำนวนพนักงาน']],
['Call to action มีหน้าที่อะไร',['ชวนผู้ชมทำขั้นตอนถัดไป','แสดงนโยบายความเป็นส่วนตัว','จัดเก็บรูปภาพ','แทนชื่อสินค้า']],
['เนื้อหาที่มีคุณค่าควรเป็นอย่างไร',['เกี่ยวข้องและช่วยผู้ชมแก้ปัญหา','ขายตรงทุกบรรทัด','คัดลอกคู่แข่ง','ไม่ระบุแหล่งข้อมูล']],
['ตัวชี้วัด engagement อาจรวมอะไร',['การมีส่วนร่วม เช่น คลิกหรือแสดงความคิดเห็น','ขนาดไฟล์งาน','รหัสหลักสูตร','จำนวนอุปกรณ์ในสำนักงาน']],
['การใช้ AI สร้างเนื้อหาควรทำอะไร',['ตรวจความจริง ลิขสิทธิ์ และความเหมาะสม','เผยแพร่โดยไม่ตรวจ','ใช้ภาพใดก็ได้','แอบอ้างบุคคลอื่น']],
['การแบ่งกลุ่มลูกค้าช่วยเรื่องใด',['ปรับเนื้อหาให้ตรงความสนใจ','ทำให้ทุกคนเห็นข้อมูลเหมือนกัน','ซ่อนราคาสินค้า','ลดความจำเป็นในการวัดผล']],
['A/B testing ใช้เปรียบเทียบอะไร',['รูปแบบสองแบบโดยวัดผลตามเป้าหมาย','ผู้ขายสองบริษัทเท่านั้น','ไฟล์ภาพกับไฟล์เสียง','ยอดขายคนละปีโดยไม่ควบคุม']],
['ก่อนส่งข้อความการตลาดทางอีเมลควรคำนึงถึงอะไร',['ความยินยอมและช่องทางยกเลิก','ส่งถึงทุกคนโดยไม่เลือก','ซ่อนผู้ส่ง','ไม่ระบุหัวข้อ']],
['SEO ช่วยอะไรกับเนื้อหาเว็บ',['ให้ค้นหาและเข้าใจเนื้อหาได้ดีขึ้น','เพิ่มยอดขายแน่นอน','แทนสินค้าที่มีคุณภาพ','ปิดการเข้าถึงมือถือ']],
['การรายงานผล content campaign ควรเทียบกับอะไร',['เป้าหมายและตัวชี้วัดที่กำหนด','จำนวนสีในภาพ','ความชอบส่วนตัว','ชื่อผู้สร้าง']]
],
business:[
['ธุรกิจผ่านเครือข่ายออนไลน์ต้องมีอะไรชัดเจน',['คุณค่า กลุ่มลูกค้า และช่องทางขาย','รหัสผ่านลูกค้าทั้งหมด','จำนวนโพสต์อย่างเดียว','บัญชีส่วนตัวผู้ดูแล']],
['ช่องทางออนไลน์ช่วยธุรกิจอย่างไร',['เข้าถึงลูกค้าและสื่อสารข้อเสนอ','รับประกันกำไร','แทนบริการหลังการขาย','ยกเลิกการวางแผน']],
['Customer journey ใช้อธิบายอะไร',['ขั้นตอนที่ลูกค้าผ่านก่อนและหลังซื้อ','โครงสร้างไฟล์เว็บ','ลำดับการผลิตสินค้าเท่านั้น','รายชื่อพนักงาน']],
['การสร้างความน่าเชื่อถือออนไลน์ควรทำอย่างไร',['ให้ข้อมูลจริงและช่องทางติดต่อชัด','ใช้รีวิวปลอม','ซ่อนเงื่อนไข','อ้างรางวัลที่ไม่มี']],
['การติดตามยอดขายช่วยให้รู้เรื่องใด',['ผลของช่องทางและสินค้าที่ขาย','รหัสผ่านผู้ซื้อ','สีหน้าจอ','รุ่นคอมพิวเตอร์']],
['การดูแลข้อมูลลูกค้าควรยึดหลักใด',['เก็บเท่าที่จำเป็นและจำกัดผู้เข้าถึง','เปิดเผยให้ทุกคน','เก็บโดยไม่แจ้ง','ส่งต่อโดยไม่มีเหตุผล']],
['ธุรกิจควรเลือกช่องทางขายอย่างไร',['ให้เหมาะกับลูกค้าและทรัพยากร','เปิดทุกช่องทางทันที','เลือกตามกระแสเท่านั้น','ใช้บัญชีส่วนตัวร่วมกัน']],
['การตอบข้อร้องเรียนออนไลน์ควรเป็นอย่างไร',['สุภาพ รวดเร็ว และแก้ปัญหา','โต้เถียงกับลูกค้า','เผยแพร่ข้อมูลผู้ร้องเรียน','ลบคำถามทั้งหมด']],
['ต้นทุนการหาลูกค้าใช้วิเคราะห์อะไร',['ค่าใช้จ่ายเพื่อได้ลูกค้าใหม่','ราคาขายต่อชิ้นเท่านั้น','เวลาทำงานของระบบ','จำนวนผู้ติดตามปลอม']],
['แผนธุรกิจออนไลน์ควรทบทวนเมื่อใด',['เมื่อข้อมูลและสภาพตลาดเปลี่ยน','ไม่ต้องทบทวน','เฉพาะก่อนเปิดร้าน','เมื่อเปลี่ยนโลโก้เท่านั้น']]
],
analytics:[
['ข้อมูลที่สะอาดควรมีลักษณะอย่างไร',['รูปแบบสม่ำเสมอและลดค่าผิดพลาด','มีแถวซ้ำจำนวนมาก','หัวคอลัมน์ไม่ชัด','ปะปนหน่วยวัด']],
['Power BI ใช้ทำอะไรได้เด่น',['วิเคราะห์และแสดงผลข้อมูล','เขียนระบบปฏิบัติการ','ตัดต่อวิดีโอเป็นหลัก','จัดการสายสัญญาณ']],
['Dashboard ที่ดีควรช่วยอะไร',['ตอบคำถามทางธุรกิจได้รวดเร็ว','แสดงกราฟทุกชนิดพร้อมกัน','ซ่อนตัวชี้วัด','แทนข้อมูลต้นทาง']],
['ใน Excel สูตร SUM ทำหน้าที่อะไร',['รวมค่าตัวเลข','นับคำที่ซ้ำ','จัดรูปภาพ','แปลภาษา']],
['ตัวกรองรายงานช่วยผู้ใช้ทำอะไร',['เลือกดูข้อมูลบางส่วนตามเงื่อนไข','แก้ไขต้นทางโดยอัตโนมัติ','ลบข้อมูลถาวร','เพิ่มความแม่นยำโดยไม่ตรวจ']],
['KPI ควรเชื่อมโยงกับอะไร',['เป้าหมายที่ต้องการติดตาม','สีธีมรายงาน','ชื่อไฟล์','จำนวนแผ่นงาน']],
['การเชื่อมตารางควรพิจารณาอะไร',['คีย์ที่ตรงกันและความสัมพันธ์ข้อมูล','สีตัวอักษร','ลำดับเปิดไฟล์','ชื่อผู้สร้างรายงาน']],
['Outlier คืออะไร',['ค่าที่แตกต่างจากรูปแบบส่วนใหญ่','ชื่อคอลัมน์','แถวหัวตาราง','แผนภูมิวงกลม']],
['กราฟเส้นเหมาะกับข้อมูลแบบใด',['แนวโน้มตามเวลา','ส่วนแบ่งหมวดหมู่เดียวเสมอ','ข้อความยาว','ตำแหน่งไฟล์']],
['ก่อนนำเสนอข้อสรุปจากข้อมูลควรทำอะไร',['ตรวจแหล่ง นิยาม และข้อจำกัด','ตัดค่าที่ไม่ชอบ','สรุปจากกราฟเดียว','ไม่ระบุช่วงเวลา']]
],
tourismAI:[
['AI ในธุรกิจท่องเที่ยวอาจช่วยงานใด',['แนะนำข้อมูลหรือช่วยตอบคำถามผู้เดินทาง','รับประกันอากาศดี','แทนใบอนุญาตประกอบธุรกิจ','ยืนยันการจองโดยไม่มีระบบ']],
['ข้อมูลลูกค้าที่ AI ใช้ควรจัดการอย่างไร',['จำกัดตามความจำเป็นและแจ้งการใช้งาน','นำข้อมูลทุกคนมาใช้โดยไม่แจ้ง','เผยแพร่ต่อสาธารณะ','ไม่ต้องรักษาความปลอดภัย']],
['Chatbot ควรทำอย่างไรเมื่อไม่ทราบคำตอบ',['ส่งต่อเจ้าหน้าที่หรือแจ้งข้อจำกัด','แต่งข้อมูลขึ้นเอง','ปิดบทสนทนาโดยไม่บอก','ขอรหัสผ่านลูกค้า']],
['ข้อมูลแนะนำสถานที่ควรตรวจอะไร',['ความถูกต้องและความทันสมัย','สีภาพอย่างเดียว','จำนวนผู้ติดตาม','ชื่ออุปกรณ์']],
['ระบบแนะนำสถานที่ควรพิจารณาอะไร',['ความสนใจและบริบทที่ผู้ใช้ยินยอมให้ใช้','ข้อมูลลับทุกชนิด','การเดาเชื้อชาติ','ข้อมูลที่ไม่เกี่ยวข้อง']],
['มนุษย์ควรตรวจผล AI ในงานบริการเมื่อใด',['เมื่อมีผลต่อการจอง ความปลอดภัย หรือข้อร้องเรียน','ไม่จำเป็นทุกกรณี','เฉพาะตอนปิดระบบ','เมื่อเปลี่ยนสีเว็บ']],
['ข้อมูลเชิงคาดการณ์ควรนำเสนออย่างไร',['ระบุว่าเป็นประมาณการและมีข้อจำกัด','บอกว่าแน่นอน 100%','ไม่บอกแหล่งข้อมูล','ใช้แทนประกาศทางการ']],
['การวัดผล AI assistant ควรดูอะไร',['ความถูกต้องและประโยชน์ต่อผู้ใช้','จำนวนข้อความอย่างเดียว','สีของหน้าจอ','ชื่อโมเดลเท่านั้น']],
['ถ้าระบบ AI ให้คำแนะนำผิดควรทำอย่างไร',['แก้ไข แจ้งผู้ใช้ และทบทวนสาเหตุ','ลบหลักฐาน','ปล่อยให้ใช้ต่อ','โทษผู้ใช้']],
['การนำ AI ไปใช้กับงานบริการควรเริ่มอย่างไร',['ทดลองขอบเขตเล็กและวัดผล','เปิดใช้ทุกกระบวนการทันที','ไม่ฝึกผู้ใช้','ยกเลิกช่องทางมนุษย์']]
],
google:[
['Google Drive ใช้ทำอะไรหลัก',['จัดเก็บและแชร์ไฟล์ตามสิทธิ์','รันระบบบัญชีทุกชนิด','แทนอินเทอร์เน็ต','สร้างอีเมลโดยไม่ต้องบัญชี']],
['Google Docs ช่วยงานใด',['ทำงานเอกสารร่วมกัน','วิเคราะห์ภาพทางการแพทย์','จัดการระบบปฏิบัติการ','ควบคุมเครือข่าย']],
['การแชร์ไฟล์แบบจำกัดสิทธิ์ช่วยอะไร',['ให้เฉพาะผู้เกี่ยวข้องเข้าถึง','ทำให้ไฟล์สาธารณะ','ป้องกันการแก้ไขทุกกรณี','สำรองไฟล์อัตโนมัติถาวร']],
['Google Sheets สูตรขึ้นต้นด้วยอะไร',['=','?','!','&']],
['Google Forms เหมาะกับงานใด',['เก็บคำตอบจากแบบฟอร์ม','ตัดต่อวิดีโอ','เขียนระบบปฏิบัติการ','ออกแบบวงจร']],
['Calendar ช่วยเรื่องใด',['กำหนดเวลาและนัดหมาย','ตรวจไวรัส','สร้างฐานข้อมูล','บีบอัดไฟล์']],
['การใช้บัญชีร่วมกันมีความเสี่ยงอะไร',['ระบุผู้ทำรายการและควบคุมสิทธิ์ได้ยาก','เพิ่มความปลอดภัยเสมอ','ประหยัดพื้นที่ทุกครั้ง','ทำให้เอกสารไม่ซ้ำ']],
['ก่อนแชร์เอกสารควรตรวจอะไร',['ผู้รับและระดับสิทธิ์','สีของเบราว์เซอร์','ขนาดเมาส์','ชื่อเครือข่ายบ้าน']],
['Version history มีประโยชน์อย่างไร',['ดูหรือกู้คืนการแก้ไขก่อนหน้า','แปลเอกสารอัตโนมัติ','ลบผู้ใช้ทุกคน','เพิ่มพื้นที่เก็บข้อมูล']],
['การทำงานร่วมกันบนคลาวด์ต้องคำนึงถึงอะไร',['สิทธิ์เข้าถึงและการจัดการข้อมูล','ความเร็วพิมพ์','รุ่นจอภาพ','จำนวนแท็บเบราว์เซอร์']]
],
microsoftAI:[
['AI literacy ควรรวมความเข้าใจเรื่องใด',['ความสามารถ ข้อจำกัด และความเสี่ยงของ AI','การรับประกันผลลัพธ์','การปิดการตรวจสอบ','การแชร์บัญชี']],
['Copilot หรือ AI assistant ควรใช้ข้อมูลอย่างไร',['ใช้ข้อมูลที่ได้รับอนุญาตและเหมาะสม','ป้อนข้อมูลลับทั้งหมด','ใช้บัญชีคนอื่น','ไม่ตรวจผลลัพธ์']],
['Generative AI สร้างอะไรได้บ้าง',['ข้อความ ภาพ หรือเนื้อหาตามแบบจำลอง','คำตอบจริงเสมอ','ข้อมูลใหม่ที่ไม่ต้องตรวจ','ความยินยอมแทนคน']],
['Human oversight หมายถึงอะไร',['มีคนกำกับและตรวจผล AI','ให้ AI ตัดสินใจทุกอย่าง','ปิดระบบบันทึก','ไม่แจ้งผู้ใช้']],
['ข้อมูลใดควรหลีกเลี่ยงใน prompt สาธารณะ',['ข้อมูลลับขององค์กร','คำถามความรู้ทั่วไป','คำสั่งจัดรูปแบบ','ข้อความสาธารณะ']],
['AI bias อาจเกิดจากอะไร',['ข้อมูลฝึกหรือการออกแบบที่ไม่สมดุล','การใช้ฟอนต์ใหญ่','อินเทอร์เน็ตเร็ว','จำนวนสไลด์']],
['เมื่อใช้ AI ช่วยตัดสินใจ ควรทำอย่างไร',['ตรวจความเป็นธรรมและผลกระทบ','ยึดคำตอบโมเดลทันที','ไม่ให้ผู้เกี่ยวข้องทักท้วง','ซ่อนเกณฑ์']],
['ผลลัพธ์ AI ที่อ้างข้อเท็จจริงควรทำอะไร',['ตรวจสอบกับแหล่งเชื่อถือได้','เผยแพร่ทันที','ถือว่าถูกเสมอ','ลบหลักฐานอ้างอิง']],
['การใช้ AI อย่างรับผิดชอบคำนึงถึงอะไร',['ความเป็นส่วนตัว ความปลอดภัย และความเป็นธรรม','ความเร็วอย่างเดียว','จำนวนคำตอบ','สีหน้าจอ']],
['ก่อนใช้ AI ในองค์กรควรกำหนดอะไร',['แนวทางและขอบเขตการใช้งาน','รหัสผ่านกลาง','การส่งข้อมูลทั้งหมดออก','ยกเลิกการอบรม']]
],
genAI:[
['Generative AI สร้างผลลัพธ์จากอะไร',['รูปแบบที่เรียนรู้จากข้อมูลฝึก','การค้นหาความจริงทุกเรื่อง','ฐานข้อมูลสดเสมอ','การอ่านใจผู้ใช้']],
['Hallucination ของ AI คืออะไร',['คำตอบที่ดูน่าเชื่อแต่ไม่ถูกต้อง','ระบบทำงานเร็ว','ไฟล์ภาพใหญ่','คำถามสั้น']],
['Prompt ควรระบุอะไรเพื่อให้ผลตรงขึ้น',['งาน บริบท และรูปแบบคำตอบ','ข้อมูลลับ','คำสั่งขัดแย้ง','ไม่มีเป้าหมาย']],
['ข้อมูลใดไม่ควรส่งเข้า AI ภายนอกโดยพลการ',['ความลับทางธุรกิจหรือข้อมูลส่วนบุคคล','คำถามสาธารณะ','คำสั่งให้สรุปข่าว','ข้อความที่เผยแพร่แล้ว']],
['ผลลัพธ์ AI ควรตรวจเรื่องใด',['ความถูกต้อง อคติ และสิทธิในเนื้อหา','เฉพาะความยาว','จำนวนย่อหน้า','สีตัวอักษร']],
['การใช้ AI สร้างภาพเชิงพาณิชย์ควรพิจารณาอะไร',['เงื่อนไขบริการและสิทธิในเนื้อหา','จำนวนสีอย่างเดียว','ความเร็วเครื่อง','เวลาที่สร้าง']],
['ข้อมูลฝึกของโมเดลหมายถึงอะไร',['ตัวอย่างที่ใช้ให้โมเดลเรียนรู้รูปแบบ','ไฟล์ที่ผู้ใช้ดาวน์โหลด','รหัสผ่านของเว็บไซต์','บัญชีผู้ดูแล']],
['RAG โดยแนวคิดช่วยอะไร',['ให้โมเดลอ้างอิงเนื้อหาที่ค้นคืนได้','แทนการตรวจคำตอบ','ทำให้โมเดลไม่ผิดพลาด','สร้างสิทธิ์เข้าถึง']],
['การใช้งานในองค์กรควรมีอะไร',['นโยบายและผู้รับผิดชอบชัดเจน','การใช้บัญชีร่วม','การเปิดข้อมูลสาธารณะ','การละเว้นการอบรม']],
['เมื่อ AI สร้างข้อมูลผิด ควรทำอย่างไร',['ตรวจ แก้ และไม่เผยแพร่ข้อมูลผิด','ส่งต่อเพราะระบบสร้างแล้ว','ลบคำถาม','ปิดช่องทางแจ้งปัญหา']]
],
law:[
['กฎหมายดิจิทัลเกี่ยวข้องกับอะไร',['สิทธิ หน้าที่ และการใช้เทคโนโลยีอย่างถูกต้อง','การเลือกสีเว็บไซต์','ความเร็วอินเทอร์เน็ต','รุ่นคอมพิวเตอร์']],
['ก่อนเผยแพร่ภาพบุคคล ควรคำนึงถึงอะไร',['สิทธิและความยินยอมที่เกี่ยวข้อง','ขนาดไฟล์เท่านั้น','จำนวนยอดไลก์','ความละเอียดจอ']],
['รหัสผ่านที่ปลอดภัยควรเป็นอย่างไร',['ไม่ซ้ำ คาดเดายาก และไม่เปิดเผย','ใช้วันเกิด','ใช้รหัสเดียวทุกระบบ','ส่งให้เพื่อนเก็บ']],
['Phishing มักมีเป้าหมายอะไร',['หลอกให้เปิดเผยข้อมูลหรือกดลิงก์อันตราย','เพิ่มพื้นที่เก็บข้อมูล','สำรองไฟล์','ปรับความสว่าง']],
['การส่งต่อข่าวออนไลน์ควรทำอย่างไร',['ตรวจแหล่งที่มาและบริบทก่อนแชร์','ส่งทันทีเมื่อพาดหัวแรง','ลบวันที่ข่าว','เชื่อภาพทุกภาพ']],
['ข้อมูลส่วนบุคคลควรจัดการอย่างไร',['ใช้เท่าที่จำเป็นและมีฐานการใช้ที่เหมาะสม','เปิดเผยในชีตสาธารณะ','เก็บโดยไม่กำหนดผู้เข้าถึง','ส่งต่อทุกคำขอ']],
['ลิขสิทธิ์ดิจิทัลคุ้มครองอะไร',['ผลงานสร้างสรรค์ตามกฎหมาย','รหัสผ่านทุกชนิด','ข้อมูลอากาศ','อุปกรณ์ต่อพ่วง']],
['เมื่อบัญชีถูกเข้าถึงโดยไม่ได้รับอนุญาต ควรทำอะไร',['เปลี่ยนรหัส แจ้งผู้ดูแล และตรวจความเสียหาย','ใช้บัญชีต่อไป','ลบอีเมลแจ้งเตือน','แชร์รหัสใหม่']],
['การใช้ซอฟต์แวร์ควรตรวจอะไร',['ใบอนุญาตและเงื่อนไขการใช้งาน','สีไอคอน','ขนาดหน้าจอ','จำนวนผู้ติดตาม']],
['การใช้เครือข่ายสาธารณะควรระวังอะไร',['การเชื่อมต่อและข้อมูลที่ส่ง','สีป้ายร้าน','เวลาเปิดเครื่อง','ระดับเสียง']]
]
};
  const COURSE_PRETEST_GROUP={
'0920014220601':'project','10120014220115':'aiCoding','0920224190208':'vision',
'0920084220103':'web','0920084220104':'web','0920084220105':'web',
'0920224220118':'ecommerce','0920224220110':'tourismApp','0920014220305':'ux',
'10120014220103':'web','10020084220605':'web','10120014220610':'productivity',
'2220017230213':'marketing','50200172304104':'business','0920014220605':'analytics',
'0920014220405':'analytics','2220017320213':'tourismAI','0920224220116':'google',
'0920014220406':'microsoftAI','10120014220801':'genAI','10120014220504':'law'
};
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
