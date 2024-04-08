export default {
  public: {
    requiredText: '*',
    optionalText: '(optionnel)'
  },
  navbar: {
    homeTab: 'Accueil',
    exploreTab: 'Explorer',
    createTab: 'Créer',
    loginBtn: 'Se connecter',
    signupBtn: "S'inscrire",
    logoutBtn: 'Se déconnecter',
    dashboardDrpdwn: 'Tableau de bord',
    profileDrpdwn: 'Profil',
    likesDrpdwn: "J'aime",
    collectionsDrpdwn: 'Collections'
  },
  auth: {
    welcomeMsg: 'Bienvenue sur LumineFrame',
    firstNameForm: 'Prénom',
    lastNameForm: 'Nom de famille',
    usernameForm: "Nom d'utilisateur",
    emailForm: 'E-mail',
    passwordForm: 'Mot de passe',
    passwordConfirmationForm: 'Confirmation du mot de passe',
    permissionText1: 'En continuant, vous acceptez les conditions de LumineFrame',
    permissionText2: 'et reconnaissez avoir lu nos',
    loginRedirect: 'Déjà membre ? Se connecter',
    registerRedirect: "Pas encore sur LumineFrame ? S'inscrire",
    successRegisterMsg: 'Inscription réussie',
    failedRegisterMsg: 'Le format est encore incorrect, veuillez réessayer',
    successLoginMsg: 'Connexion réussie',
    failedLoginMsg: 'E-mail ou mot de passe incorrect, veuillez réessayer',
    comfirmationLogoutMsg: 'Êtes-vous sûr(e) ?',
    successLogoutMsg: 'Déconnexion réussie',
    failedLogoutMsg: 'Échec de la déconnexion',
    validate: {
      firstNameRequired: 'Le prénom doit être renseigné',
      firstNameMaxLength: 'Le prénom est limité à 50 caractères',
      usernameRequired: "Le nom d'utilisateur doit être renseigné",
      usernameMinLength: "Le nom d'utilisateur doit comporter au moins 3 caractères",
      usernameMaxLength: "Le nom d'utilisateur est limité à 15 caractères",
      emailRequired: "L'e-mail doit être renseigné",
      emailFormat: 'E-mail invalide',
      passwordRequired: 'Le mot de passe doit être renseigné',
      passwordMinLength: 'Le mot de passe doit comporter au moins 6 caractères',
      passwordConfirmationRequired: 'La confirmation du mot de passe doit être renseignée',
      passwordConfirmationMinLength: 'La confirmation du mot de passe doit comporter au moins 6 caractères',
      passwordConfirmationSame: 'La confirmation du mot de passe ne correspond pas'
    }
  },
  create: {
    headerText: 'Créer une Photo Lumine',
    handleButton: 'Publier',
    chooseFile: 'Choisissez un fichier ou faites-le glisser ici',
    recomendedFile: "Nous recommandons d'utiliser des fichiers .jpg de haute qualité de moins de 20 Mo",
    titleForm: 'Titre',
    descriptionForm: 'Description',
    tagForm: 'Étiquette',
    categoryForm: 'Catégorie',
    imageType: 'Veuillez télécharger un fichier image valide (JPEG, PNG, JPG)',
    successMsg: 'Photo publiée avec succès',
    errorMsg: 'Échec de la publication de la photo',
    validate: {
      titleMaxLength: 'Le titre ne doit pas dépasser 20 caractères',
      descriptionMaxLength: 'La description ne doit pas dépasser 255 caractères',
      tagMaxLength: 'La balise ne doit pas dépasser 20 caractères'
    }
  }
}
