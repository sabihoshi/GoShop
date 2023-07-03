import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';
//import axios from 'axios';

function App() {
    return (
       <>
       <Header />
       <Routes>
        <Route path="auth/login" element={<Login />}/>
        <Route path="auth/register" element={<Register />}/>
       </Routes>
       <Footer />
       </>
    );
}

export default App;