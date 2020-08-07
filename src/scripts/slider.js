export const SliderModule = (function () {
  let position = 0;
  let sliderOptions = {};

  function initSlider(id, slideShow, slideStep) {
    const sliderContainer = document.querySelector(id);
    const sliderList = sliderContainer.firstElementChild;
    const sliderListItem = sliderList.children;
    const sliderListItemLen = sliderListItem.length;
    const btnPrev = document.getElementsByClassName('carousel-swiper-buttons-prev')[0];
    const btnNext = document.getElementsByClassName('carousel-swiper-buttons-next')[0];
    const itemWidth = sliderContainer.offsetWidth / slideShow;
    const movePosition = slideStep * itemWidth;

    sliderOptions = {
      slideStep,
      slideShow,
      sliderContainer,
      sliderList,
      sliderListItem,
      sliderListItemLen,
      btnPrev,
      btnNext,
      itemWidth,
      movePosition,
    };

    slideElementPrev();
    slideElementNext();
    createDots();
  }

  function slideElementPrev() {
    sliderOptions.btnPrev.addEventListener('click', () => {
      position += sliderOptions.movePosition;

      setPosition();
      disableBtn();
    });
  }

  function slideElementNext() {
    sliderOptions.btnNext.addEventListener('click', () => {
      position -= sliderOptions.movePosition;

      setPosition();
      disableBtn();
    });
  }

  function setPosition() {
    sliderOptions.sliderList.style.transform = `translateX(${position}px)`;
  }

  function disableBtn() {
    sliderOptions.btnPrev.disabled = position === 0;
    sliderOptions.btnNext.disabled = position
    <= -(sliderOptions.sliderListItemLen - sliderOptions.slideShow)
    * sliderOptions.itemWidth;
  }

  function createDots() {
    const pager = document.createElement('div');
    pager.addEventListener('click', initDots);
    pager.classList.add('pager');
    for (let i = 0; i < sliderOptions.sliderListItemLen / sliderOptions.slideStep; i++) {
      const pagerItem = document.createElement('div');
      pagerItem.setAttribute('data-position', `${i}`);
      pagerItem.classList.add('pager-item');
      pager.appendChild(pagerItem);
    }
    sliderOptions.sliderContainer.appendChild(pager);
  }

  function initDots(elem) {
    const pagerItem = document.querySelectorAll('.pager-item');
    if (elem.target.className === 'pager-item') {
      pagerItem.forEach((el) => {
        el.classList.remove('pager-item-active');
      });
      elem.target.classList.add('pager-item-active');
      position = -elem.target.getAttribute('data-position') * sliderOptions.slideStep * sliderOptions.itemWidth;
      setPosition();
    }
  }

  return {
    initSlider,
  };
})();
