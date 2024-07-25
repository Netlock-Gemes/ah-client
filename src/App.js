import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Services from './components/Services';
import Footer from './components/Footer';


function App() {
  return (
    <div className='bg-secondary min-h-screen'>
      <Router>
        {/* <AuthState> */}

        <Navbar />
        <Routes>
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
        </Routes>
        <Footer />
        {/* </AuthState> */}
      </Router>
    </div>
  );
}

export default App;
