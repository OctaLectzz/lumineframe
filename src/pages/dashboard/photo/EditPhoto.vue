<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.photo.editText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 70vh">
          <div class="row justify-center q-gutter-xl" style="margin: 20px 0">
            <!-- Image -->
            <div class="col-xs-10 col-md-3">
              <img :src="url + '/images/' + item.image" alt="Preview" class="preview-image" width="100%" />
            </div>

            <div class="col-xs-10 col-md-6">
              <q-form>
                <!-- Title -->
                <div class="q-my-lg">
                  <label for="title" class="text-grey-8 text-subtitle2">{{ $t('create.titleForm') }}{{ $t('public.optionalText') }}</label>
                  <q-input type="text" v-model="data.title" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('create.titleForm')" :rules="rules.title" outlined dense />
                </div>

                <!-- Description -->
                <div class="q-my-lg">
                  <label for="description" class="text-grey-8 text-subtitle2">{{ $t('create.descriptionForm') }}{{ $t('public.optionalText') }}</label>
                  <q-input
                    type="textarea"
                    v-model="data.description"
                    :color="$q.dark.isActive ? 'secondary' : 'primary'"
                    :label="$t('create.descriptionForm')"
                    :rules="rules.description"
                    outlined
                    dense
                  />
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
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn :label="$t('public.cancelText')" :color="$q.dark.isActive ? 'secondary' : 'primary'" flat v-close-popup />
          <q-btn
            type="submit"
            :label="$t('public.editText')"
            :color="$q.dark.isActive ? 'secondary' : 'primary'"
            :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
            :loading="loading"
            :disable="disabledButton"
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-center" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { usePhotoStore } from '/src/stores/photo-store'
import { useCategoryStore } from '/src/stores/category-store'
import { useTagStore } from '/src/stores/tag-store'

const { t } = useI18n()
const emits = defineEmits(['edited'])
const { item } = defineProps(['item'])
const itemStore = usePhotoStore()

// Data
const data = ref({
  id: item.id,
  image: item.image,
  title: item.title,
  description: item.description,
  category: item.category,
  category_id: item.category_id,
  tags: item.tags.map((tag) => tag.name)
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
  return loading.value
})

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

// Create
const editData = async () => {
  loading.value = true

  try {
    if (data.value.category) {
      data.value.category_id = categories.value.find((category) => category.label === data.value.category).id
    }

    await itemStore.edit(data.value)

    toast.success(t('dashboard.photo.crud.successEditMsg'))
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error(t('dashboard.photo.crud.failedEditMsg'))
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
