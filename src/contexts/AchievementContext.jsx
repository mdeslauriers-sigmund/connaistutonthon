import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { achievementManager } from '../utils/achievementManager'
import Toast from '../components/Toast'

/**
 * AchievementContext - Provides achievement functionality throughout the app
 */
const AchievementContext = createContext(null)

export const AchievementProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const [achievements, setAchievements] = useState(achievementManager.getUnlockedAchievements())

  // Handle achievement unlock and show toast
  const handleAchievementUnlock = useCallback((achievement) => {
    // Add toast notification
    const toastId = Date.now()
    setToasts(prev => [...prev, {
      id: toastId,
      achievement
    }])

    // Update achievements list
    setAchievements(achievementManager.getUnlockedAchievements())
  }, [])

  // Register listener on mount
  useEffect(() => {
    achievementManager.addListener(handleAchievementUnlock)
    
    return () => {
      achievementManager.removeListener(handleAchievementUnlock)
    }
  }, [handleAchievementUnlock])

  // Remove toast
  const removeToast = useCallback((toastId) => {
    setToasts(prev => prev.filter(toast => toast.id !== toastId))
  }, [])

  // Unlock achievement (wrapper)
  const unlockAchievement = useCallback((achievementId) => {
    return achievementManager.unlock(achievementId)
  }, [])

  // Check if achievement is unlocked
  const isAchievementUnlocked = useCallback((achievementId) => {
    return achievementManager.isUnlocked(achievementId)
  }, [])

  // Get all achievements
  const getAllAchievements = useCallback(() => {
    return achievementManager.getAllAchievements()
  }, [])

  // Get unlocked achievements
  const getUnlockedAchievements = useCallback(() => {
    return achievements
  }, [achievements])

  // Get achievement progress
  const getProgress = useCallback(() => {
    return achievementManager.getProgress()
  }, [])

  // Check activity completion
  const checkActivityCompletion = useCallback((activityId, score, maxScore, isFirstAttempt = true) => {
    achievementManager.checkActivityCompletion(activityId, score, maxScore, isFirstAttempt)
  }, [])

  // Check sequence completion
  const checkSequenceCompletion = useCallback((totalScore, maxScore, isRetry = false) => {
    achievementManager.checkSequenceCompletion(totalScore, maxScore, isRetry)
  }, [])

  // Check theme change
  const checkThemeChange = useCallback(() => {
    achievementManager.checkThemeChange()
  }, [])

  // Reset all achievements (for testing)
  const resetAchievements = useCallback(() => {
    achievementManager.resetAll()
    setAchievements([])
  }, [])

  const value = {
    unlockAchievement,
    isAchievementUnlocked,
    getAllAchievements,
    getUnlockedAchievements,
    getProgress,
    checkActivityCompletion,
    checkSequenceCompletion,
    checkThemeChange,
    resetAchievements
  }

  return (
    <AchievementContext.Provider value={value}>
      {children}
      
      {/* Render toasts */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={`${toast.achievement.title} - ${toast.achievement.description}`}
          icon={toast.achievement.icon}
          onClose={() => removeToast(toast.id)}
          type="achievement"
        />
      ))}
    </AchievementContext.Provider>
  )
}

/**
 * Hook to use achievement context
 */
export const useAchievements = () => {
  const context = useContext(AchievementContext)
  if (!context) {
    throw new Error('useAchievements must be used within AchievementProvider')
  }
  return context
}

