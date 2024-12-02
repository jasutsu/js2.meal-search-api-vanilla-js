const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


const getMealList = () => {
    const searchText = searchInput.value.trim();
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => data.meals)
        .catch(error => console.error('Fetch Error: ', error));

        // idMeal
        // : 
        // "52940"
        // strMeal
        // : 
        // "Brown Stew Chicken"
        // strMealThumb
        
};

const getMealRecipe = () => {

};


searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});