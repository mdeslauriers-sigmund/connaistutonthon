import { useState, useEffect } from 'react'
import { useThemeConfig } from '../hooks/useThemeConfig'
import { useAchievements } from '../contexts/AchievementContext'
import ProgressBar from './ProgressBar'
import FishTransition from './FishTransition'

const BucketComponent = ({ onComplete, currentIndex = 1, totalItems = 2, totalScore = 0, maxScore = 8 }) => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()
  const { unlockAchievement } = useAchievements()
  const [draggedItem, setDraggedItem] = useState(null)
  const [containers, setContainers] = useState({
    adults: [],
    young: []
  })
  const [showResult, setShowResult] = useState(null)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showFishTransition, setShowFishTransition] = useState(false)

  const foods = theme.content.bucket.foods
  const totalFoods = foods.length

  const handleDragStart = (e, food) => {
    setDraggedItem(food)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, category) => {
    e.preventDefault()

    if (!draggedItem) return

    const isCorrect = draggedItem.correctCategory === category
    const newContainers = { ...containers }

    // Retirer l'item de son ancien conteneur s'il y en a un
    Object.keys(newContainers).forEach(key => {
      newContainers[key] = newContainers[key].filter(item => item.id !== draggedItem.id)
    })

    // Ajouter l'item au nouveau conteneur
    newContainers[category].push(draggedItem)

    setContainers(newContainers)
    setShowResult({
      food: draggedItem,
      category,
      isCorrect,
      explanation: draggedItem.explanation
    })

    if (isCorrect) {
      setScore(score + 1)
    }

    setDraggedItem(null)

    // Vérifier automatiquement si tous les items sont placés
    const totalPlaced = newContainers.adults.length + newContainers.young.length
    if (totalPlaced === totalFoods) {
      setGameCompleted(true)

      // Débloquer l'achievement "Le Cocothon" si tous les items sont dans le même panier
      if (newContainers.adults.length === totalFoods || newContainers.young.length === totalFoods) {
        unlockAchievement('le_cocothon')
      }
    }
  }

  // Fonction supprimée - la vérification se fait automatiquement dans handleDrop

  const triggerAutoComplete = () => {
    // Attendre 3 secondes puis passer à l'activité suivante
    setTimeout(() => {
      onComplete(score)
    }, 3000)
  }

  const resetGame = () => {
    setContainers({ adults: [], young: [] })
    setShowResult(null)
    setScore(0)
    setGameCompleted(false)
  }

  const getRemainingFoods = () => {
    const placedItems = [...containers.adults, ...containers.young]
    return foods.filter(food => !placedItems.some(item => item.id === food.id))
  }

  // Déclencher le passage automatique quand le jeu est terminé
  useEffect(() => {
    if (gameCompleted) {
      // Afficher l'animation de poissons
      setShowFishTransition(true)

      // Attendre 3 secondes pour voir le résultat final
      const timer = setTimeout(() => {
        onComplete(score)
      }, 3000)

      return () => {
        clearTimeout(timer)
        setShowFishTransition(false)
      }
    }
  }, [gameCompleted, score, onComplete])

  const currentActivity = {
    id: 'bucket',
    title: theme.content.bucket.title,
    description: theme.content.bucket.subtitle,
    icon: '🍽️'
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
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-${getTextColor()} font-molle`}>
          {theme.content.bucket.title}
        </h1>
        <p className={`text-xl mb-8 max-w-3xl mx-auto text-${getTextSecondaryColor()}`}>
          {theme.content.bucket.subtitle}
        </p>
      </div>

      {/* Résultat */}
      {showResult && (
        <div className={`p-4 rounded-lg mb-6 mx-auto max-w-2xl ${showResult.isCorrect ? 'bg-green-500/20 border-green-500/50' : 'bg-red-500/20 border-red-500/50'} border`}>
          <div className="text-center">
            <div className="text-2xl mb-2">
              {showResult.isCorrect ? '🎉' : '❌'}
            </div>
            <p className={`font-bold ${showResult.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {showResult.isCorrect ? 'Correct !' : 'Incorrect !'}
            </p>
            <p className={`text-sm mt-2 text-${getTextSecondaryColor()}`}>
              {showResult.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Layout à 3 colonnes : Bucket Gauche | Aliments (Centre) | Bucket Droit */}
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 mb-8">
        {/* Conteneur Adultes (Gauche) */}
        <div
          className={`${getCardClasses()} min-h-[400px] transition-all duration-300 ${theme.content.bucket.containers.adults.color} bg-contain bg-no-repeat bg-bottom`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'adults')}
        >
          <div className="absolute inset-0 bg-contain bg-no-repeat bg-bottom opacity-40"
            style={{
              backgroundImage: `url(${theme.basketImage})`,
            }}></div>
          <div className="relative">
            <h3 className={`text-xl font-bold mb-4 text-center text-${getTextColor()}`}>
              {theme.content.bucket.containers.adults.title}
            </h3>
            <p className={`text-sm text-center mb-4 text-${getTextSecondaryColor()}`}>
              {theme.content.bucket.containers.adults.description}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {containers.adults.map((food) => (
                <div
                  key={food.id}
                  className={`${getCardClasses()} p-3 text-center`}
                >
                  <div className="text-2xl mb-1">{food.image}</div>
                  <div className={`text-xs text-${getTextColor()}`}>{food.name}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Aliments à classer (Centre) */}
        <div className="flex flex-col items-center justify-start min-w-[280px] max-w-[320px]">
          <h3 className={`text-xl font-bold mb-4 text-center text-${getTextColor()}`}>
            Aliments à classer
          </h3>
          <div className="grid grid-cols-2 gap-3 w-full">
            {getRemainingFoods().map((food) => (
              <div
                key={food.id}
                className={`${getCardClasses()} p-4 text-center cursor-move hover:scale-105 transition-transform`}
                draggable
                onDragStart={(e) => handleDragStart(e, food)}
              >
                <div className="text-3xl mb-2">{food.image}</div>
                <div className={`text-sm font-semibold text-${getTextColor()}`}>{food.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Conteneur Jeunes (Droit) */}
        <div
          className={`${getCardClasses()} min-h-[400px] transition-all duration-300 ${theme.content.bucket.containers.young.color}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'young')}
        >
          <div className="absolute inset-0 bg-contain bg-no-repeat bg-bottom opacity-40"
            style={{
              backgroundImage: `url(${theme.basketImage})`,
            }}></div>
          <div className="relative">
            <h3 className={`text-xl font-bold mb-4 text-center text-${getTextColor()}`}>
              {theme.content.bucket.containers.young.title}
            </h3>
            <p className={`text-sm text-center mb-4 text-${getTextSecondaryColor()}`}>
              {theme.content.bucket.containers.young.description}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {containers.young.map((food) => (
                <div
                  key={food.id}
                  className={`${getCardClasses()} p-3 text-center`}
                >
                  <div className="text-2xl mb-1">{food.image}</div>
                  <div className={`text-xs text-${getTextColor()}`}>{food.name}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Score (en bas) */}
      <div className="text-center mb-8">
        <div className={`inline-block ${getCardClasses()} px-6 py-3`}>
          <p className={`text-lg font-semibold text-${getTextColor()}`}>
            Score: {score}/{totalFoods}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="text-center">
        {gameCompleted && (
          <div className="mb-6">
            <div className={`${getCardClasses()} p-6`}>
              <h3 className={`text-2xl font-bold mb-4 text-${getTextColor()}`}>
                🎉 Jeu terminé !
              </h3>
              <p className={`text-lg mb-4 text-${getTextSecondaryColor()}`}>
                Score final: {score}/{totalFoods} ({Math.round((score / totalFoods) * 100)}%)
              </p>
              <p className={`text-sm text-${getTextSecondaryColor()}`}>
                Passage automatique à l'activité suivante...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Animation de transition */}
      <FishTransition show={showFishTransition} />
    </div>
  )
}

export default BucketComponent
