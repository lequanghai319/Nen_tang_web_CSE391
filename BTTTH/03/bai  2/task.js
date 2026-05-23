// ==========================================
// 1. KHỞI TẠO BIẾN VÀ LẤY CÁC PHẦN TỬ DOM
// ==========================================

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskModal = document.getElementById('taskModal');
const btnOpenTaskForm = document.getElementById('btnOpenTaskForm');
const btnCloseTaskModal = document.getElementById('btnCloseTaskModal');
const btnCancelTask = document.getElementById('btnCancelTask');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

// ==========================================
// 2. XỬ LÝ SỰ KIỆN ĐÓNG / MỞ FORM
// ==========================================
const closeTaskModal = () => {
    taskModal.style.display = 'none';
};
btnOpenTaskForm.addEventListener('click', () => {
    taskForm.reset();
    document.getElementById('editTaskId').value = '';
    document.getElementById('taskModalTitle').innerText = 'Thêm Công việc mới';
    taskModal.style.display = 'block';
});
btnCloseTaskModal.addEventListener('click', closeTaskModal);
btnCancelTask.addEventListener('click', closeTaskModal);

// ==========================================
// 3. HÀM HIỂN THỊ DỮ LIỆU (RENDER DẠNG CARD)
// ==========================================
function renderTasks() {
    taskList.innerHTML = ''; 
    if (tasks.length === 0) {
        taskList.innerHTML = '<div style="text-align:center; color:#666; padding:20px;">Chưa có công việc nào. Bắt đầu thêm mới nhé!</div>';
    } else {
        // Duyệt mảng và tạo các thẻ Card
        tasks.forEach((task, index) => {
            let badgeClass = 'bg-medium';
            if (task.priority === 'Thấp') badgeClass = 'bg-low';
            if (task.priority === 'Cao') badgeClass = 'bg-high';
            const isChecked = task.isCompleted ? 'checked' : '';
            const cardClass = task.isCompleted ? 'task-card completed' : 'task-card';

            const div = document.createElement('div');
            div.className = cardClass;
            
            div.innerHTML = `
                <div class="task-info">
                    <h4>
                        <input type="checkbox" style="margin-right: 8px; transform: scale(1.3);" ${isChecked} onchange="toggleTaskStatus(${index})"> 
                        ${task.title} 
                        <span class="badge ${badgeClass}" style="margin-left: 10px;">${task.priority}</span>
                    </h4>
                    <p>${task.desc || 'Không có mô tả'}</p>
                    <small style="color: #dc3545; font-weight: bold;">Hạn: ${task.dueDate}</small>
                </div>
                <div class="task-actions">
                    <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Xóa</button>
                </div>
            `;
            taskList.appendChild(div);
        });
    }

    updateTaskStatistics();
}

// ==========================================
// 4. HÀM CẬP NHẬT THỐNG KÊ
// ==========================================
function updateTaskStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.isCompleted).length;
    const pending = total - completed;

    totalTasksEl.innerText = total;
    completedTasksEl.innerText = completed;
    pendingTasksEl.innerText = pending;
}

// ==========================================
// 5. BẮT SỰ KIỆN SUBMIT FORM (THÊM & SỬA)
// ==========================================
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const taskData = {
        title: document.getElementById('taskTitle').value.trim(),
        desc: document.getElementById('taskDesc').value.trim(),
        dueDate: document.getElementById('taskDueDate').value,
        priority: document.getElementById('taskPriority').value,
        isCompleted: false 
    };

    const editId = document.getElementById('editTaskId').value;

    if (editId === '') {
        // Thêm mới
        tasks.push(taskData);
    } else {
        taskData.isCompleted = tasks[editId].isCompleted;
        tasks[editId] = taskData;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    closeTaskModal();
});

// ==========================================
// 6. CÁC HÀM XỬ LÝ (SỬA, XÓA, ĐỔI TRẠNG THÁI)
// ==========================================
window.editTask = function(index) {
    const task = tasks[index];
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskPriority').value = task.priority;
    
    document.getElementById('editTaskId').value = index;
    document.getElementById('taskModalTitle').innerText = 'Cập nhật Công việc';
    taskModal.style.display = 'block';
};

window.deleteTask = function(index) {
    if (confirm(`Bạn có chắc chắn muốn xóa công việc "${tasks[index].title}"?`)) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
};

window.toggleTaskStatus = function(index) {

    tasks[index].isCompleted = !tasks[index].isCompleted;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};
renderTasks();