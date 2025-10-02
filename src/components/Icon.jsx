import fishIconUrl from '../assets/icons/fish.svg'
import beeIconUrl from '../assets/icons/bee.svg'
import tunaIconUrl from '../assets/icons/tuna.svg'

const Icon = ({ name, className = '', size = 'w-8 h-8', ...props }) => {
  const iconMap = {
    fish: fishIconUrl,
    tuna: tunaIconUrl,
    bee: beeIconUrl,
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
