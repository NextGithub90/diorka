// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true, // Animation happens only once while scrolling down
        offset: 100
    });

    // Update Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
            navbar.classList.add('bg-white');
            // Ensure compatibility if initially transparent
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                // Close mobile menu if open
                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navCollapse, {
                        toggle: true
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // Portfolio Mobile Slider
    initPortfolioSlider();
});

// Portfolio Slider Functions
function initPortfolioSlider() {
    const slider = document.getElementById('portfolioSlider');
    const dots = document.querySelectorAll('#sliderDots .dot');
    
    if (!slider || !dots.length) return;

    // Update dots on scroll
    slider.addEventListener('scroll', function() {
        const slideWidth = slider.querySelector('.portfolio-slide').offsetWidth + 15; // include gap
        const scrollPosition = slider.scrollLeft;
        const currentSlide = Math.round(scrollPosition / slideWidth);
        
        updateDots(currentSlide);
    });

    // Click on dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            const slideWidth = slider.querySelector('.portfolio-slide').offsetWidth + 15;
            slider.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
            updateDots(index);
        });
    });

    // Touch swipe enhancement
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (startX - x) * 1.5;
        slider.scrollLeft = scrollLeft + walk;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        // Snap to nearest slide
        const slideWidth = slider.querySelector('.portfolio-slide').offsetWidth + 15;
        const currentSlide = Math.round(slider.scrollLeft / slideWidth);
        slider.scrollTo({
            left: currentSlide * slideWidth,
            behavior: 'smooth'
        });
    });

    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

