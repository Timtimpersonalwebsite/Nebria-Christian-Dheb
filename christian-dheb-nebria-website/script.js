// JavaScript for Christian Dheb Nebria's Personal Portfolio Website

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect
  const typingElement = document.getElementById('typing-text');
  const words = [
    "Full-Stack Developer",
    "Software Innovator",
    "Creative Problem Solver",
    "Tech Visionary"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 2. Scroll Progress Indicator & Back To Top Button
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');

  function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    const newIconClass = isLight ? 'fa-sun' : 'fa-moon';
    
    if (themeIcon) themeIcon.className = `fas ${newIconClass}`;
    if (mobileThemeIcon) mobileThemeIcon.className = `fas ${newIconClass}`;

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  // Load saved theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
    if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-sun';
  }

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 5. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-indigo-600', 'text-white');
        b.classList.add('text-slate-400', 'bg-slate-800/60');
      });

      btn.classList.add('active', 'bg-indigo-600', 'text-white');
      btn.classList.remove('text-slate-400', 'bg-slate-800/60');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Number Counter Animation
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  function runCounters() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 40;

        const updateCounter = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCounter, 30);
          } else {
            counter.innerText = target;
          }
        };
        updateCounter();
      });
    }
  }

  window.addEventListener('scroll', runCounters);

  // 7. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fas fa-paper-plane text-xs"></i> <span>Send Message</span>`;
        }

        formFeedback.className = "p-4 rounded-xl text-xs font-semibold text-center bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
        formFeedback.textContent = "Thank you, Christian Dheb Nebria has received your message! I will reply shortly.";
        formFeedback.classList.remove('hidden');

        contactForm.reset();

        setTimeout(() => {
          formFeedback.classList.add('hidden');
        }, 6000);
      }, 1200);
    });
  }
});
