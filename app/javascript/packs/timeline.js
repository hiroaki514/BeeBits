import React from 'react';
import ReactDOM from 'react-dom';
import TimelineApp from '../components/TimelineApp';

document.addEventListener('DOMContentLoaded', () => {
  const timelineAppContainer = document.getElementById('timeline-app');

  if (timelineAppContainer) {
    ReactDOM.render(<TimelineApp />, timelineAppContainer);
  }
});
