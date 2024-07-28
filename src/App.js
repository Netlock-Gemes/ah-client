import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Services from './components/Services';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthState from './context/auth/AuthState';
import Profile from './pages/Profile';
import PropertyDetails from './pages/PropertyDetails';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className='bg-secondary min-h-screen'>
      <Router>
        <AuthState>

          <Navbar />
          <ToastContainer />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </AuthState>
      </Router>
    </div>
  );
}

export default App;
