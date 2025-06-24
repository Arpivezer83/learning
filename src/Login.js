// src/Login.js
import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === 'onlyhuman2025') {
      onLogin();
    } else {
      setError('Hibás jelszó, próbáld újra!');
    }
  };

  return (
    <div className="login-container">
      <h2>Belépés a Tanulói oldalra</h2>
      <input
        type="password"
        placeholder="Írd be a jelszót"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Belépés</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
