import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollDown from '../ScrollDown/ScrollDown.jsx';
import './MonsterHunter.css';

const MonsterHunter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [activeModalIndex, setActiveModalIndex] = useState(0);

    const storyCards = [
        {
            id: 'child-of-prophecy',
            title: 'Mutations And Skills',
            image: '/mutat1.jpg',
            description: 'As Geralt, embark on your most perilous and personal journey yet as you track down Ciri...',
            thumbnails: [
                '/story-child-1.jpg',
                '/child-of.jpg',
                '/ff3.jpg'
            ]
        },
        {
            id: 'Hunts',
            title: 'Monster Hunts',
            image: '/monsth1.jpg',
            description: 'Forge deep and meaningful relationships throughout your journey in the Northern Kingdoms...',
            thumbnails: [
                '/monsth1.jpg',
                '/monstrh2.jpg',
                '/monstrh3.jpg'
            ]
        },
        {
            id: 'plague-of-the-wild-hunt',
            title: 'Equipment',
            image: '/equip.jpg',
            description: 'Face the terrifying Wild Hunt – a spectral cavalry from another dimension...',
            thumbnails: [
                '/huunt.png',
                '/huun2.jpg',
                '/hunt.jpg'
            ]
        },
        {
            id: 'choice-and-consequence',
            title: 'Allies And Enemies',
            image: '/alies.jpg',
            description: 'Every decision you make shapes the world around you...',
            thumbnails: [
                '/poosled.jpg',
                '/posled.jpg',
                '/vibor.jpg'
            ]
        }
    ];


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {threshold: 0.15}
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const openModal = (card, index) => {
        setActiveModal(card);
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
        if (activeModal && activeModal.thumbnails && activeModal.thumbnails[index]) {
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
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalOpen, activeModal, activeModalIndex]);

    return (
        <section  ref={sectionRef} id="hunter" className="section-monsterhunter">
            <div className="monsterhunter-logo-space">
                <img
                    src="../../../public/3050346935_preview_witcher%2520logo.png.png"
                    alt="CD Projekt Red × Netflix"
                    className="monsterhunter-collab-logo"
                />
            </div>
            <div className="monsterhunter-container">
                <h2 className={`monsterhunter-title ${isVisible ? 'fade-in' : ''}`}>Professional Hunter</h2>

                <p className={`monsterhunter-description ${isVisible ? 'fade-in' : ''}`}>
                    Witchers are mutants, men subjected to gruelling training and flesh-altering experiments that prepare them for one purpose: to kill monsters. Geralt was forged at the elite School of the Wolf and is considered one the deadliest witchers trained.
                </p>

                <div className={`monsterhunter-cards-grid ${isVisible ? 'cards-appear' : ''}`}>
                    {storyCards.map((card, index) => (
                        <div
                            key={card.id}
                            className={`monsterhunter-card monsterhunter-card-${index + 1}`}
                            onClick={() => openModal(card, 0)}
                        >
                            <div className="monsterhunter-card-image">
                                <img src={card.image} alt={card.title}/>
                            </div>
                            <div className="monsterhunter-card-title">
                                <h3>{card.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalOpen && activeModal && (
                <div className="monsterhunter-modal-overlay" onClick={closeModal}>
                    <div className="monsterhunter-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="monsterhunter-modal-close-btn" onClick={closeModal}>×</button>
                        <div className="monsterhunter-modal-main-content">
                            <div className="monsterhunter-modal-image-container">
                                <img
                                    src={activeModal.thumbnails ? activeModal.thumbnails[activeModalIndex] : activeModal.image}
                                    alt={activeModal.title}
                                    className="monsterhunter-modal-main-image"
                                />

                                <div className="monsterhunter-modal-text-overlay">
                                    <h3 className="monsterhunter-modal-title">{activeModal.title}</h3>
                                    <p className="monsterhunter-modal-description">{activeModal.description}</p>
                                </div>

                                <div className="monsterhunter-modal-navigation">
                                    {activeModalIndex > 0 && (
                                        <button
                                            className="monsterhunter-modal-nav-btn monsterhunter-modal-prev"
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
                                            className="monsterhunter-modal-nav-btn monsterhunter-modal-next"
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
                                <div className="monsterhunter-modal-thumbnails">
                                    {activeModal.thumbnails.map((thumb, idx) => (
                                        <div
                                            key={idx}
                                            className={`monsterhunter-modal-thumbnail ${idx === activeModalIndex ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleThumbnailClick(idx);
                                            }}
                                        >
                                            <img src={thumb} alt={`${activeModal.title} thumbnail ${idx + 1}`}/>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="monsterhunter-scroll-indicator">
                <ScrollDown/>
            </div>
        </section>
    );
}

export default MonsterHunter