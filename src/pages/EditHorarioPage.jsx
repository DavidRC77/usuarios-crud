import { useParams, useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";
import HorarioForm from "../components/HorarioForm";

const EditHorarioPage = () => {
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
    const updateHorario = async (horarioData) => {
        const { error } = await supabase
            .from("horarios")
            .update(horarioData)
            .eq("id", id);
        if (error) {
            console.error(error);
            return null;
        }
        return true;
    }
    const handleSubmit = async (horarioData) => {
        await updateHorario(horarioData);
        navigate('/horarios');
    };

    return (
        <div>
            <h2>Editar Horario</h2>
            {loading ? (
                <p>Cargando datos...</p>
            ) : horario ? (
                <HorarioForm
                    onSubmit={handleSubmit}
                    editingHorario={horario}
                    isEditing={true}
                />
            ) : (
                <p>Horario no encontrado.</p>
            )}
        </div>
    );
};

export default EditHorarioPage;