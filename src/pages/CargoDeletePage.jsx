import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const CargoDeletePage = () => {
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

    const deleteCargo = async () => {
        const { data, error } = await supabase
            .from("cargos")
            .delete()
            .eq("id", id);
        if (error) {
            console.error(error);
            return null;
        }
        return data;
    }

    const handleDelete = async () => {
        console.log('Deleting cargo with id:', id);
        await deleteCargo();
        navigate('/cargos');
    };

    return (
        <div>
            <h2>Eliminar Cargo</h2>
            {loading ? (
                <p>Cargando datos...</p>
            ) : cargo ? (
                <div>
                    <p>¿Estás seguro de que deseas eliminar el cargo: <strong>{cargo.cargo}</strong>?</p>
                    <button onClick={handleDelete}>Sí, Eliminar</button>
                    <button onClick={() => navigate("/cargos")}>Cancelar</button>
                </div>
            ) : (
                <p>Cargo no encontrado.</p>
            )}
        </div>
    );
};

export default CargoDeletePage;