const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/Pantry');
const User = require('../src/User');
const Recipe = require('../src/Recipe');


describe('Pantry', () => {

    let pantry;
    beforeEach('pantry instance', () => {
        pantry = new Pantry();
        recipe = new Recipe();
    })

    it('should be a function', () => {
        expect(Pantry).to.be.a('function');
    });

    it('should be an instance of Pantry', () => {
        expect(pantry).to.be.an.instanceof(Pantry);
    });

    it('should be able to store ingredient')

})
