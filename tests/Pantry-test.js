const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/Pantry');
const User = require('../src/User');
const Recipe = require('../src/Recipe');


describe('Pantry', () => {

  let pantry;
  beforeEach('pantry instance', () => {
    user = new User("Saige O'Kon",
    1,
    [
      {
        "ingredient": 11477,
        "amount": 4
      },
      {
        "ingredient": 11297,
        "amount": 4
      },
      {
        "ingredient": 1082047,
        "amount": 10
      }]);
    pantry = new Pantry(user.pantry);
    recipe = new Recipe(799732,
      "google",
      [{
          "id": 11477,
          "quantity": {
            "amount": 4,
            "unit": "cup"
          }
        },
        {
          "id": 11297,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 1082047,
          "quantity": {
            "amount": 8,
            "unit": "tsp"
          }
        }
      ],
      [{
        "instruction": "Mix & serve.",
        "number": 1
      }],
      "Zucchini Salad",
      [
        "salad"
      ]);
  })

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should be able to store a user\'s list of ingredients', () => {
    expect(pantry.ingredientsStocked).to.deep.equal([
      {
        "ingredient": 11477,
        "amount": 4
      },
      {
        "ingredient": 11297,
        "amount": 4
      },
      {
        "ingredient": 1082047,
        "amount": 10
      }]);
  });

  it('should be able to check ingredients in pantry against a recipe', () => {
    pantry.checkIngredients(recipe)
    expect(pantry.checkIngredients()).to.equal(false);
  });





})
