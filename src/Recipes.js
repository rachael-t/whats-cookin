class Recipes {
  constructor(id, image, ingredients, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }
  filterByTag(tag) {
    //take in tag, loop through if that argument tag strictly matches a tag in the this.tags array, then return recipe
  }
  searchByIngredient(ingredient) {
    //take input of ingredient and return all recipes that contain ingredient in this.ingredients (loop through this array)
  }
  calculateCost() {
    //access and calculate cost of all ingredients in this.ingredients array
  }
  getInstructions() {
    //returning the instruction array when invoked
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipes;
}
