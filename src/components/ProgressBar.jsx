import { useThemeConfig } from '../hooks/useThemeConfig'

const ProgressBar = ({ currentIndex, totalItems, currentActivity, totalScore, maxScore }) => {
  const { getTextColor, getCardClasses, theme } = useThemeConfig()

  const progressPercentage = ((currentIndex + 1) / totalItems) * 100

  return (
    <div className="mb-8 flex gap-8 items-end">
      {/* Barre de progression principale avec animation */}
      <div className={`grow flex items-center gap-4`}>
        <span className={`sr-only`}>
          Progression
        </span>

        {/* Ocean-themed progress bar */}
        <div className="relative w-full bg-gradient-to-r from-blue-100 to-blue-200 rounded-full h-8 overflow-hidden">
          {/* Ocean waves animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}>
            {/* Animated waves */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/40 animate-pulse"></div>
              <div className="absolute top-1 left-0 w-full h-1 bg-white/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Swimming fish */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 text-2xl transition-all duration-1000 ease-out"
            style={{ left: `calc(${progressPercentage}% - 1rem)` }}
          >
            <span className="animate-bounce inline-block transform transition-transform duration-300 scale-x-[-1]"
              style={{
                animation: 'bounce 1s infinite, swim 2s infinite',
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

        <span className={`sr-only`}>
          {currentIndex + 1}/{totalItems}
        </span>
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
