(() => {
  "use strict";
  const panel = document.getElementById("repository-guide-answer");
  if (!panel) return;
  const entries = {"start": {"question": "Como funciona o acervo?", "answer": "O acervo reúne 23 teoremas em 9 áreas. Cada entrada apresenta enunciado, hipóteses, resultados usados e demonstração. Escolha um assunto e abra “Ler hipóteses e demonstração”.", "link": "./teoremas.html#acervo"}, "search": {"question": "Como encontrar um teorema?", "answer": "Digite um assunto na busca do acervo e combine os filtros de área e técnica. A busca inclui enunciados, hipóteses e demonstrações. Use “Limpar” para ver todos os teoremas.", "link": "./teoremas.html#acervo"}, "statement": {"question": "O que diz o enunciado?", "answer": "O enunciado expressa precisamente o resultado do teorema. Leia-o junto das hipóteses para identificar os objetos envolvidos, as condições e a conclusão.", "link": "./teoremas.html#acervo"}, "hypotheses": {"question": "O que são as hipóteses?", "answer": "São as condições em que o teorema vale. Confira todas antes de aplicar o resultado. Por exemplo, a versão de Pitágoras no acervo exige um triângulo retângulo não degenerado no plano euclidiano.", "link": "./teoremas.html#seed-9"}, "dependencies": {"question": "O que são os resultados usados?", "answer": "São definições, propriedades ou outros teoremas que sustentam a demonstração. Eles indicam os conhecimentos necessários para acompanhar a prova. Nem todo resultado auxiliar tem uma demonstração própria neste acervo.", "link": "./teoremas.html#como-usar"}, "proof": {"question": "Como ler uma demonstração?", "answer": "Leia o enunciado, confira as hipóteses e revise os resultados usados. Depois acompanhe cada passo da demonstração e observe como ele conduz à conclusão. A técnica indicada ajuda a reconhecer a estrutura do argumento.", "link": "./teoremas.html#acervo"}, "share": {"question": "Como compartilhar um teorema?", "answer": "Abra a demonstração e clique em “Link deste teorema”. Copie o endereço do navegador. O link abre diretamente a entrada escolhida.", "link": "./teoremas.html#acervo"}, "download": {"question": "Como baixar o acervo?", "answer": "Use o link abaixo para baixar o arquivo JSON com os enunciados, hipóteses, resultados usados e demonstrações. Ele contém os textos do acervo em formato estruturado.", "link": "./assets/teoremas.json"}, "whatsapp": {"question": "Como falar pelo WhatsApp?", "answer": "Para falar com Guilherme sobre aulas particulares, disponibilidade e valores, use o WhatsApp oficial no botão abaixo.", "link": "https://wa.me/qr/TG5RGGPILJ3SD1", "label": "Conversar pelo WhatsApp ↗"}, "instagram": {"question": "Qual é o Instagram?", "answer": "O Instagram de Guilherme é @spainnerr. Acompanhe os conteúdos e as novidades pelo perfil oficial.", "link": "https://www.instagram.com/spainnerr", "label": "Abrir @spainnerr ↗"}, "lessons": {"question": "Como agendar uma aula?", "answer": "Envie pelo WhatsApp o seu nível de ensino, o conteúdo que deseja estudar e seus horários disponíveis. Guilherme poderá informar os formatos de aula, a disponibilidade e os valores.", "link": "https://wa.me/qr/TG5RGGPILJ3SD1", "label": "Consultar aulas particulares ↗"}, "youtube": {"question": "Onde assistir às aulas e vídeos?", "answer": "Conheça o canal Spainner no YouTube pelo link abaixo.", "link": "https://youtube.com/@spainner", "label": "Visitar o canal Spainner ↗"}, "linkedin": {"question": "Onde ver a trajetória profissional?", "answer": "Você pode acompanhar a trajetória profissional de Guilherme Spindola no LinkedIn.", "link": "https://www.linkedin.com/in/guilherme-spindola-a53a47384/", "label": "Abrir o LinkedIn ↗"}};
  const buttons = [...document.querySelectorAll("[data-guide-question]")];
  const announcement = document.getElementById("guide-announcement");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let finishCurrent = null;
  buttons.forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.guideQuestion;
    if (!Object.prototype.hasOwnProperty.call(entries, id)) return;
    cancelAnimationFrame(frame);
    const entry = entries[id];
    const heading = document.createElement("h3"); heading.textContent = entry.question;
    const status = document.createElement("span"); status.className = "guide-typing-status";
    status.textContent = "Spainner AI está digitando…";
    status.setAttribute("aria-hidden", "true");
    const answer = document.createElement("p"); answer.className = "guide-typed-text";
    const skip = document.createElement("button"); skip.type = "button";
    skip.className = "guide-skip"; skip.textContent = "Mostrar resposta completa";
    const link = document.createElement("a"); link.href = entry.link; link.hidden = true;
    link.textContent = entry.label || (id === "download" ? "Baixar acervo em JSON ↓" : "Abrir no acervo →");
    if (id === "download") link.setAttribute("download", "teoremas.json");
    if (entry.link.startsWith("https://")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    panel.replaceChildren(heading, status, answer, skip, link);
    panel.setAttribute("aria-busy", "true");
    if (panel.getBoundingClientRect && panel.scrollIntoView) {
      const bounds = panel.getBoundingClientRect();
      if (bounds.bottom > window.innerHeight || bounds.top < 0) panel.scrollIntoView({behavior: motion.matches ? "auto" : "smooth", block: "nearest"});
    }
    buttons.forEach(b => b.setAttribute("aria-pressed", String(b === button)));
    if (announcement) announcement.textContent = "";
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(frame);
      answer.textContent = entry.answer;
      answer.classList.remove("is-typing");
      status.textContent = "Resposta concluída";
      link.hidden = false;
      if (document.activeElement === skip) link.focus();
      skip.hidden = true;
      panel.setAttribute("aria-busy", "false");
      if (announcement) announcement.textContent = entry.question + " " + entry.answer;
      finishCurrent = null;
    };
    finishCurrent = finish;
    skip.addEventListener("click", finish);
    if (motion.matches) { finish(); return; }
    answer.classList.add("is-typing");
    const letters = Array.from(entry.answer);
    const started = performance.now();
    const duration = Math.min(5200, letters.length * 22);
    const tick = now => {
      if (done) return;
      const length = Math.floor(Math.min(1, (now - started) / duration) * letters.length);
      answer.textContent = letters.slice(0, length).join("");
      if (length === letters.length) finish();
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }));
  motion.addEventListener("change", () => { if (motion.matches && finishCurrent) finishCurrent(); });
})();
