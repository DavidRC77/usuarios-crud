import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const TickeoDeletePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tickeo, setTickeo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTickeo();
    }, []);

    const getTickeo = async () => {
        const { data, error } = await supabase
            .from("tickeos")
            .select(`
                *,
                usuarios:id_usuario (nombre)
            `)
            .eq("id", id)
            .single();
        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }
        setTickeo(data);
        setLoading(false);
    }

    const deleteTickeo = async () => {
        const { error } = await supabase
            .from("tickeos")
            .delete()
            .eq("id", id);
        if (error) {
            console.error(error);
            return null;
        }
        return true;
    }

    const handleDelete = async () => {
        await deleteTickeo();
        navigate('/tickeos');
    };

    return (
        <div>
            <h2>Eliminar Tickeo</h2>
            {loading ? (
                <p>Cargando datos...</p>
            ) : tickeo ? (
                <div>
                    <p>¿Estás seguro de que deseas eliminar el tickeo del empleado: <strong>{tickeo.usuarios?.nombre}</strong> de la fecha <strong>{tickeo.fecha}</strong>?</p>
                    <button onClick={handleDelete}>Sí, Eliminar</button>
                    <button onClick={() => navigate("/tickeos")}>Cancelar</button>
                </div>
            ) : (
                <p>Tickeo no encontrado.</p>
            )}
        </div>
    );
};

export default TickeoDeletePage;