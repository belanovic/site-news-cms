import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './App.js';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from './newsContext';



ReactDom.render(<Provider><Router><App /></Router></Provider>, document.getElementById('root'));