<template>
  <div class="q-pa-md" id="lumine-photo">
    <q-infinite-scroll @load="onLoad" :offset="500" scroll-target="#lumine-photo">
      <MasonryWall :items="photos" :ssr-columns="6" :column-width="columnWidth" :gap="gap">
        <template #default="{ item }">
          <div class="lumine-container" @click="singlePhoto(item.id)" @mouseover="showButtons(item)" @mouseleave="hideButtons(item)">
            <!-- Image -->
            <q-img :src="url + '/images/' + item.image" :alt="item.image || 'Lumine Photo'" class="lumine-photo" />

            <!-- Text -->
            <div v-if="desktop" class="lumine-text" @click.stop="userPhoto(item.user.username)">
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
                  <q-menu transition-show="jump-down" transition-hide="jump-up">
                    <q-list dense>
                      <q-item clickable v-close-popup @click="previewImage(item)">
                        <q-item-section>{{ $t('home.menu1') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="downloadImage(item)">
                        <q-item-section>{{ $t('home.menu2') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>{{ $t('home.menu3') }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
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
                  <q-menu transition-show="jump-down" transition-hide="jump-up">
                    <q-list dense>
                      <q-item clickable v-close-popup @click="previewImage(item)">
                        <q-item-section>{{ $t('home.menu1') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="downloadImage(item)">
                        <q-item-section>{{ $t('home.menu2') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>{{ $t('home.menu3') }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>

              <!-- Action Button -->
              <div class="action-button q-ma-sm">
                <q-btn
                  color="primary"
                  :text-color="item.liked ? 'red' : ''"
                  :size="buttonSize"
                  :icon="item.liked ? 'favorite' : 'favorite_border'"
                  class="q-mr-xs"
                  @click.stop="likeImage(item)"
                  round
                  dense
                />
                <q-btn color="primary" text-color="white" :size="buttonSize" icon="bookmark_border" class="q-mr-xs" round dense />
              </div>
            </div>
          </div>

          <!-- Preview -->
          <div v-if="item.previewMode" class="preview-overlay" @click="previewImage(item)">
            <div class="preview-image-container">
              <img :src="url + '/images/' + item.image" :alt="item.image || 'Lumine Photo'" class="preview-image" />
            </div>
          </div>
        </template>
      </MasonryWall>

      <!-- Load More Photo -->
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MasonryWall from '@yeger/vue-masonry-wall'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { usePhotoStore } from '/src/stores/photo-store'
import { useLikeStore } from '/src/stores/like-store'

const { t } = useI18n()
const router = useRouter()
const photoStore = usePhotoStore()
const likeStore = useLikeStore()
const loading = ref(false)

// Responsive
const desktop = ref(false)
const detectDesktop = () => {
  desktop.value = window.innerWidth >= 691
}
const columnWidth = computed(() => {
  return desktop.value ? 300 : 150
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

// Get Photo
const photos = ref([])
const getPhoto = async () => {
  loading.value = true
  try {
    const res = await photoStore.all()
    photos.value = res.data.data.map((photo) => ({
      ...photo,
      liked: userlikes.value.some((userlike) => userlike.photo_id === photo.id)
    }))
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
  loading.value = false
}

// Get User Likes
const userlikes = ref([])
const getUserLike = async () => {
  try {
    const res = await likeStore.userlike('userlike')
    userlikes.value = res.data.data
  } catch (error) {
    console.error('Error fetching likes:', error)
  }
}

onMounted(async () => {
  await getUserLike()
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

// Load Photo
const perpage = ref(10)
const onLoad = async () => {
  perpage.value + 10
  photos.value.push(...photos.value)
}

// Like Photo
const likeImage = async (item) => {
  if (item.liked) {
    try {
      item.liked = false

      await likeStore.dislike(item.id)

      toast.success(t('home.successDislikeMsg'))
    } catch (error) {
      toast.error(t('home.failedDislikeMsg'))
      console.error(error)
    }
  } else {
    try {
      item.liked = true

      await likeStore.like(item.id)

      toast.success(t('home.successLikeMsg'))
    } catch (error) {
      console.error(error)
      toast.error(t('home.failedLikeMsg'))
    }
  }
  getUserLike()
}

// Preview Photo
const previewImage = (item) => {
  item.previewMode = !item.previewMode
}

// Download Photo
const downloadImage = async (data) => {
  try {
    await photoStore.download(data)

    toast.success(t('home.successDownloadMsg'))
  } catch (error) {
    console.error('Error downloading image:', error)
    toast.error(t('home.failedDownloadMsg'))
  }
}

// Redirect to Single Photo
const singlePhoto = (id) => {
  router.push('/')
  resetShowMenu(id)
}

// Redirect to User Photo
const userPhoto = (username) => {
  router.push({ name: 'indexprofile', params: { username: username } })
}
</script>

<style scoped>
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

.preview-overlay {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.preview-image-container {
  max-width: 90%;
  max-height: 90%;
  text-align: center;
}

.preview-image {
  max-width: 800px;
  max-height: 500px;
  display: inline-block;
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
@media screen and (max-width: 430px) {
  .preview-image {
    max-width: 300px;
    max-height: 450px;
    display: inline-block;
  }
}
</style>
