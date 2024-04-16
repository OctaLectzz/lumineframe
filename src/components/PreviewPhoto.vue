<template>
  <div class="preview-photo-overlay">
    <div class="preview-photo-container">
      <img :src="url + '/images/' + item.image" :alt="item.image || 'Lumine Photo'" class="preview-photo" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { url } from '/src/boot/axios'

const { item } = defineProps(['item'])
</script>

<style scoped>
.preview-photo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.preview-photo-container {
  max-width: 90%;
  max-height: 90%;
  text-align: center;
}

.preview-photo {
  max-width: 800px;
  max-height: 500px;
  display: inline-block;
}

@media screen and (max-width: 430px) {
  .preview-photo {
    max-width: 300px;
    max-height: 450px;
    display: inline-block;
  }
}
</style>
