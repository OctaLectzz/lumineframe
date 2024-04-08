export default {
  public: {
    requiredText: '*',
    optionalText: '(可选)'
  },
  navbar: {
    homeTab: '主页',
    exploreTab: '探索',
    createTab: '创建',
    loginBtn: '登录',
    signupBtn: '注册',
    logoutBtn: '登出',
    dashboardDrpdwn: '仪表板',
    profileDrpdwn: '个人资料',
    likesDrpdwn: '喜欢',
    collectionsDrpdwn: '收藏夹'
  },
  auth: {
    welcomeMsg: '欢迎来到 LumineFrame',
    firstNameForm: '名',
    lastNameForm: '姓',
    usernameForm: '用户名',
    emailForm: '电子邮件',
    passwordForm: '密码',
    passwordConfirmationForm: '确认密码',
    permissionText1: '继续表示您同意 LumineFrame 的条款',
    permissionText2: '并承认您已阅读我们的',
    loginRedirect: '已经是会员？登录',
    registerRedirect: '还不是 LumineFrame 的会员？注册',
    successRegisterMsg: '注册成功',
    failedRegisterMsg: '格式错误，请重试',
    successLoginMsg: '登录成功',
    failedLoginMsg: '电子邮件或密码不正确，请重试',
    comfirmationLogoutMsg: '您确定要退出吗？',
    successLogoutMsg: '成功登出',
    failedLogoutMsg: '登出失败',
    validate: {
      firstNameRequired: '必须填写名字',
      firstNameMaxLength: '最大名称为 50 个字符',
      usernameRequired: '必须填写用户名',
      usernameMinLength: '最小用户名为 3 个字符',
      usernameMaxLength: '最大用户名为 15 个字符',
      emailRequired: '必须填写电子邮件',
      emailFormat: '电子邮件格式无效',
      passwordRequired: '必须填写密码',
      passwordMinLength: '最小密码为 6 个字符',
      passwordConfirmationRequired: '必须填写确认密码',
      passwordConfirmationMinLength: '最小密码确认为 6 个字符',
      passwordConfirmationSame: '密码确认不匹配'
    }
  },
  create: {
    headerText: '创建 Lumine 照片',
    handleButton: '发布',
    chooseFile: '选择文件或将其拖放到此处',
    recomendedFile: '我们建议使用高质量的 .jpg 文件，大小不超过 20mb',
    titleForm: '标题',
    descriptionForm: '描述',
    tagForm: '标签',
    categoryForm: '类别',
    imageType: '请上传有效的图像文件（JPEG、PNG、JPG）',
    successMsg: '照片发布成功',
    errorMsg: '照片发布失败',
    validate: {
      titleMaxLength: '标题不得超过 20 个字符',
      descriptionMaxLength: '描述不得超过 255 个字符',
      tagMaxLength: '标签不得超过 20 个字符'
    }
  }
}
