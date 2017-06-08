let blockRevealsContent = document.querySelectorAll('.blockReveal__content');
let blockRevealsElm = document.querySelectorAll('.blockReveal__elm');


for(let i = 0; i < blockRevealsContent.length; i++) {
  setTimeout(function() {
    blockRevealsContent[i].classList.add('blockReveal__content--animated')
    blockRevealsElm[i].classList.add('blockReveal__elm--animated')
  },300);
}