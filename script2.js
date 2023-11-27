document.addEventListener('DOMContentLoaded', showPageContent, false);

function showPageContent() {
    const url = 'https://dummyjson.com/products?limit=100&select=title,category,discountPercentage,price,stock,thumbnail';

    const container = document.querySelector('main');

    function showProducts(products) {

        console.log(products)
       
        products.forEach(product => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const thumbnail = document.createElement('img');
            thumbnail.setAttribute('src', product.thumbnail);

            const title = document.createElement('h2');
            title.textContent = product.title.charAt(0).toUpperCase() + product.title.slice(1);
            const price = document.createElement('p');
            price.textContent = 'Price: ' + product.price + '$';

            const discountPercentage = document.createElement('p');
            discountPercentage.textContent = 'Discount Percentage: ' + product.discountPercentage + '%';

            const category = document.createElement('p');
            category.textContent = 'Category: ' + product.category;

            const stock = document.createElement('p');
            stock.textContent = 'Current Stock: ' + product.stock;


            container.appendChild(card);

            card.appendChild(thumbnail);
            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(discountPercentage);
            card.appendChild(category);
            card.appendChild(stock);
            card.addEventListener('click', () => showProductDetails(product));
        });
    }

    function showProductDetails(product) {
        // Open the product details in a new tab
        window.open('product_Details.html?id=' + product.id, '_blank');
    }

    function handleFetchError() {
        const error = document.createElement('p');
        error.textContent = 'Error fetching data, please try again';
        container.appendChild(error);
    };


    fetch(url)
        .then(response => response.json())
        .then(data => showProducts(data.products))
        .catch(handleFetchError);
};

