// 1. VÀO NHÀ KHO LẤY DỮ LIỆU
// Mở kho localStorage lấy danh sách phiếu. Nếu kho trống thì tự tạo mảng rỗng []
let danhSachPhieu = JSON.parse(localStorage.getItem('DS_PhieuMuon')) || [];

// Biến này để nhớ xem mình có đang bấm Sửa cái phiếu nào không. Mặc định là null (không sửa gì).
let dangSuaMaPhieu = null;


// ============================================
// 2. CÁC HÀM TẮT MỞ CÁI BẢNG NHẬP LIỆU (POPUP)
// ============================================
function moPopup() {
    // Gọi cái bảng nhập liệu đang tàng hình hiện lên màn hình
    document.getElementById('popupForm').style.display = 'block';
    // Đổi tiêu đề thành chữ THÊM
    document.getElementById('form-title').innerText = "THÊM PHIẾU MƯỢN";
    // Xóa trắng mọi thứ đang gõ dở trong form
    document.getElementById('borrowForm').reset(); 
    // Chắc chắn là đang Thêm mới, không phải Sửa
    dangSuaMaPhieu = null;
    // Mở khóa ô nhập Mã phiếu cho người ta gõ
    document.getElementById('maPhieu').disabled = false; 
}

function dongPopup() {
    // Giấu cái bảng nhập liệu đi
    document.getElementById('popupForm').style.display = 'none';
}


// ============================================
// 3. HÀM QUAN TRỌNG NHẤT: KIỂM TRA LỖI VÀ LƯU
// ============================================
function luuDuLieu() {
    // Cắm cờ mặc định là TRUE (Tin tưởng người dùng nhập đúng hết)
    let isValid = true;

    // Tóm cổ tất cả các ô nhập liệu trên HTML nhét vào biến để chuẩn bị kiểm tra
    let maPhieu = document.getElementById('maPhieu');
    let hoTen = document.getElementById('hoTen');
    let maSach = document.getElementById('maSach');
    let theLoai = document.getElementById('theLoai');
    let ngayMuon = document.getElementById('ngayMuon');
    let hanTra = document.getElementById('hanTra');
    let sdt = document.getElementById('sdt');
    let email = document.getElementById('email');
    let trangThai = document.getElementById('trangThai');
    let ghiChu = document.getElementById('ghiChu');

    // XÓA HẾT CHỮ ĐỎ BÁO LỖI CŨ (Giống hệt code thầy)
    document.querySelectorAll('.error-text').forEach(span => span.textContent = '');

    // --- BẮT ĐẦU CÁC TRẠM KIỂM TRA ---

    // Trạm 1: Mã phiếu (Bắt đầu là PM- và 4 số đằng sau)
    if (!/^PM-\d{4}$/.test(maPhieu.value.trim())) {
        isValid = false; // Phất cờ báo lỗi
        document.getElementById('err-maPhieu').textContent = 'Phải có dạng PM-XXXX (X là số).'; // Bơm chữ đỏ
    }

    // Trạm 2: Họ tên (Từ 2 đến 40 ký tự, có dấu tiếng Việt)
    if (!/^[a-zA-ZÀ-ỹ\s]{2,40}$/.test(hoTen.value.trim())) {
        isValid = false; 
        document.getElementById('err-hoTen').textContent = 'Từ 2-40 ký tự, chỉ chứa chữ cái và khoảng trắng.';
    }

    // Trạm 3: Mã sách (Chữ BK và 5 số)
    if (!/^BK\d{5}$/.test(maSach.value.trim())) {
        isValid = false; 
        document.getElementById('err-maSach').textContent = 'Bắt đầu bằng BK và 5 chữ số.';
    }

    // Trạm 4 & 5: NGÀY THÁNG (Cực kỳ quan trọng)
    let dateMuon = new Date(ngayMuon.value); // Lấy chữ người dùng gõ ép thành định dạng Ngày
    let dateTra = new Date(hanTra.value);    // Ép hạn trả thành định dạng Ngày
    let dateHienTai = new Date();            // Lấy ngày giờ ngay lúc này của máy tính
    dateHienTai.setHours(0,0,0,0);           // Chặn giờ/phút/giây lại bằng 0 để so sánh Ngày cho chuẩn

    // Kiểm tra Ngày mượn: Phải nhập VÀ Không được là ngày ở tương lai
    if (!ngayMuon.value || dateMuon > dateHienTai) {
        isValid = false; 
        document.getElementById('err-ngayMuon').textContent = 'Ngày mượn không để trống và không được lớn hơn hiện tại.';
    }

    // Kiểm tra Hạn trả: 
    if (!hanTra.value) {
        isValid = false; // Bỏ trống là lỗi luôn
        document.getElementById('err-hanTra').textContent = 'Hạn trả không được để trống.';
    } else {
        // Làm toán: Lấy Ngày Trả trừ Ngày Mượn, sau đó chia cho (1000 mili-giây * 3600 giây * 24 giờ) để ép ra SỐ NGÀY
        let khoangCachNgay = (dateTra.getTime() - dateMuon.getTime()) / (1000 * 3600 * 24); 
        
        if (dateTra < dateMuon) {
            isValid = false; // Trả trước khi mượn -> Vô lý -> Báo lỗi
            document.getElementById('err-hanTra').textContent = 'Hạn trả phải lớn hơn hoặc bằng ngày mượn.';
        } else if (khoangCachNgay > 30) {
            isValid = false; // Khoảng cách > 30 ngày -> Báo lỗi
            document.getElementById('err-hanTra').textContent = 'Hạn trả không vượt quá 30 ngày.';
        }
    }

    // Trạm 6: SĐT (Cấm nhập bậy, phải bắt đầu bằng đầu số VN và đủ 10 số)
    if (!/^(03|05|07|08|09)\d{8}$/.test(sdt.value.trim())) {
        isValid = false; 
        document.getElementById('err-sdt').textContent = 'SĐT phải có 10 số và bắt đầu bằng đầu số hợp lệ.';
    }

    // Trạm 7: Email (Khóa đuôi bắt buộc phải là @library.vn)
    if (!/^[^\s@]+@library\.vn$/.test(email.value.trim())) {
        isValid = false; 
        document.getElementById('err-email').textContent = 'Email phải kết thúc bằng @library.vn';
    }

    // Trạm 8: Ghi chú (Kiểm tra xem có cố tình hack bằng mã HTML không)
    let chuoiGhiChu = ghiChu.value.trim();
    if (chuoiGhiChu.length > 120) {
        isValid = false; 
        document.getElementById('err-ghiChu').textContent = 'Ghi chú không vượt quá 120 ký tự.';
    } else if (/<script|<iframe|<img/i.test(chuoiGhiChu)) {
        // Dò xem có chữ script, iframe, img không
        isValid = false; 
        document.getElementById('err-ghiChu').textContent = 'Cấm dùng mã HTML nguy hiểm.';
    }

    // --- KẾT THÚC KIỂM TRA LỖI ---

    // NẾU KHÔNG CÓ LỖI NÀO (Cờ vẫn là True) THÌ TIẾN HÀNH LƯU
    if (isValid) {
        // Tạo một gói hàng (Object) chứa toàn bộ thông tin
        let phieuMoi = {
            maPhieu: maPhieu.value.trim(), hoTen: hoTen.value.trim(), maSach: maSach.value.trim(),
            theLoai: theLoai.value, ngayMuon: ngayMuon.value, hanTra: hanTra.value,
            sdt: sdt.value.trim(), email: email.value.trim(), trangThai: trangThai.value,
            ghiChu: chuoiGhiChu
        };

        // Nếu hệ thống phát hiện ĐANG SỬA
        if (dangSuaMaPhieu != null) {
            // Tìm vị trí của cái phiếu đang sửa trong mảng, rồi ghi đè gói hàng mới lên
            let viTri = danhSachPhieu.findIndex(p => p.maPhieu === dangSuaMaPhieu);
            danhSachPhieu[viTri] = phieuMoi;
            alert("Cập nhật thành công!");
        } 
        // Nếu hệ thống phát hiện là THÊM MỚI
        else {
            // Quét xem cái mã phiếu vừa gõ có bị trùng với phiếu nào trong kho không
            if (danhSachPhieu.some(p => p.maPhieu === phieuMoi.maPhieu)) {
                return alert("Lỗi: Mã phiếu này đã tồn tại!"); // Trùng thì dừng luôn
            }
            danhSachPhieu.push(phieuMoi); // Không trùng thì nhét xuống cuối mảng
            alert("Thêm phiếu mượn thành công!");
        }

        // Đóng gói mảng thành chuỗi, cất vào kho LocalStorage
        localStorage.setItem('DS_PhieuMuon', JSON.stringify(danhSachPhieu));
        dongPopup(); // Đóng bảng nhập liệu
        veBangDuLieu(); // Cập nhật lại danh sách bên ngoài
    }
}


// ============================================
// 4. HÀM ĐỔ DỮ LIỆU RA BẢNG & TÍNH THỐNG KÊ
// ============================================
function veBangDuLieu() {
    let tbody = document.getElementById('bangDuLieu'); // Tóm cái bảng
    tbody.innerHTML = ''; // Đổ rác, xóa sạch bảng cũ
    
    // Tạo 2 cái hộp để đếm số lượng
    let dangMuon = 0, daTra = 0;

    // Chạy vòng lặp qua từng tờ phiếu trong danh sách
    danhSachPhieu.forEach(phieu => {
        // Cứ thấy trạng thái nào thì cộng 1 vào hộp đó
        if(phieu.trangThai === 'Đang mượn') dangMuon++;
        if(phieu.trangThai === 'Đã trả') daTra++;

        // Tạo màu mè cho nút trạng thái (Mượn thì Vàng, Trả thì Xanh)
        let bgTrangThai = phieu.trangThai === 'Đang mượn' ? 'bg-warning text-dark' : 'bg-success';

        // Tạo 1 hàng ngang (tr) chứa các cột (td)
        let tr = `<tr>
            <td class="text-center fw-bold">${phieu.maPhieu}</td>
            <td>${phieu.hoTen}</td>
            <td>${phieu.maSach}</td>
            <td>${phieu.theLoai}</td>
            <td>${phieu.ngayMuon}</td>
            <td>${phieu.hanTra}</td>
            <td>${phieu.sdt}</td>
            <td class="text-center"><span class="badge ${bgTrangThai}">${phieu.trangThai}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-primary" onclick="suaPhieu('${phieu.maPhieu}')">Sửa</button>
                <button class="btn btn-sm btn-danger" onclick="xoaPhieu('${phieu.maPhieu}')">Xóa</button>
            </td>
        </tr>`;
        tbody.innerHTML += tr; // Nhét hàng ngang này vào bảng
    });

    // In mấy con số vừa đếm được ra phần thống kê
    document.getElementById('stat-tong').innerText = danhSachPhieu.length;
    document.getElementById('stat-dangmuon').innerText = dangMuon;
    document.getElementById('stat-datra').innerText = daTra;
}


// ============================================
// 5. HÀM XÓA VÀ HÀM SỬA
// ============================================
function xoaPhieu(ma) {
    // Hỏi xem có chắc muốn xóa không
    if(confirm("Bạn có chắc chắn muốn xóa phiếu mượn này?")) {
        // Rây lọc: Giữ lại tất cả những phiếu KHÁC với cái phiếu đang muốn xóa
        danhSachPhieu = danhSachPhieu.filter(p => p.maPhieu !== ma);
        // Lưu lại kho, và vẽ lại bảng
        localStorage.setItem('DS_PhieuMuon', JSON.stringify(danhSachPhieu));
        veBangDuLieu();
    }
}

function suaPhieu(ma) {
    // Cử trinh sát đi tìm cái phiếu có mã giống hệt
    let phieu = danhSachPhieu.find(p => p.maPhieu === ma);
    
    // Đắp thông tin của phiếu đó lên các ô nhập liệu
    document.getElementById('maPhieu').value = phieu.maPhieu;
    document.getElementById('maPhieu').disabled = true; // Bôi xám, Khóa mã phiếu lại không cho sửa mã
    document.getElementById('hoTen').value = phieu.hoTen;
    document.getElementById('maSach').value = phieu.maSach;
    document.getElementById('theLoai').value = phieu.theLoai;
    document.getElementById('ngayMuon').value = phieu.ngayMuon;
    document.getElementById('hanTra').value = phieu.hanTra;
    document.getElementById('sdt').value = phieu.sdt;
    document.getElementById('email').value = phieu.email;
    document.getElementById('trangThai').value = phieu.trangThai;
    document.getElementById('ghiChu').value = phieu.ghiChu;
    
    // Gắn biển báo "TÔI ĐANG SỬA CÁI PHIẾU NÀY NHÉ"
    dangSuaMaPhieu = ma;
    document.getElementById('form-title').innerText = "CẬP NHẬT PHIẾU MƯỢN";
    document.getElementById('popupForm').style.display = 'block'; // Mở cái bảng nhập liệu lên
}

// Lần đầu mở web lên, tự động chạy hàm vẽ bảng luôn
veBangDuLieu();