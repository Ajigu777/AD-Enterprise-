/* ======================================
   AD ENTERPRISE – PREMIUM GLOBAL SCRIPT
   Fully Corrected | Optimized | Modular
====================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================
     GLOBAL ELEMENTS
  ====================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const dropdownBtns = document.querySelectorAll('[data-dropdown-btn]');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const testimonialTrack = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const mapContainer = document.getElementById('leafletMap');
  const whatsappToggle = document.getElementById('whatsappToggle');
  const whatsappMessage = document.getElementById('whatsappMessage');
  const bookConsultationBtn = document.getElementById('bookConsultation');
  const contactExpertsBtn = document.getElementById('contactExpertsBtn');
  const bookConsultationLink = document.getElementById('bookConsultationLink');
  const downloadBtn = document.getElementById('downloadPDF');

  const header = document.getElementById('mainHeader');
  const logo = document.getElementById('logo');
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');
  const whatsappBase = 'https://wa.me/2348134630976?text=';

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");

  /* ======================================
     UTILITIES
  ====================================== */
  const debounce = (func, delay = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const openWhatsApp = (message) => {
    window.open(`${whatsappBase}${encodeURIComponent(message)}`, '_blank');
  };

  /* ======================================
     RESPONSIVE MENU
  ====================================== */
  const handleHamburgerVisibility = () => {
    if (!mobileMenuBtn) return;
    if (window.innerWidth >= 1024) {
      mobileMenuBtn.classList.add('hidden');
      mobileMenu?.classList.add('hidden');
    } else {
      mobileMenuBtn.classList.remove('hidden');
    }
  };

  window.addEventListener('resize', debounce(handleHamburgerVisibility));
  handleHamburgerVisibility();

  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('-translate-x-full');
  });

  mobileMenuClose?.addEventListener('click', () => {
    mobileMenu?.classList.add('-translate-x-full');
  });

  /* ======================================
     HEADER SHRINK + SCROLLSPY
  ====================================== */
  const handleScroll = () => {

    // Header shrink
    if (window.scrollY > 50) {
      header?.classList.add('bg-white/95', 'shadow-lg', 'backdrop-blur');
      logo?.classList.replace('w-11', 'w-10');
      logo?.classList.replace('h-11', 'h-10');
    } else {
      header?.classList.remove('bg-white/95', 'shadow-lg', 'backdrop-blur');
      logo?.classList.replace('w-10', 'w-11');
      logo?.classList.replace('h-10', 'h-11');
    }

    // ScrollSpy
    let current = '';
    sections.forEach(section => {
      const offset = section.offsetTop - 120;
      if (pageYOffset >= offset) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.remove('text-primary');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-primary');
      }
    });
  };

  window.addEventListener('scroll', debounce(handleScroll), { passive: true });

  /* ======================================
     HERO SLIDER
  ====================================== */
  let currentHero = 0;
  const showHeroSlide = (index) => {
    heroSlides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.pointerEvents = i === index ? 'auto' : 'none';
      slide.style.position = 'absolute';
      slide.style.top = '0';
      slide.style.left = '0';
      slide.style.width = '100%';
      slide.style.transition = 'opacity 1s ease';
    });
  };

  const startHeroSlider = () => {
    if (!heroSlides.length) return;
    setInterval(() => {
      currentHero = (currentHero + 1) % heroSlides.length;
      showHeroSlide(currentHero);
    }, 6000);
  };

  if (heroSlides.length > 0) {
    showHeroSlide(currentHero);
    startHeroSlider();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearInterval(startHeroSlider);
      else startHeroSlider();
    });
  }

  /* ======================================
     TESTIMONIAL SLIDER
  ====================================== */
  let testimonialIndex = 0;
  const updateTestimonial = () => {
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    testimonialTrack.style.transition = 'transform 0.5s ease';
  };

  nextBtn?.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialTrack.children.length;
    updateTestimonial();
  });

  prevBtn?.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonialTrack.children.length) % testimonialTrack.children.length;
    updateTestimonial();
  });

  // Swipe support
  let startX = 0;
  testimonialTrack?.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  testimonialTrack?.addEventListener('touchend', e => {
    let diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) nextBtn?.click();
    if (diff < -50) prevBtn?.click();
  });

  /* ======================================
     PORTFOLIO FILTER
  ====================================== */
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button state
      filterButtons.forEach(b => b.classList.remove('bg-primary', 'text-black'));
      btn.classList.add('bg-primary', 'text-black');

      // Show/hide projects
      projects.forEach(project => {
        if (filter === "all" || project.dataset.category === filter) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      });
    });
  });

  /* ======================================
     VIDEO PLAY/PAUSE
  ====================================== */
  document.querySelectorAll(".video-toggle").forEach(button => {
    button.addEventListener("click", function () {
      const video = this.parentElement.querySelector(".event-video");

      // Pause all other videos
      document.querySelectorAll(".event-video").forEach(v => {
        if (v !== video) {
          v.pause();
          v.nextElementSibling.textContent = "▶";
        }
      });

      if (video.paused) {
        video.play();
        this.textContent = "❚❚";
        this.classList.remove("bg-black/40");
        this.classList.add("bg-black/20");
      } else {
        video.pause();
        this.textContent = "▶";
        this.classList.remove("bg-black/20");
        this.classList.add("bg-black/40");
      }
    });
  });

  /* ======================================
     LEAFLET MAP
  ====================================== */
  if (mapContainer && typeof L !== "undefined") {
    const map = L.map('leafletMap').setView([6.5244, 3.3792], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    L.marker([6.5244, 3.3792])
      .addTo(map)
      .bindPopup('<b>AD Enterprise</b><br>Lagos, Nigeria');
  }

  /* ======================================
     WHATSAPP BUTTONS
  ====================================== */
  whatsappToggle?.addEventListener('click', () => {
    whatsappMessage?.classList.toggle('opacity-100');
    openWhatsApp("Hello, I would like to speak to a consultant.");
  });

  bookConsultationBtn?.addEventListener('click', () =>
    openWhatsApp("Hello, I would like to book a consultation.")
  );

  contactExpertsBtn?.addEventListener('click', () =>
    openWhatsApp("Hello, I would like to contact your experts.")
  );

  bookConsultationLink?.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp("Hello, I would like to book a consultation.");
  });

  /* ======================================
     SCROLL ANIMATIONS
  ====================================== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeUp-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate-fadeUp').forEach(el => observer.observe(el));

  /* ======================================
     PDF DOWNLOAD
  ====================================== */
  downloadBtn?.addEventListener('click', () => window.print());

});

// Smooth scroll for hero buttons and nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const headerOffset = document.getElementById('mainHeader').offsetHeight;
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});