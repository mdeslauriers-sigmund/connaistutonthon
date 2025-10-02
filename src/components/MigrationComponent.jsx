import { useState, useEffect } from 'react'
import { useThemeConfig } from '../hooks/useThemeConfig'
import WorldMap from './WorldMap'
import ProgressBar from './ProgressBar'
import FishTransition from './FishTransition'
import { useAchievements } from '../contexts/AchievementContext'

const MigrationComponent = ({ onComplete, currentIndex = 0, totalItems = 2, totalScore = 0, maxScore = 8 }) => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedArea, setSelectedArea] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showFishTransition, setShowFishTransition] = useState(false)
  const { checkBigInJapan } = useAchievements()

  const questions = theme.content.migration.questions

  const handleAreaSelect = (areaId) => {
    // objectif caché
    checkBigInJapan(areaId);
    if (areaId === 'japan') return;

    if (showResult) return

    setSelectedArea(areaId)
    setShowResult(true)

    const currentQ = questions[currentQuestion]
    const isCorrect = areaId === currentQ.correctAnswer.area

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedArea(null)
      setShowResult(false)
    } else {
      // Quiz terminé, déclencher le passage automatique
      triggerAutoComplete()
    }
  }

  const triggerAutoComplete = () => {
    // Attendre 2 secondes puis passer à l'activité suivante
    setTimeout(() => {
      onComplete(score)
    }, 3000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedArea(null)
    setShowResult(false)
    setScore(0)
  }

  const currentQ = questions[currentQuestion]
  const isCorrect = selectedArea && selectedArea === currentQ.correctAnswer.area

  // Déclencher le passage automatique quand on arrive à la dernière question
  useEffect(() => {
    if (currentQuestion === questions.length - 1 && showResult) {
      // Afficher l'animation de poissons
      setShowFishTransition(true)

      // Attendre 3 secondes pour la dernière question (plus de temps pour voir le résultat)
      const timer = setTimeout(() => {
        onComplete(score)
      }, 3000)

      return () => {
        clearTimeout(timer)
        setShowFishTransition(false)
      }
    }
  }, [currentQuestion, showResult, score, onComplete])

  const currentActivity = {
    id: 'migration',
    title: theme.content.migration.title,
    description: theme.content.migration.subtitle,
    icon: '🌊'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
      {/* ProgressBar */}
      <ProgressBar
        currentIndex={currentIndex}
        totalItems={totalItems}
        currentActivity={currentActivity}
        totalScore={totalScore}
        maxScore={maxScore}
      />

      <div className="text-center mb-8">
        <h1 className={`text-4xl md:text-5xl font-normal max-w-3xl mx-auto mb-6 text-${getTextColor()} font-molle`}>
          {theme.content.migration.title}
        </h1>
        <p className={`text-xl mb-8 max-w-3xl mx-auto text-${getTextSecondaryColor()}`}>
          {theme.content.migration.subtitle}
        </p>
      </div>

      {/* Unified Question + Map Panel */}
      <div className={`${getCardClasses()} relative`}>
        {/* Question Header */}
        <div className="text-center mb-4">
          <h2 className={`text-2xl font-bold mb-2 text-${getTextColor()}`}>
            Question {currentQuestion + 1}/{questions.length}
          </h2>
          <p className={`text-lg text-${getTextSecondaryColor()}`}>
            Où se trouve {theme.name === 'Thon' ? 'le thon de l\'Atlantique' : 'les taons'} en <span className={`font-bold text-${theme.colors.primary}`}>{currentQ.season}</span> ?
          </p>
          <p className={`text-sm text-${getTextSecondaryColor()} mt-1`}>
            Cliquez sur la carte pour sélectionner votre réponse
          </p>
        </div>

        {/* Map with overlayed result */}
        <div className="relative">
          <div className="relative bg-gradient-to-b from-blue-900 to-blue-800 rounded-lg overflow-hidden min-h-[400px] border-2 border-blue-300/30">
            <WorldMap
              selectedArea={selectedArea}
              onAreaSelect={handleAreaSelect}
              showResult={showResult}
              correctArea={currentQ.correctAnswer.area}
              isCorrect={isCorrect}
              theme={theme}
            />

            {/* Result Overlay */}
            {showResult && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 pointer-events-none">
                <div className={`pointer-events-auto max-w-lg w-full p-6 rounded-xl ${isCorrect ? 'bg-green-500/95 border-green-300' : 'bg-red-500/95 border-red-300'} border-2 shadow-2xl`}>
                  <div className="text-center text-white">
                    <div className="text-4xl mb-3">
                      {isCorrect ? '🎉' : '⚠'}
                    </div>
                    <p className="font-bold text-xl mb-3">
                      {isCorrect ? currentQ.successMessage : currentQ.failureMessage}
                    </p>
                    <p className="text-sm mb-4 opacity-90">
                      {currentQ.explanation}
                    </p>
                    {currentQuestion < questions.length - 1 ? (
                      <button
                        onClick={nextQuestion}
                        className="bg-white text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Question suivante →
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <p className="font-bold text-lg">Quiz terminé !</p>
                        <p className="text-sm opacity-90">
                          Score final: {score}/{questions.length}
                        </p>
                        <p className="text-xs opacity-75 mt-2">
                          Passage automatique à l'activité suivante...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Score Footer */}
        <div className="flex justify-between items-center mt-4">
          <div className={`text-${getTextSecondaryColor()} font-semibold`}>
            Score: {score}/{questions.length}
          </div>
          <div className={`text-${getTextSecondaryColor()} text-sm`}>
            {theme.content.migration.mapTitle}
          </div>
        </div>
      </div>

      {/* Animation de transition */}
      <FishTransition show={showFishTransition} />
    </div>
  )
}

export default MigrationComponent
