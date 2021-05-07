import '@babel/polyfill';
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from 'redux'
import allReducers from "./reducers";
import Loyalty from './Loyalty';

import {addEvent} from "./actions/actionCreator";

// css
import './styles.css';

// images
import './favicon.ico'
import './images/logo.svg'
import './images/home-bg.png'
import './images/qr-code.svg'
import './images/accept.svg'
import './images/logout.svg'
import './images/company.png'
import './images/main-image-registration.png'
import './images/main-image-welcome.svg'
import './images/main-image-keys.svg'
import './images/main-image-name.svg'
import './images/arrow-back.svg'
import './images/arrow-back-white.svg'
import './images/info.svg'
import './images/person.svg'
import './images/gift.svg'
import './images/trade-point-bg.png'
import './images/down.svg'
import './images/coffee-full.svg'
import './images/coffee-empty.svg'
import './images/gift-grey.svg'
import './images/gift-color.svg'
import './images/gold-medal-empty.svg'
import './images/gray-medal-empty.svg'
import './images/settings.svg'
import './images/avatar.svg'
import './images/add.svg'
import './images/cat.png'
import './images/empty.svg'
import './images/promo1.png'
import './images/promo2.png'
import './images/promo3.png'
import './images/promo4.png'
import './images/promo5.png'
import './images/promo6.png'
import './images/book.png'
import './images/full-cat.png'
import './images/icons/60x60.png'
import './images/icons/120x120.png'
import './images/icons/192x192.png'
import './images/icons/512x512.png'
import './images/dino.png'
import './images/map-bg.png'
import './images/half-cat.png'
import './images/plus.png'
import './images/share-ios.png'
import './images/yes.svg'
import './images/no.svg'
import './images/yellow-clock.png'
import './images/yellow-heart.svg'
import './images/tags/color-house.png'
import './images/tags/color-cup.png'
import './images/tags/color-clock.png'
import './images/tags/gray-house.png'
import './images/tags/gray-cup.png'
import './images/tags/gray-clock.png'
import './images/promo-croissant-novosibirsk.png'
import './images/promo-waffles-omsk.png'
import './images/review-left.svg'
import './images/review-right.svg'
import './images/keys-left.svg'
import './images/keys-right.svg'
import './images/done.svg'
import './images/vk.svg'
import './images/fb.svg'
import './images/ok.svg'
import './images/panda.png'
import './images/house.png'
import './images/girl-with-coffee.png'
import './images/entry-bg.png'
import './images/percent.svg'
import './images/tags/green-clock.png'
import './images/tags/green-compass.png'
import './images/tags/green-diamond.svg'
import './images/tags/green-money.svg'

import models from "./js/models";

const store = createStore(allReducers);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw_loyalty.js',{scope: '/'})
            .then(registration => {
                console.log('SW registered!!!');
                // registration.pushManager.subscribe({userVisibleOnly: true});
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            })
    });
} else {
    console.log('Текущий браузер не поддерживает service worker-ы.');
}

window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    store.dispatch(addEvent(e));
});

models.connectDB();

ReactDOM.render(
    <Provider store={store}>
        <Loyalty/>
    </Provider>,
    document.getElementById('loyalty')
);
