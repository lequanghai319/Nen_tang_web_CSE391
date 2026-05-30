const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// 1. Lọc sản phẩm còn hàng
const getInStock = (prods) => prods.filter(p => p.stock > 0);

// 2. Lọc theo category VÀ khoảng giá
const filterProducts = (prods, category, min, max) => 
    prods.filter(p => p.category === category && p.price >= min && p.price <= max);

// 3. Sắp xếp theo giá
const sortByPrice = (prods, order = "asc") => 
    [...prods].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);

// 4. Tìm sản phẩm rẻ nhất mỗi category
const cheapestByCategory = (prods) => 
    prods.reduce((acc, p) => {
        if (!acc[p.category] || p.price < acc[p.category].price) {
            acc[p.category] = p;
        }
        return acc;
    }, {});

// 5. Tính tổng giá trị kho
const totalInventoryValue = (prods) => 
    prods.reduce((sum, p) => sum + (p.price * p.stock), 0);

// 6. Tạo mảng { name, formattedPrice }
const formatProductList = (prods) => 
    prods.map(p => ({
        name: p.name,
        formattedPrice: p.price.toLocaleString('vi-VN') + "đ"
    }));

// 7. Tính rating trung bình
const averageRating = (prods) => 
    (prods.reduce((sum, p) => sum + p.rating, 0) / prods.length).toFixed(1);

// 8. Tìm sản phẩm theo keyword
const searchProducts = (prods, keyword) => {
    const lowerKey = keyword.toLowerCase();
    return prods.filter(p => p.name.toLowerCase().includes(lowerKey));
};

// === TEST ===
console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString('vi-VN') + "đ");

console.log("\n=== FORMATTED LIST ===");
console.log(formatProductList(products).slice(0, 3)); // In 3 phần tử đầu