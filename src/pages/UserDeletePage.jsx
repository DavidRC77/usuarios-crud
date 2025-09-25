import {useParams, useNavigate} from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const UserDeletePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [usuario,setUsuario] = useState(null);

    useEffect(()=>{
        getUser();
    },[]);

    const getUser = async() => {
        const {data,error} = await supabase
                                    .from("usuarios")
                                    .select("*")
                                    .eq("id",id)
                                    .single();
        if(error){
            console.error(error);
            return;
        }
        console.log(data);
        setUsuario(data);
    }

    const deleteUser = async() => {
        const {data,error} = await supabase
                                    .from("usuarios")
                                    .delete()
                                    .eq("id",id);
        if(error){
            console.error(error);
            return null;
        }
        return data;
    }

    const handleDelete = () => {
        console.log('Deleting user with id:', id);
        deleteUser();
        navigate('/users');
    };

    return (
        <div>
            <h2>Delete User</h2>
            {usuario ? (
                <div>
                    <p>Are you sure you want to delete the user: <strong>{usuario.nombre}</strong>?</p>
                    <button onClick={handleDelete}>Yes, Delete</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default UserDeletePage;  