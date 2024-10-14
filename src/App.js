// import React, { useState,useEffect } from 'react';
import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Register from './components/Register/Register';
import Login from './components/login/login';
// import useToken from './usetoken';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function setToken(userToken) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  return localStorage.getItem('token');
}

function App() {
  // const { token, setToken } = useToken();
  const token = getToken();

  if(!token) {
    return <Login setToken={setToken}/>
  }
  return (
    <div className="wrapper">
        <Routes>
          <Route path="/" element={<Login setToken={setToken}/>} />\
          <Route path="/register" element={<Register setToken={setToken}/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
    </div>
  );
}

export default App;

