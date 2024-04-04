<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Desktop -->
    <q-header :class="$q.dark.isActive ? 'desktop bg-secondary ' : 'desktop bg-white'">
      <q-toolbar class="text-primary q-my-md">
        <!-- Tab -->
        <q-toolbar-title style="font-size: 16px">
          <q-img src="src/assets/img/logo.png" class="q-pa-md q-mr-md" style="width: 30px" />
          <router-link to="/" class="nav__link q-mx-sm text-bold active__tab">{{ $t('navbar.homeTab') }}</router-link>
          <router-link to="/" class="nav__link q-mx-sm text-bold">{{ $t('navbar.exploreTab') }}</router-link>
          <router-link to="/" class="nav__link q-mx-sm text-bold">{{ $t('navbar.makeTab') }}</router-link>
        </q-toolbar-title>

        <!-- Search -->
        <div class="q-mr-lg">
          <input type="text" v-model="search" class="search-bar" placeholder="Search..." hint="Search" />
          <q-icon name="search" size="1.5em" style="margin-left: -38px" />
        </div>

        <!-- Authentication -->
        <div v-if="!token">
          <!-- Login -->
          <q-btn color="primary" text-color="white" :label="$t('navbar.loginBtn')" class="q-mx-xs" @click="openLoginDialog" rounded />
          <q-dialog v-model="loginDialog">
            <LoginDialog @register="openRegister" />
          </q-dialog>

          <!-- Register -->
          <q-btn color="secondary" text-color="white" :label="$t('navbar.signupBtn')" class="q-mx-xs" @click="openRegisterDialog" rounded />
          <q-dialog v-model="registerDialog">
            <RegisterDialog @login="openLogin" />
          </q-dialog>
        </div>

        <!-- Switch Languages -->
        <div v-else>
          <q-btn-dropdown class="q-mx-xs" dense flat>
            <template v-slot:label>
              <img :src="'src/assets/img/lang/' + lang + '.png'" width="20" />
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-list>
                  <q-item v-for="lang in languages.left" :key="lang" @click="changeLanguage(lang)" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>
                        <img :src="'src/assets/img/lang/' + lang + '.png'" width="20" />
                        {{ languageNames[lang] }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-md" />

              <div class="column items-center">
                <q-list>
                  <q-item v-for="lang in languages.right" :key="lang" @click="changeLanguage(lang)" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>
                        <img :src="'src/assets/img/lang/' + lang + '.png'" width="20" />
                        {{ languageNames[lang] }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-btn-dropdown>

          <!-- Profile Menu -->
          <q-btn-dropdown class="q-mx-xs" rounded dense flat push glossy split>
            <template v-slot:label>
              <q-avatar size="26px">
                <img :src="url + '/avatars/' + profile.avatar" />
              </q-avatar>
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-list>
                  <q-item v-if="role === 'Admin'" @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('navbar.dashboardDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('navbar.profileDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('navbar.likesDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('navbar.collectionsDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-md" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="url + '/avatars/' + profile.avatar" />
                </q-avatar>

                <div class="text-subtitle1 text-bold q-mt-sm">{{ profile.name }}</div>
                <div class="text-subtitle2 text-grey-8 q-mb-sm" style="margin-top: -7px">{{ profile.email }}</div>

                <q-btn color="primary" :label="$t('navbar.logoutBtn')" push size="sm" v-close-popup @click="logout" />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Mobile -->
    <q-header :class="$q.dark.isActive ? 'mobile bg-secondary ' : 'mobile bg-white'">
      <q-toolbar class="text-primary">
        <q-toolbar-title>
          <q-img src="src/assets/img/logo.png" class="q-pa-md q-mr-md" style="width: 30px" />
        </q-toolbar-title>

        <!-- Switch Languages -->
        <q-btn-dropdown class="q-mx-xs" dense flat>
          <template v-slot:label>
            <img :src="'src/assets/img/lang/' + lang + '.png'" width="20" />
          </template>
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-list>
                <q-item v-for="lang in languages.left" :key="lang" @click="changeLanguage(lang)" clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>
                      <img :src="'src/assets/img/lang/' + lang + '.png'" width="20" />
                      {{ languageNames[lang] }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <q-separator vertical inset class="q-mx-md" />

            <div class="column items-center">
              <q-list>
                <q-item v-for="lang in languages.right" :key="lang" @click="changeLanguage(lang)" clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>
                      <img :src="'src/assets/img/lang/' + lang + '.png'" width="20" />
                      {{ languageNames[lang] }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-btn-dropdown>

        <!-- Authentication -->
        <div v-if="!token">
          <!-- Login -->
          <q-btn color="primary" text-color="white" size="sm" :label="$t('navbar.loginBtn')" class="q-mx-xs" @click="openLoginDialog" rounded />
          <q-dialog v-model="loginDialog">
            <LoginDialog @register="openRegister" />
          </q-dialog>

          <!-- Register -->
          <q-btn color="secondary" text-color="white" size="sm" :label="$t('navbar.signupBtn')" class="q-mx-xs" @click="openRegisterDialog" rounded />
          <q-dialog v-model="registerDialog">
            <RegisterDialog @login="openLogin" />
          </q-dialog>
        </div>

        <!-- Profile Menu -->
        <div v-else>
          <q-btn-dropdown class="q-mx-xs" rounded dense flat push glossy split>
            <template v-slot:label>
              <q-avatar size="26px">
                <img :src="url + '/avatars/' + profile.avatar" />
              </q-avatar>
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-list>
                  <q-item v-if="role === 'Admin'" @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('navbar.dashboardDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('navbar.profileDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('navbar.likesDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('navbar.collectionsDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-md" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="url + '/avatars/' + profile.avatar" />
                </q-avatar>

                <div class="text-subtitle1 text-bold q-mt-sm">{{ profile.name }}</div>
                <div class="text-subtitle2 text-grey-8 q-mb-sm" style="margin-top: -7px">{{ profile.email }}</div>

                <q-btn color="primary" :label="$t('navbar.logoutBtn')" push size="sm" v-close-popup @click="logout" />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Mobilr -->
    <q-footer class="mobile" elevated>
      <q-tabs class="bg-secondary text-light" align="justify" dense>
        <q-route-tab name="home" icon="home" to="/" />
        <q-route-tab name="search" icon="search" />
        <q-route-tab name="make" class="larger-tab">
          <div>
            <q-icon name="add_circle" color="light" size="30px" />
          </div>
        </q-route-tab>
        <q-route-tab name="category" icon="category" />
        <q-route-tab v-if="!token" name="profile">
          <q-avatar size="20px"><img :src="url + '/avatars/user-profile-default.jpg'" /></q-avatar>
        </q-route-tab>
        <q-route-tab v-else name="profile">
          <q-avatar size="20px">
            <img :src="url + '/avatars/' + profile.avatar" />
          </q-avatar>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { url } from 'src/boot/axios'
import { lang, languages, languageNames } from 'src/boot/lang'
import { useAuthStore } from 'src/stores/auth-store'
import LoginDialog from 'src/components/auth/LoginDialog.vue'
import RegisterDialog from 'src/components/auth/RegisterDialog.vue'

const $q = useQuasar()
const { t } = useI18n()
const authStore = useAuthStore()
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

// Search
const search = ref()

// Change Language
const changeLanguage = (newLocale) => {
  localStorage.setItem('lang', newLocale)
  window.location.reload()
}

// Login
const loginDialog = ref(false)
const openLoginDialog = () => {
  loginDialog.value = true
}
const openLogin = () => {
  registerDialog.value = false
  loginDialog.value = true
}

// Register
const registerDialog = ref(false)
const openRegisterDialog = () => {
  registerDialog.value = true
}
const openRegister = () => {
  loginDialog.value = false
  registerDialog.value = true
}

// Profile
const profile = ref([])
const loading = ref(true)
const getProfile = async () => {
  try {
    const res = await authStore.profile()

    profile.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getProfile()
})

// Logout
const logout = async () => {
  $q.dialog({
    title: 'Logout',
    message: t('auth.comfirmationLogoutMsg'),
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await authStore.logout()

      $q.notify({
        icon: 'check',
        color: 'positive',
        message: t('auth.successLogoutMsg')
      })
      window.location.reload()
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        icon: 'warning',
        color: 'negative',
        message: error.response.data.message || t('auth.failedLogoutMsg')
      })
    }
  })
}
</script>

<style scoped>
/* Responsive Navbar & Tab */
.mobile {
  display: none;
}

.nav__link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.active__tab {
  background-color: #00085a;
  color: #fff;
  padding: 5px 10px;
  border-radius: 50px;
}

/* Search Bar */
.search-bar {
  padding: 8px;
  padding-right: 40px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  width: 150px;
  height: 30px;
  background-color: #c0c0c04d;
  transition: all 0.3s;
}
.search-bar:focus {
  outline: none;
  transform: scale(1.02);
  border: 2px solid #00000080;
}

/* For small devices */
@media screen and (max-width: 691px) {
  .mobile {
    display: block;
  }
  .desktop {
    display: none;
  }
}
@media screen and (min-width: 691px) {
  .nav__link {
    font-size: 14px;
  }
  .search-bar {
    width: 200px;
    height: 30px;
  }
}

/* For medium devices */
@media screen and (min-width: 909px) {
  .nav__link {
    font-size: 16px;
  }
  .search-bar {
    width: 400px;
    height: 40px;
  }
}

/* For large devices */
@media screen and (min-width: 1150px) {
  .nav__link {
    font-size: 16px;
  }
  .search-bar {
    width: 600px;
    height: 45px;
  }
}
</style>
