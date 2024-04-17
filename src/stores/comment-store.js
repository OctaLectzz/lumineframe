import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    id: null,
    name: null,
    description: null,
    photos: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/comment')
    },

    async dashboard() {
      return await server.get('api/dashboard/comment', { headers })
    },

    async show(id) {
      return await server.get(`api/comment/${id}`)
    },

    async create(data) {
      return await server.post('api/comment', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/comment/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/comment/${data}`, { headers })
    }
  },
  persist: true
})
