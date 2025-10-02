import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const HomePage = () => {
  const { isOcean, isBee } = useTheme()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className={`
          text-4xl md:text-6xl font-bold mb-6 transition-colors duration-500
          ${isOcean ? 'text-white' : 'text-bee-yellow'}
        `}>
          Bienvenue dans l'univers {isOcean ? 'du Thon' : 'des Taons'}! {isOcean ? '🐟' : '🐝'}
        </h1>
        <p className={`
          text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500
          ${isOcean ? 'text-wave-light' : 'text-pollen-light'}
        `}>
          {isOcean 
            ? 'Découvrez les mystères des océans et testez vos connaissances sur l\'un des poissons les plus fascinants de la planète.'
            : 'Explorez le monde merveilleux des taons et découvrez leur rôle essentiel dans notre écosystème.'
          }
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className={`
            backdrop-blur-md rounded-lg p-6 border transition-all duration-500
            ${isOcean 
              ? 'bg-white/10 border-white/20' 
              : 'bg-bee-black/20 border-bee-yellow/30'
            }
          `}>
            <div className="text-4xl mb-4">{isOcean ? '🌊' : '🌸'}</div>
            <h3 className={`
              text-xl font-semibold mb-2 transition-colors duration-500
              ${isOcean ? 'text-white' : 'text-bee-yellow'}
            `}>
              {isOcean ? 'Exploration' : 'Pollinisation'}
            </h3>
            <p className={`
              transition-colors duration-500
              ${isOcean ? 'text-wave-light' : 'text-pollen-light'}
            `}>
              {isOcean 
                ? 'Plongez dans les profondeurs océaniques et découvrez l\'habitat naturel du thon.'
                : 'Découvrez comment les taons pollinisent les fleurs et maintiennent la biodiversité.'
              }
            </p>
          </div>
          
          <div className={`
            backdrop-blur-md rounded-lg p-6 border transition-all duration-500
            ${isOcean 
              ? 'bg-white/10 border-white/20' 
              : 'bg-bee-black/20 border-bee-yellow/30'
            }
          `}>
            <div className="text-4xl mb-4">{isOcean ? '🧠' : '🍯'}</div>
            <h3 className={`
              text-xl font-semibold mb-2 transition-colors duration-500
              ${isOcean ? 'text-white' : 'text-bee-yellow'}
            `}>
              {isOcean ? 'Apprentissage' : 'Production'}
            </h3>
            <p className={`
              transition-colors duration-500
              ${isOcean ? 'text-wave-light' : 'text-pollen-light'}
            `}>
              {isOcean 
                ? 'Testez vos connaissances avec nos quiz interactifs sur la biologie marine.'
                : 'Apprenez comment les taons produisent le miel et organisent leur ruche.'
              }
            </p>
          </div>
          
          <div className={`
            backdrop-blur-md rounded-lg p-6 border transition-all duration-500
            ${isOcean 
              ? 'bg-white/10 border-white/20' 
              : 'bg-bee-black/20 border-bee-yellow/30'
            }
          `}>
            <div className="text-4xl mb-4">{isOcean ? '🎯' : '🏠'}</div>
            <h3 className={`
              text-xl font-semibold mb-2 transition-colors duration-500
              ${isOcean ? 'text-white' : 'text-bee-yellow'}
            `}>
              {isOcean ? 'Défis' : 'Habitat'}
            </h3>
            <p className={`
              transition-colors duration-500
              ${isOcean ? 'text-wave-light' : 'text-pollen-light'}
            `}>
              {isOcean 
                ? 'Relevez des défis amusants et devenez un expert en ichtyologie.'
                : 'Explorez la structure complexe de la ruche et la vie sociale des taons.'
              }
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <Link 
            to="/activities" 
            className={`
              inline-block font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105
              ${isOcean 
                ? 'bg-tuna-light hover:bg-tuna-blue text-white' 
                : 'bg-bee-gold hover:bg-bee-yellow text-bee-black'
              }
            `}
          >
            Commencer l'aventure
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
