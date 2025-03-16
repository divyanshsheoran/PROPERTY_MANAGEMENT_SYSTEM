import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // Get the user's role

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        localStorage.removeItem('role'); // Remove the role
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Property Management System</Link>
                <div className="navbar-nav">

                    {role === 'tenant' && (
                        <Link className="nav-link" to="/tenants">Tenant Home</Link>
                    )}

                    {role === 'owner' && (
                        <Link className="nav-link" to="/owners">Owner Home</Link>
                    )}

                    {role === 'admin' && (
                        <Link className="nav-link" to="/admins">Admin Home</Link>
                    )}

                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;