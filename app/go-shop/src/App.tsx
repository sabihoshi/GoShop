import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './pages/Categories';
import Details from './pages/Details';
import Login from './pages/Login';
import LogOut from './pages/LogOut';
import Register from './pages/Register';
import Error404 from './pages/Error404';
import Profile from './pages/Profile';

import './App.css';

//import axios from 'axios';

function App() {
    /** TODO:
     * <Route path="/categories/:category/:id/edit" component={Edit} />
     * <Route path='/add-product' exact component={CreateSell} />;
     * <Route path='/profile/:id/edit' exact component={EditProfile} />;
     * <Route path='/messages' exact component={Messages} />;
     * <Route path='/messages/:id' exact component={Messages} />;
     * <Route component={Error404} />
     */
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Categories/>}/>
                <Route path="/categories/:category" element={<Categories/>}/>
                <Route path="/categories/:category/:id/details" element={<Details/>} />
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/register" element={<Register/>}/>
                <Route path="/auth/logout" element={<LogOut/>}/>
                <Route path='/profile/:id' element={<Profile />} />;
                <Route path="*" element={<Error404/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;