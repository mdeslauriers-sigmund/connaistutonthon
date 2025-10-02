import { useThemeConfig } from '../hooks/useThemeConfig'

const ProgressBar = ({ currentIndex, totalItems, currentActivity, totalScore, maxScore }) => {
  const { getTextColor, getCardClasses } = useThemeConfig()

  const progressPercentage = ((currentIndex + 1) / totalItems) * 100

  return (
    <div className="mb-8 flex gap-4 items-stretch h-16">
      {/* Barre de progression principale */}
      <div className={`${getCardClasses()} grow py-2`}>
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
      <div className={`${getCardClasses()} h-full !py-1 !px-4`}>
        <div className="flex items-center justify-center flex-col">
          <div className="text-sm text-gray-300">
            Score actuel
          </div>
          <div className={`text-2xl font-bold text-${getTextColor()}`}>
            {totalScore}/{maxScore}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProgressBar
