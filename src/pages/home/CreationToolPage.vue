<template>
  <q-page class="q-pa-md">
    <div class="header text-h5 text-bold fixed-top bg-white q-pa-md">
      {{ $t('create.headerText') }}
      <q-btn class="float-right" color="primary" :label="$t('create.handleButton')" :loading="loading" rounded>
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          Loading...
        </template>
      </q-btn>
    </div>
    <div class="row justify-center q-gutter-xl" style="margin-top: 100px">
      <div class="col-xs-10 col-md-3">
        <div
          class="dropzone cursor-pointer"
          :class="{ 'active-dropzone': active, 'dropzone-image': data.image }"
          @dragenter.prevent="toggleActive"
          @dragleave.prevent="toggleActive"
          @dragover.prevent
          @drop.prevent="drop"
        >
          <span v-if="!data.image" class="text-center cursor-pointer" @click="openFileInput">
            <label for="dropzoneFile" class="upload-icon cursor-pointer">
              <q-icon name="upload" />
            </label>
            <div class="text-bold q-mt-md q-mb-xl q-pb-xl">{{ $t('create.chooseFile') }}</div>
            <div class="text-grey-7 q-mt-xl q-pt-xl">{{ $t('create.recomendedFile') }}</div>
          </span>
          <div v-if="data.image">
            <img :src="data.image" alt="Preview" class="preview-image" width="100%" />
            <div class="flex flex-center">
              <q-btn class="delete-button" color="negative" icon="delete" @click="deleteImage" dense />
            </div>
          </div>
          <input type="file" id="dropzoneFile" class="dropzoneFile" @change="handleFileInput" />
        </div>
      </div>
      <div class="col-xs-10 col-md-6">
        <q-form>
          <!-- Title -->
          <div class="q-my-lg">
            <label for="title" class="text-grey-8 text-subtitle2">{{ $t('create.titleForm') }}{{ $t('public.optionalText') }}</label>
            <q-input type="text" v-model="data.title" name="title" :label="$t('create.titleForm')" :rules="rules.title" outlined dense />
          </div>

          <!-- Description -->
          <div class="q-my-lg">
            <label for="description" class="text-grey-8 text-subtitle2">{{ $t('create.descriptionForm') }}{{ $t('public.optionalText') }}</label>
            <q-input type="textarea" v-model="data.description" name="description" :label="$t('create.descriptionForm')" :rules="rules.description" outlined dense />
          </div>

          <!-- Category -->
          <div class="q-my-lg">
            <label for="category" class="text-grey-8 text-subtitle2">{{ $t('create.categoryForm') }}{{ $t('public.optionalText') }}</label>
            <q-input type="text" v-model="data.category" name="category" :label="$t('create.categoryForm')" :rules="rules.category" outlined dense />
          </div>

          <!-- Tag -->
          <div class="q-my-lg">
            <label for="tag" class="text-grey-8 text-subtitle2">{{ $t('create.tagForm') }}{{ $t('public.optionalText') }}</label>
            <q-input type="textarea" v-model="data.tags" name="tag" :label="$t('create.tagForm')" :rules="rules.tags" outlined dense />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const dropzoneFile = ref('')
const loading = ref(false)
const data = ref({
  image: null,
  title: '',
  description: '',
  category: '',
  tags: []
})

// Active Dropzone
const active = ref(false)
const toggleActive = () => {
  active.value = !active.value
}

// Open Dropzone
const openFileInput = () => {
  document.getElementById('dropzoneFile').click()
}

// File Image
const drop = (e) => {
  const file = e.dataTransfer.files[0]
  dropzoneFile.value = file
  data.value.image = URL.createObjectURL(file)
}
const handleFileInput = (e) => {
  const file = e.target.files[0]
  dropzoneFile.value = file
  data.value.image = URL.createObjectURL(file)
}

// Delete Image
const deleteImage = () => {
  data.value.image = null
}

// Validate
const rules = {
  title: [(val) => !val || val.length <= 255 || 'The title may not be greater than 255 characters'],
  description: [(val) => !val || val.length > 0 || 'The description may not be empty'],
  category: [(val) => !val || categories.includes(val) || 'Invalid category ID'],
  tags: [(val) => !val || tags.every((tag) => val.includes(tag)) || 'Invalid tag name']
}
</script>

<style scoped lang="scss">
.header {
  z-index: 100;
  margin-top: 82px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
@media screen and (max-width: 691px) {
  .header {
    margin-top: 50px;
  }
}

.dropzone {
  padding: 200px 80px 30px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--q-primary);
  border: 2px dashed var(--q-primary);
  border-radius: 30px;
  transition: 0.3s ease all;

  label {
    padding: 8px 12px;
    color: #fff;
    background-color: var(--q-primary);
    transition: 0.3s ease all;
  }

  input {
    display: none;
  }
}

.active-dropzone {
  color: #fff;
  background-color: var(--q-secondary);

  label {
    color: var(--q-primary);
    background-color: #fff;
  }
}

.upload-icon {
  border-radius: 50%;
}

.dropzone.dropzone-image {
  padding: 20px;
}
.active-dropzone.dropzone-image {
  color: var(--q-primary);
  background-color: #fff;

  label {
    color: #fff;
    background-color: var(--q-primary);
  }
}
</style>
