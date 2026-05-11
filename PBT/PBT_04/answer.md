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
- Giải thích "nearest positioned ancestor": Là phần tử "tổ tiên" gần nhất trên cây DOM có thuộc tính `position` khác `static`. Thẻ `absolute` sẽ dùng phần tử này làm gốc tọa độ (trục x, y) để căn chỉnh `top`, `bottom`, `left`, `right`.

---

### Câu A2 (10đ) — Flexbox vs Grid — Dự đoán Layout

1. Trường hợp 1:
- Bố cục: 1 hàng ngang duy nhất, chia thành 4 cột có kích thước bằng nhau (do `flex: 1`).
- Sơ đồ bố cục: 
```text
┌─────────┬─────────┬─────────┬─────────┐
│  Item 1 │  Item 2 │  Item 3 │  Item 4 │
└─────────┴─────────┴─────────┴─────────┘
```

2. Trường hợp 2:
- Bố cục: Gồm 3 hàng, mỗi hàng có 2 cột. (Mỗi item chiếm 45% width + 5% margin 2 bên = 50%. Hai item là 100% lấp đầy 1 hàng, item thứ 3 sẽ bị rớt xuống hàng dưới do `flex-wrap: wrap`).
- Sơ đồ bố cục:
```text
┌─────────┬─────────┐
│  Item 1 │  Item 2 │
├─────────┼─────────┤
│  Item 3 │  Item 4 │
├─────────┼─────────┤
│  Item 5 │  Item 6 │
└─────────┴─────────┘
```

3. Trường hợp 3:
- Bố cục: 1 hàng ngang. Item 1 dính sát lề trái, Item 2 ở chính giữa, Item 3 dính sát lề phải. Cả 3 item đều được căn giữa theo chiều dọc.
- Sơ đồ bố cục:
```text
┌───────────────────────────────────────────┐
│ [Item 1]         [Item 2]         [Item 3]│
└───────────────────────────────────────────┘
```

4. Trường hợp 4:
- Bố cục: 1 hàng ngang, 3 cột. Cột trái cố định 200px, cột phải cố định 200px. Cột giữa (1fr) sẽ phình to ra chiếm toàn bộ khoảng trống còn lại. Có khe hở (gap) 20px giữa các cột.
- Sơ đồ bố cục:
```text
┌─────────┬─────────────────────────┬───────┐
│  200px  │      1fr (Co giãn)      │ 200px │
└─────────┴─────────────────────────┴───────┘
```

5. Trường hợp 5:
- Bố cục: Lưới 3 cột có kích thước bằng nhau, khe hở 10px. Tổng cộng có 3 hàng.
  - Hàng 1: 3 items
  - Hàng 2: 3 items
  - Hàng 3: 1 item (Item thứ 7 sẽ nằm ở góc dưới cùng bên trái, cột đầu tiên).
- Sơ đồ bố cục:
```text
┌─────────┬─────────┬─────────┐
│  Item 1 │  Item 2 │  Item 3 │
├─────────┼─────────┼─────────┤
│  Item 4 │  Item 5 │  Item 6 │
├─────────┼─────────┼─────────┤
│  Item 7 │ (Trống) │ (Trống) │
└─────────┴─────────┴─────────┘
```
---
---
### PHẦN C — SUY LUẬN 
---
### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

| Tình huống | Công cụ | Giải thích |
|:---|:---|:---|
| 1. Navigation bar ngang | **Flexbox** | Đây là bố cục 1 chiều (hàng ngang). Flexbox giúp căn giữa các mục theo chiều dọc (`align-items: center`) và phân bổ khoảng cách (`justify-content`) cực kỳ linh hoạt. |
| 2. Lưới ảnh Instagram | **Grid** | Đây là bố cục 2 chiều (hàng và cột) cố định. Grid giúp tạo 3 cột đều nhau (`repeat(3, 1fr)`) rất nhanh và tự động quản lý các hàng khi số lượng ảnh tăng lên. |
| 3. Layout blog (Main + Sidebar) | **Grid** | Phù hợp để xây dựng khung sườn lớn (macro-layout) cho trang web. Grid cho phép định nghĩa các vùng diện tích (`grid-template-areas`) rõ ràng cho Content và Sidebar. |
| 4. Footer 4 cột thông tin | **Grid** | Grid giúp chia trang thành 4 cột bằng nhau một cách tuyệt đối, đảm bảo tính thẩm mỹ và đồng nhất ngay cả khi nội dung bên trong các cột có độ dài khác nhau. |
| 5. Card sản phẩm (nút dính đáy) | **Flexbox** | Bố cục 1 chiều (theo cột dọc). Khi dùng `flex-direction: column`, thuộc tính `margin-top: auto` cho nút bấm sẽ giúp nó luôn "dính" chặt ở đáy card bất kể phần text phía trên dài hay ngắn. |

---

### Câu C2 (10đ) — Debug Flexbox

1. Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
- Nguyên nhân: Mặc dù container dùng flex làm các card có chiều cao bằng nhau, nhưng nội dung bên trong card vẫn theo luồng mặc định. Nếu tên sản phẩm quá dài hoặc quá ngắn, nút bấm sẽ bị đẩy đi lệch hàng.
- Cách sửa: Biến chính thẻ `.card` thành một Flex container theo chiều dọc và dùng `margin-top: auto` cho nút bấm.
- Code sửa:
```css
.card {
    display: flex;
    flex-direction: column;
}
.card .btn {
    margin-top: auto;
}
```
2. Lỗi 2: Items không nằm giữa dù đã dùng flex
- Nguyên nhân: Thuộc tính `display: flex` mới chỉ khởi tạo môi trường. Để căn giữa cả ngang và dọc cho phần tử con trong không gian `100vh`, cần thêm các lệnh điều hướng trục.
- Cách sửa: Sử dụng `justify-content` để căn giữa theo trục ngang và `align-items` để căn giữa theo trục dọc.
- Code sửa:
```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

3. Lỗi 3: Sidebar bị co lại khi content quá dài
- Nguyên nhân: Mặc định các phần tử con trong Flexbox có `flex-shrink: 1`, khiến chúng tự co lại để nhường chỗ khi phần nội dung chính (content) quá lớn.
- Cách sửa: Cấm sidebar co lại bằng cách thiết lập `flex-shrink: 0`.
- Code sửa:
```css
.sidebar {
    width: 250px;
    flex-shrink: 0;
}
```
---
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
