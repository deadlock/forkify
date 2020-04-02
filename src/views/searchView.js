import { elements } from './base';

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
     elements.searchResultList.insertAdjacentHTML('beforeend', markup); 

}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    if(title.length > limit){
        title.split(' ').reduce((accumulator, currentValue) => {
            if(accumulator + currentValue.length <= limit) {
                newTitle.push(currentValue);

            } 
            return accumulator + currentValue.length;   
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const createButton = (page, type) => {
    return `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>    
    `
}

const renderButtons = (page, totalResults, resultsPerPage) => {
    const pages = Math.ceil(totalResults / resultsPerPage);

    let button;
    if(page === 1 && pages > 1){
        button = createButton(page, 'next');
    } else if( page < pages){
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if(page === pages && pages >1){
        button = createButton(page, 'prev');
    }

    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
}

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
}

export const renderResult = (recipes, page = 1, resultsPerPage = 10) => {
    const start = (page - 1 ) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resultsPerPage);
};