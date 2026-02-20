import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div style={{ backgroundColor: '#0d1117', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ paddingBottom: '50px', paddingTop: '30px' }}>
                <Outlet />
            </main>
        </div>
    );
}