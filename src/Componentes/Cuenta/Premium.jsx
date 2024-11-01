import React, { useState } from 'react';
import Footer from "../Footer/Footer";
import { Nav } from "../Nav/Nav";
import './EditarPerfil.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import './premium.css'

function Premium() {
    const [preferendeId, setPreferenceId] = useState(null);
    initMercadoPago('APP_USR-7481233767070694-102420-be7e374961dd92e3cc39446b697d1e19-225509543', { locale: 'es-AR' });
    
    const createPreference = async () => {
        try {
            const res = await fetch('https://soundgood-back.onrender.com/create-preference', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "Soundgood premium",
                    quantity: 1,
                    unit_price: 50
                })
            });
            const parsed = await res.json();
            const { id } = parsed;
            return id;
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleBuyingProcess = async () => {
        const id = await createPreference();
        if (id) setPreferenceId(id);
    };

    return (
        <>
            <Nav className="nav-fixed" />
            <main className="premium-main">
                <h2 className="premium-title">Sound Good Premium</h2>
                <button className="premium-button" onClick={handleBuyingProcess}>Pagar con Mercado Pago</button>
                {preferendeId && (
                    <Wallet 
                        initialization={{ preferenceId: preferendeId }} 
                        customization={{ texts: { valueProp: 'smart_option' } }} 
                    />
                )}
            </main>
            <Footer className="footer-fixed" />
        </>
    );
}

export default Premium;
