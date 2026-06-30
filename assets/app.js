document.addEventListener('click', (event) => {
  const open = event.target.closest('[data-open-modal]');
  if (open) {
    const modal = document.querySelector(open.getAttribute('data-open-modal'));
    if (modal) modal.classList.add('open');
    return;
  }
  if (event.target.matches('[data-close-modal]') || event.target.classList.contains('video-modal')) {
    const modal = event.target.closest('.video-modal') || event.target;
    if (modal) {
      modal.classList.remove('open');
      const video = modal.querySelector('video');
      if (video) video.pause();
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.video-modal.open').forEach((modal) => {
      modal.classList.remove('open');
      const video = modal.querySelector('video');
      if (video) video.pause();
    });
  }
});

function wireAnswerForm(formSelector, expected, nextUrl) {
  const form = document.querySelector(formSelector);
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    const value = (input?.value || '').trim().toUpperCase();
    if (value === expected) window.location.href = nextUrl;
  });
}
