import { useState } from 'react'
import { Link } from 'react-router-dom'

const MigrationPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const questions = [
    {
      id: 0,
      season: 'été',
      correctAnswer: { x: 60, y: 40 },
      explanation: 'En été, le thon de l\'Atlantique se trouve dans les eaux plus froides du nord, près des côtes canadiennes et européennes, où la nourriture est abondante.',
      successMessage: 'Excellent ! En été, le thon migre vers les eaux plus froides du nord.',
      failureMessage: 'Pas tout à fait ! En été, le thon préfère les eaux plus fraîches du nord.'
    },
    {
      id: 1,
      season: 'hiver',
      correctAnswer: { x: 30, y: 60 },
      explanation: 'En hiver, le thon de l\'Atlantique migre vers les eaux plus chaudes du sud, près des Caraïbes et de l\'Afrique de l\'Ouest.',
      successMessage: 'Parfait ! En hiver, le thon se dirige vers les eaux plus chaudes du sud.',
      failureMessage: 'Pas correct ! En hiver, le thon migre vers les eaux plus chaudes du sud.'
    }
  ]

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
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedPoint(null)
    setShowResult(false)
    setScore(0)
  }

  const currentQ = questions[currentQuestion]
  const isCorrect = selectedPoint && Math.abs(selectedPoint.x - currentQ.correctAnswer.x) < 10 && Math.abs(selectedPoint.y - currentQ.correctAnswer.y) < 10

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Migration du Thon 🐟🌊
        </h1>
        <p className="text-xl text-wave-light mb-8 max-w-3xl mx-auto">
          Découvrez les mystères de la migration du thon de l'Atlantique à travers les saisons.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Question Panel */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Question {currentQuestion + 1}/2
            </h2>
            <p className="text-lg text-wave-light">
              Où se trouve le thon de l'Atlantique en <span className="font-bold text-tuna-light">{currentQ.season}</span> ?
            </p>
            <p className="text-sm text-wave-light mt-2">
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
            <div className="text-wave-light">
              Score: {score}/{questions.length}
            </div>
            {showResult && (
              <div className="space-x-2">
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className="bg-tuna-light hover:bg-tuna-blue text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Question suivante
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="text-white font-bold mb-2">Quiz terminé !</p>
                    <p className="text-wave-light mb-4">
                      Score final: {score}/{questions.length}
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="bg-tuna-light hover:bg-tuna-blue text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
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
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Carte de l'Atlantique
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
            <div className="absolute top-2 left-2 text-blue-200 text-xs font-bold">Nord</div>
            <div className="absolute bottom-2 left-2 text-blue-200 text-xs font-bold">Sud</div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-blue-200 text-xs font-bold">Europe</div>
            <div className="absolute top-2 right-2 text-blue-200 text-xs font-bold">Amérique</div>
            <div className="absolute bottom-2 right-2 text-blue-200 text-xs font-bold">Afrique</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 text-center">
        <Link 
          to="/activities" 
          className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 border border-white/20 mr-4"
        >
          ← Retour aux activités
        </Link>
        <Link 
          to="/" 
          className="inline-block bg-tuna-light hover:bg-tuna-blue text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
        >
          🏠 Accueil
        </Link>
      </div>
    </div>
  )
}

export default MigrationPage
