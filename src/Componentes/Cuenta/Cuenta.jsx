import React from "react";
import { Link } from "react-router-dom";
import './cuenta.css'

//El componente PagInicio recibe dos props
function Cuenta() {
    return (
        <div className="cuenta-btn">
            <Link to="/editar-perfil">
                <button className="btn">Editar perfil</button>
            </Link>
            <Link to="/premium">
                <button className="btn">Acceder a Premium</button>
            </Link>
            <Link to="/">
                <button className="btn-salir">Salir</button>
            </Link>
        </div>
    );
}

export default Cuenta;