import { useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';
import HorarioForm from "../components/HorarioForm";

const CreateHorarioPage = () => {
    const navigate = useNavigate();

    const createHorario = async (horarioData) => {
        const { error } = await supabase.from("horarios").insert([horarioData]);
        if (error) {
            console.error(error);
            return null;
        }
        return true;
    };

    const handleSubmit = async (horarioData) => {
        await createHorario(horarioData);
        navigate('/horarios');
    };

    return (
        <div>
            <h1>Crear Nuevo Horario</h1>
            <HorarioForm onSubmit={handleSubmit} isEditing={false} />
        </div>
    );
};

export default CreateHorarioPage;