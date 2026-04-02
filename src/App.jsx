import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductDetails from './pages/ProductDetails'
import Category from './pages/Category'
import { BestSellers, NewArrivals, WeeklyDeals } from './pages/StoreCollections'
import { OrderTracking, Contact, HelpCenter, Returns } from './pages/SupportPages'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="app-container">
      <CartDrawer />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/weekly-deals" element={<WeeklyDeals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/returns" element={<Returns />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
