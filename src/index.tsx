import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const portalDiv = document?.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(portalDiv);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
