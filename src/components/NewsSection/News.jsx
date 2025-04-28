import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './News.css';

const newsData = [
    {
        id: 1,
        title: 'THE WITCHER IN CONCERT - ALMOST THERE!',
        date: '22 / 4 / 2025',
        image: '/news1.webp',
    },
    {
        id: 2,
        title: 'EQUIP YOURSELF WITH STEEL AND SILVER!',
        date: '29 / 3 / 2025',
        image: '/new2.webp',
    },
    {
        id: 3,
        title: 'THE WITCHER IN CONCERT - ANNIVERSARY CONCERTS',
        date: '4 / 3 / 2025',
        image: '/new3.webp',
    },
    {
        id: 4,
        title: 'THE WITCHER IN CONCERT - GET YOUR TICKETS!',
        date: '21 / 1 / 2025',
        image: '/new3.webp',
    },
    {
        id: 5,
        title: 'ITS ALL ABOUT YOU! – OF WITCHERS AND MONSTERS',
        date: '19 / 12 / 2024',
        image: '/new4.webp',
    },
];

const News = () => {
    const [showAll, setShowAll] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const newsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(newsRef.current);
                }
            },
            { threshold: 0.2 }
        );

        if (newsRef.current) {
            observer.observe(newsRef.current);
        }

        return () => {
            if (newsRef.current) {
                observer.unobserve(newsRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setAnimate(true);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const handleLoadMore = () => {
        setShowAll(true);
        const section = document.getElementById('all-news');
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            id="news"
            ref={newsRef}
            className={`news-wrapper ${isVisible ? 'in-viewport' : ''} ${animate ? 'animate' : ''}`}
        >
            <div className={`news-logo-space ${isVisible ? 'logo-animate' : ''}`}>
                <img src="/tw3.png" alt="Logo" />
            </div>

            {!showAll ? (
                <>
                    <div className="news-main">
                        <div className={`featured-news ${isVisible ? 'scale-in' : ''}`}>
                            <div className="featured-image">
                                <img src={newsData[0].image} alt="Main News" />
                                <div className={`featured-overlay ${isVisible ? 'slide-up' : ''}`}>
                                    <h2>{newsData[0].title}</h2>
                                    <p>{newsData[0].date}</p>
                                </div>
                            </div>
                        </div>

                        <div className="news-grid">
                            {newsData.slice(1, 5).map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`news-item ${isVisible ? 'fade-in' : ''}`}
                                    style={{
                                        animationDelay: isVisible ? `${0.3 * (index + 1)}s` : '0s',
                                        animationFillMode: 'forwards',
                                    }}
                                >
                                    <div className="news-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="news-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`load-more-container ${isVisible ? 'bounce-in' : ''}`}>
                        <button className="load-more-btn" onClick={handleLoadMore}>
                            <span>LOAD MORE</span>
                        </button>
                    </div>
                </>
            ) : (
                <div id="all-news" className="all-news-section">
                    <h2 className={isVisible ? 'title-reveal' : ''}>All News</h2>
                    <div className="all-news-grid">
                        {newsData.map((item, index) => (
                            <div
                                key={item.id}
                                className={`news-card ${isVisible ? 'card-reveal' : ''}`}
                                style={{
                                    animationDelay: isVisible ? `${0.15 * index}s` : '0s'
                                }}
                            >
                                <img src={item.image} alt={item.title} />
                                <div className="news-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
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
        </div>
    );
};

export default News;