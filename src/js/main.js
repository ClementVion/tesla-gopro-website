import $ from 'jquery';

// Texts reveal on load
let blockRevealsContent = document.querySelectorAll('.blockReveal__content--top');
let blockRevealsElm = document.querySelectorAll('.blockReveal__elm--top');

for(let i = 0; i < blockRevealsContent.length; i++) {
  setTimeout(function() {
    blockRevealsContent[i].classList.add('blockReveal__content--animated')
    blockRevealsElm[i].classList.add('blockReveal__elm--animated')
  },300);
}

// Scroll events
let appearElms = document.querySelectorAll('.appear');
let parallaxElms = document.querySelectorAll('[data-parallax="true"]');

draw();

function draw() {
  requestAnimationFrame(draw)

  if($(window).width() > 1025)
  	scrollEvent();
}

function scrollEvent() {
  let viewportTop = $(window).scrollTop();
  let windowHeight = $(window).height();
  let viewportBottom = windowHeight+viewportTop;
  
  // Parallax elements
    for (let elm of parallaxElms) {
      let sym = '';
      let distance = viewportTop * parseFloat(elm.getAttribute('data-speed'));
      if (elm.getAttribute('data-direction') === 'up'){ sym = '-'; } else { sym = ''; }
      elm.style.transform = 'translate3d(0, ' + sym + distance + 'px,0)';
    }
  
  // Appear elements
  for (let i = 0; i < appearElms.length; i++) {
    let elm = appearElms[i];
    
    if(isElementInViewport(elm) && !$(elm).hasClass('appeared')) {
      $(elm).addClass('appeared');
    }
  }
}

// Detect if element is in viewport
function isElementInViewport (el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= ( (window.innerHeight) || (document.documentElement.clientHeight) ) && //&& /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }