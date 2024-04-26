<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      bordered
      class="statement-table"
      title="Comment"
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

      <!-- Table -->
      <!-- ID -->
      <template #body-cell-id="props">
        <q-td :props="props">
          <div dense square>
            {{ props.rowIndex + 1 }}
          </div>
        </q-td>
      </template>

      <!-- User -->
      <template #body-cell-user="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.user.name }}</div>
            <div>{{ props.row.user.email }}</div>
          </div>
        </q-td>
      </template>

      <!-- Photo -->
      <template #body-cell-photo="props">
        <q-td :props="props">
          <div dense square>
            <q-img :src="url + '/images/' + props.row.photo" :ratio="4 / 3" style="border-radius: 10px" />
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
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

                  <!-- User -->
                  <div v-else-if="col.name === 'user'" dense square>
                    <div class="text-bold">{{ props.row.user.name }}</div>
                    <div>{{ props.row.user.email }}</div>
                  </div>

                  <!-- Image -->
                  <div v-else-if="col.name === 'image'">
                    <q-img :src="url + '/images/' + props.row.photo" :ratio="4 / 3" style="border-radius: 10px" />
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
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
import { useCommentStore } from '/src/stores/comment-store'

const $q = useQuasar()
const router = useRouter()
const { t } = useI18n()
const itemStore = useCommentStore()

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

    toast.success(t('dashboard.comment.crud.successDeleteMsg'))
    getItem()
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.error(t('dashboard.comment.crud.failedDeleteMsg'))
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
    name: 'user',
    field: 'user',
    label: t('dashboard.comment.userColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'photo',
    field: 'photo',
    label: t('dashboard.comment.photoColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'content',
    field: 'content',
    label: t('dashboard.comment.contentColumn'),
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
