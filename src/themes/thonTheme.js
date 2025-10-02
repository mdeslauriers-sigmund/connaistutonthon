export const thonTheme = {
  name: 'Thon',
  icon: 'tuna',
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
    background: 'bg-ocean-deep',
    header: 'border-white/20',
    footer: 'text-white border-white/20'
  },
  content: {
    title: 'Connais-tu ton thon ?',
    subtitle: 'Découvre les secrets du thon rouge de l’Atlantique Ouest à travers des jeux interactifs amusants et remplis de surprises!',
    hero: {
      icon: '🌊',
      title: 'Exploration',
      description: 'Plongez dans les profondeurs océaniques et découvrez l\'habitat naturel du thon.'
    },
    activities: {
      title: 'Les jeux à découvrir',
      features: [
        {
          icon: '🌊',
          title: 'Migration',
          description: 'Place les thons rouges au bon endroit selon la saison.'
        },
        {
          icon: '🍽️',
          title: 'À table!',
          description: 'Devine ce que mangent les jeunes thons et les adultes.'
        },
        {
          icon: '🌊',
          title: 'Océan fragile',
          description: 'Associe les événements aux impacts sur leur environnement.'
        },
        {
          icon: '🧠',
          title: 'Thon Quiz Aventure',
          description: 'Un parcours interactif avec 3 vies pour tester tes connaissances.'
        }
      ]
    },
    trophies: {
      title: 'Gagne des succès !',
      subtitle: 'Plus tu joues, plus tu débloques des achievements :',
      features: [
        {
          icon: '🏆',
          title: 'Terminer tous les jeux',
        },
        {
          icon: '🎯',
          title: 'Réussir un défi sans faute',
        },
        {
          icon: '🐟✨',
          title: 'Découvrir des trésors cachés',
        }
      ],
      footer: 'Arriveras-tu à tous les collectionner?',
    },
    footer: 'Découvrez le monde fascinant du thon',
    migration: {
      title: 'Migration du Thon rouge de l\'Atlantique ouest 🐟🌊',
      subtitle: 'Découvrez les mystères de la migration du thon de l\'Atlantique à travers les saisons.',
      questions: [
        {
          id: 0,
          season: 'été',
          correctAnswer: { area: 'atlantic-west' },
          explanation: 'En été, le thon rouge de l\'Atlantique ouest se trouve dans les eaux plus froides du nord, près des côtes canadiennes, où la nourriture est abondante.',
          successMessage: 'Excellent ! En été, le thon migre vers les eaux plus froides du nord.',
          failureMessage: 'Pas tout à fait ! En été, le thon préfère les eaux plus fraîches du nord.'
        },
        {
          id: 1,
          season: 'hiver',
          correctAnswer: { area: 'mexico-golfe' },
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
      title: 'Techniques de pêche et impact environnemental 🐟🔗',
      subtitle: 'Associez chaque technique de pêche avec son impact principal.',
      items: [
        { id: 1, name: 'Surpêche', icon: '🎣' },
        { id: 2, name: 'Endommage les habitats marins', icon: '🌊' },
        { id: 3, name: 'Capture accessoire', icon: '🐢' },
        { id: 4, name: 'Perturbe la chaîne alimentaire', icon: '🐟' },
        { id: 5, name: 'Chalutage de fond', icon: '🚤' },
        { id: 6, name: 'Mortalité élevée parmi les espèces vulnérables', icon: '💀' }
      ],
      associations: [
        {
          item1: { id: 1, name: 'Surpêche', icon: '🎣' },
          item2: { id: 4, name: 'Perturbe la chaîne alimentaire', icon: '🐟' },
          explanation: 'La surpêche détruit les populations de poissons en les pêchant en excès, ce qui peut entraîner une perturbation de la chaîne alimentaire.'
        },
        {
          item1: { id: 5, name: 'Chalutage de fond', icon: '🚤' },
          item2: { id: 2, name: 'Endommage les habitats marins', icon: '🌊' },
          explanation: 'Le chalutage de fond endommage les habitats marins, notamment les récifs coralliens.'
        },
        {
          item1: { id: 3, name: 'Capture accessoire', icon: '🐢' },
          item2: { id: 6, name: 'Mortalité élevée parmi les espèces vulnérables', icon: '💀' },
          explanation: 'La capture accessoire peut entraîner une mortalité élevée parmi les espèces vulnérables.'
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
