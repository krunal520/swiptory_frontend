import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import styles from './SignupForm.module.css';

const SignupForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://swiptorybackend-production.up.railway.app/api/user/login', {
        username,
        password
      });
      console.log(response.data); // Handle response as needed
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      // Show error toast
      toast.error('Sign up failed');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.signupForm}>
        <span className={styles.closeButton} onClick={onClose}>X</span>
        <h2>Sign up for Swipe Tory</h2>
        <form onSubmit={handleSignup}>
          <div className={styles.inputContainer}>
            <label htmlFor="signup-username">Username</label>
            <input type="text" id="signup-username" value={username} onChange={handleUsernameChange} placeholder="Enter your username" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
