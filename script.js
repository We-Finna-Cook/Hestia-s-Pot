let burger = document.querySelector('#burger')
let navbarMenu = document.querySelector('#nav-links')
let search = document.querySelector('#search')

burger.addEventListener('click', (event) =>{
    event.preventDefault();
    navbarMenu.classList.toggle('is-active');
})

search.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('test')
})

