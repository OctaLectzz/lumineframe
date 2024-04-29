export default {
  public: {
    requiredText: '*',
    optionalText: '(необязательно)',
    createText: 'Создать',
    cancelText: 'Отмена',
    editText: 'Редактировать',
    nameText: 'Имя',
    descriptionText: 'Описание',
    searchText: 'Поиск...',
    searchPhotoText: 'Поиск фото...',
    collectionTitle: 'Коллекция',
    categoryTitle: 'Категория',
    tagTitle: 'Ter',
    photoNotFound: 'Фотография недоступна',
    collectionNotFound: 'Коллекция недоступна'
  },
  navbar: {
    homeTab: 'Главная',
    exploreTab: 'Просмотр',
    createTab: 'Создать',
    loginBtn: 'Войти',
    signupBtn: 'Зарегистрироваться',
    logoutBtn: 'Выйти',
    dashboardDrpdwn: 'Панель',
    profileDrpdwn: 'Профиль',
    collectionsDrpdwn: 'Ваши коллекции',
    settingDrpdwn: 'Настройки'
  },
  auth: {
    welcomeMsg: 'Добро пожаловать в LumineFrame',
    firstNameForm: 'Имя',
    lastNameForm: 'Фамилия',
    usernameForm: 'Имя пользователя',
    emailForm: 'Электронная почта',
    passwordForm: 'Пароль',
    passwordConfirmationForm: 'Подтверждение пароля',
    permissionText1: 'Продолжая, вы соглашаетесь с',
    permissionText2: 'и признаете, что прочитали наши',
    loginRedirect: 'Уже зарегистрированы? Войти',
    registerRedirect: 'Еще не зарегистрированы на LumineFrame? Зарегистрироваться',
    successRegisterMsg: 'Регистрация прошла успешно',
    failedRegisterMsg: 'Неправильный формат, попробуйте еще раз',
    successLoginMsg: 'Успешный вход',
    failedLoginMsg: 'Неверный адрес электронной почты или пароль, попробуйте еще раз',
    comfirmationLogoutMsg: 'Вы уверены?',
    successLogoutMsg: 'Выход выполнен успешно',
    failedLogoutMsg: 'Ошибка при выходе',
    validate: {
      firstNameRequired: 'Имя должно быть заполнено',
      firstNameMaxLength: 'Максимальное количество символов в имени - 50',
      usernameRequired: 'Имя пользователя должно быть заполнено',
      usernameMinLength: 'Минимальное количество символов в имени пользователя - 3',
      usernameMaxLength: 'Максимальное количество символов в имени пользователя - 15',
      emailRequired: 'Электронная почта должна быть заполнена',
      emailFormat: 'Неверный адрес электронной почты',
      passwordRequired: 'Пароль должен быть заполнен',
      passwordMinLength: 'Минимальное количество символов в пароле - 6',
      passwordConfirmationRequired: 'Подтверждение пароля должно быть заполнено',
      passwordConfirmationMinLength: 'Минимальное количество символов в подтверждении пароля - 6',
      passwordConfirmationSame: 'Подтверждение пароля не совпадает с паролем'
    }
  },
  photo: {
    menu1: 'Просмотр изображения',
    menu2: 'Скачать изображение',
    successLikeMsg: 'Фотография успешно лайкнута',
    failedLikeMsg: 'Вы уже лайкнули эту фотографию ранее',
    successDislikeMsg: 'Фотография успешно дизлайкнута',
    failedDislikeMsg: 'Не удалось дизлайкнуть фотографию',
    collectionTitle: 'Добавить в коллекцию',
    createCollectionTitle: 'Создать коллекцию',
    nameMaxLength: 'Максимальное количество символов в имени - 20',
    descriptionMaxLength: 'Максимальное количество символов в описании - 255',
    successCreateCollectionMsg: 'Коллекция успешно создана',
    failedCreateCollectionMsg: 'Не удалось создать коллекцию',
    successSaveMsg: 'Фотография успешно сохранена',
    failedSaveMsg: 'Вы уже сохраняли эту фотографию в этой коллекции',
    successDownloadMsg: 'Фотография успешно скачана',
    failedDownloadMsg: 'Не удалось скачать фотографию',
    commentTitle: 'Комментарии',
    commentNotAuth: 'Сначала войдите, чтобы иметь возможность оставлять комментарии',
    commentForm: 'Добавить комментарий',
    commentRules: 'Максимальное количество символов - 255',
    successCommentMsg: 'Комментарий успешно добавлен',
    errorCommentMsg: 'Не удалось добавить комментарий',
    editComment: 'Редактировать',
    deleteComment: 'Удалить'
  },
  explore: {
    collectionList: 'Список коллекций',
    categoryList: 'Список категорий',
    tagList: 'Список тегов',
    recomendedPhoto: 'Рекомендуем для вас',
    collectionSearch: 'Поиск по коллекциям...',
    categorySearch: 'Поиск по категориям...',
    tagSearch: 'Поиск по тегам...',
    editCollectionTitle: 'Редактировать коллекцию',
    successEditCollectionMsg: 'Коллекция успешно отредактирована',
    failedEditCollectionMsg: 'Не удалось отредактировать коллекцию'
  },
  create: {
    headerText: 'Создать фотографию Lumine',
    handleButton: 'Опубликовать',
    chooseFile: 'Выберите файл или перетащите его сюда',
    recomendedFile: 'Мы рекомендуем использовать файлы .jpg высокого качества размером менее 20 МБ',
    titleForm: 'Название',
    descriptionForm: 'Описание',
    tagForm: 'Тег',
    categoryForm: 'Категория',
    imageType: 'Пожалуйста, загрузите допустимый файл изображения (JPEG, PNG, JPG)',
    successMsg: 'Фотография успешно опубликована',
    errorMsg: 'Не удалось опубликовать фотографию',
    validate: {
      titleMaxLength: 'Название не должно превышать 20 символов',
      descriptionMaxLength: 'Описание не должно превышать 255 символов',
      tagMaxLength: 'Тег не должен превышать 20 символов'
    }
  },
  profile: {
    editProfileText: 'Редактировать профиль',
    completeEditProfileText: 'Завершите настройку профиля',
    changePhotoText: 'Изменить фото',
    usernameForm: 'Имя пользователя',
    firstNameForm: 'Имя',
    lastNameForm: 'Фамилия',
    emailForm: 'Электронная почта',
    phoneForm: 'Номер телефона',
    pronounsForm: 'Местоимения',
    urlForm: 'URL',
    birthdayForm: 'Дата рождения',
    genderForm: 'Пол',
    manGenderForm: 'Мужской',
    womanGenderForm: 'Женский',
    addressForm: 'Адрес',
    aboutForm: 'О себе',
    editProfileBtn: 'Обновить информацию о пользователе',
    successEditAvatarMsg: 'Фото профиля успешно изменено',
    successEditProfileMsg: 'Профиль успешно отредактирован',
    failedEditProfileMsg: 'Недопустимые данные. Пожалуйста, проверьте поля и повторите попытку',
    validate: {
      usernameRequired: 'Имя пользователя должно быть заполнено',
      usernameMaxLength: 'Имя пользователя должно содержать не более 15 символов',
      usernameUnique: 'Имя пользователя уже существует',
      firstNameRequired: 'Имя должно быть заполнено',
      firstNameMaxLength: 'Имя должно содержать не более 15 символов',
      lastNameMaxLength: 'Фамилия должна содержать не более 15 символов',
      emailRequired: 'Электронная почта должна быть заполнена',
      emailFormat: 'Неверный адрес электронной почты',
      phoneMaxLength: 'Номер телефона должен содержать не более 15 символов',
      urlMaxLength: 'URL должен содержать не более 255 символов',
      addressMaxLength: 'Адрес должен содержать не более 255 символов',
      aboutMaxLength: 'Информация о себе должна содержать не более 100 символов'
    }
  },
  dashboard: {
    navbar: {
      dashboardAdminText: 'Панель администратора',
      logoutBtn: 'Выйти',
      homeDrpdwn: 'Главная',
      profileDrpdwn: 'Профиль',
      collectionsDrpdwn: 'Ваши коллекции',
      settingDrpdwn: 'Настройки'
    },
    sidebar: {
      homeTab: 'Главная',
      userTab: 'Пользователь',
      categoryTab: 'Категория',
      tagTab: 'Тег',
      photoTab: 'Фото',
      collectionTab: 'Коллекция',
      commentTab: 'Комментарий'
    },
    toggleFullScreenText: 'Включить полноэкранный режим',
    exitFullScreenText: 'Выйти из полноэкранного режима',
    gridText: 'Сетка',
    listText: 'Список',
    deleteTitle: 'ВНИМАНИЕ!',
    deleteMsg: 'Вы уверены, что хотите удалить эти данные?',
    yesDeleteText: 'Да',
    cancelDeleteText: 'Отмена',
    home: {
      statisticsText: 'Ежемесячная статистика фотографий',
      totalUsers: 'Количество пользователей',
      totalPhotos: 'Количество фотографий',
      totalCategories: 'Количество категорий',
      totalTags: 'Количество тегов'
    },
    user: {
      userText: 'Пользователь',
      createText: 'Создать пользователя',
      editText: 'Редактировать пользователя',
      manGenderText: 'Мужчина',
      womanGenderText: 'Женщина',
      avatarColumn: 'Изображение профиля',
      userColumn: 'Пользователь',
      emailColumn: 'Электронная почта',
      roleColumn: 'Роль',
      pronounsColumn: 'Местоимения',
      birthdayColumn: 'Дата рождения',
      genderColumn: 'Пол',
      phoneColumn: 'Номер телефона',
      urlColumn: 'URL',
      addressColumn: 'Адрес',
      aboutColumn: 'О себе',
      crud: {
        usernameForm: 'Имя пользователя',
        firstNameForm: 'Имя',
        lastNameForm: 'Фамилия',
        emailForm: 'Электронная почта',
        phoneForm: 'Номер телефона',
        passwordForm: 'Пароль',
        passwordConfirmationForm: 'Подтверждение пароля',
        roleForm: 'Роль',
        pronounsForm: 'Местоимения',
        urlForm: 'URL',
        birthdayForm: 'Дата рождения',
        genderForm: 'Пол',
        manGenderForm: 'Мужчина',
        womanGenderForm: 'Женщина',
        addressForm: 'Адрес',
        aboutForm: 'О себе',
        statusForm: 'Статус',
        successCreateMsg: 'Пользователь успешно создан',
        failedCreateMsg: 'Ошибка при создании пользователя',
        successEditMsg: 'Пользователь успешно отредактирован',
        failedEditMsg: 'Ошибка при редактировании пользователя',
        successDeleteMsg: 'Пользователь успешно удален',
        failedDeleteMsg: 'Ошибка при удалении пользователя'
      },
      validate: {
        usernameRequired: 'Имя пользователя должно быть заполнено',
        usernameMaxLength: 'Имя пользователя должно содержать не более 15 символов',
        usernameUnique: 'Имя пользователя уже существует',
        firstNameRequired: 'Имя должно быть заполнено',
        firstNameMaxLength: 'Имя должно содержать не более 15 символов',
        lastNameMaxLength: 'Фамилия должна содержать не более 15 символов',
        emailRequired: 'Электронная почта должна быть заполнена',
        emailFormat: 'Неверный адрес электронной почты',
        phoneMaxLength: 'Номер телефона должен содержать не более 15 символов',
        passwordRequired: 'Пароль должен быть заполнен',
        passwordMinLength: 'Пароль должен содержать минимум 8 символов',
        passwordConfirmationRequired: 'Подтверждение пароля должно быть заполнено',
        passwordConfirmationSame: 'Подтверждение пароля должно совпадать с паролем',
        urlMaxLength: 'URL должен содержать не более 255 символов',
        addressMaxLength: 'Адрес должен содержать не более 255 символов',
        aboutMaxLength: 'Информация о себе должна содержать не более 100 символов'
      }
    },
    category: {
      categoryText: 'Категория',
      createText: 'Создать категорию',
      editText: 'Редактировать категорию',
      categoryCodeColumn: 'Код категории',
      imageColumn: 'Изображение',
      nameColumn: 'Название',
      descriptionColumn: 'Описание',
      crud: {
        imageForm: 'Изображение',
        uploadImageText: 'Загрузить изображение',
        changeImageText: 'Изменить изображение',
        nameForm: 'Название',
        descriptionForm: 'Описание',
        successCreateMsg: 'Категория успешно создана',
        failedCreateMsg: 'Ошибка при создании категории',
        successEditMsg: 'Категория успешно отредактирована',
        failedEditMsg: 'Ошибка при редактировании категории',
        successDeleteMsg: 'Категория успешно удалена',
        failedDeleteMsg: 'Ошибка при удалении категории'
      },
      validate: {
        imageRequired: 'Изображение должно быть заполнено',
        nameRequired: 'Название должно быть заполнено',
        nameMaxLength: 'Название должно содержать не более 50 символов',
        nameUnique: 'Тег уже существует',
        descriptionMaxLength: 'Описание должно содержать не более 255 символов'
      }
    },
    tag: {
      tagText: 'Тег',
      createText: 'Создать тег',
      editText: 'Редактировать тег',
      nameColumn: 'Название',
      descriptionColumn: 'Описание',
      crud: {
        nameForm: 'Название',
        descriptionForm: 'Описание',
        successCreateMsg: 'Тег успешно создан',
        failedCreateMsg: 'Ошибка при создании тега',
        successEditMsg: 'Тег успешно отредактирован',
        failedEditMsg: 'Ошибка при редактировании тега',
        successDeleteMsg: 'Тег успешно удален',
        failedDeleteMsg: 'Ошибка при удалении тега'
      },
      validate: {
        nameRequired: 'Название должно быть заполнено',
        nameMaxLength: 'Название должно содержать не более 20 символов',
        nameUnique: 'Тег уже существует',
        descriptionMaxLength: 'Описание должно содержать не более 255 символов'
      }
    },
    photo: {
      photoText: 'Фотография',
      createText: 'Создать фотографию',
      showText: 'Показать фотографию',
      editText: 'Редактировать фотографию',
      photoNumberColumn: 'Номер фотографии',
      userColumn: 'Пользователь',
      imageColumn: 'Изображение',
      titleColumn: 'Название',
      descriptionColumn: 'Описание',
      crud: {
        successCreateMsg: 'Фотография успешно создана',
        failedCreateMsg: 'Ошибка при создании фотографии',
        successEditMsg: 'Фотография успешно отредактирована',
        failedEditMsg: 'Ошибка при редактировании фотографии',
        successDeleteMsg: 'Фотография успешно удалена',
        failedDeleteMsg: 'Ошибка при удалении фотографии'
      }
    },
    collection: {
      collectionText: 'Коллекция',
      showText: 'Показать коллекцию',
      collectionCodeColumn: 'Код коллекции',
      userColumn: 'Пользователь',
      photosColumn: 'Фотографии',
      nameColumn: 'Название',
      descriptionColumn: 'Описание',
      crud: {
        successDeleteMsg: 'Коллекция успешно удалена',
        failedDeleteMsg: 'Ошибка при удалении коллекции'
      }
    },
    comment: {
      commentText: 'Комментарий',
      userColumn: 'Пользователь',
      photoColumn: 'Фотография',
      contentColumn: 'содержание',
      crud: {
        successDeleteMsg: 'Комментарий успешно удален',
        failedDeleteMsg: 'Ошибка при удалении комментария'
      }
    }
  }
}
