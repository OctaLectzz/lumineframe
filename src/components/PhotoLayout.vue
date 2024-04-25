<template>
  <div class="q-pa-md">
    <!-- Loading -->
    <MasonryWall v-if="loading" :items="load" :ssr-columns="8" :column-width="columnWidth" :gap="gap">
      <template #default="{ item }">
        <div class="lumine-container">
          <q-skeleton width="100%" :height="item.height" />
        </div>
      </template>
    </MasonryWall>

    <MasonryWall v-else :items="photos" :ssr-columns="8" :column-width="columnWidth" :gap="gap">
      <template #default="{ item }">
        <div class="lumine-container" @click="singlePhoto(item)" @mouseover="showButtons(item)" @mouseleave="hideButtons(item)">
          <!-- Image -->
          <q-img :src="url + '/images/' + item.image" :alt="item.image || 'Lumine Photo'" class="lumine-photo" />

          <!-- Desktop -->
          <div v-if="desktop" class="lumine-text" @click.stop="userPhoto(item.user.username)">
            <!-- Text -->
            <div class="text-subtitle2 text-bold q-px-sm">{{ item.title }}</div>
            <div v-if="item.user.role != 'Admin'" class="text-subtitle2 q-pa-sm float-right">
              {{ item.user.name }}
              <q-avatar class="lumine-avatar">
                <img :src="url + '/avatars/' + item.user.avatar" />
              </q-avatar>
            </div>
          </div>

          <!-- Mobile -->
          <div v-if="!desktop" class="lumine-text">
            <!-- Menu -->
            <div class="float-right">
              <q-btn :size="buttonSize" icon="more_horiz" class="q-mx-sm" @click.stop="showMenu(item)" round flat dense>
                <MenuPhoto :item="item" />
              </q-btn>
            </div>

            <!-- Text -->
            <div class="text-subtitle2 text-bold q-px-sm">{{ item.title }}</div>
            <div v-if="item.user.role != 'Admin'" class="text-subtitle2 q-px-sm" @click.stop="userPhoto(item.user.username)">
              <q-avatar class="lumine-avatar">
                <img :src="url + '/avatars/' + item.user.avatar" />
              </q-avatar>
              {{ item.user.name }}
            </div>
          </div>

          <div v-if="item.showButtons || item.showMenu" class="buttons" :class="{ 'with-title': item.title }">
            <!-- Menu -->
            <div v-if="desktop" class="menu-button">
              <q-btn color="primary" text-color="white" :size="buttonSize" icon="more_vert" class="q-ma-sm" @click.stop="showMenu(item)" round dense>
                <MenuPhoto :item="item" />
              </q-btn>
            </div>

            <!-- Action Button -->
            <div v-if="token" class="action-button q-ma-sm">
              <q-btn
                color="primary"
                :text-color="item.liked ? 'red' : ''"
                :size="buttonSize"
                :icon="item.liked ? 'favorite' : 'favorite_border'"
                class="q-mr-xs"
                @click.stop="likePhoto(item)"
                round
                dense
              />
              <q-btn
                color="primary"
                :text-color="item.saved ? 'yellow' : ''"
                :size="buttonSize"
                :icon="item.saved ? 'bookmark' : 'bookmark_border'"
                class="q-mr-xs"
                @click.stop="openCollection(item)"
                round
                dense
              />
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div v-if="item.previewMode" @click="previewPhoto(item)">
          <PreviewPhoto :url="url" :item="item" />
        </div>

        <!-- Collection -->
        <q-dialog v-model="item.collectionDialog" position="bottom">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ $t('photo.collectionTitle') }}</div>
              <q-btn color="primary" icon="add" class="absolute absolute-top-right q-ma-md" @click="createCollectionDialog = true" square />
            </q-card-section>

            <q-separator />

            <q-card-section class="q-py-lg scroll" style="max-width: 100vw; max-height: 50vh; width: 600px; height: 300px; scrollbar-width: none">
              <div class="row q-gutter-lg justify-center">
                <div v-for="collection in usercollections" :key="collection.id" class="col-xs-3 collection-container" @click="savePhoto(item, collection)">
                  <!-- Image -->
                  <div>
                    <div v-if="collection.photos && collection.photos.length > 0">
                      <div class="row">
                        <div v-for="photo in collection.photos.slice(0, 3)" :key="photo.id" class="col-2">
                          <img :src="url + '/images/' + photo.image" class="collection-image" />
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <img src="no_image_available.jpg" class="collection-image" />
                    </div>
                  </div>

                  <!-- Name -->
                  <div class="text-body2">{{ collection.name }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </template>
    </MasonryWall>

    <!-- Create Collection -->
    <q-dialog v-model="createCollectionDialog" backdrop-filter="blur(4px) saturate(150%)">
      <q-card style="width: 350px">
        <q-form @submit="createCollection">
          <q-card-section>
            <div class="text-h6">{{ $t('photo.createCollectionTitle') }}</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="collection.name" :label="$t('public.nameText')" class="q-mt-sm" :rules="[(v) => (v && v.length <= 20) || $t('photo.nameMaxLength')]" outlined dense required autofocus />
            <q-input type="textarea" v-model="collection.description" :label="$t('public.descriptionText')" class="q-mt-sm" outlined dense />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn color="primary" label="Cancel" flat v-close-popup />
            <q-btn type="submit" color="primary" :label="$t('public.createText')" :loading="createCollectionLoading" :disable="createCollectionLoading">
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
import { ref, onMounted, onBeforeUnmount, computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MasonryWall from '@yeger/vue-masonry-wall'
import { toast } from 'vue3-toastify'
import { url, token } from '/src/boot/axios'
import { useAuthStore } from '/src/stores/auth-store'
import { useLikeStore } from '/src/stores/like-store'
import { useCollectionStore } from '/src/stores/collection-store'
import { useCollectionphotoStore } from '/src/stores/collectionphoto-store'
import PreviewPhoto from '/src/components/PreviewPhoto.vue'
import MenuPhoto from '/src/components/MenuPhoto.vue'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const likeStore = useLikeStore()
const collectionStore = useCollectionStore()
const collectiophotoStore = useCollectionphotoStore()
const { items } = defineProps(['items'])
const loading = ref(true)

// Responsive
const desktop = ref(false)
const detectDesktop = () => {
  desktop.value = window.innerWidth >= 691
}
const columnWidth = computed(() => {
  return desktop.value ? 280 : 120
})
const gap = computed(() => {
  return desktop.value ? 20 : 12
})
const buttonSize = computed(() => {
  return desktop.value ? 'md' : 'sm'
})
onMounted(() => {
  detectDesktop()
  window.addEventListener('resize', detectDesktop)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', detectDesktop)
})

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

// Profile
const profile = ref([])
const usercollections = ref([])
const getProfile = async () => {
  try {
    const res = await authStore.profile()

    profile.value = res.data.data
    usercollections.value = res.data.data.collections
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Get Photo
const photos = ref([])
const getPhoto = () => {
  if (token) {
    photos.value = items.map((photo) => ({
      ...photo,
      liked: profile.value.likes.some((userlike) => userlike.photo_id === photo.id),
      saved: profile.value.collectionphoto.some((usersave) => usersave.photo_id === photo.id)
    }))
  } else {
    photos.value = items
  }

  loading.value = false
}

onMounted(async () => {
  if (token) {
    await getProfile()
  }
  getPhoto()
})

// Button Photo
const showButtons = (item) => {
  item.showButtons = true
}
const hideButtons = (item) => {
  item.showButtons = false
}
const showMenu = (item) => {
  item.showMenu = true
  resetShowMenu(item.id)
}
const resetShowMenu = (clickedItemId) => {
  photos.value.forEach((item) => {
    if (item.id !== clickedItemId) {
      item.showMenu = false
    }
  })
}

// Like Photo
const likePhoto = async (item) => {
  if (item.liked) {
    try {
      item.liked = false

      await likeStore.dislike(item.id)

      toast.success(t('photo.successDislikeMsg'))
    } catch (error) {
      toast.error(t('photo.failedDislikeMsg'))
      console.error(error)
    }
  } else {
    try {
      item.liked = true

      await likeStore.like(item.id)

      toast.success(t('photo.successLikeMsg'))
    } catch (error) {
      console.error(error)
      toast.error(t('photo.failedLikeMsg'))
    }
  }
  getProfile()
}

// Save Photo
const data = ref({
  photo_id: null,
  collection_id: null
})
const savePhoto = async (item, collection) => {
  try {
    item.saved = true
    data.value.collection_id = collection.id

    await collectiophotoStore.create(data.value)

    toast.success(t('photo.successSaveMsg'))
  } catch (error) {
    toast.error(t('photo.failedSaveMsg'))
    console.error(error)
  }
  item.collectionDialog = false
  getProfile()
}

// Create Collection
const collection = ref({
  name: '',
  description: ''
})
const createCollectionDialog = ref(false)
const createCollectionLoading = ref(false)
const openCollection = (item) => {
  item.collectionDialog = true
  data.value.photo_id = item.id
}
const createCollection = async () => {
  createCollectionLoading.value = true
  try {
    await collectionStore.create(collection.value)

    toast.success(t('photo.successCreateCollectionMsg'))
    collection.value.name = ''
    collection.value.description = ''
    createCollectionDialog.value = false
    getProfile()
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.error(t('photo.failedCreateCollectionMsg'))
  }
  createCollectionLoading.value = false
}

// Preview Photo
const previewPhoto = (item) => {
  item.previewMode = !item.previewMode
}

// Redirect to Single Photo
const singlePhoto = (data) => {
  router.push({ name: 'showphoto', params: { photo_number: data.photo_number } })
  resetShowMenu(data)
}

// Redirect to User Photo
const userPhoto = (username) => {
  router.push({ name: 'indexprofile', params: { username: username } })
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.lumine-container {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}
.lumine-container:hover .lumine-photo {
  filter: brightness(70%);
}

.lumine-photo {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.lumine-text div {
  font-size: 13px;
}

.lumine-avatar {
  width: 28px;
  height: 28px;
}

.menu-button {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.action-button {
  position: absolute;
  bottom: 0;
  left: 0;
}
.with-title .action-button {
  bottom: 20px;
}

.collection-container {
  cursor: pointer;
  transition: all 0.3s ease;
}
.collection-container:hover {
  filter: brightness(90%);
  transform: scale(1.02);
}

.collection-image {
  width: 80px;
  height: 80px;
  box-shadow: -2px 2px 3px #000;
}
@media screen and (max-width: 397px) {
  .collection-image {
    width: 50px;
    height: 50px;
  }
}

@media screen and (max-width: 691px) {
  .lumine-text div {
    font-size: 7px;
  }

  .lumine-avatar {
    width: 18px;
    height: 18px;
  }

  .action-button {
    position: absolute;
    top: 0;
    left: 0;
  }
  .with-title .action-button {
    top: 0;
  }
}
</style>
