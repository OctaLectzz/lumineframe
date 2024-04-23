<template>
  <div class="q-py-lg">
    <!-- Loading -->
    <span v-if="loading">
      <span v-for="n in 20" :key="n" class="q-mx-sm" style="display: inline-block">
        <q-skeleton width="100px" />
      </span>
    </span>

    <span v-else v-for="tag in tags" :key="tag.id" @click="showTag(tag)">
      <q-chip :color="$q.dark.isActive ? 'secondary' : 'primary'" :text-color="$q.dark.isActive ? 'primary' : 'secondary'" :size="size" class="tags">
        {{ tag.name }}
      </q-chip>
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { tags, loading, size } = defineProps(['tags', 'loading', 'size'])

const showTag = (tag) => {
  router.push({ name: 'showtag', params: { name: tag.name } })
}
</script>

<style scoped>
.tags {
  cursor: pointer;
  transition: all 0.3s ease;
}
.tags:hover {
  filter: brightness(150%);
  transform: scale(1.02);
}
</style>
