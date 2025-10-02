export const taonTheme = {
  name: 'Taon',
  icon: 'bee',
  colors: {
    primary: 'bee-gold',
    secondary: 'bee-yellow',
    background: 'honey-dark',
    text: 'bee-yellow',
    textSecondary: 'pollen-light',
    card: 'bg-bee-black/20',
    cardBorder: 'border-bee-yellow/30',
    button: 'bg-bee-gold hover:bg-bee-yellow text-bee-black',
    buttonSecondary: 'bg-bee-black/20 hover:bg-bee-black/30 text-bee-yellow border border-bee-yellow/30'
  },
  gradients: {
    background: 'bg-gradient-to-br from-honey-dark to-bee-gold',
    header: 'bg-bee-black/20 border-bee-yellow/30',
    footer: 'bg-bee-black/10 border-bee-yellow/20'
  },
  content: {
    title: 'Bienvenue dans l\'univers des Taons!',
    subtitle: 'Explorez le monde merveilleux des taons et découvrez leur rôle essentiel dans notre écosystème.',
    features: [
      {
        icon: '🌸',
        title: 'Pollinisation',
        description: 'Découvrez comment les taons pollinisent les fleurs et maintiennent la biodiversité.'
      },
      {
        icon: '🍯',
        title: 'Production',
        description: 'Apprenez comment les taons produisent le miel et organisent leur ruche.'
      },
      {
        icon: '🏠',
        title: 'Habitat',
        description: 'Explorez la structure complexe de la ruche et la vie sociale des taons.'
      }
    ],
    footer: 'Découvrez le monde fascinant des taons',
    migration: {
      title: 'Migration des Taons 🐝🌸',
      subtitle: 'Découvrez les mystères de la migration des taons à travers les saisons et leur recherche de fleurs.',
      questions: [
        {
          id: 0,
          season: 'printemps',
          correctAnswer: { area: 'mediterranean-sea' },
          explanation: 'Au printemps, les taons sortent de leur hibernation et se dirigent vers les zones tempérées où les premières fleurs apparaissent.',
          successMessage: 'Parfait ! Au printemps, les taons cherchent les premières fleurs dans les zones tempérées.',
          failureMessage: 'Pas tout à fait ! Au printemps, les taons préfèrent les zones tempérées avec les premières fleurs.'
        },
        {
          id: 1,
          season: 'été',
          correctAnswer: { area: 'mexico-golfe' },
          explanation: 'En été, les taons migrent vers les régions plus chaudes et ensoleillées où la végétation est abondante et les fleurs nombreuses.',
          successMessage: 'Excellent ! En été, les taons se dirigent vers les régions chaudes et fleuries.',
          failureMessage: 'Pas correct ! En été, les taons préfèrent les régions chaudes avec beaucoup de fleurs.'
        }
      ],
      mapTitle: 'Carte des Zones de Pollinisation',
      mapLabels: {
        north: 'Zones Froides',
        south: 'Zones Chaudes',
        europe: 'Europe',
        america: 'Amérique',
        africa: 'Afrique'
      }
    },
    association: {
      title: 'Associations des Taons 🐝🔗',
      subtitle: 'Associez les éléments liés aux taons pour découvrir leurs caractéristiques.',
      items: [
        { id: 1, name: 'Fleurs', icon: '🌸' },
        { id: 2, name: 'Pollinisation', icon: '🌺' },
        { id: 3, name: 'Nectar', icon: '🍯' },
        { id: 4, name: 'Pollen', icon: '🌼' },
        { id: 5, name: 'Saison', icon: '🌞' },
        { id: 6, name: 'Vol', icon: '🦋' }
      ],
      associations: [
        {
          item1: { id: 1, name: 'Fleurs', icon: '🌸' },
          item2: { id: 2, name: 'Pollinisation', icon: '🌺' },
          explanation: 'Les taons pollinisent les fleurs en se déplaçant de fleur en fleur.'
        },
        {
          item1: { id: 3, name: 'Nectar', icon: '🍯' },
          item2: { id: 4, name: 'Pollen', icon: '🌼' },
          explanation: 'Les taons collectent le nectar et transportent le pollen.'
        },
        {
          item1: { id: 5, name: 'Saison', icon: '🌞' },
          item2: { id: 6, name: 'Vol', icon: '🦋' },
          explanation: 'L\'activité des taons varie selon les saisons et leur capacité de vol.'
        }
      ]
    },
    bucket: {
      title: 'Alimentation des Taons 🐝🌸',
      subtitle: 'Découvrez les différences d\'alimentation entre les jeunes et les adultes taons.',
      containers: {
        adults: {
          title: 'Adultes',
          description: 'Alimentation des taons adultes',
          color: 'bg-yellow-500/20 border-yellow-500/50'
        },
        young: {
          title: 'Larves',
          description: 'Alimentation des larves de taons',
          color: 'bg-orange-500/20 border-orange-500/50'
        }
      },
      foods: [
        {
          id: 1,
          name: 'Nectar',
          image: '🌸',
          correctCategory: 'adults',
          explanation: 'Les taons adultes se nourrissent principalement de nectar de fleurs.'
        },
        {
          id: 2,
          name: 'Pollen',
          image: '🌼',
          correctCategory: 'adults',
          explanation: 'Le pollen est une source de protéines importante pour les taons adultes.'
        },
        {
          id: 3,
          name: 'Sève d\'arbre',
          image: '🌳',
          correctCategory: 'adults',
          explanation: 'Les taons adultes peuvent se nourrir de sève d\'arbres riches en sucres.'
        },
        {
          id: 4,
          name: 'Débris végétaux',
          image: '🍃',
          correctCategory: 'young',
          explanation: 'Les larves de taons se nourrissent de débris végétaux en décomposition.'
        },
        {
          id: 5,
          name: 'Micro-organismes',
          image: '🦠',
          correctCategory: 'young',
          explanation: 'Les larves consomment des micro-organismes présents dans leur environnement.'
        },
        {
          id: 6,
          name: 'Matière organique',
          image: '🌱',
          correctCategory: 'young',
          explanation: 'Les larves se nourrissent de matière organique en décomposition.'
        }
      ]
    },
    sequence: {
      title: 'Séquence d\'Apprentissage des Taons 🐝📚',
      subtitle: 'Parcourez les activités dans l\'ordre pour découvrir tous les secrets des taons !',
      activities: [
        {
          id: 'association',
          title: 'Associations des Taons',
          description: 'Associez les éléments liés aux taons pour découvrir leurs caractéristiques.',
          icon: '🔗',
          path: '/association',
          maxScore: 3
        },
        {
          id: 'migration',
          title: 'Migration des Taons',
          description: 'Découvrez les mystères de la migration',
          icon: '🌸',
          path: '/migration',
          maxScore: 2
        },
        {
          id: 'bucket',
          title: 'Alimentation des Taons',
          description: 'Classez l\'alimentation des larves et adultes',
          icon: '🍽️',
          path: '/bucket',
          maxScore: 6
        }
      ],
      conclusion: {
        title: 'Félicitations ! 🎉',
        subtitle: 'Vous avez terminé la séquence d\'apprentissage des taons !',
        totalMaxScore: 11,
        messages: {
          perfect: 'Parfait ! Vous êtes un véritable expert des taons !',
          excellent: 'Excellent ! Vous connaissez très bien les taons !',
          good: 'Bien joué ! Vous avez de bonnes connaissances sur les taons !',
          average: 'Pas mal ! Continuez à apprendre sur les taons !',
          needsImprovement: 'C\'est un début ! Relisez les explications pour mieux comprendre.'
        }
      }
    }
  }
}
