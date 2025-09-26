import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';


const EditUserCargoPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedCargoId, setSelectedCargoId] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        
        const { data: userData } = await supabase.from("usuarios").select("id, nombre").order('id');
        const { data: cargoData } = await supabase.from("cargos").select("id, cargo").order('id');

        setUsuarios(userData || []);
        setCargos(cargoData || []);
        
        if (userData && userData.length > 0) setSelectedUserId(String(userData[0].id));
        if (cargoData && cargoData.length > 0) setSelectedCargoId(String(cargoData[0].id));
        
        setLoading(false);
    };

    const handleUpdateCargo = async (e) => {
        e.preventDefault();
        
        if (!selectedUserId || !selectedCargoId || !fechaInicio) {
            alert("Debe seleccionar un usuario, un cargo y una fecha.");
            return;
        }
        
        const userId = parseInt(selectedUserId, 10);
        const cargoId = parseInt(selectedCargoId, 10);
        
        if (isNaN(userId) || isNaN(cargoId)) {
             alert("Error de datos: El ID de Usuario o Cargo no es un número válido.");
             return;
        }

        const { error } = await supabase
            .from("cargos_usuarios")
            .insert([{ 
                id_usuario: userId, 
                id_cargo: cargoId, 
                fecha_inicio: fechaInicio
            }]);

        if (error) {
            alert(`Error al actualizar el cargo. Revise la consola para detalles. Mensaje: ${error.message}`);
        } else {
            alert("¡Cargo actualizado exitosamente (Nuevo registro de cargo creado)!");
            navigate('/users');
        }
    };

    if (loading) return <div className="page-container"><p>Cargando datos...</p></div>;

    return (
        <div className="page-container">
            <h1>Registrar Nuevo Cargo de Usuario</h1>
            <form onSubmit={handleUpdateCargo}>
                <div className="form-group">
                    <label htmlFor="user-select">Seleccionar Usuario (ID - Nombre):</label>
                    <select 
                        id="user-select" 
                        value={selectedUserId} 
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        required
                    >
                        {usuarios.map(user => (
                            <option key={user.id} value={user.id}>
                                ID: {user.id} - {user.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="cargo-select">Seleccionar Nuevo Cargo (ID - Cargo):</label>
                    <select 
                        id="cargo-select" 
                        value={selectedCargoId} 
                        onChange={(e) => setSelectedCargoId(e.target.value)}
                        required
                    >
                        {cargos.map(cargo => (
                            <option key={cargo.id} value={cargo.id}>
                                ID: {cargo.id} - {cargo.cargo}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="fecha-inicio">Fecha de Inicio del Cargo:</label>
                    <input 
                        id="fecha-inicio"
                        type="date" 
                        value={fechaInicio} 
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Guardar Nuevo Cargo</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/users')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserCargoPage;