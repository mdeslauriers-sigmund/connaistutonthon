/**
 * AchievementManager - Manages user achievements and badges
 * 
 * Features:
 * - Predefined list of achievements
 * - Local storage persistence
 * - Achievement unlock tracking
 * - Event callbacks for toast notifications
 */

// Predefined list of achievements
export const ACHIEVEMENTS = {
  FIRST_STEPS: {
    id: 'first_steps',
    title: 'Premiers pas',
    description: 'Complétez votre première activité',
    icon: '👣',
    category: 'progress'
  },
  MIGRATION_MASTER: {
    id: 'migration_master',
    title: 'Expert en Migration',
    description: 'Score parfait sur l\'activité Migration',
    icon: '🌊',
    category: 'mastery'
  },
  BUCKET_MASTER: {
    id: 'bucket_master',
    title: 'Expert en Alimentation',
    description: 'Score parfait sur l\'activité Bucket',
    icon: '🍽️',
    category: 'mastery'
  },
  SEQUENCE_COMPLETE: {
    id: 'sequence_complete',
    title: 'Séquence terminée',
    description: 'Complétez toute la séquence d\'apprentissage',
    icon: '🎓',
    category: 'completion'
  },
  PERFECTIONIST: {
    id: 'perfectionist',
    title: 'Perfectionniste',
    description: 'Score parfait sur toute la séquence',
    icon: '⭐',
    category: 'mastery'
  },
  DEDICATED_LEARNER: {
    id: 'dedicated_learner',
    title: 'Apprenant dévoué',
    description: 'Recommencez la séquence pour améliorer votre score',
    icon: '🔄',
    category: 'dedication'
  },
  THEME_EXPLORER: {
    id: 'theme_explorer',
    title: 'Explorateur de thèmes',
    description: 'Changez de thème visuel',
    icon: '🎨',
    category: 'exploration'
  },
  BIG_IN_JAPAN: {
    id: 'big_in_japan',
    title: 'Big in Japan',
    description: 'Objectif caché',
    icon: '⛩️',
    category: 'exploration',
    hidden: true
  },
  QUICK_LEARNER: {
    id: 'quick_learner',
    title: 'Apprenant rapide',
    description: 'Complétez une activité sans erreur du premier coup',
    icon: '⚡',
    category: 'speed'
  }
}

class AchievementManager {
  constructor() {
    this.storageKey = 'userAchievements'
    this.listeners = []
    this.loadAchievements()
  }

  /**
   * Load achievements from localStorage
   */
  loadAchievements() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      this.unlockedAchievements = stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading achievements:', error)
      this.unlockedAchievements = {}
    }
  }

  /**
   * Save achievements to localStorage
   */
  saveAchievements() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.unlockedAchievements))
    } catch (error) {
      console.error('Error saving achievements:', error)
    }
  }

  /**
   * Check if an achievement is unlocked
   * @param {string} achievementId - The achievement ID to check
   * @returns {boolean} - Whether the achievement is unlocked
   */
  isUnlocked(achievementId) {
    return !!this.unlockedAchievements[achievementId]
  }

  /**
   * Unlock an achievement
   * @param {string} achievementId - The achievement ID to unlock
   * @returns {boolean} - Whether the achievement was newly unlocked (false if already unlocked)
   */
  unlock(achievementId) {
    // Check if achievement exists
    const achievement = Object.values(ACHIEVEMENTS).find(a => a.id === achievementId)
    if (!achievement) {
      console.warn(`Achievement ${achievementId} not found`)
      return false
    }

    // Check if already unlocked
    if (this.isUnlocked(achievementId)) {
      return false
    }

    // Unlock the achievement
    this.unlockedAchievements[achievementId] = {
      unlockedAt: new Date().toISOString(),
      achievement
    }

    this.saveAchievements()

    // Notify listeners
    this.notifyListeners(achievement)

    return true
  }

  /**
   * Get all unlocked achievements
   * @returns {Array} - Array of unlocked achievements with metadata
   */
  getUnlockedAchievements() {
    return Object.values(this.unlockedAchievements)
  }

  /**
   * Get achievement progress
   * @returns {Object} - Object with total, unlocked, and percentage
   */
  getProgress() {
    const total = Object.keys(ACHIEVEMENTS).length
    const unlocked = Object.keys(this.unlockedAchievements).length
    const percentage = Math.round((unlocked / total) * 100)

    return { total, unlocked, percentage }
  }

  /**
   * Register a listener for achievement unlocks
   * @param {Function} callback - Callback function that receives the achievement
   */
  addListener(callback) {
    this.listeners.push(callback)
  }

  /**
   * Unregister a listener
   * @param {Function} callback - The callback function to remove
   */
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback)
  }

  /**
   * Notify all listeners of an achievement unlock
   * @param {Object} achievement - The achievement that was unlocked
   */
  notifyListeners(achievement) {
    this.listeners.forEach(callback => {
      try {
        callback(achievement)
      } catch (error) {
        console.error('Error in achievement listener:', error)
      }
    })
  }

  /**
   * Reset all achievements (useful for testing)
   */
  resetAll() {
    this.unlockedAchievements = {}
    this.saveAchievements()
  }

  /**
   * Get all available achievements
   * @returns {Array} - Array of all achievements
   */
  getAllAchievements() {
    return Object.values(ACHIEVEMENTS).sort((a, b) => a.hidden ? 1 : b.hidden ? -1 : 0)
  }

  /**
   * Check and unlock achievements based on activity completion
   * @param {string} activityId - The activity ID
   * @param {number} score - The score achieved
   * @param {number} maxScore - The maximum possible score
   * @param {boolean} isFirstAttempt - Whether this is the first attempt
   */
  checkActivityCompletion(activityId, score, maxScore, isFirstAttempt = true) {
    // First activity completion
    if (!this.isUnlocked(ACHIEVEMENTS.FIRST_STEPS.id)) {
      this.unlock(ACHIEVEMENTS.FIRST_STEPS.id)
    }

    // Perfect score achievements
    if (score === maxScore) {
      if (activityId === 'migration') {
        this.unlock(ACHIEVEMENTS.MIGRATION_MASTER.id)
      } else if (activityId === 'bucket') {
        this.unlock(ACHIEVEMENTS.BUCKET_MASTER.id)
      }

      // Quick learner (perfect on first try)
      if (isFirstAttempt) {
        this.unlock(ACHIEVEMENTS.QUICK_LEARNER.id)
      }
    }
  }

  /**
   * Check and unlock achievements based on sequence completion
   * @param {number} totalScore - The total score achieved
   * @param {number} maxScore - The maximum possible score
   * @param {boolean} isRetry - Whether this is a retry
   */
  checkSequenceCompletion(totalScore, maxScore, isRetry = false) {
    // Sequence completion
    this.unlock(ACHIEVEMENTS.SEQUENCE_COMPLETE.id)

    // Perfect sequence
    if (totalScore === maxScore) {
      this.unlock(ACHIEVEMENTS.PERFECTIONIST.id)
    }

    // Dedicated learner (retry achievement)
    if (isRetry) {
      this.unlock(ACHIEVEMENTS.DEDICATED_LEARNER.id)
    }
  }

  /**
   * Check and unlock theme change achievement
   */
  checkThemeChange() {
    this.unlock(ACHIEVEMENTS.THEME_EXPLORER.id)
  }

  checkBigInJapan(areaId) {
    if(areaId === 'japan') {
      this.unlock(ACHIEVEMENTS.BIG_IN_JAPAN.id)
    }
  } 
}

// Export singleton instance
export const achievementManager = new AchievementManager()

