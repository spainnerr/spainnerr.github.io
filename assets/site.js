(() => {
  "use strict";
  const themeButton = document.querySelector(".theme-toggle");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let chosenTheme;
  try { chosenTheme = localStorage.getItem("spainner-theme"); } catch (_) {}
  function applyTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? "#101216" : "#f5f5f7";
    if (themeButton) {
      themeButton.setAttribute("aria-pressed", String(dark));
      themeButton.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
      themeButton.title = dark ? "Ativar modo claro" : "Ativar modo escuro";
    }
  }
  function followSystemTheme() {
    applyTheme(chosenTheme === "dark" || chosenTheme === "light" ? chosenTheme : (systemTheme.matches ? "dark" : "light"));
  }
  followSystemTheme();
  if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener("click", () => {
      chosenTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(chosenTheme);
      try { localStorage.setItem("spainner-theme", chosenTheme); } catch (_) {}
    });
  }
  if (systemTheme.addEventListener) systemTheme.addEventListener("change", followSystemTheme);
  else systemTheme.addListener(followSystemTheme);
  window.addEventListener("storage", (event) => {
    if (event.key === "spainner-theme" || event.key === null) {
      chosenTheme = event.newValue;
      followSystemTheme();
    }
  });

  const navigation = document.querySelector(".navigation");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const narrowScreen = window.matchMedia("(max-width: 760px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionButton = document.querySelector(".motion-toggle");

  function closeMenu(restoreFocus = false) {
    if (!menuButton || !navLinks) return;
    const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    if (wasOpen && restoreFocus) menuButton.focus();
  }

  if (navigation && menuButton && navLinks) {
    navigation.dataset.enhanced = "true";
    function syncMenu() {
      const focusedLinkWillHide = narrowScreen.matches && navLinks.contains(document.activeElement);
      closeMenu(focusedLinkWillHide);
      menuButton.hidden = !narrowScreen.matches;
      if (focusedLinkWillHide) menuButton.focus();
    }
    syncMenu();
    if (narrowScreen.addEventListener) narrowScreen.addEventListener("change", syncMenu);
    else narrowScreen.addListener(syncMenu);
    menuButton.addEventListener("click", () => {
      const opening = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(opening));
      navLinks.classList.toggle("is-open", opening);
    });
    navLinks.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      closeMenu();
      const href = link.getAttribute("href");
      if (narrowScreen.matches && href && href.startsWith("#")) {
        const section = document.getElementById(href.slice(1));
        const heading = section && section.querySelector("h1, h2");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
          heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
        }
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu(true);
    });
    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target)) closeMenu();
    });
    navigation.addEventListener("focusout", (event) => {
      if (event.relatedTarget && !navigation.contains(event.relatedTarget)) closeMenu();
    });
  }

  if (motionButton) {
    motionButton.hidden = false;
    function setMotion(paused) {
      document.body.dataset.motion = paused ? "paused" : "running";
      motionButton.setAttribute("aria-pressed", String(paused));
      motionButton.setAttribute("aria-label", paused ? "Ativar animações do site" : "Pausar animações do site");
      motionButton.title = paused ? "Ativar movimento" : "Pausar movimento";
    }
    setMotion(reducedMotion.matches);
    motionButton.addEventListener("click", () => {
      if (reducedMotion.matches) return;
      setMotion(document.body.dataset.motion === "running");
    });
    function syncMotionPreference() {
      setMotion(reducedMotion.matches);
      motionButton.hidden = reducedMotion.matches;
    }
    syncMotionPreference();
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", syncMotionPreference);
    else reducedMotion.addListener(syncMotionPreference);
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!reducedMotion.matches) entry.target.classList.add("reveal-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const sections = document.querySelectorAll("main section[id]");
    const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const year = document.getElementById("copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();


/* Spainner AI: entirely local FAQ matching; no external AI calls. */
(() => {
  const form = document.getElementById("spainner-ai-form");
  const input = document.getElementById("spainner-ai-input");
  const log = document.getElementById("spainner-ai-messages");
  if (!form || !input || !log) return;
  const normalize = (s) => s.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const answers = [
    { keys:["quem e","quem eh","sobre voce","sobre o professor","quem foi","quem sou","guilherme","spainner"], answer:"Guilherme “Spainner” Spindola é professor de Matemática, com atuação no Colégio GGE e no Colégio Cognitivo. Está cursando Licenciatura em Matemática na UFRPE e compartilha sua trajetória e projetos neste site. Saiba mais na seção Sobre.", link:"#sobre" },
    { keys:["formacao","formado","faculdade","universidade","graduacao","estudou","estuda","ufrpe","upe","engenharia","curso superior"], answer:"Guilherme cursa Licenciatura em Matemática na Universidade Federal Rural de Pernambuco (UFRPE). Iniciou sua trajetória no ensino superior em Engenharia na Universidade de Pernambuco (UPE), antes de seguir para Matemática.", link:"#trajetoria" },
    { keys:["trabalha","trabalho","leciona","ensina","professor","escola","colegio","gge","cognitivo","experiencia","atuacao","editora"], answer:"Guilherme atua como professor e monitor de Matemática no Colégio GGE, presta serviços à editora da instituição e também é professor no Colégio Cognitivo. Anteriormente, foi monitor no Curso Fernanda Pessoa.", link:"#atuacao" },
    { keys:["aula particular","aulas particulares","contratar","agendar","contato","whatsapp","preco","valor","orcamento"], answer:"Para saber sobre disponibilidade, valores e aulas particulares, acesse a seção Aulas particulares e entre em contato pelo WhatsApp. O assistente não confirma preços nem horários.", link:"#aulas-particulares" },
    { keys:["medalha","premio","olimpiada","conquista","canguru","oba","onc","onhb"], answer:"Entre suas conquistas estão uma medalha de ouro na Olimpíada Canguru de Matemática, duas medalhas de bronze na Olimpíada Brasileira de Astronomia (OBA), menção honrosa na ONC e participação como semifinalista na ONHB.", link:"#conquistas" },
    { keys:["instagram","linkedin","youtube","rede social","redes sociais","canal","video"], answer:"Você encontra os perfis profissionais e o canal do YouTube nas seções e links deste site. No Instagram, o perfil é @spainnerr.", link:"#youtube" },
    { keys:["aluno","estudante","historia","trajetoria","colegio quando","ex aluno"], answer:"Guilherme foi aluno do Colégio GGE no Ensino Fundamental e Médio. Desde estudante, gostava de Matemática, ajudava colegas e participou da vida escolar como representante de classe.", link:"#trajetoria" },
    { keys:["oi","ola","bom dia","boa tarde","boa noite","tudo bem"], answer:"Olá! Posso falar sobre a formação, atuação profissional, trajetória, conquistas e aulas particulares do professor. O que você gostaria de saber?" }
  ];
  function answer(question) {
    const q = normalize(question);
    if (!q) return;
    let best = null, score = 0;
    for (const entry of answers) {
      let current = 0;
      for (const key of entry.keys) {
        const k = normalize(key);
        if (q === k) current += 12;
        else if (q.includes(k)) current += k.includes(" ") ? 6 : 3;
      }
      if (current > score) { best = entry; score = current; }
    }
    addBubble(question, true);
    if (!best) {
      addBubble("Ainda não tenho uma resposta cadastrada para essa pergunta. Posso ajudar com formação, experiência profissional, conquistas, redes sociais ou aulas particulares. Tente perguntar sobre um desses assuntos.");
    } else {
      addBubble(best.answer, false, best.link);
    }
    log.scrollTop = log.scrollHeight;
  }
  function addBubble(message, user = false, link = null) {
    const p = document.createElement("p");
    p.className = "spainner-ai-bubble" + (user ? " user" : "");
    p.textContent = message;
    if (link) {
      const a = document.createElement("a");
      a.href = link;
      a.textContent = " Ver seção →";
      a.style.cssText = "display:inline-block;margin-left:6px;color:inherit;text-decoration:underline;font-weight:600";
      p.appendChild(a);
    }
    log.appendChild(p);
  }
  form.addEventListener("submit", (e) => { e.preventDefault(); const q = input.value.trim(); if (!q) return; answer(q); input.value = ""; input.focus(); });
  document.querySelectorAll("[data-ai-question]").forEach((b) => b.addEventListener("click", () => answer(b.dataset.aiQuestion)));
})();
