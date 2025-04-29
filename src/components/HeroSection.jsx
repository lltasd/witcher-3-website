import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollDown from './ScrollDown/ScrollDown.jsx';
import './HeroSection.css';
import './Flash.css';
import './Modal.css';

const HeroSection = () => {
    const [loaded, setLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section id="header" className={`hero-section ${loaded ? 'loaded' : ''}`}>

                <div className="hero-content">
                    <div className="headers-logo-container">
                        <img
                            src="public/tw3.png"
                            alt="The Witcher 3: Wild Hunt"
                            className="ff-hero-logo"
                        />
                    </div>

                    <div className="hero-tagline">
                        <h2>One of the most acclaimed RPGs of all time</h2>
                        <h3>Now ready for a new generation</h3>
                    </div>
                    <div className="hero-cta">
                        <Link to="/game" className="cta-button buy-now">BUY NOW</Link>

                        <button onClick={openModal} className="cta-button watch-trailer">WATCH TRAILER</button>
                    </div>

                </div>

                <ScrollDown/>
            </section>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>
                        <div className="video-container">
                            <iframe
                                width="100%"
                                height="100%"
                                src="/4504187177654.mp4"
                                title="The Witcher 3 Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeroSection;
