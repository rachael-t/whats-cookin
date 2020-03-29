const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe');

describe('Recipe', () => {

    let recipe;
    beforeEach('recipe instance', () => {
        recipe = new Recipe();
    })

    it('should be a function', () => {
        expect(Recipe).to.be.a('function');
    });

    it('should be an instance of Pantry', () => {
        expect(recipe).to.be.an.instanceof(Recipe);
    });

})
