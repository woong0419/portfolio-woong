import anime from 'animejs';
import ScrollMagic from 'scrollmagic';
import css from './style.css';
import headerCss from './header.css';
import mainCss from './main.css';
import { ScrollMagicPluginIndicator } from 'scrollmagic-plugins';

ScrollMagicPluginIndicator(ScrollMagic);
const controller = new ScrollMagic.Controller();

//MENU CLICK HANDLER
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
  anime
    .timeline({
      duration: 700,
    })
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

//MENU CLICK BTN METHOD
const menuNav = () => {
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
//SCROLL EVENT HANDLER
const scrollEventHandler = (title) => {
  const menuTitle = document.querySelector('.page-title-wrapper span');
  let scrollAnime = new ScrollMagic.Scene({
    triggerElement: `#${title}`,
    duration: 1000,
    triggerHook: 0,
  })
    .addIndicators({
      colorTrigger: 'white',
      colorStart: 'blue',
      colorEnd: 'red',
    })
    .reverse(true)
    .on('enter', function (event) {
      anime({
        duration: 400,
        targets: menuTitle,
        opacity: 0,
        easing: 'easeInOutSine',
      });
      setTimeout(() => {
        anime({
          duration: 200,
          targets: menuTitle,
          opacity: 1,
          easing: 'easeOutQuad',
          innerHTML: title,
          update: function (anim) {
            menuTitle.innerHTML = menuTitle.innerHTML.slice(
              0,
              menuTitle.innerHTML.length - 2
            );
          },
        });
      }, 300);
    })
    .addTo(controller);
};
//SCROLL EVENT METHOD
const scrollEvent = () => {
  scrollEventHandler('home');
  scrollEventHandler('about');
  scrollEventHandler('skill');
  scrollEventHandler('project');
  scrollEventHandler('contact');
};

//LOADING SCREEN METHOD
const loadingScreen = () => {
  const html = document.querySelector('html');
  const loading = document.querySelector('.loading');
  html.style.overflow = 'hidden';

  anime
    .timeline({
      duration: 2400,
    })
    .add({
      targets: '.loading-logo-vector',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1000,
      delay: function (el, i) {
        return i * 250;
      },
    })
    .add({
      targets: ['.loading-text-name', '.loading-text-title'],
      translateY: -20,
      opacity: 1,
      duration: 300,
      loop: false,
      easing: 'easeOutSine',
      delay: function (el, i, l) {
        return i * 100;
      },
      endDelay: function (el, i, l) {
        return (l - i) * 100;
      },
    })
    .add({
      targets: '.loading-logo-vector',
      strokeDashoffset: [0, anime.setDashoffset],
      easing: 'easeInOutSine',
      duration: 1000,
      delay: function (el, i) {
        return i * 250;
      },
      direction: 'revere',
    })
    .add({
      targets: ['.loading-text-name', '.loading-text-title'],
      translateY: -20,
      duration: 100,
      opacity: 0,
      loop: false,
      easing: 'easeOutSine',
    })
    .add({
      targets: '.loading',
      easing: 'linear',
      duration: 300,
      opacity: 0,
      complete: () => {
        loading.style.visibility = 'hidden';
        html.style.overflow = 'scroll';
        window.scrollTo({ top: 0 });
      },
    })
    .add({
      targets: '.home-text',
      // translateY: -30,
      opacity: 1,
      easing: 'linear',
      duration: 600,
      loop: false,
      delay: function (el, i, l) {
        return i * 50;
      },
      endDelay: function (el, i, l) {
        return (l - i) * 50;
      },
    })
    .add({
      targets: '.button-wrapper',
      duration: 600,
      opacity: 1,
      easing: 'linear',
    });
};

scrollEvent();
menuNav();
loadingScreen();

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

// const test1 = anime.timeline({
//   duration: 3000,
// });
// test1
//   .add({
//     targets: '.Vector',
//     strokeDashoffset: [anime.setDashoffset, 0],
//     easing: 'easeInOutSine',
//     duration: 1500,
//     delay: function (el, i) {
//       return i * 250;
//     },
//     direction: 'reverse',
//   })
//   .add(
//     {
//       targets: '.test',
//       translateY: -50,
//       opacity: 1,
//       loop: false,
//       delay: function (el, i, l) {
//         return i * 100;
//       },
//       endDelay: function (el, i, l) {
//         return (l - i) * 100;
//       },
//     },
//     '-=100'
//   );

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
