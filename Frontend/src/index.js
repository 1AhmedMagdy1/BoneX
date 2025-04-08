import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Ensure the element with id "root" exists in your public/index.html
const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);


root.render(
  <>
    <App />
  </>
);
