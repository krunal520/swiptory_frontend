import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddStories.module.css';

const AddStories = ({ onClose }) => {
    const [slides, setSlides] = useState([{ heading: '', description: '', imageUrl: '', category: '' }]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const handleAddSlide = () => {
        const newSlides = [...slides];
        newSlides.splice(currentSlideIndex + 1, 0, { heading: '', description: '', imageUrl: '', category: '' });
        setSlides(newSlides);
        setCurrentSlideIndex(currentSlideIndex + 1);
    };

    const handleChange = (e, field) => {
        const newSlides = [...slides];
        newSlides[currentSlideIndex][field] = e.target.value;
        setSlides(newSlides);
    };

    const handlePrevious = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentSlideIndex < slides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const handlePostStory = async () => {
        try {
            const response = await axios.post('https://swiptorybackend-production.up.railway.app/api/story/create', {
                slides: [slides[currentSlideIndex]],
                likes: [],
                bookmarks: [],
                totalLikes: 0,
                addedBy: "User123"
            });
            console.log(response.data);
            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.addStoriesForm}>
            <span className={styles.closeButton} onClick={onClose}>X</span>

                <h2>Add Stories</h2>

                <div className={styles.slideContainer}>
                    {slides.map((slide, index) => (
                        <span key={index} className={currentSlideIndex === index ? styles.activeSlide : styles.slide} onClick={() => setCurrentSlideIndex(index)}>
                            Slide {index + 1}
                        </span>
                    ))}
                    <button className={styles.addSlideButton} onClick={handleAddSlide}>Add Slide</button>
                </div>

                {/* Render form for the current slide */}
                <div className={styles.formContainer}>
                    <div className={styles.inputContainer}>
                        <label htmlFor={`heading-${currentSlideIndex}`}>Heading</label>
                        <input type="text" id={`heading-${currentSlideIndex}`} value={slides[currentSlideIndex].heading} onChange={(e) => handleChange(e, 'heading')} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor={`description-${currentSlideIndex}`}>Description</label>
                        <textarea id={`description-${currentSlideIndex}`} value={slides[currentSlideIndex].description} onChange={(e) => handleChange(e, 'description')} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor={`imageUrl-${currentSlideIndex}`}>Image URL</label>
                        <input type="text" id={`imageUrl-${currentSlideIndex}`} value={slides[currentSlideIndex].imageUrl} onChange={(e) => handleChange(e, 'imageUrl')} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor={`category-${currentSlideIndex}`}>Category</label>
                        <input type="text" id={`category-${currentSlideIndex}`} value={slides[currentSlideIndex].category} onChange={(e) => handleChange(e, 'category')} />
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={styles.previousButton} onClick={handlePrevious}>Previous</button>
                    <button className={styles.nextButton} onClick={handleNext}>Next</button>
                    <button className={styles.postButton} onClick={handlePostStory}>Post Story</button>
                </div>
            </div>
        </div>
    );
};

export default AddStories;
