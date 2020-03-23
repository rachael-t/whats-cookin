class Pantry {
  constructor (ingredient, amount) {
    this.ingredient = ingredient;
    this.amount = amount;
  }
  checkIngredients() {
    //invoked under users.cookRecipe() to check if user has enought to cook meal
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
