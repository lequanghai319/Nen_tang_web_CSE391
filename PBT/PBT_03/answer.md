### PHẦN A — KIỂM TRA ĐỌC HIỂU
---
### Câu A1 — 3 Cách nhúng CSS

1. Inline CSS (Nhúng trực tiếp vào thẻ HTML)
- Ví dụ: `<h1 style="color: red; font-size: 20px;">Tiêu đề</h1>`
- Ưu điểm: Áp dụng nhanh, độ ưu tiên (specificity) rất cao (chỉ thua `!important`).
- Nhược điểm: Khó bảo trì, code HTML bị rối, không tái sử dụng được cho các thẻ khác.
- Khi nào nên dùng: Khi cần ghi đè CSS khẩn cấp cho một phần tử duy nhất hoặc test code nhanh.

2. Internal CSS (Nhúng trong thẻ `<style>` ở `<head>`)
- Ví dụ:
  ```html
  <head>
      <style> h1 { color: blue; } </style>
  </head>

- Ưu điểm: Gom code CSS về một chỗ trong file, dễ quản lý hơn Inline.
- Nhược điểm: Làm nặng file HTML, không chia sẻ được style cho các trang web (file HTML) khác.
- Khi nào nên dùng: Cho các trang web đơn giản chỉ có 1 file HTML duy nhất (như landing page tĩnh gọn nhẹ).

3. External CSS (Liên kết file `.css` bên ngoài)
- Ví dụ: `<link rel="stylesheet" href="style.css">`
- Ưu điểm: Tách biệt hoàn toàn giao diện và nội dung. Một file CSS dùng được cho hàng trăm trang HTML. Trình duyệt có thể lưu cache giúp tải trang web nhanh hơn ở những lần sau.
- Nhược điểm: Tốn thêm 1 request tải file từ server.
- Khi nào nên dùng: Luôn luôn khuyên dùng trong các dự án thực tế.

* câu hỏi thêm:** Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, Inline CSS sẽ "thắng". 
- Giải thích: Theo quy tắc Cascade (Xếp tầng) và Specificity (Độ ưu tiên) của CSS, Inline style được viết trực tiếp lên thẻ HTML nên có trọng số cao nhất (1,0,0,0), đánh bại cả Internal và External CSS (trừ khi có thẻ nào đó dùng `!important`).
---
### Câu A2 — CSS Selectors — Dự đoán kết quả

1. `h1` → Chọn: ShopTLU
2. `.price` → Chọn: 25.990.000đ, 45.990.000đ
3. `#app header` → Chọn: Toàn bộ khối chứa text "ShopTLU", "Home", "Products", "About"
4. `nav a:first-child` → Chọn: Home
5. `.product.featured h2` → Chọn: MacBook Pro
6. `article > p` → Chọn: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, Mô tả sản phẩm... (Tất cả thẻ p là con trực tiếp của article).
7. `a[href="/"]` → Chọn: Home
8. `.top-bar.dark h1` → Chọn: ShopTLU

---

### Câu A3 — Box Model — Tính toán kích thước

* Trường hợp 1: content-box (mặc định)
  - Chiều rộng hiển thị (Visible width) = 400 + (20 * 2) + (5 * 2) = 450px
  - Không gian chiếm trên trang (Total space) = 450 + (10 * 2) = 470px

* Trường hợp 2: border-box
  - Chiều rộng hiển thị (Visible width) = 400px
  - Kích thước content thực tế = 400 - (20 * 2) - (5 * 2) = 350px
  - Không gian chiếm trên trang = 400 + (10 * 2) = 420px

* Trường hợp 3: Margin collapse
  - Khoảng cách giữa box-a và box-b = 40p
  - Giải thích: Các khối block nằm liền kề nhau theo chiều dọc sẽ bị hiện tượng gộp margin (Margin collapse). Trình duyệt không cộng tổng hai margin lại mà sẽ lấy giá trị margin nào lớn hơn (trong trường hợp này là 40px lớn hơn 25px).
  - Nâng cao: Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`, khoảng cách sẽ được tính bằng phép cộng đại số: 40 + (-10) = 30px.

---

### Câu A4 — Specificity (Độ ưu tiên)

1. Tính specificity score:
   - Rule A (`p`): 0,0,1 (1 element)
   - Rule B (`.price`): 0,1,0 (1 class)
   - Rule C (`#main-price`): 1,0,0 (1 id)
   - Rule D (`p.price`): 0,1,1 (1 class + 1 element)

2. Element sẽ có màu đỏ (red).
   - Giải thích: Selector `#main-price` (Rule C) sử dụng ID, mang điểm Specificity cao nhất (1,0,0) nên sẽ ghi đè tất cả các rule còn lại.

3. Nếu thêm `style="color: orange;"`, element sẽ có màu cam (orange). (Vì Inline style luôn thắng Selector thông thường).

4. Nếu Rule A thêm `!important`, element sẽ có màu đen (black). 
   - Giải thích: Từ khóa `!important` có quyền lực cao nhất, phá vỡ mọi quy tắc Specificity thông thường và ép trình duyệt phải ưu tiên thuộc tính đó.
---
---
## PHẦN B — THỰC HÀNH CODE (Ghi chú đáp án)
---
### Bài B2 — Box Model Lab (Phần 1)
- Hộp 1 (content-box): chiều rộng hiển thị thực tế = 350px (300 + 20*2 + 5*2)
- Hộp 2 (border-box): chiều rộng hiển thị thực tế = 300px - Giải thích sự khác biệt: 
- `content-box` chỉ gán kích thước 300px cho phần content lõi bên trong. Khi thêm padding và border, nó sẽ cộng dồn ra ngoài làm hộp phình to lên.
- `border-box` gán kích thước 300px cho tổng thể toàn bộ hộp. Khi thêm padding và border, nó sẽ tự động bóp nhỏ phần content lõi bên trong lại để giữ nguyên tổng kích thước không đổi.
---
### Bài B3 — Specificity Battle
1. Danh sách 10 Rules (Từ thấp đến cao):
  ```css
  * { color: black; }                         /* Score: 0,0,0 */
  p { color: gray; }                          /* Score: 0,0,1 */
  .text { color: yellow; }                    /* Score: 0,1,0 */
  p.text { color: orange; }                   /* Score: 0,1,1 */
  .highlight { color: pink; }               /* Score: 0,1,0 (Thắng .text do viếtsau) */
  p.text.highlight { color: purple; }         /* Score: 0,2,1 */
  #demo { color: blue; }                      /* Score: 1,0,0 */
  p#demo { color: navy; }                     /* Score: 1,0,1 */
  #demo.text.highlight { color: red; }        /* Score: 1,2,0 */
  p#demo.text.highlight { color: darkred; }   /* Score: 1,2,1 */
  ```

2. Element cuối cùng hiển thị màu darkred. Tại sao? Vì Rule số 10 có điểm Specificity cao nhất (1 id, 2 class, 1 element).
3. (Screenshot lưu riêng ở ngoài)
4. Nếu thay đổi thứ tự rules trong file CSS, kết quả  không đổi (trừ phi đổi chỗ rule 3 và 5 có cùng điểm số). Các rule khác có điểm Specificity khác nhau nên trình duyệt ưu tiên tuyệt đối dựa trên điểm số trước, không quan tâm thứ tự viết trên dưới.
---
---
### PHẦN C — SUY LUẬN 
---
### Câu C1 — Debug CSS Layout

1. Chiều rộng thực tế (content-box):
   - Sidebar = 300 (width) + 40 (padding) + 2 (border) = 342px
   - Content = 660 (width) + 60 (padding) + 2 (border) = 722px

2. Tại sao layout bị vỡ:
   Tổng chiều rộng thực tế của hai khối khi nằm ngang là `342px + 722px = 1064px`. Con số này vượt quá kích thước của `.container` chứa nó (chỉ có `960px`). Do không đủ khoảng trống chiều ngang, khối content bị đẩy rớt xuống dòng dưới.

3. Hai cách sửa:
   - Cách 1 (Tốt nhất): Thêm thuộc tính `box-sizing: border-box;` vào `.sidebar` và `.content` để trình duyệt tự động ép kích thước tổng không bị phình ra do padding/border.
   - Cách 2 (Sửa thủ công): Tính toán và giảm width của `.sidebar` xuống `258px` (300 - 42) và `.content` xuống `598px` (660 - 62).

---

### Câu C2 — Cascade Puzzle

1. "Sản phẩm A" (h2): `font-size` = **20px** (Lấy từ `.card .title`), `color` = green (Lấy từ `.highlight { color: green !important; }`, từ khóa `!important` đánh bại cả ID `#featured`).
2. "Mô tả sản phẩm" (p trong card featured): `color` = blue. 
   - Giải thích: Thẻ p có `color: inherit`, nên nó sẽ kế thừa màu từ thẻ cha bọc nó là thẻ `div.card` (Màu xanh blue). Thẻ `<div id="featured">` có rule màu red, nhưng rule đó chỉ target trực tiếp vào class `.title` nên không ảnh hưởng đến thẻ `<p>`.
3. "Sản phẩm B" (h2): `font-size` = 20px (Lấy từ `.card .title`), `color` = #333. 
   - Giải thích: Thẻ heading (`h2`) không tự động thừa kế (inherit) màu chữ từ div cha. Do không có rule nào set màu cụ thể cho thẻ h2 này, nó sẽ lấy màu mặc định được kế thừa từ thẻ `body` là `#333`.
4. "Mô tả sản phẩm B" (p.highlight): `color` = green.
   - Giải thích: Thẻ này có class `highlight`, mà trong file CSS selector `.highlight` có sử dụng thuộc tính `!important` nên nó ép thẻ `p` phải đổi thành màu xanh green bất chấp quy tắc thông thường.
---
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
