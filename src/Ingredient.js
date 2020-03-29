class Ingredient {
  constructor (id, name, cost) {
    this.id = id;
    this.name = name;
    this.estimatedCostInCents = cost;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
}
