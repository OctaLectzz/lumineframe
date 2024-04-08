export default {
  public: {
    requiredText: '*',
    optionalText: '(opsional)'
  },
  navbar: {
    homeTab: 'Beranda',
    exploreTab: 'Jelajahi',
    createTab: 'Buat',
    loginBtn: 'Masuk',
    signupBtn: 'Daftar',
    logoutBtn: 'Keluar',
    dashboardDrpdwn: 'Dasbor',
    profileDrpdwn: 'Profil',
    likesDrpdwn: 'Suka',
    collectionsDrpdwn: 'Koleksi'
  },
  auth: {
    welcomeMsg: 'Selamat datang di LumineFrame',
    firstNameForm: 'Nama Depan',
    lastNameForm: 'Nama Belakang',
    usernameForm: 'Username',
    emailForm: 'Email',
    passwordForm: 'Kata Sandi',
    passwordConfirmationForm: 'Konfirmasi Kata Sandi',
    permissionText1: 'Dengan melanjutkan, Anda setuju dengan',
    permissionText2: 'dan mengakui bahwa Anda telah membaca',
    loginRedirect: 'Sudah menjadi anggota? Masuk',
    registerRedirect: 'Belum bergabung dengan LumineFrame? Daftar',
    successRegisterMsg: 'Pendaftaran Berhasil',
    failedRegisterMsg: 'Format masih salah, silakan coba lagi',
    successLoginMsg: 'Masuk Berhasil',
    failedLoginMsg: 'Email atau kata sandi salah, silakan coba lagi',
    comfirmationLogoutMsg: 'Apakah kamu yakin?',
    successLogoutMsg: 'Keluar Berhasil',
    failedLogoutMsg: 'Keluar Gagal',
    validate: {
      firstNameRequired: 'Nama harus diisi',
      firstNameMaxLength: 'Nama maksimal 50 karakter',
      usernameRequired: 'Username harus diisi',
      usernameMinLength: 'Username minimal 3 karakter',
      usernameMaxLength: 'Username maksimal 15 karakter',
      emailRequired: 'Email harus diisi',
      emailFormat: 'Email tidak valid',
      passwordRequired: 'Kata sandi harus diisi',
      passwordMinLength: 'Kata sandi minimal 6 karakter',
      passwordConfirmationRequired: 'Konfirmasi kata sandi harus diisi',
      passwordConfirmationMinLength: 'Konfirmasi kata sandi minimal 6 karakter',
      passwordConfirmationSame: 'Konfirmasi kata sandi tidak cocok'
    }
  },
  create: {
    headerText: 'Buat Foto Lumine',
    handleButton: 'Terbitkan',
    chooseFile: 'Pilih file atau seret dan lepas di sini',
    recomendedFile: 'Kami merekomendasikan menggunakan file .jpg berkualitas tinggi kurang dari 20mb',
    titleForm: 'Judul',
    descriptionForm: 'Deskripsi',
    tagForm: 'Tag',
    categoryForm: 'Kategori',
    imageType: 'Silakan unggah file gambar yang valid (JPEG, PNG, JPG)',
    successMsg: 'Foto berhasil diterbitkan',
    errorMsg: 'Foto gagal diterbitkan',
    validate: {
      titleMaxLength: 'Judul tidak boleh lebih dari 20 karakter',
      descriptionMaxLength: 'Deskripsi tidak boleh lebih dari 255 karakter',
      tagMaxLength: 'Tag tidak boleh lebih dari 20 karakter'
    }
  }
}
