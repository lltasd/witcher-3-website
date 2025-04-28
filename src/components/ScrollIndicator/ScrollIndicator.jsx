import React, { useState, useEffect, useRef } from 'react';
import './ScrollIndicator.css';

const ScrollIndicator = ({ isModalOpen }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [hoveredSectionClass, setHoveredSectionClass] = useState(null); // Новое состояние для ховера
    const isScrollingRef = useRef(false);

    const sections = [
        { id: 'header', label: 'Home', class: 'Header' },
        { id: 'enhancedSection', label: 'Enhanced for Next-Gen', class: 'EnhancedSection' },
        { id: 'netflixSection', label: 'Netflix Added Content', class: 'NetflixSection' },
        { id: 'story', label: 'Story', class: 'section-story' },
        { id: 'openworld', label: 'Open World', class: 'section-openworld' },
        { id: 'hunter', label: 'Professional Monster Hunter', class: 'section-hunter' },
        { id: 'news', label: 'News', class: 'section-news' },
        { id: 'media', label: 'Media', class: 'section-media' },
        { id: 'community', label: 'Community Corner', class: 'section-community' },
        { id: 'footer', label: 'Footer', class: 'section-footer' }
    ];

    const scrollToSection = (index) => {
        const element = document.getElementById(sections[index].id);
        if (!element) return;

        isScrollingRef.current = true;

        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isScrollingRef.current = false;
        }, 800);

        setActiveSection(index);
    };

    useEffect(() => {
        const handleWheel = (event) => {
            if (isScrollingRef.current || isModalOpen) return;

            event.preventDefault();

            const direction = event.deltaY > 0 ? 1 : -1;
            let nextIndex = activeSection + direction;

            if (nextIndex >= 0 && nextIndex < sections.length) {
                scrollToSection(nextIndex);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [activeSection, isModalOpen]);

    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingRef.current || isModalOpen) return;

            const scrollPosition = window.scrollY + window.innerHeight / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            sections.forEach((section, index) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const elementTop = element.offsetTop;
                    const distance = Math.abs(scrollPosition - elementTop);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            setActiveSection(closestIndex);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isModalOpen]);

    const currentSectionClass = hoveredSectionClass || sections[activeSection].class; // Приоритет наведения

    return (
        <div className="scroll-indicator-container">
            <div className={`scroll-indicator-wrapper hover-${currentSectionClass}`}>
                <div className="scroll-dots">
                    {sections.map((section, index) => (
                        <div key={index} className="scroll-menu-item">
                            <div
                                className={`scroll-dot ${section.class} ${index === activeSection ? 'active' : ''}`}
                                onClick={() => scrollToSection(index)}
                                onMouseEnter={() => setHoveredSectionClass(section.class)}
                                onMouseLeave={() => setHoveredSectionClass(null)}
                            ></div>
                            <div className="scroll-menu-label">
                                {section.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollIndicator;
