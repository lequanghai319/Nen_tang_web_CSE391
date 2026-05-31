const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const historyBox = document.getElementById('historyBox');

let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];

function renderHistory() {
    historyBox.innerHTML = '';
    history.forEach(city => {
        const span = document.createElement('span');
        span.className = 'history-item';
        span.textContent = city;
        span.addEventListener('click', () => fetchWeather(city));
        historyBox.appendChild(span);
    });
}

function saveHistory(city) {
    if (!history.includes(city)) {
        history.unshift(city); 
        if (history.length > 5) history.pop();
        localStorage.setItem('weatherHistory', JSON.stringify(history));
        renderHistory();
    }
}

async function fetchWeather(city) {

    weatherResult.innerHTML = `<div class="loader"></div><p>Đang tải dữ liệu...</p>`;
    cityInput.value = city; 

    try {
        // Gọi API
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        
        if (!response.ok) throw new Error('Không tìm thấy thành phố này!');
        
        const data = await response.json();
        

        const current = data.current_condition[0];
        const temp = current.temp_C;
        const humidity = current.humidity;
        const desc = current.lang_vi ? current.lang_vi[0].value : current.weatherDesc[0].value;
        
        weatherResult.innerHTML = `
            <h2>${city.toUpperCase()}</h2>
            <div class="temp">${temp}°C</div>
            <p>${desc}</p>
            <p>💧 Độ ẩm: ${humidity}%</p>
        `;
        
        saveHistory(city);

    } catch (error) {
        weatherResult.innerHTML = `<p class="error-text">❌ Lỗi: ${error.message}</p>`;
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});


renderHistory();
if (history.length > 0) fetchWeather(history[0]); // Load lại thành phố gần nhất
else weatherResult.innerHTML = '<p>Nhập tên thành phố để xem thời tiết</p>';