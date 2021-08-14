'use strict';

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import tabs from './modules/tabs';
import slider from './modules/slider';
import timer from './modules/timer';

document.addEventListener('DOMContentLoaded', () => {

  const deadline = '2021-08-23';
  const modalWindow = document.querySelector('.modal');
  slider({
    sliderBody: '.offer__slider-wrapper',
    sliderTape: '.offer__slider-inner',
    slide: '.offer__slide',
    nextArr: '.offer__slider-prev',
    prevArr: '.offer__slider-next',
    totalNum: '#current',
    currentNum: '#total'
  });
  tabs('.tabcontent', '.tabheader__item', '.tabheader__items');
  calc();
  timer(deadline);
  modal(modalWindow, '[data-modal]');
  cards();
  forms(modalWindow);

});

//! npx webpack
//! json-server db.json
//! на сервере проверяешь-то?
