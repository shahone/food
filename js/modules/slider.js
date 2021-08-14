//! slider

function slider({sliderBody, sliderTape, slide, nextArr, prevArr, totalNum, currentNum}) {

  const slider = document.querySelector(sliderBody);
  const sliderInner = document.querySelector(sliderTape);
  const slides = document.querySelectorAll(slide);
  const slidePrev = document.querySelector(nextArr);
  const slideNext = document.querySelector(prevArr);
  const currentSlide = document.querySelector(totalNum);
  const totalSlides = document.querySelector(currentNum);
  const sliderWidth = +window.getComputedStyle(slider).width.replace(/\D/g, '');
  const sliderInnerWidth = sliderWidth * slides.length;

  let offset = 0;
  let slideIndex = 1;


  slider.style.overflow = 'hidden';
  sliderInner.style.display = 'flex';
  sliderInner.style.width = sliderInnerWidth  + 'px';
  sliderInner.style.position = 'relative';
  sliderInner.style.transition = '.3s';
  // slides.forEach(slide => {
  //   slide.style.minWidth = sliderWidth;
  // });

  if (slides.length < 10) {
    totalSlides.textContent = `0${slides.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  } else {
    totalSlides.textContent = slides.length;
    currentSlide.textContent = slideIndex;
  }

  function changeCurrent(i) {
    if (i < 10) {
      currentSlide.textContent = `0${i}`;
    } else {
      currentSlide.textContent = i;
    }
    document.querySelectorAll('.dot').forEach((dot, n) => {
      dot.classList.remove('active');
      if (n === (i - 1)) {
        dot.classList.add('active');
      }
    });
  }

  slideNext.addEventListener('click', () => {

    if (offset === sliderInnerWidth - sliderWidth) {
      offset = 0;
      slideIndex = 0;
    } else {
      offset += sliderWidth;
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;
    changeCurrent(++slideIndex);

  });

  slidePrev.addEventListener('click', () => {

    if (offset === 0) {
      offset = sliderInnerWidth - sliderWidth;
      slideIndex = slides.length + 1;
    } else {
      offset -= sliderWidth;
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;
    changeCurrent(--slideIndex);

  });

  //# Pagination

  const dotsBox = document.createElement('ul');

  dotsBox.classList.add('carousel-indicators');
  slider.append(dotsBox);
  slider.style.position = 'relative';

  slides.forEach(slide => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dotsBox.append(dot);
  });

  document.querySelectorAll('.dot').forEach((dot, n) => {
    dot.classList.remove('active');
    if (n === (slideIndex - 1)) {
      dot.classList.add('active');
    }
    // console.log(dot, n);
  });

  function dotsDynamic(e) {

    if (e.target && e.target.classList.contains('dot')) {
      document.querySelectorAll('.dot').forEach((dot, n) => {
      if (e.target === dot) {
        offset = sliderWidth * n;
        slideIndex = n + 1;
        changeCurrent(slideIndex);
      }

      sliderInner.style.transform = `translateX(-${offset}px)`;
    });
    }
  }

  dotsBox.addEventListener('click', (e) => dotsDynamic(e));
}

export default slider;