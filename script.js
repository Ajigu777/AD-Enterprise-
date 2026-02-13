/* =======================
   MOBILE NAVIGATION TOGGLE
======================= */
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    if (mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== "0px") {
      mobileMenu.style.maxHeight = "0px";
    } else {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    }
  });
}

/* =======================
   PORTFOLIO FILTERING
======================= */
const categoryButtons = document.querySelectorAll('.category-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');

    portfolioItems.forEach((item, index) => {
      if (category === 'all' || item.classList.contains(category)) {
        item.style.display = 'block';
        setTimeout(() => item.classList.add('appear'), index * 100);
      } else {
        item.style.display = 'none';
        item.classList.remove('appear');
      }
    });
  });
});

/* =======================
   SCROLL FADE-UP ANIMATION
======================= */
const faders = document.querySelectorAll('.fade-up');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

/* =======================
   WHATSAPP CONTACT FORM
======================= */
document.addEventListener("DOMContentLoaded", () => {

  const contactForm = document.querySelector('#contact form');
  const sendBtn = document.getElementById('contactWhatsappBtn');

  const whatsappNumber = '2348134630976'; // NO +

  if (!contactForm || !sendBtn) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // 🚫 stop page reload

    // Button loading state
    sendBtn.disabled = true;
    sendBtn.innerHTML = `
      <span class="flex items-center justify-center gap-2">
        <span class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        Sending...
      </span>
    `;

    const name = contactForm.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = contactForm.querySelector('input[placeholder="Email Address"]').value.trim();
    const subject = contactForm.querySelector('input[placeholder="Subject"]').value.trim();
    const message = contactForm.querySelector('textarea[placeholder="Your Message"]').value.trim();

    const whatsappMessage = `
Hello AD Enterprise 👋

Name: ${name}
Email: ${email}

Subject: ${subject}

Message:
${message}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Reset form & button after short delay
    setTimeout(() => {
      contactForm.reset();
      sendBtn.disabled = false;
      sendBtn.innerHTML = 'Send Message via WhatsApp';
    }, 1200);
  });

});

/* =======================
   SMOOTH SCROLL FOR NAV LINKS
======================= */
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (mobileMenu && mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== "0px") {
      mobileMenu.style.maxHeight = "0px";
    }
  });
});

/* =======================
   HERO "GET IN TOUCH" BUTTON
======================= */
const heroContactBtn = document.getElementById('hero-contact-btn');
const contactSection = document.getElementById('contact');

if (heroContactBtn && contactSection) {
  heroContactBtn.addEventListener('click', () => {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}