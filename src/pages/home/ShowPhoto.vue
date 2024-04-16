<template>
  <div class="row justify-center q-my-xl q-py-xl">
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <!-- Image -->
          <div class="col-xs-12 col-md-6">
            <q-img class="lumine-photo" :src="url + '/images/' + photo.image" @click="previewPhoto(photo)" />

            <!-- Preview -->
            <div v-if="photo.previewMode" @click="previewPhoto(photo)">
              <PreviewPhoto :item="photo" />
            </div>
          </div>

          <!-- Content -->
          <div class="col-xs-12 col-md-6">
            <div class="q-mx-md">
              <!-- Button -->
              <div class="q-my-md">
                <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" icon="download" size="15px" class="q-mr-sm" @click="downloadPhoto(photo)" flat round />
                <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" icon="more_horiz" size="15px" class="q-ml-sm" flat round>
                  <MenuPhoto :item="photo" />
                </q-btn>
                <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" :text-color="$q.dark.isActive ? 'primary' : 'secondary'" label="Save" class="float-right" push />
              </div>
              <div class="q-ml-md">
                <!-- Title -->
                <div class="text-h6 text-bold">{{ photo.title }}</div>

                <!-- Description -->
                <div class="text-subtitle2">{{ photo.description }}</div>

                <!-- User -->
                <div v-if="user.role != 'Admin'" class="cursor-pointer q-pa-md" @click="userPhoto(user.username)">
                  <q-avatar class="lumine-avatar float-left">
                    <img :src="url + '/avatars/' + user.avatar" />
                  </q-avatar>
                  <span class="q-mx-sm">
                    <span class="text-subtitle2 text-bold">{{ user.name }}</span>
                    <div class="q-ml-xl text-subtitle2 text-grey-8">{{ user.username }}</div>
                  </span>
                </div>

                <!-- Comment -->
                <div class="text-body1 text-bold">{{ $t('photo.commentTitle') }}</div>
                <q-scroll-area class="q-my-md" style="height: 200px">
                  <div v-if="photo.comments && photo.comments.length == 0" class="q-py-sm">
                    <p class="text-center text-grey-6 text-bold">No comments yet! Add one to start the conversation.</p>
                  </div>
                  <div v-else v-for="comment in photo.comments" :key="comment.id" class="q-py-sm">
                    <div class="row">
                      <!-- Avatar -->
                      <div class="col-md-1 col-sm-1 col-xs-2">
                        <q-avatar size="25px" class="float-left q-pt-xs">
                          <img :src="url + '/avatars/' + comment.avatar" />
                        </q-avatar>
                      </div>

                      <!-- Content -->
                      <div class="col-md-11 col-sm-11 col-xs-10">
                        <div class="comment-content">
                          <span class="text-subtitle1 text-bold q-mr-xs">{{ comment.name }}</span>
                          <span class="text-subtitle2">{{ comment.content }}</span>
                        </div>
                        <div>
                          <span class="text-grey-7" style="font-size: 11px">{{ comment.created_at }}</span>
                          <q-btn color="grey-7" icon="more_horiz" size="xs" class="q-mx-sm" flat round>
                            <q-menu transition-show="jump-down" transition-hide="jump-up">
                              <q-list dense>
                                <q-item clickable v-close-popup>
                                  <q-item-section>{{ $t('photo.editComment') }}</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                  <q-item-section>{{ $t('photo.deleteComment') }}</q-item-section>
                                </q-item>
                              </q-list>
                            </q-menu>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-scroll-area>

                <!-- Comment Form -->
                <q-form @submit="createComment">
                  <div class="row">
                    <div class="col-10">
                      <q-input
                        v-model="data.content"
                        type="textarea"
                        :color="$q.dark.isActive ? 'secondary' : 'primary'"
                        :label="$t('photo.commentForm')"
                        :rows="2"
                        :rules="[(v) => v.length <= 255 || $t('photo.commentRules')]"
                        outlined
                        dense
                      />
                    </div>
                    <div class="col-2">
                      <q-btn type="submit" :color="$q.dark.isActive ? 'secondary' : 'primary'" icon="send" :loading="commentLoading" :disable="disabledButton" class="full-height" flat>
                        <template v-slot:loading>
                          <q-spinner-hourglass class="on-center" />
                        </template>
                      </q-btn>
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <div class="text-h4 text-bold text-center">More to explore</div>
  <IndexPage />
</template>

<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { usePhotoStore } from '/src/stores/photo-store'
import { useCommentStore } from '/src/stores/comment-store'
import PreviewPhoto from '/src/components/PreviewPhoto.vue'
import MenuPhoto from '/src/components/MenuPhoto.vue'
import IndexPage from '/src/pages/home/IndexPage.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const photoStore = usePhotoStore()
const photo = ref('')
const user = ref('')
const loading = ref(false)

// Show Photo
const showPhoto = async (photonumber) => {
  loading.value = true
  try {
    const res = await photoStore.show(photonumber)
    photo.value = res.data.data
    user.value = res.data.data.user
    data.value.photo_id = photo.value.id
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  showPhoto(route.params.photo_number)
})
watchEffect(() => {
  showPhoto(route.params.photo_number)
})

// Preview Photo
const previewPhoto = (photo) => {
  photo.previewMode = !photo.previewMode
}

// Download Photo
const downloadPhoto = async (data) => {
  try {
    await photoStore.download(data)

    toast.success(t('photo.successDownloadMsg'))
  } catch (error) {
    console.error('Error downloading image:', error)
    toast.error(t('photo.failedDownloadMsg'))
  }
}

// Redirect to User Photo
const userPhoto = (username) => {
  router.push({ name: 'indexprofile', params: { username: username } })
}

// Comment
const commentStore = useCommentStore()
const commentLoading = ref(false)
const data = ref({
  photo_id: null,
  content: ''
})
const disabledButton = computed(() => {
  return commentLoading.value || !data.value.content
})
const createComment = async () => {
  commentLoading.value = true
  try {
    await commentStore.create(data.value)

    data.value.content = ''
    toast.success(t('photo.successCommentMsg'))
    showPhoto(route.params.photo_number)
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error(t('photo.errorCommentMsg'))
  }
  commentLoading.value = false
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 95%;
  border-radius: 20px;
}

.lumine-photo {
  cursor: zoom-in;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}
.lumine-photo:hover {
  filter: brightness(70%);
  transform: scale(1.02);
}

.lumine-avatar {
  width: 40px;
  height: 40px;
}

@media screen and (max-width: 691px) {
  .lumine-avatar {
    width: 40px;
    height: 40px;
  }

  .comment-content span {
    font-size: 12px;
  }
}
</style>
