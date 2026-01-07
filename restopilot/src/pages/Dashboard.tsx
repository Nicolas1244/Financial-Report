import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase/client'
import { useEffect, useState } from 'react'
import { 
  Building2, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  FileText,
  Users,
  ChefHat
} from 'lucide-react'

interface Restaurant {
  id: string
  name: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
          .from('restaurants')
          .select('id, name')
          .eq('owner_id', user.id)
          .limit(10)

        setRestaurants(data || [])
      } catch (error) {
        console.error('Erreur lors du chargement des restaurants:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const menuItems = [
    { icon: BarChart3, label: 'Tableau de bord', path: '/dashboard', bold: true },
    { icon: Building2, label: 'Restaurants', path: '/dashboard/restaurants' },
    { icon: FileText, label: 'Comptes de gestion', path: '/dashboard/management-account' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight">RestoPilot</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <item.icon className="w-5 h-5" />
                <span className={item.bold ? 'font-semibold' : ''}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
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
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-left text-gray-700 dark:text-gray-300"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
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
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">Bienvenue 👋</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Gérez vos restaurants et pilotez votre performance financière</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="w-6 h-6 text-amber-600 dark:text-amber-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Restaurants</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">{restaurants.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Revenus (ce mois)</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">--</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-6 h-6 text-rose-600 dark:text-rose-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Utilisateurs</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">1</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">Actions rapides</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/dashboard/restaurants')}
              className="flex items-center space-x-4 p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition group"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition">
                <Building2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-gray-50">Ajouter un restaurant</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Créer ou modifier vos établissements</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/dashboard/management-account')}
              className="flex items-center space-x-4 p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition group"
            >
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition">
                <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-gray-50">Compte de gestion</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Consulter votre analyse financière</p>
              </div>
            </button>
          </div>
        </div>

        {/* Restaurants List */}
        {!loading && restaurants.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">Vos restaurants</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => navigate('/dashboard/restaurants')}
                  className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                >
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-gray-50">{restaurant.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
