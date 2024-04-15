export default {
  public: {
    requiredText: '*',
    optionalText: '(optional)'
  },
  navbar: {
    homeTab: 'Home',
    exploreTab: 'Explore',
    createTab: 'Create',
    loginBtn: 'Log In',
    signupBtn: 'Sign Up',
    logoutBtn: 'Logout',
    dashboardDrpdwn: 'Dashboard',
    profileDrpdwn: 'Profile',
    likesDrpdwn: 'Likes',
    collectionsDrpdwn: 'Collections'
  },
  auth: {
    welcomeMsg: 'Welcome to LumineFrame',
    firstNameForm: 'First Name',
    lastNameForm: 'Last Name',
    usernameForm: 'Username',
    emailForm: 'Email',
    passwordForm: 'Password',
    passwordConfirmationForm: 'Password Confirmation',
    permissionText1: "By continuing, you agree to LumineFrame's",
    permissionText2: "and acknowledge you've read our",
    loginRedirect: 'Already a member? Log In',
    registerRedirect: 'Not on LumineFrame yet? Sign up',
    successRegisterMsg: 'Register Successfully',
    failedRegisterMsg: 'The format is still wrong, please try again',
    successLoginMsg: 'Login Successfully',
    failedLoginMsg: 'Incorrect email or password, please try again',
    comfirmationLogoutMsg: 'Are you sure?',
    successLogoutMsg: 'Logout Successfully',
    failedLogoutMsg: 'Logout Failed',
    validate: {
      firstNameRequired: 'Name must be filled in',
      firstNameMaxLength: 'Maximum Name is 50 characters',
      usernameRequired: 'Username must be filled in',
      usernameMinLength: 'Minimum Username is 3 characters',
      usernameMaxLength: 'Maximum Username is 15 characters',
      emailRequired: 'Email must be filled in',
      emailFormat: 'Invalid Email',
      passwordRequired: 'Password must be filled in',
      passwordMinLength: 'Minimum Password is 6 characters',
      passwordConfirmationRequired: 'Password Confirmation must be filled in',
      passwordConfirmationMinLength: 'Minimum Password Confirmation is 6 characters',
      passwordConfirmationSame: 'Password Confirmation do not match'
    }
  },
  home: {
    menu1: 'Preview Image',
    menu2: 'Download Image',
    menu3: 'Report Image',
    successLikeMsg: 'Photo Liked Successfully',
    failedLikeMsg: 'Failed to Like Photo',
    successDislikeMsg: 'Photo Disliked Successfully',
    failedDislikeMsg: 'Failed to Dislike Photo',
    successDownloadMsg: 'Photo Downloaded Successfully',
    failedDownloadMsg: 'Failed to Download Photo',
  },
  create: {
    headerText: 'Create Lumine Photo',
    handleButton: 'Publish',
    chooseFile: 'Choose a file or drag and drop it here',
    recomendedFile: 'We recomended using high quality .jpg files less than 20mb',
    titleForm: 'Title',
    descriptionForm: 'Description',
    tagForm: 'Tag',
    categoryForm: 'Category',
    imageType: 'Please upload a valid image file (JPEG, PNG, JPG)',
    successMsg: 'Photo Published Successfully',
    errorMsg: 'Photo Failed to Publish',
    validate: {
      titleMaxLength: 'The Title may not be greater than 20 characters',
      descriptionMaxLength: 'The Description may not be greater than 255 characters',
      tagMaxLength: 'The Tag may not be greater than 20 characters'
    }
  }
}
