import "popper"
import "bootstrap"
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './react/App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  document.addEventListener('DOMContentLoaded', () => {
    root.render(<App />);
  });
}
