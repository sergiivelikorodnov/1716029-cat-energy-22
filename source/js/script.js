let navMain = document.querySelector('.main-nav');
let topHeader = document.querySelector('.page-header__top');
let navToggle = document.querySelector('.main-nav__toggle');
let siteList = document.querySelector('.site-list');
let openTrue = true;
let clientHeight = navMain.clientHeight;
/* console.log('Инициализация, высота:' + clientHeight); */

navMain.classList.remove('main-nav--nojs');
siteList.style.top = -clientHeight - 65 + 'px';

window.addEventListener('resize', function (event) {

  if (document.body.clientWidth > 767) {
    openTrue = true;
    clientHeight = 195;
    topHeader.style.height = '65px';
    siteList.style.top = -clientHeight - 65 + 'px';
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.remove('openned');
    ;
  }
})


navToggle.addEventListener('click', function () {
  navMain.classList.toggle('main-nav--opened');
  navToggle.classList.toggle('openned');

  if (openTrue) {
    topHeader.style.height = clientHeight + 65 + 'px';
    siteList.style.top = '0px';
    openTrue = false;
  } else {
    topHeader.style.height = '65px';
    siteList.style.top = -clientHeight - 65 + 'px';
    openTrue = true;
  }
}
)

function beforeAfter() {
  document.querySelector('.liveview__divisor').style.width = document.querySelector('.liveview__drag').value + "%";
  /* console.log(document.querySelector('.liveview__drag').value + "%"); */
}
