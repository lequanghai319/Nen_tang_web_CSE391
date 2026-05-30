// 1. pipe() — Nối chuỗi functions
const pipe = (...fns) => (initialVal) => 
    fns.reduce((val, fn) => fn(val), initialVal);

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("1. Test Pipe: ", process(5)); // → "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {}; // Biến private nhờ Closure
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán nặng...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log("2. Test Memoize lần 1:");
console.log(expensiveCalc(1000000)); // Sẽ in "Đang tính..."
console.log("   Test Memoize lần 2:");
console.log(expensiveCalc(1000000)); // Lấy luôn từ cache, không in "Đang tính..."

// 3. debounce() — Chờ ngừng gọi mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("3. Đang gọi API tìm kiếm cho:", query);
}, 500);

// Giả lập user gõ liên tục
search("i");
search("iP");
search("iPh");
search("iPhone"); // Chỉ lệnh cuối cùng này được in ra sau 500ms

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`Lỗi ở lần thử ${attempt}/${maxAttempts}`);
            if (attempt === maxAttempts) throw error;
        }
    }
}

// Test mô phỏng retry
let tries = 0;
const unstableAPI = async () => {
    tries++;
    if (tries < 3) throw new Error("Mạng chập chờn");
    return "Lấy dữ liệu thành công!";
};

retry(unstableAPI)
    .then(res => console.log("4. Kết quả Retry:", res))
    .catch(err => console.log("Thất bại toàn tập:", err.message));