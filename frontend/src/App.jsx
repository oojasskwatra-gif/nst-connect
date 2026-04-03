import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Faqs from './pages/Faqs';
import Connect from './pages/Connect'; // <--- Make sure this import is here!
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/connect" element={<Connect />} /> {/* <--- This is the missing link! */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;