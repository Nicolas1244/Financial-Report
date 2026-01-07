import { Link } from 'react-router-dom'
import { Building2, TrendingUp, BarChart3, Users, Lock, Zap, ArrowRight, ChefHat } from 'lucide-react'
import { supabase } from '../lib/supabase/client'
import { useState } from 'react'

export default function LandingPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
    } catch (e: any) {
      const msg = e?.message || 'Erreur OAuth Google'
      if (/provider is not enabled/i.test(msg)) {
        setError("Google n'est pas activé sur Supabase. Activez le provider Google dans Supabase → Authentication → Providers et vérifiez les URLs de redirection.")
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">RestoPilot</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition duration-200"
            >
              Connexion
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition duration-200 font-medium"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-amber-100/80 rounded-full border border-amber-200">
            <p className="text-amber-900 text-sm font-medium">✨ La gestion financière, simplifiée</p>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Pilotez votre<br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">performance financière</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            La plateforme intelligente de gestion financière pour restaurants. Synchronisez Pennylane, analysez vos marges, pilotez votre rentabilité.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/signup"
              className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-xl transition duration-200 font-semibold flex items-center gap-2 text-lg"
            >
              Essayer gratuitement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition duration-200 font-semibold text-lg"
            >
              Se connecter
            </Link>
          </div>

          {/* Google Auth */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-gray-500 text-sm font-medium">Ou continuez avec Google</div>
            <button
              onClick={handleGoogleLogin}
              className="px-8 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-lg transition font-medium text-gray-700 flex items-center justify-center gap-3 text-base disabled:opacity-50"
              disabled={loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Connexion…' : 'Google'}
            </button>
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 max-w-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">Conçu pour les restaurateurs</h2>
            <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour piloter votre business</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Tableau de bord intelligent',
                description: 'Vue d\'ensemble en temps réel de vos restaurants',
                color: 'from-amber-500 to-orange-500'
              },
              {
                icon: BarChart3,
                title: 'Analyse financière détaillée',
                description: 'Revenus, marges, charges d\'exploitation, résultat net',
                color: 'from-rose-500 to-orange-500'
              },
              {
                icon: Zap,
                title: 'Sync automatique Pennylane',
                description: 'Vos données à jour sans effort',
                color: 'from-amber-500 to-yellow-500'
              },
              {
                icon: Users,
                title: 'Équipe collaborative',
                description: 'Invitez vos managers avec des rôles personnalisés',
                color: 'from-orange-500 to-rose-500'
              },
              {
                icon: Lock,
                title: 'Sécurité maximale',
                description: 'Chiffrement end-to-end, authentification sécurisée',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Building2,
                title: 'Multi-restaurants',
                description: 'Gérez tous vos établissements en un seul endroit',
                color: 'from-rose-500 to-pink-500'
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200/50 hover:border-amber-200 hover:shadow-lg transition duration-300 group">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-16 text-center text-white shadow-2xl">
          <h2 className="text-5xl font-bold mb-6">Prêt à transformer ?</h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">
            Rejoignez les restaurateurs qui pilotent intelligemment leur performance financière
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 bg-white text-orange-600 rounded-xl hover:shadow-xl transition duration-200 font-semibold text-lg hover:scale-105 transform"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 py-12 px-6 text-center text-gray-600">
        <p>&copy; 2026 RestoPilot. Conçu avec ❤️ pour les restaurateurs.</p>
      </footer>
    </div>
  )
}
