import {Link} from "react-router-dom";

const UserItem = ({ usuario, onDelete }) => {
    const cargoDisplay = usuario.cargo_nombre || 'Sin Cargo'; 
    
    return (
        <div className="user-item">     
            <div className="user-details">
                <p><strong>ID:</strong> {usuario.id}</p>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Cargo:</strong> {cargoDisplay}</p> 
                <p><strong>Edad:</strong> {usuario.edad}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
            </div>
            <div className="user-actions">
                <Link to={`/users/edit/${usuario.id}`} className="btn btn-secondary">Editar</Link>
                <Link to={`/users/${usuario.id}`} className="btn btn-danger">Eliminar</Link>
            </div>
        </div>
    );
}

export default UserItem;