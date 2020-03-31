const body = document.querySelector('body');
const recipeContainer = document.querySelector('.recipe-container');
const tagsContainer = document.querySelector('.category-container');
const mainPage = document.querySelector('.main-page');
const recipePage = document.querySelector('.recipe-page');
const filterFavoriteBtn = document.querySelector('.favorite-recipes-btn');
const filterToCookBtn = document.querySelector('.cook-recipes-btn');
const searchUserBtn = document.querySelector('.search-user-btn');
const searchInput = document.querySelector('.search-input');
const searchUserInput = document.querySelector('.search-user-input');
const loginInput = document.querySelector('.login-input');
const welcomeMessage = document.querySelector('.welcome-message');
const returnBtnContainer = document.querySelector('.return-btn-container');
const returnBtnBottomContainer = document.querySelector('.return-btn-bottom-container');

let user = null;
let pantry = null;

window.addEventListener('load', pageLoad);
body.addEventListener('click', buttonClick);
body.addEventListener('click', buttonStatus);

function buttonClick(e) {
  if (e.target.closest('.search-all-btn')) {
    searchAllRecipes(e);
    clearInput(searchInput);
  }

  if (e.target.closest('.search-user-btn')) {
    displaySearchedSavedRecipes(searchUserInput)
    clearInput(searchUserInput);
  }

  if (e.target.closest('.category-tag')) {
    filterByTag(e);
    removeReturnBtn();
    displayReturnBtn();
  }

  if (e.target.closest('.card-img') || e.target.closest('.card-title')) {
    openRecipe(e);
  }

  if (e.target.closest('.return-btn')) {
    returnToMainPage();
    removeReturnBtn();
    getRecipe(recipeData);
    displayMessage();
  }

  if (e.target.closest('.login-btn')) {
    findUser();
    displayMessage();
    clearInput(loginInput);
  }

  if (e.target.closest('.card-icon-favorite') || e.target.closest('.recipe-icon-favorite')) {
    modifyRecipes(e, 'favoriteRecipes');
    selectRecipe(e);
  }

  if (e.target.closest('.card-icon-cook') || e.target.closest('.recipe-icon-cook')) {
    modifyRecipes(e, 'recipesToCook');
    selectRecipe(e);
  }

  if (e.target.closest('.favorite-recipes-btn')) {
    removeReturnBtn();
    displayReturnBtn();
    displayMessage(e);
    filterSaved('favoriteRecipes');
  }

  if (e.target.closest('.cook-recipes-btn')) {
    removeReturnBtn();
    displayReturnBtn();
    displayMessage(e);
    filterSaved('recipesToCook');
  }

  if (e.target.closest('.cook-now-btn')) {
    checkAbleToCook(e);
  }
}

function buttonStatus() {
  if (user) {
    filterFavoriteBtn.removeAttribute('disabled', 'disabled');
    filterToCookBtn.removeAttribute('disabled', 'disabled');
    searchUserBtn.removeAttribute('disabled', 'disabled');
  } else {
    filterFavoriteBtn.setAttribute('disabled', 'disabled');
    filterToCookBtn.setAttribute('disabled', 'disabled');
    searchUserBtn.setAttribute('disabled', 'disabled');
  }
}

function clearInput(input) {
  input.value = '';
};

function pageLoad() {
  recipePage.innerHTML = ' ';
  buttonStatus();
  displayMessage();
  getRecipe(recipeData);
  getTags(recipeData);
}

function displayMessage(e) {
  welcomeMessage.innerHTML = ' ';
  user ? welcomeMessage.innerHTML = `Welcome Back ${user.name}! Select Your Favorite Recipe!` : welcomeMessage.innerHTML = `Log In and Select Your Favorite Recipe!`;
  e && (welcomeMessage.innerHTML = `${user.name} / ${checkFavoriteOrToCook(e)}`);
}

function checkFavoriteOrToCook(e) {
  if (e.target.classList.contains('favorite-recipes-btn')) {
    return 'My Favorite Recipes';
  }
  if (e.target.classList.contains('cook-recipes-btn')) {
    return 'My Recipes To Cook';
  }
}

function getRecipe(recipeData) {
  recipeData.map(r => {
    let recipe = new Recipe(r.id, r.image, r.ingredients, r.intructions, r.name, r.tags)
    displayRecipe(recipe);
  })
}

function displayRecipe(recipe) {
  let favorite = checkSelected(recipe, 'favoriteRecipes');
  let toCook = checkSelected(recipe, 'recipesToCook');
  recipeContainer.insertAdjacentHTML('afterbegin', `
        <li class="recipe-card" id="${recipe.id}">
          <img src="${recipe.image}" class="card-img" alt="recipe picture" id="${recipe.id}">
          <p class="card-title" id="${recipe.id}">${recipe.name}</divclass="card-title"<p>
          <div class="card-icons">
            <ion-icon name="heart-outline" class="card-icon-favorite ${favorite}" id="${recipe.id}"></ion-icon>
            <ion-icon name="checkmark-outline" class="card-icon-cook ${toCook}" id="${recipe.id}"></ion-icon>
          </div>
        </li>
    `);
}

function checkSelected(recipe, type) {
  return (user && (user[type].find(favorite => favorite.id === recipe.id) && 'selected'));
}

function getTags(recipeData) {
  let tags = [];
  recipeData.map(recipe => {
    recipe.tags.map(tag => !tags.includes(tag) && tags.push(tag));
  })
  displayTags(tags);
}

function displayTags(tags) {
  tags.map(tag => {
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
  findRecipe(e);
}

function findRecipe(e) {
  let recipeId = parseInt(e.target.getAttribute('id'));
  let recipe = recipeData.find(recipe => recipe.id === recipeId);
  displayFullRecipe(recipe);
}

function displayFullRecipe(recipe) {
  displayRecipeInfo(recipe);
  displayRecipeIngredients(recipe);
  displayRecipeInstructions(recipe);
  displayRecipeCost(recipe);
}

function displayRecipeInfo(recipe) {
  let favorite = checkSelected(recipe, 'favoriteRecipes');
  let toCook = checkSelected(recipe, 'recipesToCook');
  recipePage.insertAdjacentHTML('beforeend', `
    <button type="button" name="button" class="return-btn"><ion-icon name="close-outline" class="return-btn"></ion-icon></button>
    <h2 class="recipe-title">${recipe.name}</h2>
    <button type="button" name="button" class="cook-now-btn" id="${recipe.id}">Cook Now!</button>
    <div class="cook-status"></div>
    <div class="recipe-icons">
      <ion-icon name="heart-outline" class="recipe-icon-favorite ${favorite}" id="${recipe.id}"></ion-icon>
      <ion-icon name="checkmark-outline" class="recipe-icon-cook ${toCook}" id="${recipe.id}"></ion-icon>
    </div>
    <h3>Ingredients:</h3>
    <ul class="ingredients">
    </ul>
    <p class="recipe-cost"></p>
    <div class="instructions-list"></div>
    <img class="recipe-img" src="${recipe.image}" alt="recipe picture">
    <button type="button" name="button" class="return-btn"><ion-icon name="close-outline" class="return-btn"></ion-icon></button>
  `);
}

function displayRecipeIngredients(recipe) {
  recipe.ingredients.forEach(ingredient => {
    let ingredientName = getIngredientInfo(ingredient);
    let ingredientAmount = getIngredientAmount(ingredient);
    let ingredientPrice = getIngredientPrice(ingredientName);
    let ingredientCost = getIngredientCost(ingredient, ingredientName);
    let ingredientList = document.querySelector('.ingredients');
    ingredientList.insertAdjacentHTML('afterbegin', `
    <li class="ingredient">
        <p class="ingredient-name">${ingredientAmount} ${ingredient.quantity.unit}
        <span class="ingredient-item">${ingredientName.name}</span></p>
        <p class="ingredient-cost">$ ${ingredientPrice} / unit</p>
        <p class="ingredient-cost">Total cost: $ ${ingredientCost}</p>
    </li>
    `)
  })
}

function getIngredientInfo(ingredient) {
  return ingredientsData.find(e => e.id === ingredient.id)
}

function getIngredientAmount(ingredient) {
  return Math.round(ingredient.quantity.amount * 100) / 100;
}

function getIngredientPrice(ingredientName) {
  return ((ingredientName.estimatedCostInCents) / 100).toFixed(2);
}

function getIngredientCost(ingredient, ingredientName) {
  return ((ingredientName.estimatedCostInCents * ingredient.quantity.amount) / 100).toFixed(2);
}

function displayRecipeCost(recipe) {
  let cost = getRecipeCost(recipe)
  const costContainer = document.querySelector('.recipe-cost');
  costContainer.innerHTML = `Total Recipe Cost: $ ${cost}`;
}

function getRecipeCost(r) {
  let recipe = new Recipe(r.id, r.image, r.ingredients, r.instructions, r.name, r.tags);
  return recipe.calculateCost();
}

function displayRecipeInstructions(recipe) {
  let instructionList = document.querySelector('.instructions-list');
  recipe.instructions.forEach(instruction => {
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

function removeReturnBtn() {
  returnBtnContainer.innerHTML = ' ';
  returnBtnBottomContainer.innerHTML = ' ';
}

function displayReturnBtn() {
  returnBtnContainer.insertAdjacentHTML('afterbegin', `
  <button type="button" name="button" class="return-btn"><ion-icon name="close-outline" class="return-btn"></ion-icon></button>
  `);
  returnBtnBottomContainer.insertAdjacentHTML('afterbegin', `
  <button type="button" name="button" class="return-btn"><ion-icon name="close-outline" class="return-btn"></ion-icon></button>
  `);
}

function filterByTag(e) {
  let tagName = e.target.getAttribute('id');
  let filteredRecipes = recipeData.filter(recipe => recipe.tags.includes(tagName));
  recipeContainer.innerHTML = ' ';
  welcomeMessage.innerHTML = `${tagName}`;
  displayFilteredRecipe(filteredRecipes);
}

function searchAllRecipes(e) {
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
  let ingredientObject = ingredientsData.find(ingredient => ingredient.name.includes(searchInputName));
  displayIngredientMessage(ingredientObject);
  return ingredientObject.id;
}

function displayFilteredRecipe(filteredRecipes) {
  filteredRecipes.forEach(recipe => displayRecipe(recipe));
  removeReturnBtn();
  displayReturnBtn();
}

function displayIngredientMessage(ingredient) {
  ingredient && (welcomeMessage.innerHTML = `Searched by Ingredient: ${ingredient.name}`);
}

function findUser() {
  const u = usersData.find(user => user.name.toLowerCase().includes(loginInput.value.toLowerCase()));
  u && (user = new User(u.id, u.name, u.pantry));
  debugger;
  u && (pantry = new Pantry(user.pantry));
  !user ? alert('user not found') : alert(`welcome back ${user.name}`);
}

function modifyRecipes(e, category) {
  const r = recipeData.find(recipe => recipe.id === parseInt(e.target.getAttribute('id')));
  const recipe = new Recipe(r.id, r.image, r.ingredients, r.instructions, r.name, r.tags);
  user ? user.modifyRecipes(recipe, category) : alert('Please Log In!');
}

function selectRecipe(e) {
  user && e.target.classList.toggle('selected');
}

function filterSaved(type) {
  recipeContainer.innerHTML = ' ';
  user && user[type].forEach(recipeObj => {
    recipeData.find(recipe => {
      recipe.id === recipeObj.id && displayRecipe(recipe);
    });
  })
}

function displaySearchedSavedRecipes(searchUserInput) {
  return user.searchRecipes(searchUserInput.value)
}

function checkAbleToCook(e) {
  if (user) {
    let recipeId = parseInt(e.target.getAttribute('id'));
    let status = checkToCookStatus(recipeId);
    status ? getCookInfo(recipeId) : alert('Add to Cook List First');
  } else {
    alert('Please Log In!')
  }
}

function checkToCookStatus(recipeId) {
  return user.recipesToCook.some(recipe => recipe.id === recipeId);
}

function getCookInfo(recipeId) {
  let ingredients = user.checkRecipeToCook(recipeId);
  ingredients === 'cook' ? displayReady() : getMissing(ingredients);
}

function displayReady() {
  document.querySelector('.cook-now-btn').classList.add('hidden');
  document.querySelector('.recipe-icon-cook').classList.remove('selected');
  document.querySelector('.cook-status').innerHTML = `<p class="cook-message">You have all ingredients needed! Bon Appétit!</p>`;
};

function getMissing(ingredients) {
  displayMissing()
  getMissingIngredient(ingredients);
}

function displayMissing() {
  document.querySelector('.cook-now-btn').classList.add('hidden');
  let statusContainer = document.querySelector('.cook-status');
  statusContainer.insertAdjacentHTML('afterbegin', `
    <p class="cook-message">List of missing ingredients:</p>
    <ul class="missing-ingredients">
    </ul>
  `);
}

function getMissingIngredient(ingredients) {
  ingredients.forEach(ingredient => {
    ingredientsData.find(data => {
      if (data.id === ingredient.id) {
        ingredient.name = data.name;
        displayMissingIngredient(ingredient)
      }
    })
  })
}

function displayMissingIngredient(ingredient) {
  let ingredientsContainer = document.querySelector('.missing-ingredients');
  ingredientsContainer.insertAdjacentHTML('afterbegin', `
  <li class="ingredient">
        <p class="ingredient-name">${ingredient.amount} ${ingredient.unit} <span class="ingredient-item"> ${ingredient.name}</span></p>
    </li>
  `);
}