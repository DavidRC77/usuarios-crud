import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const HorarioDeletePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [horario, setHorario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHorario();
    }, []);

    const getHorario = async () => {
        const { data, error } = await supabase
            .from("horarios")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }
        setHorario(data);
        setLoading(false);
    }

    const deleteHorario = async () => {
        const { error } = await supabase
            .from("horarios")
            .delete()
            .eq("id", id);
        if (error) {
            console.error(error);
            return null;
        }
        return true;
    }

    const handleDelete = async () => {
        await deleteHorario();
        navigate('/horarios');
    };

    return (
        <div>
            <h2>Eliminar Horario</h2>
            {loading ? (
                <p>Cargando datos...</p>
            ) : horario ? (
                <div>
                    <p>¿Estás seguro de que deseas eliminar el horario de ingreso: <strong>{horario.hora_ingreso}</strong> y salida: <strong>{horario.hora_salida}</strong>?</p>
                    <button onClick={handleDelete}>Sí, Eliminar</button>
                    <button onClick={() => navigate("/horarios")}>Cancelar</button>
                </div>
            ) : (
                <p>Horario no encontrado.</p>
            )}
        </div>
    );
};

export default HorarioDeletePage;