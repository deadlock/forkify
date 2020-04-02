import Search from '../models/Search';
import Recipe from '../models/Recipe';
import * as searchView from '../views/searchView';
import { elements, renderLoader, clearLoader } from '../views/base';

const state = {};
const controlSearch = async function() {
    
    const query = searchView.getInput();

    if(query){

        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);
        try{
            await state.search.getResult();
            searchView.renderResult(state.search.result);
        } catch (error){
            console.log(error);           
        }        
        clearLoader();
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if(button){
        const gotoPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResult(state.search.result, gotoPage);
    }      
})

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

    if(id){


        state.recipe = new Recipe(id);

        try {

            await stat.recipe.getRecipe();

            state.recipe.calcTime();
            state.recipe.calcServings();
            
        } catch (error) {
            alert('Something went wrong :(');
        }

    }
}

['hashChange', 'load'].forEach(event => {
    window.addEventListener(event, controlRecipe);  
})