import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn' // Import the Sign-In page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} /> {/* Add Sign-In route */}
        <Route
          path="/*"
          element={
            <div className="flex bg-opaque">
              <Sidebar /> {/* The component containing your icons */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
