import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import NoSleep from 'nosleep.js';

// Empêche la mise en veille de l'écran
const noSleep = new NoSleep();

document.addEventListener('click', () => {
  noSleep.enable().catch(() => {});
});

// Plein écran dès le chargement
document.addEventListener('DOMContentLoaded', () => {
  // Empêche clic droit
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Empêche F12, CTRL+SHIFT+I, ALT+TAB (limité sur navigateur)
document.addEventListener('keydown', (e) => {
  const interdit = ['F12', 'F5'];
  if (
    interdit.includes(e.key) ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.altKey && e.key === 'Tab')
  ) {
    e.preventDefault();
    e.stopPropagation();
  }
});

  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(() => {});
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
