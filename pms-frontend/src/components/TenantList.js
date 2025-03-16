import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TenantList.css";

const TenantList = () => {
    const [properties, setProperties] = useState([]);
    const [bookedProperties, setBookedProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchProperties();
        }
    }, [navigate]);

    //Fetch all properties from the API
    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/properties/", {
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
            });
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    // Fetch booked properties for the logged-in user
    const fetchBookings = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User not authenticated.");
                return;
            }
    
            // Fetch bookings for the logged-in tenant
            const response = await axios.get("http://127.0.0.1:8000/api/bookings/", {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log("Bookings API Response:", response.data); 
    
            const propertyResponse = await axios.get("http://127.0.0.1:8000/api/properties/", {
                headers: { Authorization: `Token ${token}` },
            });
    
            const propertyMap = {};
            propertyResponse.data.forEach((property) => {
                propertyMap[property.id] = property;
            });
    
            // Map bookings with property details
            const enrichedBookings = response.data.map((booking) => ({
                ...booking,
                property: propertyMap[booking.property] || { name: "Unknown", image: "/images/default-property.webp" },
            }));
    
            console.log("Mapped Bookings:", enrichedBookings); 
    
            setBookedProperties(enrichedBookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    }, []);
    
    

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]); 

    const handleBookNow = (propertyId) => {
        navigate(`/confirm-booking/${propertyId}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome, Tenant!</h1>
            <p className="text-center">Here’s what you can do:</p>

            <div className="mb-4">
                <h2>Search Properties</h2>
                <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control mb-3"
                />
                <div className="row">
                    {properties.length === 0 ? (
                        <p className="text-center">No properties available.</p>
                    ) : (
                        properties
                            .filter((property) => property.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((property) => (
                                <div key={property.id} className="col-md-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={property.image?.startsWith("/images/")
                                                ? property.image
                                                : property.image
                                                    ? `http://127.0.0.1:8000${property.image}`
                                                    : "/images/default-property.webp"}
                                            className="card-img-top"
                                            alt={property.name}
                                            onError={(e) => (e.target.src = "/images/default-property.webp")}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{property.name}</h5>
                                            <p className="card-text">{property.description}</p>
                                            <p className="card-text">
                                                <strong>Price:</strong> ${property.price}
                                            </p>
                                            <button
                                                onClick={() => handleBookNow(property.id)}
                                                className="btn btn-primary"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>

            {/* Manage Reservations (Booked Properties) */}
            <div className="mt-5">
                <h2>Manage Reservations</h2>
                {bookedProperties.length === 0 ? (
                    <p>You haven't booked any properties yet.</p>
                ) : (
                    <ul className="list-group">
                        {bookedProperties.map((booking) => (
                            <li key={booking.id} className="list-group-item">
                                <strong>Property:</strong> {booking.property.name}
                                <br />
                                <img
                                    src={booking.property.image.startsWith("/images/")
                                        ? booking.property.image
                                        : `http://127.0.0.1:8000${booking.property.image}`}
                                    alt={booking.property.name}
                                    className="img-thumbnail"
                                    style={{ maxWidth: "150px", marginTop: "10px" }}
                                    onError={(e) => (e.target.src = "/images/default-property.webp")}
                                />
                                <br />
                                <strong>Start Date:</strong> {booking.start_date} - <strong>End Date:</strong> {booking.end_date}
                                <br />
                                <strong>Status:</strong> {booking.status}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TenantList;
