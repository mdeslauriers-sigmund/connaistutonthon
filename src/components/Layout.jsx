import { ReactNode } from 'react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-deep to-tuna-blue">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-white">
              🐟 Connais-tu ton Thon
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-white hover:text-wave-light transition-colors">
                Accueil
              </a>
              <a href="/activities" className="text-white hover:text-wave-light transition-colors">
                Activités
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-white/5 backdrop-blur-md border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-white/70">
            © 2024 Connais-tu ton Thon - Découvrez le monde fascinant du thon
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
