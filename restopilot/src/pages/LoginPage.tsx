import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2, Lock, Mail, ArrowRight, ChefHat } from 'lucide-react'
import { supabase } from '../lib/supabase/client'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setOauthLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
      // En cas de succès, redirection par Supabase (peut ne pas revenir ici)
    } catch (e: any) {
      const msg = e?.message || 'Erreur OAuth Google'
      // Message convivial si provider non activé
      if (/provider is not enabled/i.test(msg)) {
        setError("Google n'est pas activé sur Supabase. Activez le provider Google dans Supabase → Authentication → Providers et vérifiez les URLs de redirection.")
      } else {
        setError(msg)
      }
    } finally {
      setOauthLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/20 to-white flex items-center justify-center px-4">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 min-h-screen p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 right-10 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-md relative z-10">
          <Link to="/" className="inline-flex items-center space-x-3 mb-16">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">RestoPilot</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Pilotez votre<br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">rentabilité</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Connectez-vous pour accéder à vos données financières en temps réel et optimiser la performance de vos restaurants.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Multi-restaurants</p>
                <p className="text-sm text-gray-600">Gérez tous vos établissements</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Sécurisé</p>
                <p className="text-sm text-gray-600">Vos données protégées</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full max-w-md lg:w-1/2 lg:flex lg:items-center lg:justify-center">
        <div className="w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6 justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">RestoPilot</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="text-gray-600 mt-2">Accédez à votre espace</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
              <p className="text-gray-600">Accédez à votre espace personnel</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-4 rounded-xl text-sm flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">⚠️</div>
                  <div>{error}</div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg hover:shadow-lg transition duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">Ou continuez avec</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition duration-200 font-medium text-gray-700 flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={oauthLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {oauthLoading ? 'Connexion…' : 'Google'}
            </button>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Pas de compte ?{' '}
                <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-semibold transition">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            En continuant, vous acceptez nos conditions d'utilisation
          </p>
        </div>
      </div>
    </div>
  )
}
