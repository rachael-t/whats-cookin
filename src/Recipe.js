if (typeof module !== 'undefined') {
  ingredientsData = require('../data/ingredients');
}

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }
  calculateCost() {
    let price = this.ingredients.reduce((totalPrice, ingredient) => {
      ingredientsData.forEach(data => {
        if (data['id'] === ingredient['id']) {
          totalPrice += (data['estimatedCostInCents'] * ingredient['quantity']['amount']) / 100;
        }
      })
      return totalPrice;
    }, 0)
    return Math.round(price * 100) / 100
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}