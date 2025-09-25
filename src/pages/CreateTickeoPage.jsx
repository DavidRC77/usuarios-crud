import { useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';
import TickeoForm from "../components/TickeoForm";

const CreateTickeoPage = () => {
    const navigate = useNavigate();

    const createTickeo = async (tickeoData) => {
        const { error } = await supabase.from("tickeos").insert([tickeoData]);
        if (error) {
            console.error(error);
            return null;
        }
        return true;
    };

    const handleSubmit = async (tickeoData) => {
        await createTickeo(tickeoData);
        navigate('/tickeos');
    };

    return (
        <div>
            <h1>Crear Nuevo Tickeo</h1>
            <TickeoForm onSubmit={handleSubmit} isEditing={false} />
        </div>
    );
};

export default CreateTickeoPage;