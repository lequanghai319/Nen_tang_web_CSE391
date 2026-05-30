const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200" },
    { id: 2, name: "MacBook Pro", price: 45000000, category: "laptop", image: "https://placehold.co/200" },
    { id: 3, name: "Samsung S24", price: 20000000, category: "phone", image: "https://placehold.co/200" },
    { id: 4, name: "Dell XPS", price: 35000000, category: "laptop", image: "https://placehold.co/200" }
];

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const categoryFilters = document.getElementById('categoryFilters');
let cartCount = 0;
let currentCat = 'all';

function renderProducts(items) {
    grid.textContent = '';
    items.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price.toLocaleString()}đ</p>
            <button class="add-btn">Thêm giỏ</button>
            <button class="view-btn">Xem chi tiết</button>
        `;
        
        // Sự kiện thêm giỏ hàng
        card.querySelector('.add-btn').addEventListener('click', () => {
            cartCount++;
            document.getElementById('cartCount').textContent = cartCount;
        });

        // Sự kiện Modal
        card.querySelector('.view-btn').addEventListener('click', () => showModal(p));

        grid.appendChild(card);
    });
}

function getFilteredAndSorted() {
    let filtered = products;
    if (currentCat !== 'all') filtered = filtered.filter(p => p.category === currentCat);
    
    const search = searchInput.value.toLowerCase();
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search));

    const sort = sortSelect.value;
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);

    return filtered;
}

function updateView() { renderProducts(getFilteredAndSorted()); }

// Events
searchInput.addEventListener('input', updateView);
sortSelect.addEventListener('change', updateView);
categoryFilters.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        currentCat = e.target.dataset.cat;
        updateView();
    }
});

document.getElementById('darkToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Modal Logic
function showModal(product) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal">
            <h2>${product.name}</h2>
            <p>Giá: ${product.price.toLocaleString()}đ</p>
            <button id="closeModal">Đóng</button>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('closeModal').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

// Init
updateView();