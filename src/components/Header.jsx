import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ scrollPosition, scrollToSection }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
    const [gamesDropdownOpen, setGamesDropdownOpen] = useState(false);

    const communityDropdownRef = useRef(null);
    const gamesDropdownRef = useRef(null);

    useEffect(() => {
        if (scrollPosition > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        const handleClickOutside = (event) => {
            if (communityDropdownRef.current && !communityDropdownRef.current.contains(event.target)) {
                setCommunityDropdownOpen(false);
            }
            if (gamesDropdownRef.current && !gamesDropdownRef.current.contains(event.target)) {
                setGamesDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [scrollPosition]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleCommunityDropdown = (e) => {
        e.preventDefault();
        setCommunityDropdownOpen(!communityDropdownOpen);
        setGamesDropdownOpen(false);
    };

    const toggleGamesDropdown = (e) => {
        e.preventDefault();
        setGamesDropdownOpen(!gamesDropdownOpen);
        setCommunityDropdownOpen(false);
    };

    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        setMenuOpen(false); // Закрываем меню на мобилке
        scrollToSection(sectionId);
    };

    return (
        <header id="header" className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="mobile-toggle" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className="main-nav">
                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li className="dropdown" ref={gamesDropdownRef}>
                            <Link to="#" className="nav-link" onClick={toggleGamesDropdown}>
                                GAMES
                                <span className={`dropdown-arrow ${gamesDropdownOpen ? 'rotated' : ''}`}>▼</span>
                            </Link>
                            <div className={`dropdown-menu custom-dropdown ${gamesDropdownOpen ? 'visible' : ''}`}>
                                <Link to="#">Thronebreaker: The Witcher Tales</Link>
                                <Link to="#">GWENT: The Witcher Card Game</Link>
                                <Link to="#">The Witcher 4</Link>
                                <Link to="#">The Witcher 3: Wild Hunt</Link>
                                <Link to="#">The Witcher 2: Assassins of Kings</Link>
                                <Link to="#">The Witcher: Enhanced Edition</Link>
                                <Link to="#">The Witcher Adventure Game</Link>
                            </div>
                        </li>

                        <li>
                            <Link to="#" className="nav-link" onClick={(e) => handleNavClick(e, 'netflixSection')}>
                                NETFLIX
                            </Link>
                        </li>

                        <li>
                            <Link to="/witcher-website" className="nav-link" onClick={() => setMenuOpen(false)}>
                                REDKIT
                            </Link>
                        </li>


                        <li>
                            <Link to="#" className="nav-link" onClick={(e) => handleNavClick(e, 'openworld')}>
                                OPEN WORLD
                            </Link>
                        </li>

                        <li className="dropdown" ref={communityDropdownRef}>
                            <Link to="#" className="nav-link" onClick={toggleCommunityDropdown}>
                                COMMUNITY
                                <span className={`dropdown-arrow ${communityDropdownOpen ? 'rotated' : ''}`}>▼</span>
                            </Link>
                            <div className={`dropdown-menu custom-dropdown ${communityDropdownOpen ? 'visible' : ''}`}>
                                <a href="https://forums.cdprojektred.com/index.php?forums/the-witcher-series.22/"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    Forums
                                </a>
                                <a href="https://www.thewitcher.com/en/my-rewards" target="_blank"
                                   rel="noopener noreferrer">
                                    My Rewards
                                </a>
                            </div>
                        </li>

                        <li>
                            <Link to="#" className="nav-link" onClick={(e) => handleNavClick(e, 'media')}>
                                MEDIA
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Link
                    to="#"
                    className="buy-now-button"
                    onClick={(e) => handleNavClick(e, 'header')}
                >
                    BUY NOW
                </Link>
            </div>
        </header>
    );
};

export default Header;
