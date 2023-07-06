import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './pages/Categories';
import Edit from './pages/Edit';
import Details from './pages/Details';
import Login from './pages/Login';
import LogOut from './pages/LogOut';
import Register from './pages/Register';
import CreateSell from './pages/CreateSell';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import Messages from './pages/Messages';
import EditProfile from './pages/EditProfile';

import './App.css';

function App() {
    /** TODO:
     * <Route path='/add-product' exact component={CreateSell} />;
     */
    return (
        <>
            <Header/> 
            <Routes>
               <Route path="/" element={<Categories/>}/>
               <Route path="/categories/:category" element={<Categories/>}/>
               <Route path="/categories/:category/:id/details" element={<Details/>} />
               <Route path="/categories/:category/:id/edit" element={<Edit/>} />
               <Route path="/auth/login" element={<Login/>}/>
               <Route path="/auth/register" element={<Register/>}/>
               <Route path="/auth/logout" element={<LogOut/>}/>
               <Route path='/add-product' element={<CreateSell/>} />;
               <Route path='/profile/:id' element={<Profile/>} />;
               <Route path='/profile/:id/edit' element={<EditProfile/>} />;
               <Route path="/messages" element={<Messages/>}/>
               <Route path='/messages/:id' element={<Messages/>} />;
               <Route path="*" element={<Error404/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;