<template>
  <q-card style="border-radius: 30px">
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="q-px-lg q-pb-xl">
      <div class="row justify-center">
        <q-img src="src/assets/img/logo.png" style="width: 50px" />
      </div>

      <div class="text-h5 text-bold text-center q-mb-lg">{{ $t('auth.welcomeMsg') }}</div>

      <q-form>
        <!-- Email -->
        <div class="q-px-lg">
          <label for="email">{{ $t('auth.emailForm') }}</label>
          <q-input type="email" v-model="email" :color="$q.dark.isActive ? 'secondary' : 'primary'" name="email" :label="$t('auth.emailForm')" :rules="emailRules" outlined dense />
        </div>

        <!-- Password -->
        <div class="q-px-lg">
          <label for="password">{{ $t('auth.passwordForm') }}</label>
          <q-input type="password" v-model="password" :color="$q.dark.isActive ? 'secondary' : 'primary'" name="password" :label="$t('auth.passwordForm')" :rules="passwordRules" outlined dense />
        </div>

        <q-btn color="primary" label="Log In" class="full-width q-mt-sm" :loading="loading" :disable="loading" @click="login" rounded>
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
      </q-form>

      <div class="q-mt-lg text-center text-grey-7" style="font-size: 11px">
        <div>{{ $t('auth.permissionText1') }}</div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="permission__link" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">Terms of Service</a>
          {{ $t('auth.permissionText2') }}
        </div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="permission__link" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">Privacy Policy</a>
          .
          <a href="#" target="_blank" rel="noopener noreferrer" class="permission__link" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">Notice at collection</a>
          .
        </div>
      </div>

      <div class="q-mt-lg text-center" style="font-size: 12px">
        <div class="text-bold cursor-pointer" @click="openRegisterDialog">{{ $t('auth.registerRedirect') }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useAuthStore } from 'src/stores/auth-store'

const { t } = useI18n()
const authStore = useAuthStore()
const emits = defineEmits(['register'])
const loading = ref(false)

// Data
const email = ref('')
const password = ref('')

// Validate
const emailRules = [(v) => !!v || t('auth.validate.emailRequired'), (v) => /.+@.+/.test(v) || t('auth.validate.emailFormat')]
const passwordRules = ref([(v) => !!v || t('auth.validate.passwordRequired'), (v) => v.length >= 6 || t('auth.validate.passwordMinLength')])

// Login
const login = async () => {
  loading.value = true
  try {
    const res = await authStore.login(email.value, password.value)

    if (res.data.status === 'success') {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('role', res.data.data.role)

      toast.success(t('auth.successLoginMsg'))
      window.location.reload()
    } else {
      toast.error(t('auth.failedLoginMsg'))
    }
  } catch (error) {
    toast.error(t('auth.failedLoginMsg'))
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
.q-card {
  overflow: hidden;
}
.q-card::-webkit-scrollbar {
  display: none;
}
.q-card {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.q-card {
  overflow-y: scroll;
}

.permission__link {
  text-decoration: none;
}
.permission__link:hover {
  text-decoration: underline;
}
</style>
