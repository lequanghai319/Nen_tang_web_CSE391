### PHẦN A — KIỂM TRA ĐỌC HIỂU
---
### Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|:---|:---|:---|:---|:---|
| `static` | Có | Vị trí mặc định theo luồng HTML | Có | Mặc định của mọi thẻ HTML |
| `relative` | Có | Vị trí hiện tại của chính nó | Có | Tinh chỉnh vị trí nhẹ nhàng, làm khung chứa (container) cho thẻ absolute |
| `absolute` | Không (bị rút khỏi luồng) | Nearest positioned ancestor (Phần tử cha gần nhất có position khác static) | Có | Popup, tooltip, thẻ Badge (ví dụ chữ "HOT" góc sản phẩm) |
| `fixed` | Không | Viewport (Khung hiển thị của trình duyệt) | Không (Đứng im 1 chỗ) | Header cố định trên cùng, Nút cuộn lên đầu trang |
| `sticky` | Có | Vị trí cuộn của Viewport | Vừa có vừa không (Cuộn theo đến 1 điểm rồi dính lại) | Sidebar trượt, Tiêu đề bảng dính khi cuộn |

* Trả lời câu hỏi thêm:
- Khi nào `absolute` tham chiếu `body`? Khi từ nó dò ngược lên các thẻ cha, thẻ ông nội... không có bất kỳ phần tử nào được set thuộc tính `position` (tức là tất cả đều là `static` mặc định). Khi đó nó sẽ lấy mốc tọa độ từ thẻ `<body>` (hoặc `<html>`).
- Khi nào tham chiếu parent? Khi phần tử cha (parent) hoặc ông nội chứa nó được set thuộc tính `position` là `relative`, `absolute`, `fixed`, hoặc `sticky`. (Khuyên dùng `relative` cho thẻ cha).
- Giải thích "nearest positioned ancestor": Là phần tử "tổ tiên" (cha, ông nội, cố...) gần nhất trên cây DOM có thuộc tính `position` khác `static`. Thẻ `absolute` sẽ dùng phần tử này làm gốc tọa độ (trục x, y) để căn chỉnh `top`, `bottom`, `left`, `right`.

---

### Câu A2 (10đ) — Flexbox vs Grid — Dự đoán Layout

* Trường hợp 1:
- Bố cục: 1 hàng ngang duy nhất, chia thành 4 cột có kích thước bằng nhau (do `flex: 1`).
- Sơ đồ text art: 
  `[ Item 1 ] [ Item 2 ] [ Item 3 ] [ Item 4 ]`

* Trường hợp 2:
- Bố cục: Gồm 3 hàng, mỗi hàng có 2 cột. (Mỗi item chiếm 45% width + 5% margin 2 bên = 50%. Hai item là 100% lấp đầy 1 hàng, item thứ 3 sẽ bị rớt xuống hàng dưới do `flex-wrap: wrap`).
- Sơ đồ text art:
  `[ Item 1 ] [ Item 2 ]`
  `[ Item 3 ] [ Item 4 ]`
  `[ Item 5 ] [ Item 6 ]`

* Trường hợp 3:
- Bố cục: 1 hàng ngang. Item 1 dính sát lề trái, Item 2 ở chính giữa, Item 3 dính sát lề phải. Cả 3 item đều được căn giữa theo chiều dọc.
- Sơ đồ text art:
  `[ Item 1 ]                 [ Item 2 ]                 [ Item 3 ]`

* Trường hợp 4:
- Bố cục: 1 hàng ngang, 3 cột. Cột trái cố định 200px, cột phải cố định 200px. Cột giữa (1fr) sẽ phình to ra chiếm toàn bộ khoảng trống còn lại. Có khe hở (gap) 20px giữa các cột.
- Sơ đồ text art:
  `[ 200px ] [========= 1fr (Co giãn) =========] [ 200px ]`

* Trường hợp 5:
- Bố cục: Lưới 3 cột có kích thước bằng nhau, khe hở 10px. Tổng cộng có 3 hàng.
  - Hàng 1: 3 items
  - Hàng 2: 3 items
  - Hàng 3: 1 item (Item thứ 7 sẽ nằm ở góc dưới cùng bên trái, cột đầu tiên).
- Sơ đồ text art:
  `[ Item 1 ] [ Item 2 ] [ Item 3 ]`
  `[ Item 4 ] [ Item 5 ] [ Item 6 ]`
  `[ Item 7 ] [ Trống  ] [ Trống  ]`
---
---
## PHẦN B — THỰC HÀNH CODE (Ghi chú đáp án)
---
---
---
### PHẦN C — SUY LUẬN 
---

---
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
