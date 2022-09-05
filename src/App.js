import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from 'react-router-dom';

import './App.css';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Cadastro/>} />
        <Route path="/login" element={<Login/>} />

      </Routes>
    </Router>
  );
}

export default App;
