const menuBtn = document.getElementById('menu-btn')
const nav = document.getElementById('nav')
const showSideMenu = () => {
  if (!nav.classList.contains('header-navbar--open')) {
    nav.classList.add('header-navbar--open')
  } else {
    nav.classList.remove('header-navbar--open')
  }
}
menuBtn.addEventListener('click', showSideMenu)