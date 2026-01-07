import { useNavigate } from 'react-router-dom'
import { Building2, LogOut, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase/client'

export default function ManagementAccount({ user }: { user: any }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight">RestoPilot</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-rose-300 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-gray-800 dark:text-gray-200 transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour au dashboard</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Compte de Gestion</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-50">
                    Libellé
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-50">
                    Montant
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-50">
                    % CA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-50">CHIFFRE D'AFFAIRES</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-50 text-right">0 €</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-50 text-right">100%</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300 pl-12">Ventes sur place</td>
                  <td className="px-6 py-3 text-sm text-gray-900 dark:text-gray-50 text-right">0 €</td>
                  <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400 text-right">0%</td>
                </tr>
                <tr className="bg-red-50 dark:bg-red-900/20 border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-50">COÛT DES MARCHANDISES</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-600 dark:text-red-400 text-right">0 €</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-600 dark:text-red-400 text-right">0%</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-900/20 border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-50">MARGE BRUTE</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600 dark:text-green-400 text-right">0 €</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600 dark:text-green-400 text-right">0%</td>
                </tr>
                <tr className="bg-orange-50 dark:bg-orange-900/20 border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-50">CHARGES D'EXPLOITATION</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-600 dark:text-orange-400 text-right">0 €</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-600 dark:text-orange-400 text-right">0%</td>
                </tr>
                <tr className="bg-purple-50 dark:bg-purple-900/20">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-50">RÉSULTAT NET</td>
                  <td className="px-6 py-4 text-sm font-bold text-purple-600 dark:text-purple-400 text-right">0 €</td>
                  <td className="px-6 py-4 text-sm font-bold text-purple-600 dark:text-purple-400 text-right">0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Les données s'afficheront ici une fois que Supabase aura été configuré et que vous aurez ajouté vos restaurants.
          </p>
        </div>
      </div>
    </div>
  )
}
