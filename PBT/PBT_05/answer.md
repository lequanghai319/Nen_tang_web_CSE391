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
## PHẦN B - THỰC HÀNH CODE 
---
### Câu B3 
* Lệnh compile SCSS: sass scss/style.scss style.css
---
## PHẦN C — PHÂN TÍCH
---
### Câu C1 — Phân tích trang web thực (VNExpress)

*(Ảnh chụp màn hình đính kèm trong thư mục `screenshots/`)*

1. Navigation (Thanh điều hướng) thay đổi thế nào?
 * Trên Desktop (1440px): Thanh menu chứa các chuyên mục (Thời sự, Thế giới, Kinh doanh...) trải ngang toàn màn hình. Hiển thị rõ logo to, thanh tìm kiếm và khu vực Đăng nhập.
 * Trên Tablet (768px): Thanh menu ngang bị thu hẹp khoảng cách. Các chuyên mục ít quan trọng hơn bị gom vào nút menu mở rộng (biểu tượng ☰ hoặc "Tất cả").
 * Trên Mobile (375px): Thanh menu chữ ngang biến mất hoàn toàn. Xuất hiện biểu tượng Hamburger menu (☰) ở góc để mở menu dọc. Header được tinh gọn tối đa chỉ còn Logo, icon Tìm kiếm và icon Đăng nhập người dùng.

2. Lưới content (Bố cục nội dung) thay đổi mấy cột?
 * Desktop: Giao diện trang chủ thường chia làm 3 cột (Cột tin chính bản to, cột tin phụ, và cột sidebar bên phải chứa quảng cáo/thông tin phụ).
 * Tablet:** Cấu trúc giảm xuống còn 2 cột. Cột sidebar bên phải thường bị thu hẹp hoặc đẩy xuống dưới để nhường không gian cho tin tức.
 * Mobile: Toàn bộ nội dung chuyển thành lưới 1 cột duy nhất. Các bài báo xếp chồng lên nhau theo chiều dọc trải dài xuống dưới.

**3. Elements (Phần tử) nào bị ẩn trên mobile?**
 * Các banner quảng cáo kích thước lớn ở hai bên lề màn hình bị ẩn hoàn toàn (`display: none`).
 * Đoạn text mô tả ngắn (Sapo) dưới tiêu đề của một số bài báo phụ bị ẩn đi để tiết kiệm diện tích cuộn.
 * Cột Sidebar (chứa bảng giá vàng, chứng khoán, tin xem nhiều) bị đẩy xuống tận dưới cùng của trang hoặc ẩn bớt nội dung.
 * Các danh mục con ở Footer (chân trang) bị thu gọn thành dạng Accordion (danh sách thả xuống, nhấp vào dấu + mới xổ ra).

4. Font size có thay đổi không?
 * Có sự tinh chỉnh. Trên mobile, font chữ của tiêu đề bài báo (Heading) vẫn được giữ kích thước lớn và rõ nét để đảm bảo độ đọc (readability) và dễ dàng dùng ngón tay chạm vào (Touch target). Tuy nhiên, font chữ phần chú thích ảnh hoặc mô tả phụ sẽ được thu nhỏ lại hoặc ẩn đi để tối ưu không gian màn hình hẹp.

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
