<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      bordered
      class="statement-table"
      title="Collection"
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

      <!-- Collection Code -->
      <template #body-cell-collection_code="props">
        <q-td :props="props">
          <div dense square>
            <div class="bg-blue-2 q-pa-sm" style="border-radius: 10px">
              <div class="text-blue-9 text-center">{{ props.row.collection_code }}</div>
            </div>
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

      <!-- Photos -->
      <template #body-cell-photos="props">
        <q-td :props="props">
          <div dense square>
            <div v-if="props.row.photos && props.row.photos.length > 0">
              <div class="row">
                <template v-for="photo in props.row.photos.slice(0, 4)" :key="photo.id">
                  <div class="col-2">
                    <img v-if="photo.image" :src="url + '/public/images/' + photo.image" class="collection-image" />
                    <img v-else src="/src/assets/img/no_image_available.jpg" class="collection-image" />
                  </div>
                </template>
                <template v-if="props.row.photos.length < 4">
                  <div v-for="n in 4 - props.row.photos.length" :key="n" class="col-2">
                    <img src="/src/assets/img/no_image_available.jpg" class="collection-image" />
                  </div>
                </template>
              </div>
            </div>
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
          <q-btn color="blue" field="show" icon="visibility" class="q-mx-xs" @click="props.row.showItemDialog = true" dense round>
            <q-dialog v-model="props.row.showItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
              <ShowItem :item="props.row" />
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

                  <!-- Collection Code -->
                  <div v-else-if="col.name === 'collection_code'">
                    <div class="bg-blue-2 q-pa-sm" style="border-radius: 10px">
                      <div class="text-blue-9 text-center">{{ props.row.collection_code }}</div>
                    </div>
                  </div>

                  <!-- User -->
                  <div v-else-if="col.name === 'user'" dense square>
                    <div class="text-bold">{{ props.row.user.name }}</div>
                    <div>{{ props.row.user.email }}</div>
                  </div>

                  <!-- Photos -->
                  <div v-else-if="col.name === 'photos'">
                    <div v-if="props.row.photos && props.row.photos.length > 0">
                      <div class="row">
                        <template v-for="photo in props.row.photos.slice(0, 4)" :key="photo.id">
                          <div class="col-2">
                            <img v-if="photo.image" :src="url + '/public/images/' + photo.image" class="collection-image" />
                            <img v-else src="/src/assets/img/no_image_available.jpg" class="collection-image" />
                          </div>
                        </template>
                        <template v-if="props.row.photos.length < 4">
                          <div v-for="n in 4 - props.row.photos.length" :key="n" class="col-2">
                            <img src="/src/assets/img/no_image_available.jpg" class="collection-image" />
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <div v-else-if="col.name === 'description'">
                    {{ props.row.description && props.row.description.length > 20 ? props.row.description.substring(0, 20) + '...' : props.row.description }}
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
                    <q-btn color="blue" field="show" icon="visibility" class="q-mx-xs" @click="props.row.showItemDialog = true" dense round>
                      <q-dialog v-model="props.row.showItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
                        <ShowItem :item="props.row" />
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
import { useCollectionStore } from '/src/stores/collection-store'
import ShowItem from './ShowCollection.vue'

const $q = useQuasar()
const router = useRouter()
const { t } = useI18n()
const itemStore = useCollectionStore()

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

    toast.success(t('dashboard.collection.crud.successDeleteMsg'))
    getItem()
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.error(t('dashboard.collection.crud.failedDeleteMsg'))
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
    name: 'collection_code',
    field: 'collection_code',
    label: t('dashboard.collection.collectionCodeColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'user',
    field: 'user',
    label: t('dashboard.collection.userColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'photos',
    field: 'photos',
    label: t('dashboard.collection.photosColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'name',
    field: 'name',
    label: t('dashboard.collection.nameColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'description',
    field: 'description',
    label: t('dashboard.collection.descriptionColumn'),
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

<style scoped>
.collection-image {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  box-shadow: -2px 2px 3px #000;
}
.collection-notfoundimage {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  box-shadow: -2px 2px 3px #000;
}
</style>
