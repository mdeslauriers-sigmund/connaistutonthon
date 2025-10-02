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

### Sequence page
- Permet de parcourir les pages d'activité de façon séquentielle en comptabilisant le score accumulé au travers des activités
- Séquence initiale : 
  1. Migration page
  2. Bucket page
- À la fin de la séquence, diriger l'utilisateur vers une page de conclusion affichant le score total

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

### Association component
- Permet à l'utilisateur d'associer une technique de pêche à une conséquence pour l'environnement
  - On lui demande d'associer une technique de pêche dans une liste, à une conséquence dans une 2ème liste
  - Chaque item d'une liste peut avoir une seule correspondance dans l'autre liste
  - L'utilisateur clique sur le premier item en garde son bouton de souris enfoncé, puis déplace son curseur sur le second item et relâche le bouton
  - Lorsqu'il le relâche on affiche un trait entre les 2 items
    - Lors de la sélection de la réponse, on affiche une explication
    - Lorsque la réponse est bonne, on affiche un message de succès
      - Le trait entre les 2 boites est vert
    - Lorsque la réponse est mauvaise, on affiche un message de d'échec
      - Le trait entre les 2 boites est rouge

### Achievements
- Permet à l'utilisateur de gagner des badges lors de diverses actions
  - Les badges font partie d'une liste prédéterminée
  - L'état est stocké dans le local-storage de l'utilisateur
  - Une classe achievementManager permet de gérer les différentes actions nécessaires
  - Lors de l'obtention d'un achievement : affiche un toast "Achievement unlocked"
