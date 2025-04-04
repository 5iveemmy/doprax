import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Configuration from '../views/Configuration.vue'
import Success from '../views/Success.vue'
import CloudServices from '../views/CloudServices.vue'
import EditService from '../views/EditService.vue'

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
      },
      {
        path: 'cloud-services',
        name: 'CloudServices',
        component: CloudServices
      },
      {
        path: 'edit-service',
        name: 'EditService',
        component: EditService
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
