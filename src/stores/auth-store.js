import { defineStore } from 'pinia'
import { server } from '../boot/axios'

const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    role: null,
    gender: null,
    url: null,
    address: null
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

    async register(first_name, last_name, dob, gender, email, password, repassword) {
      try {
        return await server.post('api/auth/register', {
          first_name,
          last_name,
          dob,
          gender,
          email,
          password,
          repassword
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
