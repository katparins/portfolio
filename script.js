const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('mobile-menu');
menu.hidden = true; // hide menu by default

// open/close the mobile menu
function toggleMenu() {
    const isOpen = !menu.classList.contains('open');
    menu.classList.toggle('open', isOpen);
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    menu.hidden = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : ''; 
    // lock scroll when open
}

hamburger.addEventListener('click', toggleMenu);

menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
    const href = a.getAttribute('href') || '';
    const isHash = href.startsWith('#');

    if (isHash) {
      e.preventDefault(); // don't reload page
      toggleMenu(); // close dropdown
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) toggleMenu();
});

// close menu if desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menu.classList.remove('open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        document.body.style.overflow = '';
    }
});

const navLinks = document.querySelectorAll('.mobile-menu a');

function clearActive() {
    navLinks.forEach(l => l.classList.remove('active'));
}

function setActiveFor(href) {
    clearActive();
    const link = document.querySelector(`.mobile-menu a[href="${href}"]`);
    if (link) link.classList.add('active');
}

// mark current page as active
function applyActiveFromLocation() {
    if (location.hash) {
        setActiveFor(location.hash);
    } else {
        const homeLink = document.querySelector('.mobile-menu a[href="index.html"]');
        if (homeLink) {
            setActiveFor("index.html");
        }
    }
}

document.addEventListener('DOMContentLoaded', applyActiveFromLocation);
window.addEventListener('hashchange', applyActiveFromLocation);

// update active link when clicking
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#')) {
            setActiveFor(href);
        }
    });
});
