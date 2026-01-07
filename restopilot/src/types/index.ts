export interface User {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'manager' | 'viewer'
}

export interface Restaurant {
  id: string
  name: string
  owner_id?: string
  address?: string
  phone?: string
  created_at?: string
  updated_at?: string
}

export interface ManagementAccountEntry {
  id: string
  category: string
  amount: number
  percentage: number
}
