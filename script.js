document.addEventListener('DOMContentLoaded', () => {

  /* ===== HAMBURGER MENU ===== */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ===== GALLERY LIGHTBOX ===== */
  const fadeEls = document.querySelectorAll('.fade-in');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => revealObserver.observe(el));

  /* ===== COUNTER ANIMATION ===== */
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + '+';
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  /* ===== TESTIMONIALS SLIDER ===== */
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('testimonialsDots');
  if (track && dotsContainer) {
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIdx = 0;

    cards.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(btn);
    });

    function goToSlide(idx) {
      currentIdx = idx;
      track.style.transform = `translateX(-${currentIdx * 100}%)`;
      dotsContainer.querySelectorAll('button').forEach((btn, i) => {
        btn.classList.toggle('active', i === currentIdx);
      });
    }

    goToSlide(0);

    setInterval(() => {
      goToSlide((currentIdx + 1) % cards.length);
    }, 5000);
  }

  /* ===== LIGHTBOX ===== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-content img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  const galleryImages = [
    'https://images.pexels.com/photos/3998407/pexels-photo-3998407.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/4627333/pexels-photo-4627333.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/897271/pexels-photo-897271.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/19664892/pexels-photo-19664892.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/8867165/pexels-photo-8867165.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/5152514/pexels-photo-5152514.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/3998391/pexels-photo-3998391.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/9146943/pexels-photo-9146943.jpeg?auto=compress&cs=tinysrgb&w=1000',
  ];

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex];
    lightboxImg.alt = 'Gallery image';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

});
