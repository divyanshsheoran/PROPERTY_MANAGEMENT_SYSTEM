import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TenantList from './components/TenantList';
import Register from './components/Register';
import Navbar from './components/Navbar';
import OwnerList from './components/OwnerList';
import AdminList from './components/AdminList';
import PropertyList from './components/PropertyList';
import AddProperty from './components/AddProperty';
import Home from './components/Home';
import MainHome from './components/MainHome';
import ConfirmBooking from './components/ConfirmBooking';  

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<MainHome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/properties" element={<PropertyList />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/tenants" element={<TenantList />} />
              <Route path="/owners" element={<OwnerList />} />
              <Route path="/admins" element={<AdminList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/confirm-booking/:propertyId" element={<ConfirmBooking />} />  
          </Routes>
      </Router>
  );
}

export default App;
