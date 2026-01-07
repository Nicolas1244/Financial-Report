import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Building2, User, Mail, Lock, ArrowRight, CheckCircle, ChefHat } from 'lucide-react'
import { supabase } from '../lib/supabase/client'

export default function SignupPage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'viewer',
          },
        },
      })

      if (error) throw error
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/20 to-white flex items-center justify-center px-4">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-emerald-50 via-orange-50 to-amber-50 min-h-screen p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 right-10 w-64 h-64 bg-gradient-to-br from-emerald-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-md relative z-10">
          <Link to="/" className="inline-flex items-center space-x-3 mb-16">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">RestoPilot</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Commencez<br />
            <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">votre journée</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Rejoignez les restaurateurs qui font confiance à RestoPilot pour piloter leur performance financière.
          </p>

          <div className="space-y-4">
            {[
              'Accès instantané à vos données',
              'Synchronisation Pennylane',
              'Support multi-restaurants',
              'Interface moderne et intuitive'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
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
            <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
            <p className="text-gray-600 mt-2">Commencez en 2 minutes</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">S'inscrire</h2>
              <p className="text-gray-600">Créez votre compte gratuitement</p>
            </div>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Compte créé !</h3>
                <p className="text-gray-600 mb-4">
                  Vérifiez votre email pour confirmer votre compte.
                </p>
                <p className="text-sm text-gray-500">
                  Redirection vers la connexion dans quelques secondes...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-4 rounded-xl text-sm flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">⚠️</div>
                    <div>{error}</div>
                  </div>
                )}

                {/* Full Name Input */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                </div>

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
                      minLength={6}
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Minimum 6 caractères</p>
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
                      Création en cours...
                    </>
                  ) : (
                    <>
                      Créer mon compte
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-500">Ou continuez avec</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition duration-200 font-medium text-gray-700 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center">
                  En créant un compte, vous acceptez nos conditions d'utilisation
                </p>
              </form>
            )}

            {/* Login Link */}
            {!success && (
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Déjà inscrit ?{' '}
                  <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold transition">
                    Se connecter
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
