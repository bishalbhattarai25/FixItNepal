import HomePage from './Pages/HomePage';
import NavBar from './Components/Navigation/NavBar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from './Components/Login';
import { Userdashboard } from './Pages/Userdashboard';
import Layout2 from './Components/Dashboard/Service-Dashboard/layout';
import Registerpage from './Pages/Registerpage';
import { Machinepage } from './Pages/Machinepage';
import { Admin } from './Pages/Admin';


function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/userdashboard' element={<Userdashboard />} />
        <Route path='/servicecenter' element={<Layout2 />} />
        <Route path='/machine' element={<Machinepage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registerpage />} />


        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
