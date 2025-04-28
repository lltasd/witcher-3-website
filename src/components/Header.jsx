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
        setMenuOpen(false);
        scrollToSection(sectionId);
    };

    return (
        <header id="header" className={`hdr_f4sd3 ${isScrolled ? 'scr_4ss2' : ''}`}>
            <div className="hdr_ctn_29fd">
                <div className="mob_tgl_x8ad" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className="mn_nv_22sk">
                    <ul className={`nv_lnk_0d2s ${menuOpen ? 'actv_s5w1' : ''}`}>
                        <li className="drp_dwn_3r4f" ref={gamesDropdownRef}>
                            <Link to="#" className="nv_lnk_it5e" onClick={toggleGamesDropdown}>
                                GAMES
                                <span className={`drp_arw_q1wd ${gamesDropdownOpen ? 'rtd_0dd0' : ''}`}>▼</span>
                            </Link>
                            <div className={`drp_mn_u9v1 cstm_drp_h6x2 ${gamesDropdownOpen ? 'vis_7b1e' : ''}`}>
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
                            <Link to="#" className="nv_lnk_it5e" onClick={(e) => handleNavClick(e, 'netflixSection')}>
                                NETFLIX
                            </Link>
                        </li>

                        <li>
                            <Link to="/witcher-website" className="nv_lnk_it5e" onClick={() => setMenuOpen(false)}>
                                REDKIT
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className="nv_lnk_it5e" onClick={(e) => handleNavClick(e, 'openworld')}>
                                OPEN WORLD
                            </Link>
                        </li>

                        <li className="drp_dwn_3r4f" ref={communityDropdownRef}>
                            <Link to="#" className="nv_lnk_it5e" onClick={toggleCommunityDropdown}>
                                COMMUNITY
                                <span className={`drp_arw_q1wd ${communityDropdownOpen ? 'rtd_0dd0' : ''}`}>▼</span>
                            </Link>
                            <div className={`drp_mn_u9v1 cstm_drp_h6x2 ${communityDropdownOpen ? 'vis_7b1e' : ''}`}>
                                <a href="https://forums.cdprojektred.com/index.php?forums/the-witcher-series.22/"
                                   target="_blank" rel="noopener noreferrer">
                                    Forums
                                </a>
                                <a href="https://www.thewitcher.com/en/my-rewards" target="_blank" rel="noopener noreferrer">
                                    My Rewards
                                </a>
                            </div>
                        </li>

                        <li>
                            <Link to="#" className="nv_lnk_it5e" onClick={(e) => handleNavClick(e, 'media')}>
                                MEDIA
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Link to="#" className="by_nw_btn_44sa" onClick={(e) => handleNavClick(e, 'header')}>
                    BUY NOW
                </Link>
            </div>
        </header>
    );
};

export default Header;
