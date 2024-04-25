<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      bordered
      class="statement-table"
      title="User"
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
        <div class="text-h5 q-pr-lg">{{ $t('dashboard.user.userText') }}</div>
        <q-btn color="primary" icon="add" class="shadow-3 q-my-sm" @click="addItemDialog = true" dense>
          <q-tooltip>{{ $t('dashboard.user.createText') }}</q-tooltip>
        </q-btn>
        <q-dialog v-model="addItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
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

      <!-- User -->
      <template #body-cell-user="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.name }}</div>
            <div>{{ props.row.email }}</div>
          </div>
        </q-td>
      </template>

      <!-- Gender -->
      <template #body-cell-gender="props">
        <q-td :props="props">
          <div dense square>
            <div>{{ props.row.gender === 'man' ? $t('dashboard.user.manGenderText') : $t('dashboard.user.womanGenderText') }}</div>
          </div>
        </q-td>
      </template>

      <!-- URL -->
      <template #body-cell-url="props">
        <q-td :props="props">
          <div dense square>
            <a :href="props.row.url" target="_blank" rel="noopener noreferrer">{{ props.row.url }}</a>
          </div>
        </q-td>
      </template>

      <!-- Address -->
      <template #body-cell-address="props">
        <q-td :props="props">
          <div dense square>
            {{ props.row.address && props.row.address.length > 20 ? props.row.address.substring(0, 20) + '...' : props.row.address }}
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn dense round color="blue" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true">
            <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
              <EditItem @edited="itemEdited(props.row)" :item="props.row" />
            </q-dialog>
          </q-btn>
          <q-btn dense round color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" />
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
                    <div class="text-bold">{{ props.row.name }}</div>
                    <div>{{ props.row.email }}</div>
                  </div>

                  <!-- Gender -->
                  <div v-else-if="col.name === 'gender'">
                    <div>{{ props.row.gender === 'man' ? $t('dashboard.user.manGenderText') : $t('dashboard.user.womanGenderText') }}</div>
                  </div>

                  <!-- URL -->
                  <div v-else-if="col.name === 'url'">
                    <a :href="props.row.url" target="_blank" rel="noopener noreferrer">{{ props.row.url }}</a>
                  </div>

                  <!-- Address -->
                  <div v-else-if="col.name === 'address'">
                    {{ props.row.address && props.row.address.length > 20 ? props.row.address.substring(0, 20) + '...' : props.row.address }}
                  </div>

                  <!-- About -->
                  <div v-else-if="col.name === 'about'">
                    {{ props.row.about && props.row.about.length > 20 ? props.row.about.substring(0, 20) + '...' : props.row.about }}
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
                    <q-btn dense round color="blue" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true">
                      <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
                        <EditItem @edited="itemEdited(props.row)" :item="props.row" />
                      </q-dialog>
                    </q-btn>
                    <q-btn dense round color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" />
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
import { useUserStore } from '/src/stores/user-store'
import CreateItem from './CreateUser.vue'
import EditItem from './EditUser.vue'

const $q = useQuasar()
const router = useRouter()
const { t } = useI18n()
const itemStore = useUserStore()

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
      color: 'primary',
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

    toast.success(t('dashboard.user.successDeleteText'))
    getItem()
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.error(t('dashboard.user.failedDeleteText'))
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
    field: 'name',
    label: t('dashboard.user.userColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'role',
    field: 'role',
    label: t('dashboard.user.roleColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'pronouns',
    field: 'pronouns',
    label: t('dashboard.user.pronounsColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'birthday',
    field: 'birthday',
    label: t('dashboard.user.birthdayColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'gender',
    field: 'gender',
    label: t('dashboard.user.genderColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'phone',
    field: 'phone',
    label: t('dashboard.user.phoneColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'url',
    field: 'url',
    label: t('dashboard.user.urlColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'address',
    field: 'address',
    label: t('dashboard.user.addressColumn'),
    align: 'left',
    sortable: true
  },
  {
    name: 'about',
    field: 'about',
    label: t('dashboard.user.aboutColumn'),
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
