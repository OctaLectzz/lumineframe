export default {
  public: {
    requiredText: '*',
    optionalText: '(ไม่จำเป็น)'
  },
  navbar: {
    homeTab: 'หน้าแรก',
    exploreTab: 'สำรวจ',
    createTab: 'สร้าง',
    loginBtn: 'เข้าสู่ระบบ',
    signupBtn: 'สมัครสมาชิก',
    logoutBtn: 'ออกจากระบบ',
    dashboardDrpdwn: 'แดชบอร์ด',
    profileDrpdwn: 'โปรไฟล์',
    likesDrpdwn: 'ชอบ',
    collectionsDrpdwn: 'คอลเล็กชัน'
  },
  auth: {
    welcomeMsg: 'ยินดีต้อนรับสู่ LumineFrame',
    firstNameForm: 'ชื่อ',
    lastNameForm: 'นามสกุล',
    usernameForm: 'ชื่อผู้ใช้',
    emailForm: 'อีเมล',
    passwordForm: 'รหัสผ่าน',
    passwordConfirmationForm: 'ยืนยันรหัสผ่าน',
    permissionText1: 'ดำเนินการต่อแสดงว่าคุณยินยอมกับข้อกำหนดของ LumineFrame',
    permissionText2: 'และยอมรับว่าคุณได้อ่านของเรา',
    loginRedirect: 'เป็นสมาชิกอยู่แล้ว? เข้าสู่ระบบ',
    registerRedirect: 'ยังไม่ได้เป็นสมาชิก LumineFrame หรือ? สมัครสมาชิก',
    successRegisterMsg: 'สมัครสมาชิกสำเร็จ',
    failedRegisterMsg: 'รูปแบบไม่ถูกต้อง โปรดลองอีกครั้ง',
    successLoginMsg: 'เข้าสู่ระบบสำเร็จ',
    failedLoginMsg: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง',
    comfirmationLogoutMsg: 'คุณแน่ใจหรือไม่?',
    successLogoutMsg: 'ออกจากระบบสำเร็จ',
    failedLogoutMsg: 'ล้มเหลวในการออกจากระบบ',
    validate: {
      firstNameRequired: 'จำเป็นต้องกรอกชื่อ',
      firstNameMaxLength: 'ชื่อสูงสุดคือ 50 ตัวอักษร',
      usernameRequired: 'จำเป็นต้องกรอกชื่อผู้ใช้',
      usernameMinLength: 'ชื่อผู้ใช้ขั้นต่ำคือ 3 ตัวอักษร',
      usernameMaxLength: 'ชื่อผู้ใช้สูงสุดคือ 15 ตัวอักษร',
      emailRequired: 'จำเป็นต้องกรอกอีเมล',
      emailFormat: 'รูปแบบอีเมลไม่ถูกต้อง',
      passwordRequired: 'จำเป็นต้องกรอกรหัสผ่าน',
      passwordMinLength: 'รหัสผ่านขั้นต่ำคือ 6 ตัวอักษร',
      passwordConfirmationRequired: 'จำเป็นต้องกรอกยืนยันรหัสผ่าน',
      passwordConfirmationMinLength: 'ยืนยันรหัสผ่านขั้นต่ำคือ 6 ตัวอักษร',
      passwordConfirmationSame: 'ยืนยันรหัสผ่านไม่ตรงกัน'
    }
  },
  create: {
    headerText: 'สร้างภาพ Lumine',
    handleButton: 'เผยแพร่',
    chooseFile: 'เลือกไฟล์หรือลากร่องและวางที่นี่',
    recomendedFile: 'เราขอแนะนำให้ใช้ไฟล์ .jpg คุณภาพสูงน้อยกว่า 20mb',
    titleForm: 'หัวข้อ',
    descriptionForm: 'คำอธิบาย',
    tagForm: 'แท็ก',
    categoryForm: 'หมวดหมู่',
    imageType: 'โปรดอัปโหลดไฟล์รูปภาพที่ถูกต้อง (JPEG, PNG, JPG)',
    successMsg: 'เผยแพร่รูปภาพเรียบร้อยแล้ว',
    errorMsg: 'การเผยแพร่รูปภาพล้มเหลว',
    validate: {
      titleMaxLength: 'หัวข้อต้องไม่เกิน 255 ตัวอักษร',
      descriptionMaxLength: 'คำอธิบายต้องไม่เกิน 255 ตัวอักษร',
      tagMaxLength: 'แท็กต้องไม่เกิน 20 ตัวอักษร'
    }
  }
}
