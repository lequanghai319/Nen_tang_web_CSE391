//API
const api = {
    baseURL: "https://jsonplacehoolder.typicode.com",
    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if (!res.ok) throw new Error("Lỗi tải danh sách users");
        return res.json();
    },
    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: 'POST', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' }
        });
        if (!res.ok) throw new Error("Lỗi thêm user");
        return res.json();
    },
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Lỗi xóa user");
        return true;
    }
};

const ui = {
    grid: document.getElementById('userGrid'),
    toast: document.getElementById('toast'),
    
    showLoading() {
        this.grid.innerHTML = Array(8).fill('<div class="skeleton"></div>').join('');
    },
    
    renderUsers(users) {
        this.grid.innerHTML = '';
        if (users.length === 0) {
            this.grid.innerHTML = '<p>Không tìm thấy user nào.</p>';
            return;
        }
        users.forEach(u => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${u.name}</h3>
                <p>📧 ${u.email}</p>
                <div class="card-actions">
                    <button class="btn-edit" data-id="${u.id}">Sửa</button>
                    <button class="btn-delete" data-id="${u.id}">Xóa</button>
                </div>
            `;
            this.grid.appendChild(card);
        });
    },
    
    showToast(message, type = 'success') {
        this.toast.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.style.display = 'block';
        setTimeout(() => this.toast.style.display = 'none', 3000);
    }
};

let usersData = [];

async function init() {
    ui.showLoading();
    try {
        usersData = await api.getUsers();
        ui.renderUsers(usersData);
    } catch (error) {
        ui.showToast(error.message, 'error');
        ui.grid.innerHTML = '<p class="error">Không thể tải dữ liệu.</p>';
    }
}


document.getElementById('addBtn').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    
    if (!name || !email) {
        ui.showToast('Vui lòng nhập đủ tên và email', 'error');
        return;
    }

    try {
       
        const newUser = await api.createUser({ name, email });
        usersData.unshift(newUser); // Thêm lên đầu danh sách mảng nội bộ
        ui.renderUsers(usersData);
        ui.showToast('Thêm user thành công!');
        
        document.getElementById('nameInput').value = '';
        document.getElementById('emailInput').value = '';
    } catch (error) {
        ui.showToast(error.message, 'error');
    }
});

document.getElementById('userGrid').addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-delete')) {
        if (!confirm('Bạn có chắc chắn muốn xóa user này?')) return;
        
        const id = Number(e.target.dataset.id);
        const cardBtn = e.target;
        cardBtn.textContent = 'Đang xóa...';
        
        try {
            await api.deleteUser(id);
            usersData = usersData.filter(u => u.id !== id);
            ui.renderUsers(usersData);
            ui.showToast('Xóa thành công!');
        } catch (error) {
            ui.showToast(error.message, 'error');
            cardBtn.textContent = 'Xóa';
        }
    }
    
    if (e.target.classList.contains('btn-edit')) {
        ui.showToast('Chức năng sửa đang được phát triển!', 'error');
    }
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = usersData.filter(u => 
        u.name.toLowerCase().includes(keyword) || 
        u.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filtered);
});

init();