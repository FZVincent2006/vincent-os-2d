import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/dotgothic16/japanese-400';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LanguageProvider } from './i18n/LanguageProvider';
import { installMonitorBridge } from './monitorBridge';

installMonitorBridge();

ReactDOM.render(
    <React.StrictMode>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
