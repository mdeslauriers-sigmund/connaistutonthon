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
    },
    association: {
      title: 'Associations du Thon 🐟🔗',
      subtitle: 'Associez les éléments liés au thon pour découvrir ses caractéristiques.',
      items: [
        { id: 1, name: 'Océan Atlantique', icon: '🌊' },
        { id: 2, name: 'Migration', icon: '🗺️' },
        { id: 3, name: 'Plancton', icon: '🦠' },
        { id: 4, name: 'Sardines', icon: '🐟' },
        { id: 5, name: 'Température', icon: '🌡️' },
        { id: 6, name: 'Vitesse', icon: '⚡' }
      ],
      associations: [
        {
          item1: { id: 1, name: 'Océan Atlantique', icon: '🌊' },
          item2: { id: 2, name: 'Migration', icon: '🗺️' },
          explanation: 'Le thon migre dans l\'océan Atlantique selon les saisons.'
        },
        {
          item1: { id: 3, name: 'Plancton', icon: '🦠' },
          item2: { id: 4, name: 'Sardines', icon: '🐟' },
          explanation: 'Les jeunes thons mangent du plancton, les adultes chassent les sardines.'
        },
        {
          item1: { id: 5, name: 'Température', icon: '🌡️' },
          item2: { id: 6, name: 'Vitesse', icon: '⚡' },
          explanation: 'La température de l\'eau influence la vitesse de nage du thon.'
        }
      ]
    },
    bucket: {
      title: 'Alimentation du Thon 🐟🍽️',
      subtitle: 'Découvrez les différences d\'alimentation entre les jeunes et les adultes thons.',
      containers: {
        adults: {
          title: 'Adultes',
          description: 'Alimentation des thons adultes',
          color: 'bg-blue-500/20 border-blue-500/50'
        },
        young: {
          title: 'Jeunes',
          description: 'Alimentation des jeunes thons',
          color: 'bg-green-500/20 border-green-500/50'
        }
      },
      foods: [
        {
          id: 1,
          name: 'Plancton',
          image: '🦠',
          correctCategory: 'young',
          explanation: 'Les jeunes thons se nourrissent principalement de plancton, plus facile à capturer.'
        },
        {
          id: 2,
          name: 'Petits poissons',
          image: '🐟',
          correctCategory: 'young',
          explanation: 'Les jeunes thons chassent de petits poissons adaptés à leur taille.'
        },
        {
          id: 3,
          name: 'Crustacés',
          image: '🦐',
          correctCategory: 'young',
          explanation: 'Les crustacés sont une source de nourriture importante pour les jeunes thons.'
        },
        {
          id: 4,
          name: 'Maquereaux',
          image: '🐟',
          correctCategory: 'adults',
          explanation: 'Les thons adultes chassent des maquereaux, des proies plus grosses et énergétiques.'
        },
        {
          id: 5,
          name: 'Sardines',
          image: '🐟',
          correctCategory: 'adults',
          explanation: 'Les sardines sont une proie favorite des thons adultes en bancs.'
        },
        {
          id: 6,
          name: 'Anchois',
          image: '🐟',
          correctCategory: 'adults',
          explanation: 'Les anchois constituent une part importante de l\'alimentation des thons adultes.'
        }
      ]
    },
    sequence: {
      title: 'Séquence d\'Apprentissage du Thon 🐟📚',
      subtitle: 'Parcourez les activités dans l\'ordre pour découvrir tous les secrets du thon !',
      activities: [
        {
          id: 'association',
          title: 'Associations du Thon',
          description: 'Associez les éléments liés au thon pour découvrir ses caractéristiques.',
          icon: '🔗',
          path: '/association',
          maxScore: 3
        },
        {
          id: 'migration',
          title: 'Migration du Thon',
          description: 'Découvrez les mystères de la migration',
          icon: '🌊',
          path: '/migration',
          maxScore: 2
        },
        {
          id: 'bucket',
          title: 'Alimentation du Thon',
          description: 'Classez l\'alimentation des jeunes et adultes',
          icon: '🍽️',
          path: '/bucket',
          maxScore: 6
        }
      ],
      conclusion: {
        title: 'Félicitations ! 🎉',
        subtitle: 'Vous avez terminé la séquence d\'apprentissage du thon !',
        totalMaxScore: 11,
        messages: {
          perfect: 'Parfait ! Vous êtes un véritable expert du thon !',
          excellent: 'Excellent ! Vous connaissez très bien le thon !',
          good: 'Bien joué ! Vous avez de bonnes connaissances sur le thon !',
          average: 'Pas mal ! Continuez à apprendre sur le thon !',
          needsImprovement: 'C\'est un début ! Relisez les explications pour mieux comprendre.'
        }
      }
    }
  }
}
