<template>
  <PhotoLayout v-if="!loading" :items="likes" :loading="loading" />
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLikeStore } from '/src/stores/like-store'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const route = useRoute()
const router = useRouter()
const likeStore = useLikeStore()

// Like
const likes = ref([])
const loading = ref(true)
const getUser = async () => {
  try {
    const res = await likeStore.userlike('likes')

    likes.value = res.data.data
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
