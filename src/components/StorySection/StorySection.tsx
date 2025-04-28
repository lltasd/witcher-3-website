import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { storyData } from './storyData';
import { StoryCard } from './StoryCard';
import { StoryModal } from './StoryModal';
import './StorySection.css';

const StorySection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<typeof storyData[0] | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
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

    const openModal = (card: typeof storyData[0], index: number = 0) => {
        setActiveModal(card);
        setActiveIndex(index);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!modalOpen) return;

        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowRight':
                if (activeModal && activeIndex < activeModal.thumbnails.length - 1) {
                    setActiveIndex(prev => prev + 1);
                }
                break;
            case 'ArrowLeft':
                if (activeModal && activeIndex > 0) {
                    setActiveIndex(prev => prev - 1);
                }
                break;
            default:
                break;
        }
    };

    // Add global keyboard listener
    useEffect(() => {
        const handleKeyboardEvent = (e: KeyboardEvent) => {
            if (!modalOpen) return;

            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight' && activeModal && activeIndex < activeModal.thumbnails.length - 1) {
                setActiveIndex(prev => prev + 1);
            } else if (e.key === 'ArrowLeft' && activeModal && activeIndex > 0) {
                setActiveIndex(prev => prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyboardEvent);
        return () => window.removeEventListener('keydown', handleKeyboardEvent);
    }, [modalOpen, activeModal, activeIndex]);

    return (
        <section
            ref={sectionRef}
            id="story"
            className="story-section"
            onKeyDown={handleKeyDown}
        >
            <div className="story-logo">
                <img
                    src="/tw3.png"
                    alt="The Witcher 3"
                    className="witcher-logo"
                />
            </div>

            <div className="story-container">
                <h2 className={`story-title ${isVisible ? 'fade-in' : ''}`}>STORY</h2>

                <p className={`story-description ${isVisible ? 'fade-in' : ''}`}>
                    In a war-torn world, with the Wild Hunt on your back, you'll take on your most
                    important contract – to track down the child of prophecy, a key and a weapon
                    which can save or destroy all.
                </p>

                <div className={`story-cards-grid ${isVisible ? 'cards-appear' : ''}`}>
                    {storyData.map((card, index) => (
                        <StoryCard
                            key={card.id}
                            card={card}
                            index={index}
                            onClick={() => openModal(card, 0)}
                        />
                    ))}
                </div>
            </div>

            {modalOpen && activeModal && (
                <StoryModal
                    story={activeModal}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    onClose={closeModal}
                />
            )}
        </section>
    );
};

export default StorySection;