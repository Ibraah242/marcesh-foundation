// Marcesh Charty Foundation - Main JavaScript
document.addEventListener('DOMContentLoaded', function () {

    /* ===============================
       BOOTSTRAP TOOLTIPS
    =============================== */
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));


    /* ===============================
       SMOOTH SCROLL
    =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });


    /* ===============================
       ANIMATED COUNTERS
    =============================== */
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = counter => {
        const target = +counter.dataset.target;
        let count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => startCounter(counter), 10);
        } else {
            counter.innerText = target + '+';
        }
    };

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));


    /* ===============================
       FADE IN ON SCROLL
    =============================== */
    const fadeItems = document.querySelectorAll(
        '.project-card, .testimonial-card, .value-card, .team-card, .gallery-card'
    );

    const fadeOnScroll = () => {
        fadeItems.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 150) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', fadeOnScroll);
    fadeOnScroll();


    /* ===============================
       GALLERY FILTER
    =============================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.remove('d-none');
                } else {
                    item.classList.add('d-none');
                }
            });
        });
    });


    /* ===============================
       GALLERY LIGHTBOX
    =============================== */
    const modalEl = document.getElementById('imageModal');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');

        document.querySelectorAll('.gallery-image').forEach(box => {
            box.addEventListener('click', () => {
                const card = box.closest('.gallery-card');
                const img = box.querySelector('img');

                modalImage.src = img.src;
                modalCaption.innerHTML = `
                    <h5>${card.querySelector('h5').innerText}</h5>
                    <p>${card.querySelector('p').innerText}</p>
                `;
                modal.show();
            });
        });
    }


    /* ===============================
       CONTACT FORM
    =============================== */
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            formMessage.style.display = 'block';
            formMessage.textContent = 'Thank you for your message!';
            contactForm.reset();

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }


    /* ===============================
       NEWSLETTER FORM
    =============================== */
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const msg = document.createElement('div');
            msg.className = 'alert alert-success mt-2';
            msg.textContent = 'Thank you for subscribing!';
            form.appendChild(msg);
            form.reset();
            setTimeout(() => msg.remove(), 3000);
        });
    });


    /* ===============================
       NAVBAR SCROLL EFFECT
    =============================== */
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (!nav) return;
        nav.style.background =
            window.scrollY > 50 ? 'rgba(255,255,255,0.95)' : 'white';
    });


    /* ===============================
       HERO SLIDER
    =============================== */
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        new bootstrap.Carousel(heroCarousel, {
            interval: 4000,
            pause: 'hover'
        });
    }

    console.log('Website loaded successfully 🚀');
});
