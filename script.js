document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth Scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Glass Navbar effect on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '0.8rem 10%';
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.padding = '1.5rem 10%';
            nav.style.boxShadow = 'none';
        }
    });

    // Dynamic Gradient Tracking (Optional: Mouse move interaction)
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const sphere1 = document.querySelector('.sphere-1');
        const sphere2 = document.querySelector('.sphere-2');
        
        sphere1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        sphere2.style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
    });
});
