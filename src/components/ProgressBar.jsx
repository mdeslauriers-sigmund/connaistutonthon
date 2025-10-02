import { useThemeConfig } from '../hooks/useThemeConfig'
import './ProgressBar.css'

const ProgressBar = ({ currentIndex, totalItems, currentActivity, totalScore, maxScore }) => {
  const { getTextColor, getCardClasses, theme } = useThemeConfig()

  // Show 90% when reaching the last step, otherwise normal calculation
  const isLastStep = currentIndex === totalItems - 1
  const progressPercentage = isLastStep ? 94 : ((currentIndex + 1) / totalItems) * 100

  return (
    <div className="mb-8 flex gap-8 items-end">
      {/* Barre de progression principale avec animation */}
      <div className={`grow flex items-center gap-4`}>
        <span className={`sr-only`}>
          Progression
        </span>

        {/* Ocean-themed progress bar */}
        <div className="relative w-full bg-gradient-to-r from-blue-100 to-blue-200 rounded-full h-8 overflow-hidden progress-wave">
          {/* Ocean waves animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}>
            {/* Flowing wave overlay */}
            <div className="wave-overlay"></div>
            
            {/* Animated waves */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/40 animate-pulse"></div>
              <div className="absolute top-1 left-0 w-full h-1 bg-white/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Swimming fish */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 text-2xl transition-all duration-1000 ease-out z-10"
            style={{ left: `calc(${progressPercentage}% - 1rem)` }}
          >
            <span className="inline-block transform scale-x-[-1]"
              style={{
                animation: 'swim 2s ease-in-out infinite',
                transformOrigin: 'center'
              }}>
              🐟
            </span>
          </div>

          {/* Sea destination */}
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-2xl">
            🌊
          </div>
        </div>

        {/* Progress indicator */}
        <div className="sr-only">
          <span className={`text-sm font-medium text-${getTextColor()}`}>
            {currentIndex + 1}/{totalItems}
          </span>
          {isLastStep && (
            <span className="text-xs text-yellow-400 animate-pulse">
              Presque arrivé ! 🎯
            </span>
          )}
        </div>
      </div>

      {/* Score section with theme-appropriate icon */}
      <div className="">
        <div className="flex items-center justify-center flex-col">
          <div className="text-sm text-gray-300">
            Score actuel
          </div>
          <div className={`text-2xl font-bold text-${getTextColor()} flex items-center gap-2`}>
            <span>{totalScore}/{maxScore}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
