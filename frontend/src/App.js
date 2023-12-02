// App.js
import React from 'react';
import SwipeableCards from './components/SwipeableCards';
import ExpressionForm from './components/ExpressionsForm';
import jsonData from '../data/expressions.json';

const App = () => {
  return (
    <div>
      <ExpressionForm/>
      <SwipeableCards phrases={jsonData.phrases} />
    </div>
  );
};

export default App;
