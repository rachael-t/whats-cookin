class Users {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry || [];
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  modifyFavoriteRecipes(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    } else {
      const index = this.favoriteRecipes.indexOf(recipe);
      this.favoriteRecipes.splice(index, 1);
    }
  }

  modifyRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    } else {
      const index = this.recipesToCook.indexOf(recipe);
      this.recipesToCook.splice(index, 1);
    }
  }
  filterRecipes(recipesArray, tag) {
    return recipesArray.filter(recipe => recipe === tag);
  }

  searchRecipes(recipesArray, input) {
    return recipesArray.filter(recipe => recipe.includes(input));
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