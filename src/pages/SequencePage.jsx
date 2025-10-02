import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useThemeConfig } from '../hooks/useThemeConfig'
import MigrationComponent from '../components/MigrationComponent'
import BucketComponent from '../components/BucketComponent'
import ProgressBar from '../components/ProgressBar'

const SequencePage = () => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const [scores, setScores] = useState({})
  const [totalScore, setTotalScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showActivity, setShowActivity] = useState(false)

  const activities = theme.content.sequence.activities
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

  const handleActivityComplete = (score) => {
    saveScore(currentActivity.id, score)
    setShowActivity(false)
    handleNextActivity()
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

  const getScoreMessage = () => {
    const percentage = (totalScore / theme.content.sequence.conclusion.totalMaxScore) * 100
    
    if (percentage >= 100) return theme.content.sequence.conclusion.messages.perfect
    if (percentage >= 80) return theme.content.sequence.conclusion.messages.excellent
    if (percentage >= 60) return theme.content.sequence.conclusion.messages.good
    if (percentage >= 40) return theme.content.sequence.conclusion.messages.average
    return theme.content.sequence.conclusion.messages.needsImprovement
  }

  // Afficher l'activité en cours
  if (showActivity) {
    if (currentActivity.id === 'migration') {
      return (
        <MigrationComponent 
          onComplete={handleActivityComplete}
          currentIndex={currentActivityIndex}
          totalItems={activities.length}
          totalScore={totalScore}
          maxScore={theme.content.sequence.conclusion.totalMaxScore}
        />
      )
    } else if (currentActivity.id === 'bucket') {
      return (
        <BucketComponent 
          onComplete={handleActivityComplete}
          currentIndex={currentActivityIndex}
          totalItems={activities.length}
          totalScore={totalScore}
          maxScore={theme.content.sequence.conclusion.totalMaxScore}
        />
      )
    }
  }

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-${getTextColor()}`}>
            {theme.content.sequence.conclusion.title}
          </h1>
          <p className={`text-xl mb-8 text-${getTextSecondaryColor()}`}>
            {theme.content.sequence.conclusion.subtitle}
          </p>

          {/* Score Total */}
          <div className={`${getCardClasses()} mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 text-${getTextColor()}`}>
              Score Final
            </h2>
            <div className="text-4xl font-bold mb-4">
              {totalScore}/{theme.content.sequence.conclusion.totalMaxScore}
            </div>
            <div className="text-lg mb-4">
              {Math.round((totalScore / theme.content.sequence.conclusion.totalMaxScore) * 100)}%
            </div>
            <p className={`text-lg text-${getTextSecondaryColor()}`}>
              {getScoreMessage()}
            </p>
          </div>

          {/* Détail des Scores */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {activities.map((activity) => (
              <div key={activity.id} className={`${getCardClasses()}`}>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{activity.icon}</span>
                  <div>
                    <h3 className={`text-lg font-semibold text-${getTextColor()}`}>
                      {activity.title}
                    </h3>
                    <p className={`text-sm text-${getTextSecondaryColor()}`}>
                      {activity.description}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {scores[activity.id] || 0}/{activity.maxScore}
                  </div>
                  <div className="text-sm">
                    {Math.round(((scores[activity.id] || 0) / activity.maxScore) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-x-4">
            <button
              onClick={handleRestartSequence}
              className={`${getButtonClasses()}`}
            >
              Recommencer la Séquence
            </button>
            <Link 
              to="/activities" 
              className={`inline-block ${getButtonClasses('secondary')}`}
            >
              Retour aux Activités
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-${getTextColor()}`}>
          {theme.content.sequence.title}
        </h1>
        <p className={`text-xl mb-8 text-${getTextSecondaryColor()}`}>
          {theme.content.sequence.subtitle}
        </p>
      </div>

      {/* Progression */}
      <ProgressBar 
        currentIndex={currentActivityIndex}
        totalItems={activities.length}
        currentActivity={currentActivity}
        totalScore={totalScore}
        maxScore={theme.content.sequence.conclusion.totalMaxScore}
      />

      {/* Activité Actuelle */}
      <div className={`${getCardClasses()} mb-8`}>
        <div className="text-center">
          <div className="text-6xl mb-4">{currentActivity.icon}</div>
          <h2 className={`text-2xl font-bold mb-4 text-${getTextColor()}`}>
            {currentActivity.title}
          </h2>
          <p className={`text-lg mb-6 text-${getTextSecondaryColor()}`}>
            {currentActivity.description}
          </p>
          
          {scores[currentActivity.id] !== undefined ? (
            <div className="mb-6">
              <div className={`text-xl font-bold mb-2 ${scores[currentActivity.id] === currentActivity.maxScore ? 'text-green-500' : 'text-yellow-500'}`}>
                Score: {scores[currentActivity.id]}/{currentActivity.maxScore}
              </div>
              <button
                onClick={handleNextActivity}
                className={`${getButtonClasses()}`}
              >
                {currentActivityIndex < activities.length - 1 ? 'Activité Suivante' : 'Voir les Résultats'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleStartActivity}
              className={`${getButtonClasses()}`}
            >
              Commencer l'Activité
            </button>
          )}
        </div>
      </div>

      {/* Liste des Activités */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className={`${getCardClasses()} ${
              index === currentActivityIndex ? 'ring-2 ring-blue-500' : ''
            } ${
              scores[activity.id] !== undefined ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{activity.icon}</span>
              <div>
                <h3 className={`text-lg font-semibold text-${getTextColor()}`}>
                  {activity.title}
                </h3>
                <p className={`text-sm text-${getTextSecondaryColor()}`}>
                  {activity.description}
                </p>
              </div>
            </div>
            
            {scores[activity.id] !== undefined ? (
              <div className="text-center">
                <div className={`text-lg font-bold ${
                  scores[activity.id] === activity.maxScore ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  ✓ {scores[activity.id]}/{activity.maxScore}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className={`text-sm text-${getTextSecondaryColor()}`}>
                  {index === currentActivityIndex ? 'En cours...' : 'En attente'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="text-center">
        <Link 
          to="/activities" 
          className={`inline-block ${getButtonClasses('secondary')}`}
        >
          ← Retour aux activités
        </Link>
      </div>
    </div>
  )
}

export default SequencePage
