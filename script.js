let burger = document.querySelector('#burger')
let navbarMenu = document.querySelector('#nav-links')
let search = document.querySelector('#search')
let searchInput = document.querySelector('#searchBar')
const tabs = document.querySelectorAll('.tabs li')
const tabContentBoxes = document.querySelectorAll('#tab-content > div');
const currentAboutPicture = document.querySelector('#about-picture');
const searchColumns = document.querySelector('#searchColumns');
const searchStatus = document.querySelector('#searchStatus')

burger.addEventListener('click', (event) => {
    event.preventDefault();
    navbarMenu.classList.toggle('is-active');
})

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'))
        tab.classList.add('is-active');

        const target = tab.dataset.target;
        tabContentBoxes.forEach(box => {
            if (box.getAttribute('id') === target) {
                box.classList.remove('is-hidden');
            } else {
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

search.addEventListener('submit', (e) => {
    e.preventDefault();
    let value = searchInput.value
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + value)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            searchColumns.innerHTML = '';

            if (data.meals) {
                searchStatus.innerText = 'Results'
                for (let meal of data.meals) {
                    let columnDiv = document.createElement('div');
                    columnDiv.classList.add("column", "is-4-tablet", "is-3-desktop");
                    let cardDiv = document.createElement('div');
                    cardDiv.classList.add("card");
                    let cardImageDiv = document.createElement('div');
                    cardImageDiv.classList.add("card-image", "has-text-centered");
                    let cardContentDiv = document.createElement('div');
                    cardContentDiv.classList.add('card-content');
                    let cardFooter = document.createElement('footer');
                    cardFooter.classList.add("card-footer");
                    columnDiv.appendChild(cardDiv);
                    cardDiv.appendChild(cardImageDiv);
                    cardDiv.appendChild(cardContentDiv);
                    cardDiv.appendChild(cardFooter);
                    let foodImage = document.createElement('img')
                    foodImage.src = meal.strMealThumb;
                    foodImage.alt = "Picture Of Dish";
                    foodImage.style.objectFit = 'cover';
                    foodImage.style.maxHeight = '200px';
                    foodImage.style.width = '100%';
                    cardImageDiv.appendChild(foodImage);
                    let dishName = document.createElement('p')
                    dishName.classList.add('title');
                    dishName.innerText = meal.strMeal;
                    cardContentDiv.appendChild(dishName);

                    let instructionP = document.createElement('p');
                    instructionP.classList.add("card-footer-item");
                    let instructionA = document.createElement('a');
                    instructionA.classList.add("has-text-grey");
                    instructionA.innerText = 'Instructions';
                    instructionP.appendChild(instructionA);
                    cardFooter.appendChild(instructionP);

                    if (meal.strYoutube) {
                        let videoP = document.createElement('p');
                        videoP.classList.add("card-footer-item");
                        let videoA = document.createElement('a');
                        videoA.classList.add("has-text-grey");
                        videoA.innerText = 'Youtube';
                        videoA.href = meal.strYoutube;
                        videoA.target = '_blank';
                        videoP.appendChild(videoA);
                        cardFooter.appendChild(videoP);
                    }
                    searchColumns.appendChild(columnDiv);
                }
            }
            else {
                searchStatus.innerText = 'Sorry, No Recipes Found'
            }
        })
    searchInput.value = '';
})

// fetch('http://www.themealdb.com/api/json/v1/1/categories.php').then(response => response.json())
// .then(data => console.log(data))

