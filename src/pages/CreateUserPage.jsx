import {useNavigate} from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import UserForm from '../components/UserForm';





const CreateUserPage = () => {
    const navigate = useNavigate();

const createUser = async(userData) => {
    const {data,error} = await supabase
                                .from("usuarios")
                                .insert([userData]);
    if(error){
        console.error(error);
        return null;
    }
    return data;
}
    const handleSubmit = (userData) => {  
        createUser(userData);
        navigate('/users');
    };
    return (
        <div>
            <h1>Create New User</h1>
            <UserForm onSubmit={handleSubmit} isEditing={false} />
        </div>  
    );
};

export default CreateUserPage;