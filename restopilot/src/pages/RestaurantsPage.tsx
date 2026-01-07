import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, ArrowLeft, Plus, Trash2, Edit2, MapPin, Phone, Menu, X, Settings, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase/client'
import { RestaurantService } from '../lib/services/restaurant'
import type { Restaurant } from '../types'

export default function RestaurantsPage() {
  const navigate = useNavigate()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    loadRestaurants()
  }, [])

  const loadRestaurants = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const data = await RestaurantService.getRestaurants(user.id)
      setRestaurants(data)
    } catch (error) {
      console.error('Erreur lors du chargement des restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!formData.name.trim()) {
      setError('Le nom du restaurant est obligatoire')
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      if (editingId) {
        await RestaurantService.updateRestaurant(
          editingId,
          formData.name,
          formData.address,
          formData.phone
        )
        setSuccessMessage('Restaurant modifié avec succès ✓')
        setEditingId(null)
      } else {
        await RestaurantService.createRestaurant(
          user.id,
          user.email || '',
          user.user_metadata?.full_name,
          formData.name,
          formData.address,
          formData.phone
        )
        setSuccessMessage('Restaurant ajouté avec succès ✓')
      }

      setFormData({ name: '', address: '', phone: '' })
      setShowForm(false)
      await loadRestaurants()
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    }
  }

  const handleEdit = (restaurant: Restaurant) => {
    setFormData({
      name: restaurant.name,
      address: restaurant.address || '',
      phone: restaurant.phone || '',
    })
    setEditingId(restaurant.id)
    setShowForm(true)
  }

  const handleDelete = async (restaurantId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
      const success = await RestaurantService.deleteRestaurant(restaurantId)
      if (success) {
        setSuccessMessage('Restaurant supprimé avec succès ✓')
        await loadRestaurants()
      } else {
        setError('Erreur lors de la suppression')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: '', address: '', phone: '' })
    setError('')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-3 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 dark:bg-blue-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-50">RestoPilot</span>
            </div>
          </button>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter</span>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3">
            <button
              onClick={() => {
                setShowForm(true)
                setMobileMenuOpen(false)
              }}
              className="w-full flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg transition"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter un restaurant</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-left text-red-600 dark:text-red-400"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">Mes restaurants</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Gérez tous vos établissements</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-400 px-6 py-4 rounded-xl mb-6 flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage('')}
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
            >
              ✕
            </button>
          </div>
        )}

        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              {editingId ? 'Modifier le restaurant' : 'Ajouter un restaurant'}
            </h2>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-400 px-6 py-4 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-50 mb-2">
                  Nom du restaurant *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Ex: Le Petit Bistrot"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-50 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Ex: 123 Rue de Paris, 75001 Paris"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-50 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Ex: +33 1 23 45 67 89"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {editingId ? 'Modifier' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Restaurants Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-4">Chargement des restaurants...</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-12 text-center border border-blue-200 dark:border-blue-800">
            <div className="w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              Aucun restaurant yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Commencez par ajouter votre premier restaurant pour suivre sa performance financière
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter votre premier restaurant</span>
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(restaurant)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                      title="Modifier"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                  {restaurant.name}
                </h3>

                <div className="space-y-3">
                  {restaurant.address && (
                    <div className="flex items-start space-x-3 text-sm">
                      <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 dark:text-gray-300">{restaurant.address}</p>
                    </div>
                  )}
                  {restaurant.phone && (
                    <div className="flex items-center space-x-3 text-sm">
                      <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                      <p className="text-gray-600 dark:text-gray-300">{restaurant.phone}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleEdit(restaurant)}
                    className="w-full px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition font-medium text-sm"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
