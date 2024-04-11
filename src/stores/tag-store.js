import { defineStore } from 'pinia'
import { server } from '/src/boot/axios'

const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`
}

export const useTagStore = defineStore('tag', {
  state: () => ({
    id: null,
    name: null,
    description: null,
    photos: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/tag')
    },

    async dashboard() {
      return await server.get('api/dashboard/tag', { headers })
    },

    async show(id) {
      return await server.get(`api/tag/${id}`)
    },

    async create(data) {
      return await server.post('api/tag', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/tag/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/tag/${data}`, { headers })
    }
  },
  persist: true
})
