document.addEventListener('DOMContentLoaded', showPageContent, false);

function showPageContent() {
    const url = 'https://dummyjson.com/products';

    const container = document.querySelector('main');

    function showProducts(products) {

        console.log(products)
       
        products.forEach(product => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const title = document.createElement('h2');
            title.textContent = product.title;

            const thumbnail = document.createElement('img');
            thumbnail.setAttribute('src', product.thumbnail);

            const price = document.createElement('p');
            price.textContent = product.price;

            const discountPercentage = document.createElement('p');
            discountPercentage.textContent = product.discountPercentage + '%';

            const category = document.createElement('p');
            category.textContent = product.category;

            const stock = document.createElement('p');
            stock.textContent = product.stock;


            container.appendChild(card);

            card.appendChild(title);
            card.appendChild(thumbnail);
            card.appendChild(price);
            card.appendChild(discountPercentage);
            card.appendChild(category);
            card.appendChild(stock);
        });
    }

    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data.products))
        .catch(handleFetchError);
};
