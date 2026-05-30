const form = document.getElementById('regForm');
const nameIn = document.getElementById('nameInput');
const emailIn = document.getElementById('emailInput');
const pwdIn = document.getElementById('pwdInput');
const confirmIn = document.getElementById('confirmInput');
const phoneIn = document.getElementById('phoneInput');
const submitBtn = document.getElementById('submitBtn');

let isValid = { name: false, email: false, pwd: false, confirm: false, phone: false };

function checkFormValid() {
    const allValid = Object.values(isValid).every(val => val === true);
    submitBtn.disabled = !allValid;
}

nameIn.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        document.getElementById('nameIcon').textContent = '✅';
        isValid.name = true;
    } else {
        document.getElementById('nameIcon').textContent = '❌';
        isValid.name = false;
    }
    checkFormValid();
});

emailIn.addEventListener('input', (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(e.target.value)) {
        document.getElementById('emailError').style.display = 'none';
        isValid.email = true;
    } else {
        document.getElementById('emailError').style.display = 'block';
        isValid.email = false;
    }
    checkFormValid();
});

pwdIn.addEventListener('input', (e) => {
    const val = e.target.value;
    const bar = document.getElementById('pwdBar');
    let strength = 0;
    
    if (val.length >= 8) strength++;
    if (/[a-zA-Z]/.test(val) && /[0-9]/.test(val)) strength++;
    if (/[^a-zA-Z0-9]/.test(val)) strength++;

    if (val.length < 8) { bar.style.width = '33%'; bar.style.background = 'red'; isValid.pwd = false; }
    else if (strength === 2) { bar.style.width = '66%'; bar.style.background = 'orange'; isValid.pwd = true; }
    else if (strength === 3) { bar.style.width = '100%'; bar.style.background = 'green'; isValid.pwd = true; }
    
    confirmIn.dispatchEvent(new Event('input'));
    checkFormValid();
});

confirmIn.addEventListener('input', (e) => {
    if (e.target.value === pwdIn.value && e.target.value !== "") {
        document.getElementById('confirmError').style.display = 'none';
        isValid.confirm = true;
    } else {
        document.getElementById('confirmError').style.display = 'block';
        isValid.confirm = false;
    }
    checkFormValid();
});

phoneIn.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    
    let formatted = val;
    if (val.length > 7) formatted = `${val.slice(0,4)}-${val.slice(4,7)}-${val.slice(7)}`;
    else if (val.length > 4) formatted = `${val.slice(0,4)}-${val.slice(4)}`;
    
    e.target.value = formatted;
    isValid.phone = val.length === 10;
    checkFormValid();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Đăng ký thành công!");
});