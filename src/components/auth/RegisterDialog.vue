<template>
  <q-card style="border-radius: 30px">
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="q-px-lg q-pb-xl">
      <div class="row justify-center">
        <q-img src="/img/logo.png" style="width: 50px" />
      </div>

      <div class="text-h5 text-bold text-center q-mb-lg">{{ $t('auth.welcomeMsg') }}</div>

      <q-form>
        <div class="row justify-center">
          <!-- First Name -->
          <div class="col-5 q-mr-sm">
            <label for="first_name">{{ $t('auth.firstNameForm') }}</label>
            <q-input type="text" v-model="first_name" :color="$q.dark.isActive ? 'secondary' : 'primary'" name="first_name" :label="$t('auth.firstNameForm')" :rules="first_nameRules" outlined dense />
          </div>

          <!-- Last Name -->
          <div class="col-5 q-ml-sm">
            <label for="last_name">{{ $t('auth.lastNameForm') }}</label>
            <q-input type="text" v-model="last_name" :color="$q.dark.isActive ? 'secondary' : 'primary'" name="last_name" :label="$t('auth.lastNameForm')" outlined dense />
          </div>
        </div>

        <!-- Username -->
        <div class="q-px-md">
          <label for="username">{{ $t('auth.usernameForm') }}</label>
          <q-input type="text" v-model="username" :color="$q.dark.isActive ? 'secondary' : 'primary'" name="username" :label="$t('auth.usernameForm')" :rules="usernameRules" outlined dense />
        </div>

        <!-- Email -->
        <div class="q-px-md">
          <label for="email">{{ $t('auth.emailForm') }}</label>
          <q-input type="email" v-model="email" :color="$q.dark.isActive ? 'secondary' : 'primary'" name="email" :label="$t('auth.emailForm')" :rules="emailRules" outlined dense />
        </div>

        <!-- Password -->
        <div class="q-px-md">
          <label for="password">{{ $t('auth.passwordForm') }}</label>
          <q-input type="password" v-model="password" :color="$q.dark.isActive ? 'secondary' : 'primary'" name="password" :label="$t('auth.passwordForm')" :rules="passwordRules" outlined dense />
        </div>

        <!-- Password Confirmation -->
        <div class="q-px-md">
          <label for="passwordconfirmation">{{ $t('auth.passwordConfirmationForm') }}</label>
          <q-input
            type="password"
            v-model="passwordconfirmation"
            :color="$q.dark.isActive ? 'secondary' : 'primary'"
            name="passwordconfirmation"
            :label="$t('auth.passwordConfirmationForm')"
            :rules="passwordconfirmationRules"
            outlined
            dense
          />
        </div>

        <q-btn color="primary" label="Sign Up" class="full-width q-mt-sm" :loading="loading" :disable="loading" @click="register" rounded>
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
        <div class="text-bold cursor-pointer" @click="openLoginDialog">{{ $t('auth.loginRedirect') }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '/src/stores/auth-store'

const { t } = useI18n()
const emits = defineEmits(['login'])
const authStore = useAuthStore()
const loading = ref(false)

// Data
const first_name = ref('')
const last_name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const passwordconfirmation = ref('')

// Validate
const first_nameRules = [(v) => !!v || t('auth.validate.firstNameRequired'), (v) => v.length <= 50 || t('auth.validate.firstNameMaxLength')]
const usernameRules = [(v) => !!v || t('auth.validate.usernameRequired'), (v) => v.length >= 3 || t('auth.validate.usernameMinLength'), (v) => v.length <= 15 || t('auth.validate.usernameMaxLength')]
const emailRules = [(v) => !!v || t('auth.validate.emailRequired'), (v) => /.+@.+/.test(v) || t('auth.validate.emailFormat')]
const passwordRules = ref([(v) => !!v || t('auth.validate.passwordRequired'), (v) => v.length >= 6 || t('auth.validate.passwordMinLength')])
const passwordconfirmationRules = ref([
  (v) => !!v || t('auth.validate.passwordConfirmationRequired'),
  (v) => v.length >= 6 || t('auth.validate.passwordConfirmationMinLength'),
  (v) => v === password.value || t('auth.validate.passwordConfirmationSame')
])

// Register
const register = async () => {
  loading.value = true
  try {
    const res = await authStore.register(username.value, first_name.value, last_name.value, email.value, password.value, passwordconfirmation.value)

    if (res.data.status === 'success') {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('role', res.data.data.role)

      toast.success(t('auth.successRegisterMsg'))
      window.location.reload()
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    toast.error(t('auth.failedRegisterMsg'))
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
