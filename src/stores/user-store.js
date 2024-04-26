import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    avatar: null,
    username: null,
    first_name: null,
    last_name: null,
    name: null,
    email: null,
    password: null,
    passwordconfirmation: null,
    role: null,
    about: null,
    pronouns: null,
    birthday: null,
    gender: null,
    phone: null,
    url: null,
    address: null,
    status: null,
    photos: null,
    likes: null
  }),
  getters: {},
  actions: {
    async all() {
      return await server.get('api/user', { headers })
    },

    async show(username) {
      return await server.get(`api/user/${username}`, { headers })
    },

    async create(data) {
      return await server.post('api/user', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/user/${data.id}`, data, { headers })
    },

    async editavatar(data) {
      const formData = new FormData()
      formData.append('id', data.id)
      formData.append('username', data.username)
      formData.append('avatar', data.avatar)

      return await server.post(`api/user/avatar/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/user/${data}`, { headers })
    }
  },
  persist: true
})
