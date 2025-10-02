import beeIconUrl from '../assets/icons/bee.svg'
import tunaIconUrl from '../assets/icons/tuna.svg'
import tunaBlueIconUrl from '../assets/icons/tuna-blue.svg'

const Icon = ({ name, className = '', size = 'w-8 h-8', ...props }) => {
  const iconMap = {
    tuna: tunaIconUrl,
    bee: beeIconUrl,
    tunaBlue: tunaBlueIconUrl,
  }

  const iconUrl = iconMap[name]

  if (!iconUrl) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <img
      src={iconUrl}
      alt={`${name} icon`}
      className={`${size} ${className}`}
      {...props}
    />
  )
}

export default Icon
