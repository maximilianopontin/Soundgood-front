import React, { useState } from 'react';
import Footer from "../Footer/Footer";
import { Nav } from "../Nav/Nav";
import { Link } from 'react-router-dom';
import './EditarPerfil.css';

function Premium() {
    const [mensajeGuardado, setMensajeGuardado] = useState(false);
    const [cliente, setCliente] = useState({
        tarjeta: '',
        fecha: '',
        codigo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí deberías hacer una llamada a la API para guardar los datos actualizados del cliente
        console.log('Datos actualizados del cliente:', cliente);
        setMensajeGuardado(true);
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => setMensajeGuardado(false), 3000);
    };

    return (
        <>
            <Nav />
            <div className="contenedor-premium">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Acceder a Premium</h1>
                    <input
                        type="text"
                        name="tarjeta"
                        placeholder="N° de tarjeta"
                        required
                        value={cliente.tarjeta}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="fecha"
                        placeholder="Fecha"
                        required
                        value={cliente.fecha}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="codigo"
                        placeholder="codigo"
                        required
                        value={cliente.codigo}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn-guardar">Pagar</button>
                    <div className="error-message">
                        {mensajeGuardado && <p className="mensaje-guardado">Su pago fue exitoso, disfrute de Sound Good premium</p>}
                    </div>
                   
                </form> 
                <Link to="/cuenta">
                        <button className="btn-regresar-premium">Regresar a cuenta</button>
                    </Link>
            </div>
            <Footer />
        </>
    );
}

export default Premium;
