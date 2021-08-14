//! calc

const calc = () => {
  const result = document.querySelector('.calculating__result span');
  const inputsBlock = document.querySelector('.calculating__field');

  let sex = localStorage.getItem('sex') || 'male',
      ratio = localStorage.getItem('ratio') || '1.375',
      // height,
      // weight,
      // age;
      height = localStorage.getItem('height') || '',
      weight = localStorage.getItem('weight') || '',
      age = localStorage.getItem('age') || '';

  document.querySelectorAll('.calculating__choose-item').forEach(item => {
    item.classList.remove('calculating__choose-item_active');
    if (item.getAttribute('data-ratio') === ratio) {
      item.classList.add('calculating__choose-item_active');
    } else if (item.getAttribute('id') === sex) {
      item.classList.add('calculating__choose-item_active');
    }

    if (item.tagName === 'INPUT'){
      switch(item.id){
        case 'height':
          item.value = localStorage.getItem('height');
          break;
        case 'weight':
          item.value = localStorage.getItem('weight');
          break;
        case 'age':
          item.value = localStorage.getItem('age');
          break;
      }
    }

  });

  function changeActive(target, selector) {
    document.querySelectorAll(selector).forEach(item => {
      item.classList.remove('calculating__choose-item_active');
    });
    target.classList.add('calculating__choose-item_active');
  }

  function getResult() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  getResult();

  function getInputInfo(e) {

    if (e.target && e.target.classList.contains('calculating__choose-item')) {

      //# sex
      switch(e.target.id){
        case 'female':
          sex = 'female';
          localStorage.setItem('sex', 'female');
          changeActive(e.target, '[data-gender]');
          break;
        case 'male':
          sex = 'male';
          localStorage.setItem('sex', 'male');
          changeActive(e.target, '[data-gender]');
          break;
      }

      //# inputs
      if (e.target.tagName === 'INPUT') {
        const width = window.getComputedStyle(e.target).width;
        const pos = e.target.getBoundingClientRect();
        const posTop = document.documentElement.scrollTop + pos.bottom;
        const notice = document.createElement('div');
        notice.classList.add('notice');
        notice.style.cssText = `
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: ${posTop}px;
          left: ${pos.left}px;
          width: ${width};
          color: red;
          opacity: 0;
          transition: .5s;
        `;
        notice.textContent = 'в цифрах';
        document.body.append(notice);
        e.target.addEventListener('input', () => {
          if (e.target.value.match(/\D/g)) {
            e.target.value = e.target.value.replace(/\D/g, '');
            notice.style.opacity = '1';
            setTimeout(() => {
              notice.style.opacity = '0';
            }, 500);
          }

          switch(e.target.id){
            case 'height':
              height = e.target.value;
              localStorage.setItem('height', height);
              break;
            case 'weight':
              weight = e.target.value;
              localStorage.setItem('weight', weight);
              break;
            case 'age':
              age = e.target.value;
              localStorage.setItem('age', age);
              break;
          }
          getResult();
        });
      }

      //# ratio
      if (e.target.dataset.ratio) {
        ratio = e.target.dataset.ratio;
        localStorage.setItem('ratio', ratio);
        changeActive(e.target, '[data-ratio]');
      }
      getResult();

    }

  }
  inputsBlock.addEventListener('click', (e) => getInputInfo(e));
};

export default calc;