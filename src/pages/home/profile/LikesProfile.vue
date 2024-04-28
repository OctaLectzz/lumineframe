<template>
  <PhotoLayout v-if="!loading" :items="likes" :loading="loading" />
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '/src/stores/user-store'
import { useLikeStore } from '/src/stores/like-store'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const likeStore = useLikeStore()

// User
const users = ref({})
const getUser = async (username) => {
  try {
    const res = await userStore.show(username)

    users.value = res.data.data
    getLike(users.value.id)
  } catch (error) {
    console.error('Error fetching data:', error)
    router.push({ name: 'notfound' })
  }
}

// Like
const likes = ref([])
const loading = ref(true)
const getLike = async (id) => {
  try {
    const res = await likeStore.userlike(id)

    likes.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
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
