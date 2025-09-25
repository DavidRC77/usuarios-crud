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
  const {data,error} = await supabase.from("usuarios").select();
  if(error){
    console.error(error);
    return;
  }
  setUsuarios(data);
  console.log(data);
}

return (
  <div className="page-container">
      <h1>User List</h1>
      <UserList usuarios={usuarios} />
  </div>
);
};

export default UserListPage;