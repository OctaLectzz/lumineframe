<template>
  <div>
    <q-form @submit="createData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.category.createText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 70vh">
          <div class="row justify-center">
            <!-- Image -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">{{ $t('dashboard.category.crud.imageForm') }} :</div>
              <div>
                <img ref="imagepreview" src="/img/no_image_available.jpg" :ratio="4 / 3" style="width: 300px; border-radius: 20px" />
              </div>
              <div>
                <q-btn
                  :color="$q.dark.isActive ? 'secondary' : 'primary'"
                  :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
                  :label="$t('dashboard.category.crud.uploadImageText')"
                  class="text-capitalize q-my-sm"
                  style="max-width: 150px"
                  @click="openFileInput"
                  rounded
                />
                <form enctype="multipart/form-data">
                  <input type="file" id="categoryimage" style="display: none" @change="categoryImageChange" />
                </form>
              </div>
            </div>

            <!-- Name -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">{{ $t('dashboard.category.crud.nameForm') }} :</div>
              <q-input
                v-model="data.name"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.category.crud.nameForm')"
                class="q-mb-sm"
                :rules="rules.name"
                dense
                outlined
                required
                autofocus
              />
            </div>

            <!-- Description -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">{{ $t('dashboard.category.crud.descriptionForm') }} :</div>
              <q-input
                v-model="data.description"
                type="textarea"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.category.crud.descriptionForm')"
                class="q-mb-sm"
                :rules="rules.description"
                dense
                outlined
              />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn :label="$t('public.cancelText')" :color="$q.dark.isActive ? 'secondary' : 'primary'" flat v-close-popup />
          <q-btn
            type="submit"
            :label="$t('public.createText')"
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
import { ref, onMounted, computed, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useCategoryStore } from '/src/stores/category-store'

const { t } = useI18n()
const emits = defineEmits(['added'])
const itemStore = useCategoryStore()
const data = ref({
  image: '',
  name: '',
  description: ''
})

// Category
const categories = ref([])
const getCategory = async () => {
  try {
    const res = await itemStore.all()

    categories.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getCategory()
})

// Validate
const rules = ref({
  image: [(v) => !!v || t('dashboard.category.validate.imageRequired')],
  name: [
    (v) => !!v || t('dashboard.category.validate.nameRequired'),
    (v) => v.length <= 15 || t('dashboard.category.validate.nameMaxLength'),
    (v) => {
      if (typeof v === 'string') {
        if (categories.value) {
          return !categories.value.some((category) => category.name.toLowerCase() === v.toLowerCase()) || t('dashboard.category.validate.nameUnique')
        }
      }
      return true
    }
  ],
  description: [(v) => v.length <= 255 || t('dashboard.category.validate.descriptionMaxLength')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value || !data.value.image || !data.value.name
})

// Image
const imagepreview = ref(null)
const openFileInput = () => {
  document.getElementById('categoryimage').click()
}
const categoryImageChange = async (e) => {
  e.preventDefault()
  const file = e.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imagepreview.value.src = reader.result
    }
    reader.readAsDataURL(file)

    data.value.image = file
  }
}

// Create
const createData = async () => {
  loading.value = true

  try {
    await itemStore.create(data.value)

    toast.success(t('dashboard.category.crud.successCreateMsg'))
    emits('added')
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error(t('dashboard.category.crud.failedCreateMsg'))
  }

  loading.value = false
}
</script>
