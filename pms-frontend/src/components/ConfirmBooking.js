import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ConfirmBooking = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/properties/${propertyId}/`, {
                    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                });
                setProperty(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching property details:", error);
                setError("Failed to load property details.");
                setLoading(false);
            }
        };
        fetchProperty();
    }, [propertyId]);

    const handleConfirmBooking = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You need to be logged in to book a property.");
                navigate("/login");
                return;
            }
    
            await axios.post(
                "http://127.0.0.1:8000/api/bookings/",
                { property: propertyId, start_date: "2025-04-01", end_date: "2025-04-10" },
                { headers: { Authorization: `Token ${token}` } }
            );
            alert("Booking confirmed!");
            navigate("/tenants");
        } catch (error) {
            console.error("Error confirming booking:", error);
            alert("Booking failed. Please try again.");
        }
    };
    

    if (loading) return <p>Loading property details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5 text-center">
            <h2>Confirm Your Booking</h2>
            {property && (
                <div>
                    <img
                        src={property.image?.startsWith("/images/")
                            ? property.image
                            : property.image
                                ? `http://127.0.0.1:8000${property.image}`
                                : "/images/default-property.webp"}
                        alt={property.name}
                        className="img-fluid"
                        onError={(e) => (e.target.src = "/images/default-property.webp")}
                        style={{ maxWidth: "400px", borderRadius: "10px", marginBottom: "20px" }}
                    />
                    <h3>{property.name}</h3>
                    <p>{property.description}</p>
                    <p><strong>Price:</strong> ${property.price}</p>
                    <button className="btn btn-success" onClick={handleConfirmBooking}>
                        Confirm Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConfirmBooking;
