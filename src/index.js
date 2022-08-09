import anime from 'animejs';
import ScrollMagic from 'scrollmagic';
import css from './style.css';
import headerCss from './header.css';
import mainCss from './main.css';
import media from './media.css';
import { ScrollMagicPluginIndicator } from 'scrollmagic-plugins';

let width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
let height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

window.onresize = function () {
  console.log('resize');
};
window.addEventListener('resize', () => {
  console.log('resize2');
  width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
});

console.log(width, height);

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
  const html = document.querySelector('html');

  menuBtn.addEventListener('click', () => {
    overlay.classList.toggle('clicked');
    setTimeout(() => {
      menuAnimeHandler('forwards');
      menuNavAnimeHandler();
      html.style.overflow = 'hidden';
    }, 500);
  });
  closeBtn.addEventListener('click', () => {
    menuAnimeHandler('reverse');
    menuCloseHandler();
    html.style.overflow = 'scroll';
    setTimeout(() => {
      overlay.classList.toggle('clicked');
    }, 500);
  });
  mainBtn.addEventListener('click', () => {
    menuAnimeHandler('reverse');
    menuCloseHandler();
    html.style.overflow = 'scroll';
    setTimeout(() => {
      overlay.classList.toggle('clicked');
    }, 500);
  });
  navList.addEventListener('click', () => {
    menuAnimeHandler('reverse');
    menuCloseHandler();
    html.style.overflow = 'scroll';
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
    duration: '100%',
    triggerHook: 0.25,
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
      begin: () => {
        window.scrollTo({ top: 0 });
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
        // window.scrollTo({ top: 0 });
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
    .add(
      {
        targets: '.button-wrapper',
        duration: 600,
        opacity: 1,
        easing: 'linear',
      },
      '-=500'
    );
};

//ABOUT METHOD
const aboutScroll = () => {
  const svg = document.querySelector('.home-contents svg');
  const html = document.querySelector('html');

  let aboutAnime = new ScrollMagic.Scene({
    triggerElement: '#about',
    triggerHook: 0,
  })
    .addIndicators()
    .reverse(true)
    .on('enter', function (event) {
      html.style.overflow = 'hidden';

      anime
        .timeline({
          targets: svg,
        })
        .add({
          duration: 1100,
          easing: 'easeOutBounce',
          keyframes: [
            { rotate: -25 },
            {
              translateY: '90vh',
              translateX: '-50rem',
            },
          ],
        })
        .add({
          easing: 'easeOutElastic',
          duration: 2000,
          rotate: 0,
          translateX: '0rem',
        })
        .add(
          {
            targets: '.about-greeting p',
            duration: 700,
            easing: 'easeOutElastic',
            translateY: '5rem',
            rotate: () => {
              return anime.random(-5, 5);
            },
            opacity: 1,
            delay: function (el, i, l) {
              return i * anime.random(0, 170);
            },
            endDelay: function (el, i, l) {
              return (l - i) * anime.random(0, 100);
            },
            complete: () => {
              html.style.overflow = 'scroll';
            },
          },
          '-=2100'
        );

      anime({
        duration: 2000,
        easing: 'easeInExpo',
        targets: '.about-text',

        opacity: 1,
      });
    })
    .addTo(controller);

  const reverseAbout = new ScrollMagic.Scene({
    triggerElement: '#about',
    triggerHook: 0.3,
  })
    .on('leave', () => {
      anime
        .timeline({
          targets: '.about-greeting p',
          translateY: 0,
          duration: 800,
          opacity: 0,
        })
        .add({
          duration: 3000,
          targets: '.home-contents svg',
          translateY: 0,
          translateX: 0,
          rotate: 0,
        });

      anime({
        duration: 2000,
        targets: '.about-text',
        opacity: 0,
      });
    })
    .addTo(controller);
};

//SKILLS METHOD
const skillGridAnime = (width) => {
  let col = 4;
  let row = 3;
  let gap = '5rem';
  if (width < 1007) {
    col = 3;
    row = 4;
    gap = '3rem';
  }

  anime
    .timeline({
      targets: '.skill-content-wrapper',
      delay: anime.stagger(200, { grid: [col, row], from: 'center' }),
      loop: true,
    })
    .add({
      duration: 1000,
      targets: '.skill-wrapper svg',
      scale: 0.7,
    })
    .add(
      {
        duration: 1000,
        targets: '.skill-wrapper svg',
        color: '#F076BC',
      },
      '-=1000'
    )
    .add({
      duration: 1000,
      targets: '.skill-content-wrapper',
      gap: gap,
      paddingTop: '10.5rem',
    })
    .add(
      {
        duration: 1000,
        targets: '.skill-wrapper svg',
        color: '#736FBD',
      },
      '-=1000'
    )
    .add({
      duration: 1000,
      targets: '.skill-wrapper svg',
      scale: 1,
    })
    .add(
      {
        duration: 1000,
        targets: '.skill-wrapper svg',
        color: '#9E489B',
      },
      '-=1000'
    )
    .add({
      duration: 1000,
      targets: '.skill-content-wrapper',
      gap: '1.5',
      paddingTop: '15rem',
    })
    .add(
      {
        duration: 1000,
        targets: '.skill-wrapper svg',
        color: '#00b1bd',
      },
      '-=1000'
    );
};

//PROJECT METHOD
const projectMethod = () => {
  const card = document.querySelectorAll('.project-content-card');
  card.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'rotateY(80deg)';
  });

  const projectAnime = new ScrollMagic.Scene({
    triggerElement: '#project',
    triggerHook: 0.25,
    // duration: '100%',
  })
    .reverse(true)
    .on('enter', () => {
      anime
        .timeline({
          targets: '.project-content-card',
        })
        .add({
          easing: 'linear',
          duration: 500,
          opacity: 1,
          rotateY: 0,
          delay: anime.stagger(200, { from: 'first' }),
        });
    })
    .on('leave', () => {
      anime
        .timeline({
          targets: '.project-content-card',
        })
        .add({
          easing: 'easeOutExpo',
          duration: 1000,
          opacity: 0,
          rotateY: 80,
        });
    })
    .addTo(controller);
};

const projectCardMethod = () => {
  const card = document.querySelectorAll('.project-content-card');
  let playing = false;

  card.forEach((element) => {
    element.addEventListener('click', () => {
      if (playing) return;
      playing = true;
      anime({
        targets: element,
        scale: [{ value: 1 }, { value: 1.2 }, { value: 1, delay: 250 }],
        rotateY: { value: '+=180', delay: 200 },
        easing: 'easeInOutSine',
        duration: 600,
        complete: function (anim) {
          playing = false;
        },
      });
    });
  });
};

if (width > 1007) {
  scrollEvent();
}
menuNav();
loadingScreen();
aboutScroll();
skillGridAnime(width);
projectCardMethod();
projectMethod();

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
