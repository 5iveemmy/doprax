import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Configuration from '../views/Configuration.vue'
import Success from '../views/Success.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Configuration',
        component: Configuration
      },
      {
        path: 'success',
        name: 'Success',
        component: Success
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
