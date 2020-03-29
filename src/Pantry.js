// if (typeof module !== 'undefined') {
//   var ingredientInfo = require('../data/ingredients');
// }

class Pantry {
  constructor(ingredientInfo, amount) {
    this.ingredient = ingredientInfo;
    this.amount = amount;
  }
  checkIngredients() {
    //invoked under user.cookRecipe() to check if user has enought to cook meal
    //return boolean
    //if false - invoke checkAmountNeeded()

  }
  checkAmountNeeded() {
    //loop through user.pantry and user.recipe(?) and return difference of what they have vs needed
  }
  removeIngredients() {
    //removes ingredient and amount from recipe cooked
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
