import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    //confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }



    try {
      // Check if username already exists
      const response = await axios.get('https://library-backend-json.onrender.com/users', {
        params: { username },
      });

      if (response.data.length > 0) {
        setError('Username already exists');
        console.log(response);

        return;

      }


      // Register new user
      const newUser = { username, password, role,email,phone};

      await axios.post('https://library-backend-json.onrender.com/users', newUser);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="register-container bg-image">
      <div className="register-box">
        <h2>Membership Form</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}

          <button type="submit" className="submit-btn">Register</button>
        </form>
        <p className="login-redirect">
          Already have an account? <Link to={'/login'} style={{ textDecoration: 'none', color: '#FFD700', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
