import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchProperties();
        }
    }, [navigate]);

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

    const handleBook = async (propertyId) => {
        try {
            await axios.post(
                'http://127.0.0.1:8000/api/bookings/',
                { property: propertyId, start_date: '2023-10-01', end_date: '2023-10-10' }, 
                { headers: { Authorization: `Token ${localStorage.getItem('token')}` } }
            );
            alert('Booking successful!');
        } catch (error) {
            console.error('Error booking property:', error);
        }
    };

    const filteredProperties = properties.filter(property =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Properties</h1>
            <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-4"
            />
            <ul className="list-group">
                {filteredProperties.map(property => (
                    <li key={property.id} className="list-group-item">
                        <strong>{property.name}</strong> - ${property.price}
                        <br />
                        <small>{property.address}</small>
                        <button
                            onClick={() => handleBook(property.id)}
                            className="btn btn-primary btn-sm float-end"
                        >
                            Book
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyList;