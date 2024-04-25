import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    id: null,
    name: null,
    description: null,
    photos: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/category')
    },

    async dashboard() {
      return await server.get('api/dashboard/category', { headers })
    },

    async show(id) {
      return await server.get(`api/category/${id}`)
    },

    async create(data) {
      return await server.post('api/category', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.put(`api/category/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/category/${data}`, { headers })
    }
  },
  persist: true
})
