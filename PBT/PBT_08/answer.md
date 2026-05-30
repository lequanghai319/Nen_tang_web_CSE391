## PHẦN A — KIỂM TRA ĐỌC HIỂU
---
### Câu A1 — Function Declaration vs Expression vs Arrow

```javascript
// 1. Function Declaration
function tinhThueBaoHiem(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue }; 
}

// 2. Function Expression
const tinhThueBaoHiemExpr = function(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};

// 3. Arrow Function
const tinhThueBaoHiemArrow = (luong) => {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};
// Viết ngắn gọn (implicit return object):
// const tinhThueBaoHiemArrowShort = luong => ({ thuong: 0, thuc_nhan: luong - (luong > 11000000 ? luong * 0.1 : 0) });
```
**Khác nhau về Hoisting:**
- Function Declaration: Được "hoisted" (kéo lên đầu) TOÀN BỘ. Có thể gọi hàm TRƯỚC KHI định nghĩa.
- Function Expression & Arrow Function:** Nếu khai báo bằng `let` hoặc `const`, biến sẽ bị rơi vào TDZ (Temporal Dead Zone). Gọi hàm trước khi khai báo sẽ gây lỗi `ReferenceError`.

### Câu A2 — Scope & Closure
- Đoạn 1:
  - `c.increment()` → In ra 1
  - `c.increment()` → In ra 2
  - `c.increment()` → In ra 3
  - `c.decrement()` → In ra 2
  - `c.getCount()` → In ra 2
  Giải thích: Nhờ Closure, các arrow function bên trong vẫn nhớ và thao tác được trên biến `count` của hàm `counter` cha, dù hàm cha đã chạy xong.
- Đoạn 2:
  - `var`: In ra "var: 3" ba lần liên tiếp. (Do `var` có function scope, vòng lặp chạy xong `i=3` rồi mới chạy `setTimeout`, lấy đúng một biến `i` đó).
  - `let`: In ra "let: 0", "let: 1", "let: 2". (Do `let` có block scope, mỗi vòng lặp tạo ra một biến `j` độc lập).

### Câu A3 — Array Methods
```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 1.
nums.filter(n => n % 2 === 0);
// 2.
nums.map(n => n * 3);
// 3.
nums.reduce((sum, n) => sum + n, 0);
// 4.
nums.find(n => n > 7);
// 5.
nums.some(n => n > 10);
// 6.
nums.every(n => n > 0);
// 7.
nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);
// 8.
[...nums].reverse(); // Hoặc nums.toReversed() (bản JS mới)
```

### Câu A4 — Object Destructuring & Spread
- `console.log(name, price, ram, color);` → `iPhone 16 25990000 8 Titan`
- `console.log(specs);` → **Lỗi `ReferenceError`**. (Vì cú pháp nested destructuring `specs: {ram, color}` chỉ giải nén bên trong, không tạo ra biến `specs`).
- `console.log(updated.price);` → `23990000` (Ghi đè giá trị mới).
- `console.log(updated.sale);` → `true`
- `console.log(product.price);` → `25990000` (Bản gốc KHÔNG đổi, do `...` tạo bản sao).
- Spread gotcha: `copy.specs.ram = 16`.
  - `console.log(product.specs.ram);` → **16**. 
  - Tại sao? Toán tử `...` chỉ là **Shallow Copy** (copy nông). Nó tạo bản sao cho thuộc tính lớp ngoài (`name`, `price`), nhưng với object con (`specs`), nó chỉ copy "địa chỉ tham chiếu". Nên khi sửa `copy.specs`, bản gốc cũng bị ảnh hưởng.

---

## PHẦN C — SUY LUẬN
---
### Câu C1 — Refactor Code (Ugly to Clean)
```javascript
// SAU KHI REFACTOR (Chỉ 6 dòng):
const processOrdersClean = (orders) => orders
    .filter(o => o.status === "completed" && o.total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total, discount: total * 0.1, finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Câu C2 — Thiết kế API (miniArray)
```javascript
const miniArray = {
    map(arr, fn) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    filter(arr, fn) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) result.push(arr[i]);
        }
        return result;
    },
    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        let startIndex = 0;
        
        if (initialValue === undefined) {
            accumulator = arr[0];
            startIndex = 1;
        }
        
        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};
```
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---