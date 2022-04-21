'use strict';

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'Using cookies helps us learn more about you and what YOU love.';
message.innerHTML =
'We use cookies to help us help you! We hope you understand and stay. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function(){
    message.remove();
})

message.style.backgroundColor = '#37383d';

//scroll to part of page
const LearnMoreScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
LearnMoreScroll.addEventListener('click', function (e){
  console.log('test');
  section1.scrollIntoView({behavior: 'smooth'});
})

//alert addEventListener
const logo = document.querySelector('.header__img');
const logoAlert = function(e){
  alert('These are just some of the amazing animals we can have you pet!');
  logo.removeEventListener('mouseenter', logoAlert);
}
logo.addEventListener('mouseenter', logoAlert);

const tabs = document.querySelectorAll('.operations__tab');
const container = document.querySelector('.operations__tab-container');
const content = document.querySelectorAll('.operations__content');

container.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  content.forEach(c=> c.classList.remove('operations__content--active'))
  clicked.classList.add('operations__tab--active');
  const datatab = clicked.dataset.tab;
  console.log(datatab);
  document.querySelector('.operations__content--' + datatab).classList.add('operations__content--active');

  
});

//menu fade/animation
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const Hlogo = link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el !==link) el.style.opacity=0.5;
    });
    Hlogo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const Hlogo = link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el !==link) el.style.opacity=1;
    });
    Hlogo.style.opacity = 1;
  }
});



//SLIDER YAY

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxSlide = slides.length;
let curSlide = 0;
slides.forEach((s, i) => s.style.transform = `translateX(${100*i}%`);


const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};


const nextSlide = function(){
  if(curSlide===maxSlide-1){
    curSlide = 0;
  } else{
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

const prevSlide =function(){
  if(curSlide===0){
    curSlide=maxSlide-1;
  }
  else{
  curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);


//arrow key movement
document.addEventListener('keydown', function(e){
  if(e.key ==='ArrowLeft') prevSlide();
  e.key ==='ArrowRight' && nextSlide();

})

const dotContainer = document.querySelector('.dots');
const createDots = function(){
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};
createDots();

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide }= e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});




const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
 
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};


//sticky navigatino :D
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//section revealing


const revealSection = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;
 
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection,{})
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})