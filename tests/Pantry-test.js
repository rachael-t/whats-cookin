const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
const User = require('../src/User');
const Recipe = require('../src/Recipe');
const userDataTest = require('../tests/user-data-test');
const pantryDataTest = require('../tests/pantry-data-test');

describe('Pantry', () => {

  let pantry;
  beforeEach('pantry instance', () => {
    user = new User(pantryDataTest[0].id, pantryDataTest[0].name, pantryDataTest[0].pantry);
    pantry = new Pantry(user.pantry);
    recipe1 = new Recipe(userDataTest[3].id, userDataTest[3].image, userDataTest[3].ingredients, userDataTest[3].instructions, userDataTest[3].name, userDataTest[3].tags);
    recipe2 = new Recipe(userDataTest[4].id, userDataTest[4].image, userDataTest[4].ingredients, userDataTest[4].instructions, userDataTest[4].name, userDataTest[4].tags);
  })

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should be able to store a user\'s list of ingredients', () => {
    expect(pantry.ingredientsStocked).to.deep.equal([{
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
      }
    ]);
  });

  it('should be able to check ingredients in pantry against a recipe', () => {
    expect(pantry.checkIngredients(recipe1)).to.equal(false);
  });

  it('should be return ingredients needed if user does not have enough to cook recipe', () => {
    pantry.checkIngredients(recipe1);
    expect(pantry.checkAmountNeeded()).to.deep.equal([{
      id: 11297,
      amount: 1,
      unit: "cups"
    }, {
      id: 1082047,
      amount: 2,
      unit: "tsp"
    }]);
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