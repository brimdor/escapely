(function(){
  const cfg = window.ESCAPELY_PAGE_CONFIG || {};
  const host = document.getElementById('dialog-host');
  const $ = (sel, root=document) => root.querySelector(sel);
  const $all = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const MOBILE_MENU_HTML = `
    <div class="footer__dropdown" data-local-menu>
      <button class="footer__close" type="button" aria-label="Close menu"><i class="fa fa-angle-down"></i></button>
      <div class="footer__menu">
        <button type="button" data-menu-action="tutorial">TUTORIAL</button>
        <div class="footer__submenu">
          <button type="button" class="footer__submenu__btn" data-menu-action="toggle-gamemode">GAME MODE <i class="fa fa-angle-right"></i></button>
          <div class="footer__submenu__list" hidden>
            <button type="button" data-menu-action="mode-casual" style="background-color:white;color:black;text-align:center;">Casual</button>
          </div>
        </div>
        <button type="button" data-menu-action="account">ACCOUNT</button>
        <button type="button" data-menu-action="logout">LOGOUT</button>
      </div>
    </div>`;
  const WRONG_ANSWER_DIALOG_HTML = `
    <div class="MuiBackdrop-root" aria-hidden="true" style="opacity:1;transition:opacity 225ms cubic-bezier(0.4,0,0.2,1);"></div>
    <div tabindex="0" data-test="sentinelStart"></div>
    <div class="MuiDialog-container MuiDialog-scrollPaper" style="opacity:1;transition:opacity 225ms cubic-bezier(0.4,0,0.2,1);" role="none presentation" tabindex="-1">
      <div class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded" role="dialog" aria-describedby="alert-dialog-description" aria-labelledby="alert-dialog-title">
        <div class="MuiDialogContent-root">
          <p class="MuiTypography-root MuiDialogContentText-root dialog-desc MuiTypography-body1 MuiTypography-colorTextSecondary" id="alert-dialog-description" style="margin-bottom:2.2rem;">
            <div><p>That answer is not correct. Please try again.</p></div>
          </p>
        </div>
        <div class="MuiDialogActions-root MuiDialogActions-spacing">
          <button class="MuiButtonBase-root MuiButton-root MuiButton-contained dialog-btn-dismiss Mui-focusVisible Mui-focusVisible" tabindex="0" type="button" style="margin-bottom:2.2rem;">
            <span class="MuiButton-label">Okay</span><span class="MuiTouchRipple-root"></span>
          </button>
        </div>
      </div>
    </div>
    <div tabindex="0" data-test="sentinelEnd"></div>`;

  function resolveHref(href){
    if(!href) return window.location.href;
    if(/^https?:\/\//i.test(href)) return href;
    let normalized = href;
    const runningUnderPagesBase = window.location.pathname.startsWith('/escapely/');
    if(!runningUnderPagesBase && normalized.startsWith('/escapely/')) normalized = normalized.replace(/^\/escapely/, '');
    return new URL(normalized, window.location.origin).href;
  }

  async function fetchText(path){
    const res = await fetch(path, { credentials:'same-origin' });
    if(!res.ok) throw new Error(`fetch failed: ${path}`);
    return await res.text();
  }

  function closeDialog(){
    if(host) host.innerHTML = '';
    document.body.style.overflow = '';
    if(location.hash === '#hintOpen') history.replaceState(null, '', location.pathname + location.search);
  }

  function collapseAccordion(acc){
    const summary = $('.MuiAccordionSummary-root', acc);
    const content = $('.MuiCollapse-root', acc);
    const expandIcon = $('.MuiAccordionSummary-expandIcon', acc);
    const sumContent = $('.MuiAccordionSummary-content', acc);
    acc.classList.remove('Mui-expanded');
    if(summary){ summary.classList.remove('Mui-expanded'); summary.setAttribute('aria-expanded','false'); }
    if(sumContent) sumContent.classList.remove('Mui-expanded');
    if(expandIcon) expandIcon.classList.remove('Mui-expanded');
    if(content){
      content.classList.remove('MuiCollapse-entered');
      content.classList.add('MuiCollapse-hidden');
      content.style.height = '0px';
      content.style.minHeight = '0px';
      content.hidden = true;
    }
  }

  function expandAccordion(acc){
    const summary = $('.MuiAccordionSummary-root', acc);
    const content = $('.MuiCollapse-root', acc);
    const expandIcon = $('.MuiAccordionSummary-expandIcon', acc);
    const sumContent = $('.MuiAccordionSummary-content', acc);
    acc.classList.add('Mui-expanded');
    if(summary){ summary.classList.add('Mui-expanded'); summary.setAttribute('aria-expanded','true'); }
    if(sumContent) sumContent.classList.add('Mui-expanded');
    if(expandIcon) expandIcon.classList.add('Mui-expanded');
    if(content){
      content.hidden = false;
      content.classList.remove('MuiCollapse-hidden');
      content.classList.add('MuiCollapse-entered');
      content.style.height = 'auto';
      content.style.minHeight = '0px';
    }
  }

  function wireAccordions(root){
    const accordions = $all('.MuiAccordion-root', root);
    accordions.forEach(collapseAccordion);
    accordions.forEach(acc => {
      const summary = $('.MuiAccordionSummary-root', acc);
      if(!summary) return;
      summary.addEventListener('click', e => {
        e.preventDefault();
        const expanded = summary.getAttribute('aria-expanded') === 'true';
        if(expanded) collapseAccordion(acc); else expandAccordion(acc);
      });
    });
  }

  function normalizeHintDialog(root){
    const paper = $('.MuiDialog-paper,.MuiDialog-paperScrollPaper', root);
    const footer = $('.Hints-footer', root);
    if(!paper || !footer) return;
    const stray = Array.from(paper.children).filter(el => {
      if(!(el instanceof HTMLElement)) return false;
      if(el.classList.contains('MuiDialogContent-root')) return false;
      if(el.classList.contains('MuiDialogActions-root')) return false;
      return el.classList.contains('MuiAccordion-root');
    });
    stray.forEach(el => footer.appendChild(el));
  }

  function wireDialog(root){
    wireAccordions(root);
    $all('.back_btn_hint,.dialog-btn-dismiss', root).forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); closeDialog(); }));
    const backdrop = $('.MuiBackdrop-root', root);
    if(backdrop) backdrop.addEventListener('click', closeDialog);
  }

  function openHtmlDialog(html, opts={}){
    if(!host) return;
    const isHintDialog = /class=["'][^"']*Hints[^"']*["']/.test(html);
    host.innerHTML = `<div class="MuiDialog-root local-dialog-root${isHintDialog ? ' local-dialog--hint' : ''}" role="presentation">${html}</div>`;
    document.body.style.overflow = 'hidden';
    if(opts.hintHash) history.replaceState(null, '', location.pathname + location.search + '#hintOpen');
    if(isHintDialog) normalizeHintDialog(host);
    wireDialog(host);
    if(isHintDialog){
      const footer = host.querySelector('.Hints-footer');
      const content = host.querySelector('.MuiDialogContent-root');
      if(content) content.scrollTop = 0;
      if(footer) footer.scrollTop = 0;
    }
  }

  async function openDialog(path, opts={}){
    if(!path) return;
    const html = await fetchText(path);
    openHtmlDialog(html, opts);
  }

  function openWrongAnswerDialog(){
    openHtmlDialog(WRONG_ANSWER_DIALOG_HTML);
  }

  function closeMenu(){
    const menu = document.querySelector('[data-local-menu]');
    if(menu) menu.remove();
  }

  function openMenu(){
    closeMenu();
    const wrap = document.createElement('div');
    wrap.innerHTML = MOBILE_MENU_HTML.trim();
    const menu = wrap.firstElementChild;
    document.body.appendChild(menu);
    const submenu = menu.querySelector('.footer__submenu__list');
    menu.querySelector('.footer__close').addEventListener('click', closeMenu);
    menu.addEventListener('click', e => { if(e.target === menu) closeMenu(); });
    menu.querySelector('[data-menu-action="toggle-gamemode"]').addEventListener('click', e => { e.stopPropagation(); submenu.hidden = !submenu.hidden; });
    menu.querySelector('[data-menu-action="mode-casual"]').addEventListener('click', () => { localStorage.setItem('selectedGameMode', JSON.stringify([{ gameId:'65afce29f2217175db3444c5', gameMode:'casual', gameModeName:'Casual', isSetDefault:false }])); closeMenu(); });
    menu.querySelector('[data-menu-action="tutorial"]').addEventListener('click', () => { window.location.href = 'https://escapelygames.com/tutorial:65afce29f2217175db3444c5'; });
    menu.querySelector('[data-menu-action="account"]').addEventListener('click', () => { localStorage.setItem('backLink', window.location.href); window.location.href = 'https://escapelygames.com/profile'; });
    menu.querySelector('[data-menu-action="logout"]').addEventListener('click', () => { localStorage.removeItem('accesstoken'); localStorage.removeItem('accessToken'); localStorage.removeItem('backLink'); window.location.href = 'https://escapelygames.com/'; });
    document.addEventListener('mousedown', function onDoc(e){
      const liveMenu = document.querySelector('[data-local-menu]');
      if(!liveMenu){ document.removeEventListener('mousedown', onDoc); return; }
      if(!liveMenu.contains(e.target)){ closeMenu(); document.removeEventListener('mousedown', onDoc); }
    });
  }

  function bindTooltips(){
    const dialogs = cfg.tooltipDialogs || {};
    Object.entries(dialogs).forEach(([id, path]) => {
      const el = document.getElementById(id);
      if(el) el.addEventListener('click', e => { e.preventDefault(); openDialog(path); });
    });
  }

  function bindFooter(){
    const items = $all('.footer__container__loginNotRequired > div');
    if(items[0]) items[0].addEventListener('click', e => { e.preventDefault(); openMenu(); });
    if(items[1] && cfg.hintDialog && !/Gray/.test(($('img', items[1])?.src || ''))) items[1].addEventListener('click', e => { e.preventDefault(); openDialog(cfg.hintDialog, { hintHash:true }); });
    if(items[2]) items[2].addEventListener('click', e => { e.preventDefault(); window.open('https://escapely.com/shop/', '_blank'); });
  }

  function bindAnswerSubmit(){
    if(!cfg.answer) return;
    const input = $('input[type=text]');
    const btn = $('.submit--btn');
    if(!input || !btn) return;
    const submit = () => {
      const got = (input.value || '').trim().toUpperCase();
      const exp = (cfg.answer.expected || '').trim().toUpperCase();
      if(!got) return;
      if(got === exp) window.location.href = resolveHref(cfg.answer.next);
      else openWrongAnswerDialog();
    };
    btn.addEventListener('click', submit);
    input.addEventListener('keydown', e => { if(e.key === 'Enter') submit(); });
  }

  function bindContinue(){
    if(!cfg.continueHref) return;
    const btn = $('.submit--btn');
    if(btn) btn.addEventListener('click', e => { e.preventDefault(); window.location.href = resolveHref(cfg.continueHref); });
  }

  function ensureInputVisible(el){
    if(!el) return;
    setTimeout(() => {
      try { el.scrollIntoView({ block:'center', behavior:'smooth' }); } catch (_) {}
      window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 160), behavior:'smooth' });
    }, 250);
  }

  function bindMobileFocus(){
    const inputs = $all('input[type=text], textarea');
    inputs.forEach(el => {
      el.addEventListener('focus', () => ensureInputVisible(el));
      el.addEventListener('click', () => ensureInputVisible(el));
    });
    if(window.visualViewport){
      window.visualViewport.addEventListener('resize', () => {
        const active = document.activeElement;
        if(active && /INPUT|TEXTAREA/.test(active.tagName)) ensureInputVisible(active);
      });
    }
  }

  bindTooltips();
  bindFooter();
  bindAnswerSubmit();
  bindContinue();
  bindMobileFocus();
  if(location.hash === '#hintOpen' && cfg.hintDialog) openDialog(cfg.hintDialog, { hintHash:true });
})();
