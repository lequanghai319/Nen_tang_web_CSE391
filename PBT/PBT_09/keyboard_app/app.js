let currentImg = 1;
const galleryText = document.getElementById('galleryText');
const palette = document.getElementById('palette');
const cmdInput = document.getElementById('cmdInput');
const items = document.querySelectorAll('#cmdList li');
let cmdIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        palette.classList.add('active');
        cmdInput.focus();
        return;
    }

    if (e.key === 'Escape' && palette.classList.contains('active')) {
        palette.classList.remove('active');
        return;
    }

    if (palette.classList.contains('active')) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            items[cmdIndex].classList.remove('focused');
            cmdIndex = (cmdIndex + 1) % items.length;
            items[cmdIndex].classList.add('focused');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            items[cmdIndex].classList.remove('focused');
            cmdIndex = (cmdIndex - 1 + items.length) % items.length;
            items[cmdIndex].classList.add('focused');
        } else if (e.key === 'Enter') {
            alert("Thực thi: " + items[cmdIndex].textContent);
            palette.classList.remove('active');
        }
        return;
    }

    if (e.key === 'ArrowRight') { currentImg++; updateGallery(); }
    else if (e.key === 'ArrowLeft') { currentImg = Math.max(1, currentImg - 1); updateGallery(); }
    else if (e.key >= '1' && e.key <= '9') { currentImg = parseInt(e.key); updateGallery(); }
});

function updateGallery() {
    galleryText.textContent = `Ảnh ${currentImg}`;
}