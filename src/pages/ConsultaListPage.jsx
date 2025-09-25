import { useState, useEffect } from "react";
import supabase from '../supabase/supabaseClient';

const ConsultasPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [consultaType, setConsultaType] = useState('cargo_especifico');

    // Parámetros de consulta
    const [cargoName, setCargoName] = useState('');
    const [sueldoMin, setSueldoMin] = useState('');
    const [sueldoRangeMin, setSueldoRangeMin] = useState('');
    const [sueldoRangeMax, setSueldoRangeMax] = useState('');
    const [tardanzaHora, setTardanzaHora] = useState('08:00:00');
    const [tempranoHora, setTempranoHora] = useState('18:00:00');

    useEffect(() => {
        getUsuarios();
        getCargos();
    }, []);

    async function getUsuarios() {
        const { data } = await supabase.from("usuarios").select("id, nombre").order('nombre');
        setUsuarios(data || []);
    }

    async function getCargos() {
        const { data } = await supabase.from("cargos").select("id, cargo").order('cargo');
        setCargos(data || []);
    }

    // Lógica de Consultas
    async function executeQuery() {
        setLoading(true);
        setResults([]);
        let data, error;

        switch (consultaType) {
            case 'cargo_especifico':
                ({ data, error } = await supabase
                    .from("cargos_usuarios")
                    .select(`
                        usuarios:id_usuario (nombre, email),
                        cargos:id_cargo (cargo, sueldo)
                    `)
                    .eq('id_cargo', cargoName)
                    .not('cargos', 'is', null));
                break;

            case 'sueldo_mayor':
                ({ data, error } = await supabase
                    .from("cargos_usuarios")
                    .select(`
                        usuarios:id_usuario (nombre, email),
                        cargos:id_cargo (cargo, sueldo)
                    `)
                    .gte('cargos.sueldo', sueldoMin)
                    .not('cargos', 'is', null));
                break;
            
            case 'sueldo_rango':
                ({ data, error } = await supabase
                    .from("cargos_usuarios")
                    .select(`
                        usuarios:id_usuario (nombre, email),
                        cargos:id_cargo (cargo, sueldo)
                    `)
                    .gte('cargos.sueldo', sueldoRangeMin)
                    .lte('cargos.sueldo', sueldoRangeMax)
                    .not('cargos', 'is', null));
                break;

            case 'llegada_tarde':
                ({ data, error } = await supabase
                    .from("tickeos")
                    .select(`
                        usuarios:id_usuario (nombre, email),
                        fecha,
                        hora
                    `)
                    .eq('tipo', true) 
                    .gt('hora', tardanzaHora)
                    .order('fecha', { ascending: false }));
                break;

            case 'salida_temprana':
                ({ data, error } = await supabase
                    .from("tickeos")
                    .select(`
                        usuarios:id_usuario (nombre, email),
                        fecha,
                        hora
                    `)
                    .eq('tipo', false) 
                    .lt('hora', tempranoHora)
                    .order('fecha', { ascending: false }));
                break;

            default:
                break;
        }

        if (error) {
            console.error(error);
            alert("Error al ejecutar la consulta.");
        } else {
            setResults(data || []);
        }
        setLoading(false);
    }

    const renderInputFields = () => {
        switch (consultaType) {
            case 'cargo_especifico':
                return (
                    <div className="form-group">
                        <label>Seleccionar Cargo:</label>
                        <select value={cargoName} onChange={(e) => setCargoName(e.target.value)} required>
                            <option value="">-- Seleccione un cargo --</option>
                            {cargos.map(c => <option key={c.id} value={c.id}>{c.cargo}</option>)}
                        </select>
                    </div>
                );
            case 'sueldo_mayor':
                return (
                    <div className="form-group">
                        <label>Sueldo Mínimo (Bs):</label>
                        <input type="number" value={sueldoMin} onChange={(e) => setSueldoMin(e.target.value)} required />
                    </div>
                );
            case 'sueldo_rango':
                return (
                    <div className="form-group-inline">
                        <p>
                        <label>Sueldo Min:</label>
                        <input type="number" value={sueldoRangeMin} onChange={(e) => setSueldoRangeMin(e.target.value)} required />
                        </p>
                        <p>
                        <label>Sueldo Max:</label>
                        <input type="number" value={sueldoRangeMax} onChange={(e) => setSueldoRangeMax(e.target.value)} required />
                        </p>
                    </div>
                );
            case 'llegada_tarde':
                return (
                    <div className="form-group">
                        <label>Hora de Ingreso Permitida (Ej: 08:00:00):</label>
                        <input type="time" step="1" value={tardanzaHora} onChange={(e) => setTardanzaHora(e.target.value)} required />
                    </div>
                );
            case 'salida_temprana':
                return (
                    <div className="form-group">
                        <label>Hora de Salida (Mínima) (Ej: 18:00:00):</label>
                        <input type="time" step="1" value={tempranoHora} onChange={(e) => setTempranoHora(e.target.value)} required />
                    </div>
                );
            default:
                return null;
        }
    };

    const renderResults = () => {
        if (loading) return <p>Cargando resultados...</p>;
        if (results.length === 0) return <p>No hay resultados para la consulta seleccionada.</p>;

        if (['cargo_especifico', 'sueldo_mayor', 'sueldo_rango'].includes(consultaType)) {
            return (
                <div className="report-list">
                    {results.map((item, index) => (
                        <div key={index} className="user-item">
                            <strong>{item.usuarios.nombre}</strong> ({item.usuarios.email}) - 
                            Cargo: {item.cargos.cargo} | Sueldo: {item.cargos.sueldo} Bs
                        </div>
                    ))}
                </div>
            );
        }

        if (['llegada_tarde', 'salida_temprana'].includes(consultaType)) {
            return (
                <div className="report-list">
                    {results.map((item, index) => (
                        <div key={index} className="user-item">
                            <strong>{item.usuarios.nombre}</strong> ({item.usuarios.email}) | 
                            Fecha: {item.fecha} | Hora: {item.hora}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="page-container">
            <h1>Consultas Avanzadas</h1>

            <div className="report-section user-item">
                <h2>Seleccione la Consulta a Ejecutar</h2>
                
                <div className="form-group">
                    <label>Tipo de Consulta:</label>
                    <select value={consultaType} onChange={(e) => setConsultaType(e.target.value)}>
                        <option value="cargo_especifico">1. Listar usuarios con Cargo Específico</option>
                        <option value="sueldo_mayor">2. Listar usuarios que ganan más de X Bs</option>
                        <option value="sueldo_rango">3. Listar usuarios que ganan entre X Bs y Y Bs</option>
                        <option value="llegada_tarde">4. Listar usuarios que llegaron tarde</option>
                        <option value="salida_temprana">5. Listar usuarios que se fueron temprano</option>
                    </select>
                </div>

                {renderInputFields()}

                <button onClick={executeQuery} className="btn btn-primary" disabled={loading}>
                    {loading ? 'Cargando...' : 'Ejecutar Consulta'}
                </button>
            </div>

            <hr/>

            <div className="report-section">
                <h2>Resultados</h2>
                {renderResults()}
            </div>
        </div>
    );
};

export default ConsultasPage;