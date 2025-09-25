import { useParams, useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";
import CargoForm from "../components/CargoForm";

const EditCargoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cargo, setCargo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCargo();
    }, []);

    const getCargo = async () => {
        const { data, error } = await supabase
            .from("cargos")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }
        setCargo(data);
        setLoading(false);
    }
    const updateCargo = async (cargoData) => {
        const { data, error } = await supabase
            .from("cargos")
            .update(cargoData)
            .eq("id", id);
        if (error) {
            console.error(error);
            return null;
        }
        return data;
    }
    const handleSubmit = (cargoData) => {
        console.log('Updating cargo:', cargoData);
        updateCargo(cargoData);
        navigate('/cargos');
    };

    return (
        <div>
            <h2>Editar Cargo</h2>
            {loading ? (
                <p>Cargando datos...</p>
            ) : cargo ? (
                <CargoForm
                    onSubmit={handleSubmit}
                    editingCargo={cargo}
                    isEditing={true}
                />
            ) : (
                <p>Cargo no encontrado.</p>
            )}
        </div>
    );
};

export default EditCargoPage;