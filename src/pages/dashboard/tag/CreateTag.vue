<template>
  <div>
    <q-form @submit="createData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.tag.createText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 70vh">
          <div class="row justify-center">
            <!-- Name -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">{{ $t('dashboard.tag.crud.nameForm') }} :</div>
              <q-input
                v-model="data.name"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.tag.crud.nameForm')"
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
              <div class="text-bold">{{ $t('dashboard.tag.crud.descriptionForm') }} :</div>
              <q-input
                v-model="data.description"
                type="textarea"
                :color="$q.dark.isActive ? 'secondary' : 'primary'"
                :label="$t('dashboard.tag.crud.descriptionForm')"
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
import { useTagStore } from '/src/stores/tag-store'

const { t } = useI18n()
const emits = defineEmits(['added'])
const itemStore = useTagStore()
const data = ref({
  name: '',
  description: ''
})

// Tag
const tags = ref([])
const getTag = async () => {
  try {
    const res = await itemStore.all()

    tags.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getTag()
})

// Validate
const rules = ref({
  name: [
    (v) => !!v || t('dashboard.tag.validate.nameRequired'),
    (v) => v.length <= 20 || t('dashboard.tag.validate.nameMaxLength'),
    (v) => {
      if (typeof v === 'string') {
        if (tags.value) {
          return !tags.value.some((tag) => tag.name.toLowerCase() === v.toLowerCase()) || t('dashboard.tag.validate.nameUnique')
        }
      }
      return true
    }
  ],
  description: [(v) => v.length <= 255 || t('dashboard.tag.validate.descriptionMaxLength')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value || !data.value.name
})

// Create
const createData = async () => {
  loading.value = true

  try {
    await itemStore.create(data.value)

    toast.success(t('dashboard.tag.crud.successCreateMsg'))
    emits('added')
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error(t('dashboard.tag.crud.failedCreateMsg'))
  }

  loading.value = false
}
</script>
