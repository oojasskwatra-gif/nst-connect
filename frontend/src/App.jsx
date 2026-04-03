import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Faqs from './pages/Faqs';
import Connect from './pages/Connect'; // 1. Check this import
import Admin from './pages/Admin';
import Join from './pages/Join';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;