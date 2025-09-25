import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from '../supabase/supabaseClient';

const TickeoListPage = () => {
    const [tickeos, setTickeos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTickeos();
    }, []);

    async function getTickeos() {
        const { data, error } = await supabase
            .from("tickeos")
            .select(`
                *,
                usuarios:id_usuario (nombre)
            `);
        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }
        setTickeos(data);
        setLoading(false);
    }

    return (
        <div className="page-container">
            <h1>Lista de Tickeos</h1>
            <Link to="/tickeos/create" className="btn btn-primary">Crear Tickeo</Link>
            <div className="list-container">
                {loading ? (
                    <p>Cargando...</p>
                ) : tickeos.length === 0 ? (
                    <p>No hay tickeos disponibles.</p>
                ) : (
                    tickeos.map((tickeo) => (
                        <div key={tickeo.id} className="user-item"> 
                            <div>
                                <p>Empleado: {tickeo.usuarios?.nombre || 'N/A'} </p>
                                <p>Tipo: {tickeo.tipo ? 'ENTRADA' : 'SALIDA'}</p>
                                <p>Fecha: {tickeo.fecha}</p>
                                <p>Hora: {tickeo.hora}</p>
                            </div>
                            <div>
                                <Link to={`/tickeos/edit/${tickeo.id}`} className="btn btn-secondary">Editar</Link>
                                <Link to={`/tickeos/${tickeo.id}`} className="btn btn-danger">Eliminar</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TickeoListPage;