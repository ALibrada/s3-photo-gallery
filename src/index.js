import {h, render} from 'preact';
import App from './App.js';

let elem;
render(h(App), document.querySelector('.root'), elem);