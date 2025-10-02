# Achievement System Documentation

## Overview

The achievement system allows users to earn badges for various actions throughout the application. Achievements are stored in localStorage and persist across sessions. When a user unlocks an achievement, a toast notification appears saying "Achievement Unlocked!"

## Architecture

### Components

1. **achievementManager.js** - Core class managing achievements
   - Manages predefined list of achievements
   - Handles localStorage persistence
   - Provides unlock/check methods
   - Emits events when achievements are unlocked

2. **AchievementContext.jsx** - React context provider
   - Wraps the app to provide achievement functionality
   - Manages toast notifications
   - Provides hooks for components to interact with achievements

3. **Toast.jsx** - Toast notification component
   - Displays "Achievement Unlocked!" messages
   - Auto-dismisses after 3 seconds
   - Animated entrance/exit

4. **AchievementsDisplay.jsx** - Display component
   - Shows all achievements (locked and unlocked)
   - Shows progress (percentage complete)
   - Can be used in compact mode or full mode

5. **AchievementsPage.jsx** - Standalone achievements page
   - Full page view of all achievements
   - Accessible via `/achievements` route

## Available Achievements

| Achievement | ID | Icon | Description | How to Unlock |
|------------|-------|------|-------------|---------------|
| Premiers pas | `first_steps` | 👣 | Complétez votre première activité | Complete any activity |
| Expert en Migration | `migration_master` | 🌊 | Score parfait sur l'activité Migration | Perfect score (2/2) on Migration |
| Expert en Alimentation | `bucket_master` | 🍽️ | Score parfait sur l'activité Bucket | Perfect score (6/6) on Bucket |
| Séquence terminée | `sequence_complete` | 🎓 | Complétez toute la séquence d'apprentissage | Complete all activities |
| Perfectionniste | `perfectionist` | ⭐ | Score parfait sur toute la séquence | Perfect score (8/8) on sequence |
| Apprenant dévoué | `dedicated_learner` | 🔄 | Recommencez la séquence pour améliorer votre score | Retry the sequence |
| Explorateur de thèmes | `theme_explorer` | 🎨 | Changez de thème visuel | Toggle theme |
| Apprenant rapide | `quick_learner` | ⚡ | Complétez une activité sans erreur du premier coup | Perfect score on first attempt |

## Usage

### In a Component

```jsx
import { useAchievements } from '../contexts/AchievementContext'

function MyComponent() {
  const { 
    unlockAchievement, 
    isAchievementUnlocked,
    checkActivityCompletion,
    checkSequenceCompletion,
    checkThemeChange
  } = useAchievements()

  // Manually unlock an achievement
  const handleAction = () => {
    unlockAchievement('first_steps')
  }

  // Check if achievement is unlocked
  const isUnlocked = isAchievementUnlocked('first_steps')

  // Check activity completion (automatic achievement detection)
  const handleActivityComplete = (activityId, score, maxScore, isFirstAttempt) => {
    checkActivityCompletion(activityId, score, maxScore, isFirstAttempt)
  }

  // Check sequence completion
  const handleSequenceComplete = (totalScore, maxScore, isRetry) => {
    checkSequenceCompletion(totalScore, maxScore, isRetry)
  }

  // Check theme change
  const handleThemeToggle = () => {
    checkThemeChange()
  }

  return <div>...</div>
}
```

### Direct Access to Manager

```javascript
import { achievementManager, ACHIEVEMENTS } from '../utils/achievementManager'

// Unlock an achievement
achievementManager.unlock(ACHIEVEMENTS.FIRST_STEPS.id)

// Check if unlocked
const isUnlocked = achievementManager.isUnlocked(ACHIEVEMENTS.FIRST_STEPS.id)

// Get progress
const { total, unlocked, percentage } = achievementManager.getProgress()

// Get all unlocked achievements
const unlockedAchievements = achievementManager.getUnlockedAchievements()

// Listen for unlocks
achievementManager.addListener((achievement) => {
  console.log('Achievement unlocked:', achievement)
})

// Reset all (for testing)
achievementManager.resetAll()
```

## Integration Points

### 1. App.jsx
Wraps the app with `AchievementProvider`:
```jsx
<AchievementProvider>
  <Router>
    {/* app content */}
  </Router>
</AchievementProvider>
```

### 2. SequencePage.jsx
Checks for achievements when activities and sequences complete:
- Calls `checkActivityCompletion()` after each activity
- Calls `checkSequenceCompletion()` when sequence finishes

### 3. ThemeToggle.jsx
Triggers theme change achievement:
- Calls `checkThemeChange()` when theme is toggled

### 4. Layout.jsx
Links to achievements page:
- Trophy icon (🏆) in header navigates to `/achievements`

## localStorage Keys

- `userAchievements` - Stores unlocked achievements with timestamp
- `sequenceCompletedBefore` - Flag to track if user has completed sequence before (for retry achievement)

## Data Structure

### Achievement Object
```javascript
{
  id: 'first_steps',
  title: 'Premiers pas',
  description: 'Complétez votre première activité',
  icon: '👣',
  category: 'progress'
}
```

### Unlocked Achievement (in localStorage)
```javascript
{
  "first_steps": {
    "unlockedAt": "2025-10-02T12:34:56.789Z",
    "achievement": {
      "id": "first_steps",
      "title": "Premiers pas",
      "description": "Complétez votre première activité",
      "icon": "👣",
      "category": "progress"
    }
  }
}
```

## Adding New Achievements

1. **Define the achievement** in `src/utils/achievementManager.js`:
```javascript
export const ACHIEVEMENTS = {
  MY_NEW_ACHIEVEMENT: {
    id: 'my_new_achievement',
    title: 'Mon Nouveau Badge',
    description: 'Faites quelque chose de cool',
    icon: '🎉',
    category: 'exploration'
  }
}
```

2. **Add unlock logic** where appropriate:
```javascript
// In your component
const { unlockAchievement } = useAchievements()

const handleSomething = () => {
  // ... your logic
  unlockAchievement('my_new_achievement')
}
```

## Testing

To test achievements in development:

```javascript
import { achievementManager } from '../utils/achievementManager'

// Reset all achievements
achievementManager.resetAll()

// Unlock specific achievement
achievementManager.unlock('first_steps')

// Check progress
console.log(achievementManager.getProgress())
```

## Future Enhancements

Potential improvements for the achievement system:

1. **Achievement Rarity** - Add bronze/silver/gold tiers
2. **Achievement Statistics** - Track unlock dates, times
3. **Achievement Sharing** - Share achievements on social media
4. **Secret Achievements** - Hidden achievements not shown until unlocked
5. **Achievement Rewards** - Unlock special themes or features
6. **Progress Tracking** - Show progress toward achievements (e.g., "3/5 activities")
7. **Sound Effects** - Play sound when achievement unlocks
8. **Animation** - More elaborate unlock animations
9. **Leaderboards** - Compare achievements with others
10. **Export/Import** - Backup and restore achievements

