<template>
  <PhotoLayout v-if="!loading" :items="photos" :loading="loading" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePhotoStore } from '/src/stores/photo-store'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const photoStore = usePhotoStore()
const loading = ref(true)

// Get Photo
const photos = ref([])
const getPhoto = async () => {
  try {
    const res = await photoStore.all()
    photos.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  getPhoto()
})
</script>
