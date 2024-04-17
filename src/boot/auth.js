import { token } from '/src/boot/axios'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    // Cek apakah route memerlukan autentikasi
    if (to.meta.requiresAuth) {
      if (!token) {
        // Redirect ke halaman login jika tidak ada token
        next('/')
      } else {
        // Lanjutkan navigasi jika token ada
        next()
      }
    } else if (to.name === 'login' && token) {
      // Jika pengguna sudah memiliki token, redirect dari halaman login
      next({ name: 'home' })
    } else if (to.name === 'register' && token) {
      // Jika pengguna sudah memiliki token, redirect dari halaman login
      next({ name: 'home' })
    } else {
      // Jika route tidak memerlukan autentikasi, lanjutkan navigasi
      next()
    }
  })
}
