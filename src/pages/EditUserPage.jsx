import { useParams,useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const EditUserPage = () => {
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
    const updateUser = async(userData) => {
        const {data,error} = await supabase
                                    .from("usuarios")
                                    .update(userData)
                                    .eq("id",id);
        if(error){
            console.error(error);
            return null;
        }
        return data;
    }
    const handleSubmit = (userData) => {  
        console.log('Updating user:', userData);
        updateUser(userData);
        navigate('/users');
    };

    return (
        <div>
            <h2>Edit User</h2>
            {usuario ? (
                <UserForm 
                    onSubmit={handleSubmit} 
                    editingUser={usuario}
                    isEditing={true}
                />
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default EditUserPage;