let burger = document.querySelector('#burger')
let navbarMenu = document.querySelector('#nav-links')
let search = document.querySelector('#search')
let searchInput = document.querySelector('#searchBar')
const tabs = document.querySelectorAll('.tabs li')
const tabContentBoxes = document.querySelectorAll('#tab-content > div');
const currentAboutPicture = document.querySelector('#about-picture');
const searchColumns = document.querySelector('#searchColumns');
const searchStatus = document.querySelector('#searchStatus');
let modalStatus = document.querySelector('#modal');
let modalTitle = document.querySelector('#modalTitle');
let modalInstruction = document.querySelector('#instructionsText');
let category = document.querySelector('#categoryDrop')
let categoryColumns = document.querySelector('#categoryColumns');

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
            currentAboutPicture.src = 'assets/randy.jpg';
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

                    instructionA.addEventListener('click', () => {
                        modalTitle.innerText = meal.strMeal;
                        modalInstruction.innerText = meal.strInstructions;
                        let ul = document.querySelector('#ingredientsText');
                        ul.innerHTML = '';
                        let i = 1;
                        while (meal[`strIngredient${i}`] && i <= 20) {
                            if (meal[`strIngredient${i}`].length > 1) {
                                let li = document.createElement('li');
                                let label = document.createElement('label');
                                label.classList.add('checkbox');
                                let input = document.createElement('input');
                                input.type = 'checkbox';
                                label.append(input);
                                li.append(label);
                                li.append(' ' + meal[`strMeasure${i}`] + ' ' + meal[`strIngredient${i}`] + ' ')
                                ul.append(li);
                            }
                            i++;
                        }
                        modalStatus.classList.add('is-active');
                    })
                }
            }
            else {
                searchStatus.innerText = 'Sorry, No Recipes Found'
            }
        })
    searchInput.value = '';
})

let modalClose = document.querySelector('#modalClose');
modalClose.addEventListener('click', () => {
    modalStatus.classList.remove('is-active');
})

// category.
category.addEventListener("change", () => {
    console.log(category.value);
    let idNums = [];
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category.value)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            categoryColumns.innerHTML = '';
            for (let meal of data.meals) {
                idNums.push(meal.idMeal)
            }
            for (let id of idNums) {
                fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
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
                        foodImage.src = data.meals[0].strMealThumb;
                        foodImage.alt = "Picture Of Dish";
                        foodImage.style.objectFit = 'cover';
                        foodImage.style.maxHeight = '200px';
                        foodImage.style.width = '100%';
                        cardImageDiv.appendChild(foodImage);
                        let dishName = document.createElement('p')
                        dishName.classList.add('title');
                        dishName.innerText = data.meals[0].strMeal;
                        cardContentDiv.appendChild(dishName);


                        let instructionP = document.createElement('p');
                        instructionP.classList.add("card-footer-item");
                        let instructionA = document.createElement('a');
                        instructionA.classList.add("has-text-grey");
                        instructionA.innerText = 'Instructions';
                        instructionP.appendChild(instructionA);
                        cardFooter.appendChild(instructionP);

                        if (data.meals[0].strYoutube) {
                            let videoP = document.createElement('p');
                            videoP.classList.add("card-footer-item");
                            let videoA = document.createElement('a');
                            videoA.classList.add("has-text-grey");
                            videoA.innerText = 'Youtube';
                            videoA.href = data.meals[0].strYoutube;
                            videoA.target = '_blank';
                            videoP.appendChild(videoA);
                            cardFooter.appendChild(videoP);
                        }
                        categoryColumns.appendChild(columnDiv);

                        instructionA.addEventListener('click', () => {
                            modalTitle.innerText = data.meals[0].strMeal;
                            modalInstruction.innerText = data.meals[0].strInstructions;
                            let ul = document.querySelector('#ingredientsText');
                            ul.innerHTML = '';
                            let i = 1;
                            while (data.meals[0][`strIngredient${i}`] && i <= 20) {
                                if (data.meals[0][`strIngredient${i}`].length > 1) {
                                    let li = document.createElement('li');
                                    let label = document.createElement('label');
                                    label.classList.add('checkbox');
                                    let input = document.createElement('input');
                                    input.type = 'checkbox';
                                    label.append(input);
                                    li.append(label);
                                    li.append(' ' + data.meals[0][`strMeasure${i}`] + ' ' + data.meals[0][`strIngredient${i}`] + ' ')
                                    ul.append(li);
                                }
                                i++;
                            }
                            modalStatus.classList.add('is-active');
                        })
                    })
            }
        })
})



const moiImg = document.querySelector('#moiImg')
const moiInstructions = document.querySelector('#moiInstructions')
const moiColumns = document.querySelector('#moiColumns')
const moiContainer = document.querySelector('#moiContainer')
const moiSection = document.querySelector('#mealOfInspiration')
let moiData = document.querySelector('#moiData');
const moiTitle = document.querySelector('#moiTitle')

fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        moiImg.src = data.meals[0].strMealThumb
        moiInstructions.innerText = data.meals[0].strInstructions;
        moiTitle.innerText = data.meals[0].strMeal
        let i = 1;
        let ul = document.createElement('ul')
        for (let meal of data.meals) {
            while (meal[`strIngredient${i}`] && i <= 20) {
                if (meal[`strIngredient${i}`].length > 1) {
                    let li = document.createElement('li');
                    let label = document.createElement('label');
                    label.classList.add('checkbox');
                    let input = document.createElement('input');
                    input.type = 'checkbox';
                    label.append(input);
                    li.append(label);
                     li.append(' ' + meal[`strMeasure${i}`] + ' ' + meal[`strIngredient${i}`] + ' ')
                     ul.append(li)
                     moiData.append(ul)
                }
                i++;
            }
        }
    })


// fetch('http://www.themealdb.com/api/json/v1/1/categories.php').then(response => response.json())
// .then(data => console.log(data))

// fetch('http://www.themealdb.com/api/json/v1/1/lookup.php?i=52965').then(response => response.json())
// .then(data => console.log(data))
//52965


//give instructions an ID of the meal ID(strMeal)
//iterate through the cards
//make the modals for them 
    //theyre all hidden
//looks for them one that has the ID
    //make them active



//grab p add an event listener for P
//p changes the content 
