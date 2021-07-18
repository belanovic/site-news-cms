import React from 'react';
import ReactDom from 'react-dom';
import App from './App.js';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from './newsContext';
import './style/index.css';
import './style/media.css';


ReactDom.render(<Provider><Router><App /></Router></Provider>, document.getElementById('root'));