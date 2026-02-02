const navToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const expandTrigger = document.querySelector('.expand-trigger');
const expandBody = document.querySelector('.expand-body');

if (expandTrigger && expandBody) {
  expandTrigger.addEventListener('click', () => {
    const isExpanded = expandTrigger.getAttribute('aria-expanded') === 'true';
    expandTrigger.setAttribute('aria-expanded', String(!isExpanded));
    expandBody.classList.toggle('open');
    expandBody.setAttribute('aria-hidden', String(isExpanded));
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const newsCards = document.querySelectorAll('.news-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    newsCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === 'all' || filter === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const statNumbers = document.querySelectorAll('.stat-number');

const countObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = Number(target.dataset.count);
        const suffix = target.dataset.suffix ?? '';
        let current = 0;
        const increment = Math.ceil(countTo / 80);

        const timer = setInterval(() => {
          current += increment;
          if (current >= countTo) {
            target.textContent = `${countTo}${suffix}`;
            clearInterval(timer);
            return;
          }
          target.textContent = `${current}${suffix}`;
        }, 18);

        obs.unobserve(target);
      }
    });
  },
  { threshold: 0.7 }
);

statNumbers.forEach((stat) => countObserver.observe(stat));

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const offset = window.scrollY * 0.15;
  if (hero) {
    hero.style.transform = `translateY(${offset * -0.1}px)`;
  }
});
