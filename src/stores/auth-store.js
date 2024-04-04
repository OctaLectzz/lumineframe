import { defineStore } from 'pinia'
import { server } from 'src/boot/axios'

const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`
}

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

    async register(username, first_name, last_name, email, password, passwordconfirmation, avatar, birthday, gender, phone, url, address) {
      try {
        return await server.post('api/auth/register', {
          username,
          first_name,
          last_name,
          email,
          password,
          passwordconfirmation,
          avatar,
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
        await server.get('api/auth/logout', { headers })

        localStorage.removeItem('token')
        localStorage.removeItem('role')
      } catch (error) {
        if (error) throw error
      }
    }
  }
})
