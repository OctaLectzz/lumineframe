<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      bordered
      class="statement-table"
      title="Category"
      :rows="currencyData"
      :hide-header="grid"
      :columns="currencyColumns"
      row-key="__index"
      :grid="grid"
      :filter="filter"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[10, 20, 30]"
    >
      <!-- Top -->
      <template v-slot:top-right="props">
        <!-- Fullscreen -->
        <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="setFs(props)" flat round dense>
          <q-tooltip>{{ props.inFullscreen ? $t('dashboard.exitFullScreenText') : $t('dashboard.toggleFullScreenText') }}</q-tooltip>
        </q-btn>

        <!-- Grid Switch -->
        <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" :icon="grid ? 'list' : 'grid_on'" @click="grid = !grid" class="q-mr-sm" flat round dense>
          <q-tooltip>{{ grid ? $t('dashboard.listText') : $t('dashboard.gridText') }}</q-tooltip>
        </q-btn>

        <!-- Search -->
        <q-input outlined dense debounce="300" v-model="filter" :placeholder="$t('public.searchText')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Create -->
      <template v-slot:top-left>
        <div class="text-h5 q-pr-lg">{{ $t('dashboard.category.categoryText') }}</div>
        <q-btn color="primary" icon="add" class="shadow-3 q-my-sm" @click="addItemDialog = true" dense>
          <q-tooltip>{{ $t('dashboard.category.createText') }}</q-tooltip>
        </q-btn>
        <q-dialog v-model="addItemDialog" transition-show="slide-up" transition-hide="slide-down" persistent>
          <CreateItem @added="itemAdded" />
        </q-dialog>
      </template>

      <!-- Table -->
      <!-- ID -->
      <template #body-cell-id="props">
        <q-td :props="props">
          <div dense square>
            {{ props.rowIndex + 1 }}
          </div>
        </q-td>
      </template>

      <!-- Category Code -->
      <template #body-cell-category_code="props">
        <q-td :props="props">
          <div dense square>
            <div class="bg-blue-2 q-pa-sm" style="border-radius: 10px">
              <div class="text-blue-9 text-center">{{ props.row.category_code }}</div>
            </div>
          </div>
        </q-td>
      </template>

      <!-- Image -->
      <template #body-cell-image="props">
        <q-td :props="props">
          <div dense square>
            <q-img :src="url + '/public/categories/' + props.row.image" :ratio="4 / 3" style="border-radius: 10px" />
          </div>
        </q-td>
      </template>

      <!-- Description -->
      <template #body-cell-description="props">
        <q-td :props="props">
          <div dense square>
            {{ props.row.description && props.row.description.length > 20 ? props.row.description.substring(0, 20) + '...' : props.row.description }}
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
            <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" persistent>
              <EditItem @edited="itemEdited(props.row)" :item="props.row" />
            </q-dialog>
          </q-btn>
          <q-btn color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
        </q-td>
      </template>

      <!-- Grid -->
      <template v-slot:item="props">
        <div class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card class="q-pa-md">
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.id">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <!-- ID -->
                  <div v-if="col.name === 'id'" dense square>
                    {{ props.rowIndex + 1 }}
                  </div>

                  <!-- Category Code -->
                  <div v-else-if="col.name === 'category_code'">
                    <div class="bg-blue-2 q-pa-sm" style="border-radius: 10px">
                      <div class="text-blue-9 text-center">{{ props.row.category_code }}</div>
                    </div>
                  </div>

                  <!-- Image -->
                  <div v-else-if="col.name === 'image'">
                    <img :src="url + '/public/categories/' + props.row.image" width="80" :ratio="4 / 3" style="border-radius: 10px" />
                  </div>

                  <!-- Description -->
                  <div v-else-if="col.name === 'description'">
                    {{ props.row.description && props.row.description.length > 20 ? props.row.description.substring(0, 20) + '...' : props.row.description }}
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
                    <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
                      <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" persistent>
                        <EditItem @edited="itemEdited(props.row)" :item="props.row" />
                      </q-dialog>
                    </q-btn>
                    <q-btn color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
                  </div>

                  <!-- DLL -->
                  <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { useCategoryStore } from '/src/stores/category-store'
import CreateItem from './CreateCategory.vue'
import EditItem from './EditCategory.vue'

const $q = useQuasar()
const router = useRouter()
const { t } = useI18n()
const itemStore = useCategoryStore()

const items = ref([])
const getItem = async () => {
  try {
    const res = await itemStore.all()
    items.value = res.data.data

    if (res.data.status === 'failed') {
      router.push('/notfound')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getItem()
})

// Create
const addItemDialog = ref(false)
const itemAdded = () => {
  addItemDialog.value = false
  getItem()
}

// Edit
const itemEdited = (item) => {
  item.editItemDialog = false
  getItem()
}

// Delete
const deleteItemDialog = (row) => {
  $q.dialog({
    title: t('dashboard.deleteTitle'),
    message: t('dashboard.deleteMsg'),
    cancel: true,
    persistent: true,
    ok: {
      label: t('dashboard.yesDeleteText'),
      color: 'primary'
    },
    cancel: {
      label: t('dashboard.cancelDeleteText'),
      color: 'secondary'
    }
  }).onOk(() => {
    deleteItem(row)
  })
}
const deleteItem = async (row) => {
  try {
    await itemStore.delete(row.id)

    toast.success(t('dashboard.category.crud.successDeleteMsg'))
    getItem()
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.error(t('dashboard.category.crud.failedDeleteMsg'))
  }
}

// Table
const currencyData = items
const currencyColumns = [
  {
    name: 'id',
    field: 'id',
    label: 'ID'
  },
  {
    name: 'category_code',
    field: 'category_code',
    label: t('dashboard.category.categoryCodeColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'image',
    field: 'image',
    label: t('dashboard.category.imageColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'name',
    field: 'name',
    label: t('dashboard.category.nameColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'description',
    field: 'description',
    label: t('dashboard.category.descriptionColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'action',
    field: 'action',
    label: 'Action',
    align: 'center'
  }
]
const filter = ref('')
const grid = ref(false)
const pagination = ref({})
const setFs = (props) => {
  props.toggleFullscreen()
}
</script>
