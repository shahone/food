//! modal

function modal(modalWindow, triggerSelector) {

  const  modalTriggers = document.querySelectorAll(triggerSelector);

  const toggleModal = () => {
    modalWindow.classList.toggle('show');
    fixScroll();
  };

  const fixScroll = () => {
    const body = document.body;
    const scrollOn = body.offsetWidth;
    if (body.style.overflow === 'hidden') {
      body.style.overflow = '';
      body.style.marginRight = '';
    } else {
      body.style.overflow = 'hidden';
      const scrollOff = body.offsetWidth;
      const scroll = scrollOff - scrollOn;
      body.style.marginRight = scroll + 'px';
    }
  };
  // скрыто чтоб не бесило
  // const timerModal = setTimeout(toggleModal, 3000);

  const showModalByScroll = () => {
    //              или window.pageYOffset
    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      toggleModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      toggleModal();
      // clearInterval(timerModal);

    });
  });

  modalWindow.addEventListener('click', e => {
    if (e.target === modalWindow || e.target.classList.contains('modal__close')) {
      toggleModal();
    }
  });

  window.addEventListener('scroll', showModalByScroll);
}

export default modal;