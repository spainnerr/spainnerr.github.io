(() => {
  'use strict';
  // Real navigation remains available without JavaScript; tabs enhance the example.
  const tabGroup = document.querySelector('[data-example-tabs]');
  if (tabGroup) {
    const tabs = [...tabGroup.querySelectorAll('[data-tab]')];
    const panels = [...document.querySelectorAll('[data-panel]')];
    tabGroup.hidden = false;
    tabGroup.setAttribute('role', 'tablist');
    tabs.forEach(tab => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', 'panel-' + tab.dataset.tab);
    });
    panels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'tab-' + panel.dataset.panel);
      panel.tabIndex = 0;
    });
    function select(tab, focus = false) {
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.panel !== tab.dataset.tab; });
      if (focus) tab.focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(tabs[next], true);
      });
    });
    select(tabs[0]);
  }

  const controls = document.querySelector('[data-step-controls]');
  if (controls) {
    const descriptions = [
      'Primeiro, identifique o ângulo reto em B. Essa condição permite usar o teorema de Pitágoras.',
      'Os lados AB e BC são os catetos: medem 4 e 3. A hipotenusa é o lado oposto ao ângulo reto.',
      'Chamando a hipotenusa de c, temos c² = 4² + 3² = 16 + 9 = 25.',
      'Como c representa um comprimento positivo, c = √25 = 5. A hipotenusa mede 5 unidades.'
    ];
    const names = ['Identifique a condição', 'Leia os dados', 'Relacione as medidas', 'Encontre o comprimento'];
    const buttons = [...controls.querySelectorAll('[data-step]')];
    const layers = [...document.querySelectorAll('.geometry-svg [data-from-step]')];
    const label = document.querySelector('[data-step-label]');
    function showStep(step) {
      layers.forEach(layer => { layer.style.display = Number(layer.dataset.fromStep) > step ? 'none' : ''; });
      buttons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.step) === step)));
      document.getElementById('geometry-explanation').textContent = descriptions[step];
      label.textContent = (step + 1) + ' de 4 · ' + names[step];
    }
    controls.hidden = false;
    label.hidden = false;
    buttons.forEach(button => button.addEventListener('click', () => showStep(Number(button.dataset.step))));
    showStep(0);
  }

  async function copyText(value, fallback) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      fallback?.focus();
      if (fallback?.select) fallback.select();
      else if (fallback) {
        const range = document.createRange();
        range.selectNodeContents(fallback);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      return false;
    }
  }
  const codeButton = document.querySelector('[data-copy-tikz]');
  if (codeButton) {
    codeButton.hidden = false;
    codeButton.addEventListener('click', async () => {
      const source = document.getElementById('tikz-source');
      const copied = await copyText(source.textContent, source);
      document.querySelector('[data-copy-status]').textContent = copied ? 'Código copiado.' : 'Selecione e copie o código destacado com o comando de copiar do seu dispositivo.';
    });
  }

  const brief = document.getElementById('contact-brief');
  if (brief) {
    const interest = document.getElementById('contact-interest');
    const level = document.getElementById('contact-level');
    const topic = document.getElementById('contact-topic');
    const message = document.getElementById('contact-message');
    const status = document.querySelector('[data-contact-status]');
    const copy = document.querySelector('[data-copy-message]');
    function prepare() {
      const openers = {
        aulas: 'Olá, Guilherme! Vim pelo seu site e tenho interesse em aulas particulares de Matemática.',
        materiais: 'Olá, Guilherme! Vim pelo seu site e gostaria de consultar materiais de Matemática.',
        escolas: 'Olá, Guilherme! Vim pelo seu site e gostaria de conversar sobre um projeto de materiais didáticos.'
      };
      const parts = [openers[interest.value]];
      if (level.value.trim()) parts.push('Ano ou nível: ' + level.value.trim() + '.');
      if (topic.value.trim()) parts.push('O que procuro: ' + topic.value.trim() + '.');
      parts.push(interest.value === 'aulas' ? 'Gostaria de saber sobre formato, disponibilidade e valores.' : 'Podemos conversar sobre disponibilidade e condições?');
      message.value = parts.join('\n\n');
      status.textContent = '';
    }
    [interest, level, topic].forEach(field => field.addEventListener('input', prepare));
    interest.addEventListener('change', prepare);
    document.querySelectorAll('[data-contact-intent]').forEach(link => link.addEventListener('click', () => {
      interest.value = link.dataset.contactIntent;
      prepare();
    }));
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const copied = await copyText(message.value, message);
      status.textContent = copied ? 'Mensagem copiada. Abra o WhatsApp pelo botão ao lado e cole na conversa.' : 'O texto está selecionado. Copie a mensagem e envie pelo WhatsApp.';
    });
    brief.addEventListener('submit', event => { event.preventDefault(); copy.click(); });
    prepare();
  }
  // Expand optional content when an existing deep link is visited.
  function revealHash() {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    const parents = [];
    for (let node = target.parentElement; node; node = node.parentElement) {
      if (node.tagName === 'DETAILS') parents.push(node);
    }
    if (!parents.length) return;
    parents.forEach(details => { details.open = true; });
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();
})();
