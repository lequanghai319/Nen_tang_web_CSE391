### TRACK A (BOOTSTRAP 5)
---
## PHẦN A — ĐỌC HIỂU

### Câu A1 — Grid System
1. Bảng phân tích Layout:

| Kích thước | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
|------------|-------------------|-------------------------|-------------------|
| Số cột     | 1 cột             | 2 cột                   | 4 cột             |
| Box layout | Xếp chồng dọc     | Lưới 2x2                | Nằm ngang 1 hàng  |

2. Câu hỏi thêm:
* `col-md-6` nghĩa là: Bắt đầu từ mốc màn hình `md` (≥ 768px), phần tử này sẽ chiếm 6/12 phần của lưới (tương đương 50% chiều rộng).
* **Tại sao không cần viết `col-sm-12`?** Vì Bootstrap thiết kế theo chuẩn Mobile-First. Class `col-12` (chiếm 100% chiều rộng) sẽ mặc định áp dụng cho TẤT CẢ các kích thước màn hình từ nhỏ nhất (0px) hất lên, cho đến khi nó gặp điểm neo lớn hơn (như `md` hay `lg`) để thay đổi. Do đó, mốc `sm` đã tự động được thừa hưởng thuộc tính từ `col-12` rồi.

### Câu A2 — Utilities & Components
1. Giải thích class `d-none d-md-block`:
   * `d-none`: Ẩn phần tử (display: none) mặc định trên mọi màn hình (bắt đầu từ mobile).
   * `d-md-block`: Hiển thị phần tử dưới dạng block (display: block) bắt đầu từ màn hình `md` (≥ 768px) trở lên.
   * => **Tóm lại:** Element này sẽ BỊ ẨN trên điện thoại và HIỆN RA trên máy tính bảng/PC.

2. 5 spacing utilities thường dùng:
   * `mt-3`: margin-top cỡ 3 (khoảng 1rem = 16px).
   * `px-4`: padding-left và padding-right cỡ 4 (khoảng 1.5rem = 24px).
   * `mb-auto`: margin-bottom được set tự động (auto), thường dùng trong flexbox để đẩy phần tử khác ra xa.
   * `pt-0`: padding-top bằng 0 (xóa khoảng trống bên trên).
   * `mx-auto`: margin-left và right là auto (dùng để căn giữa một khối block).

3. Sự khác nhau giữa các loại Container:
   * `.container`: Có chiều rộng tối đa (max-width) cố định, thay đổi giật cấp theo từng breakpoint. Luôn có khoảng lề 2 bên ở màn hình lớn.
   * `.container-fluid`: Chiếm trọn 100% chiều rộng màn hình ở MỌI kích thước (không có lề).
   * `.container-md`: Chiếm 100% chiều rộng ở các màn hình nhỏ hơn `md` (điện thoại), nhưng từ `md` trở lên sẽ bắt đầu co lại và hoạt động giống hệt `.container` bình thường.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Tùy biến Bootstrap
1. Quy trình đổi màu `$primary` sang `#E63946`:
   * **Công cụ cần thiết:** Cần cài đặt SASS (thông qua Node.js hoặc extension Live Sass Compiler).
   * **Modify file:** Tạo một file `custom.scss` riêng. Trong file này, bạn định nghĩa biến `$primary: #E63946;` **TRƯỚC KHI** `@import` file `bootstrap.scss` gốc vào. Trình biên dịch sẽ ghi đè màu xanh mặc định thành màu đỏ của bạn.
2. Tại sao KHÔNG NÊN override `.btn-primary { background: red; }` trực tiếp?
   * Nếu chỉ override `.btn-primary`, các thành phần khác dùng chung màu chính (như text-primary, bg-primary, border-primary, alert-primary) sẽ không tự động đổi màu theo. Dẫn đến giao diện thiếu đồng nhất. Thay đổi bằng SASS Variable `$primary` sẽ giúp tự động cập nhật hàng loạt mã màu này trên toàn bộ hệ thống Bootstrap.

### Câu C2 — So sánh Bootstrap và CSS thuần
* Số dòng CSS: CSS thuần cần viết rất nhiều (khoảng 50-100 dòng cho 1 cái card và navbar). Bootstrap thì cần 0 dòng CSS custom, chỉ cần gõ tên class vào HTML.
* Thời gian phát triển: Bootstrap nhanh hơn gấp nhiều lần nhờ các component dựng sẵn (như Modal, Navbar).
* Khả năng tùy biến: CSS thuần tùy biến tự do 100%. Bootstrap thì bị gò bó trong bộ khung thiết kế có sẵn, nếu muốn khác biệt hẳn phải can thiệp bằng SASS khá phức tạp.
* Khi nào NÊN dùng Bootstrap: Khi làm các trang Admin Dashboard, Prototype chạy deadline gấp, hoặc làm việc trong team backend cần dựng giao diện nhanh mà không muốn code CSS.
* Khi nào KHÔNG NÊN: Khi dự án yêu cầu một giao diện UI/UX cực kỳ độc đáo, pixel-perfect theo bản thiết kế Figma đặc biệt không tuân theo hệ thống lưới tiêu chuẩn.
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
