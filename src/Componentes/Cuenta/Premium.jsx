import React, { useState } from 'react';
import Footer from "../Footer/Footer";
import { Nav } from "../Nav/Nav";
import './EditarPerfil.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import './premium.css';

function Premium() {
    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('APP_USR-7481233767070694-102420-be7e374961dd92e3cc39446b697d1e19-225509543', { locale: 'es-AR' });
    
    const createPreference = async () => {
        try {
            const res = await fetch('https://soundgood-back.onrender.com/mercadopago/create_preference', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: [
                        {
                            title: "Soundgood premium",
                            quantity: 1,
                            currency_id: "ARS",  // Incluye la moneda
                            unit_price: 50
                        }
                    ]
                })
            });
            const parsed = await res.json();
            return parsed; // Retorna el objeto completo
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleBuyingProcess = async () => {
        const response = await createPreference();        
        if (response && response.id) {
            setPreferenceId(response.id);
        }
    };

    return (
        <>
            <Nav className="nav-fixed" />
            <main className="premium-main">
                <h2 className="premium-title">Sound Good Premium</h2>
                <button className="premium-button" onClick={handleBuyingProcess}>Pagar con Mercado Pago</button>
                {preferenceId && (
                    <Wallet 
                        initialization={{ preferenceId }} 
                        customization={{ texts: { valueProp: 'smart_option' } }} 
                    />
                )}
            </main>
            <Footer className="footer-fixed" />
        </>
    );
}

export default Premium;
