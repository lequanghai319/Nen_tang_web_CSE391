### PHẦN A — KIỂM TRA ĐỌC HIỂU
---
### Câu A1 — Viewport & Mobile-First
1. Thẻ `<meta viewport>` chuẩn:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
* width=device-width: Thiết lập chiều rộng trang web bằng đúng chiều rộng vật lý của màn hình thiết bị.
* initial-scale=1.0: Đặt mức độ thu phóng ban đầu là 100% khi trang vừa tải xong.

2. Nếu thiếu thẻ này: Trình duyệt trên điện thoại sẽ mặc định render trang web ở kích thước của màn hình máy tính (khoảng 980px), sau đó thu nhỏ toàn bộ trang lại để nhét vừa vào màn hình điện thoại. Chữ và nội dung sẽ rất bé, người dùng phải tự zoom lên mới đọc được.

3. Mobile-First vs Desktop-First:
* Mobile-First: Viết CSS mặc định cho màn hình nhỏ nhất (Mobile) trước, sau đó dùng `@media (min-width: ...)` để bổ sung giao diện cho màn hình lớn hơn.
* Desktop-First: Viết CSS mặc định cho màn hình to (PC) trước, sau đó dùng `@media (max-width: ...)` để "bóp" giao diện lại cho màn hình nhỏ.

*Ví dụ CSS breakpoint 768px:*
```css
.box { width: 100%; } 
@media (min-width: 768px) { .box { width: 50%; } }
.box { width: 50%; } 
@media (max-width: 767.98px) { .box { width: 100%; } }
```
* Tại sao khuyên dùng Mobile-First? Vì điện thoại có phần cứng và mạng yếu hơn PC. Cách này giúp điện thoại chỉ cần tải đoạn CSS nhẹ gọn mặc định mà không phải xử lý các khối CSS đồ sộ của PC, giúp tăng tốc độ tải trang đáng kể.

---

### Câu A2 — Breakpoints (Chuẩn Bootstrap 5)
* `< 576px`: Điện thoại dọc (Mobile). Lưới: 1 cột.
* `≥ 576px`: Điện thoại ngang (Landscape). Lưới: 1 hoặc 2 cột.
* `≥ 768px`: Máy tính bảng (Tablet/iPad). Lưới: 2 hoặc 3 cột.
* `≥ 992px`: Máy tính xách tay (Laptop/Desktop). Lưới: 3 hoặc 4 cột.
* `≥ 1200px`: Màn hình lớn (Large Desktop). Lưới: 4 hoặc 5 cột.

---

### Câu A3 — Media Queries

| Chiều rộng màn hình | `.container` width | Giải thích |
|---------------------|--------------------|------------|
| 375px (iPhone SE)   | **100%** | Chưa đạt mốc `min-width: 576px` |
| 600px               | **540px** | Nằm trong khoảng 576px đến < 768px |
| 800px               | **720px** | Nằm trong khoảng 768px đến < 992px |
| 1000px              | **960px** | Nằm trong khoảng 992px đến < 1200px |
| 1400px              | **1140px**| Lớn hơn mốc 1200px |

---

### Câu A4 — SCSS Basics
1. Variables: Cho phép lưu trữ các giá trị (màu sắc, font chữ) vào các biến để tái sử dụng.
Ví dụ: `$primary-color: #ff0000;`

2. Nesting: Cho phép viết CSS lồng nhau theo cấu trúc HTML, giúp code gọn gàng.
Ví dụ: `.nav { ul { margin: 0; } }`

3. Mixins: Gom một nhóm các thuộc tính CSS lại thành một block có thể gọi lại nhiều lần, có thể truyền tham số.
Ví dụ: `@mixin flex-center { display: flex; justify-content: center; align-items: center; }`

4. `@extend` / Inheritance: Cho phép một class kế thừa toàn bộ thuộc tính của một class khác.
Ví dụ: `.btn-danger { @extend .btn; background: red; }`

* Tại sao trình duyệt KHÔNG đọc được file `.scss`?
Trình duyệt chỉ được lập trình để đọc ngôn ngữ CSS thuần. SCSS là một ngôn ngữ tiền xử lý (preprocessor). Cần một công cụ biên dịch (như Live Sass Compiler) để dịch file `.scss` sang file `.css` thì trang web mới chạy được.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Phân tích trang web thực (VNExpress)
*(Ảnh chụp màn hình nằm trong folder `screenshots/`)*
1. **Mobile (375px):** Thanh điều hướng rút gọn thành các Icon, không có menu chữ. Lưới sản phẩm hiện 2 cột. Các banner quảng cáo hai bên lề bị ẩn hoàn toàn (`display: none`). Kích thước chữ nhỏ hơn.
2. **Tablet (768px):** Navbar xuất hiện thêm thanh tìm kiếm lớn hơn, lưới sản phẩm bung ra 3-4 cột tùy thiết bị.
3. **Desktop (1440px):** Menu Navbar hiển thị đầy đủ text, thanh tìm kiếm chiếm đa số diện tích. Lưới sản phẩm hiển thị 6 cột. Banner quảng cáo hai bên lề xuất hiện.

### Câu C2 — Thiết kế Responsive Strategy (Nhà hàng)
- Wireframe Layout Strategy:
 * Mobile: Menu ẩn vào hamburger icon. Hero image tập trung vào giữa. Lưới 6 ảnh xếp 1 cột dọc. Form đặt bàn xếp dọc (Ngày -> Giờ -> Người). Bản đồ Google Maps nằm dưới cùng.
 * Tablet: Grid ảnh chia 2 cột (3 hàng). Form đặt bàn chia 2 ô ngang (Ngày và Giờ nằm cùng một dòng).
 * Desktop: Grid ảnh 3 cột (2 hàng). Bố cục chia đôi: Form đặt bàn nằm bên trái (60% width), Maps nằm bên phải (40% width). Có thể xuất hiện thêm Sidebar thông tin liên hệ.

CSS Skeleton 
1. Mobile:
```css
.layout-container { display: grid; grid-template-columns: 1fr; gap: 20px; }
.header-nav { display: none; } 
.hamburger { display: block; }
.food-grid { display: grid; grid-template-columns: 1fr; }
```
2. Tablet:
```css
@media (min-width: 768px) {
    .food-grid { grid-template-columns: repeat(2, 1fr); }
    .booking-form { display: grid; grid-template-columns: 1fr 1fr; }
}
```
3. Desktop:
```css
@media (min-width: 1024px) {
    .header-nav { display: flex; }
    .hamburger { display: none; }
    .food-grid { grid-template-columns: repeat(3, 1fr); }
    .layout-container { grid-template-columns: 60% 40%; } 
}
```
---
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
