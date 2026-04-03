// CÀI ĐẶT CHẾ ĐỘ CHỈNH SỬA (ADMIN MODE)
const isAdminMode = true; 

document.addEventListener('DOMContentLoaded', function() {
    // 1. Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // 2. ADMIN FEATURES (ONLY IF MODE IS ON)
    if (isAdminMode) {
        enableEditor();
    }

    function enableEditor() {
        console.log("Admin Mode Enabled");

        // Cho phép sửa mọi loại văn bản
        const tagsToEdit = 'h1, h2, h3, p, span, .btn, .logo';
        document.querySelectorAll(tagsToEdit).forEach(el => {
            el.contentEditable = "true";
            el.style.outline = "1px dashed #d4af37";
            el.style.borderRadius = "4px";
        });

        // Cho phép sửa ảnh khi click
        document.querySelectorAll('img').forEach(img => {
            img.style.cursor = "crosshair";
            img.addEventListener('click', function() {
                const newUrl = prompt("Nhập đường dẫn ảnh mới (Ví dụ: photo.jpg):", img.getAttribute('src'));
                if (newUrl) img.setAttribute('src', newUrl);
            });
        });

        // Thêm nút "Thêm dịch vụ" vào cuối lưới
        const grid = document.querySelector('.projects-grid');
        if (grid) {
            const addCard = document.createElement('div');
            addCard.className = 'project-card reveal active';
            addCard.innerHTML = `
                <div style="height:300px; display:flex; align-items:center; justify-content:center; border:2px dashed #d4af37; cursor:pointer">
                    <h3 style="color:#d4af37">+ Thêm Card Mới</h3>
                </div>
            `;
            addCard.onclick = function() {
                const firstCard = document.querySelector('.project-card');
                if (firstCard) {
                    const cloned = firstCard.cloneNode(true);
                    cloned.querySelectorAll(tagsToEdit).forEach(o => o.contentEditable = "true");
                    grid.insertBefore(cloned, addCard);
                }
            };
            grid.appendChild(addCard);
        }

        // Nút lưu góc màn hình
        const saveToggle = document.createElement('div');
        saveToggle.innerHTML = `
            <button id="save-port" style="position:fixed; bottom:20px; right:20px; z-index:9999; padding:15px 25px; background:#d4af37; color:black; border:none; border-radius:50px; font-weight:bold; cursor:pointer; box-shadow:0 10px 30px rgba(0,0,0,0.5)">
                💾 TẢI FILE ĐÃ SỬA VỀ (LƯU)
            </button>
        `;
        document.body.appendChild(saveToggle);

        document.getElementById('save-port').onclick = function() {
            // Tắt chế độ sửa trước khi lấy code
            document.querySelectorAll('[contenteditable]').forEach(el => {
                el.removeAttribute('contenteditable');
                el.style.outline = "none";
            });
            saveToggle.remove();
            const addBtn = document.querySelector('.project-card:last-child');
            if(addBtn && addBtn.innerText.includes('+')) addBtn.remove();

            // Tạo file tải về
            const fullHTML = document.documentElement.outerHTML;
            const link = document.createElement('a');
            link.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(fullHTML);
            link.download = 'index.html';
            link.click();
            
            alert("Đã tải xuống file index.html mới! Hãy up file này lên GitHub để cập nhật web nhé.");
            location.reload();
        };
    }
});
