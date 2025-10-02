import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'

const Layout = ({ children }) => {
  const { isOcean, isBee } = useTheme()

  return (
    <div className={`
      min-h-screen transition-all duration-500
      ${isOcean 
        ? 'bg-gradient-to-br from-ocean-deep to-tuna-blue' 
        : 'bg-gradient-to-br from-honey-dark to-bee-gold'
      }
    `}>
      <header className={`
        backdrop-blur-md border-b transition-all duration-500
        ${isOcean 
          ? 'bg-white/10 border-white/20' 
          : 'bg-bee-black/20 border-bee-yellow/30'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link 
              to="/" 
              className={`
                text-2xl font-bold transition-colors duration-300
                ${isOcean 
                  ? 'text-white hover:text-wave-light' 
                  : 'text-bee-yellow hover:text-pollen-light'
                }
              `}
            >
              {isOcean ? '🐟' : '🐝'} Connais-tu ton {isOcean ? 'Thon' : 'Taon'}
            </Link>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <Link 
                  to="/" 
                  className={`
                    transition-colors duration-300
                    ${isOcean 
                      ? 'text-white hover:text-wave-light' 
                      : 'text-bee-yellow hover:text-pollen-light'
                    }
                  `}
                >
                  Accueil
                </Link>
                <Link 
                  to="/activities" 
                  className={`
                    transition-colors duration-300
                    ${isOcean 
                      ? 'text-white hover:text-wave-light' 
                      : 'text-bee-yellow hover:text-pollen-light'
                    }
                  `}
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
      
      <footer className={`
        backdrop-blur-md border-t transition-all duration-500
        ${isOcean 
          ? 'bg-white/5 border-white/20' 
          : 'bg-bee-black/10 border-bee-yellow/20'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className={`
            text-center transition-colors duration-300
            ${isOcean 
              ? 'text-white/70' 
              : 'text-bee-yellow/70'
            }
          `}>
            © 2024 Connais-tu ton {isOcean ? 'Thon' : 'Taon'} - Découvrez le monde fascinant {isOcean ? 'du thon' : 'des taons'}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
