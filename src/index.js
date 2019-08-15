'use strict';
// чекбокс
const checkbox = document.querySelectorAll('.filter-check_checkbox');

for (let i = 0; i < checkbox.length; i++) 
{
    checkbox[i].addEventListener('change', function () {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });

}
// end чекбокс

//Корзина
const btnCart = document.getElementById('cart');
const modalCart = document.querySelector(".cart");
const closeBtn =  document.querySelector(".cart-close");

btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
});
//end Корзина

//работа с Корзина

const cards = document.querySelectorAll('.goods .card'),
cartWrapper = document.querySelector('.cart-wrapper'),
cartEmpty = document.getElementById('cart-empty'),
countGoods = document.querySelector('.counter');

cards.forEach((card) => {
    const btn = card.querySelector('.btn-primary');
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();

        const removeBtn = cardClone.querySelector('.btn');
        removeBtn.textContent = 'Удалить из корзины';
    });
});

function showData(){

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
}

// end работа с Корзина

