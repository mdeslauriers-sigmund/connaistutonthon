import { useAchievements } from '../contexts/AchievementContext'
import { useThemeConfig } from '../hooks/useThemeConfig'

/**
 * AchievementsDisplay - Shows all achievements and progress
 * Can be used as a modal, sidebar, or standalone page
 */
const AchievementsDisplay = ({ compact = false }) => {
  const { getAllAchievements, isAchievementUnlocked, getProgress } = useAchievements()
  const { getTextColor, getTextSecondaryColor, getCardClasses } = useThemeConfig()
  
  const allAchievements = getAllAchievements()
  const progress = getProgress()

  // Group achievements by category
  const achievementsByCategory = allAchievements.reduce((acc, achievement) => {
    const category = achievement.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(achievement)
    return acc
  }, {})

  const categoryLabels = {
    progress: '🚀 Progression',
    mastery: '⭐ Maîtrise',
    completion: '🎓 Complétion',
    dedication: '💪 Dévouement',
    exploration: '🔍 Exploration',
    speed: '⚡ Rapidité',
    other: '📌 Autres'
  }

  if (compact) {
    return (
      <div className={`${getCardClasses()} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold text-${getTextColor()}`}>
            🏆 Achievements
          </h3>
          <div className={`text-sm text-${getTextSecondaryColor()}`}>
            {progress.unlocked}/{progress.total}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className={`text-xs text-center mt-1 text-${getTextSecondaryColor()}`}>
            {progress.percentage}% Complete
          </div>
        </div>

        {/* Achievement Grid - Compact */}
        <div className="grid grid-cols-4 gap-2">
          {allAchievements.map(achievement => {
            const unlocked = isAchievementUnlocked(achievement.id)
            return (
              <div
                key={achievement.id}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-3xl
                  transition-all duration-300
                  ${unlocked 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 shadow-lg' 
                    : 'bg-gray-800/50 border-2 border-gray-700 opacity-30 grayscale'
                  }
                `}
                title={unlocked ? `${achievement.title} - ${achievement.description}` : '???'}
              >
                {unlocked ? achievement.icon : '🔒'}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-2 text-${getTextColor()}`}>
          🏆 Achievements
        </h2>
        <p className={`text-${getTextSecondaryColor()}`}>
          Débloquez des badges en complétant diverses activités
        </p>
      </div>

      {/* Progress Card */}
      <div className={`${getCardClasses()} p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`text-2xl font-bold text-${getTextColor()}`}>
              {progress.unlocked} / {progress.total}
            </div>
            <div className={`text-sm text-${getTextSecondaryColor()}`}>
              Achievements débloqués
            </div>
          </div>
          <div className="text-5xl">
            {progress.percentage === 100 ? '🏆' : '📊'}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className={`text-sm text-center mt-2 font-bold text-${getTextColor()}`}>
            {progress.percentage}% Complete
          </div>
        </div>
      </div>

      {/* Achievements by Category */}
      {Object.entries(achievementsByCategory).map(([category, achievements]) => (
        <div key={category}>
          <h3 className={`text-xl font-bold mb-4 text-${getTextColor()}`}>
            {categoryLabels[category] || category}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map(achievement => {
              const unlocked = isAchievementUnlocked(achievement.id)
              
              return (
                <div
                  key={achievement.id}
                  className={`
                    ${getCardClasses()} p-4
                    transition-all duration-300
                    ${unlocked 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30' 
                      : 'opacity-50'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      text-4xl flex-shrink-0
                      ${unlocked ? '' : 'grayscale opacity-50'}
                    `}>
                      {unlocked ? achievement.icon : '🔒'}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-bold text-${getTextColor()}`}>
                          {unlocked ? achievement.title : '???'}
                        </h4>
                        {unlocked && (
                          <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                        )}
                      </div>
                      <p className={`text-sm text-${getTextSecondaryColor()} mt-1`}>
                        {unlocked ? achievement.description : 'Achievement verrouillé'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AchievementsDisplay

