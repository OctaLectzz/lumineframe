<template>
  <!-- Loading -->
  <q-ajax-bar ref="searchBar" position="top" color="primary" size="8px" skip-hijack />

  <div class="header">
    <!-- Image -->
    <q-img src="/src/assets/img/collection_header.jpg" style="max-height: 280px" fit="fill" />

    <!-- Search -->
    <div class="search-container">
      <q-input
        type="text"
        v-model="search"
        :color="$q.dark.isActive ? 'secondary' : 'primary'"
        :label="$t('explore.collectionSearch')"
        class="search-all"
        :style="$q.dark.isActive ? 'background-color: #2f2f2fca;' : 'background-color: #d1d1d1;'"
        dense
        borderless
        @keyup.enter="searchData"
      >
        <template v-slot:append>
          <q-icon name="search" class="search-icon" @click="searchData" />
        </template>
      </q-input>
    </div>
  </div>

  <!-- Collections -->
  <div class="q-mt-xl">
    <div class="text-h5 text-bold q-my-xl">
      <CollectionLayout :collections="collections" :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCollectionStore } from '/src/stores/collection-store'
import CollectionLayout from '/src/components/CollectionLayout.vue'

const collectionStore = useCollectionStore()

// Collection
const collections = ref([])
const loading = ref(true)
const getCollection = async () => {
  try {
    const res = await collectionStore.all()

    collections.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  getCollection()
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

    const res = await collectionStore.all()

    const collectionsData = res.data.data.filter((collection) => {
      return collection.name.toLowerCase().includes(search.value.toLowerCase())
    })
    collections.value = [...collectionsData]

    barRef.stop()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  searchloading.value = false
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
