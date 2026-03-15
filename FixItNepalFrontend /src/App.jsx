import HomePage from './Pages/HomePage';
import NavBar from './Components/Navigation/NavBar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from './Components/Login';
import { Userdashboard } from './Pages/Userdashboard';
import Layout2 from './Components/Dashboard/Service-Dashboard/layout';
import Registerpage from './Pages/Registerpage';
import { Mechanicpage } from './Pages/Mechanicpage';
import { Admin } from './Pages/Admin';

import Protectedroute from './Authentication/Protectedroute';
import { UserRegister } from './Components/UserRegister';
import { ServiceCenterRegister } from './Components/ServicecenterRegister';
import { MachineRegister } from './Components/MechanicRegister';


function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registerpage />} />


        {/* User Route */}
        <Route element={<Protectedroute allowedRoles={['Customer']} />}>
        <Route path='/userdashboard' element={<Userdashboard />} />
        </Route>

        {/* service route */}
        <Route element={<Protectedroute allowedRoles={['Garage']} />}>
        <Route path='/servicecenter' element={<Layout2 />} />
        </Route>

        {/* mechanic route */}
        <Route element={<Protectedroute allowedRoles={['Mechanic']} />}>
        <Route path='/mechanic' element={<Mechanicpage />} />
        </Route>

        {/* admin route  */}
        <Route element={<Protectedroute allowedRoles={['Admin']} />}>
        <Route path='/admin' element={<Admin />} />
        </Route>

        {/* register */}

        <Route path='/register/user' element={<UserRegister />} />
        <Route path='register/servicecenter' element={<ServiceCenterRegister />} />
        <Route path='register/mechanic' element={<MachineRegister />} />


        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
