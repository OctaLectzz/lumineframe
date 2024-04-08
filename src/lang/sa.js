export default {
  public: {
    requiredText: '*',
    optionalText: '(اختياري)'
  },
  navbar: {
    homeTab: 'الصفحة الرئيسية',
    exploreTab: 'استكشاف',
    createTab: 'صنع',
    loginBtn: 'تسجيل الدخول',
    signupBtn: 'التسجيل',
    logoutBtn: 'تسجيل الخروج',
    dashboardDrpdwn: 'لوحة القيادة',
    profileDrpdwn: 'الملف الشخصي',
    likesDrpdwn: 'الإعجابات',
    collectionsDrpdwn: 'المجموعات'
  },
  auth: {
    welcomeMsg: 'مرحبًا بك في LumineFrame',
    firstNameForm: 'الاسم الأول',
    lastNameForm: 'اسم العائلة',
    usernameForm: 'اسم المستخدم',
    emailForm: 'البريد الإلكتروني',
    passwordForm: 'كلمة المرور',
    passwordConfirmationForm: 'تأكيد كلمة المرور',
    permissionText1: 'من خلال المتابعة، فإنك توافق على شروط LumineFrame',
    permissionText2: 'وتقر بأنك قد قرأت مواصفاتنا',
    loginRedirect: 'هل أنت بالفعل عضو؟ تسجيل الدخول',
    registerRedirect: 'لم تكن عضوًا في LumineFrame بعد؟ التسجيل',
    successRegisterMsg: 'تم التسجيل بنجاح',
    failedRegisterMsg: 'التنسيق غير صحيح، يرجى المحاولة مرة أخرى',
    successLoginMsg: 'تم تسجيل الدخول بنجاح',
    failedLoginMsg: 'البريد الإلكتروني أو كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى',
    comfirmationLogoutMsg: 'هل أنت متأكد؟',
    successLogoutMsg: 'تم تسجيل الخروج بنجاح',
    failedLogoutMsg: 'فشل تسجيل الخروج',
    validate: {
      firstNameRequired: 'يجب ملء الاسم',
      firstNameMaxLength: 'الحد الأقصى للإسم هو 50 حرفًا',
      usernameRequired: 'يجب ملء اسم المستخدم',
      usernameMinLength: 'الحد الأدنى لاسم المستخدم هو 3 أحرف',
      usernameMaxLength: 'الحد الأقصى لاسم المستخدم هو 15 حرفًا',
      emailRequired: 'يجب ملء البريد الإلكتروني',
      emailFormat: 'البريد الإلكتروني غير صالح',
      passwordRequired: 'يجب ملء كلمة المرور',
      passwordMinLength: 'الحد الأدنى لكلمة المرور هو 6 أحرف',
      passwordConfirmationRequired: 'يجب ملء تأكيد كلمة المرور',
      passwordConfirmationMinLength: 'الحد الأدنى لتأكيد كلمة المرور هو 6 أحرف',
      passwordConfirmationSame: 'تأكيد كلمة المرور غير متطابق'
    }
  },
  create: {
    headerText: 'إنشاء صورة Lumine',
    handleButton: 'نشر',
    chooseFile: 'اختر ملفًا أو اسحبه وأفلته هنا',
    recomendedFile: 'نوصي باستخدام ملفات .jpg عالية الجودة بحجم أقل من 20 ميجابايت',
    titleForm: 'العنوان',
    descriptionForm: 'الوصف',
    tagForm: 'الوسم',
    categoryForm: 'الفئة',
    imageType: 'يرجى تحميل ملف صورة صالح (JPEG ، PNG ، JPG)',
    successMsg: 'تم نشر الصورة بنجاح',
    errorMsg: 'فشل نشر الصورة',
    validate: {
      titleMaxLength: 'العنوان لا يجب أن يزيد عن 20 حرفًا',
      descriptionMaxLength: 'الوصف لا يجب أن يزيد عن 255 حرفًا',
      tagMaxLength: 'الوسم لا يجب أن يزيد عن 20 حرفًا'
    }
  }
}
