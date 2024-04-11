<template>
  <div class="q-mb-xl">
    <div v-if="loading" class="row justify-center">
      <!-- Avatar -->
      <q-skeleton type="QAvatar" size="110px" class="q-my-md" />
      <div class="col-12 text-center">
        <!-- Name -->
        <div class="flex flex-center text-h5 text-bold">
          <q-skeleton width="200px" />
        </div>

        <!-- Username & Pronouns -->
        <div class="flex flex-center q-mt-sm">
          <q-skeleton width="120px" height="15px" />
        </div>

        <div class="flex flex-center q-mt-sm">
          <!-- URL & About -->
          <q-skeleton width="300px" />
        </div>
      </div>
    </div>
    <div v-else class="row justify-center">
      <!-- Avatar -->
      <q-avatar size="110px" class="q-my-md">
        <img :src="url + '/avatars/' + profile.avatar" />
      </q-avatar>
      <div class="col-12 text-center">
        <!-- Name -->
        <div class="text-h5 text-bold">{{ profile.name }}</div>

        <!-- Username & Pronouns -->
        <div class="text-subtitle2 text-grey-7">
          {{ profile.username }}
          <span v-if="profile.pronouns">• {{ profile.pronouns }}</span>
        </div>

        <!-- URL & About -->
        <a v-if="profile.url" :href="profile.url" target="_blank" rel="noopener noreferrer" class="permission__link text-bold" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">
          {{ profile.url }} •
        </a>
        {{ profile.about }}
      </div>
    </div>
  </div>

  <q-tabs :class="$q.dark.isActive ? 'bg-primary' : 'bg-secondary'" align="justify" no-caps dense>
    <q-route-tab name="index" label="Created" :to="{ name: 'indexprofile' }" />
    <q-route-tab name="collection" label="Collections" :to="{ name: 'collectionsprofile' }" />
    <q-route-tab name="like" label="Likes" :to="{ name: 'likesprofile' }" />
  </q-tabs>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <div style="padding-bottom: 500px"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { url } from '/src/boot/axios'
import { useUserStore } from '/src/stores/user-store'

const route = useRoute()
const userStore = useUserStore()

// Profile
const profile = ref([])
const loading = ref(true)
const getProfile = async (username) => {
  try {
    const res = await userStore.show(username)

    profile.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getProfile(route.params.username)
})
</script>

<style scoped>
.permission__link {
  text-decoration: none;
}
.permission__link:hover {
  text-decoration: underline;
}
</style>
