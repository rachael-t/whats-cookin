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

    it('should have an image', () => {
        expect(recipe1.image).to.equal('https://images.unsplash.com/');
    });

    it('should have list of ingredients', () => {
        expect(recipe1.ingredients[0]).to.deep.equal({
            "id": 20081,
            "quantity": {
                "amount": 1.5,
                "unit": "c"
            }
        });
    });

    it('should have list of instructions', () => {
        expect(recipe1.instructions[0]).to.deep.equal({
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
        });
    });

    it('should have a name', () => {
        expect(recipe1.name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
    });

    it('should have tags', () => {
        expect(recipe1.tags[1]).to.equal('starter');
    });

    it('should calculate total recipe price', () => {
        expect(recipe1.calculateCost()).to.equal(177.76);
        expect(recipe2.calculateCost()).to.equal(272.97);
    });

})
