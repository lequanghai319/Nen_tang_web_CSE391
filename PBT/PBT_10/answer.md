## PHẦN A — KIỂM TRA ĐỌC HIỂU
---

### Câu A1 — Sync vs Async
**Thứ tự output:**
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

Giải thích:
- Synchronous code luôn chạy trước: `1` và `4` được đưa vào Call Stack và in ra ngay.
- Microtask Queue: Các callback của `Promise.resolve().then()` được đưa vào đây. Sau khi code đồng bộ chạy xong, Event Loop ưu tiên dọn sạch Microtask Queue trước. Do đó `3` và `6` được in ra tiếp theo. Trong lúc chạy `6`, nó lại tạo ra một `setTimeout` mới (7) đẩy sang Macrotask.
- Macrotask Queue: Chứa các callback của `setTimeout`. Hai timeout 0ms (số 2 và số 7) sẽ chạy trước, cuối cùng mới đến timeout 100ms (số 5).

### Câu A2 — Fetch API
1. `fetch(...)` trả về một Promise đại diện cho phản hồi của request. Cần dùng `await` để code tạm dừng, chờ cho đến khi tải xong data từ mạng về thì mới chạy tiếp dòng dưới.
2. `response.ok` mang giá trị `false` khi HTTP status code nằm ngoài khoảng 200-299 (nghĩa là request thất bại ở server). 3 mã lỗi phổ biến: `404 Not Found`, `500 Internal Server Error`, `403 Forbidden`.
3. `response.json()` cũng là một tác vụ bất đồng bộ (trả về Promise) vì việc đọc và parse một luồng dữ liệu (stream) lớn từ internet sang object JS tốn thời gian. Do đó cần `await` lần nữa.
4. `try...catch` ở đây bắt được các lỗi: Network error (mất mạng, đứt cáp, sai URL, lỗi CORS) VÀ lỗi do ta chủ động ném ra (`throw new Error`) khi `response.ok` là false. Lưu ý: bản thân hàm `fetch` KHÔNG tự động nhảy vào catch nếu gặp lỗi 404/500, nó chỉ nhảy vào catch khi mất mạng.

### Câu A3 — Promise States & Callback Hell
1. Sơ đồ 3 trạng thái:
[ Pending ] (Đang chờ) 
   ├── Thành công ──> [ Fulfilled ] (Hoàn thành - .then)
   └── Thất bại   ──> [ Rejected ]  (Bị từ chối - .catch)

2. Callback Hell: Là tình trạng các hàm callback bị lồng vào nhau quá nhiều cấp (nested) khi xử lý các tác vụ bất đồng bộ liên tiếp, tạo ra hình kim tự tháp (Pyramid of Doom), khiến code cực kỳ khó đọc và khó maintain.

Ví dụ Callback Hell:
```javascript
getUser(1, function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            console.log(comments);
        });
    });
});
```
Refactor bằng Async/Await:
```javascript
async function fetchUserLikes() {
    try {
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const likes = await getLikes(comments[0].id);
        console.log(likes);
    } catch (error) {
        console.error(error);
    }
}
```
---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Error Handling Strategy
1. Network errors (Mất mạng): Dùng `try...catch`. Fetch sẽ tự động throw error nếu không có mạng. Catch bắt lấy và hiện giao diện báo lỗi "Vui lòng kiểm tra kết nối mạng".
2. API errors (404, 500): Fetch không coi đây là lỗi mạng nên không tự nhảy vào catch. Ta phải chủ động check: `if (!res.ok) throw new Error(res.status)`.
3. Timeout: Dùng `AbortController`.
```javascript
async function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);
    try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        return await res.json();
    } catch (err) {
        if (err.name === 'AbortError') throw new Error('Request Timeout');
        throw err;
    }
}
```
4. Retry logic:
```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('API Error');
            return await res.json();
        } catch (err) {
            if (i === retries - 1) throw err; // Hết số lần thử thì ném lỗi
            console.log(`Thử lại lần ${i + 1}...`);
        }
    }
}
```

### Câu C2 — Promise Methods
| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `.all()` | Khi TẤT CẢ promise thành công | Khi CÓ 1 promise thất bại (ngay lập tức) | Gọi nhiều API phụ thuộc nhau. Đứt 1 cái là hỏng cả luồng. |
| `.allSettled()` | Khi TẤT CẢ promise hoàn thành (bất kể thành công hay thất bại) | Không bao giờ reject | Render Dashboard (1 widget lỗi thì báo lỗi widget đó, các widget khác vẫn hiện). |
| `.race()` | Khi 1 promise ĐẦU TIÊN hoàn thành (hoặc thất bại) | Trả về kết quả/lỗi của promise nhanh nhất | Dùng làm chức năng Timeout cho API. |
| `.any()` | Khi 1 promise ĐẦU TIÊN thành công | Khi TẤT CẢ đều thất bại | Gọi tới nhiều server dự phòng, cái nào tải xong data trước thì lấy. |

Ví dụ code:
```javascript
// Promise.all (Phụ thuộc nhau)
const [user, cart] = await Promise.all([fetchUser(), fetchCart()]);

// Promise.allSettled (Không phụ thuộc)
const results = await Promise.allSettled([fetchWeather(), fetchNews()]);
results.forEach(r => r.status === 'fulfilled' ? render(r.value) : showError(r.reason));

// Promise.race (Timeout timeout)
const data = await Promise.race([
    fetchApi(), 
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout!')), 5000))
]);

// Promise.any (Dự phòng)
const fastestServerData = await Promise.any([
    fetch('https://server1.com/data'),
    fetch('https://server2.com/data')
]);
```
---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
