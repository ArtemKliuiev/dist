const comentarSwiper = new Swiper('.comentars-swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 3000,
      },
    breakpoints: {
      650: {
          slidesPerView: 2,
          spaceBetween: 33,
      },
      1350: {
        slidesPerView: 3,
        spaceBetween: 33,
      },
    },
});