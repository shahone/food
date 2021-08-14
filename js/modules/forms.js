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
      document.querySelector('.modal__dialog').append(messageWindow);

      const formData = new FormData(form);
      console.log(formData);

      //@ достаем данные из formData
      // const obj = {};
      // formData.forEach((value, key) => {
      //   obj[key] = value;
      // });
      // console.log(JSON.stringify(obj));

      //@ или
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      console.log(json);


      //* fetch

      postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        messageWindow.textContent = message.success;
        setTimeout(() => {
          messageWindow.remove();
          modalWindow.classList.remove('show');
          modalContent.classList.remove('hide');
          document.body.style.overflow = '';
        }, 3000);
      }).catch(() => {
        messageWindow.textContent = message.error;
      }).finally(() => {
        form.reset();
      });

    });

  }
}

export default forms;