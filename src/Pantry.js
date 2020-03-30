if (typeof module !== 'undefined') {
  ingredientInfo = require('../data/ingredients');
}

class Pantry {
  constructor(userPantry) {
    this.ingredientsStocked = userPantry;
    this.recipeIngredientsNeeded = null;
  }

  checkIngredients(recipe) {
    const pantrySupplies = this.ingredientsStocked;
    this.recipeIngredientsNeeded = recipe.ingredients.map(ingredient => {
      const ingredientInfo = {};
      ingredientInfo.id = ingredient.id;
      ingredientInfo.amount = ingredient.quantity.amount;
      return ingredientInfo;
    });
    let result;
    this.recipeIngredientsNeeded.forEach(ingredient => {
      return pantrySupplies.forEach(item => {
        if (ingredient.id === item.ingredient) {
          if (item.amount >= ingredient.amount) {
            result = true;
          } else {
            result = false;
          }
        }
      })
    });
    return result;
  }
  
  checkAmountNeeded() {
    const ingredientsToBuy = [];
    const needed = this.recipeIngredientsNeeded;
    const pantrySupplies = this.ingredientsStocked;
    needed.forEach(ingredient => {
      return pantrySupplies.map(item => {
        if (ingredient.id === item.ingredient && ingredient.amount > item.amount) {
          const ingredientInfo = {};
          ingredientInfo.id = ingredient.id;
          ingredientInfo.amount = ingredient.amount - item.amount;
          ingredientsToBuy.push(ingredientInfo);
        }
      })
    })
    return ingredientsToBuy;
  }

  removeIngredients() {
    const used = this.recipeIngredientsNeeded;
    const pantry = this.ingredientsStocked;
    pantry.forEach(item =>
      used.forEach(ingredient => {
        if (ingredient.id === item.ingredient) {
          item.amount -= ingredient.amount
          if (item.amount === 0) {
            let index = pantry.indexOf(item)
            pantry.splice(index, 1)
          }
        }
      }))
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
