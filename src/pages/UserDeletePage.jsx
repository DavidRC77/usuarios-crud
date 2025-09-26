import {useParams, useNavigate} from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const UserDeletePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [usuario,setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getUser();
    },[]);

    const getUser = async() => {
        setLoading(true);
        const {data,error} = await supabase
                                    .from("usuarios")
                                    .select("*")
                                    .eq("id",id)
                                    .single();
        
        if(error){
            console.error(error);
            setLoading(false);
            return;
        }
        
        setUsuario(data);
        setLoading(false);
    }

    const deleteUser = async() => {
        // Llama a la función de la base de datos (RPC) que hace la eliminación en cascada
        const { error } = await supabase.rpc('delete_user_and_dependencies', {
            user_id_to_delete: id 
        });
        
        if (error) {
            alert(`Error al eliminar. Mensaje: ${error.message}.`);
            return null;
        }
        return true;
    }

    const handleDelete = async () => {
        const success = await deleteUser(); 
        if (success) {
            alert(`Usuario ${usuario.nombre} eliminado exitosamente.`);
            navigate('/users');
        }
    };

    return (
        <div className="page-container">
            <h2>Eliminar Usuario</h2>
            {loading ? (
                <p>Cargando datos del usuario...</p>
            ) : usuario ? (
                <div>
                    <p>¿Está seguro que desea eliminar al usuario: <strong>{usuario.nombre}</strong>?</p>
                    <div className="form-actions">
                        <button onClick={handleDelete} className="btn btn-danger">Sí, Eliminar</button>
                        <button onClick={() => navigate('/users')} className="btn btn-secondary" style={{marginLeft: '10px'}}>Cancelar</button>
                    </div>
                </div>
            ) : ( 
                 <p>Error: Usuario no pudo ser encontrado.</p>
            )}
        </div>
    );
};

export default UserDeletePage;