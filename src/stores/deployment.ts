import axios from 'axios'
import { defineStore } from 'pinia'

interface ServiceTypeData {
  serviceName: string
  description: string
  region: string
}

interface Resources {
  vCPU: string
  memory: string
  storage: string
}

interface Network {
  vpc: string
  subnet: string
  publicIp: boolean
}

interface DeploymentResult {
  id: string
  service: ServiceTypeData
  instanceType: string
  resources: Resources
  network: Network
  securityGroups: string[]
  createdAt?: string
  updatedAt?: string
}

type SecurityGroups = string[]
type InstanceType = string

export const useDeploymentStore = defineStore('deployment', {
  state: () => ({
    serviceTypeData: {
      serviceName: '',
      description: '',
      region: '',
      coverImage: null
    } as ServiceTypeData,
    instanceType: '' as InstanceType,
    resources: {
      vCPU: '',
      memory: '',
      storage: ''
    } as Resources,
    network: {
      vpc: '',
      subnet: '',
      publicIp: false
    } as Network,
    securityGroups: [] as SecurityGroups,
    isSubmitting: false,
    isComplete: false,
    deploymentResult: null as DeploymentResult | null
  }),

  actions: {
    setServiceTypeData(data: ServiceTypeData) {
      this.serviceTypeData = data
    },

    setInstanceType(data: InstanceType) {
      this.instanceType = data
    },

    setResources(config: Resources) {
      this.resources = config
    },

    setNetwork(data: Network) {
      this.network = data
    },

    setSecurityGroups(data: SecurityGroups) {
      this.securityGroups = data
    },

    async submitDeployment() {
      this.isSubmitting = true

      try {
        const payload = {
          service: this.serviceTypeData,
          instanceType: this.instanceType,
          resources: this.resources,
          network: this.network,
          securityGroups: this.securityGroups
        }

        const response = await axios.post('https://reqres.in/api/users', payload)
        this.deploymentResult = response.data
        this.isComplete = true
        return response.data
      } catch (error) {
        console.error('Deployment failed:', error)

        throw error
      } finally {
        this.isSubmitting = false
      }
    },

    async updateService(serviceId: string) {
      this.isSubmitting = true

      try {
        const payload = {
          service: this.serviceTypeData,
          instanceType: this.instanceType,
          resources: this.resources,
          network: this.network,
          securityGroups: this.securityGroups
        }

        const response = await axios.put(`https://reqres.in/api/users/${serviceId}`, payload)
        this.deploymentResult = response.data
        this.isComplete = true
        return response.data
      } catch (error) {
        console.error('Update failed:', error)

        throw error
      } finally {
        this.isSubmitting = false
      }
    },

    async deleteService(serviceId: string) {
      this.isSubmitting = true
      try {
        const response = await axios.delete(`https://reqres.in/api/users/${serviceId}`)

        if (this.deploymentResult?.id === serviceId) {
          this.resetForm()
        }
        return response.data
      } catch (error) {
        console.error('Delete failed:', error)
        throw error
      } finally {
        this.isSubmitting = false
      }
    },

    resetForm() {
      this.serviceTypeData = {
        serviceName: '',
        description: '',
        region: ''
      }
      this.resources = {
        vCPU: '',
        memory: '',
        storage: ''
      }
      this.network = {
        vpc: '',
        subnet: '',
        publicIp: false
      }
      this.instanceType = ''
      this.securityGroups = []
      this.isSubmitting = false
      this.isComplete = false
      this.deploymentResult = null
    }
  }
})
