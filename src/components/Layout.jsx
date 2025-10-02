import { Link } from 'react-router-dom'
import { useThemeConfig } from '../hooks/useThemeConfig'
import ThemeToggle from './ThemeToggle'

const Layout = ({ children }) => {
  const { theme, getBackgroundClasses, getHeaderClasses, getFooterClasses, getTextColor, getTextSecondaryColor } = useThemeConfig()

  return (
    <div className={`min-h-screen transition-all duration-500 ${getBackgroundClasses()}`}>
      <header className={getHeaderClasses()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link 
              to="/" 
              className={`text-2xl font-bold transition-colors duration-300 text-${getTextColor()} hover:text-${getTextSecondaryColor()}`}
            >
              {theme.icon} Connais-tu ton {theme.name}
            </Link>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <Link 
                  to="/" 
                  className={`transition-colors duration-300 text-${getTextColor()} hover:text-${getTextSecondaryColor()}`}
                >
                  Accueil
                </Link>
                <Link 
                  to="/activities" 
                  className={`transition-colors duration-300 text-${getTextColor()} hover:text-${getTextSecondaryColor()}`}
                >
                  Activités
                </Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className={getFooterClasses()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className={`text-center transition-colors duration-300 text-${getTextColor()}/70`}>
            © 2024 Connais-tu ton {theme.name} - {theme.content.footer}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
