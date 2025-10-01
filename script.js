const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('mobile-menu');
if (menu) menu.hidden = true; // hide menu by default

// check if current page is homepage
function isIndexPage() {
    const file = location.pathname.split('/').pop().toLowerCase();
    return file === '' || file === 'index.html';
}

// show/hide mobile menu
function toggleMenu() {
    if (!menu) return;
    const isOpen = !menu.classList.contains('open');
    menu.classList.toggle('open', isOpen);
    hamburger?.classList.toggle('is-active', isOpen);
    hamburger?.setAttribute('aria-expanded', String(isOpen));
    menu.hidden = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// remove active state from all links
function clearActive() {
    document.querySelectorAll('.nav a, .mobile-menu a')
    .forEach(a => a.classList.remove('active'));
}

// mark one link as active
function setActiveSelector(sel) {
    clearActive();
    document.querySelectorAll(sel).forEach(a => a.classList.add('active'));
}

// toggle menu when hamburger is clicked
hamburger?.addEventListener('click', toggleMenu);

// close menu with esc key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('open')) toggleMenu();
});

// close menu if switching to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu) {
        menu.classList.remove('open');
        hamburger?.classList.remove('is-active');
        hamburger?.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        document.body.style.overflow = '';
    }
});

// handle clicks on menu links
menu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href') || '';
        const isHash = href.startsWith('#');

        if (isHash) {
            if (isIndexPage()) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    toggleMenu();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start'});
                    setActiveSelector(`.mobile-menu a[href="${href}"], .nav a[href="${href}"]`);
                    return;
                }

            } else {
                e.preventDefault();
                toggleMenu();
                window.location.href = `index.html${href}`;
            }
        }
    });
});

// highlight correct link when page loads or hash changes
function applyActiveFromLocation() {
    const file = (location.pathname.split('/').pop().toLowerCase()) 
    || 'index.html';
    const hash = (location.hash || '').toLowerCase();

    if (isIndexPage() && (hash === '#about' || hash === '#resume' || hash === '#work')) {
        setActiveSelector(`.mobile-menu a[href="${hash}"], .nav a[href="${hash}"]`);
        return;
    }

    if (file === 'contact.html') {
        setActiveSelector(`.mobile-menu a[href="contact.html"], .nav a[href="contact.html"]`);
        return;
    }

    // default to home
    setActiveSelector(`.mobile-menu a[href="index.html"], .nav a[href="index.html"], .mobile-menu a[href="./"], .nav a[href="./"]`);
}

// run when page loads or hash changes
document.addEventListener('DOMContentLoaded', applyActiveFromLocation);
window.addEventListener('hashchange', applyActiveFromLocation);
