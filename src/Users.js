class Users {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry || [];
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  modifyFavoriteRecipes(recipe) {
    console.log(this.favoriteRecipes);
    if (this.favoriteRecipes.length === 0) {
      this.favoriteRecipes.push(recipe)
    };
    this.favoriteRecipes.forEach(element => {
      if (!element.id === recipe.id) {
        this.favoriteRecipes.push(recipe);
      } else {
        const index = this.favoriteRecipes.indexOf(recipe);
        this.favoriteRecipes.splice(index, 1);
      }
    });

    console.log(this.favoriteRecipes);
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
    //go to recipeData - search for recipe with matching ID in array

    return recipesArray.filter(recipe => recipe === tag);
  }

  searchRecipes(recipesArray, input) {
    return recipesArray.filter(recipe => recipe.includes(input));
  }

  cookRecipe(recipe) {
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
