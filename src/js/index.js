import Search from '../models/Search';
import * as searchView from '../views/searchView';
import { elements } from '../views/base';

console.log(elements);


const state = {};
const controlSearch = async function() {
    
    const query = searchView.getInput();

    if(query){

        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        await state.search.getResult();
        console.log(state.search.result);
        searchView.renderResult(state.search.result);
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    console.log(e.target.elements[0].value);
    
    e.preventDefault();
    controlSearch();
});



