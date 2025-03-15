import React from 'react';

const Home = () => {
    const role = localStorage.getItem('role'); // Get the user's role

    return (
        <div className="container mt-5">
            <h1 className="text-center">Welcome to the Property Management System</h1>
            <p className="text-center">
                {role === 'tenant' && (
                    <>
                        You are logged in as a <strong>Tenant</strong>. Use the navbar to search for properties.
                    </>
                )}
                {role === 'owner' && (
                    <>
                        You are logged in as an <strong>Owner</strong>. Use the navbar to add properties.
                    </>
                )}
                {role === 'admin' && (
                    <>
                        You are logged in as an <strong>Admin</strong>. Use the navbar to manage the system.
                    </>
                )}
            </p>
        </div>
    );
};

export default Home;