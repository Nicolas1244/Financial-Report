import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, XCircle, RefreshCw, Shield, PlugZap, Settings, LogOut, Menu, X, ChefHat, Cloud, KeyRound, Check, X as XIcon, Palette, Sun, Moon } from 'lucide-react'
import { pennylaneService } from '../lib/services/pennylane'
import { supabase } from '../lib/supabase/client'
import { useTheme } from '../lib/hooks/useTheme'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [testing, setTesting] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; error?: string } | null>(null)
  const [testingGoogle, setTestingGoogle] = useState(false)
  const [googleStatus, setGoogleStatus] = useState<{ ok: boolean; error?: string } | null>(null)

  const envOk = Boolean(import.meta.env.VITE_PENNYLANE_API_KEY)
  const supaUrlOk = useMemo(() => Boolean(import.meta.env.VITE_SUPABASE_URL), [])
  const supaAnonOk = useMemo(() => Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY), [])

  useEffect(() => {
    // Optionally auto-test on mount if a key is present
    if (envOk) {
      handleTest()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const handleTest = async () => {
    setTesting(true)
    try {
      const res = await pennylaneService.testConnection()
      setStatus(res)
    } finally {
      setTesting(false)
    }
  }

  const handleTestGoogle = async () => {
    setTestingGoogle(true)
    setGoogleStatus(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
        },
      })
      if (error) throw error
      setGoogleStatus({ ok: true })
    } catch (e: any) {
      setGoogleStatus({ ok: false, error: e?.message || 'Erreur inconnue' })
    } finally {
      setTestingGoogle(false)
    }
  }

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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => navigate('/dashboard')}
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
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700 dark:text-gray-300">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Paramètres</h1>

        {/* Theme Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Apparence</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Choisissez le mode clair, sombre ou automatique</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {(['light', 'dark', 'auto'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition flex items-center gap-2 ${
                  theme === t
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                {t === 'light' && <Sun className="w-4 h-4" />}
                {t === 'dark' && <Moon className="w-4 h-4" />}
                {t === 'auto' && <Palette className="w-4 h-4" />}
                <span className="capitalize">{t === 'light' ? 'Clair' : t === 'dark' ? 'Sombre' : 'Auto'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Supabase Checklist */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Supabase — Vérifications</h2>
              <p className="text-gray-600 text-sm">Configuration locale de l’authentification</p>
            </div>
          </div>

          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              {supaUrlOk ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <XIcon className="w-4 h-4 text-red-600" />
              )}
              <span>VITE_SUPABASE_URL {supaUrlOk ? 'définie' : 'manquante'}</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              {supaAnonOk ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <XIcon className="w-4 h-4 text-red-600" />
              )}
              <span>VITE_SUPABASE_ANON_KEY {supaAnonOk ? 'définie' : 'manquante'}</span>
            </li>
          </ul>
        </div>

        {/* Pennylane Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <PlugZap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Connexion Pennylane</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Vérifiez la connexion en lecture à votre compte Pennylane</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 mb-4">
            {status?.ok ? (
              <div className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>Connexion établie avec Pennylane</span>
              </div>
            ) : status && !status.ok ? (
              <div className="inline-flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 px-3 py-1.5 rounded-lg">
                <XCircle className="w-5 h-5" />
                <span>Échec de la connexion: {status.error}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-1.5 rounded-lg">
                <Shield className="w-5 h-5" />
                <span>Statut: non testé</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTest}
              disabled={testing}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
              {testing ? 'Test en cours...' : 'Tester la connexion'}
            </button>
            {!envOk && (
              <p className="text-sm text-red-600 dark:text-red-400">VITE_PENNYLANE_API_KEY manquant. Ajoutez votre clé dans le fichier .env.</p>
            )}
          </div>
        </div>

        {/* Google OAuth Test */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Google OAuth</h2>
              <p className="text-gray-600 text-sm">Testez l’activation du provider côté Supabase</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            {googleStatus?.ok ? (
              <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span>Provider Google activé</span>
              </div>
            ) : googleStatus && !googleStatus.ok ? (
              <div className="inline-flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
                <XCircle className="w-5 h-5" />
                <span>Échec: {googleStatus.error}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                <Shield className="w-5 h-5" />
                <span>Statut: non testé</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={handleTestGoogle}
              disabled={testingGoogle}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50 text-gray-800 font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${testingGoogle ? 'animate-spin' : ''}`} />
              {testingGoogle ? 'Test en cours...' : 'Tester Google OAuth'}
            </button>
          </div>
        </div>

        {/* Aide Google Auth */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Google Auth — Vérifications rapides</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
            <li>Dans Supabase → Authentication → Providers → Google: activez le provider et renseignez Client ID et Secret.</li>
            <li>Dans Google Cloud Console → OAuth 2.0 Client: ajoutez comme Redirect URI: <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">{`${import.meta.env.VITE_SUPABASE_URL || 'https://<project>.supabase.co'}`}/auth/v1/callback</code>.</li>
            <li>Dans Supabase → Authentication → URL settings: Site URL = <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">{typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'}</code> et ajoutez les redirect URLs nécessaires.</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
