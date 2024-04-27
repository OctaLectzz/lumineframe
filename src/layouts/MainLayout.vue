<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Desktop -->
    <div class="desktop">
      <q-header :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-white'">
        <q-toolbar class="text-primary q-my-md">
          <!-- Logo -->
          <img src="/src/assets/img/logo.png" width="50" class="q-pa-xs" />

          <!-- Tab -->
          <q-toolbar-title v-if="!$q.dark.isActive" class="q-py-sm" style="font-size: 16px">
            <router-link :to="{ name: 'home' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'home' ? 'active-tab' : 'text-dark'">
              {{ $t('navbar.homeTab') }}
            </router-link>
            <router-link :to="{ name: 'explore' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'explore' ? 'active-tab' : 'text-dark'">
              {{ $t('navbar.exploreTab') }}
            </router-link>
            <router-link v-if="token" :to="{ name: 'creationtool' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'creationtool' ? 'active-tab' : 'text-dark'">
              {{ $t('navbar.createTab') }}
            </router-link>
          </q-toolbar-title>
          <q-toolbar-title v-if="$q.dark.isActive" class="q-py-sm" style="font-size: 16px">
            <router-link :to="{ name: 'home' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'home' ? 'active-tab-dark' : 'text-white'">
              {{ $t('navbar.homeTab') }}
            </router-link>
            <router-link :to="{ name: 'explore' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'explore' ? 'active-tab-dark' : 'text-white'">
              {{ $t('navbar.exploreTab') }}
            </router-link>
            <router-link v-if="token" :to="{ name: 'creationtool' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'creationtool' ? 'active-tab-dark' : 'text-white'">
              {{ $t('navbar.createTab') }}
            </router-link>
          </q-toolbar-title>

          <!-- Search -->
          <q-input v-model="search" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('public.searchText')" class="search-bar q-mx-sm" @keyup.enter="searchPhoto" outlined dense>
            <template v-slot:append>
              <q-icon name="search" :color="$q.dark.isActive ? 'secondary' : 'primary'" class="search-icon" @click="searchPhoto" />
            </template>
          </q-input>

          <!-- Switch Languages -->
          <q-btn-dropdown :color="$q.dark.isActive ? 'secondary' : 'primary'" class="q-mx-xs" dense flat>
            <template v-slot:label>
              <img :src="'/src/assets/img/lang/' + lang + '.png'" width="20" />
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-list>
                  <q-item v-for="lang in languages.left" :key="lang" @click="changeLanguage(lang)" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>
                        <img :src="'/src/assets/img/lang/' + lang + '.png'" width="20" />
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
                        <img :src="'/src/assets/img/lang/' + lang + '.png'" width="20" />
                        {{ languageNames[lang] }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-btn-dropdown>

          <!-- Switch Mode -->
          <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" class="q-mx-xs" @click="toggleSwitchMode" :icon="$q.dark.isActive ? 'brightness_7' : 'brightness_4'" flat round />

          <!-- Authentication -->
          <div v-if="!token">
            <!-- Login -->
            <q-btn color="primary" text-color="secondary" :label="$t('navbar.loginBtn')" class="q-mx-xs" @click="openLoginDialog" rounded />
            <q-dialog v-model="loginDialog">
              <LoginDialog @register="openRegister" />
            </q-dialog>

            <!-- Register -->
            <q-btn color="secondary" text-color="primary" :label="$t('navbar.signupBtn')" class="q-mx-xs" @click="openRegisterDialog" rounded />
            <q-dialog v-model="registerDialog">
              <RegisterDialog @login="openLogin" />
            </q-dialog>
          </div>

          <div v-else>
            <!-- Profile Menu -->
            <ProfileMenu :url="url" :loading="loading" :profile="profile" />
          </div>
        </q-toolbar>
      </q-header>
    </div>

    <!-- Mobile -->
    <div class="mobile">
      <!-- Header -->
      <q-header :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-white'">
        <q-toolbar class="text-primary">
          <!-- Logo -->
          <q-toolbar-title>
            <img src="/src/assets/img/logo.png" width="50" class="q-pa-sm" />
          </q-toolbar-title>

          <!-- Switch Languages -->
          <q-btn-dropdown :color="$q.dark.isActive ? 'secondary' : 'primary'" class="q-mx-xs" dense flat>
            <template v-slot:label>
              <img :src="'/src/assets/img/lang/' + lang + '.png'" width="20" />
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-list>
                  <q-item v-for="lang in languages.left" :key="lang" @click="changeLanguage(lang)" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>
                        <img :src="'/src/assets/img/lang/' + lang + '.png'" width="20" />
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
                        <img :src="'/src/assets/img/lang/' + lang + '.png'" width="20" />
                        {{ languageNames[lang] }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-btn-dropdown>

          <!-- Switch Mode -->
          <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" :icon="$q.dark.isActive ? 'brightness_7' : 'brightness_4'" class="q-mx-xs" @click="toggleSwitchMode" flat round dense />

          <!-- Authentication -->
          <div v-if="!token">
            <!-- Login -->
            <q-btn color="primary" text-color="secondary" size="sm" :label="$t('navbar.loginBtn')" class="q-mx-xs" @click="openLoginDialog" rounded />
            <q-dialog v-model="loginDialog">
              <LoginDialog @register="openRegister" />
            </q-dialog>

            <!-- Register -->
            <q-btn color="secondary" text-color="primary" size="sm" :label="$t('navbar.signupBtn')" class="q-mx-xs" @click="openRegisterDialog" rounded />
            <q-dialog v-model="registerDialog">
              <RegisterDialog @login="openLogin" />
            </q-dialog>
          </div>

          <!-- Profile Menu -->
          <div v-else>
            <ProfileMenu :url="url" :loading="loading" :profile="profile" />
          </div>
        </q-toolbar>
      </q-header>

      <!-- Footer -->
      <q-footer elevated>
        <q-tabs :class="$q.dark.isActive ? 'bg-primary text-light' : 'bg-secondary text-dark'" align="justify" dense>
          <!-- Home -->
          <q-route-tab name="home" icon="home" :to="{ name: 'home' }" />

          <!-- Explore -->
          <q-route-tab name="explore" icon="search" :to="{ name: 'explore' }" />

          <!-- Create -->
          <q-route-tab v-if="token" name="create" class="larger-tab" :to="{ name: 'creationtool' }">
            <div>
              <q-icon name="add_circle" color="light" size="30px" />
            </div>
          </q-route-tab>

          <!-- Category -->
          <q-route-tab name="category" icon="category" :to="{ name: 'categories' }" />

          <!-- Profile -->
          <q-route-tab v-if="!token" name="profile" @click="openLoginDialog">
            <q-avatar size="20px"><img :src="url + '/public/avatars/user-profile-default.jpg'" /></q-avatar>
          </q-route-tab>
          <q-route-tab v-else name="profile" :to="{ name: 'indexprofile', params: { username: profile.username } }">
            <q-skeleton v-if="loading" type="QAvatar" size="20px" />

            <q-avatar v-else size="20px">
              <img :src="url + '/public/avatars/' + profile.avatar" />
            </q-avatar>
          </q-route-tab>
        </q-tabs>
      </q-footer>
    </div>

    <!-- Pages -->
    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { url, token } from '/src/boot/axios'
import { lang, languages, languageNames } from '/src/boot/lang'
import { useAuthStore } from '/src/stores/auth-store'
import LoginDialog from '/src/components/auth/LoginDialog.vue'
import RegisterDialog from '/src/components/auth/RegisterDialog.vue'
import ProfileMenu from '/src/components/ProfileMenu.vue'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const darkmode = localStorage.getItem('darkmode') || 'false'

// Search
const search = ref(route.params.search || '')
const searchPhoto = () => {
  if (search.value) {
    router.push({ name: 'searchphoto', params: { search: search.value || undefined } })
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
}

// Switch Mode
const isDarkMode = ref(JSON.parse(darkmode))
$q.dark.set(isDarkMode.value)
const toggleSwitchMode = () => {
  const newMode = !isDarkMode.value
  $q.dark.set(newMode)

  isDarkMode.value = newMode
  localStorage.setItem('darkmode', newMode)
  window.location.reload()
}

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
const profile = ref({})
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
  if (token) {
    getProfile()
  }
})
</script>

<style scoped>
.desktop {
  margin-top: 85px;
}
.mobile {
  margin-top: 45px;
  display: none;
}

.nav-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.active-tab {
  background-color: var(--q-primary);
  color: var(--q-secondary);
  padding: 5px 10px;
  border-radius: 50px;
}
.active-tab-dark {
  background-color: var(--q-secondary);
  color: var(--q-primary);
  padding: 5px 10px;
  border-radius: 50px;
}

/* Search Bar */
.search-bar {
  width: 150px;
}
.search-bar:focus {
  outline: none;
  transform: scale(1.02);
  border: 2px solid #00000080;
}
.search-icon {
  cursor: pointer;
  transition: all 0.3s;
}
.search-icon:hover {
  transform: scale(1.1);
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
  .nav-link {
    font-size: 14px;
  }
  .search-bar {
    width: 200px;
    height: 30px;
  }
}

/* For medium devices */
@media screen and (min-width: 909px) {
  .nav-link {
    font-size: 16px;
  }
  .search-bar {
    width: 400px;
    height: 40px;
  }
}

/* For large devices */
@media screen and (min-width: 1150px) {
  .nav-link {
    font-size: 16px;
  }
  .search-bar {
    width: 600px;
    height: 45px;
  }
}
</style>
