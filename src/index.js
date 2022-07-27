import anime from 'animejs';
import ScrollMagic from 'scrollmagic';
import css from './style.css';
import headerCss from './header.css';
import { ScrollMagicPluginIndicator } from 'scrollmagic-plugins';

ScrollMagicPluginIndicator(ScrollMagic);
const controller = new ScrollMagic.Controller();

const menuAnimeHandler = (direction) => {
  anime({
    targets: '.menu-icon-vector',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 500,
    delay: function (el, i) {
      return i * 250;
    },
    direction: direction,
  });
};

const menuNavAnimeHandler = () => {
  const test1 = anime.timeline({
    duration: 700,
  });
  test1
    .add({
      targets: '.overlay-nav-list li',
      translateY: -40,
      opacity: 1,
      loop: false,
      duration: 500,
      easing: 'easeOutQuad',
      delay: function (el, i, l) {
        return i * 100;
      },
      endDelay: function (el, i, l) {
        return (l - i) * 100;
      },
    })
    .add(
      {
        targets: '.footer-icon-list',
        translateY: -40,
        opacity: 1,
        loop: false,
        delay: function (el, i, l) {
          return i * 100;
        },
        endDelay: function (el, i, l) {
          return (l - i) * 100;
        },
      },
      '-=500'
    );
  anime({
    targets: '.footer-border',
    width: '100%',
    opacity: 1,
    easing: 'easeOutQuad',
  });
};

const menuCloseHandler = () => {
  anime({
    targets: ['.overlay-nav-list li', '.footer-icon-list'],
    translateY: 40,
    opacity: 0,
    easing: 'easeInOutSine',
    duration: 500,
  });
  anime({
    targets: '.footer-border',
    width: 0,
    opacity: 0,
    easing: 'easeOutQuad',
  });
};

//MENU CLICK BTN HANDLER
const menuBtnHandler = () => {
  const menuBtn = document.querySelector('#nav-btn');
  const closeBtn = document.querySelector('.exit-btn');
  const mainBtn = document.querySelector('.overlay-img-wrapper');
  const overlay = document.querySelector('.menu-overlay');
  const navList = document.querySelector('.overlay-nav-list');

  menuBtn.addEventListener('click', () => {
    overlay.classList.toggle('clicked');
    setTimeout(() => {
      menuAnimeHandler('forwards');
      menuNavAnimeHandler();
    }, 500);
  });
  closeBtn.addEventListener('click', () => {
    menuAnimeHandler('reverse');
    menuCloseHandler();
    setTimeout(() => {
      overlay.classList.toggle('clicked');
    }, 500);
  });
  mainBtn.addEventListener('click', () => {
    menuAnimeHandler('reverse');
    menuCloseHandler();
    setTimeout(() => {
      overlay.classList.toggle('clicked');
    }, 500);
  });
  navList.addEventListener('click', () => {
    menuAnimeHandler('reverse');
    menuCloseHandler();
    setTimeout(() => {
      overlay.classList.toggle('clicked');
    }, 500);
  });
};
menuBtnHandler();

// const outerPath = document.querySelectorAll('#Vector_3 path, #Vector');
// console.log(outerPath);
// outerPath.forEach((element) => {
//   element.style.strokeDasharray = '450';
// });

const pathEls = document.querySelectorAll('.stroke-path');
for (let i = 0; i < pathEls.length; i++) {
  const pathEl = pathEls[i];
  const offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute('stroke-dashoffset', offset);
  anime({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: anime.random(800, 1500),
    delay: anime.random(0, 0),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    autoplay: true,
  });
}

const letterEls = document.querySelectorAll('.letter');
for (let i = 0; i < letterEls.length; i++) {
  const letterEl = letterEls[i];
  const offset = anime.setDashoffset(letterEl);
  letterEl.setAttribute('stroke-dashoffset', offset);
  anime({
    targets: letterEl,
    duration: anime.random(300, 1000),
    delay: anime.random(200, 300),
    opacity: [{ value: 0, duration: anime.random(200, 300) }],
    loop: true,
  });
}

// anime({
//   targets: '.test',
//   translateX: 250,
//   rotate: '1turn',
//   backgroundColor: '#FFF',
//   duration: 800,
// });

// anime({
//   targets: '#redU',
//   translateX: -115,
//   translateY: -10,
//   duration: 1000,
//   easing: 'easeInOutQuad',
// });

// anime({
//   targets: '.test',
//   translateY: -50,
//   opacity: 1,
//   loop: false,
//   delay: function (el, i, l) {
//     return i * 100;
//   },
//   endDelay: function (el, i, l) {
//     return (l - i) * 100;
//   },
// });

// anime({
//   targets: '#Vector',
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: 'easeInOutSine',
//   duration: 1500,
//   delay: function (el, i) {
//     return i * 250;
//   },
//   direction: 'forwards',
// });

const test5 = anime.timeline({
  // targets: '.test-box',
  // delay: anime.stagger(500, { grid: [3, 3], from: 'center' }),
  // loop: true,
  autoplay: false,
});
test5
  .add({
    scale: 0.5,
  })
  .add({
    targets: '.test-grid',
    gap: 5,
  })
  .add({
    scale: 1,
  })
  .add({
    targets: '.test-grid',
    gap: 20,
  });

let scrollAnime = new ScrollMagic.Scene({
  triggerElement: '#skill',
  duration: 2000,
  triggerHook: 0,
})
  .addIndicators({
    colorTrigger: 'white',
    colorStart: 'blue',
    colorEnd: 'red',
  })
  .on('progress', function (event) {
    test5.seek(test5.duration * event.progress);
  })
  .setPin('#skill')
  .addTo(controller);

const test1 = anime.timeline({
  duration: 3000,
});
test1
  .add({
    targets: '.Vector',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function (el, i) {
      return i * 250;
    },
    direction: 'reverse',
  })
  .add(
    {
      targets: '.test',
      translateY: -50,
      opacity: 1,
      loop: false,
      delay: function (el, i, l) {
        return i * 100;
      },
      endDelay: function (el, i, l) {
        return (l - i) * 100;
      },
    },
    '-=100'
  );

const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750,
});

tl.add({
  targets: '#test1',
  translateY: -250,
})
  .add(
    {
      targets: '#test2',
      translateY: -250,
    },
    '-=600'
  ) // relative offset
  .add(
    {
      targets: '#test3',
      translateY: -250,
    },
    400
  ); // absolute offset
