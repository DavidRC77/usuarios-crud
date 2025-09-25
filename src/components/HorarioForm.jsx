import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HorarioForm = ({ onSubmit, editingHorario, isEditing = false }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hora_ingreso: editingHorario?.hora_ingreso || '',
        hora_salida: editingHorario?.hora_salida || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancel = () => {
        navigate("/horarios");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };
        if (isEditing) {
            dataToSubmit.id = editingHorario.id;
        }
        onSubmit(dataToSubmit);
    };

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Horario' : 'Crear Nuevo Horario'}</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label>Hora de Entrada:</label>
                    <input
                        type="time"
                        name="hora_ingreso"
                        value={formData.hora_ingreso}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hora de Salida:</label>
                    <input
                        type="time"
                        name="hora_salida"
                        value={formData.hora_salida}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">{isEditing ? 'Guardar Cambios' : 'Crear'}</button>
                    <button type="button" onClick={handleCancel} className="cancel-btn">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default HorarioForm;