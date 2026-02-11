import HomePage from './Pages/HomePage';
import NavBar from './Components/Navigation/NavBar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from './Components/Login';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
