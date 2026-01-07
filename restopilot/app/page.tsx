import { Building2, TrendingUp, Users, Shield, BarChart3, FileText } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">RestoPilot</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Connexion
            </a>
            <a
              href="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Commencer
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Pilotez la performance<br />
          <span className="text-blue-600">de vos restaurants</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Une plateforme complète de gestion financière connectée à Pennylane pour suivre et optimiser la rentabilité de chaque point de vente.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <a
            href="/signup"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
          >
            Essayer gratuitement
          </a>
          <a
            href="/login"
            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-medium text-lg"
          >
            Se connecter
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Fonctionnalités principales
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Compte de Gestion Dynamique</h3>
            <p className="text-gray-600">
              Visualisez en temps réel votre compte de résultat avec des données synchronisées depuis Pennylane.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Analyse de Performance</h3>
            <p className="text-gray-600">
              Mesurez la performance commerciale de chaque restaurant avec des indicateurs clés personnalisés.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gestion de Trésorerie</h3>
            <p className="text-gray-600">
              Suivez vos flux de trésorerie et anticipez vos besoins avec des prévisions précises.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-établissements</h3>
            <p className="text-gray-600">
              Gérez plusieurs restaurants depuis une seule interface et comparez leurs performances.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration d'Équipe</h3>
            <p className="text-gray-600">
              Donnez des accès personnalisés à votre équipe avec une gestion fine des permissions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-7 w-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sécurité & Confidentialité</h3>
            <p className="text-gray-600">
              Vos données sont protégées avec un chiffrement de bout en bout et des sauvegardes régulières.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à optimiser la gestion de vos restaurants ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez RestoPilot et prenez le contrôle de vos finances dès aujourd'hui.
          </p>
          <a
            href="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-medium text-lg inline-block"
          >
            Créer mon compte gratuitement
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">RestoPilot</span>
          </div>
          <p className="mb-4">
            Plateforme de gestion financière pour restaurants
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} RestoPilot. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
