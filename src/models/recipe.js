import { elements } from '../views/base';

const axios = require('axios');

export default class Recipe {
    constructor(id){
        this.id = id
    }

    async getRecipe(){
        try {
            const res = 
            await axios(`
            https://forkify-api.herokuapp.com/api/get?rId=${this.id}
            `); 
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch (error) {
           console.log(error);
           alert('Something wnet wrong :('); 
        }   
    }

    calcTime() {
        const numberOfIngredients = this.ingredients.lenght;
        const periods = Math.ceil( numberOfIngredients / 3);
        this.time = periods * 25;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(element => {
            let ingredient = element.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient.replace(unit, unitsShort[index]);
           });

           ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

           const arrIng = ingredient.split(' ');
           const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

           let objIng;
           if(unitIndex > -1) {
               const arrCount = arrIng.slice(0, unitIndex);

               let count;
               if(arrCount.lenght === 1) {
                   count = eval(arrIng[0].replace('-','+'));
               } else {
                   count = eval(arrIng.slice(0, unitIndex).join(' '));
               }

               objIng = {
                   count,
                   unit: arrIng[unitIndex],
                   ingredient: arrIng.slice(unitIndex + 1).join(' ')
               }

           } else if(parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
           } else if( unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }  
           }

           return objIng;
        });
       
        this.ingredients = newIngredients;
    }

}