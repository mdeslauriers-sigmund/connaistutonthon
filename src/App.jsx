import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ActivityPage from './pages/ActivityPage'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivityPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
