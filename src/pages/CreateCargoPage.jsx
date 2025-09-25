import { useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import CargoForm from "../components/CargoForm";

const CreateCargoPage = () => {
    const navigate = useNavigate();

    const createCargo = async (cargoData) => {
        const { error } = await supabase.from("cargos").insert([cargoData]);
        if (error) {
            console.error("Error al crear el cargo:", error);
            return null;
        }
        return true;
    };

    const handleSubmit = async (cargoData) => {
        console.log("Creando cargo:", cargoData);
        const result = await createCargo(cargoData);
        if (result) {
            navigate("/cargos");
        }
    };

    return (
        <div>
            <h1>Crear Nuevo Cargo</h1>
            <CargoForm onSubmit={handleSubmit} isEditing={false} />
        </div>
    );
};

export default CreateCargoPage;