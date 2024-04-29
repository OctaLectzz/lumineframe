<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.user.editText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 70vh">
          <div class="row justify-center">
            <!-- Username -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.usernameForm') }} :</div>
              <q-input
                v-model="data.username"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.user.crud.usernameForm')"
                class="q-mb-sm"
                :rules="rules.username"
                dense
                outlined
                required
                autofocus
              />
            </div>

            <!-- First Name -->
            <div class="col-sm-5 col-xs-10 q-mx-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.firstNameForm') }} :</div>
              <q-input
                v-model="data.first_name"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.user.crud.firstNameForm')"
                class="q-mb-sm"
                :rules="rules.first_name"
                dense
                outlined
                required
              />
            </div>

            <!-- Last Name -->
            <div class="col-sm-5 col-xs-10 q-mx-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.lastNameForm') }} :</div>
              <q-input v-model="data.last_name" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('dashboard.user.crud.lastNameForm')" class="q-mb-sm" dense outlined />
            </div>

            <!-- Email -->
            <div class="col-sm-5 col-xs-10 q-mx-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.emailForm') }} :</div>
              <q-input
                type="email"
                v-model="data.email"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.user.crud.emailForm')"
                class="q-mb-sm"
                :rules="rules.email"
                dense
                outlined
                required
              />
            </div>

            <!-- phone -->
            <div class="col-sm-5 col-xs-10 q-mx-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.phoneForm') }} :</div>
              <q-input type="number" v-model="data.phone" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('dashboard.user.crud.phoneForm')" class="q-mb-sm" dense outlined />
            </div>

            <!-- Role -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.roleForm') }} :</div>
              <q-select
                v-model="data.role"
                :options="['Admin', 'Member']"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.user.crud.roleForm')"
                class="q-mb-sm"
                :rules="rules.role"
                dense
                outlined
                required
              />
            </div>

            <!-- Pronouns -->
            <div class="col-sm-5 col-xs-10 q-mx-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.pronounsForm') }} :</div>
              <q-select
                v-model="data.pronouns"
                :options="['ey/em', 'he/him', 'ne/nem', 'she/her', 'they/them', 've/ver', 'xe/xem', 'xie/xem', 'ze/zir']"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.user.crud.pronounsForm')"
                class="q-mb-sm"
                outlined
                dense
              />
            </div>

            <!-- URL -->
            <div class="col-sm-5 col-xs-10 q-mx-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.urlForm') }} :</div>
              <q-input v-model="data.url" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('dashboard.user.crud.urlForm')" class="q-mb-sm" dense outlined />
            </div>

            <!-- Birthday -->
            <div class="col-sm-5 col-xs-10 q-mx-sm q-mb-md">
              <div class="text-bold">{{ $t('dashboard.user.crud.birthdayForm') }} :</div>
              <q-input v-model="data.birthday" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('dashboard.user.crud.birthdayForm')" class="q-mb-sm" mask="date" outlined dense>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale" cover>
                      <q-date v-model="data.birthday" :color="$q.dark.isActive ? 'secondary' : 'primary'" :text-color="$q.dark.isActive ? 'primary' : 'secondary'">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" :color="$q.dark.isActive ? 'secondary' : 'primary'" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <!-- Gender -->
            <div class="col-sm-5 col-xs-10 q-mx-sm q-mb-md self-center">
              <span class="text-bold q-mr-sm">{{ $t('dashboard.user.crud.genderForm') }} :</span>
              <div class="q-mb-sm">
                <q-radio v-model="data.gender" val="man" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('dashboard.user.crud.manGenderForm')" class="q-mx-sm" dense />
                <q-radio v-model="data.gender" val="woman" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('dashboard.user.crud.womanGenderForm')" class="q-mx-sm" dense />
              </div>
            </div>

            <!-- Address -->
            <div class="col-sm-5 col-xs-10 q-mx-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.addressForm') }} :</div>
              <q-input v-model="data.address" type="textarea" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('dashboard.user.crud.addressForm')" class="q-mb-sm" dense outlined />
            </div>

            <!-- About -->
            <div class="col-sm-5 col-xs-10 q-mx-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.aboutForm') }} :</div>
              <q-input v-model="data.about" type="textarea" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('dashboard.user.crud.aboutForm')" class="q-mb-sm" dense outlined />
            </div>

            <!-- status -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">{{ $t('dashboard.user.crud.statusForm') }} :</div>
              <q-toggle v-model="data.status" size="50px" :color="$q.dark.isActive ? 'secondary' : 'primary'" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn :label="$t('public.cancelText')" :color="$q.dark.isActive ? 'secondary' : 'primary'" flat v-close-popup />
          <q-btn
            type="submit"
            :label="$t('public.editText')"
            :color="$q.dark.isActive ? 'secondary' : 'primary'"
            :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
            :loading="loading"
            :disable="disabledButton"
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-center" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useUserStore } from '/src/stores/user-store'

const { t } = useI18n()
const emits = defineEmits(['edited'])
const { item } = defineProps(['item'])
const itemStore = useUserStore()
const data = ref({
  id: item.id,
  username: item.username,
  first_name: item.first_name,
  last_name: item.last_name,
  email: item.email,
  phone: item.phone,
  role: item.role,
  pronouns: item.pronouns,
  url: item.url,
  birthday: item.birthday,
  gender: item.gender,
  address: item.address,
  about: item.about,
  status: item.status
})

// User
const users = ref([])
const getUser = async () => {
  try {
    const res = await itemStore.all()

    users.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getUser()
})

// Validate
const rules = ref({
  username: [
    (v) => !!v || t('dashboard.user.validate.usernameRequired'),
    (v) => v.length <= 15 || t('dashboard.user.validate.usernameMaxLength'),
    (v) => {
      if (typeof v === 'string') {
        if (users.value) {
          const userUsername = item.username.toLowerCase()
          return !users.value.some((user) => user.username.toLowerCase() === v.toLowerCase() && user.username.toLowerCase() !== userUsername) || t('dashboard.user.validate.usernameUnique')
        }
      }
      return true
    }
  ],
  first_name: [(v) => !!v || t('dashboard.user.validate.firstNameRequired'), (v) => v.length <= 15 || t('dashboard.user.validate.firstNameMaxLength')],
  last_name: [(v) => (v && v.length <= 15) || t('dashboard.user.validate.lastNameMaxLength')],
  email: [(v) => !!v || t('dashboard.user.validate.emailRequired'), (v) => /.+@.+/.test(v) || t('dashboard.user.validate.emailFormat')],
  phone: [(v) => (v && v.length <= 15) || t('dashboard.user.validate.phoneMaxLength')],
  url: [(v) => (v && v.length <= 255) || t('dashboard.user.validate.urlMaxLength')],
  address: [(v) => (v && v.length <= 255) || t('dashboard.user.validate.addressMaxLength')],
  about: [(v) => (v && v.length <= 100) || t('dashboard.user.validate.aboutMaxLength')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value || !data.value.username || !data.value.first_name || !data.value.email || !data.value.role
})

// Edit
const editData = async () => {
  loading.value = true

  try {
    await itemStore.edit(data.value)

    toast.success(t('dashboard.user.crud.successEditMsg'))
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error(t('dashboard.user.crud.failedEditMsg'))
  }

  loading.value = false
}
</script>
