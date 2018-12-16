import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebfontLoader from '@dr-kobros/react-webfont-loader';

const config = {
    google: {
      families: ['Montserrat:300,400,600'],
    }
  };

ReactDOM.render(<WebfontLoader config={config} ><App /></WebfontLoader>, document.getElementById('root'));
