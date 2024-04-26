<template>
  <div>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center q-py-sm">
        <div class="text-h6">{{ $t('dashboard.photo.showText') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll" style="max-height: 70vh">
        <div class="row justify-center">
          <q-card class="my-card">
            <!-- Loading -->
            <q-card-section v-if="loading">
              <div class="row">
                <!-- Image -->
                <div class="col-xs-12 col-md-6">
                  <q-skeleton height="100%" square />
                </div>

                <!-- Content -->
                <div class="col-xs-12 col-md-6">
                  <div class="q-mx-md">
                    <!-- Button -->
                    <div class="q-my-md">
                      <!-- Download -->
                      <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" icon="download" size="15px" class="q-mr-sm" @click="downloadPhoto(photo)" flat round />

                      <!-- More -->
                      <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" icon="more_horiz" size="15px" class="q-ml-sm" flat round>
                        <MenuPhoto :item="photo" />
                      </q-btn>

                      <!-- Collection -->
                      <q-btn :color="$q.dark.isActive ? 'secondary' : 'primary'" :text-color="$q.dark.isActive ? 'primary' : 'secondary'" label="Save" class="float-right" push />
                    </div>
                    <div class="q-ml-md">
                      <!-- Title -->
                      <q-skeleton width="250px" class="q-my-sm" />

                      <!-- Description -->
                      <q-skeleton width="100%" height="15px" class="q-my-sm" />
                      <q-skeleton width="100%" height="15px" class="q-my-sm" />

                      <!-- User -->
                      <div v-if="user.role != 'Admin'" class="cursor-pointer q-pa-md" @click="userPhoto(user.username)">
                        <q-avatar class="lumine-avatar float-left">
                          <q-skeleton type="QAvatar" />
                        </q-avatar>
                        <span class="q-mx-sm">
                          <span class="text-subtitle2 text-bold">{{ user.name }}</span>
                          <div class="q-ml-xl text-subtitle2 text-grey-8">{{ user.username }}</div>
                        </span>
                      </div>

                      <!-- Comment -->
                      <div class="text-body1 text-bold">{{ $t('photo.commentTitle') }}</div>
                      <q-scroll-area class="q-my-md" style="height: 200px">
                        <div v-for="index in 4" :key="index" class="q-py-sm">
                          <div class="row">
                            <!-- Avatar -->
                            <div class="col-md-1 col-sm-1 col-xs-2">
                              <q-avatar size="25px" class="float-left q-pt-xs">
                                <q-skeleton type="QAvatar" />
                              </q-avatar>
                            </div>

                            <!-- Content -->
                            <div class="col-md-11 col-sm-11 col-xs-10">
                              <div class="comment-content">
                                <q-skeleton width="150px" height="15px" class="q-my-sm" />
                                <q-skeleton width="200px" height="15px" class="q-my-sm" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-scroll-area>

                      <!-- Comment Form -->
                      <div v-if="token">
                        <q-form @submit="createComment">
                          <div class="row justify-center">
                            <div class="col-10">
                              <q-input v-model="data.content" type="textarea" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('photo.commentForm')" :rows="2" outlined dense />
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
                      <div v-else>
                        <q-banner dense inline-actions class="text-white text-center bg-red">
                          {{ $t('photo.commentNotAuth') }}
                        </q-banner>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-section v-else>
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
                      <q-btn
                        :color="$q.dark.isActive ? 'secondary' : 'primary'"
                        :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
                        label="Save"
                        class="float-right"
                        @click="openCollection(photo)"
                        push
                      />
                      <!-- Collection -->
                      <q-dialog v-model="photo.collectionDialog" position="bottom">
                        <CollectionDialog :item="photo" />
                      </q-dialog>
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

                      <!-- Like -->
                      <div class="float-right">
                        <span class="text-bold">{{ likes }}</span>
                        <q-btn
                          :color="$q.dark.isActive ? 'secondary' : 'primary'"
                          :text-color="liked ? 'red' : ''"
                          size="15px"
                          :icon="liked ? 'favorite' : 'favorite_border'"
                          class="q-mr-xs"
                          @click="likePhoto(photo)"
                          round
                          dense
                          flat
                        />
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
                                <img :src="url + '/avatars/' + comment.user.avatar" />
                              </q-avatar>
                            </div>

                            <!-- Content -->
                            <div class="col-md-11 col-sm-11 col-xs-10">
                              <div class="comment-content">
                                <span class="text-subtitle1 text-bold q-mr-xs cursor-pointer" @click="userPhoto(user.username)">{{ comment.user.name }}</span>
                                <span class="text-subtitle2">{{ comment.content }}</span>
                              </div>
                              <div>
                                <span class="text-grey-7" style="font-size: 11px">{{ comment.created_at }}</span>
                                <q-btn v-if="profile.username === comment.user.username" color="grey-7" icon="more_horiz" size="xs" class="q-mx-sm" flat round>
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
                      <div v-if="token">
                        <q-form @submit="createComment">
                          <div class="row justify-center">
                            <div class="col-10">
                              <q-input v-model="data.content" type="textarea" :color="$q.dark.isActive ? 'secondary' : 'primary'" :label="$t('photo.commentForm')" :rows="2" outlined dense />
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
                      <div v-else>
                        <q-banner dense inline-actions class="text-white text-center bg-red">
                          {{ $t('photo.commentNotAuth') }}
                        </q-banner>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="text-primary">
        <q-btn :label="$t('public.cancelText')" :color="$q.dark.isActive ? 'secondary' : 'primary'" flat v-close-popup />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url, token } from '/src/boot/axios'
import { useAuthStore } from '/src/stores/auth-store'
import { usePhotoStore } from '/src/stores/photo-store'
import { useLikeStore } from '/src/stores/like-store'
import { useCommentStore } from '/src/stores/comment-store'
import PreviewPhoto from '/src/components/PreviewPhoto.vue'
import MenuPhoto from '/src/components/MenuPhoto.vue'
import CollectionDialog from '/src/components/CollectionDialog.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { item } = defineProps(['item'])
const authStore = useAuthStore()
const photoStore = usePhotoStore()
const loading = ref(true)

// Profile
const profile = ref({})
const getProfile = async () => {
  try {
    const res = await authStore.profile()

    profile.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Show Photo
const photo = ref({})
const user = ref({})
const likes = ref(0)
const liked = ref(false)
const saved = ref(false)
const showPhoto = () => {
  try {
    photo.value = item
    user.value = item.user
    likes.value = item.likes.length
    if (profile.value && profile.value.likes && profile.value.collectionphoto) {
      liked.value = profile.value.likes.some((userlike) => userlike.photo_id === photo.value.id)
      saved.value = profile.value.collectionphoto.some((usersave) => usersave.photo_id === photo.value.id)
    }
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(async () => {
  if (token) {
    await getProfile()
  }
  showPhoto()
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

// Save Photo
const openCollection = (photo) => {
  photo.collectionDialog = true
}

// Like Photo
const likeStore = useLikeStore()
const likePhoto = async (photo) => {
  if (liked.value) {
    try {
      liked.value = false
      likes.value -= 1

      await likeStore.dislike(photo.id)

      toast.success(t('photo.successDislikeMsg'))
    } catch (error) {
      toast.error(t('photo.failedDislikeMsg'))
      console.error(error)
    }
  } else {
    try {
      liked.value = true
      likes.value += 1

      await likeStore.like(photo.id)

      toast.success(t('photo.successLikeMsg'))
    } catch (error) {
      console.error(error)
      toast.error(t('photo.failedLikeMsg'))
    }
  }
  getProfile()
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
  if (data.value.content.length <= 255) {
    commentLoading.value = true
    try {
      data.value.photo_id = photo.value.id

      await commentStore.create(data.value)

      data.value.content = ''
      toast.success(t('photo.successCommentMsg'))
      showPhoto(route.params.photo_number)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(t('photo.errorCommentMsg'))
    }
    commentLoading.value = false
  } else {
    toast.error(t('photo.commentRules'))
  }
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
