document.addEventListener('DOMContentLoaded', showPageContent(), false);

function showPageContent() {
    const url = 'https://dummyjson.com/docs/products';

    const container = document.querySelector('main');

    function showProducts(products) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');


            const title = document.createElement('h2');
            title.textContent = product.title;

            const price = document.createElement('p');
            price.textContent = product.price;

            const discount = document.createElement('p');
            discount.textContent = product.discount;

            const category = document.createElement('p');
            category.textContent = product.category;

            const stock = document.createElement('p');
            stock.textContent = product.stock;

            const thumbnail = document.createElement('p');
            thumbnail.textContent = product.thumbnail;

            container.appendChild(card);

            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(discount);
            card.appendChild(category);
            card.appendChild(stock);
            card.appendChild(thumbnail);
        });
    }

    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data))
        .catch(handleFetchError);
};

