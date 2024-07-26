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


function App() {
  return (
    <div className='bg-secondary min-h-screen'>
      <Router>
        <AuthState>

          <Navbar />
          <Routes>
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
          <Footer />
        </AuthState>
      </Router>
    </div>
  );
}

export default App;
