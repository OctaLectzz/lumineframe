<template>
  <q-card class="no-shadow q-pa-xl" bordered>
    <q-card-section class="text-h6">
      <div class="text-h5 text-bold">{{ $t('profile.editProfileText') }}</div>
      <div class="text-subtitle1">{{ $t('profile.completeEditProfileText') }}</div>
    </q-card-section>

    <!-- Loading -->
    <q-card-section v-if="loading" class="q-pa-sm">
      <q-list class="row">
        <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-item-section side>
            <q-avatar size="100px">
              <q-skeleton type="QAvatar" size="100px" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-skeleton width="150px" height="38px" style="border-radius: 35px" />
          </q-item-section>
        </q-item>

        <q-item class="col-xs-12">
          <q-item-section>
            <q-skeleton height="35px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="35px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="35px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="35px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="35px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="35px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="35px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="35px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton width="50px" height="15px" class="q-mb-sm" />
            <div class="q-gutter-sm">
              <q-skeleton width="200px" height="15px" />
            </div>
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="130px" />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-skeleton height="130px" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-section v-else class="q-pa-sm">
      <q-list class="row">
        <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-item-section side>
            <q-avatar size="100px">
              <img ref="avatar" :src="url + '/avatars/' + data.avatar" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-btn
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
              :label="$t('profile.changePhotoText')"
              class="text-capitalize"
              style="max-width: 150px"
              @click="openFileInput"
              rounded
            />
            <form enctype="multipart/form-data">
              <input type="file" id="avatarimage" style="display: none" @change="handleFileChange" />
            </form>
          </q-item-section>
        </q-item>

        <q-item class="col-xs-12">
          <q-item-section>
            <q-input v-model="data.username" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.usernameForm')" :rules="rules.username" outlined dense />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-input v-model="data.first_name" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.firstNameForm')" :rules="rules.first_name" outlined dense />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-input v-model="data.last_name" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.lastNameForm')" :rules="rules.last_name" outlined dense />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-input v-model="data.email" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.emailForm')" :rules="rules.email" outlined dense />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-input type="number" v-model="data.phone" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.phoneForm')" :rules="rules.phone" outlined dense />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-select
              v-model="data.pronouns"
              :options="['ey/em', 'he/him', 'ne/nem', 'she/her', 'they/them', 've/ver', 'xe/xem', 'xie/xem', 'ze/zir']"
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              :label="$t('profile.pronounsForm')"
              outlined
              dense
            />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-input v-model="data.url" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.urlForm')" :rules="rules.url" outlined dense />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-input v-model="data.birthday" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.birthdayForm')" mask="date" outlined dense>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale" cover>
                    <q-date v-model="data.birthday" :color="$q.dark.isActive ? 'secondary' : 'primary'" :text-color="$q.dark.isActive ? 'primary' : 'secondary'">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <span>{{ $t('profile.genderForm') }} :</span>
            <div class="q-gutter-sm">
              <q-radio
                v-model="data.gender"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="man"
                :label="$t('profile.manGenderForm')"
              />
              <q-radio
                v-model="data.gender"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="woman"
                :label="$t('profile.womanGenderForm')"
              />
            </div>
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-input type="textarea" v-model="data.address" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.addressForm')" :rules="rules.address" outlined dense />
          </q-item-section>
        </q-item>
        <q-item class="col-sm-6 col-xs-12">
          <q-item-section>
            <q-input type="textarea" v-model="data.about" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('profile.aboutForm')" :rules="rules.about" outlined dense />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        :color="$q.dark.isActive ? 'secondary' : 'primary'"
        :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
        :label="$t('profile.editProfileBtn')"
        :loading="profileLoading"
        :disable="profileLoading"
        class="text-capitalize"
        @click="editProfile"
      >
        <template v-slot:loading>
          <q-spinner-hourglass class="on-center" />
        </template>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url, token } from '/src/boot/axios'
import { useAuthStore } from '/src/stores/auth-store'
import { useUserStore } from '/src/stores/user-store'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const userStore = useUserStore()
const loading = ref(true)
const data = ref({})

// Profile
const profile = ref({})
const username = ref()
const getProfile = async () => {
  try {
    const res = await authStore.profile()

    profile.value = res.data.data
    data.value = res.data.data
    username.value = res.data.data.username
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// User
const users = ref([])
const getUser = async () => {
  try {
    const res = await userStore.all()

    users.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  if (token) {
    getProfile()
  }
  getUser()
})

// Edit Avatar
const avatar = ref(null)
const openFileInput = () => {
  document.getElementById('avatarimage').click()
}
const handleFileChange = async (e) => {
  e.preventDefault()
  const file = e.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      avatar.value.src = reader.result
    }
    reader.readAsDataURL(file)
    data.value.avatar = file

    await userStore.editavatar(data.value)

    toast.success(t('profile.successEditAvatarMsg'))
  }
}

// Edit Profile
const rules = ref({
  username: [
    (v) => !!v || t('profile.validate.usernameRequired'),
    (v) => v.length <= 15 || t('profile.validate.usernameMaxLength'),
    (v) => {
      if (typeof v === 'string') {
        if (users.value) {
          const editedProfileUsername = username.value.toLowerCase()
          return !users.value.some((user) => user.username.toLowerCase() === v.toLowerCase() && user.username.toLowerCase() !== editedProfileUsername) || t('profile.validate.usernameUnique')
        }
      }
      return true
    }
  ],
  first_name: [(v) => !!v || t('profile.validate.firstNameRequired'), (v) => v.length <= 15 || t('profile.validate.firstNameMaxLength')],
  last_name: [(v) => v.length <= 15 || t('profile.validate.lastNameMaxLength')],
  email: [(v) => !!v || t('profile.validate.emailRequired'), (v) => /.+@.+/.test(v) || t('profile.validate.emailFormat')],
  phone: [(v) => v.length <= 15 || t('profile.validate.phoneMaxLength')],
  url: [(v) => v.length <= 255 || t('profile.validate.urlMaxLength')],
  address: [(v) => v.length <= 255 || t('profile.validate.addressMaxLength')],
  about: [(v) => v.length <= 100 || t('profile.validate.aboutMaxLength')]
})
const profileLoading = ref(false)
const editProfile = async () => {
  profileLoading.value = true
  try {
    await userStore.edit(data.value)

    toast.success(t('profile.successEditProfileMsg'))
    router.push({ name: 'indexprofile', params: { username: data.value.username } })
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error(t('profile.failedEditProfileMsg'))
  }
  profileLoading.value = false
}
</script>
