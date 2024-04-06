import { defineStore } from 'pinia'
import { server } from 'src/boot/axios'

const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'multipart/form-data'
}

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    id: null,
    photo_number: null,
    user_id: null,
    category_id: null,
    user: null,
    image: null,
    title: null,
    description: null,
    category: null,
    tags: null,
    likes: null,
    collections: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/photo')
    },

    async dashboard() {
      return await server.get('api/dashboard/photo', { headers })
    },

    async show(photo_number) {
      return await server.get(`api/photo/${photo_number}`)
    },

    async create(data) {
      return await server.post('api/photo', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/photo/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/photo/${data}`, { headers })
    }
  },
  persist: true
})
