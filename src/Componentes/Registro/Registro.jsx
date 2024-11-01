import React, { useState } from "react";
import logo from '../../logo/logo.png';
import './Registro.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";

export function PagRegistro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(null);

    const navigate = useNavigate();


    // Validamos que la contraseña y email cumpla con las condiciones dadas.
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validamos el email
        if (!validateEmail(email)) {
            setErrorMessage('El email debe ser válido.');
            return;
        }
        // Validamos la contraseña
        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos una mayúscula, un número y un símbolo.');
            return;
        }
        // Validaciones de nombre
        if (nombre.trim() === '') { // El método TRIM() limpia los espacios que puede llegar a poner el usuario
            setErrorMessage('Por favor, ingresa tu nombre.');
            return;
        }
        // Validación de la fecha de nacimiento
        if (!fechaNacimiento) {
            setErrorMessage('Por favor, selecciona tu fecha de nacimiento.');
            return;
        }
        if (!validateFechaNacimiento(fechaNacimiento)) {
            setErrorMessage('La fecha de nacimiento debe ser anterior al 1 de enero de 2023.');
            return;
        }


        // Constante para poder cargar el JSON (ejemplo de uso, ya que no hay detalles específicos sobre el almacenamiento de datos)
        const userData = {
            email,
            password,
            nombre,
            fechaNacimiento: fechaNacimiento ? fechaNacimiento.toISOString() : null
        };

        // Puedes agregar aquí la lógica para almacenar el userData en localStorage o enviarlo a un servidor

        clearForm(); // Si el formulario se envía correctamente, este se limpia
        
        navigate("/inicio-sesion");
    }

    // Validación para el email
    const validateEmail = (email) => {
        const conditionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return conditionEmail.test(email);
    }

    // Validación para las condiciones de la contraseña
    const validatePassword = (password) => {
        const conditionPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return conditionPassword.test(password);
    }
    //Validacion para las condiciones de la fecha de nacimiento
    const validateFechaNacimiento = (date) => {
        const cutoffDate = new Date('2023-01-01');
        return date < cutoffDate;
    }

    // Validamos si el email cumple con las condiciones
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setErrorMessage('');
    }

    // Validamos si la contraseña está bien o mal
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (validatePassword(newPassword)) {
            setErrorMessage('');
        } else {
            setErrorMessage('La contraseña es incorrecta');
        }
    }

    // Limpiar el formulario
    const clearForm = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setNombre('');
        setFechaNacimiento(null);
    }

    return (
        <div>
            <img src={logo} alt="Logo" className="Logo" />
            <form className="form" onSubmit={handleFormSubmit}>
               
                <input type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <DatePicker
                    selected={fechaNacimiento}
                    onChange={(date) => setFechaNacimiento(date)}
                    placeholderText="Fecha de nacimiento"
                    dateFormat="dd/MM/yyyy"
                    className="date-picker"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    popperPlacement="bottom-start" // Ajuste para la posición del popper
                    popperModifiers={{
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'viewport'
                        } 
                          }}
                />
                        <input type="text" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange} required />
                  


                <div className="parrafos">
                    <p>Términos y Condiciones de SoundGood</p>
                    <p>Al registrarte en SoundGood, aceptas nuestros términos y condiciones. Por favor, asegúrate de revisarlos periódicamente, ya que pueden cambiar. Gracias por unirte a nuestra comunidad musical.</p>
                </div>
                <button type="submit">Aceptar y registrarse</button>

                <div className="error-message">
                    {errorMessage ? errorMessage : ""}
                </div>
            </form>
        </div>
    );
}
