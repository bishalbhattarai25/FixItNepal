import HomePage from "./Pages/HomePage";
import { useLocation } from "react-router-dom";
import NavBar from "./Components/Navigation/NavBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Login } from "./Components/Login";
import { Userdashboard } from "./Pages/Userdashboard";
import Registerpage from "./Pages/Registerpage";
import { Mechanicpage } from "./Pages/Mechanicpage";
import { Admin } from "./Pages/Admin";

import Protectedroute from "./Authentication/Protectedroute";
import { UserRegister } from "./Components/UserRegister";
import { ServiceCenterRegister } from "./Components/ServicecenterRegister";
import { MachineRegister } from "./Components/MechanicRegister";
import ViewRecord from "./Components/Dashboard/Admin-Dashboard/pages/ViewRecord";
import ViewDetail from "./Components/Dashboard/Admin-Dashboard/pages/ViewDetail";
import {Dashboard } from "./Components/Dashboard/User-Dashboard/pages/Dashboard";
import {Requesthelp } from "./Components/Dashboard/User-Dashboard/pages/Requesthelp";
import Nearbymacf from "./Components/Dashboard/User-Dashboard/pages/Nearbymacf";
import Livetrack from "./Components/Dashboard/User-Dashboard/pages/Livetrack";
import Servicehistory from "./Components/Dashboard/User-Dashboard/pages/Servicehistory";
import Wallet from './Components/Dashboard/User-Dashboard/pages/wallet';
import { Maintence } from './Components/Dashboard/User-Dashboard/pages/Maintence';
import Profile from './Components/Dashboard/User-Dashboard/pages/Profile';
import ServiceLivetrack from "./Components/Dashboard/Service-Dashboard/pages/ServiceLiveTrack";
import DashboardService from "./Components/Dashboard/Service-Dashboard/pages/DashboardService";
import Appointment from "./Components/Dashboard/Service-Dashboard/pages/Appointment";
import { ServiceCenter } from "./Pages/ServiceCenter";

function App() {
   const location = useLocation();

const hideNavbarRoutes = [
  "/userdashboard",
  "/mechanic",
  "/superadmin",
  "/servicecenter"
];

const shouldHideNavbar = hideNavbarRoutes.some((route) =>
  location.pathname.startsWith(route)
);
  return (
    <>
     {!shouldHideNavbar && <NavBar />}

      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registerpage />} />

        {/* User Route */}
        <Route element={<Protectedroute allowedRoles={["Customer"]} />}>
          <Route path="/userdashboard" element={<Userdashboard />}>
            <Route index element={<Dashboard />} />
            {/* Default: /userdashboard */}
            <Route path="requesthelp" element={<Requesthelp />} />
            <Route path="nearbymechanics/:requestId?" element={<Nearbymacf />} />
            <Route path="livetracking/:requestId?" element={<Livetrack />} />
            <Route path="servoceHistory" element={<Servicehistory />} />
            <Route path="payments" element={<Wallet />} />
            <Route path="maintence" element={<Maintence />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>



        {/* service-center route */}

      <Route element={<Protectedroute allowedRoles={["Garage"]} />}>
  <Route path="/servicecenter" element={<ServiceCenter />}>
    <Route index element={<DashboardService />} />
    <Route path="livetracking/:requestId?" element={<ServiceLivetrack />} />
    <Route path="appointment" element={<Appointment />} />
  </Route>
</Route>

        {/* mechanic route */}
        <Route element={<Protectedroute allowedRoles={["Mechanic"]} />}>
          <Route path="/mechanic" element={<Mechanicpage />} />
        </Route>

        {/* admin route  */}
        <Route element={<Protectedroute allowedRoles={["SuperAdmin"]} />}>
          <Route path="/superadmin" element={<Admin />} />
          <Route path="/superadmin/record/:type/:id" element={<ViewRecord />} />
          <Route path="superadmin/:type/:id" element={<ViewDetail />} />
        </Route>

        {/* register */}

        <Route path="/register/user" element={<UserRegister />} />
        <Route
          path="register/servicecenter"
          element={<ServiceCenterRegister />}
        />
        <Route path="register/mechanic" element={<MachineRegister />} />
      </Routes>
    </>
  );
}

export default App;
