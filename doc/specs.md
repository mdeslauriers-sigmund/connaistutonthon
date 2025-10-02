# Projet Connais-tu ton Thon

## Stack
- React
- TailwindCss

## Features
## Changement de thème visuel
- Offre un affichage avec des couleurs différentes

### Homepage
- Affiche un message de bienvenue

### Activity page
- TODO : doc

### Migration component
- Permet à l'utilisateur de mieux connaître la migration du thon
- On lui demande ou est le thon de l'atlantique en été et en hiver
- L'utilisateur doit sélectionner le bon point parmi une série de point sur la carte
  - La carte est une illustratoin svg des continents et des océans. Il y a un path svg spécifique pour différentes étendues d'eau:
    - Océan Atlantique (côte nord-est)
    - Océan Atlantique (côte européenne)
    - Océan Atlantique (côte africaine)
    - Océan Atlantique (côté d'amérique du sud)
    - Golf du Mexique
    - Méditérannée
    - Arctique
    - Japon
  - Lors de la sélection de la réponse, on affiche une explication
  - Lorsque la réponse est bonne, on affiche un message de succès
  - Lorsque la réponse est mauvaise, on affiche un message de d'échec

### Bucket component
- Permet à l'utilisateur de catégoriser l'alimentation du thon
- On lui demande, pour chaque aliment, de déterminer si c'est l'alimentation des jeunes ou des adultes
  - Les aliments doivent être déplacés en drag n drop
  - On peut les déposer dans 2 contenants (Adultes et Jeunes)
    - Lors de la sélection de la réponse, on affiche une explication
    - Lorsque la réponse est bonne, on affiche un message de succès
    - Lorsque la réponse est mauvaise, on affiche un message de d'échec

### Sequence page
- Permet de parcourir les pages d'activité de façon séquentielle en comptabilisant le score accumulé au travers des activités
- Séquence initiale : 
  1. Migration page
  2. Bucket page
- À la fin de la séquence, diriger l'utilisateur vers une page de conclusion affichant le score total