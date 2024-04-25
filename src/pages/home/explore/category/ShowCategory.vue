<template>
  <!-- Loading -->
  <q-ajax-bar ref="searchBar" position="top" color="primary" size="8px" skip-hijack />

  <div class="header">
    <!-- Loading -->
    <div v-if="loading">
      <div class="flex flex-center q-my-xs">
        <q-skeleton width="200px" height="30px" />
      </div>
      <div class="flex flex-center q-my-xs">
        <q-skeleton width="300px" height="15px" />
      </div>
    </div>

    <div v-else>
      <!-- Name -->
      <div class="text-h4 text-bold text-center">{{ $t('public.categoryTitle') }} : {{ category.name }}</div>

      <!-- Description -->
      <div class="text-subtitle2 text-center">{{ category.description }}</div>
    </div>

    <!-- Search -->
    <div>
      <div class="search-container q-pt-xl">
        <q-input
          type="text"
          v-model="search"
          :color="$q.dark.isActive ? 'secondary' : 'primary'"
          :label="$t('public.searchPhotoText')"
          class="search-all"
          :style="$q.dark.isActive ? 'background-color: #2f2f2fca;' : 'background-color: #d1d1d1;'"
          @keyup.enter="searchData"
          dense
          borderless
        >
          <template v-slot:append>
            <q-icon name="search" class="search-icon" @click="searchData" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Photos -->
    <div class="q-mt-xl">
      <div class="text-h5 text-bold q-my-xl">
        <div v-if="loading" class="row justify-center q-gutter-lg q-pa-md">
          <div v-for="n in 9" :key="n" class="col-sm-3 col-xs-4">
            <q-skeleton width="100%" height="180px" />
          </div>
        </div>
        <PhotoLayout v-else :items="photos" :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '/src/stores/category-store'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const route = useRoute()
const categoryStore = useCategoryStore()

// Category
const category = ref({})
const photos = ref([])
const loading = ref(true)
const getCategory = async (category_code) => {
  try {
    const res = await categoryStore.show(category_code)

    category.value = res.data.data
    photos.value = res.data.data.photos
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getCategory(route.params.category_code)
})
watchEffect(async () => {
  if (route.params.category_code) {
    loading.value = true
    await getCategory(route.params.category_code)
    loading.value = false
  }
})

// Search
const searchResults = ref([])
const search = ref('')
const searchBar = ref(null)
const searchData = async () => {
  loading.value = true
  try {
    searchResults.value = []
    const barRef = searchBar.value
    barRef.start()

    const res = await await categoryStore.show(route.params.category_code)

    const photosData = res.data.data.photos.filter((photo) => {
      const titleMatches = photo.title && photo.title.toLowerCase().includes(search.value.toLowerCase())
      const descriptionMatches = photo.description && photo.description.toLowerCase().includes(search.value.toLowerCase())
      const tagMatches = photo.tags.some((tag) => tag.name.toLowerCase().includes(search.value.toLowerCase()))
      const usernameMatches = photo.user.username.toLowerCase().includes(search.value.toLowerCase())

      return titleMatches || descriptionMatches || tagMatches || usernameMatches
    })
    photos.value = [...photosData]

    barRef.stop()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
</script>

<style scoped>
/* Search Bar */
.search-container {
  display: flex;
  justify-content: center;
  margin-top: -30px;
}
.search-all {
  z-index: 100;
  padding: 12px;
  font-size: 18px;
  border: none;
  border-radius: 20px;
  width: 80%;
  max-width: 600px;
  transition: all 0.3s;
  box-sizing: border-box;
}
.search-all:focus {
  outline: none;
  transform: scale(1.02);
  border: 2px solid #0000009a;
}
.search-icon {
  cursor: pointer;
  transition: all 0.3s;
}
.search-icon:hover {
  transform: scale(1.2);
}
@media screen and (max-width: 691px) {
  .search-all {
    padding: 6px 12px;
  }
}
</style>
