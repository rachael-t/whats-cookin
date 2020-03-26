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
    if (e.target.classList.contains('return-btn')) {
        returnToMainPage();
    }
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
    recipeContainer.insertAdjacentHTML('afterbegin', `
        <li class="recipe-card" id="${recipeCard.id}">
          <img src="${recipeCard.image}" class="card-img" alt="recipe picture" id="${recipeCard.id}">
          <p class="card-title" id="${recipeCard.id}">${recipeCard.name}</divclass="card-title"<p>
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
    getRecipeInfo(e);
}

function getRecipeInfo(e) {
    let recipeId = parseInt(e.target.getAttribute('id'));
    let fullRecipeInfo = recipeData.find(recipe => recipe.id === recipeId);
    displayFullRecipe(fullRecipeInfo);
}

function displayFullRecipe(fullRecipeInfo) {
    recipePage.insertAdjacentHTML('beforeend', `
    <button type="button" name="button" class="return-btn"><ion-icon name="close-outline" class="return-btn"></ion-icon></button>
    <h2 class="recipe-title">${fullRecipeInfo.name}</h2>
    <div class="recipe-icons">
      <ion-icon name="heart-outline" class="recipe-icon" id="${fullRecipeInfo.id}"></ion-icon>
      <ion-icon name="checkmark-outline" class="recipe-icon" id="${fullRecipeInfo.id}"></ion-icon>
    </div>
    <h3>Ingredients:</h3>
    <ul class="ingredients">
    </ul>
    <p class="recipe-cost"></p>
    <div class="instructions-list"></div>
    <img class="recipe-img" src="${fullRecipeInfo.image}" alt="recipe picture">
    <button type="button" name="button" class="return-btn"><ion-icon name="close-outline" class="return-btn"></ion-icon></button>
  `);
    displayRecipeIngredients(fullRecipeInfo);
    displayRecipeInstructions(fullRecipeInfo);
}

function displayRecipeIngredients(fullRecipeInfo) {
    let ingredientList = document.querySelector('.ingredients');
    let recipeCost = [];
    fullRecipeInfo.ingredients.forEach(ingredient => {
        let ingredientName = getIngredientInfo(ingredient);
        let ingredientAmount = getIngredientAmount(ingredient);
        let ingredientPrice = getIngredientPrice(ingredientName);
        let ingredientCost = getIngredientCost(ingredient, ingredientName);
        recipeCost.push(ingredientCost);
        ingredientList.insertAdjacentHTML('afterbegin', `
    <li class="ingredient">
        <p class="ingredient-name">${ingredientAmount} ${ingredient.quantity.unit}
        <span class="ingredient-item">${ingredientName.name}</span></p>
        <p class="ingredient-cost">${ingredientPrice}$/unit</p>
        <p class="ingredient-cost">Total cost: ${ingredientCost}$</p>
    </li>
    `)
    })
    getRecipeCost(recipeCost);
}

function getIngredientInfo(ingredient) {
    return ingredientsData.find(e => e.id === ingredient.id)
}

function getIngredientAmount(ingredient) {
    return Math.round(ingredient.quantity.amount * 100) / 100;
}

function getIngredientPrice(ingredientName) {
    return (ingredientName.estimatedCostInCents) / 100;
}

function getIngredientCost(ingredient, ingredientName) {
    return (ingredientName.estimatedCostInCents * ingredient.quantity.amount) / 100;
}

function getRecipeCost(recipeCost) {
    const totalRecipeCost = recipeCost.reduce((a, b) => a + b, 0);
    const finalRecipeCost = Math.round(totalRecipeCost * 100) / 100;
    displayRecipeCost(finalRecipeCost);
}

function displayRecipeCost(finalRecipeCost) {
    const costContainer = document.querySelector('.recipe-cost');
    costContainer.innerHTML = `Total Recipe Cost: ${finalRecipeCost} $`;
}

function displayRecipeInstructions(fullRecipeInfo) {
    let instructionList = document.querySelector('.instructions-list');
    fullRecipeInfo.instructions.forEach(instruction => {
        instructionList.insertAdjacentHTML('beforeBegin', `
    <p class="cooking-step">Step ${instruction.number}</p>
    <p class="cooking-instruction">${instruction.instruction}</p>
    `)
    })
}

function returnToMainPage() {
    mainPage.classList.remove('hidden');
    recipePage.classList.add('hidden');
    recipePage.innerHTML = ' ';
}

//FOR RECIPES

// filterByTag(tag) {
//   //take in tag, loop through if that argument tag strictly matches a tag in the this.tags array, then return recipe
// }
// searchByIngredient(ingredient) {
//   //take input of ingredient and return all recipes that contain ingredient in this.ingredients (loop through this array)
// }

//