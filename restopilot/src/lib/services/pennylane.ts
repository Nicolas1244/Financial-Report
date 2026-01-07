import axios, { type AxiosInstance } from 'axios'

export interface PennylaneInvoice {
  id: string
  invoice_number?: string
  date?: string
  amount?: number
  currency?: string
}

export interface PennylaneOrganization {
  id: string
  name: string
}

class PennylaneService {
  private client: AxiosInstance

  constructor() {
    const useProxy = String(import.meta.env.VITE_PENNYLANE_USE_PROXY || '').toLowerCase() === 'true'
    const baseURL = useProxy
      ? '/pennylane'
      : (import.meta.env.VITE_PENNYLANE_API_URL || 'https://app.pennylane.com/api/external/v1')
    const apiKey = import.meta.env.VITE_PENNYLANE_API_KEY

    this.client = axios.create({
      baseURL,
      headers: useProxy
        ? { 'Content-Type': 'application/json' }
        : { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    })
  }

  // Simple call to verify credentials are valid (try multiple endpoints with fallback)
  async testConnection(): Promise<{ ok: boolean; error?: string }> {
    const endpoints = [
      { path: '/invoices', name: 'invoices' },
      { path: '/customers', name: 'customers' },
      { path: '/customer_invoices', name: 'customer_invoices' },
      { path: '/supplier_invoices', name: 'supplier_invoices' }
    ]

    const errors: string[] = []
    
    for (const ep of endpoints) {
      try {
        console.log(`[Pennylane] Tentative ${ep.name} sur ${this.client.defaults.baseURL}${ep.path}`)
        const response = await this.client.get(ep.path, { params: { per_page: 1 } })
        if (response.status >= 200 && response.status < 300) {
          console.log(`[Pennylane] ✅ Connexion réussie via ${ep.name}`)
          return { ok: true }
        }
      } catch (e: any) {
        const errorMsg = e.response?.data?.message || e.message || 'Unknown error'
        console.warn(`[Pennylane] ❌ ${ep.name} failed:`, errorMsg)
        errors.push(`${ep.name}: ${errorMsg}`)
        continue
      }
    }

    console.error('[Pennylane] Tous les endpoints ont échoué:', errors)
    return { 
      ok: false, 
      error: `Échec de connexion à Pennylane. Détails: ${errors.slice(0, 2).join('; ')}` 
    }
  }

  // Try to fetch organizations/entities that represent restaurants
  async getOrganizations(): Promise<PennylaneOrganization[]> {
    try {
      // Primary expected endpoint
      const resp = await this.client.get('/organizations')
      const items = resp.data?.data || resp.data || []
      return items.map((it: any) => ({ id: String(it.id), name: it.name || it.label || 'Organisation' }))
    } catch (primaryErr) {
      // Fallback: Some tenants expose entities at /entities
      try {
        const resp = await this.client.get('/entities')
        const items = resp.data?.data || resp.data || []
        return items.map((it: any) => ({ id: String(it.id), name: it.name || it.label || 'Entité' }))
      } catch (secondaryErr) {
        console.warn('Pennylane organizations/entities endpoints not available. Provide VITE_PENNYLANE_API_URL if different.')
        return []
      }
    }
  }

  async getInvoices(params?: { organization_id?: string; per_page?: number; page?: number }): Promise<PennylaneInvoice[]> {
    try {
      // Try /invoices first, fallback to /customer_invoices
      try {
        const response = await this.client.get('/invoices', { params })
        return response.data?.data || response.data || []
      } catch (e) {
        const response = await this.client.get('/customer_invoices', { params })
        return response.data?.data || response.data || []
      }
    } catch (error) {
      console.error('Error fetching invoices from Pennylane:', error)
      return []
    }
  }
}

export const pennylaneService = new PennylaneService()
