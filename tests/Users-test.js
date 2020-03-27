const chai = require('chai');
const expect = chai.expect;

const Users = require('../src/Users');
const Recipes = require('../src/Recipes');
const Pantry = require('../src/Pantry');

describe('Users', () => {

    let user, recipe, pantry;
    beforeEach('user instance', () => {
        user = new Users();
        recipe = new Recipes();
        pantry = new Pantry();
    })

    it('should be a function', () => {
        expect(Users).to.be.a('function');
    });

    it('should be an instance of Users', () => {
        expect(user).to.be.an.instanceof(Users);
    });

    it('should be able to modify favoriteRecipes', () => {
        user.modifyFavoriteRecipes(recipe);
        expect(user.favoriteRecipes.length).to.equal(1);
    });

    it('check if recipe is in favoriteRecipes array', () => {
        user.modifyFavoriteRecipes(605132);
        user.modifyFavoriteRecipes(605132)
        expect(user.favoriteRecipes.length).to.equal(0);
    });

    it('should be able to modify recipesToCook', () => {
        user.modifyRecipesToCook(recipe);
        expect(user.recipesToCook.length).to.equal(1);
    });

    it('check if recipe is in recipesToCook array', () => {
        user.modifyRecipesToCook(recipe);
        user.modifyRecipesToCook(recipe)
        expect(user.recipesToCook.length).to.equal(0);
    });

    it('should display filtered saved recipes', () => {
      user.modifyFavoriteRecipes(605132);
      user.modifyFavoriteRecipes(226562);
      user.modifyFavoriteRecipes(583738);
      user.filterRecipes(user.favoriteRecipes, 'side dish')
      expect(user.filterRecipes()).to.equal([605132, 226562]);
      //2050 is vanilla
      //both lentil and pastry cream are side dishes
      //selected recipes are reese's cookies, lentil loaf and pastry cream
    });

    // it('searchRecipes', () => {
    //     expect().to.equal();
    // });




})
