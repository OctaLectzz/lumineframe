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

      <div class="text-h5 text-bold text-center q-mb-lg">{{ $t('auth.welcomeMsg') }}</div>

      <q-form class="q-px-md">
        <!-- Email -->
        <div class="q-px-lg">
          <label for="email">{{ $t('auth.emailForm') }}</label>
          <q-input type="email" v-model="email" name="email" :label="$t('auth.emailForm')" :rules="emailRules" outlined dense />
        </div>

        <!-- Password -->
        <div class="q-px-lg">
          <label for="password">{{ $t('auth.passwordForm') }}</label>
          <q-input type="password" v-model="password" name="password" :label="$t('auth.passwordForm')" :rules="passwordRules" outlined dense />
        </div>

        <q-btn color="primary" label="Log In" class="full-width q-mt-sm" :loading="loading" @click="login" rounded>
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
      </q-form>

      <div class="q-mt-lg text-center text-grey-8" style="font-size: 11px">
        <div>{{ $t('auth.permissionText1') }}</div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-primary permission__link">Terms of Service</a>
          {{ $t('auth.permissionText2') }}
        </div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-primary permission__link">Privacy Policy</a>
          .
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-primary permission__link">Notice at collection</a>
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
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
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

      $q.notify({
        icon: 'check',
        color: 'positive',
        message: t('auth.successLoginMsg')
      })
      window.location.reload()
    } else {
      $q.notify({
        icon: 'warning',
        color: 'negative',
        message: t('auth.failedLoginMsg')
      })
    }
  } catch (error) {
    $q.notify({
      icon: 'warning',
      color: 'negative',
      message: t('auth.failedLoginMsg')
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
