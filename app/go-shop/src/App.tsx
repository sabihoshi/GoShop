import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';
//import axios from 'axios';

function App() {
    /**TODO:
     * <Route path="/categories/:category/:id/details" component={Details} />
       <Route path="/categories/:category/:id/edit" component={Edit} /> 
       <Route path="/auth/logout" exact render={LogOut} />
        <Route path='/add-product' exact component={CreateSell} />;
        <Route path='/profile/:id' exact component={Profile} />;
        <Route path='/profile/:id/edit' exact component={EditProfile} />;
        <Route path='/messages' exact component={Messages} />;
        <Route path='/messages/:id' exact component={Messages} />;
        <Route component={Error404} />
     */
    return (
       <>
       <Header />
       <Routes>
        <Route path="/" element={<Categories />}/>
        <Route path="/categories/:category" element={<Categories />} />
        <Route path="auth/login" element={<Login />}/>
        <Route path="auth/register" element={<Register />}/>
       </Routes>
       <Footer />
       </>
    );
}

export default App;