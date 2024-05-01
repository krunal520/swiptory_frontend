import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import styles from './Register.module.css';

const Register = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://swiptorybackend-production.up.railway.app/api/user/register', {
        username,
        password
      });
      console.log(response.data);
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      // Show success toast
      toast.success('Registration successful');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      // Show error toast
      toast.error('Registration failed');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.registerForm}>
        <span className={styles.closeButton} onClick={onClose}>X</span>
        <h2>Register for Swipe Tory</h2>
        <form onSubmit={handleRegister}>
          <div className={styles.inputContainer}>
            <label htmlFor="register-username">Username</label>
            <input type="text" id="register-username" value={username} onChange={handleUsernameChange} placeholder="Enter your username" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="register-password">Password</label>
            <input type="password" id="register-password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
