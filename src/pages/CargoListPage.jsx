import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from '../supabase/supabaseClient';

const CargoListPage = () => {
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCargos();
    }, []);

    async function getCargos() {
        const { data, error } = await supabase.from("cargos").select();
        if (error) {
            console.error(error);
            return;
        }
        setCargos(data);
        setLoading(false);
    }

    return (
        <div className="page-container">
            <h1>Lista de Cargos</h1>
            <Link to="/cargos/create" className="btn btn-primary">Crear Cargo</Link>
            <div className="list-container">
                {loading ? (
                    <p>Cargando...</p>
                ) : cargos.length === 0 ? (
                    <p>No hay cargos disponibles.</p>
                ) : (
                    cargos.map((cargo) => (
                        <div key={cargo.id} className="user-item"> 
                            <div>
                                <p>Cargo: {cargo.cargo} </p>
                                <p>Sueldo: {cargo.sueldo} Bs</p>
                            </div>
                            <div>
                                <Link to={`/cargos/edit/${cargo.id}`} className="btn btn-secondary">Editar</Link>
                                <Link to={`/cargos/${cargo.id}`} className="btn btn-danger">Eliminar</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CargoListPage;