import React, { useState, useEffect, useRef } from 'react';
import './OpenWorld.css';

const OpenWorld = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [activeModalIndex, setActiveModalIndex] = useState(0);

    const categories = [
        {
            id: 'exploration',
            title: 'Exploration',
            image: '/Exploration1.jpg',
            description: 'Forge deep and meaningful relationships throughout your journey...',
            thumbnails: ['/Exploration1.jpg', '/Exploration2.jpg', '/roomn.webp']
        },
        {
            id: 'region',
            title: 'Region',
            image: '/traverl 1.jpg',
            description: 'Forge deep and meaningful relationships throughout your journey...',
            thumbnails: ['/traverl 1.jpg', '/travel2.jpg', '/travel3.jpg']
        },
        {
            id: 'innahabitian',
            title: 'Innahabitiane',
            image: '/Innahabitian1.jpg',
            description: 'Forge deep and meaningful relationships throughout your journey...',
            thumbnails: ['/Innahabitian1.jpg', '/Innahabitian2.jpg', '/Innahabitian3.jpg']
        },
        {
            id: 'activities',
            title: 'Activities',
            image: '/activ1.jpg',
            description: 'Beyond the main quest, immerse yourself in a world filled with engaging activities...',
            thumbnails: ['/activ1.jpg', '/activ2.jpg', '/activ3.jpg']
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const openModal = (category, index) => {
        setActiveModal(category);
        setActiveModalIndex(index);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = 'auto';

        setTimeout(() => {
            setActiveModal(null);
            setActiveModalIndex(0);
        }, 300);
    };

    const handleThumbnailClick = (index) => {
        if (activeModal?.thumbnails?.[index]) {
            setActiveModalIndex(index);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!modalOpen) return;

            switch (event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowRight':
                    if (activeModal && activeModalIndex < activeModal.thumbnails.length - 1) {
                        setActiveModalIndex(prev => prev + 1);
                    }
                    break;
                case 'ArrowLeft':
                    if (activeModal && activeModalIndex > 0) {
                        setActiveModalIndex(prev => prev - 1);
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalOpen, activeModal, activeModalIndex]);

    return (
        <section id="openworld" className="section-openworld" ref={sectionRef}>
            <div className="openworld-logo-space">
                <img src="/tw3%20second.png" alt="The Witcher 3: Wild Hunt" className="hero-logo" />
            </div>

            <div className="openworld-container">
                <h2 className={`openworld-title ${isVisible ? 'fade-in' : ''}`}>OPEN WORLD</h2>

                <p className={`openworld-description ${isVisible ? 'fade-in' : ''}`}>
                    In the open world of Wild Hunt, you chart your own path to adventure. You play as a bounty hunter, a man of the road.Go after the bounty on the head of a nasty monster pestering a village or help a scheming prince who needs a dirty job done -- no matter what style of epic questing you crave.
                </p>

                <div className={`category-grid ${isVisible ? 'cards-appear' : ''}`}>
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className={`category-item category-item-${index + 1}`}
                            onClick={() => openModal(category, 0)}
                        >
                            <div className="category-image">
                                <img src={category.image} alt={category.title} />
                            </div>
                            <div className="category-title">
                                <h3>{category.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalOpen && activeModal && (
                <div className="story-modal-overlay" onClick={closeModal}>
                    <div className="story-modal-content witcher-style-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal}>×</button>

                        <div className="modal-main-content">
                            <div className="modal-image-container">
                                <img
                                    src={activeModal.thumbnails ? activeModal.thumbnails[activeModalIndex] : activeModal.image}
                                    alt={activeModal.title}
                                    className="modal-main-image"
                                />
                                <div className="modal-text-overlay">
                                    <h3 className="modal-title">{activeModal.title}</h3>
                                    <p className="modal-description">{activeModal.description}</p>
                                </div>

                                <div className="modal-navigation">
                                    {activeModalIndex > 0 && (
                                        <button
                                            className="modal-nav-btn modal-prev"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveModalIndex(prev => prev - 1);
                                            }}
                                        >
                                            &#10094;
                                        </button>
                                    )}
                                    {activeModal.thumbnails && activeModalIndex < activeModal.thumbnails.length - 1 && (
                                        <button
                                            className="modal-nav-btn modal-next"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveModalIndex(prev => prev + 1);
                                            }}
                                        >
                                            &#10095;
                                        </button>
                                    )}
                                </div>
                            </div>

                            {activeModal.thumbnails && activeModal.thumbnails.length > 1 && (
                                <div className="modal-thumbnails">
                                    {activeModal.thumbnails.map((thumb, idx) => (
                                        <div
                                            key={idx}
                                            className={`modal-thumbnail ${idx === activeModalIndex ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleThumbnailClick(idx);
                                            }}
                                        >
                                            <img src={thumb} alt={`${activeModal.title} thumbnail ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OpenWorld;
