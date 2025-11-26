import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// 💡 রানটাইম ডিটেকশন লজিক
// এটি ব্রাউজারের কারেন্ট URL চেক করে বেস পাথ ঠিক করে
const repoPath = '/studydashboardfinal';
const isGitHubPages = window.location.pathname.startsWith(repoPath);

// গিটহাবে থাকলে রিপো পাথ, অন্যথায় রুট '/'
const basename = isGitHubPages ? repoPath : '/';

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* ডাইনামিক বেসনেম পাস করা হচ্ছে যাতে পেজ রিফ্রেশে ক্র্যাশ না করে */}
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
