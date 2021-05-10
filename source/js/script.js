let navMain = document.querySelector('.main-nav');
let topHeader = document.querySelector('.page-header__top');
let navToggle = document.querySelector('.main-nav__toggle');
let navToggleButton = document.querySelector('.main-nav__toggle-button');
let siteList = document.querySelector('.site-list');
let openTrue = true;
let clientHeight = 295;
const logoHeight = 65;
const contentHeight = clientHeight - 35 + 'px';
//console.log('Инициализация, высота:' + clientHeight);


navMain.classList.remove('main-nav--nojs');
topHeader.classList.remove('page-header__top--nojs');
siteList.style.top = -clientHeight - logoHeight + 'px';

window.addEventListener('resize', function (event) {

  if (document.body.clientWidth > 767) {
    openTrue = true;
    clientHeight = 195;
    topHeader.style.height = logoHeight + 'px';
    siteList.style.top = -clientHeight - logoHeight + 'px';
    navMain.classList.remove('main-nav--opened');
    navToggleButton.classList.remove('openned');
  }
})


navToggle.addEventListener('click', function () {
  navMain.classList.toggle('main-nav--opened');
  navToggleButton.classList.toggle('openned');

  if (openTrue) {
    topHeader.style.height = contentHeight;
    siteList.style.top = '-2px';
    openTrue = false;
  } else {
    topHeader.style.height = logoHeight + 'px';
    siteList.style.top = -clientHeight - logoHeight + 'px';
    openTrue = true;
  }
}
)


function beforeAfter() {
  document.querySelector('.liveview__divisor').style.width = document.querySelector('.liveview__drag').value + "%";
  /* console.log(document.querySelector('.liveview__drag').value + "%"); */
}
