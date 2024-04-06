import { createApp } from 'vue'
import Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default async ({ app }) => {
  const options = {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT
  }

  app.use(Toastify, options)
}
