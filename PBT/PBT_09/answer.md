## PHẦN A — KIỂM TRA ĐỌC HIỂU
---
### Câu A1 — DOM Tree & querySelector
1. Sơ đồ cây (DOM Tree):
```
div#app
├── header
│   ├── h1 (Todo App)
│   └── nav
│       ├── a.active (All)
│       ├── a (Active)
│       └── a (Completed)
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button (Add)
    └── ul#todoList
        ├── li.todo-item (Learn HTML)
        └── li.todo-item.completed (Learn CSS)
```

2. Các câu lệnh querySelector:
- Chọn thẻ `<h1>`: `document.querySelector('h1')`
- Chọn input trong form: `document.querySelector('#todoForm input')` hoặc `document.querySelector('#todoInput')`
- Chọn tất cả `.todo-item`: `document.querySelectorAll('.todo-item')`
- Chọn link đang active: `document.querySelector('a.active')`
- Chọn `<li>` đầu tiên trong `#todoList`: `document.querySelector('#todoList li:first-child')`
- Chọn tất cả `<a>` bên trong `<nav>`: `document.querySelectorAll('nav a')`

### Câu A2 — innerHTML vs textContent
- Sự khác nhau: `innerHTML` lấy/gán nội dung HTML (nó sẽ biên dịch các thẻ HTML bên trong chuỗi). `textContent` chỉ lấy/gán văn bản thuần túy (bỏ qua mọi thẻ HTML).
- Khi nào dùng: Dùng `innerHTML` khi bạn chủ động muốn render mã HTML được định nghĩa an toàn từ JS. Dùng `textContent` khi bạn muốn hiển thị text người dùng nhập vào để đảm bảo an toàn.
- XSS (Cross-Site Scripting): Nếu dùng `innerHTML` để hiển thị input của người dùng, kẻ gian có thể nhập các đoạn mã độc `<script>` hoặc thuộc tính độc hại. Trình duyệt sẽ hiểu nhầm đó là code web và chạy nó.
- Cách sửa đoạn code:
  `document.querySelector("#result").textContent = userInput;`

### Câu A3 — Event Bubbling
- Khi click vào button, sự kiện sẽ lan truyền từ phần tử con lên phần tử cha (Nổi bọt - Bubbling). Thứ tự output: 
  `BUTTON` -> `INNER` -> `OUTER`
- Nếu uncomment `e.stopPropagation()`, nó sẽ ngăn chặn sự lan truyền này. Output chỉ in ra:
  `BUTTON`

---
## PHẦN C — DEBUG & PHÂN TÍCH
---
### Câu C1 — Debug DOM Code
**7 lỗi sai trong đoạn code:**
1. Lỗi Event: `addEventListener("onclick", ...)` -> Sai cú pháp, phải đổi thành `"click"`.
2. Lỗi gán DOM: `countDisplay = count;` (Nút Reset) -> Ghi đè biến lưu phần tử DOM thành 1 số. Phải sửa thành `countDisplay.textContent = count;`.
3. Lỗi phương thức: `item.remove;` (Nút Clear) -> Thiếu dấu ngoặc, đây là một hàm, phải là `item.remove();`.
4. Lỗi bảo mật/gán rỗng: `historyList.innerHTML = null;` -> Cách viết không chuẩn, nên dùng `historyList.textContent = '';` hoặc `innerHTML = ''`.
5. Lỗi XSS tiềm ẩn: `countDisplay.innerHTML = count;` -> Nên dùng `textContent`.
6. Lỗi kiểu dữ liệu khi Load: `localStorage.getItem("count")` luôn trả về String. Nếu gán lại cho biến `count` thì các phép `+` sau này sẽ biến thành nối chuỗi (VD: "0" + 1 = "01"). Phải parse: `count = Number(localStorage.getItem("count"));`.
7. Lỗi thiết kế (Memory leak): Add event click vào từng thẻ `li` động. Nên dùng Event Delegation gắn event vào `historyList` thay vì từng `li`.

### Câu C2 — Performance
1. **Tại sao bind 1000 events là Bad Practice?** Mỗi event listener chiếm một phần bộ nhớ (RAM). Bind 1000 event sẽ làm trang web nặng, chậm chạp và khó quản lý bộ nhớ khi xóa phần tử (memory leak). 
   **Event Delegation giải quyết:** Chỉ gắn 1 event duy nhất lên thẻ cha (container). Nhờ cơ chế Event Bubbling, khi click vào con, sự kiện nảy lên cha, ta dùng `e.target` để biết chính xác phần tử con nào bị click.
2. **Refactor code bằng DocumentFragment:**
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Thêm vào fragment trong bộ nhớ RAM
}
document.body.appendChild(fragment); // Gắn 1 lần duy nhất vào DOM -> Chỉ reflow 1 lần.
```
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---