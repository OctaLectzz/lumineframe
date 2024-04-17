import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useAuthStore = defineStore('auth', {
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
    async profile() {
      try {
        return await server.get('api/auth/profile', { headers })
      } catch (error) {
        if (error) throw error
      }
    },

    async register(username, first_name, last_name, email, password, passwordconfirmation, avatar, about, pronouns, birthday, gender, phone, url, address) {
      try {
        return await server.post('api/auth/register', {
          username,
          first_name,
          last_name,
          email,
          password,
          passwordconfirmation,
          avatar,
          about,
          pronouns,
          birthday,
          gender,
          phone,
          url,
          address
        })
      } catch (error) {
        if (error) throw error
      }
    },

    async login(email, password) {
      try {
        return await server.post('api/auth/login', { email, password })
      } catch (error) {
        if (error) throw error
      }
    },

    async logout() {
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        window.location.reload()

        await server.get('api/auth/logout', { headers })
      } catch (error) {
        if (error) throw error
      }
    }
  }
})
