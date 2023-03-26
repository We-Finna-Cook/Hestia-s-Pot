let burger = document.querySelector('#burger')
let navbarMenu = document.querySelector('#nav-links')

burger.addEventListener('click', () =>{
    event.preventDefault();

    navbarMenu.classList.toggle('is-active');
})

