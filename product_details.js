document.addEventListener('DOMContentLoaded', showDetailsPageContent, false);

function showDetailsPageContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const url = `https://dummyjson.com/products/${id}`;

    const container = document.querySelector('main');

    function showProductDetails(product) {
        console.log(product);

        const details = document.createElement('div');
        details.setAttribute('class', 'details');

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

        const rating = document.createElement('p');
        rating.textContent = 'Rating: ' + product.rating;

        const brand = document.createElement('p');
        brand.textContent = 'Brand: ' + product.brand;

        const description = document.createElement('p');
        description.textContent = 'Product Description: ' + product.description;
        
        container.appendChild(details);
    
        details.appendChild(thumbnail);
        details.appendChild(title);
        details.appendChild(price);
        details.appendChild(discountPercentage);
        details.appendChild(category);
        details.appendChild(stock);
        details.appendChild(rating);
        details.appendChild(brand);
        details.appendChild(description);
}

    function handleFetchError() {
        const error = document.createElement('p');
        error.textContent = 'Error fetching data, please try again';
        container.appendChild(error);
    }

    fetch(url)
        .then(response => response.json())
        .then(data => showProductDetails(data)) // Assuming the API returns a single product
        .catch(handleFetchError);
}
