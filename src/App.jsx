import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AchievementProvider } from './contexts/AchievementContext'
import HomePage from './pages/HomePage'
import SequencePage from './pages/SequencePage'
import AchievementsPage from './pages/AchievementsPage'
import Layout from './components/Layout'

function App() {
  return (
    <ThemeProvider>
      <AchievementProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />            
              <Route path="/sequence" element={<SequencePage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
            </Routes>
          </Layout>
        </Router>
      </AchievementProvider>
    </ThemeProvider>
  )
}

export default App
