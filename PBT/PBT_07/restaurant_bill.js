function calculateBill(items, dayOfWeek) {
    let subtotal = 0;
    let detail = "";

    for (let i = 0; i < items.length; i++) {
        let {name, price, qty} = items[i];
        let rowTotal = price * qty;
        subtotal += rowTotal;
        detail += `║ ${i+1}. ${name.padEnd(12)} x${qty}   @${price/1000}k  = ${rowTotal/1000}k  ║\n`;
    }

    let discountPercent = 0;
    if (subtotal > 1000000) discountPercent += 15;
    else if (subtotal > 500000) discountPercent += 10;
    if (dayOfWeek === "Wednesday") discountPercent += 5;

    let discount = (subtotal * discountPercent) / 100;
    let tip = subtotal * 0.05;
    let afterDiscount = subtotal - discount;
    let vat = afterDiscount * 0.08;
    let total = afterDiscount + vat + tip;

    console.log("╔══════════════════════════════════════╗");
    console.log("║         HÓA ĐƠN NHÀ HÀNG             ║");
    console.log("╠══════════════════════════════════════╣");
    console.log(detail.trim());
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ Tổng cộng:              ${subtotal.toLocaleString("vi-VN")}đ    ║`);
    console.log(`║ Giảm giá (${discountPercent}%):           -${discount.toLocaleString("vi-VN")}đ    ║`);
    console.log(`║ VAT (8%):               ${vat.toLocaleString("vi-VN")}đ    ║`);
    console.log(`║ Tip (5%):               ${tip.toLocaleString("vi-VN")}đ    ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:             ${total.toLocaleString("vi-VN")}đ    ║`);
    console.log("╚══════════════════════════════════════╝");
}

calculateBill([
    { name: "Phở bò", price: 65000, qty: 2 },
    { name: "Trà đá", price: 5000, qty: 3 },
    { name: "Bún chả", price: 55000, qty: 1 }
], "Wednesday");