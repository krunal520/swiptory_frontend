import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';

const Home = () => {
  const [stories, setStories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://swiptorybackend-production.up.railway.app/api/story/getAll?category=${selectedCategory}`);
        setStories(selectedCategory === 'All' ? response.data.stories : response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className={styles.navbar}>
        <div onClick={() => handleCategoryClick('All')} className={`${styles.category} ${selectedCategory === 'All' ? styles.selected : ''}`}>All</div>
        <div onClick={() => handleCategoryClick('food')} className={`${styles.category} ${selectedCategory === 'Food' ? styles.selected : ''}`}>Food</div>
        <div onClick={() => handleCategoryClick('health and fitness')} className={`${styles.category} ${selectedCategory === 'Health and Fitness' ? styles.selected : ''}`}>Health and Fitness</div>
        <div onClick={() => handleCategoryClick('movie')} className={`${styles.category} ${selectedCategory === 'Movie' ? styles.selected : ''}`}>Movie</div>
        <div onClick={() => handleCategoryClick('travel')} className={`${styles.category} ${selectedCategory === 'Travel' ? styles.selected : ''}`}>Travel</div>
        <div onClick={() => handleCategoryClick('education')} className={`${styles.category} ${selectedCategory === 'Education' ? styles.selected : ''}`}>Education</div>
      </div>
      <div className={styles['story-container']}>
      {Object.entries(stories).map(([category, categoryStories], index) => (
        <div key={index}>
          <div className={styles['story-row']}>
            {Array.isArray(categoryStories) && categoryStories.map((story, storyIndex) => (
              <div key={storyIndex} className={styles['story-box']}>
                {story.slides.map((slide, slideIndex) => (
                  <div key={slideIndex} className={styles.slide}>
                    <img src={slide.imageUrl} alt={slide.heading} />
                    <div className={styles['slide-content']}>
                      <h3>{slide.heading}</h3>
                      <p>{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Home;
