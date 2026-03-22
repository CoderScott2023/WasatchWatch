document.addEventListener('DOMContentLoaded', () => {

  const burger = document.querySelector('.ww-nav__burger');
  const navLinks = document.querySelector('.ww-nav__links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
  }


  document.querySelectorAll('.ww-nav__links .has-dropdown').forEach(item => {
    let closeTimer = null;

    const openDropdown = () => {
      clearTimeout(closeTimer);
      document.querySelectorAll('.ww-nav__links .has-dropdown').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.add('open');
    };

    const scheduleClose = () => {
      closeTimer = setTimeout(() => item.classList.remove('open'), 200);
    };

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 720) openDropdown();
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 720) scheduleClose();
    });

    const dropdown = item.querySelector('.ww-nav__dropdown');
    if (dropdown) {
      dropdown.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      dropdown.addEventListener('mouseleave', () => scheduleClose());
    }
  });
  document.querySelectorAll('.ww-nav__links .has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 720) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ww-nav__links a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop();
    if (href === currentPath) a.classList.add('active');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.ww-section').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  const lightbox = document.createElement('div');
  lightbox.id = 'ww-lightbox';
  lightbox.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,0.92);
    cursor: zoom-out;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  `;

  const lightboxImg = document.createElement('img');
  lightboxImg.style.cssText = `
    max-width: 100%;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.6);
    object-fit: contain;
  `;

  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  document.querySelectorAll('.ww-map-card img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

});
