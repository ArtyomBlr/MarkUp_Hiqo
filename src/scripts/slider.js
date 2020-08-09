export const SliderModule = (function () {
  let position = 0;
  let sliderOptions = {};

  function initSlider(id, slideShow, slideStep) {
    const sliderContainer = document.querySelector(id);
    const sliderList = sliderContainer.firstElementChild;
    const sliderListItem = sliderList.children;
    const sliderListItemLen = sliderListItem.length;
    const sliderBtn = document.getElementsByClassName('carousel-swiper-buttons')[0];
    const sliderBtnPrev = document.getElementsByClassName('carousel-swiper-buttons-prev')[0];
    const sliderBtnNext = document.getElementsByClassName('carousel-swiper-buttons-next')[0];
    const itemWidth = (sliderContainer.offsetWidth + 20) / slideShow;
    const movePosition = slideStep * itemWidth;

    //  How to realize this? I dont see the solution
    // const initOptions = {
    //   ...options,
    // };

    sliderOptions = {
      // ...initOptions,
      slideShow,
      slideStep,
      sliderContainer,
      sliderList,
      sliderListItem,
      sliderListItemLen,
      sliderBtn,
      sliderBtnPrev,
      sliderBtnNext,
      itemWidth,
      movePosition,
    };

    moveSlider();
    createDots();
  }

  function moveSlider() {
    sliderOptions.sliderBtn.addEventListener('click', (elem) => {
      if (elem.target.className === 'carousel-swiper-buttons-prev') {
        position += sliderOptions.movePosition;

        setPosition();
      }
      if (elem.target.className === 'carousel-swiper-buttons-next') {
        position -= sliderOptions.movePosition;

        setPosition();
      }
      disableBtn();
    });
  }

  function setPosition() {
    sliderOptions.sliderList.style.transform = `translateX(${position}px)`;

    activateDots();
  }

  function disableBtn() {
    sliderOptions.sliderBtnPrev.disabled = position === 0;
    sliderOptions.sliderBtnNext.disabled = position
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

  function activateDots() {
    const pagerItem = document.getElementsByClassName('pager-item');
    for (let q = 0; q < pagerItem.length; q++) {
      pagerItem[q].classList.remove('pager-item-active');
      if (+pagerItem[q].getAttribute('data-position') === -(position / sliderOptions.itemWidth / sliderOptions.slideShow)) {
        pagerItem[q].classList.add('pager-item-active');
      }
    }
  }

  return {
    initSlider,
  };
})();
