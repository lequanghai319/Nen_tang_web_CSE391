function calculate(num1, operator, num2) {
    const n1 = Number(num1);
    const n2 = Number(num2);

    if (isNaN(n1) || isNaN(n2)) {
        return "Lỗi: Input không phải số";
    }

    switch (operator) {
        case "+": return n1 + n2;
        case "-": return n1 - n2;
        case "*": return n1 * n2;
        case "/":
            if (n2 === 0) return "Lỗi: Không thể chia cho 0";
            return n1 / n2;
        case "%":
            if (n2 === 0) return "Lỗi: Không thể chia cho 0";
            return n1 % n2;
        case "**": return n1 ** n2;
        default: return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// Test:
console.log(calculate(10, "+", 5));    // 15
console.log(calculate(10, "/", 0));    // "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // 1024