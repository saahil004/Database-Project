import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout'
import Menu from './pages/menu'
import CustomerLogin from './pages/customer.login'
import AdminLogin from './pages/admin.login'
import CustomerRegister from './pages/customer.register'
import AdminDashboard from './pages/admin/Dashboard'
import AdminPortal from './pages/admin/AdminPortal.jsx'
import AddMenuItem from './pages/admin/AddMenuItem.jsx'
import MenuManagement from './pages/admin/MenuManagement.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Help from './pages/Help.jsx'
import DeliveryLogin from './pages/delivery.login.jsx'
import DeliveryPortal from './pages/delivery/Portal.jsx'

function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated, loading } = useAuth()
  
  // Wait for auth to finish loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }
  
  if (!isAuthenticated) return <Navigate to="/customerlogin" />
  if (role && user && user.role !== role) return <Navigate to="/menu" />
  return children
}

function AppContent() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='menu' element={<Menu/>}/>

        <Route path='about' element={<About/>}/>
        <Route path='help' element={<Help/>}/>


        <Route path='cart' element={<Cart/>}/>
        <Route path='myorders' element={<ProtectedRoute role="customer"><MyOrders/></ProtectedRoute>}/>
<Route path='customerlogin' element={<CustomerLogin/>}/>
        <Route path='register' element={<CustomerRegister/>}/>
        <Route path='adminlogin' element={<AdminLogin/>}/>
        <Route path='deliveryguylogin' element={<DeliveryLogin/>}/>
        <Route path='deliveryguyportal' element={<ProtectedRoute role="deliveryguy"><DeliveryPortal/></ProtectedRoute>}/>
        <Route path='customerregister' element={<CustomerRegister/>}/>
        <Route path='admin/portal' element={<ProtectedRoute role="admin"><AdminPortal/></ProtectedRoute>}/>
        <Route path='admin/dashboard' element={<ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>}/>
        <Route path='admin/addmenuitem' element={<ProtectedRoute role="admin"><AddMenuItem/></ProtectedRoute>}/>
        <Route path='admin/menumanagement' element={<ProtectedRoute role="admin"><MenuManagement/></ProtectedRoute>}/>
        <Route path='*' element={<Navigate to="/" />}/>
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
