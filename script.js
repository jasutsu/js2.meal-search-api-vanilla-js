const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

const getMealList = () => {
    const searchText = searchInput.value.trim();
    const filterUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
    console.log('Start Fetch');
    fetch(filterUrl)
        .then(response => response.json())
        .then(data => {
            mealList.innerHTML = "";
            const meals = data.meals;

            if (meals) {
                meals.forEach(meal => {
                    const mealItem = document.createElement('div');
                    mealItem.classList.add('meal-item');
                    mealItem.dataset.id = meal.idMeal;
                    mealItem.innerHTML = `
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    `;
                    mealList.appendChild(mealItem);
                });
                mealList.classList.remove('notFound');
            } else {
                mealList.innerHTML = "Sorry, we didn't find any meal";
                mealList.classList.add('notFound');
            }
            console.log('Finish Fetch');
        })
        .catch(error => console.error('Fetch Error: ', error));
};

const getMealRecipe = (e) => {
    e.preventDefault();
    updateMealRecipeDOM('dsf');
    if(e.target.classList.contains('recipe-btn')) {
        const mealItem = e.target.parentElement.parentElement;
        const lookupUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
        fetch(lookupUrl)
            .then(response => response.json())
            .then(data => updateMealRecipeDOM(data.meals[0]))
            .catch(error => console.log('Fetch Error: ', error));
    }
};

const updateMealRecipeDOM = (mealRecipe) => {
    mealDetailsContent.innerHTML = `
        <h2 class="recipe-title">${mealRecipe.strMeal}</h2>
        <p class="recipe-category">${mealRecipe.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${mealRecipe.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${mealRecipe.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${mealRecipe.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.parentElement.classList.add('showRecipe');
};

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});