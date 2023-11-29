document.addEventListener('DOMContentLoaded', showPageContent, false);

const url = 'https://dummyjson.com/products?limit=100&select=title,category,discountPercentage,price,stock,thumbnail';

let categories = [];

function fetchCategories() {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            categories = [];
            data.products.forEach(function(product) {
                if (!categories.includes(product.category)) {
                    categories.push(product.category);
                }
            });
            populateCategoryDropdown();
        })
        .catch(function(error) {
            console.error('Error fetching categories:', error);
        });
}


function populateCategoryDropdown() {
    const categorySelect = document.getElementById('categorySelect');

    categorySelect.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'All';
    categorySelect.appendChild(allOption);

    categories.forEach(function(category) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function showPageContent() {
    fetchCategories().then(function() {
        const container = document.querySelector('main');
        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categorySelect');

        function showProducts(products) {
            container.innerHTML = '';

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
            window.open('product_Details.html?id=' + product.id, '_blank');
        }

        function handleFetchError(error) {
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error fetching data, please try again';
            container.appendChild(errorMessage);
        }

        function filterProducts(searchKeyword, selectedCategory, products) {
            return products.filter(product => {
                const matchesSearchTitle = product.title.toLowerCase().includes(searchKeyword.toLowerCase());
                const matchesSearchCategory = product.category.toLowerCase().includes(searchKeyword.toLowerCase());
                const matchesCategory = selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase();
                return (matchesSearchTitle || matchesSearchCategory) && matchesCategory && product.stock > 0;
            });
        }

        function handleSearch() {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const filteredProducts = filterProducts(searchInput.value, categorySelect.value, data.products);
                    showProducts(filteredProducts);
                })
                .catch(handleFetchError);
        }

        searchInput.addEventListener('input', handleSearch);
        categorySelect.addEventListener('change', handleSearch);

        handleSearch();
    });
}


