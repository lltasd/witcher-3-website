import React, { useState, useEffect, useRef } from 'react';
import './CommunityCorner.css';

const CommunityCorner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const carouselRef = useRef(null);
    const autoPlayRef = useRef(null);

    const projects = [
        {
            title: "THE WITCHER SCHOOL QUIZ",
            description: "Пройдите тест и узнайте, к какой школе Ведьмаков вы принадлежите. Откройте для себя свою истинную природу и предназначение в мире Геральта из Ривии.",
            image: "/meda.jpg",
            symbol: "/witcher-school-symbol.png",
            status: "active"
        },
        {
            title: "IT'S ALL ABOUT YOU!",
            description: "Поделитесь своими приключениями в мире Ведьмака и выиграйте эксклюзивные награды от CD PROJEKT RED. Ваша история может стать легендой!",
            image: "/aay.jpg",
            symbol: "/aay-symbol.png",
            status: "active"
        },
        {
            title: "GWENT TOURNAMENT",
            description: "Примите участие в турнире по Гвинту и докажите, что вы лучший игрок во всем Континенте. Соревнуйтесь с игроками со всего мира!",
            image: "/gwent.jpg",
            symbol: "/gwent-symbol.png",
            status: "upcoming"
        },
        {
            title: "ТВОРЧЕСКИЙ КОНКУРС",
            description: "Покажите свой талант в искусстве, музыке или литературе, создавая произведения по вселенной Ведьмака. Лучшие работы будут отмечены разработчиками!",
            image: "/art-contest.jpg",
            symbol: "/art-symbol.png",
            status: "active"
        }
    ];


    useEffect(() => {
        const playAutoSlide = () => {
            if (!isAnimating) {
                handleNext();
            }
        };

        autoPlayRef.current = setInterval(playAutoSlide, 7000);

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAnimating]);


    const handleSlideChange = (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);

        if (carouselRef.current) {
            carouselRef.current.classList.add('sliding');
            carouselRef.current.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');

            setTimeout(() => {
                direction === 'next' ? handleNext() : handlePrev();

                carouselRef.current.classList.remove('sliding', 'slide-left', 'slide-right');
                setTimeout(() => setIsAnimating(false), 50);
            }, 400);
        }
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };


    const getVisibleProjects = () => {

        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

        let visibleCount = 3;

        if (windowWidth <= 992) {
            visibleCount = 2;
        }
        if (windowWidth <= 768) {
            visibleCount = 1;
        }


        const visibleProjects = [];

        for (let i = 0; i < visibleCount; i++) {
            const index = (activeIndex + i) % projects.length;
            visibleProjects.push(projects[index]);
        }

        return visibleProjects;
    };


    const handleProjectClick = (index) => {
        console.log(`Переход к проекту: ${projects[(activeIndex + index) % projects.length].title}`);

    };

    return (
        <div className="community-corner-container">
            <div className="witcher-medallion">
                <img src="/witcher-medallion.png" alt="Witcher Medallion" />
            </div>

            <div className="logo-container">
                <img src="/w3.png" alt="Logo" className="logo" />
            </div>

            <div className="content-wrapper">
                <div className="community-info">
                    <h1 className="community-title">COMMUNITY CORNER</h1>
                    <div className="title-divider">
                        <div className="divider-line"></div>
                        <div className="divider-symbol"></div>
                        <div className="divider-line"></div>
                    </div>
                    <p className="community-description">
                        Добро пожаловать в Community Corner – ваше главное место для всех общественных
                        проектов CD PROJEKT RED, связанных с миром Ведьмака!
                    </p>
                    <p className="community-subtext">
                        Ниже вы найдете список текущих событий, а также тех, которые уже завершились (но могут вернуться в будущем!).
                        Чтобы узнать больше о конкретном проекте, просто нажмите на соответствующую карточку, чтобы перейти на
                        специальную страницу с подробной информацией. Присоединяйтесь к сообществу и станьте частью легендарной истории!
                    </p>
                </div>

                <div className="projects-wrapper">
                    <div className="community-projects" ref={carouselRef}>
                        {getVisibleProjects().map((project, index) => (
                            <div
                                className={`project-card ${project.status}`}
                                key={index}
                                onClick={() => handleProjectClick(index)}
                            >
                                <div className="project-status-badge">
                                    {project.status === 'active' ? 'Активно' :
                                        project.status === 'upcoming' ? 'Скоро' : 'Завершено'}
                                </div>
                                <div className="project-badge">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="badge-image"
                                    />
                                    <div className="project-overlay">
                                        <div className="witcher-symbol"
                                             style={{backgroundImage: `url(${project.symbol})`}}>
                                        </div>
                                    </div>
                                </div>
                                <div className="project-info">
                                    <h2 className="badge-title">{project.title}</h2>
                                    <p className="project-description">{project.description}</p>
                                    <button className="witcher-button">
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommunityCorner;