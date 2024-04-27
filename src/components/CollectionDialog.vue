<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ $t('photo.collectionTitle') }}</div>
      <q-btn color="primary" icon="add" class="absolute absolute-top-right q-ma-md" @click="createCollectionDialog = true" square />
    </q-card-section>

    <q-separator />

    <q-card-section class="q-py-lg scroll" style="max-width: 100vw; max-height: 50vh; width: 600px; height: 300px; scrollbar-width: none">
      <div v-if="loading" class="row q-gutter-lg justify-center">
        <div v-for="n in 9" :key="n" class="col-xs-3 collection-container">
          <q-skeleton width="100px" height="80px" />
        </div>
      </div>

      <div v-else class="row q-gutter-lg justify-center">
        <div v-for="collection in collections" :key="collection.id" class="col-xs-3 collection-container" @click="savePhoto(item, collection)">
          <!-- Image -->
          <div>
            <div v-if="collection.photos && collection.photos.length > 0">
              <div class="row">
                <div v-for="photo in collection.photos.slice(0, 3)" :key="photo.id" class="col-2">
                  <img :src="url + '/public/images/' + photo.image" class="collection-image" />
                </div>
              </div>
            </div>
            <div v-else>
              <img src="no_image_available.jpg" class="collection-image" />
            </div>
          </div>

          <!-- Name -->
          <div class="text-body2">{{ collection.name }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <!-- Create Collection -->
  <q-dialog v-model="createCollectionDialog" backdrop-filter="blur(4px) saturate(150%)">
    <q-card style="width: 350px">
      <q-form @submit="createCollection">
        <q-card-section>
          <div class="text-h6">{{ $t('photo.createCollectionTitle') }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="collection.name" :label="$t('public.nameText')" class="q-mt-sm" :rules="[(v) => (v && v.length <= 20) || $t('photo.nameMaxLength')]" outlined dense required autofocus />
          <q-input type="textarea" v-model="collection.description" :label="$t('public.descriptionText')" class="q-mt-sm" outlined dense />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" label="Cancel" flat v-close-popup />
          <q-btn type="submit" color="primary" :label="$t('public.createText')" :loading="createCollectionLoading" :disable="createCollectionLoading">
            <template v-slot:loading>
              <q-spinner-hourglass class="on-center" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url, token } from '/src/boot/axios'
import { useAuthStore } from '/src/stores/auth-store'
import { useCollectionStore } from '/src/stores/collection-store'
import { useCollectionphotoStore } from '/src/stores/collectionphoto-store'

const { t } = useI18n()
const emits = defineEmits(['saved'])
const { item } = defineProps(['item'])
const authStore = useAuthStore()
const collectionStore = useCollectionStore()
const collectiophotoStore = useCollectionphotoStore()
const loading = ref(true)

// Profile
const profile = ref({})
const collections = ref({})
const getProfile = async () => {
  try {
    const res = await authStore.profile()

    profile.value = res.data.data
    collections.value = res.data.data.collections
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(async () => {
  if (token) {
    await getProfile()
  }
})

// Create Collection
const collection = ref({
  name: '',
  description: ''
})
const createCollectionDialog = ref(false)
const createCollectionLoading = ref(false)
const createCollection = async () => {
  createCollectionLoading.value = true
  try {
    await collectionStore.create(collection.value)

    toast.success(t('photo.successCreateCollectionMsg'))
    collection.value.name = ''
    collection.value.description = ''
    createCollectionDialog.value = false
    getProfile()
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.error(t('photo.failedCreateCollectionMsg'))
  }
  createCollectionLoading.value = false
}

// Save Photo
const data = ref({
  photo_id: item.id,
  collection_id: null
})
const savePhoto = async (item, collection) => {
  try {
    item.saved = true
    data.value.collection_id = collection.id

    await collectiophotoStore.create(data.value)

    toast.success(t('photo.successSaveMsg'))
    item.collectionDialog = false
    getProfile()
  } catch (error) {
    toast.error(t('photo.failedSaveMsg'))
    console.error(error)
  }
}
</script>

<style scoped>
.collection-container {
  cursor: pointer;
  transition: all 0.3s ease;
}
.collection-container:hover {
  filter: brightness(90%);
  transform: scale(1.02);
}

.collection-image {
  width: 80px;
  height: 80px;
  box-shadow: -2px 2px 3px #000;
}
@media screen and (max-width: 397px) {
  .collection-image {
    width: 50px;
    height: 50px;
  }
}
</style>
