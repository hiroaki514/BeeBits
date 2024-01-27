// app/javascript/packs/application.js

import React from 'react';
import ReactDOM from 'react-dom';
import TimelineApp from '../components/TimelineApp';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <TimelineApp />
    </React.StrictMode>,
    document.getElementById('root') // あなたのHTMLの表示先に応じてIDを変更してください
  );
});
