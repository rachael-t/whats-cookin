const ingredientsData = require('../data/ingredients');

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

  searchRecipes(input) {
    let filteredRecipes = [];
    const inputLowerCase = input.toLowerCase()
    console.log(inputLowerCase)
    //returns 'lettuce'
    let ingredientID = [];
    ingredientsData.forEach(ingredient => {
      if (ingredient.name.indexOf(inputLowerCase) !== -1) {
        ingredientID.push(ingredient.id);
      }
    });
    console.log(ingredientID)
    //for the test we are running, we are searching for lettuce, which TWO ingredients have in their name, neither of which have it as the first/only world in the string. this is why we do NOT want to use .find() in case a user is searching for an ingredient which could bring back a number of items
    //this console log should return an array of two objects

    this.favoriteRecipes.forEach(recipe => {
      if (recipe.name.toLowerCase().includes(inputLowerCase)) {
        filteredRecipes.push(recipe)
      }
    });
    this.recipesToCook.forEach(recipe => {
      if (recipe.name.toLowerCase().includes(inputLowerCase)) {
        filteredRecipes.push(recipe)
      }
    });
    this.favoriteRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === ingredientID) {
          filteredRecipes.push(recipe);
        }
      })
    });
    this.recipesToCook.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === ingredientID) {
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
  module.exports = Users;
}
