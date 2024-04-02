import { defineStore } from 'pinia'
import { server } from 'src/boot/axios'

const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`
}

export const useCollectionphotoStore = defineStore('collectionphoto', {
  state: () => ({
    id: null,
    user_id: null,
    photo_id: null,
    collection_id: null,
    user: null,
    photo: null,
    collection: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/collectionphoto')
    },

    async dashboard() {
      return await server.get('api/dashboard/collectionphoto', { headers })
    },

    async show(id) {
      return await server.get(`api/collectionphoto/${id}`)
    },

    async create(data) {
      return await server.post('api/collectionphoto', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/collectionphoto/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/collectionphoto/${data}`, { headers })
    }
  },
  persist: true
})
