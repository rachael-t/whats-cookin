if (typeof module !== 'undefined') {
  ingredientInfo = require('../data/ingredients');
}

class Pantry {
  constructor(userPantry) {
    this.ingredientsStocked = userPantry;
  }

  checkIngredients(recipe) {
    //invoked under user.cookRecipe() to check if user has enought to cook meal
    //return boolean
    //if false - invoke checkAmountNeeded()
    const pantrySupplies = this.ingredientsStocked;
    console.log('pantry:', pantrySupplies);
    //the pantry is an array of objects (ingredient ID is number)
    console.log('recipe:', recipe.ingredients);
    //recipe.ingredients is an array of objects with a nested objects
    //need to make new array of ingredientsNeeded
    //this will be an array of objects for each ingredient and have the recipe.ingredients.id and recipe.ingredients.quantity.amount as the properties
    const recipeIngredientsNeeded = recipe.ingredients.map(ingredient => {
      const ingredientInfo = {};
      ingredientInfo.id = ingredient.id;
      ingredientInfo.amount = ingredient.quantity.amount;
      return ingredientInfo;
    });
    console.log(recipeIngredientsNeeded);
    //then we need to compare the what we have (pantry) AGAINST what we need (the new array)
    var result; recipeIngredientsNeeded.forEach(ingredient => {
      return pantrySupplies.forEach(item => {
        if(ingredient.id === item.ingredient){
          if(item.amount >= ingredient.amount){
            result = true;
          } result = false;
        }
      })
    });
    console.log('result:', result)
    return result;
    //return true or false but needs to return a boolean
  }
  checkAmountNeeded() {
    //loop through pantry and recipe and return difference of what they have vs needed
  }
  removeIngredients() {
    //removes ingredient and amount from the user's pantry based on the recipe cooked
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
