<template>
  <q-page class="q-pa-md">
    <div class="header text-h5 text-bold fixed-top q-pa-md" :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'">
      {{ $t('create.headerText') }}
      <q-btn
        class="float-right"
        :color="$q.dark.isActive ? 'secondary' : 'primary'"
        :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
        :label="$t('create.handleButton')"
        :loading="loading"
        :disable="disabledButton"
        @click="createPhoto"
        rounded
      >
        <template v-slot:loading>
          <q-spinner-hourglass class="on-center" />
        </template>
      </q-btn>
    </div>
    <div class="row justify-center" style="margin: 20px 0">
      <!-- Image -->
      <div class="col-xs-10 col-md-3 q-mx-md">
        <div
          class="dropzone cursor-pointer"
          :class="{ 'active-dropzone': active, 'dropzone-image': image }"
          :style="$q.dark.isActive ? 'border: 2px dashed #fff' : 'border: 2px dashed var(--q-primary)'"
          @dragenter.prevent="toggleActive"
          @dragleave.prevent="toggleActive"
          @dragover.prevent="toggleActive"
          @drop.prevent="drop"
        >
          <span v-if="!image" class="text-center cursor-pointer" @click="openFileInput">
            <label for="dropzoneFile" class="upload-icon cursor-pointer">
              <q-icon name="upload" />
            </label>
            <div class="text-bold q-mt-md q-mb-xl q-pb-xl" :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'">{{ $t('create.chooseFile') }}</div>
            <div class="recomended-text text-grey-7 q-mt-xl q-pt-xl">{{ $t('create.recomendedFile') }}</div>
          </span>
          <div v-if="image">
            <img :src="image" alt="Preview" class="preview-image" width="100%" />
            <div class="flex flex-center">
              <q-btn class="delete-button" color="negative" icon="delete" @click="deleteImage" dense />
            </div>
          </div>
          <input type="file" id="dropzoneFile" class="dropzoneFile" @change="handleFileInput" />
        </div>
      </div>

      <div class="col-xs-10 col-md-6 q-mx-md">
        <q-form>
          <!-- Title -->
          <div class="q-my-lg">
            <label for="title" class="text-grey-8 text-subtitle2">{{ $t('create.titleForm') }}{{ $t('public.optionalText') }}</label>
            <q-input type="text" v-model="data.title" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('create.titleForm')" :rules="rules.title" outlined dense />
          </div>

          <!-- Description -->
          <div class="q-my-lg">
            <label for="description" class="text-grey-8 text-subtitle2">{{ $t('create.descriptionForm') }}{{ $t('public.optionalText') }}</label>
            <q-input type="textarea" v-model="data.description" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('create.descriptionForm')" :rules="rules.description" outlined dense />
          </div>

          <!-- Category -->
          <div class="q-my-lg">
            <label for="category" class="text-grey-8 text-subtitle2">{{ $t('create.categoryForm') }}{{ $t('public.optionalText') }}</label>
            <q-select
              v-model="data.category"
              :options="categoryOptions"
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              :label="$t('create.categoryForm')"
              @filter="categoryFilter"
              input-debounce="0"
              use-input
              fill-input
              emit-value
              hide-selected
              outlined
              dense
            />
          </div>

          <!-- Tag -->
          <div class="q-my-lg">
            <label for="tag" class="text-grey-8 text-subtitle2">{{ $t('create.tagForm') }}{{ $t('public.optionalText') }}</label>
            <q-input
              v-model="tagInput"
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              :label="$t('create.tagForm')"
              @keydown.enter="addTag"
              autocomplete="list"
              :list="tagListId"
              :disable="disabledTag"
              :rules="rules.tag"
              outlined
              dense
            >
              <template v-slot:append>
                <q-btn color="primary" size="sm" icon="add" @click="addTag" dense />
              </template>
            </q-input>
            <q-list v-show="showTagList && tagInput.length > 0" class="tag-list" :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'" dense>
              <q-item v-for="(tag, index) in filteredTags" :key="index" clickable @click="addTagFromList(tag)">
                <q-item-section>{{ tag }}</q-item-section>
              </q-item>
            </q-list>
            <q-chip
              v-for="(tag, index) in data.tags"
              :key="index"
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
              @remove="removeTag(index)"
              removable
            >
              {{ tag }}
            </q-chip>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { usePhotoStore } from '/src/stores/photo-store'
import { useCategoryStore } from '/src/stores/category-store'
import { useTagStore } from '/src/stores/tag-store'

const { t } = useI18n()
const photoStore = usePhotoStore()

// Data
const data = ref({
  image: '',
  title: '',
  description: '',
  category: '',
  category_id: null,
  tags: []
})

// Validate
const rules = ref({
  title: [(val) => !val || val.length <= 20 || t('create.validate.titleMaxLength')],
  description: [(val) => !val || val.length <= 255 || t('create.validate.descriptionMaxLength')],
  tag: [(val) => !val || val.length <= 20 || t('create.validate.tagMaxLength')]
})

// Loading Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value || !image.value
})

// Image
const image = ref(null)
const dropzoneFile = ref('')
const active = ref(false)
const toggleActive = () => {
  active.value = !active.value
}
const openFileInput = () => {
  document.getElementById('dropzoneFile').click()
}
const drop = (e) => {
  const file = e.dataTransfer.files[0]
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(file.type)) {
    toast.error(t('create.imageType'))
    return
  }

  dropzoneFile.value = file
  image.value = URL.createObjectURL(file)
}
const handleFileInput = (e) => {
  const file = e.target.files[0]
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(file.type)) {
    toast.error(t('create.imageType'))
    return
  }

  dropzoneFile.value = file
  image.value = URL.createObjectURL(file)
}

const deleteImage = () => {
  image.value = null
}

// Category
const categoryStore = useCategoryStore()
const categories = ref([])
const categoryOptions = ref([])
const getCategory = async () => {
  try {
    const res = await categoryStore.all()

    categories.value = res.data.data.map((category) => ({
      id: category.id,
      label: category.name,
      value: category.name
    }))
    categoryOptions.value = [...categories.value]
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const categoryFilter = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    categoryOptions.value = categories.value.filter((option) => {
      return option.value.toLowerCase().indexOf(needle) > -1
    })
  })
}

// Tag
const tagStore = useTagStore()
const tags = ref([])
const tagInput = ref('')
const tagListId = 'tagList'
const showTagList = ref(false)
const filteredTags = ref([])
const disabledTag = ref(false)
const getTag = async () => {
  try {
    const res = await tagStore.all()
    tags.value = res.data.data.map((tag) => tag.name.toLowerCase())
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const addTag = () => {
  const tag = tagInput.value.trim().toLowerCase()
  if (tag !== '' && tag.length <= 20 && !data.value.tags.includes(tag)) {
    if (data.value.tags.length < 10) {
      data.value.tags.push(tag)
    } else {
      disabledTag.value = true
    }
  }
  tagInput.value = ''
  showTagList.value = false
}
const addTagFromList = (tag) => {
  if (!data.value.tags.includes(tag)) {
    data.value.tags.push(tag)
  }
  tagInput.value = ''
  showTagList.value = false
}
const removeTag = (index) => {
  data.value.tags.splice(index, 1)
  disabledTag.value = data.value.tags.length >= 10
}
const showTagListOnFocus = () => {
  showTagList.value = true
}
const filterTags = (input) => {
  const needle = input.trim().toLowerCase()
  if (data.value.tags.length < 10) {
    filteredTags.value = tags.value.filter((tag) => tag.toLowerCase().includes(needle))
  } else {
    disabledTag.value = true
  }
}

watch(tagInput, (newValue) => {
  filterTags(newValue)
  showTagListOnFocus()
})
onMounted(() => {
  getCategory()
  getTag()
})

// Create Photo
const createPhoto = async () => {
  loading.value = true

  try {
    data.value.image = dropzoneFile.value
    if (data.value.category) {
      data.value.category_id = categories.value.find((category) => category.label === data.value.category).id
    }

    await photoStore.create(data.value)

    data.value.image = null
    data.value.title = ''
    data.value.description = ''
    data.value.category = ''
    data.value.tags = []
    image.value = ''
    toast.success(t('create.successMsg'))
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error(error.response.data.message || t('create.errorMsg'))
  }

  loading.value = false
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

.recomended-text {
  font-size: 10px;
}

.active-dropzone {
  color: #fff;
  background-color: #2732b049;

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

  label {
    color: #fff;
    background-color: var(--q-primary);
  }
}

.tag-list {
  max-height: 200px;
  width: 200px;
  overflow-y: auto;
  position: absolute;
  margin-top: -22px;
  z-index: 5;
  background-color: #fff;
  border: 1px solid var(--q-primary);
}
</style>
