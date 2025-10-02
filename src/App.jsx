import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AchievementProvider } from './contexts/AchievementContext'
import HomePage from './pages/HomePage'
import SequencePage from './pages/SequencePage'
import Layout from './components/Layout'
import PageTransition from './components/PageTransition'
import './styles/transitions.css'

function App() {
  return (
    <ThemeProvider>
      <AchievementProvider>
        <Router>
          <Layout>
            <PageTransition>
              <Routes>
                <Route path="/" element={<HomePage />} />            
                <Route path="/sequence" element={<SequencePage />} />
              </Routes>
            </PageTransition>
          </Layout>
        </Router>
      </AchievementProvider>
    </ThemeProvider>
  )
}

export default App
