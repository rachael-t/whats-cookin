const chai = require('chai');
const expect = chai.expect;

const Recipes = require('../src/Recipes');

describe('Recipes', () => {

    let recipe;
    beforeEach('recipe instance', () => {
        recipe = new Recipes();
    })

    it('should be a function', () => {
        expect(Recipes).to.be.a('function');
    });

    it('should be an instance of Pantry', () => {
        expect(recipe).to.be.an.instanceof(Recipes);
    });

})