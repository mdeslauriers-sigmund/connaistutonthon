import { render, screen, fireEvent } from '@testing-library/react'
import WorldMap from './WorldMap'

// Mock theme
const mockTheme = {
  name: 'Thon',
  colors: {
    primary: 'tuna-blue'
  }
}

describe('WorldMap Component', () => {
  const defaultProps = {
    selectedArea: null,
    onAreaSelect: jest.fn(),
    showResult: false,
    correctArea: null,
    isCorrect: false,
    theme: mockTheme
  }

  it('renders without crashing', () => {
    render(<WorldMap {...defaultProps} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('calls onAreaSelect when an area is clicked', () => {
    const onAreaSelect = jest.fn()
    render(<WorldMap {...defaultProps} onAreaSelect={onAreaSelect} />)

    // Find and click on the north-atlantic area
    const northAtlanticArea = screen.getByText('Atlantique Nord')
    fireEvent.click(northAtlanticArea.closest('path'))

    expect(onAreaSelect).toHaveBeenCalledWith('north-atlantic')
  })

  it('does not call onAreaSelect when showResult is true', () => {
    const onAreaSelect = jest.fn()
    render(<WorldMap {...defaultProps} onAreaSelect={onAreaSelect} showResult={true} />)

    const northAtlanticArea = screen.getByText('Atlantique Nord')
    fireEvent.click(northAtlanticArea.closest('path'))

    expect(onAreaSelect).not.toHaveBeenCalled()
  })

  it('displays correct styling for selected area', () => {
    render(<WorldMap {...defaultProps} selectedArea="north-atlantic" />)

    // The selected area should have different styling
    const northAtlanticArea = screen.getByText('Atlantique Nord')
    const path = northAtlanticArea.closest('path')
    expect(path).toHaveStyle('fill: #f59e0b') // Tuna orange
  })

  it('displays correct styling for correct answer', () => {
    render(
      <WorldMap
        {...defaultProps}
        showResult={true}
        correctArea="north-atlantic"
        selectedArea="north-atlantic"
        isCorrect={true}
      />
    )

    const northAtlanticArea = screen.getByText('Atlantique Nord')
    const path = northAtlanticArea.closest('path')
    expect(path).toHaveStyle('fill: #10b981') // Green for correct
  })
})
