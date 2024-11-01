import React from 'react';
import './Links.css';
import { Link } from 'react-router-dom';
function Ayudas() {
    return (
        <div className='container-link'>
            <h1>¿Cómo te podemos ayudar?</h1>
            <h2>Actualizaciones de precios</h2>
            <p>
                A medida que seguimos ampliando nuestra plataforma, actualizamos los precios de Premium para poder seguir innovando en las cambiantes condiciones del mercado. Estas actualizaciones nos ayudarán a seguir entregando valor a los fans.
            </p>
            <h2>Ayuda con errores de pago</h2>
            <p>Asegúrate de que tu método de pago tenga fondos suficientes y esté de la siguiente manera:</p>
            <ol>
                <li>Registrado en el mismo país de tu cuenta de Soundgood.</li>
                <li>Vigente.</li>
                <li>Habilitado para realizar compras en el extranjero, transacciones en línea y recurrentes. Puedes configurar estas opciones desde la aplicación móvil de tu banco.</li>
            </ol>
            <p>
                También asegúrate de que tu banco o proveedor de pagos tenga tus datos correctos. Es posible que deban verificar tu identidad por cuestiones de seguridad a través de una contraseña, código PIN, huella dactilar o un código enviado a tu dispositivo.
            </p>
            <p>¿Ninguna de estas opciones resolvió el problema?</p>
            <ol>
                <li>Prueba volver a ingresar tus datos de pago desde una ventana de navegación privada o en el modo incógnito.</li>
                <li>Intenta con un método de pago diferente.</li>
                <li>Es posible que solo se trate de un problema de conexión temporal. Espera un par de horas e inténtalo de nuevo.</li>
                <li>Comunícate con tu proveedor de pagos.</li>
            </ol>
            <h2>¿Hubo un error con el pago regular?</h2>
            <p>
                Si hay un error con el pago mensual de tu suscripción, no perderás acceso a Premium de inmediato. Intentaremos volver a procesar el pago en los próximos días.
            </p>
            <p>
                Pagos a través de una compañía asociada:
                Si te suscribiste al plan a través de una compañía asociada (p. ej. tu proveedor de Internet o de telefonía móvil), esa compañía administrará tus pagos. Deberás comunicarte con ella por cualquier asunto relacionado con los pagos.
            </p>
            <h2>Métodos de pago</h2>
            <p>
                Nota: puede que nuestra oferta de métodos de pago varíe según el país o la región donde te encuentres.
            </p>
            <p>
                Para ver qué métodos de pago están disponibles en tu ubicación:
            </p>
            <ol>
                <li>Ve a soundgood.com/premium.</li>
                <li>Elige un plan Premium.</li>
                <li>Todas las opciones de pago para la ubicación de tu cuenta se mostrarán en la siguiente página.</li>
            </ol>
            <p>
                Importante: no se te cobrará nada hasta que envíes la información de pago.
            </p>
            <h2>Cancelar planes Premium</h2>
            <p>
                Cancela tu plan Premium en cualquier momento en la página de tu cuenta:
            </p>
            <ol>
                <li>Inicia sesión en soundgood.com/account.</li>
                <li>En Tu plan, haz clic en CAMBIAR PLAN.</li>
                <li>Desplázate hasta llegar a Cancelar Soundgood y haz clic en CANCELAR PREMIUM.</li>
                <li>Mantendrás tu suscripción Premium hasta la próxima fecha de facturación. Luego, tu cuenta pasará a ser gratis.</li>
            </ol>
            <p>
                Conservarás tus playlists y tu música guardada cuando tu cuenta sea gratuita. También puedes iniciar sesión y escuchar música con anuncios.
                Si eres miembro del plan y sigues los pasos anteriores, se eliminará tu cuenta del plan, pero no lo cancelará. Ponte en contacto con el titular del plan para cancelar o actualizar el método de pago.
                Consulta nuestra guía si quieres cambiar de plan Premium.
            </p>
            <h2>No puedo iniciar sesión</h2>
            <p>
                Si no recuerdas tu contraseña, puedes restablecerla.
                Si no recuerdas tu email o tu nombre de usuario, ve a la página para restablecer tu cuenta e ingresa direcciones de email que tengas. Cuando ingreses una dirección que esté registrada en Soundgood, aparecerá un mensaje indicando que se envió el email para restablecer la contraseña.
            </p>
            <h2>Cómo cerrar sesión</h2>
            <ol>
                <li>Presiona CUENTA.</li>
                <li>Presiona Configuración y privacidad.</li>
                <li>Desplázate hasta abajo.</li>
                <li>Selecciona Cerrar sesión.</li>
            </ol>
            <Link to="/home">
                <button className="green-button">Volver a Inicio</button>
            </Link>

        </div>
    );
}

export default Ayudas;
