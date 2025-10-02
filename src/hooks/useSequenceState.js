import { useState, useEffect } from 'react'

export const useSequenceState = (activities, theme) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const [scores, setScores] = useState({})
  const [totalScore, setTotalScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showActivity, setShowActivity] = useState(false)

  const currentActivity = activities[currentActivityIndex]

  // Charger les scores depuis localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem('sequenceScores')
    if (savedScores) {
      const parsedScores = JSON.parse(savedScores)
      setScores(parsedScores)
      
      // Calculer le score total
      const total = Object.values(parsedScores).reduce((sum, score) => sum + (score || 0), 0)
      setTotalScore(total)
      
      // Vérifier si toutes les activités sont terminées
      const allCompleted = activities.every(activity => parsedScores[activity.id] !== undefined)
      if (allCompleted) {
        setIsCompleted(true)
      }
    }
  }, [activities])

  // Sauvegarder les scores dans localStorage
  const saveScore = (activityId, score) => {
    const newScores = { ...scores, [activityId]: score }
    setScores(newScores)
    localStorage.setItem('sequenceScores', JSON.stringify(newScores))
    
    // Calculer le nouveau score total
    const total = Object.values(newScores).reduce((sum, score) => sum + (score || 0), 0)
    setTotalScore(total)
  }

  const handleStartActivity = () => {
    setShowActivity(true)
  }

  // Lancer automatiquement les activités
  useEffect(() => {
    if (!showActivity && !isCompleted) {
      setShowActivity(true)
    }
  }, [currentActivityIndex, showActivity, isCompleted])

  const handleActivityComplete = (score) => {
    saveScore(currentActivity.id, score)
    setShowActivity(false)
    // Passer directement à l'activité suivante sans étape intermédiaire
    if (currentActivityIndex < activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1)
    } else {
      // Toutes les activités sont terminées
      setIsCompleted(true)
    }
  }

  const handleNextActivity = () => {
    if (currentActivityIndex < activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1)
    } else {
      // Toutes les activités sont terminées
      setIsCompleted(true)
    }
  }

  const handleRestartSequence = () => {
    setScores({})
    setTotalScore(0)
    setCurrentActivityIndex(0)
    setIsCompleted(false)
    setShowActivity(false)
    localStorage.removeItem('sequenceScores')
  }

  const resetSequence = () => {
    setScores({})
    setTotalScore(0)
    setCurrentActivityIndex(0)
    setIsCompleted(false)
    setShowActivity(false)
    localStorage.removeItem('sequenceScores')
  }

  const getScoreMessage = () => {
    const percentage = (totalScore / theme.content.sequence.conclusion.totalMaxScore) * 100
    
    if (percentage >= 100) return theme.content.sequence.conclusion.messages.perfect
    if (percentage >= 80) return theme.content.sequence.conclusion.messages.excellent
    if (percentage >= 60) return theme.content.sequence.conclusion.messages.good
    if (percentage >= 40) return theme.content.sequence.conclusion.messages.average
    return theme.content.sequence.conclusion.messages.needsImprovement
  }

  return {
    // State
    currentActivityIndex,
    scores,
    totalScore,
    isCompleted,
    showActivity,
    currentActivity,
    // Actions
    handleStartActivity,
    handleActivityComplete,
    handleNextActivity,
    handleRestartSequence,
    resetSequence,
    getScoreMessage,
  }
}

