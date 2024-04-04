<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-secondary' : 'bg-white'">
      <q-toolbar class="text-primary q-my-md">
        <q-toolbar-title style="font-size: 16px">
          <q-img src="src/assets/img/logo.png" class="q-pa-md q-mr-md" style="width: 30px" />
          <router-link to="/" class="nav__link q-mx-md text-dark text-bold">Beranda</router-link>
          <router-link to="/" class="nav__link q-mx-md text-dark text-bold">Jelajahi</router-link>
          <router-link to="/" class="nav__link q-mx-md text-dark text-bold">Buat</router-link>
        </q-toolbar-title>
        <div class="q-mx-lg">
          <input type="text" v-model="search" class="search-bar" placeholder="Search..." hint="Search" />
          <q-icon name="search" size="2em" style="margin-left: -38px" />
        </div>
        <div>
          <!-- Login -->
          <q-btn color="primary" text-color="white" label="Log in" class="q-mx-xs" @click="openLoginDialog" rounded />
          <q-dialog v-model="loginDialog">
            <LoginDialog @register="openRegister" />
          </q-dialog>

          <!-- Register -->
          <q-btn color="secondary" text-color="dark" label="Sign up" class="q-mx-xs" @click="openRegisterDialog" rounded />
          <q-dialog v-model="registerDialog">
            <RegisterDialog @login="openLogin" />
          </q-dialog>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import LoginDialog from 'src/components/auth/LoginDialog.vue'
import RegisterDialog from 'src/components/auth/RegisterDialog.vue'

// Login
const loginDialog = ref(false)
const openLoginDialog = () => {
  loginDialog.value = true
}
const openLogin = () => {
  registerDialog.value = false
  loginDialog.value = true
}

// Register
const registerDialog = ref(false)
const openRegisterDialog = () => {
  registerDialog.value = true
}
const openRegister = () => {
  loginDialog.value = false
  registerDialog.value = true
}

const search = ref()
</script>

<style scoped>
.nav__link {
  text-decoration: none;
}

/* Search Bar */
.search-bar {
  padding: 8px;
  padding-right: 40px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  width: 400px;
  height: 45px;
  background-color: #c0c0c04d;
  transition: all 0.3s;
}
.search-bar:focus {
  outline: none;
  transform: scale(1.02);
  border: 2px solid #00000080;
}
</style>
