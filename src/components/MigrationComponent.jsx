import { useState, useEffect } from 'react'
import { useThemeConfig } from '../hooks/useThemeConfig'
import ProgressBar from './ProgressBar'

const MigrationComponent = ({ onComplete, currentIndex = 0, totalItems = 2, totalScore = 0, maxScore = 8 }) => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const questions = theme.content.migration.questions

  const handlePointClick = (x, y) => {
    if (showResult) return
    
    setSelectedPoint({ x, y })
    setShowResult(true)
    
    const currentQ = questions[currentQuestion]
    const isCorrect = Math.abs(x - currentQ.correctAnswer.x) < 10 && Math.abs(y - currentQ.correctAnswer.y) < 10
    
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedPoint(null)
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
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedPoint(null)
    setShowResult(false)
    setScore(0)
  }

  const currentQ = questions[currentQuestion]
  const isCorrect = selectedPoint && Math.abs(selectedPoint.x - currentQ.correctAnswer.x) < 10 && Math.abs(selectedPoint.y - currentQ.correctAnswer.y) < 10

  // Déclencher le passage automatique quand on arrive à la dernière question
  useEffect(() => {
    if (currentQuestion === questions.length - 1 && showResult) {
      // Attendre 3 secondes pour la dernière question (plus de temps pour voir le résultat)
      const timer = setTimeout(() => {
        onComplete(score)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [currentQuestion, showResult, score, onComplete])

  const currentActivity = {
    id: 'migration',
    title: theme.content.migration.title,
    description: theme.content.migration.subtitle,
    icon: '🌊'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ProgressBar */}
      <ProgressBar 
        currentIndex={currentIndex}
        totalItems={totalItems}
        currentActivity={currentActivity}
        totalScore={totalScore}
        maxScore={maxScore}
      />

      <div className="text-center mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-${getTextColor()}`}>
          {theme.content.migration.title}
        </h1>
        <p className={`text-xl mb-8 max-w-3xl mx-auto text-${getTextSecondaryColor()}`}>
          {theme.content.migration.subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Question Panel */}
        <div className={`${getCardClasses()}`}>
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold mb-4 text-${getTextColor()}`}>
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <p className={`text-lg text-${getTextSecondaryColor()}`}>
              Où se trouve {theme.name === 'Thon' ? 'le thon de l\'Atlantique' : 'les taons'} en <span className={`font-bold text-${theme.colors.primary}`}>{currentQ.season}</span> ?
            </p>
            <p className={`text-sm text-${getTextSecondaryColor()} mt-2`}>
              Cliquez sur la carte pour sélectionner votre réponse
            </p>
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-500/20 border-green-500/50' : 'bg-red-500/20 border-red-500/50'} border`}>
              <div className="text-center">
                <div className="text-2xl mb-2">
                  {isCorrect ? '🎉' : '❌'}
                </div>
                <p className={`font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                  {isCorrect ? currentQ.successMessage : currentQ.failureMessage}
                </p>
                <p className="text-wave-light text-sm mt-2">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className={`text-${getTextSecondaryColor()}`}>
              Score: {score}/{questions.length}
            </div>
            {showResult && (
              <div className="space-x-2">
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className={`${getButtonClasses()} py-2 px-4 text-sm`}
                  >
                    Question suivante
                  </button>
                ) : (
                  <div className="text-center">
                    <p className={`font-bold mb-2 text-${getTextColor()}`}>Quiz terminé !</p>
                    <p className={`mb-4 text-${getTextSecondaryColor()}`}>
                      Score final: {score}/{questions.length}
                    </p>
                    <p className={`text-sm text-${getTextSecondaryColor()}`}>
                      Passage automatique à l'activité suivante...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Map Panel */}
        <div className={`${getCardClasses()}`}>
          <h3 className={`text-xl font-bold mb-4 text-center text-${getTextColor()}`}>
            {theme.content.migration.mapTitle}
          </h3>
          <div className="relative bg-gradient-to-b from-blue-900 to-blue-800 rounded-lg p-4 min-h-[400px] border-2 border-blue-300/30">
            {/* Map Grid */}
            <div className="absolute inset-4 grid grid-cols-10 grid-rows-10 gap-1">
              {Array.from({ length: 100 }).map((_, index) => {
                const x = (index % 10) * 10
                const y = Math.floor(index / 10) * 10
                const isSelected = selectedPoint && selectedPoint.x === x && selectedPoint.y === y
                const isCorrectPoint = currentQ.correctAnswer.x === x && currentQ.correctAnswer.y === y
                
                return (
                  <div
                    key={index}
                    className={`
                      border border-blue-400/30 cursor-pointer transition-all duration-200 hover:bg-blue-300/20
                      ${isSelected ? 'bg-tuna-light' : ''}
                      ${showResult && isCorrectPoint ? 'bg-green-400' : ''}
                      ${showResult && isSelected && !isCorrect ? 'bg-red-400' : ''}
                    `}
                    onClick={() => handlePointClick(x, y)}
                    style={{ minHeight: '20px' }}
                  />
                )
              })}
            </div>
            
            {/* Map Labels */}
            <div className="absolute top-2 left-2 text-blue-200 text-xs font-bold">{theme.content.migration.mapLabels.north}</div>
            <div className="absolute bottom-2 left-2 text-blue-200 text-xs font-bold">{theme.content.migration.mapLabels.south}</div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-blue-200 text-xs font-bold">{theme.content.migration.mapLabels.europe}</div>
            <div className="absolute top-2 right-2 text-blue-200 text-xs font-bold">{theme.content.migration.mapLabels.america}</div>
            <div className="absolute bottom-2 right-2 text-blue-200 text-xs font-bold">{theme.content.migration.mapLabels.africa}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MigrationComponent
