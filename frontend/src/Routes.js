import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './Admin';
import App from './App';

function RoutesConfig() {
    return (
        <Router>
            <Routes>
                <Route path="/index.php" element={<App />} />
                <Route path="/admin/usuarios.php" element={<Admin />} />
            </Routes>
        </Router>
    )
}

export default RoutesConfig;