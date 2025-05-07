document.addEventListener('DOMContentLoaded', () => {
  // ===== Fade-in Observer =====
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, appearOptions);

  document.querySelectorAll('.fade-in-section').forEach(el => appearOnScroll.observe(el));
  document.querySelectorAll('hr').forEach(el => appearOnScroll.observe(el));

  // ===== Mobile Nav Toggle =====
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // ===== Dark/Light Mode Toggle =====
  const themeToggle = document.getElementById('theme-toggle');

  // Load saved or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    themeToggle.checked = prefersDark;
  }

  // On toggle change, update theme and persist
  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});
