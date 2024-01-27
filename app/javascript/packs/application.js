import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from '../components/MyComponent';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<MyComponent />, document.getElementById('react-root'));
});
