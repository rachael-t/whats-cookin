if (typeof module !== 'undefined') {
  var ingredientInfo = require('../data/ingredients');
}

class User {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry || [];
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  modifyRecipes(recipe, category) {
    if (this[category].length === 0) {
      this[category].push(recipe);
    } else if (this[category].length > 0) {
      let index = this[category].findIndex(el => el.id === recipe.id);
      if (index === -1) {
        this[category].push(recipe);
      } else {
        this[category].splice(index, 1);
      }
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

  searchRecipes(input) {
    let filteredRecipes = [];
    let inputLowerCase = input.toLowerCase();
    // console.log(inputLowerCase)
    let ingredientIds = [];
    // console.log(ingredientInfo)
    ingredientInfo.forEach(ingredient => {
      let words = ingredient.name.split(' ');
      words.forEach(word => {
        if (word === inputLowerCase) {
          ingredientIds.push(ingredient.id);
        }
      })
    });

    this.favoriteRecipes.forEach(recipe => {
      // also check if ifilteredRecipes  array already includes this recipe
      if (recipe.name.toLowerCase().includes(inputLowerCase)) {
        filteredRecipes.push(recipe)
      }
    });
    this.recipesToCook.forEach(recipe => {
      // also check if ifilteredRecipes  array already includes this recipe
      if (recipe.name.toLowerCase().includes(inputLowerCase)) {
        filteredRecipes.push(recipe)
      }
    });
    this.favoriteRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredientIds.includes(ingredient.id)) {
          filteredRecipes.push(recipe);
        }
      })
    });
    this.recipesToCook.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredientIds.includes(ingredient.id)) {
          filteredRecipes.push(recipe);
        }
      })
    })
    return filteredRecipes;
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
  module.exports = User;
}