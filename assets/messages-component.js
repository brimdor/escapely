/**
 * Engagement Messages Component
 *
 * Loads assets/engagement-messages.json, sorts messages by contributor last
 * name, and renders them below the scripture block on the engagement page.
 *
 * Usage: include this script on the page after the target container exists.
 *
 *   <div id="engagement-messages"></div>
 *   <script src="../../assets/messages-component.js"></script>
 *
 * To add/edit messages, update assets/engagement-messages.yaml, then run
 *   python3 scripts/build-messages-json.py
 * before pushing.
 */
(function () {
  'use strict';

  const CONFIG = {
    jsonUrl: '../../assets/engagement-messages.json',
    containerSelector: '#engagement-messages',
    fallbackMessage: 'Unable to load messages. Please try again later.',
  };

  function formatContributor(contributor) {
    return `${contributor.first_name} ${contributor.last_name}`.trim();
  }

  function formatContributors(contributors) {
    if (!contributors || contributors.length === 0) return '';
    if (contributors.length === 1) return formatContributor(contributors[0]);

    const allButLast = contributors.slice(0, -1).map(formatContributor).join(', ');
    const last = formatContributor(contributors[contributors.length - 1]);
    return `${allButLast} and ${last}`;
  }

  function sortMessages(messages) {
    return messages.slice().sort((a, b) => {
      const aLast = (a.contributors?.[0]?.last_name || '').toLowerCase();
      const bLast = (b.contributors?.[0]?.last_name || '').toLowerCase();
      if (aLast === bLast) return 0;
      return aLast.localeCompare(bLast);
    });
  }

  function createContainer() {
    const section = document.createElement('section');
    section.className = 'engagement-messages';
    section.setAttribute('aria-label', 'Messages from family and friends');

    const heading = document.createElement('h3');
    heading.className = 'engagement-messages__heading';
    heading.textContent = 'Words of Love';
    section.appendChild(heading);

    const list = document.createElement('div');
    list.className = 'engagement-messages__list';
    section.appendChild(list);

    return section;
  }

  function createMessageElement(messageData, index, total) {
    const article = document.createElement('article');
    article.className = 'engagement-message';

    const body = document.createElement('blockquote');
    body.className = 'engagement-message__body';
    body.textContent = messageData.message || '';

    const footer = document.createElement('footer');
    footer.className = 'engagement-message__footer';
    footer.textContent = `— ${formatContributors(messageData.contributors)}`;

    article.appendChild(body);
    article.appendChild(footer);

    // Add spacer between messages, not after the last one.
    const wrapper = document.createElement('div');
    wrapper.className = 'engagement-message__wrapper';
    wrapper.appendChild(article);

    if (index < total - 1) {
      const spacer = document.createElement('div');
      spacer.className = 'engagement-message__spacer';
      wrapper.appendChild(spacer);
    }

    return wrapper;
  }

  function renderError(container, error) {
    const p = document.createElement('p');
    p.className = 'engagement-messages__error';
    p.textContent = CONFIG.fallbackMessage;
    container.appendChild(p);
    if (typeof console !== 'undefined' && console.error) {
      console.error('Engagement messages component error:', error);
    }
  }

  function init() {
    const target = document.querySelector(CONFIG.containerSelector);
    if (!target) {
      console.warn('Engagement messages: target container not found:', CONFIG.containerSelector);
      return;
    }

    const section = createContainer();

    fetch(CONFIG.jsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} loading messages`);
        }
        return response.json();
      })
      .then((data) => {
        const list = section.querySelector('.engagement-messages__list');
        const messages = sortMessages(data.messages || []);
        messages.forEach((msg, index) => list.appendChild(createMessageElement(msg, index, messages.length)));
        target.appendChild(section);
      })
      .catch((error) => {
        renderError(section, error);
        target.appendChild(section);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
