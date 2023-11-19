// App.js
import React from 'react';
import SwipeableCards from './components/SwipeableCards';
import jsonData from './data/espressione.json';

const App = () => {
  return (
    <div>
      <SwipeableCards phrases={jsonData.phrases} />
    </div>
  );
};

export default App;
