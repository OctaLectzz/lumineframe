<template>
  <q-card style="border-radius: 30px">
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="q-px-xl q-pb-xl">
      <div class="row justify-center">
        <q-img src="src/assets/img/logo.png" style="width: 50px" />
      </div>

      <div class="text-h5 text-bold text-center q-mb-lg">Welcome to LuminaFrame</div>

      <q-form class="q-px-md">
        <label for="email">Email</label>
        <q-input type="email" v-model="email" name="email" label="Email" :rules="emailRules" outlined dense />

        <label for="password">Password</label>
        <q-input type="password" v-model="password" name="password" label="Password" :rules="passwordRules" outlined dense />

        <q-btn color="primary" label="Log In" class="full-width q-mt-sm" :loading="loading" @click="login" rounded>
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
      </q-form>

      <div class="q-mt-lg text-center text-grey-8" style="font-size: 11px">
        <div>By continuing, you agree to LuminaFrame's</div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-primary permission__link">Terms of Service</a>
          and acknowledge you've read our
        </div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-primary permission__link">Privacy Policy</a>
          .
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-primary permission__link">Notice at collection</a>
          .
        </div>
      </div>

      <div class="q-mt-lg text-center" style="font-size: 12px">
        <div class="text-bold cursor-pointer" @click="openRegisterDialog">Not on LuminaFrame yet? Sign up</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()
const emits = defineEmits(['register'])
const loading = ref(false)

// Data
const email = ref('')
const password = ref('')

// Validate
const emailRules = [(v) => !!v || 'Email harus diisi', (v) => /.+@.+/.test(v) || 'Email tidak valid']
const passwordRules = ref([(v) => !!v || 'Password harus diisi', (v) => v.length >= 6 || 'Password minimal harus 6 karakter'])

// Login
const login = async () => {
  loading.value = true
  try {
    const res = await authStore.login(email.value, password.value)

    if (res.data.status === 'success') {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('role', res.data.data.role)
      router.push({ name: 'home' })

      $q.notify({
        message: res.data.message,
        icon: 'check',
        color: 'positive'
      })
      window.location.reload()
    } else {
      $q.notify({
        icon: 'warning',
        color: 'negative',
        message: 'Email atau Password salah, silahkan coba lagi'
      })
    }
  } catch (error) {
    $q.notify({
      icon: 'warning',
      color: 'negative',
      message: 'Email atau Password salah, silahkan coba lagi'
    })
    console.error(error)
  }
  loading.value = false
}

// Register
const openRegisterDialog = () => {
  emits('register')
}
</script>

<style scoped>
.permission__link {
  text-decoration: none;
}
.permission__link:hover {
  text-decoration: underline;
}
</style>
