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

      <div class="text-h5 text-bold text-center q-mb-lg q-mx-xl">Welcome to LuminaFrame</div>

      <q-form class="q-px-md">
        <div class="row justify-center">
          <!-- First Name -->
          <div class="col-5 q-mr-sm">
            <label for="first_name">First Name</label>
            <q-input type="text" v-model="first_name" name="first_name" label="First Name" :rules="first_nameRules" outlined dense />
          </div>

          <!-- Last Name -->
          <div class="col-5 q-ml-sm">
            <label for="last_name">Last Name</label>
            <q-input type="text" v-model="last_name" name="last_name" label="Last Name" outlined dense />
          </div>
        </div>

        <!-- Username -->
        <div class="q-px-lg">
          <label for="username">Username</label>
          <q-input type="text" v-model="username" name="username" label="Username" :rules="usernameRules" outlined dense />
        </div>

        <!-- Email -->
        <div class="q-px-lg">
          <label for="email">Email</label>
          <q-input type="email" v-model="email" name="email" label="Email" :rules="emailRules" outlined dense />
        </div>

        <!-- Password -->
        <div class="q-px-lg">
          <label for="password">Password</label>
          <q-input type="password" v-model="password" name="password" label="Password" :rules="passwordRules" outlined dense />
        </div>

        <!-- Password Confirmation -->
        <div class="q-px-lg">
          <label for="passwordconfirmation">Password Confirmation</label>
          <q-input type="password" v-model="passwordconfirmation" name="passwordconfirmation" label="Password Confirmation" :rules="passwordconfirmationRules" outlined dense />
        </div>

        <q-btn color="primary" label="Sign Up" class="full-width q-mt-sm" :loading="loading" @click="register" rounded>
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
        <div class="text-bold cursor-pointer" @click="openLoginDialog">Already a member? Log In</div>
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
const emits = defineEmits(['login'])
const loading = ref(false)

// Data
const first_name = ref('')
const last_name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const passwordconfirmation = ref('')

// Validate
const first_nameRules = [(v) => !!v || 'Nama harus diisi', (v) => v.length <= 50 || 'Username maksimal 50 karakter']
const usernameRules = [(v) => !!v || 'Username harus diisi', (v) => v.length >= 3 || 'Username minimal 2 karakter', (v) => v.length <= 15 || 'Username maksimal 15 karakter']
const emailRules = [(v) => !!v || 'Email harus diisi', (v) => /.+@.+/.test(v) || 'Email tidak valid']
const passwordRules = ref([(v) => !!v || 'Password harus diisi', (v) => v.length >= 6 || 'Password minimal 6 karakter'])
const passwordconfirmationRules = ref([(v) => !!v || 'Password harus diisi', (v) => v.length >= 6 || 'Password minimal 6 karakter', (v) => v === password.value || 'Password tidak cocok'])

// Register
const register = async () => {
  loading.value = true
  try {
    const res = await authStore.register(username.value, first_name.value, last_name.value, email.value, password.value, passwordconfirmation.value)

    if (res.data.status === 'success') {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('role', res.data.data.role)
      router.push({ name: 'home' })

      $q.notify({
        icon: 'check',
        color: 'positive',
        message: 'Register Successfully'
      })
      window.location.reload()
    } else {
      $q.notify({
        icon: 'warning',
        color: 'negative',
        message: res.data.message
      })
    }
  } catch (error) {
    $q.notify({
      icon: 'warning',
      color: 'negative',
      message: 'Format masih salah, silahkan coba lagi'
    })
    console.error(error)
  }
  loading.value = false
}

// Login
const openLoginDialog = () => {
  emits('login')
}
</script>

<style scoped>
.q-card {
  overflow: hidden;
}
.q-card::-webkit-scrollbar {
  display: none; /* Menyembunyikan scrollbar di browser webkit (Chrome, Safari, dll.) */
}
.q-card {
  -ms-overflow-style: none; /* Menyembunyikan scrollbar di Internet Explorer dan Edge */
  scrollbar-width: none; /* Menyembunyikan scrollbar di browser lain yang mendukung properti scrollbar-width */
}
.q-card {
  overflow-y: scroll; /* Memungkinkan pengguliran vertikal */
}

.permission__link {
  text-decoration: none;
}
.permission__link:hover {
  text-decoration: underline;
}
</style>
