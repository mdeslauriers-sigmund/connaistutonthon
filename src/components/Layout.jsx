import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useThemeConfig } from '../hooks/useThemeConfig'
import { useAchievements } from '../contexts/AchievementContext'
import ThemeToggle from './ThemeToggle'
import AchievementsSidebar from './AchievementsSidebar'
import Icon from './Icon'

const Layout = ({ children }) => {
  const { theme, getBackgroundClasses, getHeaderClasses, getFooterClasses, getTextColor, getTextSecondaryColor } = useThemeConfig()
  const { getProgress } = useAchievements()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const progress = getProgress()
  const hasAchievements = progress.unlocked > 0

  return (
    <div className={`min-h-screen transition-all duration-500 ${getBackgroundClasses()}`}>
      <header className={`${getHeaderClasses()} absolute top-0 inset-x-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 text-3xl transition-colors duration-300 text-${getTextColor()} hover:text-${getTextSecondaryColor()} font-molle`}
            >
              <Icon name={theme.icon} size="size-14" />
              <span>Connais-tu ton {theme.name} ?</span>
            </Link>

            <div className="flex items-center space-x-4">
              {hasAchievements && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className={`text-4xl transition-all duration-300 text-${getTextColor()} hover:text-${getTextSecondaryColor()} hover:scale-110 transform cursor-pointer`}
                  title="Voir mes achievements"
                >
                  🏆
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className={getFooterClasses()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-4">
            <p className={`text-center transition-colors duration-300 text-${getTextColor()}/70`}>
              © 2025 Connais-tu ton {theme.name} - {theme.content.footer}
            </p>
            <ThemeToggle />
          </div>
        </div>
      </footer>

      {/* Achievements Sidebar */}
      <AchievementsSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>
  )
}

export default Layout
