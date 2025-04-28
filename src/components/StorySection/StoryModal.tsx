import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './StoryModal.css';

interface StoryModalProps {
    story: {
        id: string;
        title: string;
        description: string;
        fullDescription?: string;
        thumbnails: string[];
    };
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
                                                          story,
                                                          activeIndex,
                                                          setActiveIndex,
                                                          onClose
                                                      }) => {
    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeIndex < story.thumbnails.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    return (
        <div className="story-modal-overlay" onClick={onClose}>
            <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="modal-main-content">
                    <div className="modal-image-container">
                        <img
                            src={story.thumbnails[activeIndex]}
                            alt={`${story.title} - Image ${activeIndex + 1}`}
                            className="modal-main-image"
                        />

                        <div className="modal-text-overlay">
                            <h3 className="modal-title">{story.title}</h3>
                            <p className="modal-description">
                                {story.fullDescription || story.description}
                            </p>
                        </div>

                        <div className="modal-navigation">
                            {activeIndex > 0 && (
                                <button
                                    className="modal-nav-btn modal-prev"
                                    onClick={handlePrevImage}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            )}

                            {activeIndex < story.thumbnails.length - 1 && (
                                <button
                                    className="modal-nav-btn modal-next"
                                    onClick={handleNextImage}
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            )}
                        </div>
                    </div>

                    {story.thumbnails.length > 1 && (
                        <div className="modal-thumbnails">
                            {story.thumbnails.map((thumb, idx) => (
                                <div
                                    key={idx}
                                    className={`modal-thumbnail ${idx === activeIndex ? 'active' : ''}`}
                                    onClick={() => handleThumbnailClick(idx)}
                                >
                                    <img
                                        src={thumb}
                                        alt={`${story.title} thumbnail ${idx + 1}`}
                                    />
                                    {idx === activeIndex && <div className="thumbnail-active-indicator" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};