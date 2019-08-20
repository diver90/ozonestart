'use strict';
// чекбокс
function toogleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });

    }
}

// end чекбокс

//Корзина
function toogleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector(".cart");
    const closeBtn = document.querySelector(".cart-close");

    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}

//end Корзина



//работа с Корзина
function addCart() {
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('.btn-primary');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);

            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });
    });


    function showData() {

        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
        let sum = 0;
        countGoods.textContent = cardsCart.length;

        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });
        cardTotal.textContent = sum;
        if (cardsCart.length === 0) {
            cartWrapper.appendChild(cartEmpty);
        } else {
            cartEmpty.remove();
        }
    }
}
// end работа с Корзина

//фильтр , поиск

function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        //searchBtn = document.querySelector('.search-btn'),
        searchStr = document.querySelector('.search-wrapper_input');


    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent),
                discount = card.querySelector('.card-sale');
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

        });
    }
    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    searchStr.addEventListener('input', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
        //search.value = '';
    });
}

//end фильтр, поиск

//получение данных с сервера

function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json').then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не были получены, ошибка: ' + response.status);
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="color:red; font-size:30px">Упс, что-то пошло не так</div>';
        });

}

function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
        <div class="card" data-category="${good.category}">
        ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${good.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
                <h5 class="card-title">${good.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>`;
        goodsWrapper.appendChild(card);
    });
}

function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        catalog = new Set(),
        catalogList = document.querySelector('.catalog-list');
        const catalogWraper = document.querySelector('.catalog');
        const btnCatalog = document.querySelector('.catalog-button');
    cards.forEach((card) => {
        catalog.add(card.dataset.category);
    });
    catalog.forEach((category) => {
        let catalogLi = document.createElement('li');
        catalogLi.innerText = category;
        catalogList.appendChild(catalogLi);
    });
    btnCatalog.addEventListener('click', (event) => {
        if(catalogWraper.style.display) {
            catalogWraper.style.display = '';
        } else {
        catalogWraper.style.display = 'block';
        }
        if(event.target.tagName === 'LI'){
            cards.forEach((card) => {
                if(card.dataset.category === event.target.textContent){
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            });
        }
    });

}

getData().then((data) => {
    renderCards(data);
    toogleCheckbox();
    toogleCart();
    addCart();
    actionPage();
    renderCatalog();
});