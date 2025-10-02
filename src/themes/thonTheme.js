export const thonTheme = {
  name: 'Thon',
  icon: '🐟',
  colors: {
    primary: 'tuna-blue',
    secondary: 'tuna-light',
    background: 'ocean-deep',
    text: 'white',
    textSecondary: 'wave-light',
    card: 'bg-white/10',
    cardBorder: 'border-white/20',
    button: 'bg-tuna-light hover:bg-tuna-blue text-white',
    buttonSecondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
  },
  gradients: {
    background: 'bg-gradient-to-br from-ocean-deep to-tuna-blue',
    header: 'bg-white/10 border-white/20',
    footer: 'bg-white/5 border-white/20'
  },
  content: {
    title: 'Bienvenue dans l\'univers du Thon!',
    subtitle: 'Découvrez les mystères des océans et testez vos connaissances sur l\'un des poissons les plus fascinants de la planète.',
    features: [
      {
        icon: '🌊',
        title: 'Exploration',
        description: 'Plongez dans les profondeurs océaniques et découvrez l\'habitat naturel du thon.'
      },
      {
        icon: '🧠',
        title: 'Apprentissage',
        description: 'Testez vos connaissances avec nos quiz interactifs sur la biologie marine.'
      },
      {
        icon: '🎯',
        title: 'Défis',
        description: 'Relevez des défis amusants et devenez un expert en ichtyologie.'
      }
    ],
    footer: 'Découvrez le monde fascinant du thon',
    migration: {
      title: 'Migration du Thon 🐟🌊',
      subtitle: 'Découvrez les mystères de la migration du thon de l\'Atlantique à travers les saisons.',
      questions: [
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
      ],
      mapTitle: 'Carte de l\'Atlantique',
      mapLabels: {
        north: 'Nord',
        south: 'Sud',
        europe: 'Europe',
        america: 'Amérique',
        africa: 'Afrique'
      }
    }
  }
}
