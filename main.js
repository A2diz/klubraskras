// Intersection Observer for fade-in-up animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.about-card, .book-card, .step, .naming-inner, .about-text'
).forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});


// Formspree success message
const form = document.querySelector('.name-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Отправляем...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center; color:#fff; padding:2rem 0;">
            <div style="font-size:3rem; margin-bottom:1rem;">💌</div>
            <p style="font-size:1.1rem; font-weight:700; color:#fff;">Спасибо! Твоё предложение получено.</p>
            <p style="color:rgba(255,255,255,0.85); margin-top:0.5rem;">Мы выберем самое лучшее название ✨</p>
          </div>`;
      } else {
        throw new Error('Ошибка');
      }
    } catch {
      btn.textContent = 'Попробуй ещё раз';
      btn.disabled = false;
    }
  });
// Загрузка изображений из data-src
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-item').forEach(item => {
    const src = item.getAttribute('data-src');
    if (!src) return;

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';

    item.innerHTML = '';
    item.appendChild(img);
  });
}
