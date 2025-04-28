import React, { useState, useEffect, useRef } from 'react';
import './MediaSection.css';
const videos = [
    { id: 1, title: 'Geralt & Ciri Trailer', src: '/public/4504187177654 - Trim.mp4', thumbnail: '/geraltand.jpg' },
    { id: 2, title: 'Expansion Teaser', src: 'https://www.youtube.com/embed/7sVoDJ_DITs', thumbnail: '/expans.jpg' },
    { id: 3, title: 'Hearts of Stone Trailer', src: 'https://www.youtube.com/embed/xx8kQ4s5hCY', thumbnail: '/gryph.jpg' },
    { id: 4, title: 'Next-Gen Update Trailer', src: 'https://www.youtube.com/embed/c0i88t0Kacs', thumbnail: '/geraltand.jpg' },
    { id: 5, title: 'Blood and Wine Teaser', src: 'https://www.youtube.com/embed/7sVoDJ_DITs', thumbnail: '/expans.jpg' },
    { id: 6, title: 'RAGE & STEEL Trailer', src: 'https://www.youtube.com/embed/xx8kQ4s5hCY', thumbnail: '/gryph.jpg' },
];
const screenshots = [
    { id: 1, title: 'Screenshot 1', src: '/ff3.jpg' },
    { id: 2, title: 'Screenshot 2', src: '/geraltand.jpg' },
    { id: 3, title: 'Screenshot 3', src: '/hunt.jpg' },
    { id: 4, title: 'Screenshot 4', src: '/monsth1.jpg' },
    { id: 5, title: 'Screenshot 5', src: '/huunt.png' },
    { id: 6, title: 'Screenshot 6', src: '/expans.jpg' },
    { id: 7, title: 'Screenshot 7', src: '/Exploration1.jpg' },
    { id: 8, title: 'Screenshot 8', src: '/Exploration2.jpg' },
    { id: 12, title: 'Screenshot 12', src: '/monsth1.jpg' },
    { id: 14, title: 'Screenshot 14', src: '/monstrh3.jpg' },
    { id: 15, title: 'Screenshot 15', src: '/mutat1.jpg' },
    { id: 17, title: 'Screenshot 17', src: '/travel2.jpg' },
    { id: 18, title: 'Screenshot 18', src: '/travel3.jpg' },
    { id: 19, title: 'Screenshot 19', src: '/scale_1200.jpg' },
    { id: 20, title: 'Screenshot 20', src: '/equip.jpg' },
    { id: 21, title: 'Screenshot 21', src: '/story.jpg' },
    { id: 22, title: 'Screenshot 22', src: '/story-child-1.jpg' },
    { id: 23, title: 'Screenshot 23', src: '/story-child-3.jpg' },
    { id: 24, title: 'Screenshot 24', src: '/story-choice-1.jpg' },
    { id: 25, title: 'Screenshot 25', src: '/story-plague-1.jpg' },
    { id: 26, title: 'Screenshot 26', src: '/story-romance-1.jpg' },
    { id: 27, title: 'Screenshot 27', src: '/vibor.jpg' },
    { id: 28, title: 'Screenshot 28', src: '/firstNetflix.jpg' },
    { id: 29, title: 'Screenshot 29', src: '/secondNetflix.jpg' },
    { id: 30, title: 'Screenshot 30', src: '/comparison-novigrad-after-en@1x.jpg' },
    { id: 31, title: 'Screenshot 31', src: '/comparison-novigrad-before-en@1x.jpg' },
    { id: 32, title: 'Screenshot 32', src: '/comparison-skellige-after-en@1x.jpg' },
    { id: 33, title: 'Screenshot 33', src: '/comparison-skellige-before-en@1x.jpg' },
    { id: 34, title: 'Screenshot 34', src: '/tw3.png' },
    { id: 35, title: 'Screenshot 35', src: '/w3.png' },
];
const wallpapers = [
    { id: 1, title: 'Wallpaper 1', src: '/wallpaper/1920x1080-EN-EP2_wallpaper.jpg' },
    { id: 2, title: 'Wallpaper 2', src: '/wallpaper/Chinese_New_Year_wallpaper_Witcher_EN_q70_1920x1080.png' },
    { id: 3, title: 'Wallpaper 3', src: '/wallpaper/809322551dc4653a45ee03da31b6e32ef70d722c.jpg' },
    { id: 4, title: 'Wallpaper 4', src: '/wallpaper/833923a00f1e9823195fed988a5b0643c25112b6.jpg' },
    { id: 10, title: 'Wallpaper 10', src: '/wallpaper/e98e689752e38b0e1be946a304b70aa2a906cf62.jpg' },
    { id: 12, title: 'Wallpaper 12', src: '/wallpaper/thewitcher.com_en_1920x1080_57bef7525882f.jpg' },
    { id: 13, title: 'Wallpaper 13', src: '/wallpaper/thewitcher.com_en_1920x1080_59ad4d4a17395.jpg' },
    { id: 16, title: 'Wallpaper 16', src: '/wallpaper/thewitcher.com_en_1920x1080_604a0b0b9b7d4.jpg' },
    { id: 17, title: 'Wallpaper 17', src: '/wallpaper/thewitcher.com_en_1920x1080_604a0cc06cc4a.jpg' },
    { id: 18, title: 'Wallpaper 18', src: '/wallpaper/thewitcher.com_en_1920x1080_604a05c24581c.jpg' },
    { id: 19, title: 'Wallpaper 19', src: '/wallpaper/thewitcher.com_en_1920x1080_6114d68c3f5e3.jpg' },
];
function MediaSection() {
    const [activeTab, setActiveTab] = useState('videos');
    const [selectedItem, setSelectedItem] = useState(videos[0]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fade, setFade] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const logoRef = useRef(null);
    const tabsRef = useRef(null);
    const contentRef = useRef(null);
    useEffect(() => {
        const sectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    sectionObserver.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) {
            sectionObserver.observe(sectionRef.current);
        }
        return () => sectionObserver.disconnect();
    }, []);
    useEffect(() => {
        if (isVisible) {
            const mediaSection = document.querySelector('.media-section');
            if (mediaSection) {
                mediaSection.classList.add('loaded');
            }
            setTimeout(() => {
                if (logoRef.current) logoRef.current.classList.add('animate-in');
            }, 300);

            setTimeout(() => {
                if (tabsRef.current) tabsRef.current.classList.add('animate-in');
            }, 600);

            setTimeout(() => {
                if (contentRef.current) contentRef.current.classList.add('animate-in');
            }, 900);
        }
    }, [isVisible]);
    const handleTabClick = (tab) => {
        if (activeTab === tab) return;
        setFade(true);
        setAnimationClass('fade-out');
        setTimeout(() => {
            setActiveTab(tab);
            if (tab === 'videos') setSelectedItem(videos[0]);
            if (tab === 'screenshots') setSelectedItem(screenshots[0]);
            if (tab === 'wallpapers') setSelectedItem(wallpapers[0]);
            setFade(false);
            setAnimationClass('fade-in');
            setTimeout(() => {
                setAnimationClass('');
            }, 500);
        }, 300);
    };
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };
    const scrollGallery = (direction) => {
        const container = document.querySelector('.gallery-container');
        if (container) {
            const scrollAmount = 400;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    const animateGalleryItems = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('item-visible');
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        galleryItems.forEach(item => observer.observe(item));
    };
    useEffect(() => {
        if (activeTab === 'screenshots' || activeTab === 'wallpapers') {
            setTimeout(animateGalleryItems, 300);
        }
    }, [activeTab]);
    const renderContent = () => {
        if (activeTab === 'videos') {
            return (
                <>
                    <div className="main">
                        <iframe
                            src={selectedItem.src}
                            title={selectedItem.title}
                            frameBorder="0"
                            allowFullScreen
                            className="main-content"
                        />
                    </div>
                    <div className="sidebar">
                        <h3 className="sidebar-title">THE WITCHER 3: WILD HUNT</h3>
                        {videos.map((item, index) => (
                            <div
                                key={item.id}
                                className={`sidebar-item ${selectedItem.id === item.id ? 'active' : ''}`}
                                onClick={() => handleItemClick(item)}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <img src={item.thumbnail} alt={item.title} />
                                <div className="video-title">{item.title}</div>
                            </div>
                        ))}
                    </div>
                </>
            );
        } else {
            const items = activeTab === 'screenshots' ? screenshots : wallpapers;
            const itemsPerColumn = 2;
            const columns = [];
            for (let i = 0; i < items.length; i += itemsPerColumn) {
                columns.push(items.slice(i, i + itemsPerColumn));
            }
            return (
                <div className="gallery-wrapper">
                    <button className="scroll-button left" onClick={() => scrollGallery('left')}>&#10094;</button>
                    <div className="gallery-container">
                        {columns.map((column, columnIndex) => (
                            <div key={columnIndex} className="gallery-column">
                                {column.map((item) => (
                                    <div
                                        key={item.id}
                                        className="gallery-item"
                                        onClick={() => {
                                            handleItemClick(item);
                                            toggleFullscreen();
                                        }}
                                    >
                                        <img src={item.src} alt={item.title} />
                                        <div className="gallery-item-title">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <button className="scroll-button right" onClick={() => scrollGallery('right')}>&#10095;</button>
                </div>
            );
        }
    };
    return (
        <div id="media" ref={sectionRef} className={`media-section ${animationClass} ${isVisible ? 'section-visible' : ''}`}>
            <div className="main-logo-container" ref={logoRef}>
                <img src="/tw3.png" alt="Main Logo" className="main-logo" />
            </div>
            <div className="tabs" ref={tabsRef}>
                <button
                    className={activeTab === 'videos' ? 'active' : ''}
                    onClick={() => handleTabClick('videos')}
                >
                    VIDEOS
                </button>
                <button
                    className={activeTab === 'screenshots' ? 'active' : ''}
                    onClick={() => handleTabClick('screenshots')}
                >
                    SCREENSHOTS
                </button>
                <button
                    className={activeTab === 'wallpapers' ? 'active' : ''}
                    onClick={() => handleTabClick('wallpapers')}
                >
                    WALLPAPERS
                </button>
            </div>

            <div ref={contentRef} className={`media-content ${fade ? 'fade' : ''}`}>
                {renderContent()}
            </div>
            {isFullscreen && activeTab !== 'videos' && (
                <div className="fullscreen-overlay" onClick={toggleFullscreen}>
                    <span className="close-button">&times;</span>
                    <img src={selectedItem.src} alt={selectedItem.title}/>
                    <div className="fullscreen-title">{selectedItem.title}</div>
                </div>
            )}
        </div>
    );
}
export default MediaSection;