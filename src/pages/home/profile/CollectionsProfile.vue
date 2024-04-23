<template>
  <CollectionLayout :collections="collections" :loading="loading" />
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '/src/stores/user-store'
import CollectionLayout from '/src/components/CollectionLayout.vue'

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
