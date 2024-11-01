// en esta seccion se muestra la pagina de inicio para registro e inicio de seccion
import React from "react";
import logo from '../../logo/logo.png'
import Reproductor from '../Reproductor musica/Reproductor';
import { Link } from "react-router-dom";

//El componente PagInicio recibe dos props
function PagInicio() {
    return (
        <div>
            <div>
            <img src={logo} alt="Logo" className="Logo" />
            </div>

            <div>
                <Link to="/inicio-sesion">
                <button className="green-button">Iniciar sesión</button>
                </Link>

                <Link to="/registro">
                <button className="green-button">Registrate</button>
                </Link>             
            </div>

            <div>
                <Reproductor/>
            </div>

        </div>

    );

}

export default PagInicio;