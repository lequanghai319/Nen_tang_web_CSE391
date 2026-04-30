### Câu A1 — HTTP & Browser

#### 1. 5 bước xảy ra khi truy cập https://shopee.vn:
1. DNS Lookup: Trình duyệt kiểm tra bộ nhớ đệm (cache) hoặc truy vấn máy chủ DNS để chuyển đổi tên miền `shopee.vn` thành địa chỉ IP của máy chủ.
2. Thiết lập kết nối (TCP & TLS Handshake): Trình duyệt thiết lập kết nối TCP tới server. Vì Shopee sử dụng HTTPS, bước TLS/SSL handshake sẽ diễn ra để mã hóa và bảo mật dữ liệu truyền tải.
3. Gửi HTTP Request: Trình duyệt gửi một HTTP Request (thường là phương thức `GET`) để yêu cầu máy chủ cung cấp nội dung trang chủ.
4. Nhận HTTP Response: Server tiếp nhận, xử lý yêu cầu và trả về HTTP Response bao gồm Status Code (thường là `200 OK`), các thông tin Header và nội dung mã HTML ban đầu.
5. Rendering (Hiển thị): Trình duyệt phân tích HTML tạo DOM Tree, kết hợp với CSS tạo Render Tree, sau đó thực hiện quá trình Layout và Paint để hiển thị giao diện lên màn hình.

#### 2. Tab Network trong DevTools:
* Công dụng: Tab Network cho phép theo dõi toàn bộ quá trình giao tiếp giữa trình duyệt và máy chủ, bao gồm các tệp tin được tải về, trạng thái phản hồi, dung lượng và thời gian tải thực tế của từng tài nguyên.

* Hình ảnh minh họa:
![Hình ảnh minh họa](screenshots/A1.png)

---

### Câu A2 — Semantic HTML

#### 1. Tại sao trang web bị Google đánh giá SEO thấp? 
- Trang web mẫu mắc lỗi "Div Soup" sử dụng thẻ `<div>` vô nghĩa cho mọi thành phần. 
- Kém SEO: Việc không dùng các thẻ có ý nghĩa khiến cấu trúc trang web trở nên lộn xộn trong mắt Robot tìm kiếm, dẫn đến thứ hạng thấp.Google và các bộ máy tìm kiếm không thể phân biệt được đâu là phần đầu trang, nội dung chính hay chân trang nếu tất cả chỉ là thẻ `div`.

#### 2. Liệt kê 4 lỗi Semantic 

1. Lỗi 1 (Header): Sử dụng `<div class="header">` thay vì thẻ `<header>`.
2. Lỗi 2 (Navigation): Sử dụng `<div class="menu">` thay vì thẻ `<nav>` cho phần điều hướng.
3. Lỗi 3 (Main Content): Sử dụng `<div class="main">` thay vì thẻ `<main>` để chứa nội dung chính.
4. Lỗi 4 (Article/Product): Sử dụng `<div class="product">` cho một đơn vị nội dung độc lập thay vì dùng thẻ `<article>`.

#### 3. Đoạn mã đã sửa lại 
```html
<header class="header">
    <div class="logo">ShopTLU</div>
    <nav class="menu">
        <div><a href="/">Trang chủ</a></div>
        <div><a href="/products">Sản phẩm</a></div>
    </nav>
</header>

<main class="main">
    <article class="product">
        <div class="title">iPhone 16 Pro</div>
        <div class="price">25.990.000đ</div>
        <figure class="image">
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </figure>
    </article>
</main>

<footer class="footer">© 2026 ShopTLU</footer>
```
---

#### Câu A3 — Block vs Inline

#### 1. Kết quả hiển thị (Text Art)

Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3

#### 2. Giải thích

* Phần tử Block (`<div>`): sẽ tự động chiếm trọn một hàng ngang và bắt buộc phần tử tiếp theo phải xuống dòng mới. Do đó, Hộp 1, Hộp 2, và Hộp 3 nằm trên 3 dòng riêng biệt.
* Phần tử Inline (`<span>`, `<strong>`): Chúng chỉ chiếm không gian vừa đủ với nội dung và cho phép các phần tử khác nằm cùng hàng. Vì vậy, Text A nằm cạnh Text B, và Text C nằm cạnh Text D.
* Thẻ `<strong>` không chỉ nằm cùng dòng mà còn làm cho Text D hiển thị đậm hơn.

---

### Câu A4 — Table

#### 1. Sự khác nhau giữa `<thead>`, `<tbody>`, và `<tfoot>`

* `<thead>` (Table Header): Dùng để chứa các tiêu đề cột.
* `<tbody>` (Table Body): Đây là phần quan trọng nhất, chứa toàn bộ dữ liệu chính của bảng.
* `<tfoot>` (Table Footer): Dùng để chứa phần ở cuối bảng.

#### 2. Tại sao KHÔNG NÊN dùng table để tạo layout trang web? 

1.  Sai mục đích sử dụng (Semantic): Thẻ `<table>` chỉ được thiết kế để hiển thị dữ liệu dạng bảng (thống kê, so sánh). Dùng nó cho layout làm mất đi tính Semantic của HTML.
2.  Khó làm Responsive: Layout bằng table rất cứng nhắc, cực kỳ khó để hiển thị đẹp mắt trên các thiết bị di động (mobile).
3.  Tốc độ tải trang và SEO: Trình duyệt phải tải toàn bộ nội dung trong table rồi mới hiển thị, làm chậm tốc độ tải trang. Đồng thời, cấu trúc table phức tạp khiến các bộ máy tìm kiếm khó đọc và hiểu nội dung trang web.

---
---

## PHẦN B — THỰC HÀNH CODE

### Câu B3 — Debug HTML

Các lỗi đã được tìm và sửa trong file `debug.html`:

1. Thiếu `html` trong DOCTYPE — Sửa: `<!DOCTYPE html>`.
2. Thiếu thẻ đóng `</title>` — Sửa: Thêm `</title>`.
3. Sai giá trị `utf8` — Sửa: `UTF-8`.
4. Đóng `<h1>` sai cú pháp — Sửa: `</h1>`.
5. Đóng `<a>` sai cú pháp — Sửa: `</a>`.
6. `<img>` thiếu dấu nháy và `alt` — Sửa: `<img src="iphone.jpg" alt="iPhone 16 Pro">`.
7. Sai thứ tự lồng thẻ (Nesting) — Sửa: `<p>Giá: <b>...</b></p>`.
8. Table thiếu `<thead>`, `<tbody>` — Sửa: Thêm thẻ phân đoạn Semantic.
9.  Dùng thẻ `<main>` lần thứ 2 — Sửa: Thay bằng `<aside>`.
10. Thiếu thẻ đóng `</p>` ở footer — Sửa: Thêm `</p>`.

---
### Câu B4 - Phân tích trang web (thegioididong.com)

### 1. Các thẻ semantic HTML5 có thể thấy: 

1. `<header>`: Ở phần trên cùng của trang web, chứa Logo thương hiệu, thanh tìm kiếm và các nút giỏ hàng, tài khoản.
2. `<section>`: Nằm ở phần nội dung giữa trang (Body), dùng để nhóm một khu vực cụ thể như phần giới thiệu dịch vụ hoặc nhóm sản phẩm.
3. `<footer>`: Nằm ở dưới cùng của trang web, chứa các thông tin về tổng đài hỗ trợ, địa chỉ công ty và bản quyền.

### 2. Bảng
1. Nội dung hiển thị:
Table này hiển thị bảng Thông số kỹ thuật chi tiết của sản phẩm
2. Có dùng thead, tbody không:
Có dùng thẻ tbody nhưng không dùng thẻ thead

### 3. Form

1. Form có action: /tim-kiem ,method: GET 
2. Input types được dùng:
    * type="text": Sử dụng ở thẻ `<input>` để người dùng gõ từ khóa cần tìm.

    * type="submit": Sử dụng ở thẻ `<`button>` để tạo nút gửi yêu cầu tìm kiếm.

---
---
### PHẦN C — SUY LUẬN 
---
### Câu C1 - Thiết kế cấu trúc
```html
<header> <!-- Chứa thông tin đầu trang -->
    <nav> <!-- Khu vực điều hướng chính -->
        <ul><li><a href="#">...</a></li></ul>
    </nav>
</header>

<main> <!-- Bọc toàn bộ nội dung chính của trang -->
    <nav aria-label="breadcrumb"> <!-- Điều hướng phân cấp (Breadcrumb) -->
        <ol> <!-- Danh sách có thứ tự vì đường dẫn có tính phân cấp -->
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/iphone-16">iPhone 16</a></li>
        </ol>
    </nav>

    <article> <!-- Nội dung độc lập (toàn bộ thông tin 1 sản phẩm) -->
        <section id="gallery"> <!-- Phân vùng khu vực ảnh -->
            <figure><img src="main.jpg" alt="iPhone 16"></figure> <!-- Ảnh chính -->
            <div class="thumbs">...</div> <!-- Dùng div thuần túy để bọc nhóm ảnh phụ dàn layout -->
        </section>

        <section id="info"> <!-- Phân vùng thông tin sản phẩm -->
            <h1>iPhone 16 Pro</h1> <!-- Tiêu đề quan trọng nhất -->
            <p class="price">25.990.000đ</p> <!-- Đoạn văn bản -->
            <span class="rating">⭐⭐⭐⭐⭐</span> <!-- Thẻ inline bọc nhóm icon -->
        </section>

        <section id="specs"> <!-- Phân vùng thông số -->
            <h2>Thông số kỹ thuật</h2>
            <table>
                <tbody> <!-- Chứa dữ liệu của bảng -->
                    <tr><th>Chip</th><td>A18 Pro</td></tr>
                </tbody>
            </table>
        </section>

        <section id="reviews"> <!-- Phân vùng bình luận -->
            <h2>Đánh giá</h2>
            <article><p>Rất tốt!</p></article> <!-- Dùng article cho 1 bình luận độc lập -->
        </section>
    </article>

    <aside> <!-- Sidebar chứa thông tin phụ trợ, liên quan gián tiếp -->
        <h2>Sản phẩm tương tự</h2>
    </aside>
</main>

<footer> <!-- Phần chân trang -->
    <p>Copyright 2026</p>
</footer>
```
---
### Câu C2 — So sánh & Tranh luận
Quan điểm “dùng `<div>` cho mọi thứ là đủ” chỉ tiện lúc đầu, nhưng về kỹ thuật là kém và không bền. Lý do đầu tiên là SEO: công cụ tìm kiếm không chỉ đọc nội dung chữ mà còn đọc cấu trúc trang. Khi sử dụng các thẻ semantic như `<header>`, `<nav>`, `<main>`, `<article>`, Google hiểu rõ đâu là nội dung chính, đâu là điều hướng, từ đó index chính xác và hiệu quả hơn; trong khi một trang toàn `<div>` khiến bot phải đoán, dễ hiểu sai và làm giảm chất lượng SEO. Lý do thứ hai là **Accessibility**: người khiếm thị sử dụng screen reader không dựa vào class CSS mà dựa vào ý nghĩa của thẻ HTML. Ví dụ `<button>` cho biết có thể bấm, `<nav>` cho biết đây là khu điều hướng, `<main>` cho phép nhảy thẳng vào nội dung chính; nếu mọi thứ đều là `<div>` thì screen reader chỉ đọc như văn bản thường, trải nghiệm người dùng rất kém. Một ví dụ đơn giản là trang blog: mỗi bài viết được bọc trong `<article>`, tiêu đề dùng `<h2>`, nội dung là `<p>`, vừa giúp Google hiểu đây là một bài viết độc lập, vừa giúp người dùng (kể cả người khiếm thị) tiếp cận dễ dàng hơn mà không cần code phức tạp. Tuy nhiên, `<div>` vẫn hoàn toàn phù hợp trong các trường hợp chỉ phục vụ **bố cục giao diện**, như container, grid, flex box hoặc các wrapper để căn chỉnh CSS mà không mang ý nghĩa nội dung. Kết luận ngắn gọn cho sinh viên mới: semantic HTML không hề cao siêu, đó là cách viết HTML đúng chuẩn, giúp code rõ ràng, dễ đọc và dễ bảo trì về lâu dài.

---
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
