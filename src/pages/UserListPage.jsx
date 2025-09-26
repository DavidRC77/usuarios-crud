import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import UserList from "../components/UserList";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY);

const UserListPage = () => {
    const [usuarios,setUsuarios] = useState([])


useEffect(() => {
  getUsuarios();
}, [])

async function getUsuarios() {
  const {data,error} = await supabase
    .from("usuarios")
    .select(`
        *,
        cargos_usuarios:cargos_usuarios!id_usuario (
            fecha_inicio,
            cargos(cargo)
        )
    `); 
  
  if(error){
    console.error(error);
    return;
  }
  
  const formattedData = data.map(user => {
    const sortedCargos = user.cargos_usuarios
        .sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));

    const cargoName = sortedCargos[0]?.cargos?.cargo || 'Sin Cargo';
    
    return {
      ...user,
      cargo_nombre: cargoName 
    };
  });

  setUsuarios(formattedData);
}

return (
  <div className="page-container">
      <h1>Lista de Usuarios</h1>
      <UserList usuarios={usuarios} />
  </div>
);
};

export default UserListPage;