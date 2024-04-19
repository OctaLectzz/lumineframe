import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    id: null,
    collection_code: null,
    user_id: null,
    user: null,
    name: null,
    description: null,
    photos: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/collection')
    },

    async dashboard() {
      return await server.get('api/dashboard/collection', { headers })
    },

    async show(id) {
      return await server.get(`api/collection/${id}`)
    },

    async create(data) {
      return await server.post('api/collection', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/collection/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/collection/${data}`, { headers })
    }
  },
  persist: true
})
