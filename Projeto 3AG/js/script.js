document.addEventListener("DOMContentLoaded", function () {

    const carouselElement = document.querySelector("#carrosselServicos");

    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        ride: "carousel",
        pause: false,
        wrap: true,
        touch: true
    });

    const indicators = document.querySelectorAll(".carousel-indicators button");

    carouselElement.addEventListener("slide.bs.carousel", function (event) {
        indicators.forEach((btn) => {
            btn.classList.remove("active");
            btn.removeAttribute("aria-current");
        });

        indicators[event.to].classList.add("active");
        indicators[event.to].setAttribute("aria-current", "true");
    });

});


const reveals = document.querySelectorAll('.revelar');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visivel');
        }
    });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));


const hamburger = document.getElementById('menu-hamburguer');
const navLinksWrap = document.querySelector('.links-navegacao');

if (hamburger && navLinksWrap) {
    const navItems = navLinksWrap.querySelectorAll('a');

    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');

    const closeMenu = () => {
        navLinksWrap.classList.remove('ativo');
        hamburger.classList.remove('ativo');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menu');
    };

    const openMenu = () => {
        navLinksWrap.classList.add('ativo');
        hamburger.classList.add('ativo');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Fechar menu');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navLinksWrap.classList.contains('ativo');
        if (isOpen) {
            closeMenu();
            return;
        }
        openMenu();
    });

    navItems.forEach((item) => {
        item.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (!navLinksWrap.classList.contains('ativo')) {
            return;
        }

        const clickedInsideMenu = navLinksWrap.contains(event.target);
        const clickedHamburger = hamburger.contains(event.target);

        if (!clickedInsideMenu && !clickedHamburger) {
            closeMenu();
        }
    });
}


const servicesTrack = document.getElementById('trilhaServicos');
const servicesDotsWrap = document.querySelector('.carousel-indicators');
const servicePrev = document.querySelector('[data-bs-slide="prev"]');
const serviceNext = document.querySelector('[data-bs-slide="next"]');

if (servicesTrack && servicesDotsWrap && servicePrev && serviceNext) {
    const slides = Array.from(servicesTrack.querySelectorAll('.cartao-servico'));
    const dots = Array.from(servicesDotsWrap.querySelectorAll('.ponto-carrossel'));
    let serviceIndex = 0;

    const updateServicesCarousel = () => {
        servicesTrack.style.transform = `translateX(-${serviceIndex * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('ativo', index === serviceIndex);
        });

        servicePrev.disabled = serviceIndex === 0;
        serviceNext.disabled = serviceIndex === slides.length - 1;
    };

    servicePrev.addEventListener('click', () => {
        serviceIndex = Math.max(0, serviceIndex - 1);
        updateServicesCarousel();
    });

    serviceNext.addEventListener('click', () => {
        serviceIndex = Math.min(slides.length - 1, serviceIndex + 1);
        updateServicesCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            serviceIndex = index;
            updateServicesCarousel();
        });
    });

    updateServicesCarousel();
} else {
    
    const dots = Array.from(document.querySelectorAll('.ponto-carrossel'));
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('ativo'));
            dot.classList.add('ativo');
        });
    });
}


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.links-navegacao a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--dourado-claro)' : '';
    });
});

function janela(){
    alert("Suas informações foram resgistradas, entraremos em contato o mais breve possível!");
}



