import React from 'react';
// import React, { useState, useEffect } from 'react';
// import Login from './Components/Auth/Login';
import MainLayout from './Components/Layout/MainLayout';


const App = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem('authToken'));

  // useEffect(() => {
  //   const userData = localStorage.getItem('userData');
  //   if (userData) {
  //     setCurrentUser(JSON.parse(userData));
  //   }
  // }, []);

  // const handleLogin = (userData, authToken) => {
  //   setCurrentUser(userData);
  //   setToken(authToken);
  //   localStorage.setItem('authToken', authToken);
  //   localStorage.setItem('userData', JSON.stringify(userData));
  // };

  // const handleLogout = () => {
  //   setCurrentUser(null);
  //   setToken(null);
  //   localStorage.removeItem('authToken');
  //   localStorage.removeItem('userData');
  // };

  // if (!currentUser || !token) {
  //   return <Login onLogin={handleLogin} />;
  // }

  // return <MainLayout currentUser={currentUser} token={token} onLogout={handleLogout} />;

  return <MainLayout />;
};

export default App;