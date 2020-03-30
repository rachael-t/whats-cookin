if (typeof module !== 'undefined') {
  var ingredientInfo = require('../data/ingredients');
}

class Pantry {
  constructor(userPantry) {
    this.ingredientsStocked = userPantry;
  }

  checkIngredients() {
    //invoked under user.cookRecipe() to check if user has enought to cook meal
    //return boolean
    //if false - invoke checkAmountNeeded()
    return true;
    //checkIngredients should take an argument of recipe, which will be whatever 
    //recipe the user has clicked the 'cook now' button on. that ID will be passed to the user.cookRecipe and cookRecipe will pull it's corresponding recipe object to pass through pantry.checkIngredients({recipe})
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