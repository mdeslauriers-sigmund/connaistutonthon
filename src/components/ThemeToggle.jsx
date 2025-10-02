import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme, isOcean, isBee } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300
        ${isOcean 
          ? 'bg-tuna-light hover:bg-tuna-blue text-white' 
          : 'bg-bee-gold hover:bg-bee-yellow text-bee-black'
        }
        shadow-lg hover:shadow-xl transform hover:scale-105
      `}
      title={`Basculer vers le thème ${isOcean ? 'taon' : 'thon'}`}
    >
      <div className="flex items-center space-x-2">
        {isOcean ? (
          <>
            <span className="text-lg">🐟</span>
            <span className="hidden sm:inline">Thème Thon</span>
          </>
        ) : (
          <>
            <span className="text-lg">🐝</span>
            <span className="hidden sm:inline">Thème Taon</span>
          </>
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
