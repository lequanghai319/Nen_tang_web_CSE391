const projects = [
    { id: 1, title: "AI Chatbot", student: "Nguyễn Văn A", email: "a@example.com", phone: "0123456789", instructor: "TS. Trần B" },
    { id: 2, title: "TAS LED", student: "Trần Thị C", email: "c@example.com", phone: "0907654321", instructor: "ThS. Lê D" },
    { id: 3, title: "Mobile App", student: "Phạm Văn E", email: "e@example.com", phone: "0912345678", instructor: "TS. Hoàng F" },
    { id: 4, title: "IoT Smart Home", student: "Đồng Thị G", email: "g@example.com", phone: "0901234567", instructor: "ThS. Nguyễn H" },
    { id: 5, title: "Data Mining", student: "Lê Văn I", email: "i@example.com", phone: "0998765432", instructor: "TS. Phan K" }
];

function renderProjects() {
    const tbody = document.getElementById('projectTableBody');
    tbody.innerHTML = ''; 

    projects.forEach(project => {
    
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${project.id}</td>
            <td class="fw-bold">${project.title}</td>
            <td>${project.student}</td>
            <td>${project.email}</td>
            <td>${project.phone}</td>
            <td>${project.instructor}</td>
            <td class="text-center">
                <button class="btn btn-outline-primary btn-action">Sửa</button>
                <button class="btn btn-outline-danger btn-action">Xóa</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}


renderProjects();