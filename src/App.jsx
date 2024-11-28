import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PlayerProvider } from './Componentes/Reproductor musica/PlayerContext';
import './App.css'

// Componentes
import PagInicio from './Componentes/Pagina de Inicio/PagInicio';
import PagRegistro from './Componentes/Registro/Registro';
import AcercaDe from './Componentes/Footer/AcercaDe';
import PlanPremium from './Componentes/Footer/PlanPremium';
import VersionGratuita from './Componentes/Footer/VersionGratuita';
import Ayudas from './Componentes/Footer/Ayudas';
import Inicio from './Componentes/Inicio/Inicio';
import Biblioteca from './Componentes/Biblioteca/Biblioteca';
import PagInicioSesion from './Componentes/Iniciar sesion/InicioSesion'
import Cuenta from './Componentes/Cuenta/Cuenta';
import Premium from './Componentes/Cuenta/Premium';
import EditaPerfil from './Componentes/Cuenta/EditarPerfin';
import Footer from './Componentes/Footer/Footer';
import Nav from './Componentes/Nav/Nav';

// Layout principal que incluye Navbar y Footer
const Layout = ({ children }) => {
    const token = localStorage.getItem('access_token');

    // Si no hay token, redirige al inicio de sesión
    if (!token) {
        return <Navigate to="/inicio-sesion" replace />;
    }

    return (
        <div className="flex flex-col justify-between h-[100vh] bg-black">
            <Nav />
            {children}
            <Footer />
        </div>
    );
};

const LayoutIncio = ({ children }) => {
    const token = localStorage.getItem('access_token');

    // Si hay token, redirige al home
    if (token) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="flex flex-col justify-between h-[100vh] bg-black">
            {children}
        </div>
    );
};

export default function App() {
    return (
        <PlayerProvider>
            <Router>
                <Routes>
                    {/* Rutas sin Navbar y Footer */}
                    <Route path="/" element={<LayoutIncio><PagInicio /></LayoutIncio>} />
                    <Route path="/inicio-sesion" element={<LayoutIncio><PagInicioSesion /></LayoutIncio>} />
                    <Route path="/registro" element={<LayoutIncio><PagRegistro /></LayoutIncio>} />

                    {/* Rutas con Layout (Navbar y Footer) */}
                    <Route path="/home" element={<Layout><Inicio /></Layout>} />
                    <Route path="/acerca-de" element={<Layout><AcercaDe /></Layout>} />
                    <Route path="/plan-premium" element={<Layout><PlanPremium /></Layout>} />
                    <Route path="/version-gratuita" element={<Layout><VersionGratuita /></Layout>} />
                    <Route path="/ayudas" element={<Layout><Ayudas /></Layout>} />
                    <Route path="/biblioteca" element={<Layout><Biblioteca /></Layout>} />
                    <Route path="/cuenta" element={<Layout><Cuenta /></Layout>} />
                    <Route path="/premium" element={<Layout><Premium /></Layout>} />
                    <Route path="/editar-Perfil" element={<Layout><EditaPerfil /></Layout>} />
                </Routes>
            </Router>
        </PlayerProvider>
    );
}