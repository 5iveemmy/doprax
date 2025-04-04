import { defineStore } from 'pinia'

interface ServiceTypeData {
  serviceName: string
  description: string
  region: string
  coverImage: any
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
    deploymentResult: null as any
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

        const response = await fetch('https://reqres.in/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error('Failed to deploy service')
        }

        this.deploymentResult = await response.json()
        this.isComplete = true
      } catch (error) {
        console.error('Deployment failed:', error)
        this.deploymentResult = { error: 'Deployment failed' }
      } finally {
        this.isSubmitting = false
      }
    },

    resetForm() {
      this.serviceTypeData = {
        serviceName: '',
        description: '',
        region: '',
        coverImage: null
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
