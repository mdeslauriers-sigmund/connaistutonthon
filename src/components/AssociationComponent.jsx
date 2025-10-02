import { useState, useEffect } from 'react'
import { useThemeConfig } from '../hooks/useThemeConfig'
import ProgressBar from './ProgressBar'
import FishTransition from './FishTransition'

const AssociationComponent = ({ onComplete, currentIndex = 0, totalItems = 3, totalScore = 0, maxScore = 10 }) => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()
  const [selectedItems, setSelectedItems] = useState([])
  const [showResult, setShowResult] = useState(null)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [remainingAssociations, setRemainingAssociations] = useState(theme.content.association.associations)
  const [showFishTransition, setShowFishTransition] = useState(false)

  const totalAssociations = theme.content.association.associations.length

  const handleItemClick = (item) => {
    if (gameCompleted) return

    const newSelectedItems = [...selectedItems]
    const itemIndex = newSelectedItems.findIndex(selected => selected.id === item.id)

    if (itemIndex === -1) {
      // Ajouter l'item s'il n'est pas déjà sélectionné
      if (newSelectedItems.length < 2) {
        newSelectedItems.push(item)
        setSelectedItems(newSelectedItems)
      }
    } else {
      // Retirer l'item s'il est déjà sélectionné
      newSelectedItems.splice(itemIndex, 1)
      setSelectedItems(newSelectedItems)
    }
  }

  const checkAssociation = () => {
    if (selectedItems.length !== 2) return

    const [item1, item2] = selectedItems
    const association = remainingAssociations.find(assoc =>
      (assoc.item1.id === item1.id && assoc.item2.id === item2.id) ||
      (assoc.item1.id === item2.id && assoc.item2.id === item1.id)
    )

    const isCorrect = !!association
    setShowResult({
      items: selectedItems,
      isCorrect,
      explanation: association ? association.explanation : 'Cette association n\'est pas correcte.'
    })

    if (isCorrect) {
      setScore(score + 1)
      // Retirer les items associés de la liste
      const newRemainingAssociations = remainingAssociations.filter(assoc =>
        !((assoc.item1.id === item1.id && assoc.item2.id === item2.id) ||
          (assoc.item1.id === item2.id && assoc.item2.id === item1.id))
      )
      // Mettre à jour les associations disponibles
      setRemainingAssociations(newRemainingAssociations)
    }

    setSelectedItems([])

    // Vérifier si toutes les associations sont trouvées
    if (score + (isCorrect ? 1 : 0) >= totalAssociations) {
      setGameCompleted(true)
    }
  }

  const resetGame = () => {
    setSelectedItems([])
    setShowResult(null)
    setScore(0)
    setGameCompleted(false)
    setRemainingAssociations(theme.content.association.associations)
  }

  const getAvailableItems = () => {
    const usedItems = remainingAssociations.flatMap(assoc => [assoc.item1, assoc.item2])
    return theme.content.association.items.filter(item =>
      usedItems.some(used => used.id === item.id)
    )
  }

  const getColumnItems = () => {
    const availableItems = getAvailableItems()
    const column1 = availableItems.filter((_, index) => index % 2 === 0)
    const column2 = availableItems.filter((_, index) => index % 2 === 1)
    return { column1, column2 }
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
    id: 'association',
    title: theme.content.association.title,
    description: theme.content.association.subtitle,
    icon: '🔗'
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
        <h1 className={`text-4xl md:text-5xl max-w-3xl mx-auto font-normal mb-6 text-${getTextColor()} font-molle`}>
          {theme.content.association.title}
        </h1>
        <p className={`text-xl mb-8 max-w-3xl mx-auto text-${getTextSecondaryColor()}`}>
          {theme.content.association.subtitle}
        </p>
      </div>

      {/* Score et Progression */}
      <div className="text-center mb-8">
        <div className={`inline-block ${getCardClasses()} p-4`}>
          <p className={`text-lg font-semibold text-${getTextColor()}`}>
            Associations trouvées: {score}/{totalAssociations}
          </p>
        </div>
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

      {/* Items à associer */}
      <div className="mb-8">
        <h3 className={`text-xl font-bold mb-4 text-center text-${getTextColor()}`}>
          Cliquez sur deux éléments pour les associer
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Colonne 1 */}
          <div className="space-y-4">
            {getColumnItems().column1.map((item) => {
              const isSelected = selectedItems.some(selected => selected.id === item.id)
              return (
                <div
                  key={item.id}
                  className={`${getCardClasses()} p-6 text-center cursor-pointer hover:scale-105 transition-all duration-200 ${isSelected ? 'ring-4 ring-blue-400 bg-blue-100/20' : ''
                    }`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className={`text-base font-semibold text-${getTextColor()}`}>{item.name}</div>
                </div>
              )
            })}
          </div>

          {/* Colonne 2 */}
          <div className="space-y-4">
            {getColumnItems().column2.map((item) => {
              const isSelected = selectedItems.some(selected => selected.id === item.id)
              return (
                <div
                  key={item.id}
                  className={`${getCardClasses()} p-6 text-center cursor-pointer hover:scale-105 transition-all duration-200 ${isSelected ? 'ring-4 ring-blue-400 bg-blue-100/20' : ''
                    }`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className={`text-base font-semibold text-${getTextColor()}`}>{item.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="text-center">
        {gameCompleted ? (
          <div className="mb-6">
            <div className={`${getCardClasses()} p-6`}>
              <h3 className={`text-2xl font-bold mb-4 text-${getTextColor()}`}>
                🎉 Jeu terminé !
              </h3>
              <p className={`text-lg mb-4 text-${getTextSecondaryColor()}`}>
                Toutes les associations ont été trouvées !
              </p>
              <p className={`text-sm text-${getTextSecondaryColor()}`}>
                Passage automatique à l'activité suivante...
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className={`text-sm text-${getTextSecondaryColor()}`}>
              {selectedItems.length === 2 ? 'Cliquez sur "Vérifier" pour valider l\'association' : 'Sélectionnez deux éléments'}
            </p>
            <button
              onClick={checkAssociation}
              className={`${getButtonClasses()}`}
              disabled={selectedItems.length !== 2}
            >
              Vérifier l'association
            </button>
          </div>
        )}
      </div>

      {/* Animation de transition */}
      <FishTransition show={showFishTransition} />
    </div>
  )
}

export default AssociationComponent
