# 📄 ĐÁP ÁN PHIẾU BÀI TẬP 07 - JAVASCRIPT BASICS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const
- Đoạn 1: In ra `undefined`. Giải thích: Do cơ chế **Hoisting**, biến `var x` được kéo lên đầu phạm vi nhưng chưa được gán giá trị 5.
- Đoạn 2: Lỗi `ReferenceError`. Giải thích: Biến `let` cũng được hoisting nhưng bị đưa vào vùng "chết tạm thời" (Temporal Dead Zone - TDZ), không thể truy cập trước khi khởi tạo.
- Đoạn 3: Lỗi `TypeError: Assignment to constant variable`. Giải thích: `const` không cho phép gán lại giá trị mới sau khi đã khởi tạo.
- Đoạn 4: In ra `[1, 2, 3, 4]`. Giải thích: Bất ngờ! `const` chỉ bảo vệ "địa chỉ bộ nhớ" của mảng, chứ không bảo vệ các phần tử bên trong mảng. Ta không thể gán `arr = []` nhưng có thể `.push()` hoặc sửa phần tử.
- Đoạn 5: In ra "Trong block: 2" và "Ngoài block: 1". Giải thích: `let` có phạm vi khối (Block scope `{}`). Biến `a` bên trong `{}` là một biến hoàn toàn khác, không đè lên biến `a` bên ngoài.

### Câu A2 — Data Types & Coercion
```javascript
console.log(typeof null);      // "object" (Đây là một lỗi lịch sử nổi tiếng của JS)
console.log(typeof undefined); // "undefined"
console.log(typeof NaN);       // "number" (Not-a-Number nhưng kiểu dữ liệu vẫn là số)
console.log("5" + 3);          // "53"
console.log("5" - 3);          // 2
console.log("5" * "3");        // 15
console.log(true + true);      // 2 (true bị ép kiểu thành 1)
console.log([] + []);          // "" (Chuỗi rỗng)
console.log([] + {});          // "[object Object]"
console.log({} + []);          // "[object Object]"
```
**Tại sao `"5" + 3` và `"5" - 3` khác nhau?**
- Toán tử `+` trong JS vừa dùng để cộng số, vừa dùng để nối chuỗi. Khi thấy có chuỗi `"5"`, JS ưu tiên nối chuỗi nên biến số `3` thành chuỗi `"3"` → `"53"`.
- Toán tử `-` chỉ dùng cho toán học. Do đó JS bắt buộc ép kiểu chuỗi `"5"` thành số `5` rồi thực hiện phép trừ → `2`.

### Câu A3 — So sánh == vs ===
```javascript
console.log(5 == "5");         // true (Chỉ so sánh giá trị)
console.log(5 === "5");        // false (Khác kiểu dữ liệu: number vs string)
console.log(null == undefined);// true
console.log(null === undefined);// false
console.log(NaN == NaN);       // false (NaN không bao giờ bằng chính nó)
console.log(0 == false);       // true
console.log(0 === false);      // false
console.log("" == false);      // true
```
**Quy tắc:** Từ giờ trở đi, LUÔN LUÔN sử dụng `===`. Nó giúp so sánh chặt chẽ cả "Giá trị" và "Kiểu dữ liệu", tránh các lỗi tiềm ẩn do tính năng tự động ép kiểu của JS gây ra.

### Câu A4 — Truthy & Falsy
- **8 giá trị Falsy trong JS:** `false`, `0`, `-0`, `0n` (BigInt), `""` (chuỗi rỗng), `null`, `undefined`, `NaN`.
- **Dự đoán:**
  - `if ("0")` -> Có in (A) vì là chuỗi có độ dài > 0 (Truthy).
  - `if ("")` -> KHÔNG in (B) vì là chuỗi rỗng (Falsy).
  - `if ([])` -> Có in (C) vì mảng (kể cả rỗng) là Object (Truthy).
  - `if ({})` -> Có in (D) vì Object rỗng là Truthy.
  - `if (null)` -> KHÔNG in (E).
  - `if (0)` -> KHÔNG in (F).
  - `if (-1)` -> Có in (G) vì mọi số khác 0 đều là Truthy.
  - `if (" ")` -> Có in (H) vì chuỗi chứa dấu cách có độ dài = 1 (Truthy).

### Câu A5 — Template Literals
```javascript
// Cách 1:
let greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
let url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
let html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

---

## PHẦN C — SUY LUẬN

### Câu C1 — Debug JavaScript
**Các lỗi trong code:**
1. **Lỗi logic hàm ép kiểu ngầm định:** Hàm nhận `"100000"` (String), dùng toán học vẫn chạy nhưng là bad practice. Cần `Number(giaBan)`.
2. **Lỗi gán giá trị trong vòng lặp if:** `if (giaSauGiam = 0)` đang dùng `="` (gán) thay vì `===` (so sánh). Nó gán giá trị 0 và trả về Falsy, nên code miễn phí không bao giờ chạy. Cần sửa thành `if (giaSauGiam === 0)`.
3. **Lỗi xử lý logic return:** Hàm có thể return chuỗi lỗi (String) nếu phần trăm sai, nhưng bên dưới biến `gia2` vẫn nhận chuỗi đó và nối vào "Giá: ", tạo ra "Giá: Phần trăm giảm không hợp lệ". Cần ném lỗi `throw new Error()` hoặc check kỹ khi in ra.
4. **LỖI "ẨN" NGHIÊM TRỌNG (var trong vòng lặp):** - Code: `for (var i = 0; i < 5; i++) { setTimeout(...) }`
   - **Kết quả sai:** In ra "Item 5" năm lần liên tiếp.
   - **Giải thích:** Hàm `setTimeout` chạy bất đồng bộ, đợi 1 giây sau mới chạy. Trong lúc đợi, vòng lặp `for` chạy vèo một cái xong luôn và `var i` biến thành 5. Khi 1 giây trôi qua, 5 cái `setTimeout` cùng thức dậy và lấy giá trị cuối cùng của `i` là 5.
   - **Sửa:** Đổi `var i = 0` thành `let i = 0`. Block scope của `let` sẽ "chốt" giữ lại đúng giá trị của `i` cho từng vòng lặp riêng biệt.
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---