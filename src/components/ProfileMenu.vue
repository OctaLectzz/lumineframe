<template>
  <q-btn-dropdown v-if="loading" :color="$q.dark.isActive ? 'secondary' : 'primary'" class="q-mx-xs" rounded dense flat push glossy split>
    <template v-slot:label>
      <q-skeleton type="QAvatar" size="26px" />
    </template>
  </q-btn-dropdown>

  <q-btn-dropdown
    v-else
    :to="{ name: 'indexprofile', params: { username: profile.username } }"
    :color="$q.dark.isActive ? 'secondary' : 'primary'"
    class="q-mx-xs"
    rounded
    dense
    flat
    push
    glossy
    split
  >
    <template v-slot:label>
      <q-skeleton v-if="loading" type="QAvatar" size="26px" />

      <q-avatar v-else size="26px">
        <img :src="url + '/avatars/' + profile.avatar" />
      </q-avatar>
    </template>
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <q-list class="nav-profile">
          <q-item v-if="role === 'Admin'" @click="navigateTo('home')" clickable v-close-popup>
            <q-item-section>
              <q-item-label>{{ $t('navbar.dashboardDrpdwn') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item @click="navigateTo('indexprofile', { username: profile.username })" clickable v-close-popup>
            <q-item-section>
              <q-item-label>{{ $t('navbar.profileDrpdwn') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item @click="navigateTo('collectionsprofile')" clickable v-close-popup>
            <q-item-section>
              <q-item-label>{{ $t('navbar.collectionsDrpdwn') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item @click="navigateTo('setting')" clickable v-close-popup>
            <q-item-section>
              <q-item-label>{{ $t('navbar.settingDrpdwn') }}</q-item-label>
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

        <q-btn color="primary" :label="$t('navbar.logoutBtn')" push size="sm" v-close-popup @click="logout" />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '/src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const { t } = useI18n()
const { url, loading, profile } = defineProps(['url', 'loading', 'profile'])
const authStore = useAuthStore()
const role = localStorage.getItem('role')

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
@media screen and (max-width: 691px) {
  .nav-profile {
    font-size: 10px;
  }
}
@media screen and (max-width: 360px) {
  .nav-profile {
    font-size: 5px;
  }
}
</style>
