const normalizeAnswer = (value) => value.replace(/[^a-z0-9]/gi, '').toUpperCase();

document.querySelectorAll('[data-answer-form]').forEach((form) => {
  const expected = form.dataset.answer || '';
  const success = form.dataset.success || '/';
  const input = form.querySelector('input[name="answer"]');
  const feedback = form.querySelector('[data-feedback]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const attempt = normalizeAnswer(input.value || '');
    if (!attempt) {
      feedback.textContent = 'Enter your answer to continue.';
      feedback.className = 'feedback error';
      return;
    }
    if (attempt === normalizeAnswer(expected)) {
      feedback.textContent = 'Access granted. Redirecting…';
      feedback.className = 'feedback success';
      setTimeout(() => { window.location.href = success; }, 450);
      return;
    }
    feedback.textContent = 'That answer is not correct. Review the clue materials and try again.';
    feedback.className = 'feedback error';
  });
});

document.querySelectorAll('[data-open-overlay]').forEach((button) => {
  button.addEventListener('click', () => {
    const selector = button.getAttribute('data-open-overlay');
    const overlay = document.querySelector(selector);
    if (overlay) overlay.classList.add('open');
  });
});

document.querySelectorAll('[data-close-overlay]').forEach((button) => {
  button.addEventListener('click', () => {
    const overlay = button.closest('.overlay');
    if (overlay) overlay.classList.remove('open');
  });
});

document.querySelectorAll('.overlay').forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) overlay.classList.remove('open');
  });
});

document.querySelectorAll('.acc-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    if (panel) panel.classList.toggle('open', !open);
  });
});
