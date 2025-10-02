import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ActivityPage from './pages/ActivityPage'
import MigrationPage from './pages/MigrationPage'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivityPage />} />
          <Route path="/migration" element={<MigrationPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
