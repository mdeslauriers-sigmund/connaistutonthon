# WorldMap Component

The `WorldMap`` component is an interactive SVG-based world map that displays different water areas that can be selected by users. It's designed to replace the previous grid-based system in the migration activities.

## Features

- **Interactive Water Areas**: 8 different water areas that can be clicked and selected
- **Visual Feedback**: Different colors for selected, correct, and incorrect areas
- **Theme Support**: Adapts colors based on the current theme (Thon/Taon)
- **Responsive Design**: Scales properly on different screen sizes
- **Accessibility**: Includes proper labels and hover states

## Water Areas

The map includes the following selectable water areas:

1. **Atlantique Nord** (`north-atlantic`) - Northern Atlantic waters
2. **Atlantique Sud** (`south-atlantic`) - Southern Atlantic waters  
3. **Méditerranée** (`mediterranean`) - Mediterranean Sea
4. **Caraïbes** (`caribbean`) - Caribbean Sea
5. **Pacifique Nord** (`north-pacific`) - Northern Pacific Ocean
6. **Pacifique Sud** (`south-pacific`) - Southern Pacific Ocean
7. **Océan Indien** (`indian-ocean`) - Indian Ocean
8. **Arctique** (`arctic`) - Arctic Ocean

## Props

| Prop | Type | Description |
|------|------|-------------|
| `selectedArea` | string | ID of the currently selected area |
| `onAreaSelect` | function | Callback when an area is clicked |
| `showResult` | boolean | Whether to show the result state |
| `correctArea` | string | ID of the correct area |
| `isCorrect` | boolean | Whether the selected area is correct |
| `theme` | object | Current theme object with colors and styling |

## Usage

```jsx
import WorldMap from './WorldMap'

<WorldMap
  selectedArea={selectedArea}
  onAreaSelect={handleAreaSelect}
  showResult={showResult}
  correctArea={correctArea}
  isCorrect={isCorrect}
  theme={theme}
/>
```

## Styling

The component uses different colors based on the state:

- **Default**: Blue water areas
- **Selected**: Theme-specific color (orange for Thon, yellow for Taon)
- **Correct**: Green
- **Incorrect**: Red
- **Hover**: Lighter version of the theme color

## Integration

This component is used in:
- `MigrationComponent.jsx` - For the migration activity in the sequence
- `MigrationPage.jsx` - For the standalone migration page

The component replaces the previous grid-based system and provides a more realistic and educational experience for users learning about animal migrations.
