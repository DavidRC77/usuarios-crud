import {Link} from 'react-router-dom';
import UserItem from './UserItem';

const UserList = ({ usuarios,onDelete,Loading }) => {
    if (Loading) return <div>Loading...</div>;

    return (
        <div className="user-page">
            <div className="user-header">
                <h2>Lista de Usuarios {usuarios.length}</h2>
                <Link to="/users/create" className="btn btn-primary">Crear Usuario</Link>
            </div>
            <div className="user-list">
                {usuarios.length === 0 ? (
                    <p>No hay usuarios disponibles.</p>
                ) : (
                    usuarios.map((usuario) => (
                        <UserItem key={usuario.id} usuario={usuario} onDelete={onDelete} />
                    ))
                )}                        
            </div>
        </div>
    );
}

export default UserList;