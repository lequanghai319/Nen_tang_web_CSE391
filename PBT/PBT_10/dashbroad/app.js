const refreshBtn = document.getElementById('refreshBtn');
const statusBar = document.getElementById('statusBar');

const uiUsers = document.querySelector('#widget-users .content');
const uiWeather = document.querySelector('#widget-weather .content');
const uiDog = document.querySelector('#widget-dog .content');

const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Lỗi ${res.status}`);
    return res.json();
};

async function loadDashboard() {

    [uiUsers, uiWeather, uiDog].forEach(el => el.innerHTML = '<div class="spinner"></div>');
    statusBar.textContent = '⏳ Đang fetch data từ nhiều nguồn...';
    refreshBtn.disabled = true;

    const startTime = Date.now();

    const results = await Promise.allSettled([
        fetchJson('https://jsonplaceholder.typicode.com/users?_limit=4'),
        fetchJson('https://wttr.in/Hanoi?format=j1'),
        fetchJson('https://dog.ceo/api/breeds/image/random')
    ]);

    // Xử lý Widget 1: Users
    if (results[0].status === 'fulfilled') {
        uiUsers.innerHTML = `<ul>${results[0].value.map(u => `<li><strong>${u.name}</strong> (${u.company.name})</li>`).join('')}</ul>`;
    } else {
        uiUsers.innerHTML = `<div class="error-msg">❌ Lỗi tải Users: ${results[0].reason.message}</div>`;
    }

    if (results[1].status === 'fulfilled') {
        const data = results[1].value.current_condition[0];
        uiWeather.innerHTML = `
            <div style="font-size: 30px; font-weight: bold; text-align: center;">${data.temp_C}°C</div>
            <div style="text-align: center; color: #666;">Độ ẩm: ${data.humidity}% | ${data.weatherDesc[0].value}</div>
        `;
    } else {
        uiWeather.innerHTML = `<div class="error-msg">❌ Lỗi thời tiết: ${results[1].reason.message}</div>`;
    }

    if (results[2].status === 'fulfilled') {
        uiDog.innerHTML = `<img src="${results[2].value.message}" style="width:100%; height:180px; object-fit:cover; border-radius:8px;" alt="Random Dog">`;
    } else {
        uiDog.innerHTML = `<div class="error-msg">❌ Lỗi lấy ảnh: ${results[2].reason.message}</div>`;
    }

    const endTime = Date.now();
    statusBar.textContent = `✅ Hoàn thành fetch dữ liệu trong ${endTime - startTime}ms`;
    refreshBtn.disabled = false;
}

refreshBtn.addEventListener('click', loadDashboard);

loadDashboard();