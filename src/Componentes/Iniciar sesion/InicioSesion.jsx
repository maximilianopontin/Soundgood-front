import React, { useState } from "react";
import logo from '../../logo/logo.png';
import { useNavigate } from "react-router-dom";

export default function PagInicioSesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validamos email y contraseña
        if (!validateEmail(email)) {
            setErrorMessage('El email debe ser válido.');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos una mayúscula, un número y un símbolo.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/autenticacion/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    contraseña: password,  
                }),
            });

            // Si la respuesta es exitosa (código 200), obtén el token
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token); // Guarda el token
                clearForm();
                navigate("/home");  // Redirige a la página principal
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Error al iniciar sesión. Inténtalo nuevamente.'); // Muestra el mensaje de error
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            setErrorMessage('Error al intentar iniciar sesión. Inténtalo nuevamente.');
        }
    };

    // Validación para la contraseña
    const validatePassword = (password) => {
        const conditionPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return conditionPassword.test(password);
    };

    // Validación para el email
    const validateEmail = (email) => {
        const conditionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return conditionEmail.test(email);
    };

    // Limpiar el formulario
    const clearForm = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
    };

    return (
        <div className="h-full w-full flex flex-col justify-center">
            <div className="flex flex-col pt-5">
            <img src={logo} alt="Logo" className="w-2/5 sm:w-1 md:w-1/5 self-center" />
            </div>
            <form className="flex flex-col w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 mx-auto p-5" onSubmit={handleFormSubmit}>
                <input className="self-center w-full sm:w-11/12 mb-4 p-2 border border-gray-300 rounded"
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input className="self-center w-full sm:w-11/12 mb-4 p-2 border border-gray-300 rounded"
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button className="self-center w-full sm:w-11/12 py-2 bg-green-600 text-white rounded" type="submit">Iniciar sesión</button>
                <div className="error-message">
                    {errorMessage ? errorMessage : ""}
                </div>
            </form>
        </div>
    );
}
