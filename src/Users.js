class Users {
  constructor (id, name) {
    this.id = id;
    this.name = name;
    this.pantry = [];
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  modifyFavoriteRecipes() {
    //add or remove to this.favoriteRecipes array
  }
  addRecipeToCook() {
    //add selected recipe to this.recipesToCook array
  }
  filterRecipes() {
    //take in two arguments - one for which list (this.favoriteRecipes or this.recipesToCook) and another for type.
    //return results in selected array that match that type
  }
  searchRecipes() {
    //take in two arguments - one for which list (this.favoriteRecipes or this.recipesToCook) and another for user input (name or ingredient).
    //return results in selected array that match that user input
  }
  cookRecipe() {
    //check if you have the ingredients in this.pantry
    //invoke pantry.checkIngredients()
    //if that returns true
      //then pantry.removeIngredients()
    //if that returns false, show list of what you need to buy (invoke pantry.checkAmountNeeded())
  }
}

if (typeof module !== 'undefined') {
  module.exports = Users;
}
