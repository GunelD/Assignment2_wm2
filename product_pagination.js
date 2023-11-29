const itemsPerPage = 10;
let currentPage = 1;
let totalProducts = 0;

function initPagination(products) {
    totalProducts = products.length;
    displayPaginationControls();
}

function showPage(pageNumber, products) {
    const container = document.querySelector('main');
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = products.slice(startIndex, endIndex);

    container.innerHTML = '';
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
}

function displayPaginationControls() {
    const paginationContainer = document.querySelector('footer');
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    if (totalPages > 1) {
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => handlePageChange(i));
            paginationContainer.appendChild(pageButton);
        }
    }
}

function handlePageChange(pageNumber) {
    currentPage = pageNumber;
    handleSearch();
}

export { initPagination, showPage };



function displayPaginationControls() {
    const paginationContainer = document.querySelector('footer');
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    if (totalPages > 1) {
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => handlePageChange(i));
            paginationContainer.appendChild(pageButton);
        }
    }
}

function handlePageChange(pageNumber) {
    currentPage = pageNumber;
    handleSearch();
}

export { initPagination, showPage };
