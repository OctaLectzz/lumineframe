export default {
  public: {
    requiredText: '*',
    optionalText: '(オプション)'
  },
  navbar: {
    homeTab: 'ホーム',
    exploreTab: '探検',
    createTab: '作成',
    loginBtn: 'ログイン',
    signupBtn: 'サインアップ',
    logoutBtn: 'ログアウト',
    dashboardDrpdwn: 'ダッシュボード',
    profileDrpdwn: 'プロフィール',
    likesDrpdwn: 'いいね',
    collectionsDrpdwn: 'コレクション'
  },
  auth: {
    welcomeMsg: 'LumineFrameへようこそ',
    firstNameForm: '名',
    lastNameForm: '姓',
    usernameForm: 'ユーザー名',
    emailForm: 'Eメール',
    passwordForm: 'パスワード',
    passwordConfirmationForm: 'パスワード確認',
    permissionText1: '続行することで、LumineFrameの条件に同意したことになります',
    permissionText2: 'を読んだことを認識しました',
    loginRedirect: 'すでにメンバーですか？ ログイン',
    registerRedirect: 'まだLumineFrameにいませんか？ サインアップ',
    successRegisterMsg: '登録成功',
    failedRegisterMsg: 'フォーマットがまだ間違っています、もう一度お試しください',
    successLoginMsg: 'ログイン成功',
    failedLoginMsg: 'メールアドレスまたはパスワードが間違っています、もう一度お試しください',
    comfirmationLogoutMsg: '本当にログアウトしますか？',
    successLogoutMsg: 'ログアウト成功',
    failedLogoutMsg: 'ログアウトに失敗しました',
    validate: {
      firstNameRequired: '名前は必須です',
      firstNameMaxLength: '名前は50文字以内である必要があります',
      usernameRequired: 'ユーザー名は必須です',
      usernameMinLength: 'ユーザー名は3文字以上である必要があります',
      usernameMaxLength: 'ユーザー名は15文字以内である必要があります',
      emailRequired: 'Eメールは必須です',
      emailFormat: '無効なEメールアドレスです',
      passwordRequired: 'パスワードは必須です',
      passwordMinLength: 'パスワードは6文字以上である必要があります',
      passwordConfirmationRequired: 'パスワード確認は必須です',
      passwordConfirmationMinLength: 'パスワード確認は6文字以上である必要があります',
      passwordConfirmationSame: 'パスワード確認が一致しません'
    }
  },
  create: {
    headerText: 'Lumine写真を作成する',
    handleButton: '公開',
    chooseFile: 'ファイルを選択するか、ここにドラッグアンドドロップしてください',
    recomendedFile: '20MB未満の高品質の.jpgファイルを使用することをお勧めします',
    titleForm: 'タイトル',
    descriptionForm: '説明',
    tagForm: 'タグ',
    categoryForm: 'カテゴリ',
    imageType: '有効な画像ファイル（JPEG、PNG、JPG）をアップロードしてください',
    successMsg: '写真が正常に公開されました',
    errorMsg: '写真の公開に失敗しました',
    validate: {
      titleMaxLength: 'タイトルは255文字を超えることはできません',
      descriptionMaxLength: '説明は255文字を超えることはできません',
      tagMaxLength: 'タグは20文字を超えることはできません'
    }
  }
}
