<template>
  <q-menu transition-show="jump-down" transition-hide="jump-up">
    <q-list dense>
      <q-item clickable v-close-popup @click="previewPhoto(item)">
        <q-item-section>{{ $t('photo.menu1') }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="downloadPhoto(item)">
        <q-item-section>{{ $t('photo.menu2') }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup>
        <q-item-section>{{ $t('photo.menu3') }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { usePhotoStore } from '/src/stores/photo-store'
import PreviewPhoto from '/src/components/PreviewPhoto.vue'

const { t } = useI18n()
const { item } = defineProps(['item'])
const photoStore = usePhotoStore()

// Preview Photo
const previewPhoto = (item) => {
  item.previewMode = !item.previewMode
}

// Download Photo
const downloadPhoto = async (data) => {
  try {
    await photoStore.download(data)

    toast.success(t('photo.successDownloadMsg'))
  } catch (error) {
    console.error('Error downloading image:', error)
    toast.error(t('photo.failedDownloadMsg'))
  }
}
</script>
