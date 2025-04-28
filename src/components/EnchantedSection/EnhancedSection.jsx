import React, { useState, useEffect, useRef } from 'react';
import './EnhancedSection.css';

const EnhancedSection = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [activeThumb, setActiveThumb] = useState(0);
    const sliderContainerRef = useRef(null);
    const isDraggingRef = useRef(false);
    const logoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false); // ДОБАВИЛ для анимации частиц

    useEffect(() => {
        const handleScroll = () => {
            const logoElement = logoRef.current;
            if (!logoElement) return;

            const rect = logoElement.getBoundingClientRect();
            const isLogoVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            setIsVisible(isLogoVisible); // Ловим видимость секции

            if (isLogoVisible) {
                logoElement.classList.add("visible");
            } else {
                logoElement.classList.remove("visible");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseMove = (e) => {
        if (!sliderContainerRef.current || !isDraggingRef.current) return;

        const containerRect = sliderContainerRef.current.getBoundingClientRect();
        const position = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    const handleMouseDown = () => {
        isDraggingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchMove = (e) => {
        if (!sliderContainerRef.current || !isDraggingRef.current) return;

        const containerRect = sliderContainerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const position = ((touch.clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.min(Math.max(position, 0), 100));
        e.preventDefault();
    };

    const handleTouchStart = () => {
        isDraggingRef.current = true;
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    const locationImages = [
        {
            before: "comparison-skellige-before-en@1x.jpg",
            after: "comparison-skellige-after-en@1x.jpg",
            label: "SKELLIGE"
        },
        {
            before: "comparison-novigrad-before-en@1x.jpg",
            after: "comparison-novigrad-after-en@1x.jpg",
            label: "NOVIGRAD"
        }
    ];

    return (
        <section id="enhancedSection" className="enhanced-section">
            <div className="section-background"></div>

            <div className="witcher-logo-container" ref={logoRef}>
                <img
                    src="../../../public/tw3.png"
                    alt="The Witcher 3: Wild Hunt"
                    className="logo-small"
                />
            </div>
            {isVisible && (
                <>
                    <div className="magic-circle"></div>
                    <div className="witcher-medallion">
                        <div className="medallion-inner"></div>
                    </div>
                    <div className="particle-container">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="particle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${3 + Math.random() * 4}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </>
            )}
            <div className="enhanced-container">
                <div className="enhanced-content">
                    <div className="enhanced-text">
                        <h2>ENHANCED FOR A NEW<br />GENERATION</h2>
                        <p>
                            Behold the dark fantasy world of the Continent like never before! This edition of The
                            Witcher 3: Wild Hunt has been enhanced with numerous visual and technical
                            improvements implemented with the power of the latest console generation and modern
                            PCs in mind, including:
                        </p>

                        <ul className="feature-list">
                            <li className="feature-item">
                                <div className="diamond-bullet"></div>
                                <span>Faster loading times on console;</span>
                            </li>
                            <li className="feature-item">
                                <div className="diamond-bullet"></div>
                                <span>vastly improved level of detail;</span>
                            </li>
                            <li className="feature-item">
                                <div className="diamond-bullet"></div>
                                <span>a range of community created mods;</span>
                            </li>
                            <li className="feature-item">
                                <div className="diamond-bullet"></div>
                                <span>brand new mods developed for this edition of the game;</span>
                            </li>
                            <li className="feature-item">
                                <div className="diamond-bullet"></div>
                                <span>realtime ray tracing;</span>
                            </li>
                            <li className="feature-item">
                                <div className="diamond-bullet"></div>
                                <span>and more!</span>
                            </li>
                        </ul>
                    </div>

                    <div className="comparison-container">
                        <div
                            className="comparison-slider-container"
                            ref={sliderContainerRef}
                            onClick={(e) => {
                                const containerRect = sliderContainerRef.current.getBoundingClientRect();
                                const position = ((e.clientX - containerRect.left) / containerRect.width) * 100;
                                setSliderPosition(position);
                            }}
                        >
                            <div className="after-image">
                                <div className="label-container after">
                                    <span className="label after">AFTER</span>
                                </div>
                                <img src={locationImages[activeThumb].after} alt="After" />
                            </div>

                            <div className="before-image" style={{ width: `${100 - sliderPosition}%` }}>
                                <div className="label-container before">
                                    <span className="label before">BEFORE</span>
                                </div>
                                <img src={locationImages[activeThumb].before} alt="Before" />
                            </div>

                            <div
                                className="slider-handle"
                                style={{ left: `${sliderPosition}%` }}
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleTouchStart}
                            >
                                <div className="handle-line"></div>
                                <div className="handle-diamond"></div>
                                <div className="handle-line"></div>
                            </div>
                        </div>

                        <div className="thumbnail-gallery">
                            {locationImages.map((location, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${index === activeThumb ? 'active' : ''}`}
                                    onClick={() => setActiveThumb(index)}
                                >
                                    <img src={location.before} alt={`Thumbnail ${index + 1}`} />
                                    {index === activeThumb && <div className="thumbnail-highlight"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnhancedSection;
