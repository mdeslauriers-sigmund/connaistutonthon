export const taonTheme = {
  name: 'Taon',
  icon: '🐝',
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
          correctAnswer: { x: 50, y: 30 },
          explanation: 'Au printemps, les taons sortent de leur hibernation et se dirigent vers les zones tempérées où les premières fleurs apparaissent.',
          successMessage: 'Parfait ! Au printemps, les taons cherchent les premières fleurs dans les zones tempérées.',
          failureMessage: 'Pas tout à fait ! Au printemps, les taons préfèrent les zones tempérées avec les premières fleurs.'
        },
        {
          id: 1,
          season: 'été',
          correctAnswer: { x: 70, y: 50 },
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
    }
  }
}
