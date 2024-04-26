<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark'">
      <q-toolbar>
        <q-btn flat dense round @click="toggleDrawer" icon="menu" aria-label="Menu" />
        <q-toolbar-title>{{ $t('dashboard.navbar.dashboardAdminText') }}</q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- Switch Languages -->
          <q-btn-dropdown :color="$q.dark.isActive ? 'secondary' : 'primary'" dense flat>
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
          <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" :icon="$q.dark.isActive ? 'brightness_7' : 'brightness_4'" @click="toggleSwitchMode" flat round dense />

          <!-- Refresh -->
          <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" icon="refresh" @click="$router.go()" round dense flat />

          <!-- FullScreen -->
          <q-btn
            v-if="$q.screen.gt.sm"
            :color="$q.dark.isActive ? 'secondary' : 'primary'"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            round
            dense
            flat
          />

          <!-- Profile -->
          <q-btn-dropdown v-if="loading" :color="$q.dark.isActive ? 'secondary' : 'primary'" rounded dense flat push>
            <template v-slot:label>
              <q-skeleton type="QAvatar" size="26px" />
            </template>
          </q-btn-dropdown>
          <q-btn-dropdown v-else :color="$q.dark.isActive ? 'secondary' : 'primary'" rounded dense flat push>
            <template v-slot:label>
              <q-skeleton v-if="loading" type="QAvatar" size="26px" />

              <q-avatar v-else size="26px">
                <img :src="url + '/avatars/' + profile.avatar" />
              </q-avatar>
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-list class="nav-profile">
                  <q-item @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('dashboard.navbar.homeDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('indexprofile', { username: profile.username })" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('dashboard.navbar.profileDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('setting')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>{{ $t('dashboard.navbar.settingDrpdwn') }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-md" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="url + '/avatars/' + profile.avatar" />
                </q-avatar>

                <div class="nav-profile text-subtitle1 text-bold q-mt-sm">{{ profile.name }}</div>
                <div class="nav-profile text-subtitle2 text-grey-8 q-mb-sm" style="margin-top: -7px">{{ profile.email }}</div>

                <q-btn color="primary" :label="$t('dashboard.navbar.logoutBtn')" push size="sm" v-close-popup @click="logout" />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :mini="miniState" :width="250" :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark'" bordered show-if-above>
      <q-list>
        <q-separator />

        <!-- Brand -->
        <q-item class="q-py-lg">
          <q-item-section avatar>
            <img src="/src/assets/img/logo_transparent.png" width="50" class="q-pa-xs" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h5 text-bold">
              <div>Lumine</div>
              <div class="q-ml-xl">Frame</div>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

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
            <q-item-label>{{ $t('dashboard.sidebar.homeTab') }}</q-item-label>
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
            <q-item-label>{{ $t('dashboard.sidebar.userTab') }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Category -->
        <q-item
          :to="{ name: 'dashboardcategory' }"
          :active-class="$q.dark.isActive ? 'q-item-no-link-highlighting menu-active-dark' : 'q-item-no-link-highlighting menu-active'"
          :class="$q.dark.isActive ? 'menu-click-dark' : 'menu-click'"
        >
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('dashboard.sidebar.categoryTab') }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Tag -->
        <q-item
          :to="{ name: 'dashboardtag' }"
          :active-class="$q.dark.isActive ? 'q-item-no-link-highlighting menu-active-dark' : 'q-item-no-link-highlighting menu-active'"
          :class="$q.dark.isActive ? 'menu-click-dark' : 'menu-click'"
        >
          <q-item-section avatar>
            <q-icon name="tag" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('dashboard.sidebar.tagTab') }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Photo -->
        <q-item
          :to="{ name: 'dashboardphoto' }"
          :active-class="$q.dark.isActive ? 'q-item-no-link-highlighting menu-active-dark' : 'q-item-no-link-highlighting menu-active'"
          :class="$q.dark.isActive ? 'menu-click-dark' : 'menu-click'"
        >
          <q-item-section avatar>
            <q-icon name="photo" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('dashboard.sidebar.photoTab') }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Collection -->
        <q-item
          :to="{ name: 'dashboardcollection' }"
          :active-class="$q.dark.isActive ? 'q-item-no-link-highlighting menu-active-dark' : 'q-item-no-link-highlighting menu-active'"
          :class="$q.dark.isActive ? 'menu-click-dark' : 'menu-click'"
        >
          <q-item-section avatar>
            <q-icon name="perm_media" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('dashboard.sidebar.collectionTab') }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Comment -->
        <q-item
          :to="{ name: 'dashboardcomment' }"
          :active-class="$q.dark.isActive ? 'q-item-no-link-highlighting menu-active-dark' : 'q-item-no-link-highlighting menu-active'"
          :class="$q.dark.isActive ? 'menu-click-dark' : 'menu-click'"
        >
          <q-item-section avatar>
            <q-icon name="comment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('dashboard.sidebar.commentTab') }}</q-item-label>
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
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { lang, languages, languageNames } from '/src/boot/lang'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const darkmode = localStorage.getItem('darkmode') || 'false'

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

// Navigate
const navigateTo = (name, params) => {
  router.push({ name: name, params: params })
}

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

      toast.success(t('auth.successLogoutMsg'))
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(t('auth.failedLogoutMsg'))
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
