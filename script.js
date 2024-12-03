const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const mealList = document.getElementById('meal');
const searchInput = document.getElementById('search-input');
const searchForm = document.querySelector('.meal-search-box');

const filterUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const lookupUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getMealList = (e) => {
    e.preventDefault();
    
    const searchText = searchInput.value.trim();
    if(searchText.length == 0) {
        return;
    }
    
    fetch(filterUrl+searchText)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            let markUp = "";
            if(meals) {
                meals.forEach(meal => {
                    markUp += `
                    <div class = "meal-item" data-id="${meal.idMeal}">
                      <div class = "meal-img">
                        <img src = "${meal.strMealThumb}" alt = "food">
                      </div>
                      <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href = "#" class = "recipe-btn">Get Recipe</a>
                      </div>
                    </div>
                    `;
                });
                mealList.classList.remove('notFound');
            } else {
                markUp = "Sorry we didn't find any meal";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = markUp;
        })
        .catch(error => console.error("Meal List Fetch Error: ", error));

};

const getMealRecipe = (e) => {
    e.preventDefault();
    const selectedElement = e.target;
    if(selectedElement.classList.contains('recipe-btn')){
        const mealId = selectedElement.parentElement.parentElement.dataset.id;
        fetch(lookupUrl + mealId)
            .then(response => response.json())
            .then(data => {
                const mealRecipe = data.meals[0];
                mealDetailsContent.innerHTML = `
                    <h2 class = "recipe-title">${mealRecipe.strMeal}</h2>
                    <p class = "recipe-category">${mealRecipe.strCategory}</p>
                    <div class = "recipe-instruct">
                        <h3>Instructions:</h3>
                        <p">${mealRecipe.strInstructions}</p>
                    </div>
                    <div class = "recipe-meal-img">
                        <img src = "${mealRecipe.strMealThumb}" alt = "">
                    </div>
                    <div class = "recipe-link">
                        <a href = "${mealRecipe.strYoutube}" target = "_blank">Watch Video</a>
                    </div>
                `;
                mealDetailsContent.parentElement.classList.add('showRecipe');
            })
            .catch(error => console.error("Meal Recipe Fetch Error: ", error));
    }
};

searchForm.addEventListener('submit', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});