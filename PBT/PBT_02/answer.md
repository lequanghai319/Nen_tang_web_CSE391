### PHẦN A — KIỂM TRA ĐỌC HIỂU
---
### Câu A1 — Input Types
Liệt kê 10 input types khác nhau trong HTML5:

1. type="email" → Ô nhập text, tự động kiểm tra định dạng có @ → Dùng cho ô nhập email đăng ký.
2. type="text" → Ô nhập chữ cơ bản, kiểm tra qua minlength, maxlength, pattern → Dùng cho họ và tên.
3. type="password" → Ô nhập text bị ẩn ký tự (dấu chấm tròn), kiểm tra qua minlength, pattern → Dùng cho ô nhập mật khẩu.
4. type="number" → Ô nhập số có nút tăng/giảm ở đuôi, kiểm tra min, max, step → Dùng cho ô chọn số lượng sản phẩm.
5. type="tel" → Gọi bàn phím số trên mobile, kiểm tra qua pattern → Dùng cho ô nhập số điện thoại.
6. type="date" → Mở popup chọn lịch (date picker), kiểm tra min, max → Dùng cho ô nhập ngày sinh hoặc ngày nhận hàng.
7. type="color" → Mở bảng màu (color picker) → Dùng cho ô chọn màu sắc sản phẩm yêu thích.
8. type="range" → Thanh trượt (slider), kiểm tra min, max, step → Dùng cho thanh kéo chọn khoảng giá.
9. type="file" → Nút bấm để chọn file từ máy tính, kiểm tra qua accept, multiple → Dùng cho phần upload avatar hoặc ảnh đánh giá.
10. type="url" → Ô nhập text, tự động kiểm tra định dạng link có http:// hoặc https:// → Dùng cho ô nhập link Facebook/Website cá nhân.
---
### Câu A2 — Validation Attributes
* TH 1: Trình duyệt chặn submit, báo lỗi yêu cầu điền thông tin vì có thuộc tính required nhưng giá trị đang rỗng.
* TH 2: Trình duyệt chặn submit, báo lỗi định dạng email không hợp lệ do thiếu ký tự @ (vì value="abc" không phải email).
* TH 3: Trình duyệt chặn submit, báo lỗi giá trị phải nhỏ hơn hoặc bằng 10 (do max="10" nhưng value="15").
* TH 4: Trình duyệt chặn submit, báo lỗi dữ liệu không khớp với định dạng yêu cầu (do pattern="[0-9]{10}" chỉ nhận 10 chữ số, nhưng user gõ chữ "abc").
* TH 5: Trình duyệt chặn submit, báo lỗi yêu cầu kéo dài ký tự thành tối thiểu 8 ký tự (do minlength="8" nhưng user mới gõ 3).
---
### Câu A3 — Accessibility
1. `<label for="email">` quan trọng vì nó giúp liên kết đoạn chữ mô tả với ô input tương ứng. Khi người khiếm thị dùng Screen Reader, máy sẽ đọc "Email" để họ biết cần nhập gì.
2. Dùng `<fieldset> + <legend>` khi cần gom nhóm nhiều input có chung một chủ đề để form rõ ràng hơn.
3. aria-label dùng khi thẻ `<button>` hoặc `<input>` không có chữ hiển thị trên màn hình mà chỉ có icon. KHÔNG nên dùng khi đã có `<label>` vì trình đọc màn hình sẽ đọc hai lần, gây khó chịu và trùng lặp cho người dùng.
---
### Câu A4 — Media
1. loading="lazy": thuộc tính này làm chỉ tải hình ảnh khi người dùng lướt tới gần vị trí ảnh. Cải thiện tốc độ tải trang. KHÔNG nên dùng cho các bức ảnh lớn nằm ngay trên cùng màn hình (banner, hero image).
2. Nhiều `<source>` trong `<video>`: Để dự phòng các trình duyệt khác nhau hỗ trợ các định dạng video khác nhau. Nếu trình duyệt không đọc được source 1, nó sẽ tự đọc source 2,...
    * Ba format phổ biến: mp4, webm, ogg.

3. Thuộc tính alt: dùng để cung cấp văn bản thay thế cho hình ảnh khi ảnh không tải được.
* 3 VD alt tốt:
    * iPhone 16: 
       * alt="Điện thoại iPhone 16 Pro màu Tims"
    * Ảnh trang trí: 
       * alt="" (Để rỗng để screen reader bỏ qua, không đọc rác).
    * Biểu đồ: 
       * alt="Biểu đồ cột biểu diễn doanh thu Quý 1 năm 2026 tăng trưởng 20% so với cùng kỳ"
---
### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`
*   Cách 1 (`<img>`): Dùng khi hình ảnh chỉ mang tính chất minh họa thông thường, nằm xen kẽ trong văn bản hoặc không cần chú thích đi kèm. 
    *   VD1: Logo website trên thanh điều hướng.
    *   VD2: Ảnh icon nhỏ (như icon giỏ hàng, user).
*   Cách 2 (`<figure>`): Dùng khi hình ảnh là một khối nội dung độc lập, có ý nghĩa riêng và cần đi kèm dòng chú thích (`<figcaption>`) giải nghĩa cho nó. 
    *   VD1: Ảnh chi tiết của một sản phẩm có ghi rõ tên và giá ngay bên dưới.
    *   VD2: Biểu đồ doanh thu tài chính cần có ghi chú tên biểu đồ.
---
---
### PHẦN C — SUY LUẬN 
---
## Câu C1 - Debug form
1. Lỗi 1: Dòng 2 — Input "Tên" không có <label> đúng chuẩn (chỉ là text thuần),thiếu id, name, required — vi phạm accessibility và validation
Sửa:
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required placeholder="Nguyễn Văn A">

2. Lỗi 2: Dòng 3 — Input email thiếu <label>, thiếu id, name, required
Sửa:
<label for="email">Email:</label>
<input type="email" id="email" name="email" required placeholder="Email của bạn">

3. Lỗi 3: Dòng 4 — Input password thiếu <label>, thiếu id, name, required, minlength
Sửa:
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" required minlength="8"placeholder="Mật khẩu">

4. Lỗi 4: Dòng 5 — Input confirm password thiếu <label>, thiếu id, name
Sửa:
<label for="confirm-password">Nhập lại mật khẩu:</label>
<input type="password" id="confirm-password" name="confirm_password" required minlength="8" placeholder="Nhập lại mật khẩu">

5. Lỗi 5: Dòng 6 — Input phone dùng type="text" thay vì type="tel", thiếu <label>, thiếu id, name, pattern (value="..." không phải placeholder — dữ liệu sẽ được gửi luôn)
Sửa:
<label for="phone">Số điện thoại:</label>
<input type="tel" id="phone" name="phone" required pattern="[0-9]{10}" placeholder="0901234567">

6. Lỗi 6: Dòng 7-10 — <select> thiếu <label>, thiếu id, name,các <option> thiếu value attribute
Sửa:
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
    <option value="">-- Chọn thành phố --</option>
    <option value="hanoi">Hà Nội</option>
    <option value="hcm">TP.HCM</option>
</select>

7. Lỗi 7: Dòng 11 — <label> không có <input type="checkbox"> bên trong hoặc liên kết for/id — label không có tác dụng, thiếu required
Sửa:
<label>
    <input type="checkbox" name="agree" required>
    Tôi đồng ý điều khoản
</label>

8. Lỗi 8: Dòng 13 — Dùng <input type="submit"> thay vì <button type="submit">(best practice hiện đại nên dùng <button> để dễ style hơn ngoài ra <form> thiếu action và method
Sửa:
<form action="#" method="POST">
...
<button type="submit">Gửi</button>

---
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
