import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from '../supabase/supabaseClient';

const HorarioListPage = () => {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHorarios();
    }, []);

    async function getHorarios() {
        const { data, error } = await supabase.from("horarios").select();
        if (error) {
            console.error(error);
            return;
        }
        setHorarios(data);
        setLoading(false);
    }

    return (
        <div className="page-container">
            <h1>Lista de Horarios</h1>
            <Link to="/horarios/create" className="btn btn-primary">Crear Horario</Link>
            <div className="list-container">
                {loading ? (
                    <p>Cargando...</p>
                ) : horarios.length === 0 ? (
                    <p>No hay horarios disponibles.</p>
                ) : (
                    horarios.map((horario) => (
                        <div key={horario.id} className="user-item">
                            <div>
                                <p>Entrada: {horario.hora_ingreso} </p>
                                <p>Salida: {horario.hora_salida}</p>
                            </div>
                            <div>
                                <Link to={`/horarios/edit/${horario.id}`} className="btn btn-secondary">Editar</Link>
                                <Link to={`/horarios/${horario.id}`} className="btn btn-danger">Eliminar</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HorarioListPage;