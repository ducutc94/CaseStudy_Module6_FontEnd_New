import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/css/base.css';
import '../src/css/modal_login.css';
import '../src/css/header.css';
import '../src/css/home.css';
import '../src/css/footer.css';
import '../src/css/form_CreateUpdate.css';
import '../src/css/shop.css';
import '../src/css/views_food.css';
import '../src/css/confirm_email.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
