import { useEffect } from 'react'
import { useAchievements } from '../contexts/AchievementContext'
import { useThemeConfig } from '../hooks/useThemeConfig'
import './AchievementsSidebar.css'

const AchievementsSidebar = ({ isOpen, onClose }) => {
  const { getAllAchievements, getProgress, isAchievementUnlocked, getUnlockedAchievements } = useAchievements()
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses } = useThemeConfig()
  
  const allAchievements = getAllAchievements()
  const progress = getProgress()
  const unlockedData = getUnlockedAchievements()
  
  // Create a map of unlocked achievements with their unlock dates
  const unlockedMap = {}
  unlockedData.forEach(item => {
    if (item.achievement) {
      unlockedMap[item.achievement.id] = item.unlockedAt
    }
  })
  
  // Add unlocked status and date to each achievement
  const achievements = allAchievements.map(achievement => ({
    ...achievement,
    unlocked: isAchievementUnlocked(achievement.id),
    unlockedAt: unlockedMap[achievement.id]
  }))

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Empêcher le scroll du body quand le sidebar est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const lockedAchievements = achievements.filter(a => !a.unlocked)

  return (
    <>
      {/* Overlay */}
      <div 
        className="achievements-overlay"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`achievements-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className={`sidebar-header ${getCardClasses()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🏆</span>
              <h2 className={`text-2xl font-bold text-${getTextColor()}`}>
                Achievements
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`text-2xl text-${getTextColor()} hover:text-${getTextSecondaryColor()} transition-colors`}
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="sidebar-content">
          {/* Stats */}
          <div className={`${getCardClasses()} p-4 mb-6`}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className={`text-3xl font-bold text-${getTextColor()}`}>
                  {unlockedAchievements.length}/{achievements.length}
                </div>
                <div className={`text-sm text-${getTextSecondaryColor()}`}>
                  Débloqués
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold text-${getTextColor()}`}>
                  {progress.totalScore || 0}
                </div>
                <div className={`text-sm text-${getTextSecondaryColor()}`}>
                  Score Total
                </div>
              </div>
            </div>
          </div>

          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 text-${getTextColor()}`}>
                ✨ Débloqués ({unlockedAchievements.length})
              </h3>
              <div className="space-y-3">
                {unlockedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`${getCardClasses()} p-4 transform hover:scale-105 transition-transform`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-${getTextColor()}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm text-${getTextSecondaryColor()} mb-2`}>
                          {achievement.description}
                        </p>
                        {achievement.unlockedAt && (
                          <p className={`text-xs text-${getTextSecondaryColor()}`}>
                            Débloqué le {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold mb-3 text-${getTextColor()}`}>
                🔒 Verrouillés ({lockedAchievements.length})
              </h3>
              <div className="space-y-3">
                {lockedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`${getCardClasses()} p-4 opacity-50`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl flex-shrink-0 grayscale">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-${getTextColor()}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm text-${getTextSecondaryColor()}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AchievementsSidebar
