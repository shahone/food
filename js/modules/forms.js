//! forms

import {postData} from "../services/services";

function forms (modalWindow) {

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    success: 'Ок',
    error: 'Что-то не то',
    img: 'img/spinner.svg'
  };

  forms.forEach(form => bindPostData(form));

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const modalContent = document.querySelector('.modal__content');
      modalContent.classList.add('hide');

      const messageWindow = document.createElement('div');
      messageWindow.classList.add('modal__content');
      messageWindow.innerHTML = '<img src=' + message.img + ' ' + 'alt="loading">';
      // messageWindow.textContent = message.loading;
      if (form.getAttribute('data-nomodal') === '') {
        const order = document.querySelector('.order');
        order.style.position = 'relative';
        messageWindow.style.cssText = `
          width: fit-content;
          height: fit-content;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        `;
        order.append(messageWindow);
      } else {
        document.querySelector('.modal__dialog').append(messageWindow);
      }

      const formData = new FormData(form);

      //@ достаем данные из formData
      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      // console.log(JSON.stringify(obj));

      //@ или
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // console.log(json);

      //* fetch

      postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(JSON.stringify(data));
        messageWindow.textContent = message.success;

      }).catch(() => {
        console.log('error');
        messageWindow.textContent = message.error;
      }).finally(() => {
        form.reset();
        setTimeout(() => {
          messageWindow.remove();
          modalWindow.classList.remove('show');
          modalContent.classList.remove('hide');
          document.body.style.overflow = '';
        }, 3000);
      });

    });

  }
}

export default forms;