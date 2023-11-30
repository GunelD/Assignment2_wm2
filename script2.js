document.addEventListener('DOMContentLoaded', showPageContent, false);

const url = 'https://dummyjson.com/products?limit=100&select=title,category,discountPercentage,price,stock,thumbnail';
const itemsPerPage = 10;
let currentPage = 1;
let allProducts = [];

function getCategories() {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            allProducts = data.products;
            categories = [];
            data.products.forEach(function(product) {
                if (!categories.includes(product.category)) {
                    categories.push(product.category);
                }
            });
            dataCategorydropdown();
        })
        .catch(error=>
         {
            console.error('Error fetching categories:', error);
        });
}

function dataCategorydropdown() {
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
    getCategories().then(function() {
        const container = document.querySelector('main');
        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categorySelect');
        const paginationContainer = document.querySelector('footer');

        function showProducts(products) {
            container.innerHTML = '';

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const displayedProducts = products.slice(startIndex, endIndex);

            displayedProducts.forEach(product => {
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

            displayPaginationControls(products);
        }

        function showProductDetails(product) {
            window.open('product_Details.html?id=' + product.id, '_blank');
        }

        // function handleFetchError(error) {
        //     console.error('Error fetching data:', error);
        //     const errorMessage = document.createElement('p');
        //     errorMessage.textContent = 'Error fetching data, please try again';
        //     container.appendChild(errorMessage);
        // }

        function filterProducts(searchKeyword, selectedCategory, products) {
            return products.filter(product => {
                const matchesSearchTitle = product.title.toLowerCase().includes(searchKeyword.toLowerCase());
                const matchesSearchCategory = product.category.toLowerCase().includes(searchKeyword.toLowerCase());
                const matchesCategory = selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase();
                return (matchesSearchTitle || matchesSearchCategory) && matchesCategory && product.stock > 0;
            });
        }

        function handleSearch() {
            const filteredProducts = filterProducts(searchInput.value, categorySelect.value, allProducts);
            showProducts(filteredProducts);
        }

        function displayPaginationControls(products) {
            paginationContainer.innerHTML = '';

            const totalPages = Math.ceil(products.length / itemsPerPage);

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.addEventListener('click', () => handlePageChange(i));
                paginationContainer.appendChild(pageButton);
            }
        }

        function handlePageChange(pageNumber) {
            currentPage = pageNumber;
            handleSearch();
        }

        searchInput.addEventListener('input', handleSearch);
        categorySelect.addEventListener('change', handleSearch);

        handleSearch();
    });
}


