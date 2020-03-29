/* eslint-disable indent */
const chai = require('chai');
const expect = chai.expect;
const recipeDataTest = require('../tests/recipe-data-test');

const Recipe = require('../src/Recipe');

describe('Recipe', () => {

    let recipe1, recipe2;
    beforeEach('recipe instance', () => {
        recipe1 = new Recipe(recipeDataTest[0].id, recipeDataTest[0].image, recipeDataTest[0].ingredients, recipeDataTest[0].instructions, recipeDataTest[0].name, recipeDataTest[0].tags);
        recipe2 = new Recipe(recipeDataTest[1].id, recipeDataTest[1].image, recipeDataTest[1].ingredients, recipeDataTest[1].instructions, recipeDataTest[1].name, recipeDataTest[1].tag);
    })

    it('should be a function', () => {
        expect(Recipe).to.be.a('function');
    });

    it('should be an instance of Recipe', () => {
        expect(recipe1).to.be.an.instanceof(Recipe);
        expect(recipe2).to.be.an.instanceof(Recipe);
    });

    it('should have an id', () => {
        expect(recipe1.id).to.equal(595736);
        expect(recipe2.id).to.equal(678353);
    });

    it('should return the total cost of ingredients needed', () => {
        expect(recipe1.calculateCost()).to.equal(177.76);
    });

})