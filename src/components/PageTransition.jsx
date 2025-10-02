import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children }) => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('fadeIn')

  useEffect(() => {
    if (location !== displayLocation) {
      // Déterminer la direction de navigation
      const isNavigatingToHome = location.pathname === '/' || location.pathname === '/connaistutonthon/'
      const transitionOut = isNavigatingToHome ? 'slideOutLeft' : 'fadeOut'
      setTransitionStage(transitionOut)
    }
  }, [location, displayLocation])

  const onAnimationEnd = () => {
    if (transitionStage === 'fadeOut' || transitionStage === 'slideOutLeft') {
      // Déterminer la direction d'entrée
      const isNavigatingToHome = location.pathname === '/' || location.pathname === '/connaistutonthon/'
      const transitionIn = isNavigatingToHome ? 'slideInLeft' : 'fadeIn'
      setTransitionStage(transitionIn)
      setDisplayLocation(location)
    }
  }

  return (
    <div
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  )
}

export default PageTransition
