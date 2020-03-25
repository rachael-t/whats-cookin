const body = document.querySelector('body');
const recipeContainer = document.querySelector('.recipe-container');
let users = [];

window.addEventListener('load', pageLoad);

function pageLoad() {
    getRecipe(recipeData);
    // populate global users array
    // populateUsers();
}

function getRecipe(recipeData) {
    recipeData.map(recipe => {
        let recipeCard = new Recipes(recipe.id, recipe.image, recipe.ingredients, recipe.intructions, recipe.name, recipe.tags)
        displayRecipe(recipeCard);
    })
}

function displayRecipe(recipeCard) {
    recipeContainer.insertAdjacentHTML('afterbegin', `
        <li class="recipe-card">
          <img src="${recipeCard.image}" class="card-img" alt="recipe picture">
          <p class="card-title">${recipeCard.name}</p>
          <div class="card-icons">
            <ion-icon name="heart-outline" class="card-icon"></ion-icon>
            <ion-icon name="checkmark-outline" class="card-icon"></ion-icon>
          </div>
        </li>
    `);
}




//FOR RECIPES
// getInstructions() {
//   //returning the instruction array when invoked
//   //don't use this method - just use recipes.instructions
// }
// filterByTag(tag) {
//   //take in tag, loop through if that argument tag strictly matches a tag in the this.tags array, then return recipe
// }
// searchByIngredient(ingredient) {
//   //take input of ingredient and return all recipes that contain ingredient in this.ingredients (loop through this array)
// }