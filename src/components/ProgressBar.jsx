import { useThemeConfig } from '../hooks/useThemeConfig'

const ProgressBar = ({ currentIndex, totalItems, currentActivity, totalScore, maxScore }) => {
  const { getTextColor, getCardClasses } = useThemeConfig()
  
  const progressPercentage = ((currentIndex + 1) / totalItems) * 100

  return (
    <div className="mb-8">
      {/* Barre de progression principale */}
      <div className={`${getCardClasses()} mb-4`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium text-${getTextColor()}`}>
            Progression
          </span>
          <span className={`text-sm font-medium text-${getTextColor()}`}>
            {currentIndex + 1}/{totalItems}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Activité en cours */}
      <div className={`${getCardClasses()}`}>
        <div className="flex items-center">
          <span className="text-3xl mr-4">{currentActivity.icon}</span>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold text-${getTextColor()}`}>
              {currentActivity.title}
            </h3>
            <p className={`text-sm text-${getTextColor()}/70`}>
              {currentActivity.description}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold text-${getTextColor()}`}>
              {totalScore}/{maxScore}
            </div>
            <div className="text-sm text-gray-500">
              Score actuel
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
