export const SliderModule = (function () {
  let position = 0;

  let sliderOptions = {};

  function initSlider(id, slideCount, slideShow) {
    const sliderContainer = document.querySelector(id);
    const sliderList = sliderContainer.firstElementChild;
    const sliderListItem = sliderList.children;
    const btnPrev = document.getElementsByClassName('carousel-swiper-buttons-prev')[0];
    const btnNext = document.getElementsByClassName('carousel-swiper-buttons-next')[0];
    const itemWidth = sliderContainer.offsetWidth / slideCount;
    const movePosition = slideShow * itemWidth;

    sliderOptions = {
      sliderContainer,
      sliderList,
      sliderListItem,
      btnPrev,
      btnNext,
      itemWidth,
      movePosition,
    };

    slideElementPrev();
    slideElementNext();
  }

  function slideElementPrev() {
    sliderOptions.btnPrev.addEventListener('click', () => {
      position += sliderOptions.movePosition;
      sliderOptions.sliderList.style.transform = `translateX(${position}px)`;
    });
  }

  function slideElementNext() {
    sliderOptions.btnNext.addEventListener('click', () => {
      position -= sliderOptions.movePosition;
      sliderOptions.sliderList.style.transform = `translateX(${position}px)`;
    });
  }

  return {
    initSlider,
  };
})();
