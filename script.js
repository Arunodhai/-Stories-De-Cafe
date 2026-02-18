const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealItems.forEach((item) => observer.observe(item));

document.getElementById('year').textContent = new Date().getFullYear();

const clickableImages = document.querySelectorAll(
  '#signature img, #menu-images img, #gallery img'
);

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Close image popup">×</button>
  <img class="lightbox-image" alt="Preview" />
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxClose = lightbox.querySelector('.lightbox-close');

const closeLightbox = () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
};

const openLightbox = (src, alt) => {
  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Image preview';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
};

clickableImages.forEach((image) => {
  image.classList.add('clickable-image');
  image.setAttribute('tabindex', '0');
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', 'Open image popup');

  image.addEventListener('click', () => {
    openLightbox(image.src, image.alt);
  });

  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(image.src, image.alt);
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});
