import { defineStore } from 'pinia'
import { server } from '/src/boot/axios'

const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`
}

export const useLikeStore = defineStore('like', {
  state: () => ({
    id: null,
    user_id: null,
    photo_id: null,
    user: null,
    photo: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/like')
    },

    async dashboard() {
      return await server.get('api/dashboard/like', { headers })
    },

    async show(id) {
      return await server.get(`api/like/${id}`)
    },

    async create(data) {
      return await server.post('api/like', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/like/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/like/${data}`, { headers })
    },

    async like(id) {
      return await server.post(`api/like/photo/${id}`, { headers })
    },

    async unlike(id) {
      return await server.delete(`api/like/photo/${id}`, { headers })
    }
  },
  persist: true
})
