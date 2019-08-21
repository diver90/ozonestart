'use strict';

import getData from './modules/getData';
import renderCards from './modules/renderCards';
import renderCatalog from './modules/renderCatalog';
import toogleCheckbox from './modules/toogleCheckbox';
import toogleCart from './modules/toogleCart';
import addCart from './modules/addCart';
import actionPage from './modules/actionPage';


(async function(){
    const db = await getData();
    renderCards(db);
    renderCatalog();
    toogleCheckbox();
    toogleCart();
    addCart();
    actionPage();
}());
