import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('price', price);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You must be logged in to add a property.");
                navigate('/login');
                return;
            }

            // ✅ Send POST request with authentication
            await axios.post(
                'http://127.0.0.1:8000/api/properties/',
                formData,
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            alert('Property added successfully!');
            navigate('/owners'); // Redirect to OwnerList.js
        } catch (err) {
            console.error('Error adding property:', err.response ? err.response.data : err.message);
            setError('Failed to add property. Check console for details.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Add Property</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price ($):</label>
                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Upload Image:</label>
                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Property</button>
            </form>
        </div>
    );
};

export default AddProperty;
