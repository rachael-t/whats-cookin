/* eslint-disable max-len */
/* eslint-disable indent */
const body = document.querySelector('body');
const recipeContainer = document.querySelector('.recipe-container');
const tagsContainer = document.querySelector('.category-container');
const mainPage = document.querySelector('.main-page');
const recipePage = document.querySelector('.recipe-page');
let users = [];

window.addEventListener('load', pageLoad);
body.addEventListener('click', buttonClick);

function buttonClick(e) {
    // Find User and display Greeting

    // Filter my Favourite Recipes

    // Filter My recipes to Cook

    // Search all recipes

    // Filter by tag, display recipes

    // Open one recipe
    if (e.target.classList.contains('card-img') || e.target.classList.contains('card-title')) {
        openRecipe(e);
    };
    // Come back to main 

    // Add to My Favourite (heart)

    // Add to cook (checkmark)

}

function pageLoad() {
    getRecipe(recipeData);
    // populate global users array
    // populateUsers();
    getTags(recipeData);
}

function getRecipe(recipeData) {
    recipeData.map(recipe => {
        let recipeCard = new Recipes(recipe.id, recipe.image, recipe.ingredients, recipe.intructions, recipe.name, recipe.tags)
        displayRecipe(recipeCard);
    })
}

function displayRecipe(recipeCard) {
    debugger
    recipeContainer.insertAdjacentHTML('afterbegin', `
        <li class="recipe-card" id="${recipeCard.id}">
          <img src="${recipeCard.image}" class="card-img" alt="recipe picture" id="${recipeCard.id}">
          <p class="card-title" id="${recipeCard.id}">${recipeCard.name}</p>
          <div class="card-icons">
            <ion-icon name="heart-outline" class="card-icon"></ion-icon>
            <ion-icon name="checkmark-outline" class="card-icon"></ion-icon>
          </div>
        </li>
    `);
}

function getTags(recipeData) {
    let uniqueTags = [];
    recipeData.map(recipe => {
        recipe.tags.map(tag => !uniqueTags.includes(tag) && uniqueTags.push(tag));
    })
    displayTags(uniqueTags);
}

function displayTags(uniqueTags) {
    uniqueTags.map(tag => {
        tagsContainer.insertAdjacentHTML('afterbegin', `
        <li class="category-card" id="${tag}">
          <img src="../img/${getTagImg(tag)}.png" class="category-img" alt="recipe picture" id="${tag}">
          <p class="category-name">${tag}</p>
        </li>
        `)
    })
}

function getTagImg(tag) {
    let imgName = tag.slice(0, 4);
    return imgName;
}

function openRecipe(e) {
    mainPage.classList.add('hidden');
    recipePage.classList.remove('hidden');
    displayOpenedRecipe(e)
}

function displayOpenedRecipe(e) {

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

//