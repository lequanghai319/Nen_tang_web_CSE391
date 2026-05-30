function createCart() {
    let items = [];
    let discountPercent = 0;
    let discountFixed = 0;

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(i => i.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) {
                item.quantity = newQuantity > 0 ? newQuantity : 1;
            }
        },
        
        getTotal() {
            let subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let total = subtotal - (subtotal * discountPercent / 100) - discountFixed;
            return total > 0 ? total : 0;
        },
        
        applyDiscount(code) {
            if (code === "SALE10") discountPercent = 10;
            else if (code === "SALE20") discountPercent = 20;
            else if (code === "FREESHIP") discountFixed = 30000;
            else console.log("Mã giảm giá không hợp lệ");
        },
        
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        clearCart() {
            items = [];
            discountPercent = 0;
            discountFixed = 0;
        },

        printCart() {
            console.log("┌──────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm        │ SL │ Đơn giá     │ Tổng        │");
            console.log("├──────────────────────────────────────────────────┤");
            
            let subtotal = 0;
            items.forEach((item, index) => {
                let rowTotal = item.price * item.quantity;
                subtotal += rowTotal;
                console.log(`│ ${index+1} │ ${item.name.padEnd(13)} │ ${item.quantity.toString().padStart(2)} │ ${(item.price).toLocaleString('vi-VN').padStart(11)} │ ${(rowTotal).toLocaleString('vi-VN').padStart(11)} │`);
            });
            
            console.log("├──────────────────────────────────────────────────┤");
            
            let finalTotal = this.getTotal();
            if (discountPercent > 0 || discountFixed > 0) {
                console.log(`│ Tạm tính:                           ${subtotal.toLocaleString('vi-VN').padStart(11)}đ │`);
                console.log(`│ Giảm giá:                           ${(finalTotal - subtotal).toLocaleString('vi-VN').padStart(11)}đ │`);
            }
            
            console.log(`│ TỔNG CỘNG:                          ${finalTotal.toLocaleString('vi-VN').padStart(11)}đ │`);
            console.log("└──────────────────────────────────────────────────┘");
        }
    };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

console.log("\n>>> Áp dụng mã SALE10:");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\nSố SP hiện tại:", cart.getItemCount()); // 4
cart.removeItem(3); // Xóa AirPods
console.log("Số SP sau khi xóa AirPods:", cart.getItemCount()); // 2