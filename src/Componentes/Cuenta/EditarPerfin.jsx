import React, { useState, useEffect } from 'react';
import './EditarPerfil.css';
import './cuenta.css';
import { Link } from 'react-router-dom';
import { Nav } from '../Nav/Nav'
import Footer from '../Footer/Footer';


function EditaPerfil() {
    const [cliente, setCliente] = useState({
        nombre: '',
        email: '',
        contraseña: '',
        fechaDeNacimiento: ''
    });
    const [mensajeGuardado, setMensajeGuardado] = useState(false);

    const clienteId = 8; // Id del cliente que deseas editar

    useEffect(() => {
        const obtenerDatosCliente = async () => {
            try {
                const response = await fetch('/registro.json');
                const datos = await response.json();
                const clienteEncontrado = datos.find(cliente => cliente.id === clienteId);
                if (clienteEncontrado) {
                    setCliente(clienteEncontrado);
                } else {
                    console.error('Cliente no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener los datos del cliente:', error);
            }
        };

        obtenerDatosCliente();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prevCliente) => ({
            ...prevCliente,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // llamada a la API para guardar los datos actualizados del cliente
        console.log('Datos actualizados del cliente:', cliente);
        setMensajeGuardado(true);
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => setMensajeGuardado(false), 3000);
    };

    return (
        <>
            <div>
                <Nav />
            </div>
            <div className="container-editar-perfil">

                <h1>Editar perfil</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input className='input-editar-Perfil'
                            type="text"
                            name="nombre"
                            value={cliente.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input className='input-editar-Perfil'
                            type="email"
                            name="email"
                            value={cliente.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input className='input-editar-Perfil'
                            type="password"
                            name="contraseña"
                            value={cliente.contraseña}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento:</label>
                        <input className='input-editar-Perfil'
                            type="date"
                            name="fechaDeNacimiento"
                            value={cliente.fechaDeNacimiento}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn-guardar" type="submit">Guardar Cambios</button>
                    <div className="error-message">
                        {mensajeGuardado && <p className="mensaje-guardado">Sus cambios han sido guardados</p>}
                    </div> 
                    <Link to="/cuenta">
                            <button className="btn-regresar">Regresar a cuenta</button>
                        </Link>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default EditaPerfil;
