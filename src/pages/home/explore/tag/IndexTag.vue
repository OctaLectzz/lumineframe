<template>
  <!-- Loading -->
  <q-ajax-bar ref="searchBar" position="top" color="primary" size="8px" skip-hijack />

  <div class="header">
    <!-- Image -->
    <q-img src="/src/assets/img/tag_header.jpg" style="max-height: 280px" fit="fill" />

    <!-- Search -->
    <div class="search-container">
      <q-input
        type="text"
        v-model="search"
        :color="$q.dark.isActive ? 'secondary' : 'primary'"
        :label="$t('explore.tagSearch')"
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

  <!-- Tags -->
  <div class="q-mt-xl">
    <div class="text-h5 text-bold q-ma-xl">
      <TagLayout :tags="tags" :loading="loading" :size="size" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useTagStore } from '/src/stores/tag-store'
import TagLayout from '/src/components/TagLayout.vue'

const tagStore = useTagStore()
// Responsive
const desktop = ref(false)
const detectDesktop = () => {
  desktop.value = window.innerWidth >= 691
}
const size = computed(() => {
  return desktop.value ? '30px' : '15px'
})
onMounted(() => {
  detectDesktop()
  window.addEventListener('resize', detectDesktop)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', detectDesktop)
})

// Tag
const tags = ref([])
const loading = ref(true)
const getTag = async () => {
  try {
    const res = await tagStore.all()

    tags.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getTag()
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

    const res = await tagStore.all()

    const tagsData = res.data.data.filter((tag) => {
      return tag.name.toLowerCase().includes(search.value.toLowerCase())
    })
    tags.value = [...tagsData]

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
