document.addEventListener("DOMContentLoaded", function () {

    // 1. Inicialização do Carrossel do Bootstrap
    const carouselElement = document.querySelector("#carrosselServicos");
    if (carouselElement && typeof bootstrap !== "undefined") {
        new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            ride: "carousel",
            pause: false,
            wrap: true,
            touch: true
        });
    }

    // 2. Animação de Scroll (IntersectionObserver)
    const reveals = document.querySelectorAll('.revelar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visivel');
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));

    // 3. Menu Hambúrguer (Mobile)
    const hamburger = document.getElementById('menu-hamburguer');
    const navLinksWrap = document.querySelector('.links-navegacao');

    if (hamburger && navLinksWrap) {
        const navItems = navLinksWrap.querySelectorAll('a');

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
            isOpen ? closeMenu() : openMenu();
        });

        navItems.forEach((item) => item.addEventListener('click', closeMenu));

        document.addEventListener('click', (event) => {
            if (!navLinksWrap.classList.contains('ativo')) return;
            if (!navLinksWrap.contains(event.target) && !hamburger.contains(event.target)) {
                closeMenu();
            }
        });
    }

    // 4. Highlight do Menu por Seção no Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.links-navegacao a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) {
                current = s.id;
            }
        });
        navLinks.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--dourado-claro)' : '';
        });
    });
});

// Enviar mensagem formatada diretamente para o WhatsApp
function enviarWhatsApp(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeContato').value;
    const email = document.getElementById('emailContato').value;
    const mensagem = document.getElementById('mensagemContato').value;

    // Coloque aqui o número do WhatsApp da empresa com DDD (ex: 5511999999999)
    const numeroWhatsApp = "5511999999999"; 

    const texto = `Olá! Meu nome é *${nome}*.
E-mail: ${email}

*Mensagem:* ${mensagem}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
}