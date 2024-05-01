import React, { useState, useEffect } from 'react';
import Register from '../Button/Register/Register';
import styles from './Navbar.module.css';
import SignupForm from '../Button/Signup/SignupForm';
import AddStories from '../Button/AddStories/AddStories';

const Navbar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [isAddStoriesOpen, setIsAddStoriesOpen] = useState(false); // State to manage Add Stories model visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  const handleSignupFormClose = () => {
    setIsSignupFormOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleAddStoriesOpen = () => {
    setIsAddStoriesOpen(true); // Open Add Stories model
  };

  return (
    <nav className={styles.navbar}>
      <h1>Swipe Tory</h1>
      <div className={styles.buttonsContainer}>
        {isLoggedIn ? (
          <>
            <button className={styles.bookmarksButton}>Bookmarks</button>
            <button className={styles.addStoriesButton} onClick={handleAddStoriesOpen}>Add Stories</button> {/* Add onClick handler to open Add Stories */}
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className={styles.registerButton} onClick={() => setIsRegisterOpen(true)}>Register</button>
            <button className={styles.signupButton} onClick={() => setIsSignupFormOpen(true)}>Signup</button>
          </>
        )}
      </div>
      {isRegisterOpen && <Register onClose={handleRegisterClose} />}
      {isSignupFormOpen && <SignupForm onClose={handleSignupFormClose} />}
      {isAddStoriesOpen && <AddStories onClose={() => setIsAddStoriesOpen(false)} />} {/* Render Add Stories component when isAddStoriesOpen is true */}
    </nav>
  );
};

export default Navbar;
