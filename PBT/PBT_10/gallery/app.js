const gallery = document.getElementById('gallery');
const loadTrigger = document.getElementById('loadTrigger');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close');

let page = 1;
let isFetching = false;

async function fetchPhotos() {
    if (isFetching) return;
    isFetching = true;
    
    try {
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
        if (!res.ok) throw new Error('Network response was not ok');
        const photos = await res.json();
        
        photos.forEach(photo => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.innerHTML = `<img src="${photo.download_url}" loading="lazy" alt="Image by ${photo.author}">`;
            
            card.addEventListener('click', () => {
                lightboxImg.src = photo.download_url;
                lightbox.style.display = 'flex';
            });
            
            gallery.appendChild(card);
        });
        
        page++;
    } catch (error) {
        console.error("Lỗi khi tải ảnh:", error);
        loadTrigger.innerHTML = '<p style="color:red">Lỗi tải ảnh. Vui lòng thử lại.</p>';
    } finally {
        isFetching = false;
    }
}

closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchPhotos();
    }
}, { rootMargin: "200px" });

observer.observe(loadTrigger);