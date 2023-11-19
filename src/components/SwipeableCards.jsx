import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const SwipeableCards = ({ phrases }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledPhrases, setShuffledPhrases] = useState(phrases.slice());
  const [knownPhrases, setKnownPhrases] = useState([]);
  const [unknownPhrases, setUnknownPhrases] = useState([]);
  const [swipedDirection, setSwipedDirection] = useState(null);
  const [swipePosition, setSwipePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setShuffledPhrases(phrases.slice().sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setSwipedDirection(null);
    setSwipePosition({ x: 0, y: 0 });
  }, [phrases]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    onSwiping: (event) => {
      setSwipePosition({ x: event.deltaX, y: event.deltaY });
      setIsTransitioning(false);
    },
    onSwiped: () => setIsTransitioning(true),
  });

  const handleSwipe = (direction) => {
    const currentPhrase = shuffledPhrases[currentIndex];

    if (direction === 'right') {
      setKnownPhrases((prevKnownPhrases) => [...prevKnownPhrases, currentPhrase]);
    } else {
      setUnknownPhrases((prevUnknownPhrases) => [...prevUnknownPhrases, currentPhrase]);
    }

    setSwipedDirection(direction);

    // Move to the next card after a short delay
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledPhrases.length);
      setSwipedDirection(null);
      setSwipePosition({ x: 0, y: 0 });
      setIsTransitioning(false);
    }, 200);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      handleSwipe('right');
    } else if (event.key === 'ArrowLeft') {
      handleSwipe('left');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, shuffledPhrases, handleSwipe]);

  const containerStyle = {
    position: 'relative',
    width: '300px',
    height: '200px',
    margin: '0 auto',
  };

  const cardStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) translate(${swipePosition.x}px, ${swipePosition.y}px)`,
    backgroundColor: '#0C0A3E',
    color: '#ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '1.5rem',
    opacity: swipedDirection ? 0 : 1,
    transition: `background-color ${isTransitioning ? '0.1s' : '0.2s'} ease-out, opacity ${
      isTransitioning ? '0.1s' : '0.2s'
    } ease-out, transform ${isTransitioning ? '0.1s' : '0.2s'} ease-out`,
    width: '200px',
    height: '300px',
    marginTop: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  };

  const circleStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: swipePosition.x > 0 ? 'green' : swipePosition.x < 0 ? 'red' : '#fff',
  };

  const translationStyle = {
    fontSize: '1rem',
    color: '#DDDCF9',
    opacity: '0.3',
  };

  return (
    <div {...handlers} style={containerStyle}>
      <AppBar position="fixed" style={{ backgroundColor: '#0C0A3E', zIndex: 1000 }}>
        <Toolbar>
          <Typography variant="" component="div" sx={{ flexGrow: 1 }}>
            Espressione {unknownPhrases.length} / {knownPhrases.length}
          </Typography>
        </Toolbar>
      </AppBar>
      {shuffledPhrases.length > 0 && (
        <div
          onTransitionEnd={() => setIsTransitioning(false)}
          style={cardStyle}
        >
          <div style={circleStyle}></div>
          <p>{shuffledPhrases[currentIndex].italian}</p>
          <p style={translationStyle}>{shuffledPhrases[currentIndex].english}</p>
        </div>
      )}
    </div>
  );
};

export default SwipeableCards;
