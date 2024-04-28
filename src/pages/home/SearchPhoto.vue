<template>
  <!-- Loading -->
  <div class="q-pa-md">
    <MasonryWall v-if="loading" :items="load" :ssr-columns="8" :column-width="200" :gap="18">
      <template #default="{ item }">
        <div class="lumine-container">
          <q-skeleton width="100%" :height="item.height" />
        </div>
      </template>
    </MasonryWall>

    <PhotoLayout v-else :items="photos" :loading="loading" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import MasonryWall from '@yeger/vue-masonry-wall'
import { usePhotoStore } from '/src/stores/photo-store'
import { useRouter, useRoute } from 'vue-router'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const route = useRoute()
const router = useRouter()
const photoStore = usePhotoStore()
const loading = ref(true)

// Skeleton
const load = ref([
  { height: '450px' },
  { height: '250px' },
  { height: '450px' },
  { height: '200px' },
  { height: '250px' },
  { height: '450px' },
  { height: '200px' },
  { height: '450px' },
  { height: '450px' }
])

// Get Photo
const photos = ref([])
const getPhoto = async () => {
  try {
    const res = await photoStore.all()
    photos.value = res.data.data
    filterPhotos()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  getPhoto()
})

// Search
const search = ref(route.params.search || '')
const filterPhotos = () => {
  const filteredData = photos.value.filter((photo) => {
    const titleMatches = photo.title && photo.title.toLowerCase().includes(search.value.toLowerCase())
    const descriptionMatches = photo.description && photo.description.toLowerCase().includes(search.value.toLowerCase())
    const tagMatches = photo.tags.some((tag) => tag.name.toLowerCase().includes(search.value.toLowerCase()))
    const categoryMatches = photo.category.toLowerCase().includes(search.value.toLowerCase())
    const usernameMatches = photo.user.username.toLowerCase().includes(search.value.toLowerCase())

    return titleMatches || descriptionMatches || tagMatches || categoryMatches || usernameMatches
  })

  photos.value = [...filteredData]
}
watch(
  () => route.params.search,
  () => {
    filterPhotos()
  }
)
</script>

<style scoped>
.lumine-container {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
