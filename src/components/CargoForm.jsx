import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CargoForm = ({ onSubmit, editingCargo, isEditing = false }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cargo: editingCargo?.cargo || '',
        sueldo: editingCargo?.sueldo || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancel = () => {
        navigate("/cargos");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };
        if (isEditing) {
            dataToSubmit.id = editingCargo.id;
        }
        if (dataToSubmit.sueldo) {
            dataToSubmit.sueldo = parseInt(dataToSubmit.sueldo, 10);
        }
        onSubmit(dataToSubmit);
    };

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Cargo' : 'Crear Nuevo Cargo'}</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label>Cargo:</label>
                    <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Sueldo:</label>
                    <input
                        type="number"
                        name="sueldo"
                        value={formData.sueldo}
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

export default CargoForm;