<template>
  <!-- Loading -->
  <q-ajax-bar ref="searchBar" position="top" color="primary" size="8px" skip-hijack />

  <div class="header">
    <!-- Image -->
    <q-img src="/src/assets/img/explore_header.png" style="max-height: 280px" fit="fill" />

    <!-- Search -->
    <div class="search-container">
      <q-input
        type="text"
        v-model="search"
        :color="$q.dark.isActive ? 'secondary' : 'primary'"
        class="search-all"
        label="Search..."
        :style="$q.dark.isActive ? 'background-color: #2f2f2fca;' : 'background-color: #d1d1d1;'"
        dense
        borderless
        @keyup.enter="executeSearch"
      >
        <template v-slot:append>
          <q-icon name="search" class="search-icon" @click="executeSearch" />
        </template>
      </q-input>
    </div>

    <div class="q-mx-lg">
      <div class="q-mt-xl">
        <!-- Collections -->
        <div class="text-h5 text-bold q-my-xl">
          {{ $t('explore.collectionList') }}
          <router-link :to="{ name: 'collections' }" class="view-all q-mx-sm text-subtitle2" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">view all</router-link>
          <CollectionLayout :collections="collections.slice(0, 6)" :loading="collectionloading" />
        </div>

        <!-- Categories -->
        <div class="text-h5 text-bold q-my-xl">
          {{ $t('explore.categoryList') }}
          <router-link :to="{ name: 'categories' }" class="view-all q-mx-sm text-subtitle2" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">view all</router-link>
          <CategoryLayout :categories="categories.slice(0, 3)" :loading="categoryloading" />
        </div>

        <!-- Tags -->
        <div class="text-h5 text-bold q-my-xl">
          {{ $t('explore.tagList') }}
          <router-link :to="{ name: 'tags' }" class="view-all q-mx-sm text-subtitle2" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">view all</router-link>
          <TagLayout :tags="tags.slice(0, 20)" :loading="tagloading" size="20px" />
        </div>

        <!-- Photo -->
        <div class="text-h5 text-bold q-my-xl">
          {{ $t('explore.recomendedPhoto') }}
          <div v-if="photoloading" class="row justify-center q-gutter-lg q-pa-md">
            <div v-for="n in 6" :key="n" class="col-sm-3 col-xs-4 collections">
              <q-skeleton width="100%" height="180px" />
            </div>
          </div>
          <PhotoLayout v-else :items="photos" :loading="photoloading" style="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCollectionStore } from '/src/stores/collection-store'
import { useCategoryStore } from '/src/stores/category-store'
import { useTagStore } from '/src/stores/tag-store'
import { usePhotoStore } from '/src/stores/photo-store'
import CollectionLayout from '/src/components/CollectionLayout.vue'
import CategoryLayout from '/src/components/CategoryLayout.vue'
import TagLayout from '/src/components/TagLayout.vue'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const collectionStore = useCollectionStore()
const categoryStore = useCategoryStore()
const tagStore = useTagStore()
const photoStore = usePhotoStore()

// Collection
const collections = ref([])
const collectionloading = ref(true)
const getCollection = async () => {
  try {
    const res = await collectionStore.all()

    collections.value = res.data.data
    collectionloading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Category
const categories = ref([])
const categoryloading = ref(true)
const getCategory = async () => {
  try {
    const res = await categoryStore.all()

    categories.value = res.data.data
    categoryloading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Tag
const tags = ref([])
const tagloading = ref(true)
const getTag = async () => {
  try {
    const res = await tagStore.all()

    tags.value = res.data.data
    tagloading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Photo
const photos = ref([])
const photoloading = ref(true)
const getPhoto = async () => {
  try {
    const res = await photoStore.all()

    photos.value = res.data.data
    photoloading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  getCollection()
  getCategory()
  getTag()
  getPhoto()
})

// Search
const searchResults = ref([])
const search = ref('')
const searchBar = ref(null)
const searchloading = ref(false)
const searchData = async () => {
  searchloading.value = true
  try {
    searchResults.value = []
    const barRef = searchBar.value
    barRef.start()
    photoloading.value = true

    // Fetch Collections, Categories and Tags
    const [collectionRes, categoryRes, tagRes, photoRes] = await Promise.all([collectionStore.all(), categoryStore.all(), tagStore.all(), photoStore.all()])

    const collectionsData = collectionRes.data.data.filter((collection) => {
      return collection.name.toLowerCase().includes(search.value.toLowerCase())
    })
    const categoriesData = categoryRes.data.data.filter((category) => {
      return category.name.toLowerCase().includes(search.value.toLowerCase())
    })
    const tagsData = tagRes.data.data.filter((tag) => {
      return tag.name.toLowerCase().includes(search.value.toLowerCase())
    })
    const photosData = photoRes.data.data.filter((photo) => {
      const titleMatches = photo.title && photo.title.toLowerCase().includes(search.value.toLowerCase())
      const descriptionMatches = photo.description && photo.description.toLowerCase().includes(search.value.toLowerCase())
      const tagMatches = photo.tags.some((tag) => tag.name.toLowerCase().includes(search.value.toLowerCase()))
      const usernameMatches = photo.user.username.toLowerCase().includes(search.value.toLowerCase())

      return titleMatches || descriptionMatches || tagMatches || usernameMatches
    })

    collections.value = [...collectionsData]
    categories.value = [...categoriesData]
    tags.value = [...tagsData]
    photos.value = [...photosData]

    photoloading.value = false
    barRef.stop()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  searchloading.value = false
}
const executeSearch = () => {
  searchData()
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

.view-all {
  text-decoration: none;
}
.view-all:hover {
  text-decoration: underline;
}
</style>
