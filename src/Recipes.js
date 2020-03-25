class Recipes {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }
  calculateCost() {
    //access and calculate cost of all ingredients in this.ingredients array
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipes;
}