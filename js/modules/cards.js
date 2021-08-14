//! cards

import getData from "../services/services";

function cards() {

  const cardsWrapper = document.querySelector('.menu__field .container');

  class MenuItem {
    constructor (imgSrc, alt, subtitle, descr, price, ...classes) {
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.subtitle = subtitle;
      this.descr = descr;
      this.price = price;
      this.rate = 27;
      this.changeToUAH();
      this.classes = classes;
    }
    changeToUAH () {
      this.price *= this.rate;
    }
    createCard () {
      const card = document.createElement('div');
      if (this.classes.length === 0) {
        card.classList.add('menu__item');
      } else {
        this.classes.forEach(className => card.classList.add(className));
      }
      card.innerHTML = `
        <img src="${this.imgSrc}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      cardsWrapper.append(card);
    }
    showData () {
      console.log(this.imgSrc, this.alt, this.subtitle, this.descr, this.price);
    }
  }

  //* fetch

  // getData из services.js
  // getData('http://localhost:3000/menu')
  // .then(data => {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     new MenuItem(img, altimg, title, descr, price).createCard();
  //   });
  // });

  //* axios
  axios.get('http://localhost:3000/menu')
  .then(data => {
    data.data.forEach(({img, altimg, title, descr, price}) => {
      new MenuItem(img, altimg, title, descr, price).createCard();
    });
  });
}

export default cards;