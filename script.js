let burger = document.querySelector('#burger')
let navbarMenu = document.querySelector('#nav-links')
let search = document.querySelector('#search')
let searchInput = document.querySelector('#searchBar')
const tabs = document.querySelectorAll('.tabs li')
const tabContentBoxes = document.querySelectorAll('#tab-content > div')
// const headShots = document.querySelector('#about-picture') 

const currentAboutPicture = document.querySelector('#about-picture');

burger.addEventListener('click', (event) =>{
    event.preventDefault();
    navbarMenu.classList.toggle('is-active');
})

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'))
        tab.classList.add('is-active');

        const target = tab.dataset.target;
        tabContentBoxes.forEach(box => {
            if(box.getAttribute('id') === target){
                box.classList.remove('is-hidden');
            }else{
                box.classList.add('is-hidden')
            }
        })

            if (target === 'Oshaun') {
                currentAboutPicture.src = 'assets/MARCY_HEADSHOTS-525.jpg';;
              } else if (target === 'Randy') {
                currentAboutPicture.src = 'assets/logo.png';
              }
    })
})

let ul = document.querySelector('#searchList')
search.addEventListener('submit', (e) => {
    e.preventDefault();
    let value = searchInput.value
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + value)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        ul.innerHTML = '';
        if(data.meals){
            for(let dish of data.meals){
            let li = document.createElement('li');
            li.innerText = dish.strMeal
            ul.append(li);
        }}
        else{
            let li = document.createElement('li');
            li.innerText = "Sorry, no meals found"
            ul.append(li);
        }
    })
    searchInput.value = '';
})

fetch('http://www.themealdb.com/api/json/v1/1/filter.php?c=goat').then(response => response.json())
.then(data => console.log(data))

