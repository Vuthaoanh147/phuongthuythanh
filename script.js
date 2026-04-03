// CÀI ĐẶT CHẾ ĐỘ CHỈNH SỬA (ADMIN MODE)
// Thay đổi true thành false để TẮT tính năng chỉnh sửa khi gửi cho khách xem
const isAdminMode = true; 

document.addEventListener('DOMContentLoaded', () => {
    // --- Hiệu ứng cũ ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- CHẾ ĐỘ ADMIN: BẬT CHỈNH SỬA TRỰC TIẾP ---
    if (isAdminMode) {
        enableAdminFeatures();
    }

    function enableAdminFeatures() {
        // 1. Cho phép sửa text trực tiếp
        const editableElements = document.querySelectorAll('h1, h2, h3, p, span, .btn, .logo');
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.style.border = '1px dashed rgba(212, 175, 55, 0.3)';
            el.style.borderRadius = '4px';
        });

        // 2. Cho phép sửa link ảnh
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.title = 'Click to change image source';
            img.addEventListener('click', () => {
                const newSrc = prompt('Enter new image filename or URL (e.g., photo.jpg):', img.placeholder || img.getAttribute('src'));
                if (newSrc) img.setAttribute('src', newSrc);
            });
        });

        // 3. Thêm nút "Thêm dịch vụ/kỹ năng"
        const grid = document.querySelector('.projects-grid');
        const addBtn = document.createElement('div');
        addBtn.className = 'project-card reveal active';
        addBtn.style.display = 'flex';
        addBtn.style.alignItems = 'center';
        addBtn.style.justifyContent = 'center';
        addBtn.style.minHeight = '300px';
        addBtn.style.border = '2px dashed var(--accent-primary)';
        addBtn.style.cursor = 'pointer';
        addBtn.innerHTML = '<h3 style="color: var(--accent-primary)">+ Thêm Dịch Vụ Mới</h3>';
        
        addBtn.addEventListener('click', () => {
            const newCard = document.querySelector('.project-card').cloneNode(true);
            newCard.querySelector('h3').innerText = 'Dịch vụ mới';
            newCard.querySelector('p').innerText = 'Mô tả dịch vụ mới tại đây...';
            // Cài đặt lại chỉnh sửa cho card mới
            newCard.querySelectorAll('h3, p, span').forEach(el => el.setAttribute('contenteditable', 'true'));
            grid.insertBefore(newCard, addBtn);
        });
        grid.appendChild(addBtn);

        // 4. Nút "XUẤT FILE ĐỂ LƯU" (Hiện ở góc màn hình)
        const saveBtn = document.createElement('button');
        saveBtn.innerText = '💾 XUẤT FILE ĐÃ SỬA (Lưu lại)';
        saveBtn.style.position = 'fixed';
        saveBtn.style.bottom = '20px';
        saveBtn.style.right = '20px';
        saveBtn.style.zIndex = '9999';
        saveBtn.style.padding = '1rem 2rem';
        saveBtn.style.background = 'var(--accent-primary)';
        saveBtn.style.color = 'white';
        saveBtn.style.border = 'none';
        saveBtn.style.borderRadius = '50px';
        saveBtn.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        saveBtn.style.cursor = 'pointer';
        saveBtn.style.fontWeight = 'bold';

        saveBtn.addEventListener('click', exportUpdatedHTML);
        document.body.appendChild(saveBtn);
    }

    function exportUpdatedHTML() {
        // Tạm thời tắt các tính năng admin để lấy code sạch
        const adminBtn = document.querySelector('button[style*="bottom: 20px"]');
        const addBtn = document.querySelector('.project-card[style*="dashed"]');
        if(adminBtn) adminBtn.remove();
        if(addBtn) addBtn.remove();

        const allEditable = document.querySelectorAll('[contenteditable]');
        allEditable.forEach(el => {
            el.removeAttribute('contenteditable');
            el.style.border = '';
            el.style.borderRadius = '';
        });

        // Lấy nội dung HTML
        const htmlContent = document.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        a.click();
        
        alert('Đã tải xuống file index.html mới. Hãy dùng file này để cập nhật lên GitHub nhé!');
        location.reload(); // Reset lại để hiện admin mode nều cần tiếp
    }

    // Smooth Scrolling & Navbar Effect (Giữ nguyên)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
});
