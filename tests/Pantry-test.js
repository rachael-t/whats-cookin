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
        "amount": 1
      },
      {
        "ingredient": 1082047,
        "amount": 8
      }]);
    pantry = new Pantry(user.pantry);
    recipe1 = new Recipe(799732,
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
            "amount": 10,
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
    recipe2 = new Recipe(799732,
      "google",
      [{
          "id": 11477,
          "quantity": {
            "amount": 4,
            "unit": "cup"
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
        "amount": 1
      },
      {
        "ingredient": 1082047,
        "amount": 8
      }]);
  });

  //for the test I gave the user not enough ingredients to cook the recipe that I also created as a test recipe
  //we will want to create possibly another recipe in which the user does have enough pantry ingredients to test both a true and false path

  it('should be able to check ingredients in pantry against a recipe', () => {
    expect(pantry.checkIngredients(recipe1)).to.equal(false);
  });

  it('should be return ingredients needed if user does not have enough to cook recipe', () => {
    pantry.checkIngredients(recipe1);
    expect(pantry.checkAmountNeeded()).to.deep.equal([{id: 11297, amount: 1}, {id: 1082047, amount: 2}]);
  });

  it('should let the user know if they have enough ingredients to cook a recipe', () => {
    expect(pantry.checkIngredients(recipe2)).to.equal(true);
  });

  it('should remove used ingredients from pantry when the user cooks a recipe', () => {
    pantry.checkIngredients(recipe2)
    pantry.removeIngredients()
    expect(pantry.ingredientsStocked).to.deep.equal([{
      "ingredient": 11297,
      "amount": 1
    }]);
  });


})
