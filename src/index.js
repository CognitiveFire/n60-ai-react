
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: If you have any global CSS
import App from './App'; // Import your main app component



// Render your root component (App) to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This should be the div with id 'root' in your index.html
);
