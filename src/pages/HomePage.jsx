import { Link } from 'react-router-dom'
import { useThemeConfig } from '../hooks/useThemeConfig'

const HomePage = () => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-colors duration-500 text-${getTextColor()}`}>
          {theme.content.title} {theme.icon}
        </h1>
        <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 text-${getTextSecondaryColor()}`}>
          {theme.content.subtitle}
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {theme.content.features.map((feature, index) => (
            <div key={index} className={`${getCardClasses()} transition-all duration-500`}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-500 text-${getTextColor()}`}>
                {feature.title}
              </h3>
              <p className={`transition-colors duration-500 text-${getTextSecondaryColor()}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <Link 
            to="/sequence" 
            className={`inline-block ${getButtonClasses()}`}
          >
            Commencer l'aventure
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
