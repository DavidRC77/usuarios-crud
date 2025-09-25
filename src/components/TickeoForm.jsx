import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';

const TickeoForm = ({ onSubmit, editingTickeo, isEditing = false }) => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    const [formData, setFormData] = useState({
        id_usuario: editingTickeo?.id_usuario || '',
        fecha: editingTickeo?.fecha || '',
        hora: editingTickeo?.hora || '',
        tipo: editingTickeo?.tipo ?? true, // Default a true (ENTRADA) si no hay valor
    });

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const { data, error } = await supabase.from("usuarios").select("id, nombre");
        if (error) {
            console.error(error);
        } else {
            setUsuarios(data);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleCancel = () => {
        navigate("/tickeos");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };
        if (isEditing) {
            dataToSubmit.id = editingTickeo.id;
        }
        onSubmit(dataToSubmit);
    };

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Tickeo' : 'Crear Nuevo Tickeo'}</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label>Empleado:</label>
                    <select
                        name="id_usuario"
                        value={formData.id_usuario}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un empleado</option>
                        {usuarios.map(usuario => (
                            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Fecha:</label>
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hora:</label>
                    <input
                        type="time"
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group checkbox-group">
                    <label>Tipo (Entrada / Salida):</label>
                    <input
                        type="checkbox"
                        name="tipo"
                        checked={formData.tipo}
                        onChange={handleChange}
                    />
                    <span>{formData.tipo ? 'Entrada (true)' : 'Salida (false)'}</span>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">{isEditing ? 'Guardar Cambios' : 'Crear'}</button>
                    <button type="button" onClick={handleCancel} className="cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default TickeoForm;