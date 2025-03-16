import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const OwnerList = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchOwnerProperties();
        }
    }, [navigate]);

    const fetchOwnerProperties = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/properties/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });

            // Show only properties owned by the logged-in owner
            const userId = localStorage.getItem('user_id');  // Get logged-in owner's ID
            const ownerProperties = response.data.filter(prop => prop.owner === parseInt(userId));
            setProperties(ownerProperties);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setError('Failed to load properties.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome, Owner!</h1>
            <p className="text-center">Here’s what you can do:</p>

            {/* Add Property */}
            <div className="mb-4">
                <h2>Add Property</h2>
                <Link to="/add-property" className="btn btn-primary">Add New Property</Link>
            </div>

            {/* Manage Properties */}
            <div className="mt-5">
                <h2>Manage Your Properties</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {properties.length > 0 ? (
                    <ul className="list-group">
                        {properties.map(property => (
                            <li key={property.id} className="list-group-item">
                                <strong>{property.name}</strong> - ${property.price}
                                <br />
                                <small>{property.address}</small>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No properties found. Add one above.</p>
                )}
            </div>
        </div>
    );
};

export default OwnerList;
