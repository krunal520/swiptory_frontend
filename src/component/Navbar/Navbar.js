import React, { useState } from 'react';
import Register from '../Button/Register/Register';
import styles from './Navbar.module.css';
import SignupForm from '../Button/Signup/SignupForm';

const Navbar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  const openRegister = () => {
    setIsRegisterOpen(true);
  };

  const closeRegister = () => {
    setIsRegisterOpen(false);
  };

  const openSignupForm = () => {
    setIsSignupFormOpen(true);
  };

  const closeSignupForm = () => {
    setIsSignupFormOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <h1>Swipe Tory</h1>
      <div className={styles.buttonsContainer}>
        <button className={styles.registerButton} onClick={openRegister}>Register</button>
        <button className={styles.signupButton} onClick={openSignupForm}>Signup</button>
      </div>
      {isRegisterOpen && <Register onClose={closeRegister} />}
      {isSignupFormOpen && <SignupForm onClose={closeSignupForm} />}
    </nav>
  );
};

export default Navbar;
