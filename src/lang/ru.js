export default {
  public: {
    requiredText: '*',
    optionalText: '(необязательно)'
  },
  navbar: {
    homeTab: 'Главная',
    exploreTab: 'Исследовать',
    createTab: 'Создать',
    loginBtn: 'Войти',
    signupBtn: 'Регистрация',
    logoutBtn: 'Выйти',
    dashboardDrpdwn: 'Панель управления',
    profileDrpdwn: 'Профиль',
    likesDrpdwn: 'Нравится',
    collectionsDrpdwn: 'Коллекции'
  },
  auth: {
    welcomeMsg: 'Добро пожаловать в LumineFrame',
    firstNameForm: 'Имя',
    lastNameForm: 'Фамилия',
    usernameForm: 'Имя пользователя',
    emailForm: 'Электронная почта',
    passwordForm: 'Пароль',
    passwordConfirmationForm: 'Подтверждение пароля',
    permissionText1: 'Продолжая, вы соглашаетесь с условиями LumineFrame',
    permissionText2: 'и признаете, что прочитали наши',
    loginRedirect: 'Уже есть аккаунт? Войти',
    registerRedirect: 'Еще не зарегистрированы? Зарегистрироваться',
    successRegisterMsg: 'Успешная регистрация',
    failedRegisterMsg: 'Неправильный формат, попробуйте еще раз',
    successLoginMsg: 'Успешный вход',
    failedLoginMsg: 'Неверный адрес электронной почты или пароль, попробуйте еще раз',
    comfirmationLogoutMsg: 'Вы уверены?',
    successLogoutMsg: 'Выход успешен',
    failedLogoutMsg: 'Не удалось выйти',
    validate: {
      firstNameRequired: 'Имя должно быть заполнено',
      firstNameMaxLength: 'Максимальная длина имени - 50 символов',
      usernameRequired: 'Имя пользователя должно быть заполнено',
      usernameMinLength: 'Минимальная длина имени пользователя - 3 символа',
      usernameMaxLength: 'Максимальная длина имени пользователя - 15 символов',
      emailRequired: 'Адрес электронной почты должен быть заполнен',
      emailFormat: 'Недопустимый адрес электронной почты',
      passwordRequired: 'Пароль должен быть заполнен',
      passwordMinLength: 'Минимальная длина пароля - 6 символов',
      passwordConfirmationRequired: 'Подтверждение пароля должно быть заполнено',
      passwordConfirmationMinLength: 'Минимальная длина подтверждения пароля - 6 символов',
      passwordConfirmationSame: 'Пароли не совпадают'
    }
  },
  create: {
    headerText: 'Создать фото Lumine',
    handleButton: 'Опубликовать',
    chooseFile: 'Выберите файл или перетащите его сюда',
    recomendedFile: 'Мы рекомендуем использовать файлы .jpg высокого качества размером менее 20 МБ',
    titleForm: 'Заголовок',
    descriptionForm: 'Описание',
    tagForm: 'Тег',
    categoryForm: 'Категория',
    imageType: 'Пожалуйста, загрузите действительный файл изображения (JPEG, PNG, JPG)',
    successMsg: 'Фото успешно опубликовано',
    errorMsg: 'Не удалось опубликовать фото',
    validate: {
      titleMaxLength: 'Заголовок не может быть больше 20 символов',
      descriptionMaxLength: 'Описание не может быть больше 255 символов',
      tagMaxLength: 'Тег не может быть больше 20 символов'
    }
  }
}
