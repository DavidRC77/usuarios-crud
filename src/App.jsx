import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import UserListPage from "./pages/UserListPage";
import CreateUserPage from "./pages/CreateUserPage";
import EditUserPage from "./pages/EditUserPage";
import UserDeletePage from "./pages/UserDeletePage";
import CargoListPage from "./pages/CargoListPage";
import CreateCargoPage from "./pages/CreateCargoPage";
import EditCargoPage from "./pages/EditCargoPage";
import CargoDeletePage from "./pages/CargoDeletePage";
import HorarioListPage from "./pages/HorarioListPage";
import CreateHorarioPage from "./pages/CreateHorarioPage";
import EditHorarioPage from "./pages/EditHorarioPage";
import HorarioDeletePage from "./pages/HorarioDeletePage";
import TickeoListPage from "./pages/TickeoListPage";
import CreateTickeoPage from "./pages/CreateTickeoPage";
import EditTickeoPage from "./pages/EditTickeoPage";
import TickeoDeletePage from "./pages/TickeoDeletePage";
import ConsultaListPage from "./pages/ConsultaListPage";
import './App.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="users" element={<UserListPage/>}/>
        <Route path="users/create" element={<CreateUserPage/>}/>
        <Route path="users/edit/:id" element={<EditUserPage/>}/>
        <Route path="users/:id" element={<UserDeletePage/>}/>
        <Route path="cargos" element={<CargoListPage/>}/>
        <Route path="cargos/create" element={<CreateCargoPage/>}/>
        <Route path="cargos/edit/:id" element={<EditCargoPage/>}/>
        <Route path="cargos/:id" element={<CargoDeletePage/>}/>
        <Route path="horarios" element={<HorarioListPage/>}/>
        <Route path="horarios/create" element={<CreateHorarioPage/>}/>
        <Route path="horarios/edit/:id" element={<EditHorarioPage/>}/>
        <Route path="horarios/:id" element={<HorarioDeletePage/>}/>
        <Route path="tickeos" element={<TickeoListPage/>}/>
        <Route path="tickeos/create" element={<CreateTickeoPage/>}/>
        <Route path="tickeos/edit/:id" element={<EditTickeoPage/>}/>
        <Route path="tickeos/:id" element={<TickeoDeletePage/>}/>
        <Route path="Consultas" element={<ConsultaListPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;