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
      <div v-if="user.role != 'Admin'" class="cursor-pointer q-pa-md q-ml-xl" @click="userCollection(user.username)">
        <q-avatar class="lumine-avatar float-left">
          <img :src="url + '/public/avatars/' + user.avatar" />
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

    <!-- Edit -->
    <q-btn v-if="!profileLoading || profile.username === user.username" color="primary" icon="edit" class="absolute absolute-top-right q-ma-md" @click="editDialog = true" round dense />
    <q-dialog v-model="editDialog" backdrop-filter="blur(4px) saturate(150%)">
      <q-card style="width: 350px">
        <q-form @submit="editCollection">
          <q-card-section>
            <div class="text-h6">{{ $t('explore.editCollectionTitle') }}</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="data.name" :label="$t('public.nameText')" class="q-mt-sm" :rules="[(v) => (v && v.length <= 20) || $t('photo.nameMaxLength')]" outlined dense required autofocus />
            <q-input type="textarea" v-model="data.description" :label="$t('public.descriptionText')" class="q-mt-sm" outlined dense />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn color="primary" label="Cancel" flat v-close-popup />
            <q-btn type="submit" color="primary" :label="$t('public.editText')" :loading="editLoading" :disable="editLoading">
              <template v-slot:loading>
                <q-spinner-hourglass class="on-center" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url, token } from '/src/boot/axios'
import { useCollectionStore } from '/src/stores/collection-store'
import { useAuthStore } from '/src/stores/auth-store'
import PhotoLayout from '/src/components/PhotoLayout.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
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
const getCollection = async (collection_code) => {
  try {
    const res = await collectionStore.show(collection_code)

    collection.value = res.data.data
    photos.value = res.data.data.photos
    user.value = res.data.data.user
    data.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getCollection(route.params.collection_code)
})
watchEffect(async () => {
  if (route.params.collection_code) {
    loading.value = true
    await getCollection(route.params.collection_code)
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

    const res = await await collectionStore.show(route.params.collection_code)

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

// Redirect to User Photo
const userCollection = (username) => {
  router.push({ name: 'indexprofile', params: { username: username } })
}

// Edit
const editDialog = ref(false)
const data = ref({
  id: '',
  name: '',
  description: ''
})
const editLoading = ref(false)
const editCollection = async () => {
  editLoading.value = true
  try {
    await collectionStore.edit(data.value)

    toast.success(t('explore.successEditCollectionMsg'))
    getCollection(route.params.collection_code)
    editDialog.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.error(t('explore.failedEditCollectionMsg'))
  }
  editLoading.value = false
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
