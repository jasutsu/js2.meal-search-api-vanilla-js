const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

const getMealList = () => {
    const searchText = searchInput.value.trim();
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
    console.log('Start Fetch');
    fetch(url)
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

const getMealRecipe = () => {

};


searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});