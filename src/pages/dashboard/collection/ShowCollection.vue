<template>
  <div>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center q-py-sm">
        <div class="text-h6">{{ $t('dashboard.collection.showText') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll" style="max-height: 70vh">
        <!-- Loading -->
        <div v-if="loading">
          <div class="flex flex-center q-my-xs">
            <q-skeleton width="200px" height="30px" />
          </div>
          <div class="flex flex-center q-my-xs">
            <q-skeleton width="300px" height="15px" />
          </div>
          <div class="q-ml-xl">
            <q-skeleton width="150px" height="50px" />
          </div>
        </div>

        <div v-else>
          <!-- Name -->
          <div class="text-h4 text-bold text-center">{{ $t('public.collectionTitle') }} : {{ collection.name }}</div>

          <!-- Description -->
          <div class="text-subtitle2 text-center">{{ collection.description }}</div>

          <!-- User -->
          <div v-if="user.role != 'Admin'" class="cursor-pointer q-pa-md q-ml-xl">
            <q-avatar class="lumine-avatar float-left">
              <img :src="url + '/avatars/' + user.avatar" />
            </q-avatar>
            <span class="q-mx-sm">
              <span class="text-subtitle2 text-bold">{{ user.name }}</span>
              <div class="q-ml-xl text-subtitle2 text-grey-8 q-pl-sm">{{ user.username }}</div>
            </span>
          </div>
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
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="text-primary">
        <q-btn :label="$t('public.cancelText')" :color="$q.dark.isActive ? 'secondary' : 'primary'" flat v-close-popup />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url, token } from '/src/boot/axios'
import { useCollectionStore } from '/src/stores/collection-store'
import { useAuthStore } from '/src/stores/auth-store'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const { t } = useI18n()
const { item } = defineProps(['item'])
const collectionStore = useCollectionStore()
const authStore = useAuthStore()

// Profile
const profile = ref({})
const profileLoading = ref(true)
const getProfile = async () => {
  try {
    const res = await authStore.profile()

    profile.value = res.data.data
    profileLoading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  if (token) {
    getProfile()
  }
})

// Collection
const collection = ref({})
const photos = ref([])
const user = ref({})
const loading = ref(true)
const getCollection = async () => {
  try {
    collection.value = item
    photos.value = item.photos
    user.value = item.user
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
const searchData = async () => {
  loading.value = true
  try {
    searchResults.value = []
    const barRef = searchBar.value
    barRef.start()

    const photosData = item.photos.filter((photo) => {
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
