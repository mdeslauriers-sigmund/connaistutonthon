import { Link } from 'react-router-dom'
import { useThemeConfig } from '../hooks/useThemeConfig'
import Icon from '../components/Icon'
import bancThonImage from '../assets/img/banc-thon.jpg'

const HomePage = () => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat pt-16 after:bg-ocean-deep/40 after:absolute after:inset-0"
      style={{
        backgroundImage: `url(${bancThonImage})`,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-12 pb-24 text-center">
        <Icon name={theme.icon} size="w-12 h-12 md:w-32 md:h-32 mx-auto" />
        <h1 className={`flex items-center justify-center space-x-4 text-4xl md:text-8xl max-w-2xl mx-auto font-normal mb-6 transition-colors duration-500 text-${getTextColor()} font-molle`}>
          <span>{theme.content.title}</span>
        </h1>
        <p className={`text-xl md:text-2xl font-semibold mb-8 max-w-3xl mx-auto transition-colors duration-500 text-${getTextSecondaryColor()}`}>
          {theme.content.subtitle}
        </p>
        <div className="mt-12">
          <Link
            to="/sequence"
            className={`inline-block ${getButtonClasses()}`}
          >
            Commencer l'aventure
          </Link>
        </div>
      </div>

      <div className="relative z-10 bg-ocean-deep py-12 px-4 sm:px-6 lg:px-16">
        {/* hero */}
        <div className="py-12 opacity-80">
          <h2 className={`text-4xl md:text-6xl font-normal mb-4 transition-colors duration-500 text-${getTextColor()} font-molle`}>
            {theme.content.hero.title}
          </h2>
          <p className={`text-xl md:text-2xl font-semibold mb-8 max-w-3xl transition-colors duration-500 text-${getTextSecondaryColor()}`}>
            {theme.content.hero.description}
          </p>
        </div>

        {/* activities */}
        <div className="">
          <h3 className={`opacity-80 text-4xl md:text-5xl font-normal mb-4 transition-colors duration-500 text-${getTextColor()} font-molle`}>
            {theme.content.activities.title}
          </h3>
          <p className={`text-xl md:text-2xl font-semibold mb-8 max-w-3xl transition-colors duration-500 text-${getTextSecondaryColor()}`}>
            {theme.content.activities.description}
          </p>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {theme.content.activities.features.map((feature, index) => (
              <div key={index} className={`${getCardClasses()} transition-all duration-500 backdrop-blur-sm bg-white/10 border-white/20`}>
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
        </div>


      </div>
    </div>
  )
}

export default HomePage
