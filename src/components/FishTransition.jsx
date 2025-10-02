import { useEffect, useState } from 'react'
import { useThemeConfig } from '../hooks/useThemeConfig'
import './FishTransition.css'

const FishTransition = ({ show }) => {
  const { theme } = useThemeConfig()
  const [fishes, setFishes] = useState([])

  useEffect(() => {
    if (show) {
      // Générer 100-140 poissons avec des positions et vitesses aléatoires
      const fishCount = Math.floor(Math.random() * 41) + 100 // 100 à 140 poissons
      const newFishes = Array.from({ length: fishCount }, (_, i) => ({
        id: i,
        icon: theme.icon,
        top: Math.random() * 90 + 5, // Entre 5% et 95% de la hauteur
        delay: Math.random() * 2.5, // Délai entre 0 et 2.5s
        duration: Math.random() * 2 + 1.5, // Durée entre 1.5 et 3.5s
        size: Math.random() * 1.2 + 0.8 // Taille entre 0.8x et 2x
      }))
      setFishes(newFishes)
    } else {
      setFishes([])
    }
  }, [show, theme.icon])

  if (!show) return null

  return (
    <div className="fish-transition-container">
      {fishes.map((fish) => (
        <div
          key={fish.id}
          className="fish"
          style={{
            top: `${fish.top}%`,
            animationDelay: `${fish.delay}s`,
            animationDuration: `${fish.duration}s`,
            fontSize: `${fish.size}rem`
          }}
        >
          {fish.icon}
        </div>
      ))}
    </div>
  )
}

export default FishTransition
