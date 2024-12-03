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
        .catch(error => console.error("Fetch Error: ", error));

};

searchForm.addEventListener('submit', getMealList);