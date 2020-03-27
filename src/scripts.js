const body = document.querySelector('body');
const recipeContainer = document.querySelector('.recipe-container');
const tagsContainer = document.querySelector('.category-container');
const mainPage = document.querySelector('.main-page');
const recipePage = document.querySelector('.recipe-page');
const searchInput = document.querySelector('.search-input');
const loginInput = document.querySelector('.login-input');

let user = null;

window.addEventListener('load', pageLoad);
body.addEventListener('click', buttonClick);

function buttonClick(e) {
  // Search all recipes
  if (e.target.closest('.search-all-btn')) {
    searchRecipes(e);
  }
  // Filter by tag, display recipes
  if (e.target.closest('.category-tag')) {
    filterByTag(e);
  }
  // Open one recipe
  if (e.target.closest('.card-img') || e.target.closest('.card-title')) {
    openRecipe(e);
  };
  // Come back to main
  if (e.target.closest('.return-btn')) {
    returnToMainPage();
  }
  // Find User and display Greeting
  if (e.target.closest('.login-btn')) {
    findUser();
  }
  // Add to My Favourite (heart)
  if (e.target.closest('.card-icon-favorite') || e.target.closest('.recipe-icon-favorite')) {
    modifyFavorite(e);
    displayFavorite(e);
  }
  // Add to cook (checkmark)
  if (e.target.closest('.card-icon-cook') || e.target.closest('.recipe-icon-cook')) {
    modifyToCook(e);
    displayToCook(e);
  }
  // Filter my Favourite Recipes
  if (e.target.closest('.favorite-recipes-btn')) {
    filterSaved('favoriteRecipes');
  }
  // Filter My recipes to Cook
  if (e.target.closest('.cook-recipes-btn')) {
    filterSaved('recipesToCook');
  }
}

function pageLoad() {
  recipePage.innerHTML = ' ';
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
            <ion-icon name="heart-outline" class="card-icon-favorite" id="${recipeCard.id}"></ion-icon>
            <ion-icon name="checkmark-outline" class="card-icon-cook" id="${recipeCard.id}"></ion-icon>
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
          <p class="category-name category-tag" id="${tag}">${tag}</p>
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
      <ion-icon name="heart-outline" class="recipe-icon-favorite" id="${fullRecipeInfo.id}"></ion-icon>
      <ion-icon name="checkmark-outline" class="recipe-icon-cook" id="${fullRecipeInfo.id}"></ion-icon>
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

function filterByTag(e) {
  let tagName = e.target.getAttribute('id');
  let filteredRecipes = recipeData.filter(recipe => recipe.tags.includes(tagName));
  debugger
  recipeContainer.innerHTML = ' ';
  displayFilteredRecipe(filteredRecipes);
}

function searchRecipes(e) {
  let ingredientSearched = getIngredientId(searchInput.value)
  let filteredRecipes = [];
  recipeData.filter(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.id === ingredientSearched) {
        filteredRecipes.push(recipe)
      }
    })
  });
  recipeContainer.innerHTML = ' ';
  displayFilteredRecipe(filteredRecipes);
}

function getIngredientId(searchInputName) {
  let ingredientObject = ingredientsData.find(e => e.name === searchInputName);
  return ingredientObject.id;
}

function displayFilteredRecipe(filteredRecipes) {
  filteredRecipes.forEach(recipe => displayRecipe(recipe));
}


function findUser() {
  const newUser = usersData.find(user => user.name.toLowerCase().includes(loginInput.value.toLowerCase()));
  user = new Users(newUser.id, newUser.name, newUser.pantry);
  !user ? alert('user not found') : alert(`welcome back ${user.name}`);
}

function modifyFavorite(e) {
  user ? user.modifyFavoriteRecipes(e.target.getAttribute('id')) : alert('Please Log In!');
}

function displayFavorite(e) {
  user && e.target.classList.toggle('selected');
}

function modifyToCook(e) {
  user ? user.modifyRecipesToCook(e.target.getAttribute('id')) : alert('Please Log In!');
}

function displayToCook(e) {
  user && e.target.classList.toggle('selected');
  console.log(user);
}

function filterSaved(type) {
  recipeContainer.innerHTML = ' ';
  user && user[type].forEach(recipeId => {
    let foundRecipe = recipeData.find(recipe => {
      recipe.id == recipeId && displayRecipe(recipe);
    });
  })
}





// function checkIfFavorite(recipe) {
//   // get current user data ( global)
//   // check it this recipe is
//   // if it's favorite - return 'favorite'
//   // if it's not - return
// }