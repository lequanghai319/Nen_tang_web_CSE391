let danhSachSach = JSON.parse(localStorage.getItem('thuVien')) || [];
let dangSuaMaSach = null;

function chuyenTrang(tenTrang) {
    document.getElementById('trang-them').style.display = 'none';
    document.getElementById('trang-quan-ly').style.display = 'none';
    document.getElementById(tenTrang).style.display = 'block';
    
    if(tenTrang === 'trang-quan-ly') {
        veBangDuLieu(danhSachSach);
        capNhatThongKe();
    }
}

// ========================================================
// HÀM VALIDATE MỚI (Viết y hệt Ví dụ 2 của thầy giáo)
// ========================================================
function xuLyLuuSach() {
    // 1. Tạo biến cờ (Mặc định là đúng)
    let isValid = true;

    // 2. Lấy các thẻ HTML vào biến (Giống thầy giáo)
    let ma = document.getElementById('maSach');
    let ten = document.getElementById('tenSach');
    let tacGia = document.getElementById('tacGia');
    let theLoai = document.getElementById('theLoai');
    let nam = document.getElementById('namXB');
    let soLuong = document.getElementById('soLuong');
    let nguoiThem = document.getElementById('nguoiThem');
    let maXacThuc = document.getElementById('maXacThuc');
    let xacNhan = document.getElementById('xacNhanMa');

    // 3. XÓA HẾT LỖI CŨ ĐI TRƯỚC KHI KIỂM TRA (Giống code thầy)
    document.getElementById('err-maSach').textContent = '';
    document.getElementById('err-tenSach').textContent = '';
    document.getElementById('err-tacGia').textContent = '';
    document.getElementById('err-namXB').textContent = '';
    document.getElementById('err-soLuong').textContent = '';
    document.getElementById('err-nguoiThem').textContent = '';
    document.getElementById('err-maXacThuc').textContent = '';
    document.getElementById('err-xacNhanMa').textContent = '';

    // 4. KIỂM TRA TỪNG ĐIỀU KIỆN 
    // Nếu sai -> Đổi cờ thành false -> Bơm chữ báo lỗi vào thẻ

    // Mã sách: Bắt đầu bằng BK, theo sau là 5 số
    let patternMaSach = /^BK\d{5}$/;
    if (!patternMaSach.test(ma.value.trim())) {
        isValid = false;
        document.getElementById('err-maSach').textContent = 'Mã sách không được trống, phải bắt đầu bằng BK và 5 số.';
    }

    // Tên sách: 3 đến 100 ký tự
    if (ten.value.trim().length < 3 || ten.value.trim().length > 100) {
        isValid = false;
        document.getElementById('err-tenSach').textContent = 'Tên sách không được trống và phải từ 3 đến 100 ký tự.';
    }

    // Tác giả: Chỉ chứa chữ, khoảng trắng, dấu chấm
    let patternTacGia = /^[a-zA-ZÀ-ỹ\s.]+$/;
    if (!patternTacGia.test(tacGia.value.trim()) || tacGia.value.trim() === '') {
        isValid = false;
        document.getElementById('err-tacGia').textContent = 'Tác giả không để trống, chỉ chứa chữ, dấu cách và dấu chấm.';
    }

    // Năm xuất bản: 1900 đến năm hiện tại
    let namHienTai = new Date().getFullYear();
    let namValue = parseInt(nam.value, 10);
    if (isNaN(namValue) || namValue < 1900 || namValue > namHienTai) {
        isValid = false;
        document.getElementById('err-namXB').textContent = 'Năm xuất bản phải từ 1900 đến năm hiện tại.';
    }

    // Số lượng: 1 đến 999
    let soLuongValue = parseInt(soLuong.value, 10);
    if (isNaN(soLuongValue) || soLuongValue < 1 || soLuongValue > 999) {
        isValid = false;
        document.getElementById('err-soLuong').textContent = 'Số lượng phải là số nguyên dương từ 1 đến 999.';
    }

    // Người thêm: 5-50 ký tự, chữ và khoảng trắng
    let patternNguoiThem = /^[a-zA-ZÀ-ỹ\s]{5,50}$/;
    if (!patternNguoiThem.test(nguoiThem.value.trim())) {
        isValid = false;
        document.getElementById('err-nguoiThem').textContent = 'Người thêm từ 5-50 ký tự, chỉ chứa chữ và khoảng trắng.';
    }

    // Mã xác thực: 6 ký tự, ít nhất 2 chữ, 2 số
    let maXT = maXacThuc.value.trim();
    let demChu = (maXT.match(/[a-zA-Z]/g) || []).length;
    let demSo = (maXT.match(/[0-9]/g) || []).length;
    if (maXT.length !== 6 || demChu < 2 || demSo < 2) {
        isValid = false;
        document.getElementById('err-maXacThuc').textContent = 'Mã xác thực phải đúng 6 ký tự (ít nhất 2 chữ, 2 số).';
    }

    // Xác nhận mã
    if (xacNhan.value.trim() === '' || xacNhan.value.trim() !== maXT) {
        isValid = false;
        document.getElementById('err-xacNhanMa').textContent = 'Mã xác nhận không được trống và phải khớp với mã xác thực.';
    }

    // 5. LƯU DỮ LIỆU NẾU TẤT CẢ ĐỀU ĐÚNG (isValid === true)
    if (isValid) {
        let sachMoi = {
            maSach: ma.value.trim(),
            tenSach: ten.value.trim(),
            tacGia: tacGia.value.trim(),
            theLoai: theLoai.value,
            namXB: namValue,
            soLuong: soLuongValue,
            nguoiThem: nguoiThem.value.trim(),
            ngayThem: new Date().toLocaleDateString('vi-VN')
        };

        if (dangSuaMaSach != null) {
            let viTri = danhSachSach.findIndex(s => s.maSach === dangSuaMaSach);
            danhSachSach[viTri] = sachMoi;
            dangSuaMaSach = null;
            document.getElementById('maSach').disabled = false;
            alert("Cập nhật thành công!");
        } else {
            let kiemTraTrung = danhSachSach.some(s => s.maSach === sachMoi.maSach);
            if(kiemTraTrung) {
                alert("Mã sách này đã tồn tại!");
                return; // Ngừng chạy tiếp nếu trùng
            }
            danhSachSach.push(sachMoi);
            alert("Thêm sách thành công!");
        }

        localStorage.setItem('thuVien', JSON.stringify(danhSachSach));
        document.getElementById('bookForm').reset();
        chuyenTrang('trang-quan-ly');
    }
}

// ========================================================
// CÁC HÀM CÒN LẠI (Vẽ bảng, Xóa, Sửa, Tìm kiếm...)
// ========================================================
function veBangDuLieu(mangDuLieu) {
    let tbody = document.getElementById('bangDuLieu');
    tbody.innerHTML = '';
    
    mangDuLieu.forEach(sach => {
        let hangMoi = `<tr>
            <td>${sach.maSach}</td>
            <td>${sach.tenSach}</td>
            <td>${sach.tacGia}</td>
            <td>${sach.theLoai}</td>
            <td>${sach.namXB}</td>
            <td>${sach.soLuong}</td>
            <td>${sach.nguoiThem}</td>
            <td>${sach.ngayThem}</td>
            <td>
                <button class="action-btn btn-sua" onclick="suaSach('${sach.maSach}')">Sửa</button>
                <button class="action-btn btn-xoa" onclick="xoaSach('${sach.maSach}')">Xoá</button>
            </td>
        </tr>`;
        tbody.innerHTML += hangMoi;
    });
}

function xoaSach(ma) {
    if(confirm("Bạn có chắc chắn muốn xóa sách này?")) {
        danhSachSach = danhSachSach.filter(sach => sach.maSach !== ma);
        localStorage.setItem('thuVien', JSON.stringify(danhSachSach));
        veBangDuLieu(danhSachSach);
        capNhatThongKe();
    }
}

function suaSach(ma) {
    let sachCanSua = danhSachSach.find(sach => sach.maSach === ma);
    
    document.getElementById('maSach').value = sachCanSua.maSach;
    document.getElementById('maSach').disabled = true;
    document.getElementById('tenSach').value = sachCanSua.tenSach;
    document.getElementById('tacGia').value = sachCanSua.tacGia;
    document.getElementById('theLoai').value = sachCanSua.theLoai;
    document.getElementById('namXB').value = sachCanSua.namXB;
    document.getElementById('soLuong').value = sachCanSua.soLuong;
    document.getElementById('nguoiThem').value = sachCanSua.nguoiThem;
    
    dangSuaMaSach = ma;
    document.getElementById('form-title').innerText = "Cập nhật sách";
    chuyenTrang('trang-them');
}

function timKiemSach() {
    let tuKhoa = document.getElementById('oTimKiem').value.toLowerCase();
    let ketQua = danhSachSach.filter(sach => 
        sach.maSach.toLowerCase().includes(tuKhoa) || 
        sach.tenSach.toLowerCase().includes(tuKhoa)
    );
    veBangDuLieu(ketQua);
}

function capNhatThongKe() {
    document.getElementById('stat-tong').innerText = danhSachSach.length;
    document.getElementById('stat-kh').innerText = danhSachSach.filter(s => s.theLoai === 'Khoa học').length;
    document.getElementById('stat-vh').innerText = danhSachSach.filter(s => s.theLoai === 'Văn học').length;
    document.getElementById('stat-ls').innerText = danhSachSach.filter(s => s.theLoai === 'Lịch sử').length;
    document.getElementById('stat-cn').innerText = danhSachSach.filter(s => s.theLoai === 'Công nghệ').length;
    document.getElementById('stat-khac').innerText = danhSachSach.filter(s => s.theLoai === 'Khác').length;
}

veBangDuLieu(danhSachSach);
capNhatThongKe();