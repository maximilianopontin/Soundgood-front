import React, { useState } from "react";
import logo from '../../logo/logo.png';
import './Registro.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function PagRegistro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('El email debe ser válido.');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos una mayúscula, un número y un símbolo.');
            return;
        }
        if (nombre.trim() === '') {
            setErrorMessage('Por favor, ingresa tu nombre.');
            return;
        }
        if (!fechaNacimiento) {
            setErrorMessage('Por favor, selecciona tu fecha de nacimiento.');
            return;
        }
        if (!validateFechaNacimiento(fechaNacimiento)) {
            setErrorMessage('La fecha de nacimiento debe ser anterior al 1 de enero de 2023.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/autenticacion/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    userName,
                    fechaNacimiento: fechaNacimiento ? fechaNacimiento.toISOString().split('T')[0] : null,
                    email,
                    contraseña: password,
                })
            });
            const data = await response.json();

            if (response.status === 201) {
                clearForm();
                navigate("/inicio-sesion");
            } else {
                setErrorMessage(data.message || 'Error al registrar usuario. Inténtalo nuevamente.');
            }
        } catch (error) {
            setErrorMessage('Error al registrar usuario. Inténtalo nuevamente.');
        }
    };

    const validateEmail = (email) => {
        const conditionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return conditionEmail.test(email);
    };

    const validatePassword = (password) => {
        const conditionPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return conditionPassword.test(password);
    };

    const validateFechaNacimiento = (date) => {
        const cutoffDate = new Date('2023-01-01');
        return date < cutoffDate;
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (validatePassword(newPassword)) {
            setErrorMessage('');
        } else {
            setErrorMessage('La contraseña es incorrecta');
        }
    };
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setNombre('');
        setFechaNacimiento(null);
    };

    return (
        <div className="h-full">
            <div className="flex flex-col pt-5">
                <img src={logo} alt="Logo" className="w-2/5 sm:w-1 md:w-1/5 self-center" />
            </div>
            <form className="flex flex-col w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 mx-auto p-5" onSubmit={handleFormSubmit}>
                <input className="self-center w-full sm:w-11/12 mb-4 p-2 border border-gray-300 rounded" type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input className="self-center w-full sm:w-11/12 mb-4 p-2 border border-gray-300 rounded" type="text" name="userName" placeholder="UserName" value={userName} onChange={handleUserNameChange} required />

                <DatePicker
                    selected={fechaNacimiento}
                    onChange={(date) => setFechaNacimiento(date)}
                    placeholderText="Fecha de nacimiento"
                    dateFormat="dd/MM/yyyy"
                    className="date-picker"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    popperPlacement="bottom-start"
                    popperModifiers={{
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'viewport'
                        }
                    }}
                />
                <input className="self-center w-full sm:w-11/12 mb-4 p-2 border border-gray-300 rounded" type="text" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                <input className="self-center w-full sm:w-11/12 mb-4 p-2 border border-gray-300 rounded" type="password" name="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange} required />

                <div className="ml-3 text-left text-white mb-5 p-2 w-11/12 box-border">
                    <p>Términos y Condiciones de SoundGood</p>
                    <p>Al registrarte en SoundGood, aceptas nuestros términos y condiciones. Por favor, asegúrate de revisarlos periódicamente, ya que pueden cambiar. Gracias por unirte a nuestra comunidad musical.</p>
                </div>
                <button className="self-center w-full sm:w-11/12 py-2 bg-green-600 text-white rounded" type="submit">Aceptar y registrarse</button>

                <div className="error-message">
                    {errorMessage ? errorMessage : ""}
                </div>
            </form>
        </div>
    );
}
