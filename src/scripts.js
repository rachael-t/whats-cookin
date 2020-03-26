/* eslint-disable max-len */
/* eslint-disable indent */
const body = document.querySelector('body');
const recipeContainer = document.querySelector('.recipe-container');
const tagsContainer = document.querySelector('.category-container');
const mainPage = document.querySelector('.main-page');
const recipePage = document.querySelector('.recipe-page');
const searchInput = document.querySelector('.search-input');
let users = [];

window.addEventListener('load', pageLoad);
body.addEventListener('click', buttonClick);

function buttonClick(e) {
    // Find User and display Greeting

    // Filter my Favourite Recipes

    // Filter My recipes to Cook

    // Search all recipes
    if (e.target.closest('.search-all-btn')) {
      searchRecipes(e);
    }
    // Filter by tag, display recipes
    if (e.target.classList.contains('category-tag')) {
      filterByTag(e);
    }
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
        <li class="category-card category-tag" id="${tag}">
          <img src="../img/${getTagImg(tag)}.png" class="category-img category-tag" alt="recipe picture" id="${tag}">
          <p class="category-name category-tag">${tag}</p>
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
    <div class="instructions-list"></div>
    <img class="recipe-img" src="${fullRecipeInfo.image}" alt="recipe picture">
  `);
  displayRecipeIngredients(fullRecipeInfo);
  displayRecipeInstructions(fullRecipeInfo);
}

function displayRecipeIngredients(fullRecipeInfo) {
  let ingredientList = document.querySelector('.ingredients');
  fullRecipeInfo.ingredients.forEach(ingredient => {
    let ingredientName = getIngredientInfo(ingredient);
    ingredientList.insertAdjacentHTML('afterbegin', `
    <li class="ingredient">${ingredient.quantity.amount} ${ingredient.quantity.unit} ${ingredientName.name}</li>
    `)
  })
}

function getIngredientInfo(ingredient) {
  return ingredientsData.find(e => e.id === ingredient.id)
}

function displayRecipeInstructions(fullRecipeInfo) {
  let instructionList = document.querySelector('.instructions-list');
  fullRecipeInfo.instructions.forEach(instruction => {
    instructionList.insertAdjacentHTML('beforeBegin', `
    <p class="cooking-instructions">Step ${instruction.number}</p>
    <p>${instruction.instruction}</p>
    `)
  })
}

function returnToMainPage() {
  mainPage.classList.remove('hidden');
  recipePage.classList.add('hidden');
  recipePage.innerHTML = ' ';
}

function filterByTag(e) {
  let tagName = e.target.getAttribute('id');
  let filteredRecipes = recipeData.filter(recipe => recipe.tags.includes(tagName));
  recipeContainer.innerHTML = ' ';
  displayFilteredRecipe(filteredRecipes);
}

function searchRecipes(e) {
  let ingredientSearched = getIngredientId(searchInput.value)
  let filteredRecipes = recipeData.filter(recipe => recipe.ingredients.id === ingredientSearched);
  recipeContainer.innerHTML = ' ';
  console.log(filteredRecipes);
  displayFilteredRecipe(filteredRecipes);
}

function getIngredientId(searchInputName) {
  let ingredientObject = ingredientsData.find(e => e.name === searchInputName)
  return ingredientObject.id;
}

function displayFilteredRecipe(filteredRecipes) {
    filteredRecipes.forEach(recipe => {
    recipeContainer.insertAdjacentHTML('afterbegin', `
        <li class="recipe-card" id="${recipe.id}">
          <img src="${recipe.image}" class="card-img" alt="recipe picture" id="${recipe.id}">
          <p class="card-title" id="${recipe.id}">${recipe.name}</p>
          <div class="card-icons">
            <ion-icon name="heart-outline" class="card-icon"></ion-icon>
            <ion-icon name="checkmark-outline" class="card-icon"></ion-icon>
          </div>
        </li>
    `);
  });
}


//FOR RECIPES

// filterByTag(tag) {
//   //take in tag, loop through if that argument tag strictly matches a tag in the this.tags array, then return recipe
// }
// searchByIngredient(ingredient) {
//   //take input of ingredient and return all recipes that contain ingredient in this.ingredients (loop through this array)
// }

//
