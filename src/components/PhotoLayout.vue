<template>
  <div class="q-pa-md" id="lumine-photo">
    <q-infinite-scroll @load="onLoad" :offset="500" scroll-target="#lumine-photo">
      <MasonryWall v-if="loading" :items="load" :ssr-columns="6" :column-width="columnWidth" :gap="gap">
        <template #default="{ item }">
          <div class="lumine-container">
            <q-skeleton width="100%" :height="item.height" />
          </div>
        </template>
      </MasonryWall>

      <MasonryWall v-else :items="photos" :ssr-columns="6" :column-width="columnWidth" :gap="gap">
        <template #default="{ item }">
          <div class="lumine-container" @click="singlePhoto(item)" @mouseover="showButtons(item)" @mouseleave="hideButtons(item)">
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
                <q-btn color="primary" text-color="white" :size="buttonSize" icon="bookmark_border" class="q-mr-xs" round dense />
              </div>
            </div>
          </div>

          <!-- Preview -->
          <div v-if="item.previewMode" @click="previewPhoto(item)">
            <PreviewPhoto :url="url" :item="item" />
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
import { ref, onMounted, computed, onBeforeUnmount, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MasonryWall from '@yeger/vue-masonry-wall'
import { toast } from 'vue3-toastify'
import { url, token } from '/src/boot/axios'
import { useLikeStore } from '/src/stores/like-store'
import PreviewPhoto from '/src/components/PreviewPhoto.vue'
import MenuPhoto from '/src/components/MenuPhoto.vue'

const { t } = useI18n()
const router = useRouter()
const { items } = defineProps(['items'])
const likeStore = useLikeStore()
const loading = ref(true)

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
const getPhoto = () => {
  photos.value = items.map((photo) => ({
    ...photo,
    liked: userlikes.value.some((userlike) => userlike.photo_id === photo.id)
  }))
  loading.value = false
}

// Get User Likes
const userlikes = ref([])
const getUserLike = async () => {
  try {
    const res = await likeStore.userlike('userlike')
    userlikes.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(async () => {
  if (token) {
    await getUserLike()
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

// Load Photo
const perpage = ref(10)
const onLoad = async () => {}

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
  getUserLike()
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
