import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import './index.css';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
    <HashRouter>
        <App /> 
    </HashRouter>,
document.getElementById('root'));