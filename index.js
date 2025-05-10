document.addEventListener('DOMContentLoaded', () => {
  // ===== Fade-in Observer =====
  const appearOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, appearOptions);
  document.querySelectorAll('.fade-in-section, hr').forEach(el => observer.observe(el));

  // ===== Mobile Nav Toggle =====
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  window.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // ===== Dark/Light Mode Toggle =====
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme  = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    document.body.setAttribute('data-theme', prefersLight ? 'dark' : 'light');
    themeToggle.checked = prefersLight;
  }
  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ===== Contact Form Submission =====
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submit behavior (page reload)

    // Get the form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // For demonstration purposes, log the values
    console.log('name:', name);
    console.log('email:', email);
    console.log('message:', message);

    // Send the form data to EmailJS
    emailjs.sendForm('service_127sx7w', 'template_t7xtf9u', contactForm)
      .then(() => {
        alert('Message sent successfully!');
        contactForm.reset(); // Reset the form after successful submission
      }, (error) => {
        console.error('Error sending message:', error);
        alert('Oops, something went wrong. Please try again.');
      });
  });

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
