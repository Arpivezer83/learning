// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="app">
      {loggedIn ? <Chat /> : <Login onLogin={() => setLoggedIn(true)} />}
    </div>
  );
}

export default App;
