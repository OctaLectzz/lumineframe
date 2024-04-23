<template>
  <div class="q-py-lg">
    <!-- Loading -->
    <div v-if="loading" class="row justify-center q-gutter-lg">
      <div v-for="n in 6" :key="n" class="col-sm-3 col-xs-4 collections">
        <q-skeleton width="100%" height="120px" />
      </div>
    </div>

    <div v-else class="row justify-center q-gutter-lg">
      <div v-for="collection in collections" :key="collection.id" class="col-sm-3 col-xs-4 collections" @click="showCollection(collection)">
        <!-- User -->
        <div class="text-subtitle2 q-pa-sm">
          <q-avatar class="lumine-avatar">
            <img :src="url + '/avatars/' + collection.user.avatar" />
          </q-avatar>
          <span class="q-mx-xs" style="font-size: 10px">{{ collection.user.name.length > 10 ? collection.user.name.substring(0, 10) + '...' : collection.user.name }}</span>
        </div>

        <div class="collection-container">
          <!-- Image -->
          <div v-if="collection.photos && collection.photos.length > 0">
            <div class="row">
              <template v-for="photo in collection.photos.slice(0, 4)" :key="photo.id">
                <div class="col-2">
                  <img v-if="photo.image" :src="url + '/images/' + photo.image" class="collection-image" />
                  <img v-else src="/src/assets/img/no_image_available.jpg" class="collection-image" />
                </div>
              </template>
              <template v-if="collection.photos.length < 4">
                <div v-for="n in 4 - collection.photos.length" :key="n" class="col-2">
                  <img src="/src/assets/img/no_image_available.jpg" class="collection-image" />
                </div>
              </template>
            </div>
          </div>
          <div v-else>
            <div class="row">
              <div v-for="n in 4" :key="n" class="col-2">
                <img src="/src/assets/img/no_image_available.jpg" class="collection-image" />
              </div>
            </div>
          </div>
        </div>

        <!-- Name -->
        <div class="text-body1 text-center text-bold">{{ collection.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { url } from '/src/boot/axios'

const router = useRouter()
const { collections, loading } = defineProps(['collections', 'loading'])

const showCollection = (collection) => {
  router.push({ name: 'showcollection', params: { collection_code: collection.collection_code } })
}
</script>

<style scoped>
.collections {
  cursor: pointer;
  transition: all 0.3s ease;
}
.collections:hover {
  filter: brightness(90%);
  transform: scale(1.02);
}

.collection-container {
  background-color: #8d8d8d16;
  border-radius: 20px;
}

.collection-image {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  box-shadow: -2px 2px 3px #000;
}
.collection-notfoundimage {
  width: 100%;
  height: 120px;
  border-radius: 20px;
  box-shadow: -2px 2px 3px #000;
}

.lumine-avatar {
  width: 28px;
  height: 28px;
}

@media screen and (max-width: 887px) {
  .collection-image {
    width: 80px;
    height: 80px;
  }
  .collection-notfoundimage {
    height: 80px;
  }
  .text-body1 {
    font-size: 11px;
  }
}

@media screen and (max-width: 429px) {
  .collection-image {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
  .collection-notfoundimage {
    height: 50px;
    border-radius: 10px;
  }
  .text-body1 {
    font-size: 9px;
  }
  .lumine-avatar {
    width: 18px;
    height: 18px;
  }
}
</style>
