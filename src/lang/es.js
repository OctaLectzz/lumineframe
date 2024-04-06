export default {
  public: {
    requiredText: '*',
    optionalText: '(opcional)'
  },
  navbar: {
    homeTab: 'Inicio',
    exploreTab: 'Explorar',
    createTab: 'Crear',
    loginBtn: 'Iniciar sesión',
    signupBtn: 'Registrarse',
    logoutBtn: 'Cerrar sesión',
    dashboardDrpdwn: 'Tablero',
    profileDrpdwn: 'Perfil',
    likesDrpdwn: 'Me gusta',
    collectionsDrpdwn: 'Colecciones'
  },
  auth: {
    welcomeMsg: 'Bienvenido a LumineFrame',
    firstNameForm: 'Nombre',
    lastNameForm: 'Apellido',
    usernameForm: 'Nombre de usuario',
    emailForm: 'Correo electrónico',
    passwordForm: 'Contraseña',
    passwordConfirmationForm: 'Confirmación de contraseña',
    permissionText1: 'Al continuar, acepta los términos de LumineFrame',
    permissionText2: 'y reconoce que ha leído nuestros',
    loginRedirect: '¿Ya eres miembro? Iniciar sesión',
    registerRedirect: '¿Todavía no estás en LumineFrame? Registrarse',
    successRegisterMsg: 'Registro exitoso',
    failedRegisterMsg: 'El formato aún es incorrecto, por favor intente de nuevo',
    successLoginMsg: 'Inicio de sesión exitoso',
    failedLoginMsg: 'Correo electrónico o contraseña incorrectos, por favor intente de nuevo',
    comfirmationLogoutMsg: '¿Estás seguro?',
    successLogoutMsg: 'Cierre de sesión exitoso',
    failedLogoutMsg: 'Error al cerrar sesión',
    validate: {
      firstNameRequired: 'El nombre debe ser completado',
      firstNameMaxLength: 'El nombre máximo es de 50 caracteres',
      usernameRequired: 'El nombre de usuario debe ser completado',
      usernameMinLength: 'El nombre de usuario mínimo es de 3 caracteres',
      usernameMaxLength: 'El nombre de usuario máximo es de 15 caracteres',
      emailRequired: 'El correo electrónico debe ser completado',
      emailFormat: 'Correo electrónico inválido',
      passwordRequired: 'La contraseña debe ser completada',
      passwordMinLength: 'La contraseña mínima es de 6 caracteres',
      passwordConfirmationRequired: 'La confirmación de la contraseña debe ser completada',
      passwordConfirmationMinLength: 'La confirmación de la contraseña mínima es de 6 caracteres',
      passwordConfirmationSame: 'La confirmación de la contraseña no coincide'
    }
  },
  create: {
    headerText: 'Crear Foto Lumine',
    handleButton: 'Publicar',
    chooseFile: 'Elige un archivo o arrástralo aquí',
    recomendedFile: 'Recomendamos usar archivos .jpg de alta calidad de menos de 20 MB',
    titleForm: 'Título',
    descriptionForm: 'Descripción',
    tagForm: 'Etiqueta',
    categoryForm: 'Categoría',
    imageType: 'Por favor, carga un archivo de imagen válido (JPEG, PNG, JPG)',
    successMsg: 'Foto publicada con éxito',
    errorMsg: 'Error al publicar la foto',
    validate: {
      titleMaxLength: 'El título no puede tener más de 255 caracteres',
      descriptionMaxLength: 'La descripción no puede tener más de 255 caracteres',
      tagMaxLength: 'La etiqueta no puede tener más de 20 caracteres'
    }
  }
}
