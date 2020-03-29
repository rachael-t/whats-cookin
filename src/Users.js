// const data = require('../data/ingredients');


let ingredientInfo = [{
    "id": 20081,
    "name": "wheat flour",
    "estimatedCostInCents": 142
  },
  {
    "id": 18372,
    "name": "bicarbonate of soda",
    "estimatedCostInCents": 582
  },
  {
    "id": 10011250,
    "name": "head of lettuce",
    "estimatedCostInCents": 472
  },
  {
    "id": 19335,
    "name": "sucrose",
    "estimatedCostInCents": 902
  }
];

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
        if (element.id !== recipe.id) {
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
    let ingredientID = [];
    ingredientInfo.forEach(ingredient => {
      if (ingredient.name.includes(inputLowerCase)) {
        ingredientID.push(ingredient.id);
      }
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
        if (ingredientID.includes(ingredient.id)) {
          filteredRecipes.push(recipe);
        }
      })
    });
    this.recipesToCook.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredientID.includes(ingredient.id)) {
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