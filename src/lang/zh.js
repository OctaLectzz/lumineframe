export default {
  public: {
    requiredText: '*',
    optionalText: '(可选)',
    createText: '创建',
    cancelText: '取消',
    editText: '编辑',
    nameText: '名称',
    descriptionText: '描述',
    searchText: '搜索...',
    searchPhotoText: '搜索照片...',
    collectionTitle: '收藏',
    categoryTitle: '分类',
    tagTitle: '标签',
    photoNotFound: '照片不可用',
    collectionNotFound: '无法找到集合'
  },
  navbar: {
    homeTab: '主页',
    exploreTab: '探索',
    createTab: '创建',
    loginBtn: '登录',
    signupBtn: '注册',
    logoutBtn: '注销',
    dashboardDrpdwn: '仪表盘',
    profileDrpdwn: '个人资料',
    collectionsDrpdwn: '你的收藏',
    settingDrpdwn: '设置'
  },
  auth: {
    welcomeMsg: '欢迎来到LumineFrame',
    firstNameForm: '名',
    lastNameForm: '姓',
    usernameForm: '用户名',
    emailForm: '邮箱',
    passwordForm: '密码',
    passwordConfirmationForm: '确认密码',
    permissionText1: '继续即表示您同意LumineFrame的',
    permissionText2: '并确认您已阅读我们的',
    loginRedirect: '已经是会员？登录',
    registerRedirect: '还不是LumineFrame的一员？注册',
    successRegisterMsg: '注册成功',
    failedRegisterMsg: '格式仍有误，请重试',
    successLoginMsg: '登录成功',
    failedLoginMsg: '邮箱或密码错误，请重试',
    comfirmationLogoutMsg: '确定要注销吗？',
    successLogoutMsg: '注销成功',
    failedLogoutMsg: '注销失败',
    validate: {
      firstNameRequired: '名字必须填写',
      firstNameMaxLength: '名字最多50个字符',
      usernameRequired: '用户名必须填写',
      usernameMinLength: '用户名最少3个字符',
      usernameMaxLength: '用户名最多15个字符',
      emailRequired: '邮箱必须填写',
      emailFormat: '无效的邮箱',
      passwordRequired: '密码必须填写',
      passwordMinLength: '密码至少6个字符',
      passwordConfirmationRequired: '确认密码必须填写',
      passwordConfirmationMinLength: '确认密码至少6个字符',
      passwordConfirmationSame: '确认密码不匹配'
    }
  },
  photo: {
    menu1: '预览图片',
    menu2: '下载图片',
    successLikeMsg: '图片点赞成功',
    failedLikeMsg: '您已经点赞过此图片',
    successDislikeMsg: '取消点赞成功',
    failedDislikeMsg: '取消点赞失败',
    collectionTitle: '添加到收藏',
    createCollectionTitle: '创建收藏',
    nameMaxLength: '名称最多20个字符',
    descriptionMaxLength: '描述最多255个字符',
    successCreateCollectionMsg: '创建收藏成功',
    failedCreateCollectionMsg: '创建收藏失败',
    successSaveMsg: '图片保存成功',
    failedSaveMsg: '您已在此收藏中保存了此图片',
    successDownloadMsg: '图片下载成功',
    failedDownloadMsg: '下载图片失败',
    commentTitle: '评论',
    commentNotAuth: '您必须先登录才能评论',
    commentForm: '添加评论',
    commentRules: '最多允许255个字符',
    successCommentMsg: '评论添加成功',
    errorCommentMsg: '评论添加失败',
    editComment: '编辑',
    deleteComment: '删除'
  },
  explore: {
    collectionList: '收藏列表',
    categoryList: '分类列表',
    tagList: '标签列表',
    recomendedPhoto: '为您推荐',
    collectionSearch: '搜索收藏...',
    categorySearch: '搜索分类...',
    tagSearch: '搜索标签...',
    editCollectionTitle: '编辑收藏',
    successEditCollectionMsg: '编辑收藏成功',
    failedEditCollectionMsg: '编辑收藏失败'
  },
  create: {
    headerText: '创建Lumine照片',
    handleButton: '发布',
    chooseFile: '选择文件或拖放到此处',
    recomendedFile: '我们建议使用大小不超过20MB的高质量.jpg文件',
    titleForm: '标题',
    descriptionForm: '描述',
    tagForm: '标签',
    categoryForm: '分类',
    imageType: '请上传有效的图片文件（JPEG，PNG，JPG）',
    successMsg: '图片发布成功',
    errorMsg: '图片发布失败',
    validate: {
      titleMaxLength: '标题不能超过20个字符',
      descriptionMaxLength: '描述不能超过255个字符',
      tagMaxLength: '标签不能超过20个字符'
    }
  },
  profile: {
    editProfileText: '编辑个人资料',
    completeEditProfileText: '完善您的个人资料',
    changePhotoText: '更改头像',
    usernameForm: '用户名',
    firstNameForm: '名',
    lastNameForm: '姓',
    emailForm: '邮箱',
    phoneForm: '电话号码',
    pronounsForm: '代词',
    urlForm: '网址',
    birthdayForm: '出生日期',
    genderForm: '性别',
    manGenderForm: '男',
    womanGenderForm: '女',
    addressForm: '地址',
    aboutForm: '关于',
    editProfileBtn: '更新用户信息',
    successEditAvatarMsg: '头像更改成功',
    successEditProfileMsg: '个人资料编辑成功',
    failedEditProfileMsg: '无效数据。请检查字段并重试',
    validate: {
      usernameRequired: '用户名必须填写',
      usernameMaxLength: '用户名最多15个字符',
      usernameUnique: '用户名已存在',
      firstNameRequired: '名字必须填写',
      firstNameMaxLength: '名字最多15个字符',
      lastNameMaxLength: '姓最多15个字符',
      emailRequired: '邮箱必须填写',
      emailFormat: '无效的邮箱',
      phoneMaxLength: '电话号码最多15个字符',
      urlMaxLength: '网址最多255个字符',
      addressMaxLength: '地址最多255个字符',
      aboutMaxLength: '关于最多100个字符'
    }
  },
  dashboard: {
    navbar: {
      dashboardAdminText: '管理员仪表盘',
      logoutBtn: '注销',
      homeDrpdwn: '主页',
      profileDrpdwn: '个人资料',
      collectionsDrpdwn: '你的收藏',
      settingDrpdwn: '设置'
    },
    sidebar: {
      homeTab: '主页',
      userTab: '用户',
      categoryTab: '分类',
      tagTab: '标签',
      photoTab: '图片',
      collectionTab: '收藏',
      commentTab: '评论'
    },
    toggleFullScreenText: '切换全屏',
    exitFullScreenText: '退出全屏',
    gridText: '网格',
    listText: '列表',
    deleteTitle: '警告！',
    deleteMsg: '确定要删除这些数据吗？',
    yesDeleteText: '是',
    cancelDeleteText: '取消',
    home: {
      statisticsText: '每月照片统计',
      totalUsers: '用户数量',
      totalPhotos: '照片数量',
      totalCategories: '分类数量',
      totalTags: '标签数量'
    },
    user: {
      userText: '用户',
      createText: '创建用户',
      editText: '编辑用户',
      manGenderText: '男',
      womanGenderText: '女',
      avatarColumn: '个人资料图片',
      userColumn: '用户',
      emailColumn: '邮箱',
      roleColumn: '角色',
      pronounsColumn: '代词',
      birthdayColumn: '出生日期',
      genderColumn: '性别',
      phoneColumn: '电话号码',
      urlColumn: '网址',
      addressColumn: '地址',
      aboutColumn: '关于',
      crud: {
        usernameForm: '用户名',
        firstNameForm: '名',
        lastNameForm: '姓',
        emailForm: '邮箱',
        phoneForm: '电话号码',
        passwordForm: '密码',
        passwordConfirmationForm: '确认密码',
        roleForm: '角色',
        pronounsForm: '代词',
        urlForm: '网址',
        birthdayForm: '出生日期',
        genderForm: '性别',
        manGenderForm: '男',
        womanGenderForm: '女',
        addressForm: '地址',
        aboutForm: '关于',
        statusForm: '状态',
        successCreateMsg: '创建用户成功',
        failedCreateMsg: '创建用户时出错',
        successEditMsg: '编辑用户成功',
        failedEditMsg: '编辑用户时出错',
        successDeleteMsg: '删除用户成功',
        failedDeleteMsg: '删除用户时出错'
      },
      validate: {
        usernameRequired: '用户名必须填写',
        usernameMaxLength: '用户名最多15个字符',
        usernameUnique: '用户名已存在',
        firstNameRequired: '名字必须填写',
        firstNameMaxLength: '名字最多15个字符',
        lastNameMaxLength: '姓最多15个字符',
        emailRequired: '邮箱必须填写',
        emailFormat: '无效的邮箱',
        phoneMaxLength: '电话号码最多15个字符',
        passwordRequired: '密码必须填写',
        passwordMinLength: '密码至少8个字符',
        passwordConfirmationRequired: '确认密码必须填写',
        passwordConfirmationSame: '确认密码必须与密码相同',
        urlMaxLength: '网址最多255个字符',
        addressMaxLength: '地址最多255个字符',
        aboutMaxLength: '关于最多100个字符'
      }
    },
    category: {
      categoryText: '分类',
      createText: '创建分类',
      editText: '编辑分类',
      categoryCodeColumn: '分类代码',
      imageColumn: '图片',
      nameColumn: '名称',
      descriptionColumn: '描述',
      crud: {
        imageForm: '图片',
        uploadImageText: '上传图片',
        changeImageText: '更改图片',
        nameForm: '名称',
        descriptionForm: '描述',
        successCreateMsg: '创建分类成功',
        failedCreateMsg: '创建分类时出错',
        successEditMsg: '编辑分类成功',
        failedEditMsg: '编辑分类时出错',
        successDeleteMsg: '删除分类成功',
        failedDeleteMsg: '删除分类时出错'
      },
      validate: {
        imageRequired: '图片必须填写',
        nameRequired: '名称必须填写',
        nameMaxLength: '名称最多50个字符',
        nameUnique: '名称已存在',
        descriptionMaxLength: '描述最多255个字符'
      }
    },
    tag: {
      tagText: '标签',
      createText: '创建标签',
      editText: '编辑标签',
      nameColumn: '名称',
      descriptionColumn: '描述',
      crud: {
        nameForm: '名称',
        descriptionForm: '描述',
        successCreateMsg: '创建标签成功',
        failedCreateMsg: '创建标签时出错',
        successEditMsg: '编辑标签成功',
        failedEditMsg: '编辑标签时出错',
        successDeleteMsg: '删除标签成功',
        failedDeleteMsg: '删除标签时出错'
      },
      validate: {
        nameRequired: '名称必须填写',
        nameMaxLength: '名称最多20个字符',
        nameUnique: '名称已存在',
        descriptionMaxLength: '描述最多255个字符'
      }
    },
    photo: {
      photoText: '照片',
      createText: '创建照片',
      showText: '显示照片',
      editText: '编辑照片',
      photoNumberColumn: '照片编号',
      userColumn: '用户',
      imageColumn: '图片',
      titleColumn: '标题',
      descriptionColumn: '描述',
      crud: {
        successCreateMsg: '创建照片成功',
        failedCreateMsg: '创建照片时出错',
        successEditMsg: '编辑照片成功',
        failedEditMsg: '编辑照片时出错',
        successDeleteMsg: '删除照片成功',
        failedDeleteMsg: '删除照片时出错'
      }
    },
    collection: {
      collectionText: '收藏',
      showText: '显示收藏',
      collectionCodeColumn: '收藏代码',
      userColumn: '用户',
      photosColumn: '照片',
      nameColumn: '名称',
      descriptionColumn: '描述',
      crud: {
        successDeleteMsg: '删除收藏成功',
        failedDeleteMsg: '删除收藏时出错'
      }
    },
    comment: {
      commentText: '评论',
      userColumn: '用户',
      photoColumn: '照片',
      contentColumn: '内容',
      crud: {
        successDeleteMsg: '删除评论成功',
        failedDeleteMsg: '删除评论时出错'
      }
    }
  }
}
