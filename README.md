# Connais-tu ton Thon 🐟

Une application interactive pour découvrir le monde fascinant du thon et tester vos connaissances en biologie marine.

## Stack Technique

- **React 18** - Framework JavaScript moderne
- **TailwindCSS** - Framework CSS utilitaire
- **Vite** - Outil de build rapide
- **React Router** - Navigation entre pages

## Installation

1. Installez les dépendances :
```bash
npm install
```

2. Lancez le serveur de développement :
```bash
npm run dev
```

3. Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run deploy` - Déploie l'application sur GitHub Pages

## Déploiement sur GitHub Pages

### Première configuration

1. **Créez un repository GitHub** pour votre projet
2. **Ajoutez le remote origin** :
   ```bash
   git remote add origin https://github.com/VOTRE-USERNAME/connaistutonthon.git
   ```

3. **Poussez votre code** :
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

### Déploiement

1. **Déployez sur GitHub Pages** :
   ```bash
   npm run deploy
   ```

2. **Activez GitHub Pages** dans les paramètres de votre repository :
   - Allez dans Settings > Pages
   - Sélectionnez "Deploy from a branch"
   - Choisissez la branche `gh-pages`
   - Cliquez sur "Save"

3. **Votre site sera disponible** à l'adresse :
   ```
   https://VOTRE-USERNAME.github.io/connaistutonthon/
   ```

### Mise à jour du site

Pour mettre à jour le site après des modifications :
```bash
git add .
git commit -m "Update content"
git push origin main
npm run deploy
```

## Structure du Projet

```
src/
├── components/     # Composants réutilisables
├── pages/         # Pages de l'application
├── App.jsx        # Composant principal
├── main.jsx       # Point d'entrée
└── index.css      # Styles globaux
```

## Fonctionnalités

### Page d'Accueil
- Message de bienvenue interactif
- Présentation des fonctionnalités
- Design responsive avec thème océanique

### À Venir
- Pages d'activités interactives
- Quiz sur la biologie marine
- Système de progression
