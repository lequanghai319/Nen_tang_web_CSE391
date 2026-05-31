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

---
### PHẦN D — VIDEO THỰC HÀNH OBS
---
