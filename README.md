<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prof. João Silva — Matemática</title>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@300;400;700&display=swap" rel="stylesheet" />
  <style>
    /* ── BASE & VARIÁVEIS ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink: #11111a;
      --ink-light: #2a2a3c;
      --paper: #f9f6f0;
      --paper-dark: #e8e3d8;
      --accent: #9b2222;
      --accent-glow: rgba(155, 34, 34, 0.15);
      --muted: #7a7365;
      --rule: #d4ccbd;
      --gold: #b8860b;
      --board-bg: #151a15;
      --board-border: #2a352a;
      --board-text: #e0e0e0;
      --board-accent: #aed8a0;
    }

    html { 
      scroll-behavior: smooth; 
      cursor: none; /* Oculta o cursor padrão para telas com mouse */
    }

    body {
      font-family: 'EB Garamond', Georgia, serif;
      background-color: var(--paper);
      color: var(--ink);
      line-height: 1.7;
      overflow-x: hidden;
      position: relative;
    }

    /* Barra de rolagem customizada */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--paper); }
    ::-webkit-scrollbar-thumb { background: var(--muted); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

    /* Textura de papel pautado refinada */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        repeating-linear-gradient(
          transparent,
          transparent 27px,
          rgba(180,165,140,0.15) 27px,
          rgba(180,165,140,0.15) 28px
        );
      pointer-events: none;
      z-index: 0;
    }

    /* ── CURSOR CUSTOMIZADO ── */
    @media (pointer: fine) {
      .cursor-dot, .cursor-outline {
        position: fixed;
        top: 0; left: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
      }
      .cursor-dot {
        width: 6px; height: 6px;
        background-color: var(--accent);
        transition: transform 0.1s ease-out;
      }
      .cursor-outline {
        width: 30px; height: 30px;
        border: 1px solid var(--accent);
        transition: width 0.2s, height 0.2s, background-color 0.2s;
        /* Suaviza o atraso do contorno */
        transition-timing-function: ease-out;
      }
      body:hover .cursor-dot { opacity: 1; }
      
      /* Estado hover em elementos interativos */
      .hover-target .cursor-outline {
        width: 50px; height: 50px;
        background-color: var(--accent-glow);
        border-color: transparent;
      }
      .hover-target .cursor-dot { transform: translate(-50%, -50%) scale(1.5); }
    }
    @media (pointer: coarse) { html { cursor: auto; } .cursor-dot, .cursor-outline { display: none; } } /* Restaura cursor em mobile */

    /* ── BARRA DE PROGRESSO ── */
    .progress-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      background: var(--accent);
      width: 0%;
      z-index: 1000;
      transition: width 0.1s ease-out;
    }

    /* ── SÍMBOLOS FLUTUANTES (BACKGROUND) ── */
    .floating-symbols {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .symbol {
      position: absolute;
      font-family: 'JetBrains Mono', monospace;
      color: rgba(180,165,140,0.15);
      font-size: 3rem;
      user-select: none;
      animation: floatUp 20s linear infinite;
    }
    @keyframes floatUp {
      0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
    }

    /* ── NAV ── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 4rem;
      background: rgba(249, 246, 240, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(212, 204, 189, 0.5);
      transition: padding 0.3s ease, background 0.3s ease;
    }
    nav.scrolled { padding: 0.8rem 4rem; background: rgba(249, 246, 240, 0.95); box-shadow: 0 4px 20px rgba(0,0,0,0.03); }

    .nav-logo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .nav-links { display: flex; gap: 3rem; list-style: none; }
    .nav-links a {
      font-size: 0.95rem;
      color: var(--muted);
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: color 0.3s;
      position: relative;
      padding: 0.5rem 0;
    }
    .nav-links a::after {
      content: ''; position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 1px;
      background: var(--accent);
      transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .nav-links a:hover { color: var(--accent); }
    .nav-links a:hover::after { width: 100%; }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 6rem 4rem 4rem;
      gap: 5rem;
      position: relative;
      z-index: 1;
      max-width: 1400px;
      margin: 0 auto;
    }

    .hero-label {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 1.5rem;
      padding: 0.4rem 1rem;
      border: 1px solid var(--accent-glow);
      background: rgba(155, 34, 34, 0.03);
      border-radius: 20px;
      opacity: 0; transform: translateY(20px); animation: fadeUp 0.8s 0.2s forwards cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-name {
      font-size: clamp(3.5rem, 6vw, 5.5rem);
      font-weight: 600;
      line-height: 1.05;
      color: var(--ink);
      margin-bottom: 0.5rem;
      opacity: 0; transform: translateY(20px); animation: fadeUp 0.8s 0.4s forwards cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-title {
      font-size: 1.4rem;
      font-style: italic;
      color: var(--muted);
      margin-bottom: 2.5rem;
      opacity: 0; transform: translateY(20px); animation: fadeUp 0.8s 0.6s forwards cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-desc {
      font-size: 1.15rem;
      color: var(--ink-light);
      max-width: 480px;
      line-height: 1.8;
      border-left: 2px solid var(--accent);
      padding-left: 1.5rem;
      opacity: 0; transform: translateY(20px); animation: fadeUp 0.8s 0.8s forwards cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      margin-top: 3rem;
      padding: 1rem 2.5rem;
      background: transparent;
      border: 1px solid var(--accent);
      color: var(--accent);
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      opacity: 0; transform: translateY(20px); animation: fadeUp 0.8s 1s forwards cubic-bezier(0.16, 1, 0.3, 1);
    }
    .hero-cta::before {
      content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
      background: var(--accent); transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1); z-index: -1;
    }
    .hero-cta:hover { color: var(--paper); border-color: var(--accent); }
    .hero-cta:hover::before { left: 0; }

    /* MATH BOARD - TERMINAL INTERATIVO */
    .hero-visual {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0; transform: scale(0.95); animation: fadeInScale 1.2s 1s forwards cubic-bezier(0.16, 1, 0.3, 1);
      perspective: 1000px; /* Para efeito tilt */
    }

    .math-board {
      width: 100%;
      max-width: 500px;
      aspect-ratio: 4/3.2;
      background: var(--board-bg);
      border: 1px solid var(--board-border);
      border-radius: 8px;
      padding: 2.5rem;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05);
      position: relative;
      overflow: hidden;
      transform-style: preserve-3d;
      transition: transform 0.1s ease-out;
    }

    .math-board::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at top left, rgba(255,255,255,0.08), transparent 60%);
      pointer-events: none;
    }

    /* Brilho dinâmico do terminal */
    .math-board-glow {
      position: absolute; width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(174, 216, 160, 0.15) 0%, transparent 70%);
      top: -150px; left: -150px; pointer-events: none; transition: transform 0.1s ease-out;
    }

    .terminal-header {
      display: flex; gap: 8px; margin-bottom: 2rem;
    }
    .terminal-dot { width: 12px; height: 12px; border-radius: 50%; }
    .terminal-dot.r { background: #ff5f56; }
    .terminal-dot.y { background: #ffbd2e; }
    .terminal-dot.g { background: #27c93f; }

    .board-content {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(0.8rem, 1.5vw, 1rem);
      line-height: 1.8;
      color: var(--board-text);
      display: flex; flex-direction: column; gap: 0.5rem;
    }
    .board-content span.comment { color: rgba(255,255,255,0.3); font-size: 0.85em; }
    .board-content span.math { color: var(--board-accent); text-shadow: 0 0 10px rgba(174, 216, 160, 0.3); }
    .cursor-blink { display: inline-block; width: 8px; height: 1em; background: var(--board-accent); vertical-align: middle; animation: blink 1s step-end infinite; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

    /* ── DIVIDER ── */
    .section-divider {
      display: flex; align-items: center; gap: 1.5rem; padding: 0 4rem; margin: 4rem 0; position: relative; z-index: 1;
    }
    .section-divider span {
      font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--muted); letter-spacing: 0.2em; text-transform: uppercase;
    }
    .section-divider::before, .section-divider::after {
      content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--rule), transparent);
    }

    /* ── SECTIONS ── */
    section { position: relative; z-index: 1; padding: 5rem 4rem; max-width: 1200px; margin: 0 auto; }

    .section-header { display: flex; align-items: baseline; gap: 1.5rem; margin-bottom: 4rem; position: relative; }
    .section-num {
      font-family: 'JetBrains Mono', monospace; font-size: 1rem; color: var(--accent); font-weight: 700; opacity: 0.5;
    }
    .section-title { font-size: 2.8rem; font-weight: 600; color: var(--ink); }

    /* ── ABOUT ── */
    .about-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 6rem; align-items: center; }
    .about-text p { font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--ink-light); }
    
    .stats-container { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .stat-item { padding: 2rem; background: var(--paper-dark); border-radius: 8px; text-align: center; border: 1px solid transparent; transition: all 0.3s ease; }
    .stat-item:hover { transform: translateY(-5px); border-color: var(--accent); background: var(--paper); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .stat-number { font-size: 3.5rem; font-weight: 600; color: var(--accent); line-height: 1; margin-bottom: 0.5rem; }
    .stat-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }

    /* ── AREAS (Cards com Efeito Spotlight e Tilt) ── */
    .areas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; perspective: 1000px; }
    
    .area-card {
      position: relative;
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid var(--rule);
      border-radius: 12px;
      padding: 2.5rem;
      transform-style: preserve-3d;
      transition: border-color 0.3s, box-shadow 0.3s;
      overflow: hidden;
      cursor: none; /* Deixa o cursor customizado brilhar */
    }
    
    /* Fundo dinâmico para o spotlight */
    .area-card::before {
      content: ''; position: absolute; top: var(--y, 0); left: var(--x, 0);
      transform: translate(-50%, -50%); width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(155, 34, 34, 0.08) 0%, transparent 60%);
      opacity: 0; transition: opacity 0.4s; pointer-events: none; z-index: 0;
    }
    .area-card:hover::before { opacity: 1; }
    .area-card:hover { border-color: var(--accent); box-shadow: 0 20px 40px rgba(0,0,0,0.04); }

    .area-content { position: relative; z-index: 1; transform: translateZ(30px); /* Efeito 3D do Tilt */ }
    .area-symbol { font-family: 'JetBrains Mono', monospace; font-size: 2rem; color: var(--accent); margin-bottom: 1.2rem; display: block; }
    .area-name { font-size: 1.4rem; font-weight: 600; margin-bottom: 0.8rem; color: var(--ink); }
    .area-desc { font-size: 1.05rem; color: var(--muted); line-height: 1.6; }

    /* ── FORMAÇÃO (Timeline animada) ── */
    .timeline { position: relative; padding-left: 3rem; margin-top: 2rem; }
    .timeline-line { position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--rule); }
    .timeline-progress { position: absolute; left: 0; top: 0; width: 2px; background: var(--accent); height: 0%; transition: height 0.5s ease-out; }

    .timeline-item { position: relative; margin-bottom: 4rem; }
    .timeline-item::before {
      content: ''; position: absolute; left: -3.35rem; top: 0.5rem; width: 14px; height: 14px;
      border-radius: 50%; background: var(--paper); border: 2px solid var(--accent); z-index: 2; transition: all 0.3s;
    }
    .timeline-item:hover::before { background: var(--accent); box-shadow: 0 0 15px var(--accent-glow); transform: scale(1.2); }
    
    .timeline-year { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--accent); letter-spacing: 0.1em; font-weight: 700; margin-bottom: 0.5rem; }
    .timeline-degree { font-size: 1.5rem; font-weight: 600; margin: 0.2rem 0; color: var(--ink); }
    .timeline-institution { font-style: italic; color: var(--muted); font-size: 1.1rem; }

    /* ── CONTATO ── */
    .contact-wrapper { position: relative; padding: 2px; background: linear-gradient(135deg, var(--accent), var(--ink)); border-radius: 16px; overflow: hidden; }
    .contact-block { background: var(--ink); color: var(--paper); padding: 5rem 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; border-radius: 14px; position: relative; overflow: hidden; }
    .contact-block::before { content: ''; position: absolute; top: 0; right: 0; width: 100%; height: 100%; background: radial-gradient(circle at top right, rgba(155, 34, 34, 0.2), transparent 50%); pointer-events: none; }

    .contact-title { font-size: 3rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.1; }
    .contact-sub { color: rgba(249, 246, 240, 0.7); font-style: italic; font-size: 1.2rem; }

    .contact-info { display: flex; flex-direction: column; gap: 1.8rem; }
    .contact-row { display: flex; align-items: center; gap: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; color: rgba(249, 246, 240, 0.9); transition: transform 0.2s; }
    .contact-row:hover { transform: translateX(10px); }
    .contact-row .label { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); min-width: 80px; padding: 0.3rem 0.8rem; border: 1px solid rgba(155, 34, 34, 0.5); border-radius: 20px; text-align: center; }
    .contact-link { color: inherit; text-decoration: none; position: relative; }
    .contact-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: var(--accent); transition: width 0.3s; }
    .contact-link:hover::after { width: 100%; }

    /* ── FOOTER ── */
    footer { position: relative; z-index: 1; text-align: center; padding: 3rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--muted); letter-spacing: 0.1em; border-top: 1px solid var(--rule); margin-top: 4rem; }

    /* ── ANIMATIONS (Keyframes) ── */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

    /* Scroll reveal classes */
    .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .delay-1 { transition-delay: 0.1s; } .delay-2 { transition-delay: 0.2s; } .delay-3 { transition-delay: 0.3s; }

    /* ── RESPONSIVO ── */
    @media (max-width: 992px) {
      .hero, .about-grid, .contact-block { grid-template-columns: 1fr; }
      .hero-visual { order: -1; margin-bottom: 2rem; }
    }
    @media (max-width: 768px) {
      nav { padding: 1rem 1.5rem; flex-direction: column; gap: 1rem; }
      nav.scrolled { padding: 1rem 1.5rem; }
      .nav-links { gap: 1.5rem; flex-wrap: wrap; justify-content: center; }
      .hero { padding: 8rem 2rem 4rem; text-align: center; }
      .hero-desc { margin: 0 auto; text-align: left; }
      section, .section-divider { padding: 3rem 1.5rem; }
      .contact-block { padding: 3rem 2rem; }
      .contact-row { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
    }
  </style>
</head>
<body>

<div class="cursor-dot"></div>
<div class="cursor-outline"></div>

<div class="progress-bar" id="progressBar"></div>

<div class="floating-symbols" id="floatingSymbols"></div>

<nav id="navbar">
  <span class="nav-logo hover-target">Prof. João Silva</span>
  <ul class="nav-links">
    <li><a href="#sobre" class="hover-target">Sobre</a></li>
    <li><a href="#areas" class="hover-target">Áreas</a></li>
    <li><a href="#formacao" class="hover-target">Formação</a></li>
    <li><a href="#contato" class="hover-target">Contato</a></li>
  </ul>
</nav>

<div class="hero">
  <div class="hero-text">
    <span class="hero-label">Professor & Pesquisador</span>
    <h1 class="hero-name">A Matemática<br>em sua Essência.</h1>
    <p class="hero-title">Doutor em Matemática Pura · UNICAMP</p>
    <p class="hero-desc">
      Dedicado ao ensino rigoroso e apaixonado. Da teoria elementar que molda a intuição, às abstrações avançadas que revelam as estruturas do universo.
    </p>
    <a href="#contato" class="hero-cta hover-target">Iniciar Diálogo</a>
  </div>

  <div class="hero-visual">
    <div class="math-board hover-target" id="mathBoard">
      <div class="math-board-glow" id="boardGlow"></div>
      <div class="terminal-header">
        <div class="terminal-dot r"></div>
        <div class="terminal-dot y"></div>
        <div class="terminal-dot g"></div>
      </div>
      <div class="board-content" id="typedContent">
        </div>
    </div>
  </div>
</div>

<div class="section-divider"><span>§ I. Gênese</span></div>

<section id="sobre">
  <div class="section-header reveal">
    <span class="section-num">01</span>
    <h2 class="section-title">Sobre o Método</h2>
  </div>
  <div class="about-grid">
    <div class="about-text reveal delay-1">
      <p>
        Com mais de 15 anos de jornada acadêmica, percebi que a matemática frequentemente sofre de um problema de comunicação. Meu objetivo é traduzir a complexidade sem perder o rigor formal.
      </p>
      <p>
        Uma demonstração não é apenas uma prova de que algo funciona; é uma história lógica. Em minhas aulas, construímos o conhecimento a partir dos axiomas, combinando intuição geométrica com precisão algébrica.
      </p>
      <p>
        Seja preparando mentes brilhantes para a IMO (International Mathematical Olympiad) ou guiando universitários pelos labirintos do Cálculo Tensorial, o foco é sempre o "porquê" antes do "como".
      </p>
    </div>
    <div class="stats-container reveal delay-2">
      <div class="stat-item hover-target">
        <div class="stat-number">15+</div>
        <div class="stat-label">Anos de Ensino</div>
      </div>
      <div class="stat-item hover-target">
        <div class="stat-number">1k+</div>
        <div class="stat-label">Horas de Mentoria</div>
      </div>
      <div class="stat-item hover-target">
        <div class="stat-number">12</div>
        <div class="stat-label">Medalhistas OBM/IMO</div>
      </div>
      <div class="stat-item hover-target">
        <div class="stat-number">∞</div>
        <div class="stat-label">Paixão pelo Rigor</div>
      </div>
    </div>
  </div>
</section>

<div class="section-divider"><span>§ II. Domínios</span></div>

<section id="areas">
  <div class="section-header reveal">
    <span class="section-num">02</span>
    <h2 class="section-title">Áreas de Atuação</h2>
  </div>
  <div class="areas-grid">
    <div class="area-card reveal hover-target tilt-card">
      <div class="area-content">
        <span class="area-symbol">∫</span>
        <div class="area-name">Cálculo & Análise</div>
        <p class="area-desc">Estudo profundo de limites, derivadas, integrais, convergência de séries e análise real na reta e no Rn.</p>
      </div>
    </div>
    <div class="area-card reveal delay-1 hover-target tilt-card">
      <div class="area-content">
        <span class="area-symbol">A·x = λ·x</span>
        <div class="area-name">Álgebra Linear</div>
        <p class="area-desc">Espaços vetoriais, transformações, diagonalização e formas canônicas com foco em abstração e aplicações.</p>
      </div>
    </div>
    <div class="area-card reveal delay-2 hover-target tilt-card">
      <div class="area-content">
        <span class="area-symbol">∀x ∃y</span>
        <div class="area-name">Matemática Discreta</div>
        <p class="area-desc">Fundamentos da lógica formal, teoria dos conjuntos, combinatória avançada e teoria dos grafos.</p>
      </div>
    </div>
    <div class="area-card reveal hover-target tilt-card">
      <div class="area-content">
        <span class="area-symbol">∂²f / ∂x²</span>
        <div class="area-name">Equações Diferenciais</div>
        <p class="area-desc">Modelagem de fenômenos contínuos via EDOs e EDPs, métodos analíticos e qualitativos.</p>
      </div>
    </div>
    <div class="area-card reveal delay-1 hover-target tilt-card">
      <div class="area-content">
        <span class="area-symbol">P(A|B)</span>
        <div class="area-name">Probabilidade</div>
        <p class="area-desc">Teoria da medida aplicada à probabilidade, variáveis aleatórias, esperança e teoremas limites.</p>
      </div>
    </div>
    <div class="area-card reveal delay-2 hover-target tilt-card">
      <div class="area-content">
        <span class="area-symbol">★</span>
        <div class="area-name">Olimpíadas</div>
        <p class="area-desc">Treinamento de alta performance para OBMEP, OBM e seletivas internacionais. Foco em problem-solving criativo.</p>
      </div>
    </div>
  </div>
</section>

<div class="section-divider"><span>§ III. Trajetória</span></div>

<section id="formacao">
  <div class="section-header reveal">
    <span class="section-num">03</span>
    <h2 class="section-title">Base Acadêmica</h2>
  </div>
  <div class="timeline" id="timelineElement">
    <div class="timeline-line"></div>
    <div class="timeline-progress" id="timelineProgress"></div>
    
    <div class="timeline-item reveal">
      <div class="timeline-year">2011 — 2015</div>
      <div class="timeline-degree">Doutorado em Matemática Pura</div>
      <div class="timeline-institution">Universidade Estadual de Campinas — UNICAMP</div>
      <p style="margin-top: 0.5rem; font-size: 0.95rem; color: var(--muted);">Tese: Comportamento Assintótico em Variedades Riemannianas.</p>
    </div>
    <div class="timeline-item reveal">
      <div class="timeline-year">2009 — 2011</div>
      <div class="timeline-degree">Mestrado em Análise Matemática</div>
      <div class="timeline-institution">Universidade de São Paulo — USP</div>
      <p style="margin-top: 0.5rem; font-size: 0.95rem; color: var(--muted);">Dissertação focada em Teoria Espectral de Operadores.</p>
    </div>
    <div class="timeline-item reveal">
      <div class="timeline-year">2005 — 2008</div>
      <div class="timeline-degree">Licenciatura e Bacharelado em Matemática</div>
      <div class="timeline-institution">Universidade Federal do Rio de Janeiro — UFRJ</div>
      <p style="margin-top: 0.5rem; font-size: 0.95rem; color: var(--muted);">Formatura Summa Cum Laude. Medalha de Ouro na OBM Universitária.</p>
    </div>
  </div>
</section>

<div class="section-divider"><span>§ IV. Conexão</span></div>

<section id="contato">
  <div class="section-header reveal">
    <span class="section-num">04</span>
    <h2 class="section-title">Contato</h2>
  </div>
  <div class="contact-wrapper reveal">
    <div class="contact-block">
      <div>
        <div class="contact-title">Vamos resolver<br>este problema.</div>
        <p class="contact-sub">Aulas particulares de alto nível, consultoria acadêmica ou preparação olímpica intensiva.</p>
      </div>
      <div class="contact-info">
        <div class="contact-row hover-target">
          <span class="label">Email</span>
          <a href="mailto:joao.silva@matematica.com.br" class="contact-link">joao.silva@matematica.com.br</a>
        </div>
        <div class="contact-row hover-target">
          <span class="label">Telefone</span>
          <span>(11) 99999-0000</span>
        </div>
        <div class="contact-row hover-target">
          <span class="label">Local</span>
          <span>São Paulo, SP — Brasil</span>
        </div>
        <div class="contact-row hover-target">
          <span class="label">Online</span>
          <span>Sessões globais via Zoom / Meet</span>
        </div>
      </div>
    </div>
  </div>
</section>

<footer>
  © 2026 Prof. João Silva · O rigor é a liberdade da matemática.
</footer>

<script>
  // 1. Cursor Customizado
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      // Dot segue imediatamente
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      
      // Outline segue com leve delay via animação
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });
  }

  // 2. Animação de Digitação no Terminal Matemático
  const codeLines = [
    { text: "// Identidade de Euler", class: "comment" },
    { text: "e^(iπ) + 1 = 0", class: "math" },
    { text: "// Teorema Fundamental do Cálculo", class: "comment" },
    { text: "∫[a,b] f(x)dx = F(b) - F(a)", class: "math" },
    { text: "// Equação de Schrödinger", class: "comment" },
    { text: "iℏ ∂Ψ/∂t = ĤΨ", class: "math" }
  ];
  
  const typedContainer = document.getElementById('typedContent');
  let lineIdx = 0;
  let charIdx = 0;
  
  function typeWriter() {
    if (lineIdx < codeLines.length) {
      if (charIdx === 0) {
        // Cria novo elemento de linha
        const span = document.createElement('span');
        span.className = codeLines[lineIdx].class;
        span.id = `line-${lineIdx}`;
        typedContainer.appendChild(span);
      }
      
      const currentLineElement = document.getElementById(`line-${lineIdx}`);
      const currentText = codeLines[lineIdx].text;
      
      if (charIdx < currentText.length) {
        currentLineElement.innerHTML += currentText.charAt(charIdx);
        charIdx++;
        setTimeout(typeWriter, Math.random() * 50 + 30); // Velocidade variável de digitação
      } else {
        // Quebra de linha após terminar a string
        typedContainer.appendChild(document.createElement('br'));
        lineIdx++;
        charIdx = 0;
        setTimeout(typeWriter, 400); // Pausa entre linhas
      }
    } else {
      // Adiciona cursor piscante no final
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      typedContainer.appendChild(cursor);
    }
  }
  
  // Inicia a digitação após delay da animação do hero
  setTimeout(typeWriter, 1800);

  // 3. Efeito 3D Tilt e Spotlight nos Cards
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      // Update custom properties for Spotlight
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      
      // Calculate Tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5; // Max rot: 5deg
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // Brilho interativo no board principal
  const mathBoard = document.getElementById('mathBoard');
  const boardGlow = document.getElementById('boardGlow');
  mathBoard.addEventListener('mousemove', (e) => {
    const rect = mathBoard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    boardGlow.style.transform = `translate(${x}px, ${y}px)`;
    
    // Tilt sutil no board principal
    const rotateX = ((y - rect.height/2) / (rect.height/2)) * -2;
    const rotateY = ((x - rect.width/2) / (rect.width/2)) * 2;
    mathBoard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  mathBoard.addEventListener('mouseleave', () => {
    mathBoard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  });

  // 4. Efeitos de Scroll (Progresso, Navbar, Timeline e Reveal)
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineElement = document.getElementById('timelineElement');
  const reveals = document.querySelectorAll('.reveal');

  window.addEventListener('scroll', () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollPx / winHeightPx) * 100;
    
    // Barra de progresso top
    progressBar.style.width = scrollPercent + '%';
    
    // Navbar visual
    if (scrollPx > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    
    // Timeline de Formação animando conforme scroll
    if (timelineElement) {
      const rect = timelineElement.getBoundingClientRect();
      const timelineStart = window.innerHeight * 0.8; 
      if (rect.top < timelineStart) {
        // Calcula porcentagem vista
        let progress = ((timelineStart - rect.top) / rect.height) * 100;
        progress = Math.min(Math.max(progress, 0), 100);
        timelineProgress.style.height = `${progress}%`;
      }
    }
  });

  // Intersection Observer para aparição suave dos elementos
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
  
  reveals.forEach(el => revealObserver.observe(el));

  // 5. Background Parallax Gerador de Símbolos
  const symbolsArray = ['∫', '∑', '∞', 'π', 'Δ', '∇', 'θ', 'λ', 'μ', 'Ω'];
  const symbolContainer = document.getElementById('floatingSymbols');
  
  // Cria símbolos flutuantes aleatórios
  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.className = 'symbol';
    span.innerText = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
    // Posição horizontal aleatória
    span.style.left = `${Math.random() * 100}vw`;
    // Tamanho aleatório
    span.style.fontSize = `${Math.random() * 2 + 1}rem`;
    // Delay aleatório para não subirem juntos
    span.style.animationDelay = `${Math.random() * 20}s`;
    // Duração aleatória para velocidades diferentes
    span.style.animationDuration = `${Math.random() * 15 + 15}s`;
    symbolContainer.appendChild(span);
  }

</script>
</body>
</html>
   
  
