import React from 'react';
import ReactDOM from 'react-dom'; // 'react-dom'から直接インポートします
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// パフォーマンスを計測する場合は、reportWebVitalsを使用します
reportWebVitals();
