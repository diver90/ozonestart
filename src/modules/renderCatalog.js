import filter from './filter';

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        catalog = new Set(),
        catalogList = document.querySelector('.catalog-list');
    const catalogWraper = document.querySelector('.catalog');
    const btnCatalog = document.querySelector('.catalog-button');
    const filterTitle = document.querySelector('.filter-title h5');

    cards.forEach((card) => {
        catalog.add(card.dataset.category);
    });
    catalog.forEach((category) => {
        let catalogLi = document.createElement('li');
        catalogLi.innerText = category;
        catalogList.appendChild(catalogLi);
    });

    const allLi = catalogList.querySelectorAll('li');

    btnCatalog.addEventListener('click', (event) => {

        if (catalogWraper.style.display) {
            catalogWraper.style.display = '';
        } else {
            catalogWraper.style.display = 'block';
        }

        if (event.target.tagName === 'LI') {
                allLi.forEach((elem) => {
                if (elem === event.target) {
                    elem.classList.add('active');
                } else {
                    elem.classList.remove('active');
                }
            });
            filterTitle.textContent = event.target.textContent;
            filter();
        }
    });

}