import {h, render} from 'preact';
import Router from 'preact-router';
import db from '../../db.json';

let elem, App;
function init() {
    App = require('./App.js').default;
    function Main() {
        const items = db.photos;
        return h(Router, {},
            h(App, {path: '/', items}),
            h(App, {path: '/edit', readonly: false, items}),
        );
    }
    elem = render(Main(), document.querySelector('.root'), elem);
}

init();

if (process.env.NODE_ENV === 'production') {
    // cache all assets if browser supports serviceworker
    // if ('serviceWorker' in navigator && location.protocol === 'https:') {
    //     navigator.serviceWorker.register('/service-worker.js');
    // }

    // add Google Analytics
    //window.ga = new GAnalytics('UA-XXXXXXXX-X');
} else {
    // use preact's devtools
    require('preact/devtools');
    // listen for HMR
    if (module.hot) {
        module.hot.accept('./App.js', init);
    }
}