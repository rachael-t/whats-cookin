class Users {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry || [];
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  modifyFavoriteRecipes(recipe) {
      if (this.favoriteRecipes.length === 0) {
        this.favoriteRecipes.push(recipe);
      } else if (this.favoriteRecipes.length > 0) {
        let index = this.favoriteRecipes.findIndex(el => el.id == recipe.id);
        if (index === -1) {
          this.favoriteRecipes.push(recipe);
        } else {
          this.favoriteRecipes.splice(index, 1);
        }
      }
    }

  modifyRecipesToCook(recipe) {
    if (this.recipesToCook.length === 0) {
      this.recipesToCook.push(recipe)
    } else {
      this.recipesToCook.forEach(element => {
        if (!element.id === recipe.id) {
          this.recipesToCook.push(recipe);
        } else if (element.id === recipe.id) {
          const index = this.recipesToCook.indexOf(recipe);
          this.recipesToCook.splice(index, 1);
        }
      })
    }
  }

  filterRecipes(recipeArray, tag) {
    let filteredRecipes = [];
    this[recipeArray].forEach(recipe => {
      if (recipe.tags.includes(tag)) {
        filteredRecipes.push(recipe)
      }
    });
    return filteredRecipes;
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
