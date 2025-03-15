import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminList = () => {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchUsers();
            fetchProperties();
        }
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/properties/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome, Admin!</h1>
            <p className="text-center">
                Here’s what you can do:
            </p>

            {/* Manage Users */}
            <div className="mb-4">
                <h2>Manage Users</h2>
                <ul className="list-group">
                    {users.map(user => (
                        <li key={user.id} className="list-group-item">
                            <strong>{user.username}</strong> - {user.email}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Manage Properties */}
            <div className="mt-5">
                <h2>Manage Properties</h2>
                <ul className="list-group">
                    {properties.map(property => (
                        <li key={property.id} className="list-group-item">
                            <strong>{property.name}</strong> - ${property.price}
                            <br />
                            <small>{property.address}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminList;