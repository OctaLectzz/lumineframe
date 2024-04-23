<template>
  <div class="q-py-lg">
    <!-- Loading -->
    <div v-if="loading" class="row justify-center q-gutter-lg">
      <div v-for="n in 6" :key="n" class="col-sm-3 col-xs-8 categories">
        <q-skeleton width="90%" height="150px" />
      </div>
    </div>

    <div v-else class="row q-gutter-lg justify-center">
      <div v-for="category in categories" :key="category.id" class="col-sm-3 col-xs-8 categories" @click="showCategory(category)">
        <q-img :src="url + '/categories/' + category.image" :ratio="4 / 3" class="category-image">
          <div class="absolute-bottom text-subtitle1 text-center">{{ category.name }}</div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { url } from '/src/boot/axios'

const router = useRouter()
const { categories, loading } = defineProps(['categories', 'loading'])

const showCategory = (category) => {
  router.push({ name: 'showcategory', params: { category_code: category.category_code } })
}
</script>

<style scoped>
.categories {
  cursor: pointer;
  transition: all 0.3s ease;
}
.categories:hover {
  filter: brightness(60%);
  transform: scale(1.02);
}

.category-image {
  border-radius: 20px;
}
</style>
