import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import HomePage from './pages/HomePage'
import ActivityPage from './pages/ActivityPage'
import SequencePage from './pages/SequencePage'
import Layout from './components/Layout'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activities" element={<ActivityPage />} />
            <Route path="/sequence" element={<SequencePage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
