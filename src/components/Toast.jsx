import { useState, useEffect } from 'react'

/**
 * Toast Component - Displays temporary notification messages
 * Used primarily for achievement unlocks
 */
const Toast = ({ message, icon, onClose, duration = 3000, type = 'achievement' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entry animation
    setTimeout(() => setIsVisible(true), 10)

    // Start exit animation before actual removal
    const exitTimer = setTimeout(() => {
      setIsLeaving(true)
    }, duration - 300)

    // Remove toast
    const removeTimer = setTimeout(() => {
      onClose()
    }, duration)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [duration, onClose])

  const getTypeStyles = () => {
    switch (type) {
      case 'achievement':
        return 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-pink-500'
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600'
    }
  }

  return (
    <div
      className={`
        fixed top-20 right-4 z-50
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`
        ${getTypeStyles()}
        text-white px-6 py-4 rounded-lg shadow-2xl
        flex items-center gap-4 min-w-[300px] max-w-[400px]
        border-2 border-white/30
      `}>
        {icon && (
          <div className="text-4xl flex-shrink-0 animate-bounce">
            {icon}
          </div>
        )}
        <div className="flex-1">
          {type === 'achievement' && (
            <div className="text-sm font-bold uppercase tracking-wider mb-1">
              Achievement Unlocked!
            </div>
          )}
          <div className="font-medium">
            {message}
          </div>
        </div>
        <button
          onClick={() => {
            setIsLeaving(true)
            setTimeout(onClose, 300)
          }}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default Toast

