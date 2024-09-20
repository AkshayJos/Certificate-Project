
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle login
  const handleLogin = () => {
    // POST request to authenticate the admin
    axios.post('http://localhost:5000/api/login/auth', { username, password })
      .then(response => {
        if (response.data.success) {
          navigate('/admin');
        } else {
          setError('Invalid credentials');
        }
      })
      .catch(error => setError('Error logging in'));
  };

  return (
    <div>
      <h1>Login</h1>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
