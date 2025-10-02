import { useTheme } from '../contexts/ThemeContext'
import { thonTheme } from '../themes/thonTheme'
import { taonTheme } from '../themes/taonTheme'

export const useThemeConfig = () => {
  const { isOcean, isBee } = useTheme()
  
  // Retourne la configuration du thème actuel
  const currentTheme = isOcean ? thonTheme : taonTheme
  
  return {
    theme: currentTheme,
    isOcean,
    isBee,
    // Utilitaires pour les classes CSS
    getTextColor: () => currentTheme.colors.text,
    getTextSecondaryColor: () => currentTheme.colors.textSecondary,
    getCardClasses: () => `${currentTheme.colors.card} backdrop-blur-md rounded-lg p-6 border ${currentTheme.colors.cardBorder}`,
    getButtonClasses: (variant = 'primary') => {
      const baseClasses = 'font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
      return variant === 'primary' 
        ? `${baseClasses} ${currentTheme.colors.button}`
        : `${baseClasses} ${currentTheme.colors.buttonSecondary}`
    },
    getBackgroundClasses: () => currentTheme.gradients.background,
    getHeaderClasses: () => `backdrop-blur-md border-b transition-all duration-500 ${currentTheme.gradients.header}`,
    getFooterClasses: () => `backdrop-blur-md border-t transition-all duration-500 ${currentTheme.gradients.footer}`
  }
}
