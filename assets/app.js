(function(){
  const cfg = window.ESCAPELY_PAGE_CONFIG || {};
  function $(sel, root=document){ return root.querySelector(sel); }
  function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
  function openModal(title, html){
    const modal = $('#local-modal');
    if (!modal) return;
    $('#local-modal-title').textContent = title || '';
    $('#local-modal-body').innerHTML = html || '';
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    const modal = $('#local-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
  }
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-modal]')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  const tooltips = cfg.tooltips || {};
  Object.entries(tooltips).forEach(([id, data]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(data.title, data.html);
    });
  });

  if (cfg.footerHint) {
    const footerItems = $all('.footer__container__loginNotRequired > div');
    const hintItem = footerItems[1];
    if (hintItem) {
      hintItem.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(cfg.footerHint.title, cfg.footerHint.html);
      });
    }
  }

  function resolveHref(target) {
    if (!target) return target;
    if (/^https?:/i.test(target)) return target;
    const onPages = location.pathname.startsWith('/escapely/');
    const clean = target.replace(/^\//, '');
    if (onPages) return '/escapely/' + clean.replace(/^escapely\//, '');
    return '/' + clean.replace(/^escapely\//, '');
  }

  if (cfg.answer) {
    const input = $('.sol-enter input');
    const button = $('.submit--btn');
    const error = $('.sol-enter p');
    const submit = () => {
      const value = (input?.value || '').trim().toUpperCase();
      if (value === cfg.answer.expected) {
        window.location.href = resolveHref(cfg.answer.next);
      } else if (error) {
        error.textContent = value ? 'Try again.' : 'Enter an answer.';
      }
    };
    if (button) button.addEventListener('click', submit);
    if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
  }

  if (cfg.continueHref) {
    const button = $all('.submit--btn').find(el => /continue/i.test(el.textContent || ''));
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = resolveHref(cfg.continueHref);
      });
    }
  }

  // final video page: keep inline video working with local media
  const vid = $('.video-react-video');
  if (vid) {
    vid.setAttribute('controls', 'controls');
    vid.setAttribute('playsinline', 'playsinline');
  }
})();
