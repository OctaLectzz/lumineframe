<template>
  <q-page class="q-py-lg">
    <!-- Loading -->
    <div v-if="loading" class="row justify-center q-gutter-lg">
      <div v-for="n in 9" :key="n" class="col-sm-3 col-xs-4 collections">
        <q-skeleton width="100%" height="100px" />
      </div>
    </div>

    <div v-else class="row justify-center q-gutter-lg">
      <div v-for="collection in collections" :key="collection.id" class="col-sm-3 col-xs-4 collections" @click="showCollection(collection)">
        <!-- Image -->
        <div class="collection-container">
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
  </q-page>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { url } from '/src/boot/axios'
import { useUserStore } from '/src/stores/user-store'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// Collection
const collections = ref([])
const loading = ref(true)
const getUser = async (username) => {
  try {
    const res = await userStore.show(username)

    collections.value = res.data.data.collections
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    router.push({ name: 'notfound' })
  }
}

onMounted(() => {
  getUser(route.params.username)
})
watchEffect(() => {
  if (route.params.username) {
    getUser(route.params.username)
  }
})
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
}
</style>
