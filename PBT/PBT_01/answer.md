### Câu A1 (5đ) — HTTP & Browser

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

### Câu A2 (5đ) — Semantic HTML
*Nguồn tham chiếu: Chương 04 — PHẦN HIỂN THỊ — Visible Part of HTML*

#### 1. Tại sao trang web bị Google đánh giá SEO thấp? 
- Trang web mẫu mắc lỗi "Div Soup" sử dụng thẻ `<div>` vô nghĩa cho mọi thành phần. 
- Kém SEO: Việc không dùng các thẻ có ý nghĩa khiến cấu trúc trang web trở nên lộn xộn trong mắt Robot tìm kiếm, dẫn đến thứ hạng thấp.Google và các bộ máy tìm kiếm không thể phân biệt được đâu là phần đầu trang, nội dung chính hay chân trang nếu tất cả chỉ là thẻ `div`.

#### 2. Liệt kê 4 lỗi Semantic 

1. Lỗi 1 (Header): Sử dụng `<div class="header">` thay vì thẻ `<header>`.
2. Lỗi 2 (Navigation): Sử dụng `<div class="menu">` thay vì thẻ `<nav>` cho phần điều hướng.
3. Lỗi 3 (Main Content): Sử dụng `<div class="main">` thay vì thẻ `<main>` để chứa nội dung cốt lõi.
4. Lỗi 4 (Article/Product): Sử dụng `<div class="product">` cho một đơn vị nội dung độc lập thay vì dùng thẻ `<article>`.

#### 3. Đoạn mã đã sửa lại 
```html
<!-- Cấu trúc chuẩn giúp Google hiểu rõ website của bạn -->

<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h2 class="title">iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <figure class="image">
            <img src="iphone.jpg" alt="Hình ảnh iPhone 16 Pro" loading="lazy">
            <figcaption>iPhone 16 Pro - Đỉnh cao công nghệ</figcaption>
        </figure>
    </article>
</main>

<footer>© 2026 ShopTLU</footer>