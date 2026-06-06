// 1. CHUẨN BỊ KHO CHỨA
// (LocalStorage) lấy danh sách cũ về. Nếu chưa có gì thì tạo mảng rỗng []
let danhSach = JSON.parse(localStorage.getItem('DS_PhongHoc')) || [];
// Mặc định null là thêm mới.
let dangSuaMa = null;


// 2. HÀM TẮT MỞ POPUP
function moPopup() { 
    // Gọi màn hình đen hiện lên
    document.getElementById('popupForm').style.display = 'block'; 
    // Trả lại tiêu đề
    document.getElementById('form-title').innerText = "THÊM ĐẶT PHÒNG";
    // Xóa trắng mọi thứ đang gõ dở trong Form
    document.getElementById('roomForm').reset();
    // Chắc chắn là đang Thêm mới
    dangSuaMa = null;
    // Mở khóa ô nhập Mã đặt phòng (phòng khi trước đó vừa bấm Sửa bị khóa)
    document.getElementById('maDat').disabled = false;
}

function dongPopup() { 
    // Giấu cái màn hình đen đi
    document.getElementById('popupForm').style.display = 'none'; 
}


// 3. HÀM KIỂM TRA LỖI (VALIDATE) VÀ LƯU
function luuDuLieu() {
    // Cắm cờ mặc định là Đúng (True)
    let isValid = true;

    // Lấy hết các ô nhập liệu ra đây để chuẩn bị xét hỏi
    let maDat = document.getElementById('maDat');
    let hoTen = document.getElementById('hoTen');
    let maSV = document.getElementById('maSV');
    let soLuong = document.getElementById('soLuong');
    let ngay = document.getElementById('ngay');
    let email = document.getElementById('email');
    let mucDich = document.getElementById('mucDich');

    // XÓA HẾT LỖI CŨ: Lấy cục tẩy xóa sạch các chữ đỏ báo lỗi từ lần bấm trước
    document.querySelectorAll('.error-text').forEach(span => span.textContent = '');

    // --- BẮT ĐẦU CÁC TRẠM KIỂM TRA ---

    // 1. Mã đặt phòng: Không trống, đúng dạng PH-9999
    if (!/^PH-\d{4}$/.test(maDat.value.trim())) {
        isValid = false; // Phất cờ sai
        document.getElementById('err-maDat').textContent = 'Bắt buộc nhập và phải đúng dạng PH-XXXX (X là số).'; // Bơm lỗi vào span
    }

    // 2. Họ tên: Không trống, 5-40 ký tự, chỉ chữ
    if (!/^[a-zA-ZÀ-ỹ\s]{5,40}$/.test(hoTen.value.trim())) {
        isValid = false; 
        document.getElementById('err-hoTen').textContent = 'Tên phải từ 5-40 ký tự, chỉ chứa chữ cái.';
    }

    // 3. Mã Sinh Viên: Không trống, bắt đầu SV + 6 số
    if (!/^SV\d{6}$/.test(maSV.value.trim())) {
        isValid = false; 
        document.getElementById('err-maSV').textContent = 'Bắt buộc nhập và phải bắt đầu bằng SV kèm 6 số.';
    }

    // 4. Số lượng thành viên: 2 đến 8
    let sl = parseInt(soLuong.value); // Ép chữ thành số nguyên
    if (isNaN(sl) || sl < 2 || sl > 8) {
        isValid = false; 
        document.getElementById('err-soLuong').textContent = 'Số lượng phải là số nguyên từ 2 đến 8.';
    }

    // 5. Ngày sử dụng: Từ hôm nay đến 14 ngày sau
    let dateNhap = new Date(ngay.value); // Ngày người dùng chọn
    let dateHienTai = new Date(); // Ngày giờ lúc này
    dateHienTai.setHours(0,0,0,0); // Khóa giờ phút lại thành 0 để chỉ so sánh Ngày
    
    // Tạo mốc tối đa là 14 ngày sau
    let dateMax = new Date(); 
    dateMax.setDate(dateHienTai.getDate() + 14);

    if (!ngay.value || dateNhap < dateHienTai || dateNhap > dateMax) {
        isValid = false; 
        document.getElementById('err-ngay').textContent = 'Không để trống. Ngày phải từ hôm nay và không quá 14 ngày tới.';
    }

    // 6. Email: Đuôi @sv.haui.edu.vn
    if (!/^[^\s@]+@sv\.haui\.edu\.vn$/.test(email.value.trim())) {
        isValid = false; 
        document.getElementById('err-email').textContent = 'Email không hợp lệ hoặc sai đuôi @sv.haui.edu.vn.';
    }

    // 7. Mục đích: 10-100 ký tự, cấm từ khóa
    let chuoiMucDich = mucDich.value.trim();
    if (chuoiMucDich.length < 10 || chuoiMucDich.length > 100 || /game|giải trí|ngủ/i.test(chuoiMucDich)) {
        isValid = false; 
        document.getElementById('err-mucDich').textContent = 'Từ 10-100 ký tự và không chứa từ: game, giải trí, ngủ.';
    }

    // --- KẾT THÚC KIỂM TRA ---

    // NẾU TẤT CẢ ĐỀU ĐÚNG (Cờ vẫn là True)
    if (isValid) {
        // Gói tất cả vào 1 cục hàng (Object)
        let phieuMoi = {
            maDat: maDat.value.trim(),
            hoTen: hoTen.value.trim(),
            maSV: maSV.value.trim(),
            phong: document.getElementById('phong').value,
            soLuong: sl,
            ngay: ngay.value,
            caHoc: document.getElementById('caHoc').value,
            hinhThuc: document.getElementById('hinhThuc').value,
            email: email.value.trim(),
            mucDich: chuoiMucDich
        };

        // Nếu ĐANG SỬA
        if (dangSuaMa != null) {
            // Tìm vị trí của cái phiếu cũ và đè dữ liệu mới lên
            let viTri = danhSach.findIndex(p => p.maDat === dangSuaMa);
            danhSach[viTri] = phieuMoi;
            alert("Cập nhật thành công!");
        } 
        // Nếu LÀ THÊM MỚI
        else {
            // Kiểm tra trùng mã đặt phòng trong kho
            if (danhSach.some(p => p.maDat === phieuMoi.maDat)) {
                return alert("Lỗi: Mã đặt phòng này đã tồn tại!"); // Trùng thì cấm lưu
            }
            // Không trùng thì nhét xuống cuối danh sách
            danhSach.push(phieuMoi);
            alert("Thêm đặt phòng thành công!");
        }

        // Bỏ danh sách vào lại kho LocalStorage
        localStorage.setItem('DS_PhongHoc', JSON.stringify(danhSach));
        
        dongPopup(); // Tắt bảng nhập
        veBang();    // Cập nhật lại giao diện
    }
}


// 4. HÀM ĐỔ DỮ LIỆU RA BẢNG & TÍNH THỐNG KÊ
function veBang() {
    let tbody = document.getElementById('bangDuLieu');
    tbody.innerHTML = ''; // Đổ rác, xóa sạch bảng cũ đi để vẽ lại
    
    // Chuẩn bị 2 cái rổ để đếm
    let demThuong = 0, demUuTien = 0;

    // Duyệt qua từng phiếu trong danh sách
    danhSach.forEach(phieu => {
        // Đếm thống kê
        if(phieu.hinhThuc === 'Thường') demThuong++;
        if(phieu.hinhThuc === 'Ưu tiên') demUuTien++;

        // Nối HTML thành 1 hàng ngang (<tr>)
        let tr = `<tr>
            <td class="fw-bold">${phieu.maDat}</td>
            <td>${phieu.hoTen}</td>
            <td>${phieu.maSV}</td>
            <td>${phieu.phong}</td>
            <td>${phieu.soLuong}</td>
            <td>${phieu.ngay}</td>
            <td>${phieu.caHoc}</td>
            <td>${phieu.hinhThuc}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="suaPhieu('${phieu.maDat}')">Sửa</button>
                <button class="btn btn-sm btn-danger" onclick="xoaPhieu('${phieu.maDat}')">Xóa</button>
            </td>
        </tr>`;
        tbody.innerHTML += tr; // Nhét hàng ngang này vào bảng hiển thị
    });

    // Điền số đếm được lên các ô trên đầu trang
    document.getElementById('stat-tong').innerText = danhSach.length;
    document.getElementById('stat-thuong').innerText = demThuong;
    document.getElementById('stat-uutien').innerText = demUuTien;
}


// 5. CÁC HÀM XÓA VÀ SỬA
function xoaPhieu(maPhieuCanXoa) {
    // Hỏi lại cho chắc
    if(confirm("Bạn có chắc chắn muốn xóa lượt đặt phòng này?")) {
        // Rây lọc: Giữ lại toàn bộ danh sách, CHỈ LOẠI BỎ cái phiếu có mã vừa bấm
        danhSach = danhSach.filter(p => p.maDat !== maPhieuCanXoa);
        
        // Cất danh sách mới vào kho
        localStorage.setItem('DS_PhongHoc', JSON.stringify(danhSach));
        veBang(); // Cập nhật lại bảng trên màn hình
    }
}

function suaPhieu(maPhieuCanSua) {
    // Cử trinh sát đi tìm đúng cái phiếu đó trong kho
    let phieu = danhSach.find(p => p.maDat === maPhieuCanSua);
    
    // Bơm dữ liệu cũ của nó lên form nhập liệu
    document.getElementById('maDat').value = phieu.maDat;
    document.getElementById('maDat').disabled = true; // Khóa mã lại không cho sửa mã
    
    document.getElementById('hoTen').value = phieu.hoTen;
    document.getElementById('maSV').value = phieu.maSV;
    document.getElementById('phong').value = phieu.phong;
    document.getElementById('soLuong').value = phieu.soLuong;
    document.getElementById('ngay').value = phieu.ngay;
    document.getElementById('caHoc').value = phieu.caHoc;
    document.getElementById('hinhThuc').value = phieu.hinhThuc;
    document.getElementById('email').value = phieu.email;
    document.getElementById('mucDich').value = phieu.mucDich;
    
    // Treo biển: "ĐANG SỬA CÁI MÃ NÀY"
    dangSuaMa = maPhieuCanSua;
    
    // Đổi tiêu đề Form
    document.getElementById('form-title').innerText = "CẬP NHẬT ĐẶT PHÒNG";
    
    // Mở Form lên
    document.getElementById('popupForm').style.display = 'block'; 
}

// Lệnh này chạy ngay khi mở web: Tự động vẽ bảng từ dữ liệu có sẵn
veBang();