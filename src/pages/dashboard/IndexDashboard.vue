<template>
  <q-page class="q-pa-sm">
    <!-- Card -->
    <q-card class="bg-transparent no-shadow no-border" bordered>
      <q-card-section class="q-pa-none">
        <div v-if="loading" class="row q-col-gutter-sm">
          <div v-for="n in 4" :key="n" class="col-md-3 col-sm-12 col-xs-12">
            <q-skeleton width="100%" height="75px" />
          </div>
        </div>
        <div v-else class="row q-col-gutter-sm">
          <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
            <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
              <q-item-section class="q-pa-md q-ml-none text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
                <q-item-label>{{ item.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Charts -->
    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="stacked_line_chart" size="44px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6">{{ $t('dashboard.home.statisticsText') }}</div>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-section v-if="chartLoading" class="row">
        <div class="col-12">
          <q-skeleton width="100%" height="300px" />
        </div>
      </q-card-section>
      <q-card-section v-else class="row">
        <div class="col-12">
          <ECharts :option="photos_count" class="q-mt-md" :resizable="true" autoresize style="height: 250px" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Reports -->
    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="flag" size="44px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <div class="text-h6">{{ $t('dashboard.home.reportText') }}</div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-pa-none q-ma-none"></q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ECharts from 'vue-echarts'
import * as echarts from 'echarts'
import { usePhotoStore } from '/src/stores/photo-store'
import { useUserStore } from '/src/stores/user-store'
import { useCategoryStore } from '/src/stores/category-store'
import { useTagStore } from '/src/stores/tag-store'

const route = useRoute()
const { t } = useI18n()

// Photo
const photoStore = usePhotoStore()
const photos = ref([])
const loading = ref(true)
const getPhoto = async () => {
  try {
    const res = await photoStore.all()

    photos.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Chart
const chart = ref({})
const chartLoading = ref(true)
const getChart = async () => {
  chartLoading.value = true
  try {
    const res = await photoStore.chart()

    chart.value = res.data
    photos_count.series[0].data = [
      chart.value.Jan,
      chart.value.Feb,
      chart.value.Mar,
      chart.value.Apr,
      chart.value.May,
      chart.value.Jun,
      chart.value.Jul,
      chart.value.Aug,
      chart.value.Sep,
      chart.value.Oct,
      chart.value.Nov,
      chart.value.Dec
    ]
    chartLoading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// User
const userStore = useUserStore()
const users = ref([])
const getUser = async () => {
  try {
    const res = await userStore.all()

    users.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Category
const categoryStore = useCategoryStore()
const categories = ref([])
const getCategory = async () => {
  try {
    const res = await categoryStore.all()

    categories.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Tag
const tagStore = useTagStore()
const tags = ref([])
const getTag = async () => {
  try {
    const res = await tagStore.all()

    tags.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  getPhoto()
  getChart()
  getUser()
  getCategory()
  getTag()
})

// Card
const items = ref([
  {
    title: t('dashboard.home.totalUsers'),
    icon: 'account_circle',
    value: users.value.length,
    color1: '#546bfa',
    color2: '#3e51b5'
  },
  {
    title: t('dashboard.home.totalPhotos'),
    icon: 'photo',
    value: photos.value.length,
    color1: '#3a9688',
    color2: '#3e51b5'
  },
  {
    title: t('dashboard.home.totalCategories'),
    icon: 'person',
    value: categories.value.length,
    color1: '#7cb342',
    color2: '#3e51b5'
  },
  {
    title: t('dashboard.home.totalTags'),
    icon: tags.value.length,
    value: '82',
    color1: '#f88c2b',
    color2: '#3e51b5'
  }
])
watchEffect(() => {
  items.value[0].value = users.value.length
  items.value[1].value = photos.value.length
  items.value[2].value = categories.value.length
  items.value[3].value = tags.value.length
})

// Charts
let photos_count = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '2%',
    right: '2%',
    top: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: t('dashboard.home.totalPhotos'),
      type: 'bar',
      data: [
        chart.value.Jan,
        chart.value.Feb,
        chart.value.Mar,
        chart.value.Apr,
        chart.value.May,
        chart.value.Jun,
        chart.value.Jul,
        chart.value.Aug,
        chart.value.Sep,
        chart.value.Oct,
        chart.value.Nov,
        chart.value.Dec
      ],
      color: '#3a9688'
    }
  ]
}
watchEffect(() => {
  if (route.name == 'dashboardhome') {
    getChart()
  }
})
</script>

<style scoped></style>
