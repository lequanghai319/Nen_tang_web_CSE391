let danhSachPhieu = JSON.parse(localStorage.getItem('DS_PhieuMuon')) || [];
let dangSuaMaPhieu = null;

// ============================================
// HÀM ĐÓNG/MỞ POPUP
// ============================================
function moPopup() {
    document.getElementById('popupForm').style.display = 'block';
    document.getElementById('form-title').innerText = "THÊM PHIẾU MƯỢN";
    document.getElementById('borrowForm').reset(); // Xóa trắng form
    dangSuaMaPhieu = null;
    document.getElementById('maPhieu').disabled = false; // Mở khóa ô mã phiếu
}

function dongPopup() {
    document.getElementById('popupForm').style.display = 'none';
}

// ============================================
// HÀM LƯU VÀ VALIDATE (PHẦN QUAN TRỌNG NHẤT)
// ============================================
function luuDuLieu() {
    let isValid = true;

    // 1. Lấy dữ liệu
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

    // Xóa lỗi cũ
    document.querySelectorAll('.error-text').forEach(span => span.textContent = '');

    // 2. KHOẢNG VALIDATE (Chiếu theo 10 ý của đề bài)
    
    // Mã phiếu: PM-XXXX
    if (!/^PM-\d{4}$/.test(maPhieu.value.trim())) {
        isValid = false; document.getElementById('err-maPhieu').textContent = 'Phải có dạng PM-XXXX (X là số).';
    }

    // Họ tên: 2-40 ký tự, chỉ chữ và khoảng trắng
    if (!/^[a-zA-ZÀ-ỹ\s]{2,40}$/.test(hoTen.value.trim())) {
        isValid = false; document.getElementById('err-hoTen').textContent = 'Từ 2-40 ký tự, chỉ chứa chữ cái và khoảng trắng.';
    }

    // Mã sách: BK + 5 số
    if (!/^BK\d{5}$/.test(maSach.value.trim())) {
        isValid = false; document.getElementById('err-maSach').textContent = 'Bắt đầu bằng BK và 5 chữ số.';
    }

    // XỬ LÝ NGÀY THÁNG (Cực kỳ lưu ý chỗ này)
    let dateMuon = new Date(ngayMuon.value); // Ép về dạng ngày
    let dateTra = new Date(hanTra.value);
    let dateHienTai = new Date();
    dateHienTai.setHours(0,0,0,0); // Reset giờ phút giây để so sánh ngày cho chuẩn

    // Ngày mượn: <= hiện tại
    if (!ngayMuon.value || dateMuon > dateHienTai) {
        isValid = false; document.getElementById('err-ngayMuon').textContent = 'Ngày mượn không được để trống và không được lớn hơn ngày hiện tại.';
    }

    // Hạn trả: >= ngày mượn và <= 30 ngày
    if (!hanTra.value) {
        isValid = false; document.getElementById('err-hanTra').textContent = 'Hạn trả không được để trống.';
    } else {
        let khoangCachNgay = (dateTra.getTime() - dateMuon.getTime()) / (1000 * 3600 * 24); // Đổi mili-giây ra số ngày
        if (dateTra < dateMuon) {
            isValid = false; document.getElementById('err-hanTra').textContent = 'Hạn trả phải lớn hơn hoặc bằng ngày mượn.';
        } else if (khoangCachNgay > 30) {
            isValid = false; document.getElementById('err-hanTra').textContent = 'Hạn trả không được vượt quá 30 ngày kể từ ngày mượn.';
        }
    }

    // SĐT: Bắt đầu bằng 03,05,07,08,09 và có 10 số
    if (!/^(03|05|07|08|09)\d{8}$/.test(sdt.value.trim())) {
        isValid = false; document.getElementById('err-sdt').textContent = 'SĐT phải có 10 số và bắt đầu bằng đầu số hợp lệ.';
    }

    // Email: Kết thúc bằng @library.vn
    if (!/^[^\s@]+@library\.vn$/.test(email.value.trim())) {
        isValid = false; document.getElementById('err-email').textContent = 'Email phải kết thúc bằng @library.vn';
    }

    // Ghi chú: Cấm thẻ HTML (<script>, <iframe>, <img>) và max 120 ký tự
    let chuoiGhiChu = ghiChu.value.trim();
    if (chuoiGhiChu.length > 120) {
        isValid = false; document.getElementById('err-ghiChu').textContent = 'Ghi chú không vượt quá 120 ký tự.';
    } else if (/<script|<iframe|<img/i.test(chuoiGhiChu)) {
        isValid = false; document.getElementById('err-ghiChu').textContent = 'Ghi chú không được chứa mã HTML nguy hiểm.';
    }

    // ============================================
    // 3. XỬ LÝ LƯU (CRUD)
    if (isValid) {
        let phieuMoi = {
            maPhieu: maPhieu.value.trim(), hoTen: hoTen.value.trim(), maSach: maSach.value.trim(),
            theLoai: theLoai.value, ngayMuon: ngayMuon.value, hanTra: hanTra.value,
            sdt: sdt.value.trim(), email: email.value.trim(), trangThai: trangThai.value,
            ghiChu: chuoiGhiChu
        };

        if (dangSuaMaPhieu != null) {
            let viTri = danhSachPhieu.findIndex(p => p.maPhieu === dangSuaMaPhieu);
            danhSachPhieu[viTri] = phieuMoi;
            alert("Cập nhật thành công!");
        } else {
            // Kiểm tra trùng mã phiếu
            if (danhSachPhieu.some(p => p.maPhieu === phieuMoi.maPhieu)) {
                return alert("Lỗi: Mã phiếu này đã tồn tại!");
            }
            danhSachPhieu.push(phieuMoi);
            alert("Thêm phiếu mượn thành công!");
        }

        localStorage.setItem('DS_PhieuMuon', JSON.stringify(danhSachPhieu));
        dongPopup();
        veBangDuLieu();
    }
}

// ============================================
// HÀM VẼ BẢNG VÀ THỐNG KÊ
// ============================================
function veBangDuLieu() {
    let tbody = document.getElementById('bangDuLieu');
    tbody.innerHTML = '';
    
    let dangMuon = 0, daTra = 0;

    danhSachPhieu.forEach(phieu => {
        if(phieu.trangThai === 'Đang mượn') dangMuon++;
        if(phieu.trangThai === 'Đã trả') daTra++;

        // Thêm class badge để làm đẹp trạng thái
        let bgTrangThai = phieu.trangThai === 'Đang mượn' ? 'bg-warning text-dark' : 'bg-success';

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
        tbody.innerHTML += tr;
    });

    // Cập nhật thống kê
    document.getElementById('stat-tong').innerText = danhSachPhieu.length;
    document.getElementById('stat-dangmuon').innerText = dangMuon;
    document.getElementById('stat-datra').innerText = daTra;
}

// ============================================
// HÀM SỬA & XÓA
// ============================================
function xoaPhieu(ma) {
    if(confirm("Bạn có chắc chắn muốn xóa phiếu mượn này?")) {
        danhSachPhieu = danhSachPhieu.filter(p => p.maPhieu !== ma);
        localStorage.setItem('DS_PhieuMuon', JSON.stringify(danhSachPhieu));
        veBangDuLieu();
    }
}

function suaPhieu(ma) {
    let phieu = danhSachPhieu.find(p => p.maPhieu === ma);
    
    document.getElementById('maPhieu').value = phieu.maPhieu;
    document.getElementById('maPhieu').disabled = true; // Khóa mã phiếu không cho sửa
    document.getElementById('hoTen').value = phieu.hoTen;
    document.getElementById('maSach').value = phieu.maSach;
    document.getElementById('theLoai').value = phieu.theLoai;
    document.getElementById('ngayMuon').value = phieu.ngayMuon;
    document.getElementById('hanTra').value = phieu.hanTra;
    document.getElementById('sdt').value = phieu.sdt;
    document.getElementById('email').value = phieu.email;
    document.getElementById('trangThai').value = phieu.trangThai;
    document.getElementById('ghiChu').value = phieu.ghiChu;
    
    dangSuaMaPhieu = ma;
    document.getElementById('form-title').innerText = "CẬP NHẬT PHIẾU MƯỢN";
    document.getElementById('popupForm').style.display = 'block'; // Mở popup
}

// Gọi hàm khởi tạo khi load web
veBangDuLieu();