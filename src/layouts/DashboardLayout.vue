<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark'">
      <q-toolbar>
        <q-btn flat dense round @click="toggleDrawer" icon="menu" aria-label="Menu" />
        <q-toolbar-title>Dashboard Admin</q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
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

          <!-- FullScreen -->
          <q-btn
            round
            dense
            flat
            :color="$q.dark.isActive ? 'secondary' : 'primary'"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          ></q-btn>

          <!-- Profile -->
          <q-skeleton v-if="loading" type="QBtn" width="100px" />
          <q-btn-dropdown v-else :label="profile.name" no-caps>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-list>
                  <q-item clickable v-close-popup @click="navigateTo('home')">
                    <q-item-section>
                      <q-item-label>Home</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="navigateTo('home')">
                    <q-item-section>
                      <q-item-label>Edit Profile</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="navigateTo('home')">
                    <q-item-section>
                      <q-item-label>Articles</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-md" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>

                <div class="text-subtitle1 text-bold q-mt-sm">{{ profile.name }}</div>
                <div class="text-subtitle2 text-grey-8 q-mb-sm" style="margin-top: -7px">{{ profile.email }}</div>

                <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" :text-color="$q.dark.isActive ? 'primary' : 'secondary'" label="Logout" push size="sm" v-close-popup @click="logout" />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :mini="miniState" :width="250" :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark'" bordered show-if-above>
      <div class="text-h5 text-bold q-pa-xl">Laundry</div>
      <q-list>
        <!-- Home -->
        <q-item
          :to="{ name: 'dashboardhome' }"
          :active-class="$q.dark.isActive ? 'q-item-no-link-highlighting menu-active-dark' : 'q-item-no-link-highlighting menu-active'"
          :class="$q.dark.isActive ? 'menu-click-dark' : 'menu-click'"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <!-- User -->
        <q-item
          :to="{ name: 'dashboarduser' }"
          :active-class="$q.dark.isActive ? 'q-item-no-link-highlighting menu-active-dark' : 'q-item-no-link-highlighting menu-active'"
          :class="$q.dark.isActive ? 'menu-click-dark' : 'menu-click'"
        >
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>User</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator />
    </q-drawer>

    <q-page-container :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-2'">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { lang, languages, languageNames } from '/src/boot/lang'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()
const role = localStorage.getItem('role')
const darkmode = localStorage.getItem('darkmode') || 'false'

// Sidebar
const leftDrawerOpen = ref(false)
const miniState = ref(false)
const desktop = ref(false)
const detectDesktop = () => {
  desktop.value = window.innerWidth > 1023
}
const toggleLeftDrawer = computed(() => {
  if (desktop.value) {
    return miniState.value
  } else {
    return leftDrawerOpen.value
  }
})
const toggleDrawer = () => {
  if (desktop.value) {
    miniState.value = !miniState.value
  } else {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
}
onMounted(() => {
  detectDesktop()
  window.addEventListener('resize', detectDesktop)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', detectDesktop)
})

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

// Profile
const profile = ref([])
const loading = ref(true)
const getProfile = async () => {
  try {
    const res = await authStore.profile()
    profile.value = res.data.data

    if (res.data.response === 'Failed') {
      router.push('/notfound')
    }

    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getProfile()
})

// Navigate
const navigateTo = (routeName) => {
  router.push({ name: routeName })
}

// Logout
const logout = async () => {
  $q.dialog({
    title: 'Logout',
    message: 'Apakah kamu yakin?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await authStore.logout()

      $q.notify({
        message: 'Logout Berhasil',
        icon: 'check',
        color: 'positive'
      })
      router.push({ name: 'auth' })
      window.location.reload()
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Logout Gagal',
        icon: 'warning',
        color: 'negative'
      })
    }
  })
}
</script>

<style scoped>
.menu-click:hover {
  background-color: var(--q-secondary) !important;
  border-left: solid 0.313rem var(--q-primary);
  box-shadow: none;
}
.menu-click-dark:hover {
  background-color: var(--q-primary) !important;
  border-left: solid 0.313rem var(--q-secondary);
  box-shadow: none;
}
.menu-click {
  border-left: solid 0.313rem transparent;
}
.menu-click-dark {
  border-left: solid 0.313rem transparent;
}
.menu-click:hover .q-item-label {
  color: #000000 !important;
}

.menu-active {
  background-color: var(--q-secondary) !important;
  border-left: solid 0.313rem var(--q-primary);
  box-shadow: none;
}
.menu-active-dark {
  background-color: var(--q-primary) !important;
  border-left: solid 0.313rem var(--q-secondary);
  box-shadow: none;
}
</style>
