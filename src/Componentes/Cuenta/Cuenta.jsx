import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './cuenta.css'

//El componente PagInicio recibe dos props
function Cuenta() {
    const navigate = useNavigate();

    const handleLogut = () => {
        localStorage.clear();
        navigate("/"); 
    }

    return (
        <div className="cuenta-btn">
            <Link to="/editar-perfil">
                <button className="btn">Editar perfil</button>
            </Link>
            <Link to="/premium">
                <button className="btn">Acceder a Premium</button>
            </Link>
            <button className="btn-salir" onClick={() => handleLogut() }>Salir</button>
        </div>
    );
}

export default Cuenta;