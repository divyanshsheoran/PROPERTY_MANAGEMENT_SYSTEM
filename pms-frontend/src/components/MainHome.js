import React from 'react';
import { Link } from 'react-router-dom';

const MainHome = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/bgimage.webp)`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
        >
            <h1>Welcome to the Property Management System</h1>
            <p className="lead">
                Manage properties, book rentals, and more. Get started by logging in or registering.
            </p>
            <div className="mt-4">
                <Link to="/login" className="btn btn-primary btn-lg me-3">Login</Link>
                <Link to="/register" className="btn btn-success btn-lg">Register</Link>
            </div>
        </div>
    );
};

export default MainHome;
