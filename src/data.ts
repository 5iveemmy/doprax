export const regions: Option[] = [
  { id: 'us-east-1', name: 'US East (N. Virginia)' },
  { id: 'us-west-2', name: 'US West (Oregon)' },
  { id: 'eu-west-1', name: 'EU (Ireland)' }
]

export const securityGroupOptions: Option[] = [
  { id: 'web', name: 'Web Traffic (80, 443)' },
  { id: 'ssh', name: 'SSH Access (22)' },
  { id: 'database', name: 'Database (3306, 5432)' },
  { id: 'internal', name: 'Internal Only' }
]

export const vpcOptions: Option[] = [
  { id: 'vpc-123456', name: 'Default VPC (vpc-123456)' },
  { id: 'vpc-789012', name: 'Production VPC (vpc-789012)' },
  { id: 'vpc-345678', name: 'Development VPC (vpc-345678)' }
]

export const subnetOptions: Option[] = [
  { id: 'subnet-123456', name: 'Public Subnet (subnet-123456)' },
  { id: 'subnet-789012', name: 'Private Subnet (subnet-789012)' },
  { id: 'subnet-345678', name: 'Database Subnet (subnet-345678)' }
]

export const instanceTypes: InstanceTypes[] = [
  {
    id: 'standard',
    title: 'Standard (General Purpose)',
    subtitle: 'Balanced compute, memory'
  },
  {
    id: 'compute',
    title: 'Compute Optimized',
    subtitle: 'High performance processors'
  },
  {
    id: 'memory',
    title: 'Memory Optimized',
    subtitle: 'Fast performance for memory-intensive workloads'
  },
  {
    id: 'storage',
    title: 'Storage Optimized',
    subtitle: 'Fast performance for memory-intensive workloads'
  }
]
