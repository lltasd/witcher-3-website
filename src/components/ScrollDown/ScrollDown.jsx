import React from 'react';
import './ScrollDown.css';

const ScrollDown = () => {
    const scrollToNextSection = () => {
        const nextSection = document.querySelector('.second-section');
        if (nextSection) {
            window.scrollTo({
                top: nextSection.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="scroll-down" onClick={scrollToNextSection}>
            <span>scroll down</span>
            <div className="scroll-arrow"></div>
        </div>
    );
};

export default ScrollDown;