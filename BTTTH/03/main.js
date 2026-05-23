let students = JSON.parse(localStorage.getItem('students')) || [];

const modal = document.getElementById('studentModal');
const btnOpenAddForm = document.getElementById('btnOpenAddForm');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');
const studentForm = document.getElementById('studentForm');
const studentTbody = document.getElementById('studentTbody');

const totalStudentsEl = document.getElementById('totalStudents');
const avgClassScoreEl = document.getElementById('avgClassScore');


const closeModal = () => {
    modal.style.display = 'none';
};


btnOpenAddForm.addEventListener('click', () => {
    studentForm.reset();
    document.getElementById('editStudentId').value = ''; 
    document.getElementById('modalTitle').innerText = 'Thêm Sinh viên mới';
    modal.style.display = 'block'; // Hiển thị popup
});

btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


function renderStudents() {
    studentTbody.innerHTML = ''; 

    if (students.length === 0) {
        studentTbody.innerHTML = '<tr><td colspan="7">Chưa có dữ liệu sinh viên nào.</td></tr>';
    } else {

        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${student.code}</td>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.className}</td>
                <td>${student.score}</td>
                <td>${student.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Xóa</button>
                </td>
            `;
            studentTbody.appendChild(tr);
        });
    }
    
    updateStatistics(); 
}

function updateStatistics() {
    totalStudentsEl.innerText = students.length;

    if (students.length === 0) {
        avgClassScoreEl.innerText = '0.0';
        return;
    }

    
    let totalScore = students.reduce((sum, student) => sum + parseFloat(student.score), 0);
    let avg = (totalScore / students.length).toFixed(1);
    avgClassScoreEl.innerText = avg;
}

studentForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const newStudent = {
        code: document.getElementById('studentCode').value.trim(),
        name: document.getElementById('studentName').value.trim(),
        dob: document.getElementById('studentDob').value,
        className: document.getElementById('studentClass').value.trim(),
        score: document.getElementById('studentScore').value,
        email: document.getElementById('studentEmail').value.trim()
    };

    students.push(newStudent);
    
    localStorage.setItem('students', JSON.stringify(students));

    renderStudents();
    closeModal();
});

renderStudents();

function editStudent(index) {
    console.log("Chuẩn bị làm tính năng sửa cho vị trí:", index);
}
function deleteStudent(index) {
    console.log("Chuẩn bị làm tính năng xóa cho vị trí:", index);
}