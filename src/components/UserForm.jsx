import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const UserForm =({onSubmit,editingUser = {},isEditing=false})=>{
    const [formData,setFormData]=useState({
        nombre:editingUser.nombre || '',
        email:editingUser.email || '',
        username:editingUser.username || '',
        password:editingUser.password || '',
        edad:editingUser.edad || ''
    });
    const navigate = useNavigate();

    useEffect(()=>{
        if (isEditing && editingUser.id) {
            setFormData({
                nombre: editingUser.nombre || '',
                email: editingUser.email || '',
                username: editingUser.username || '',
                password: '', 
                edad: editingUser.edad || ''
            });
        }
    },[editingUser, isEditing]);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        let dataToSubmit={...formData};
        
        if(isEditing){
            dataToSubmit.id=editingUser.id; 
            
            // Filtra los campos vacíos (cadenas vacías) para que Supabase no falle
            for (const key in dataToSubmit) {
                if (dataToSubmit[key] === '') {
                    delete dataToSubmit[key];
                }
            }
        }
        
        // Conversión de Edad a entero (solo si el campo existe)
        if(dataToSubmit.edad){
            dataToSubmit.edad=parseInt(dataToSubmit.edad,10);
        }
        
        onSubmit(dataToSubmit);
    } 
    
    const handleCancel=()=>{
        navigate('/users');
    }


    return(
        <div className="form-container">
            <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor='nombre'>Nombre:</label>
                    <input type="text" id="nombre" name="nombre" 
                        value={formData.nombre}
                        onChange={handleChange} /> 
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type="email" id="email" name="email" 
                        value={formData.email}
                        onChange={handleChange} /> 
                </div>
                <div className="form-group">
                    <label htmlFor='username'>Username:</label>
                    <input type="text" id="username" name="username" 
                        value={formData.username}
                        onChange={handleChange} /> 
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input type="password" id="password" name="password" 
                        value={formData.password}
                        onChange={handleChange} 
                        placeholder={isEditing ? 'Dejar en blanco para no cambiar' : ''} /> 
                </div>
                <div className="form-group">
                    <label htmlFor='edad'>Edad:</label>
                    <input type="text" id="edad" name="edad" 
                        value={formData.edad}
                        onChange={handleChange} /> 
                </div>
                <div className="form-actions">
                    <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>

    )
}
export default UserForm;