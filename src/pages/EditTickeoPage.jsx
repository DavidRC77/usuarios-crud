import { useParams, useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";
import TickeoForm from "../components/TickeoForm";

const EditTickeoPage = () => {
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
    const updateTickeo = async (tickeoData) => {
        const { error } = await supabase
            .from("tickeos")
            .update(tickeoData)
            .eq("id", id);
        if (error) {
            console.error(error);
            return null;
        }
        return true;
    }
    const handleSubmit = async (tickeoData) => {
        await updateTickeo(tickeoData);
        navigate('/tickeos');
    };

    return (
        <div>
            <h2>Editar Tickeo</h2>
            {loading ? (
                <p>Cargando datos...</p>
            ) : tickeo ? (
                <TickeoForm
                    onSubmit={handleSubmit}
                    editingTickeo={tickeo}
                    isEditing={true}
                />
            ) : (
                <p>Tickeo no encontrado.</p>
            )}
        </div>
    );
};

export default EditTickeoPage;