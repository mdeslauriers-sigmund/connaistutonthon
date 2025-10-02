import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useThemeConfig } from '../hooks/useThemeConfig'
import WorldMap from '../components/WorldMap'

const MigrationPage = () => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedArea, setSelectedArea] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const questions = theme.content.migration.questions

  const handleAreaSelect = (areaId) => {
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
      // Quiz terminé, envoyer le score
      const event = new CustomEvent('scoreUpdate', {
        detail: { activityId: 'migration', score: score }
      })
      window.dispatchEvent(event)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedArea(null)
    setShowResult(false)
    setScore(0)
  }

  const currentQ = questions[currentQuestion]
  const isCorrect = selectedArea && selectedArea === currentQ.correctAnswer.area

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    <button
                      onClick={resetQuiz}
                      className={`${getButtonClasses()} py-2 px-4 text-sm`}
                    >
                      Recommencer
                    </button>
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
            <WorldMap
              selectedArea={selectedArea}
              onAreaSelect={handleAreaSelect}
              showResult={showResult}
              correctArea={currentQ.correctAnswer.area}
              isCorrect={isCorrect}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 text-center">
        <Link
          to="/activities"
          className={`inline-block mr-4 ${getButtonClasses('secondary')}`}
        >
          ← Retour aux activités
        </Link>
        <Link
          to="/"
          className={`inline-block ${getButtonClasses()}`}
        >
          🏠 Accueil
        </Link>
      </div>
    </div>
  )
}

export default MigrationPage
