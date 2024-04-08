<template>
  <div class="q-pa-md" id="lumine-photo">
    <q-infinite-scroll @load="onLoad" :offset="500" scroll-target="#lumine-photo">
      <MasonryWall :items="photos" :ssr-columns="6" :column-width="columnWidth" :gap="gap">
        <template #default="{ item }">
          <div class="lumine-container" @click="lumineView(item.id)" @mouseover="showButtons(item)" @mouseleave="hideButtons(item)">
            <!-- Image -->
            <q-img :src="url + '/images/' + item.image" :alt="item.image || 'Lumine Photo'" class="lumine-photo" />

            <!-- Text -->
            <div v-if="desktop" class="lumine-text">
              <div class="text-subtitle2 q-pa-sm float-right">
                {{ item.user.name }}
                <q-avatar class="lumine-avatar">
                  <img :src="url + '/avatars/' + item.user.avatar" />
                </q-avatar>
              </div>
              <div class="text-subtitle2 text-bold q-px-sm">{{ item.title }}</div>
            </div>
            <div v-if="!desktop" class="lumine-text">
              <div class="float-right">
                <q-btn :size="buttonSize" icon="more_horiz" class="q-mx-sm" @click.stop="showMenu(item)" round flat dense>
                  <q-menu transition-show="jump-down" transition-hide="jump-up">
                    <q-list dense>
                      <q-item clickable v-close-popup>
                        <q-item-section>{{ $t('home.menu1') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>{{ $t('home.menu2') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>{{ $t('home.menu3') }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div class="text-subtitle2 text-bold q-px-sm">{{ item.title }}</div>
              <div class="text-subtitle2 q-px-sm">
                <q-avatar class="lumine-avatar">
                  <img :src="url + '/avatars/' + item.user.avatar" />
                </q-avatar>
                {{ item.user.name }}
              </div>
            </div>

            <!-- Buttons -->
            <div v-if="item.showButtons || item.showMenu" class="buttons" :class="{ 'with-title': item.title }">
              <div v-if="desktop" class="menu-button">
                <q-btn color="primary" text-color="white" :size="buttonSize" icon="more_vert" class="q-ma-sm" @click.stop="showMenu(item)" round dense>
                  <q-menu transition-show="jump-down" transition-hide="jump-up">
                    <q-list dense>
                      <q-item clickable v-close-popup>
                        <q-item-section>{{ $t('home.menu1') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>{{ $t('home.menu2') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>{{ $t('home.menu3') }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div class="action-button q-ma-sm">
                <q-btn color="primary" text-color="white" :size="buttonSize" icon="favorite_border" class="q-mr-xs" round dense />
                <q-btn color="primary" text-color="white" :size="buttonSize" icon="bookmark_border" class="q-mr-xs" round dense />
              </div>
            </div>
          </div>
        </template>
      </MasonryWall>
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
import MasonryWall from '@yeger/vue-masonry-wall'
import { url } from 'src/boot/axios'
import { usePhotoStore } from 'src/stores/photo-store'

const photoStore = usePhotoStore()
const router = useRouter()
const photos = ref([])
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
const getPhoto = async () => {
  loading.value = true
  try {
    const res = await photoStore.all()
    photos.value = res.data.data
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
  loading.value = false
}
onMounted(() => {
  getPhoto()
})

// Button Image
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

// Load Image
const perpage = ref(10)
const onLoad = async () => {
  perpage.value + 10
  photos.value.push(...photos.value)
}

// Redirect to Single Image
const lumineView = (id) => {
  router.push('/')
  resetShowMenu(id)
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
