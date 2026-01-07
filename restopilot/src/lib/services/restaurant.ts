import { supabase } from '../supabase/client'
import type { Restaurant } from '../../types'

export class RestaurantService {
  // Get all restaurants for the current user
  static async getRestaurants(userId: string): Promise<Restaurant[]> {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching restaurants:', error)
      return []
    }
  }

  // Get a single restaurant
  static async getRestaurant(restaurantId: string): Promise<Restaurant | null> {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .single()

      if (error) throw error
      return data || null
    } catch (error) {
      console.error('Error fetching restaurant:', error)
      return null
    }
  }

  // Create a new restaurant
  static async createRestaurant(
    userId: string,
    email: string,
    fullName: string | undefined,
    name: string,
    address: string,
    phone: string
  ): Promise<Restaurant | null> {
    try {
      // Step 1: Ensure user exists in users table
      const { error: userError } = await supabase
        .from('users')
        .upsert([
          {
            id: userId,
            email,
            full_name: fullName || 'User',
            role: 'admin',
          },
        ])

      if (userError) {
        console.warn('Warning creating user (may already exist):', userError)
      }

      // Step 2: Create the restaurant
      const { data, error: restaurantError } = await supabase
        .from('restaurants')
        .insert([
          {
            owner_id: userId,
            name,
            address,
            phone,
          },
        ])
        .select()
        .single()

      if (restaurantError) throw restaurantError
      return data
    } catch (error) {
      console.error('Error creating restaurant:', error)
      throw error
    }
  }

  // Update a restaurant
  static async updateRestaurant(
    restaurantId: string,
    name: string,
    address: string,
    phone: string
  ): Promise<Restaurant | null> {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .update({
          name,
          address,
          phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', restaurantId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating restaurant:', error)
      throw error
    }
  }

  // Delete a restaurant
  static async deleteRestaurant(restaurantId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', restaurantId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting restaurant:', error)
      return false
    }
  }
}
