<template>
  <PhotoLayout v-if="!loading" :items="photos" :loading="loading" />
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '/src/stores/user-store'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// Photo
const photos = ref([])
const loading = ref(true)
const getUser = async (username) => {
  try {
    const res = await userStore.show(username)

    photos.value = res.data.data.photos
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    router.push({ name: 'notfound' })
  }
}

onMounted(() => {
  getUser(route.params.username)
})
watchEffect(() => {
  if (route.params.username) {
    getUser(route.params.username)
  }
})
</script>
