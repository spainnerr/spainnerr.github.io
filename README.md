
  <!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>∎ Repositório de Demonstrações</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  --paper:#FBFAF6;
  --paper-deep:#F3F1E9;
  --ink:#17171B;
  --ink-soft:#4E4E55;
  --pen:#23408E;
  --pen-soft:#E8ECF6;
  --editorial:#A4242A;
  --rule:#DCD9CE;
  --rule-soft:#E9E6DC;
  --serif:'STIX Two Text', Georgia, serif;
  --mono:'IBM Plex Mono', monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important}
}
body{
  background:var(--paper);
  color:var(--ink);
  font-family:var(--serif);
  font-size:17px;
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
}
button{font-family:inherit;cursor:pointer}
input,select,textarea{font-family:inherit;font-size:inherit;color:inherit}
:focus-visible{outline:2px solid var(--pen);outline-offset:2px;border-radius:2px}

/* ---------- moldura geral ---------- */
.frame{max-width:980px;margin:0 auto;padding:0 28px 120px}
@media(max-width:640px){.frame{padding:0 18px 90px}}

/* ---------- cabeçalho ---------- */
header.masthead{
  padding:64px 0 30px;
  border-bottom:3px double var(--ink);
  display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;
}
.masthead-left{display:flex;align-items:flex-start;gap:22px}
.tombstone{
  width:54px;height:54px;flex-shrink:0;
  background:var(--ink);
  position:relative;top:6px;
}
.tombstone::after{
  content:"";position:absolute;inset:5px;border:1.5px solid var(--paper);
}
h1{
  font-size:clamp(28px,4.4vw,42px);
  font-weight:600;letter-spacing:-0.01em;line-height:1.08;
}
.masthead .sub{
  font-family:var(--mono);font-size:12.5px;color:var(--ink-soft);
  margin-top:10px;letter-spacing:0.04em;
}
.masthead-stats{
  font-family:var(--mono);font-size:12.5px;color:var(--ink-soft);
  text-align:right;line-height:1.9;letter-spacing:0.03em;
}
.masthead-stats b{color:var(--pen);font-weight:500}
@media(max-width:640px){
  header.masthead{padding-top:44px}
  .masthead-stats{text-align:left}
}

/* ---------- barra de ferramentas ---------- */
.toolbar{
  display:flex;gap:10px;flex-wrap:wrap;align-items:center;
  padding:20px 0;border-bottom:1px solid var(--rule);
  position:sticky;top:0;background:var(--paper);z-index:30;
}
.toolbar input[type=search]{
  flex:1;min-width:180px;
  border:1px solid var(--rule);background:#fff;
  padding:9px 14px;font-size:15.5px;border-radius:2px;
}
.toolbar select{
  border:1px solid var(--rule);background:#fff;
  padding:9px 10px;font-size:14px;border-radius:2px;color:var(--ink-soft);
  font-family:var(--mono);
}
.btn{
  border:1px solid var(--ink);background:var(--ink);color:var(--paper);
  padding:9px 18px;font-size:15px;border-radius:2px;
  transition:background .15s,color .15s;
}
.btn:hover{background:var(--pen);border-color:var(--pen)}
.btn.ghost{background:transparent;color:var(--ink);border-color:var(--rule)}
.btn.ghost:hover{border-color:var(--ink);background:transparent;color:var(--ink)}
.btn.danger{background:transparent;color:var(--editorial);border-color:var(--editorial)}
.btn.danger:hover{background:var(--editorial);color:#fff}
.btn.small{padding:6px 12px;font-size:13.5px}

/* ---------- lista de teoremas ---------- */
.list{padding-top:8px}
.entry{
  display:grid;grid-template-columns:96px 1fr;gap:0 26px;
  padding:30px 0 26px;border-bottom:1px solid var(--rule-soft);
  cursor:pointer;position:relative;
}
.entry:hover .entry-title{color:var(--pen)}
.entry-margin{
  font-family:var(--mono);font-size:12px;color:var(--ink-soft);
  text-align:right;padding-top:5px;line-height:1.8;letter-spacing:0.03em;
}
.entry-margin .num{
  display:block;font-size:21px;color:var(--pen);font-weight:500;letter-spacing:0;
}
.entry-title{
  font-size:21px;font-weight:600;letter-spacing:-0.005em;
  transition:color .15s;line-height:1.3;
}
.entry-statement{
  margin-top:8px;font-style:italic;color:var(--ink-soft);font-size:16.5px;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}
.entry-tags{margin-top:12px;display:flex;gap:8px;flex-wrap:wrap}
.tag{
  font-family:var(--mono);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;
  padding:3px 9px;border:1px solid var(--rule);color:var(--ink-soft);border-radius:2px;
}
.tag.area{border-color:var(--pen);color:var(--pen);background:var(--pen-soft)}
@media(max-width:640px){
  .entry{grid-template-columns:1fr;gap:6px}
  .entry-margin{text-align:left;display:flex;gap:14px;align-items:baseline;padding-top:0}
  .entry-margin .num{font-size:17px}
}

/* ---------- estado vazio / carregando ---------- */
.empty{
  padding:90px 20px;text-align:center;color:var(--ink-soft);
}
.empty .glyph{font-size:44px;color:var(--rule);line-height:1}
.empty h2{font-weight:500;font-size:20px;margin:18px 0 8px;color:var(--ink)}
.empty p{font-size:15.5px;max-width:420px;margin:0 auto 24px}

/* ---------- página de demonstração ---------- */
.proof-page{padding-top:40px;animation:rise .35s ease both}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.crumb{
  font-family:var(--mono);font-size:12.5px;color:var(--ink-soft);
  background:none;border:none;padding:0;letter-spacing:0.04em;
}
.crumb:hover{color:var(--pen)}
.proof-head{margin:30px 0 10px;display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;align-items:flex-start}
.proof-kicker{
  font-family:var(--mono);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;
  color:var(--pen);margin-bottom:10px;
}
.proof-title{font-size:clamp(24px,3.6vw,34px);font-weight:600;line-height:1.15;letter-spacing:-0.01em;max-width:640px}
.proof-actions{display:flex;gap:8px;flex-shrink:0}
.proof-meta{
  margin:20px 0 34px;display:flex;gap:22px;flex-wrap:wrap;
  font-family:var(--mono);font-size:12.5px;color:var(--ink-soft);letter-spacing:0.03em;
}
.proof-meta span b{color:var(--ink);font-weight:500}

.thm-block{
  border-left:3px solid var(--pen);
  background:var(--pen-soft);
  padding:22px 26px;margin-bottom:36px;border-radius:0 2px 2px 0;
}
.thm-block .label{font-weight:700;font-style:normal;margin-right:6px}
.thm-block .body{font-style:italic}
.proof-body{font-size:17.5px}
.proof-body .label{font-style:italic;font-weight:500;margin-right:6px}
.proof-body p{margin-bottom:1em}
.proof-body .katex-display{margin:1.1em 0;overflow-x:auto;overflow-y:hidden;padding:2px 0}
.qed{
  display:flex;justify-content:flex-end;margin-top:34px;
}
.qed .stone{
  width:15px;height:15px;background:var(--ink);
  animation:stamp .4s ease .25s both;
}
@keyframes stamp{from{opacity:0;transform:scale(1.8)}to{opacity:1;transform:scale(1)}}
.proof-source{
  margin-top:44px;padding-top:18px;border-top:1px solid var(--rule);
  font-family:var(--mono);font-size:12.5px;color:var(--ink-soft);letter-spacing:0.03em;
}

/* ---------- editor ---------- */
.editor{padding-top:40px;animation:rise .35s ease both}
.editor h2{font-size:26px;font-weight:600;margin:26px 0 6px}
.editor .hint{font-size:14.5px;color:var(--ink-soft);margin-bottom:30px}
.editor .hint code{font-family:var(--mono);font-size:12.5px;background:var(--paper-deep);padding:1px 5px;border-radius:2px}
.field{margin-bottom:22px}
.field label{
  display:block;font-family:var(--mono);font-size:11.5px;letter-spacing:0.08em;
  text-transform:uppercase;color:var(--ink-soft);margin-bottom:7px;
}
.field label .req{color:var(--editorial)}
.field input[type=text],.field textarea,.field select{
  width:100%;border:1px solid var(--rule);background:#fff;
  padding:10px 13px;font-size:16px;border-radius:2px;
}
.field textarea{min-height:120px;resize:vertical;line-height:1.6}
.field textarea.tall{min-height:240px}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:640px){.field-row{grid-template-columns:1fr}}
.preview-box{
  border:1px dashed var(--rule);background:var(--paper-deep);
  padding:18px 20px;margin-top:10px;border-radius:2px;min-height:54px;
}
.preview-box .ph{font-family:var(--mono);font-size:12px;color:var(--ink-soft)}
.editor-actions{display:flex;gap:10px;margin-top:34px;flex-wrap:wrap}

/* ---------- rodapé ---------- */
footer{
  margin-top:70px;padding-top:22px;border-top:3px double var(--ink);
  display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;align-items:center;
  font-family:var(--mono);font-size:12px;color:var(--ink-soft);letter-spacing:0.04em;
}
.footer-actions{display:flex;gap:8px}

.toast{
  position:fixed;bottom:26px;left:50%;transform:translateX(-50%);
  background:var(--ink);color:var(--paper);font-family:var(--mono);font-size:13px;
  padding:10px 20px;border-radius:2px;z-index:60;opacity:0;pointer-events:none;
  transition:opacity .25s,transform .25s;letter-spacing:0.03em;
}
.toast.show{opacity:1;transform:translateX(-50%) translateY(-4px)}
</style>
</head>
<body>

<div class="frame">
  <header class="masthead">
    <div class="masthead-left">
      <div class="tombstone" aria-hidden="true"></div>
      <div>
        <h1>Repositório de<br>Demonstrações</h1>
        <p class="sub">acervo pessoal · c.q.d.</p>
      </div>
    </div>
    <div class="masthead-stats" id="stats"></div>
  </header>

  <div id="app"></div>

  <footer>
    <span>cada demonstração termina em ∎</span>
    <div class="footer-actions">
      <button class="btn ghost small" id="btn-export">Exportar acervo (.json)</button>
      <button class="btn ghost small" id="btn-import">Importar</button>
      <input type="file" id="file-import" accept=".json" hidden>
    </div>
  </footer>
</div>

<div class="toast" id="toast" role="status"></div>

<script>
/* ================= estado ================= */
const STORE_KEY = 'demonstracoes-v1';
let proofs = [];
let view = { name: 'list' };           // list | detail | edit
let filters = { q: '', area: '', tecnica: '' };

const AREAS = ['Álgebra','Análise','Geometria','Teoria dos Números','Combinatória','Probabilidade','Lógica e Conjuntos','Álgebra Linear','Topologia','Outra'];
const TECNICAS = ['Demonstração direta','Contradição (absurdo)','Contrapositiva','Indução','Construção','Casa dos pombos','Argumento de contagem','Outra'];

const SEEDS = [
  {
    id: 'seed-1',
    titulo: 'Irracionalidade de $\\sqrt{2}$',
    area: 'Teoria dos Números',
    tecnica: 'Contradição (absurdo)',
    enunciado: 'Não existe número racional cujo quadrado seja $2$; isto é, $\\sqrt{2} \\notin \\mathbb{Q}$.',
    demonstracao: 'Suponha, por absurdo, que $\\sqrt{2} = \\dfrac{p}{q}$ com $p, q \\in \\mathbb{Z}$, $q \\neq 0$ e $\\gcd(p,q)=1$ (fração irredutível).\n\nElevando ao quadrado: $$2 = \\frac{p^2}{q^2} \\implies p^2 = 2q^2.$$\n\nLogo $p^2$ é par, e portanto $p$ é par. Escreva $p = 2k$. Substituindo: $$4k^2 = 2q^2 \\implies q^2 = 2k^2,$$ donde $q$ também é par.\n\nMas então $2 \\mid \\gcd(p,q)$, contradizendo a irredutibilidade da fração. Absurdo.',
    fonte: 'Atribuída à escola pitagórica; clássica em qualquer curso introdutório.',
    criadoEm: '2026-06-11'
  },
  {
    id: 'seed-2',
    titulo: 'Infinitude dos números primos',
    area: 'Teoria dos Números',
    tecnica: 'Contradição (absurdo)',
    enunciado: 'Existem infinitos números primos.',
    demonstracao: 'Suponha que o conjunto dos primos seja finito: $p_1, p_2, \\dots, p_n$.\n\nConsidere o número $$N = p_1 \\cdot p_2 \\cdots p_n + 1.$$\n\nNenhum $p_i$ divide $N$, pois a divisão de $N$ por qualquer $p_i$ deixa resto $1$. Mas todo inteiro maior que $1$ tem algum fator primo. Logo $N$ possui um fator primo que não está na lista — contradição com a hipótese de que a lista era completa.',
    fonte: 'Euclides, *Elementos*, Livro IX, Proposição 20.',
    criadoEm: '2026-06-11'
  },
  {
    id: 'seed-3',
    titulo: 'Soma dos ângulos internos de um polígono convexo',
    area: 'Geometria',
    tecnica: 'Indução',
    enunciado: 'A soma dos ângulos internos de um polígono convexo de $n$ lados ($n \\geq 3$) é $S_n = (n-2)\\cdot 180^{\\circ}$.',
    demonstracao: '**Base** ($n = 3$): a soma dos ângulos internos de um triângulo é $180^{\\circ} = (3-2)\\cdot 180^{\\circ}$. ✓\n\n**Passo indutivo**: suponha o resultado válido para todo polígono convexo de $k$ lados. Seja $P$ um polígono convexo de $k+1$ lados, com vértices $V_1, V_2, \\dots, V_{k+1}$.\n\nTrace a diagonal $V_1V_3$. Ela divide $P$ em um triângulo $V_1V_2V_3$ e um polígono convexo $V_1V_3V_4\\dots V_{k+1}$ de $k$ lados. A soma dos ângulos de $P$ é a soma dos ângulos das duas peças: $$S_{k+1} = 180^{\\circ} + (k-2)\\cdot 180^{\\circ} = \\big((k+1)-2\\big)\\cdot 180^{\\circ}.$$\n\nPelo princípio da indução, vale para todo $n \\geq 3$.',
    fonte: 'Geometria plana elementar.',
    criadoEm: '2026-06-11'
  },
  {
    id: 'seed-4',
    titulo: 'Soma dos $n$ primeiros números naturais',
    area: 'Álgebra',
    tecnica: 'Indução',
    enunciado: 'Para todo $n \\geq 1$, vale $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$.',
    demonstracao: '**Base** ($n = 1$): $1 = \\dfrac{1 \\cdot 2}{2}$. ✓\n\n**Passo indutivo**: suponha que $1 + 2 + \\cdots + k = \\dfrac{k(k+1)}{2}$ para algum $k \\geq 1$. Somando $k+1$ aos dois lados: $$1 + 2 + \\cdots + k + (k+1) = \\frac{k(k+1)}{2} + (k+1) = (k+1)\\left(\\frac{k}{2} + 1\\right) = \\frac{(k+1)(k+2)}{2}.$$\n\nA fórmula vale para $k+1$ e, pelo princípio da indução, para todo $n \\geq 1$.',
    fonte: 'Atribuída a Gauss ainda criança, somando $1 + 100$, $2 + 99$, … em pares.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-5',
    titulo: 'Desigualdade de Bernoulli',
    area: 'Análise',
    tecnica: 'Indução',
    enunciado: 'Se $x \\geq -1$, então $(1+x)^n \\geq 1 + nx$ para todo $n \\in \\mathbb{N}$.',
    demonstracao: '**Base** ($n = 0$): $(1+x)^0 = 1 \\geq 1 + 0 \\cdot x$. ✓\n\n**Passo indutivo**: suponha $(1+x)^k \\geq 1 + kx$. Como $x \\geq -1$, temos $1 + x \\geq 0$, e multiplicar os dois lados por $(1+x)$ preserva a desigualdade: $$(1+x)^{k+1} \\geq (1 + kx)(1 + x) = 1 + (k+1)x + kx^2 \\geq 1 + (k+1)x,$$ pois $kx^2 \\geq 0$.\n\nPelo princípio da indução, o resultado vale para todo $n \\in \\mathbb{N}$.',
    fonte: 'Jacob Bernoulli (1689). Ferramenta básica no estudo de limites como $(1 + 1/n)^n$.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-6',
    titulo: '$n^3 - n$ é sempre múltiplo de $6$',
    area: 'Teoria dos Números',
    tecnica: 'Demonstração direta',
    enunciado: 'Para todo inteiro $n$, o número $n^3 - n$ é divisível por $6$.',
    demonstracao: 'Fatore: $$n^3 - n = n(n^2 - 1) = (n-1)\\, n\\, (n+1).$$\n\nTrata-se do produto de **três inteiros consecutivos**. Entre dois inteiros consecutivos há sempre um par, logo $2$ divide o produto. Entre três inteiros consecutivos há sempre um múltiplo de $3$, logo $3$ também divide o produto.\n\nComo $\\gcd(2, 3) = 1$, segue que $6 = 2 \\cdot 3$ divide $(n-1)\\,n\\,(n+1) = n^3 - n$.',
    fonte: 'Exercício clássico de divisibilidade; primeiro contato com fatoração estratégica.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-7',
    titulo: 'Se $n^2$ é par, então $n$ é par',
    area: 'Teoria dos Números',
    tecnica: 'Contrapositiva',
    enunciado: 'Para todo $n \\in \\mathbb{Z}$: se $n^2$ é par, então $n$ é par.',
    demonstracao: 'Provamos a contrapositiva: *se $n$ é ímpar, então $n^2$ é ímpar*.\n\nSe $n$ é ímpar, escreva $n = 2k + 1$ com $k \\in \\mathbb{Z}$. Então $$n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1,$$ que é ímpar.\n\nComo uma implicação é logicamente equivalente à sua contrapositiva, o resultado segue. É exatamente este lema que sustenta a demonstração da irracionalidade de $\\sqrt{2}$.',
    fonte: 'Lema auxiliar do argumento pitagórico; exemplo canônico de contrapositiva.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-8',
    titulo: 'Existem irracionais $a, b$ com $a^b$ racional',
    area: 'Análise',
    tecnica: 'Outra',
    enunciado: 'Existem números irracionais $a$ e $b$ tais que $a^b$ é racional.',
    demonstracao: 'Considere $x = \\sqrt{2}^{\\sqrt{2}}$ e analise dois casos.\n\n**Caso 1**: $x$ é racional. Então $a = b = \\sqrt{2}$ resolve o problema.\n\n**Caso 2**: $x$ é irracional. Tome $a = x$ e $b = \\sqrt{2}$. Então $$a^b = \\left(\\sqrt{2}^{\\sqrt{2}}\\right)^{\\sqrt{2}} = \\sqrt{2}^{\\sqrt{2} \\cdot \\sqrt{2}} = \\sqrt{2}^{\\,2} = 2 \\in \\mathbb{Q}.$$\n\nEm qualquer caso o par desejado existe — curiosamente, sem precisarmos decidir qual caso ocorre. (Pelo teorema de Gelfond–Schneider sabe-se que vale o Caso 2, mas a demonstração acima não usa isso.)',
    fonte: 'Exemplo clássico de demonstração **não construtiva** por análise de casos.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-9',
    titulo: 'Teorema de Pitágoras',
    area: 'Geometria',
    tecnica: 'Demonstração direta',
    enunciado: 'Em um triângulo retângulo de catetos $a, b$ e hipotenusa $c$, vale $a^2 + b^2 = c^2$.',
    demonstracao: 'Seja $ABC$ retângulo em $C$, com $BC = a$, $AC = b$, $AB = c$, e seja $H$ o pé da altura relativa à hipotenusa. A altura divide $ABC$ em dois triângulos menores, ambos semelhantes ao original — cada um tem um ângulo reto e compartilha um ângulo agudo com $ABC$.\n\nDa semelhança $\\triangle AHC \\sim \\triangle ACB$: $$\\frac{AC}{AB} = \\frac{AH}{AC} \\implies b^2 = c \\cdot AH.$$\n\nDa semelhança $\\triangle BHC \\sim \\triangle BCA$: $$\\frac{BC}{AB} = \\frac{BH}{BC} \\implies a^2 = c \\cdot BH.$$\n\nSomando as duas relações: $$a^2 + b^2 = c\\,(AH + BH) = c \\cdot c = c^2.$$',
    fonte: 'Euclides, *Elementos*, Livro I, Prop. 47 — aqui na versão pelas relações métricas.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-10',
    titulo: 'Desigualdade das médias (MA $\\geq$ MG)',
    area: 'Álgebra',
    tecnica: 'Demonstração direta',
    enunciado: 'Para quaisquer reais $a, b \\geq 0$, vale $\\dfrac{a+b}{2} \\geq \\sqrt{ab}$, com igualdade se, e somente se, $a = b$.',
    demonstracao: 'Quadrados de números reais são não negativos: $$\\left(\\sqrt{a} - \\sqrt{b}\\right)^2 \\geq 0.$$\n\nExpandindo: $a - 2\\sqrt{ab} + b \\geq 0$, ou seja, $$\\frac{a+b}{2} \\geq \\sqrt{ab}.$$\n\nA igualdade ocorre exatamente quando $\\sqrt{a} - \\sqrt{b} = 0$, isto é, quando $a = b$.',
    fonte: 'Caso $n = 2$ da desigualdade MA–MG; onipresente em olimpíadas.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-11',
    titulo: 'Um conjunto com $n$ elementos tem $2^n$ subconjuntos',
    area: 'Combinatória',
    tecnica: 'Argumento de contagem',
    enunciado: 'Se $|A| = n$, então o conjunto das partes $\\mathcal{P}(A)$ tem exatamente $2^n$ elementos.',
    demonstracao: 'Enumere $A = \\{a_1, a_2, \\dots, a_n\\}$. Para montar um subconjunto $S \\subseteq A$, percorremos os elementos um a um e, para cada $a_i$, tomamos uma decisão binária: $a_i \\in S$ ou $a_i \\notin S$.\n\nSão $n$ decisões independentes com $2$ opções cada; pelo princípio multiplicativo há $$\\underbrace{2 \\cdot 2 \\cdots 2}_{n \\text{ fatores}} = 2^n$$ resultados possíveis.\n\nSequências de decisões distintas geram subconjuntos distintos, e todo subconjunto corresponde a exatamente uma sequência — uma bijeção entre $\\mathcal{P}(A)$ e as sequências binárias de comprimento $n$.',
    fonte: 'É por isso que o conjunto das partes também se denota $2^A$.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-12',
    titulo: 'Identidade de Pascal',
    area: 'Combinatória',
    tecnica: 'Argumento de contagem',
    enunciado: 'Para $1 \\leq k \\leq n-1$: $\\dbinom{n}{k} = \\dbinom{n-1}{k-1} + \\dbinom{n-1}{k}$.',
    demonstracao: 'Contamos de duas maneiras os subconjuntos de $k$ elementos de $\\{1, 2, \\dots, n\\}$.\n\nPor um lado, há $\\binom{n}{k}$ deles, por definição.\n\nPor outro lado, fixe o elemento $n$ e separe os subconjuntos em duas classes disjuntas: os que **contêm** $n$ — basta escolher os $k-1$ elementos restantes entre os $n-1$ primeiros, dando $\\binom{n-1}{k-1}$ — e os que **não contêm** $n$ — basta escolher os $k$ elementos entre os $n-1$ primeiros, dando $\\binom{n-1}{k}$.\n\nDuas contagens do mesmo conjunto produzem o mesmo número: $$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}.$$',
    fonte: 'É a regra de formação do triângulo de Pascal.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-13',
    titulo: 'Em toda festa, duas pessoas conhecem o mesmo número de convidados',
    area: 'Combinatória',
    tecnica: 'Casa dos pombos',
    enunciado: 'Em qualquer grupo de $n \\geq 2$ pessoas, existem duas que conhecem exatamente o mesmo número de pessoas do grupo (a relação "conhecer" é simétrica).',
    demonstracao: 'Cada pessoa conhece um número de pessoas pertencente a $\\{0, 1, \\dots, n-1\\}$ — aparentemente $n$ valores possíveis para $n$ pessoas, sem conflito garantido.\n\nA observação-chave: os valores $0$ e $n-1$ **não podem ocorrer simultaneamente**. Se alguém conhece todos os outros ($n-1$ pessoas), então ninguém pode conhecer $0$ pessoas — e vice-versa.\n\nLogo os $n$ números de conhecidos assumem no máximo $n-1$ valores distintos. Pela casa dos pombos, duas pessoas têm o mesmo valor.',
    fonte: 'Em linguagem de grafos: todo grafo simples com $n \\geq 2$ vértices possui dois vértices de mesmo grau.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-14',
    titulo: 'Cinco pontos num quadrado de lado $2$',
    area: 'Geometria',
    tecnica: 'Casa dos pombos',
    enunciado: 'Dados $5$ pontos quaisquer em um quadrado de lado $2$, existem dois deles a distância no máximo $\\sqrt{2}$.',
    demonstracao: 'Divida o quadrado de lado $2$ em **quatro quadradinhos de lado $1$**, traçando os segmentos que unem os pontos médios dos lados opostos.\n\nSão $5$ pontos para $4$ quadradinhos: pela casa dos pombos, algum quadradinho contém ao menos dois dos pontos.\n\nDentro de um quadrado de lado $1$, a maior distância possível entre dois pontos é a diagonal, que mede $\\sqrt{1^2 + 1^2} = \\sqrt{2}$. Logo esses dois pontos distam no máximo $\\sqrt{2}$.',
    fonte: 'Exemplo padrão de casa dos pombos geométrica (OBMEP e similares).',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-15',
    titulo: 'Teorema de Cantor: $|A| < |\\mathcal{P}(A)|$',
    area: 'Lógica e Conjuntos',
    tecnica: 'Contradição (absurdo)',
    enunciado: 'Nenhuma função $f : A \\to \\mathcal{P}(A)$ é sobrejetora; em particular, $\\mathcal{P}(A)$ tem cardinalidade estritamente maior que $A$.',
    demonstracao: 'Suponha, por absurdo, que exista $f : A \\to \\mathcal{P}(A)$ sobrejetora. Defina o conjunto diagonal $$D = \\{\\, x \\in A : x \\notin f(x) \\,\\} \\in \\mathcal{P}(A).$$\n\nPela sobrejetividade, existe $d \\in A$ com $f(d) = D$. Pergunte: $d \\in D$?\n\nSe $d \\in D$, a definição de $D$ exige $d \\notin f(d) = D$ — contradição. Se $d \\notin D$, então $d \\notin f(d)$, e a definição de $D$ dá $d \\in D$ — contradição.\n\nAmbos os casos são impossíveis, logo tal $f$ não existe. Como $x \\mapsto \\{x\\}$ é injetora de $A$ em $\\mathcal{P}(A)$, conclui-se $|A| < |\\mathcal{P}(A)|$.',
    fonte: 'Georg Cantor (1891). Gera uma torre infinita de infinitos cada vez maiores.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-16',
    titulo: 'O intervalo $(0,1)$ não é enumerável',
    area: 'Lógica e Conjuntos',
    tecnica: 'Contradição (absurdo)',
    enunciado: 'Não existe lista $x_1, x_2, x_3, \\dots$ que contenha todos os números reais de $(0,1)$; isto é, $(0,1)$ — e portanto $\\mathbb{R}$ — é não enumerável.',
    demonstracao: 'Suponha, por absurdo, que $(0,1)$ seja enumerável: $x_1, x_2, x_3, \\dots$ Escreva cada um em expansão decimal $$x_i = 0{,}d_{i1}\\,d_{i2}\\,d_{i3}\\dots$$ (para números com duas expansões, escolha a que termina em zeros).\n\nConstrua $y = 0{,}e_1 e_2 e_3 \\dots$ pela regra diagonal: $$e_i = \\begin{cases} 5, & \\text{se } d_{ii} \\neq 5, \\\\ 6, & \\text{se } d_{ii} = 5. \\end{cases}$$\n\nEntão $y \\in (0,1)$ e, para cada $i$, $y$ difere de $x_i$ na $i$-ésima casa decimal; como $y$ só usa os dígitos $5$ e $6$, não há ambiguidade de dupla expansão. Logo $y$ não está na lista — contradição com a suposta completude da enumeração.',
    fonte: 'Argumento da diagonal de Cantor (1891).',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-17',
    titulo: '$\\mathbb{Q}$ é enumerável',
    area: 'Lógica e Conjuntos',
    tecnica: 'Construção',
    enunciado: 'O conjunto dos números racionais pode ser posto em bijeção com $\\mathbb{N}$.',
    demonstracao: 'Organize os racionais positivos em uma tabela infinita: na linha $p$, coluna $q$, coloque a fração $\\dfrac{p}{q}$.\n\nPercorra a tabela pelas diagonais $p + q = 2, 3, 4, \\dots$ — cada diagonal é finita, então toda fração é alcançada em tempo finito. Pulando as repetições (como $\\tfrac{2}{2} = \\tfrac{1}{1}$), obtemos uma lista $r_1, r_2, r_3, \\dots$ sem repetições com todos os racionais positivos.\n\nPara cobrir $\\mathbb{Q}$ inteiro, intercale: $$0,\\; r_1,\\; -r_1,\\; r_2,\\; -r_2,\\; \\dots$$\n\nIsso define uma bijeção $\\mathbb{N} \\to \\mathbb{Q}$: os racionais são "tão numerosos" quanto os naturais, embora densos na reta.',
    fonte: 'Cantor (1874); o contraste com a não enumerabilidade de $\\mathbb{R}$ é o ponto.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-18',
    titulo: 'Unicidade do limite de uma sequência',
    area: 'Análise',
    tecnica: 'Contradição (absurdo)',
    enunciado: 'Se $x_n \\to a$ e $x_n \\to b$, então $a = b$.',
    demonstracao: 'Suponha, por absurdo, $a \\neq b$ e tome $\\varepsilon = \\dfrac{|a-b|}{2} > 0$.\n\nDa convergência para $a$: existe $N_1$ tal que $|x_n - a| < \\varepsilon$ para todo $n > N_1$. Da convergência para $b$: existe $N_2$ tal que $|x_n - b| < \\varepsilon$ para todo $n > N_2$.\n\nPara qualquer $n > \\max\\{N_1, N_2\\}$, a desigualdade triangular dá $$|a - b| \\leq |a - x_n| + |x_n - b| < \\varepsilon + \\varepsilon = |a - b|,$$ ou seja, $|a - b| < |a - b|$ — absurdo. Logo $a = b$.',
    fonte: 'Primeiro teorema de qualquer curso de análise real.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-19',
    titulo: 'A série harmônica diverge',
    area: 'Análise',
    tecnica: 'Demonstração direta',
    enunciado: 'A série $\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n} = 1 + \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4} + \\cdots$ diverge.',
    demonstracao: 'Agrupe os termos em blocos de tamanhos $1, 2, 4, 8, \\dots$: $$1 + \\frac{1}{2} + \\underbrace{\\left(\\frac{1}{3} + \\frac{1}{4}\\right)}_{>\\, 2 \\cdot \\frac{1}{4} = \\frac{1}{2}} + \\underbrace{\\left(\\frac{1}{5} + \\frac{1}{6} + \\frac{1}{7} + \\frac{1}{8}\\right)}_{>\\, 4 \\cdot \\frac{1}{8} = \\frac{1}{2}} + \\cdots$$\n\nCada bloco de $2^k$ termos consecutivos termina em $\\dfrac{1}{2^{k+1}}$ e portanto soma mais que $2^k \\cdot \\dfrac{1}{2^{k+1}} = \\dfrac{1}{2}$.\n\nAssim as somas parciais satisfazem $H_{2^m} > 1 + \\dfrac{m}{2}$, que cresce sem limite. A série diverge — ainda que seus termos tendam a zero.',
    fonte: 'Nicole Oresme, séc. XIV — três séculos antes do cálculo.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-20',
    titulo: 'A inversa de uma matriz é única',
    area: 'Álgebra Linear',
    tecnica: 'Demonstração direta',
    enunciado: 'Se $A$ é uma matriz quadrada invertível, sua inversa é única.',
    demonstracao: 'Sejam $B$ e $C$ inversas de $A$, isto é, $AB = BA = I$ e $AC = CA = I$.\n\nUsando apenas a associatividade do produto de matrizes: $$B = BI = B(AC) = (BA)C = IC = C.$$\n\nQuaisquer duas inversas coincidem — o que justifica falar em **a** inversa e escrever $A^{-1}$. O mesmo argumento prova a unicidade do inverso em qualquer estrutura associativa com elemento neutro.',
    fonte: 'Demonstração padrão em álgebra linear; vale em qualquer monoide.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-21',
    titulo: 'Autovetores de autovalores distintos são LI',
    area: 'Álgebra Linear',
    tecnica: 'Demonstração direta',
    enunciado: 'Se $v_1$ e $v_2$ são autovetores de $A$ associados a autovalores distintos $\\lambda_1 \\neq \\lambda_2$, então $\\{v_1, v_2\\}$ é linearmente independente.',
    demonstracao: 'Suponha $\\alpha v_1 + \\beta v_2 = 0$. Aplicando $A$ aos dois lados: $$\\alpha \\lambda_1 v_1 + \\beta \\lambda_2 v_2 = 0.$$\n\nMultiplicando a primeira equação por $\\lambda_1$ e subtraindo da segunda: $$\\beta(\\lambda_2 - \\lambda_1)\\, v_2 = 0.$$\n\nComo $\\lambda_2 \\neq \\lambda_1$ e $v_2 \\neq 0$ (autovetores são não nulos por definição), segue $\\beta = 0$. Voltando à equação original, $\\alpha v_1 = 0$ com $v_1 \\neq 0$ dá $\\alpha = 0$.\n\nA única combinação linear nula é a trivial, logo $v_1$ e $v_2$ são LI. Por indução, o mesmo vale para $k$ autovalores distintos dois a dois.',
    fonte: 'Resultado básico por trás da diagonalização de matrizes.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-22',
    titulo: 'União arbitrária de abertos é aberta',
    area: 'Topologia',
    tecnica: 'Demonstração direta',
    enunciado: 'Em $\\mathbb{R}$, se $\\{U_i\\}_{i \\in I}$ é uma família qualquer de conjuntos abertos, então $U = \\bigcup_{i \\in I} U_i$ é aberto.',
    demonstracao: 'Seja $x \\in U$. Por definição de união, existe um índice $i_0 \\in I$ com $x \\in U_{i_0}$.\n\nComo $U_{i_0}$ é aberto, existe $\\varepsilon > 0$ tal que o intervalo $(x - \\varepsilon,\\, x + \\varepsilon)$ está contido em $U_{i_0}$.\n\nMas $U_{i_0} \\subseteq U$, logo $(x - \\varepsilon,\\, x + \\varepsilon) \\subseteq U$. Todo ponto de $U$ é interior, e portanto $U$ é aberto.\n\nPara **interseções**, o análogo só vale para famílias finitas: $\\bigcap_{n} \\left(-\\tfrac{1}{n}, \\tfrac{1}{n}\\right) = \\{0\\}$ não é aberto.',
    fonte: 'Um dos axiomas que definem uma topologia; aqui demonstrado na reta.',
    criadoEm: '2026-06-12'
  },
  {
    id: 'seed-23',
    titulo: 'Inclusão–exclusão para dois eventos',
    area: 'Probabilidade',
    tecnica: 'Demonstração direta',
    enunciado: 'Para quaisquer eventos $A$ e $B$: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.',
    demonstracao: 'Decomponha $A \\cup B$ em três pedaços dois a dois disjuntos: $$A \\cup B = (A \\setminus B) \\,\\cup\\, (A \\cap B) \\,\\cup\\, (B \\setminus A).$$\n\nPela aditividade da probabilidade em uniões disjuntas: $$P(A \\cup B) = P(A \\setminus B) + P(A \\cap B) + P(B \\setminus A).$$\n\nAlém disso, $A = (A \\setminus B) \\cup (A \\cap B)$ (união disjunta) dá $P(A \\setminus B) = P(A) - P(A \\cap B)$, e analogamente $P(B \\setminus A) = P(B) - P(A \\cap B)$. Substituindo: $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B).$$\n\nO termo subtraído corrige a dupla contagem da interseção.',
    fonte: 'Caso $n = 2$ do princípio da inclusão–exclusão; consequência direta dos axiomas de Kolmogorov.',
    criadoEm: '2026-06-12'
  }
];

/* ================= util ================= */
const $ = sel => document.querySelector(sel);
const app = $('#app');
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const uid = () => 'p-' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
const today = () => new Date().toISOString().slice(0,10);
const fmtDate = iso => { try { const [y,m,d] = iso.split('-'); return `${d}/${m}/${y}`; } catch { return iso; } };

function toast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._h);
  toast._h = setTimeout(()=>t.classList.remove('show'), 2400);
}

/* texto → HTML: parágrafos, **negrito**, *itálico*; LaTeX fica para o KaTeX */
function richText(src){
  return esc(src).split(/\n{2,}/).map(par =>
    '<p>' + par
      .replace(/\n/g,'<br>')
      .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g,'<em>$1</em>')
    + '</p>'
  ).join('');
}

function renderMath(el){
  if (typeof renderMathInElement !== 'function') return;
  renderMathInElement(el, {
    delimiters: [
      {left:'$$', right:'$$', display:true},
      {left:'$', right:'$', display:false},
      {left:'\\[', right:'\\]', display:true},
      {left:'\\(', right:'\\)', display:false}
    ],
    throwOnError: false
  });
}

/* ================= armazenamento ================= */
async function loadProofs(){
  try {
    const res = await window.storage.get(STORE_KEY);
    proofs = res ? JSON.parse(res.value) : null;
  } catch { proofs = null; }
  if (!Array.isArray(proofs)) {
    proofs = SEEDS.slice();
    saveProofs(false);
  }
}
async function saveProofs(notify = true){
  try {
    const r = await window.storage.set(STORE_KEY, JSON.stringify(proofs));
    if (!r && notify) toast('Não foi possível salvar agora.');
    return !!r;
  } catch {
    if (notify) toast('Não foi possível salvar agora.');
    return false;
  }
}

/* ================= cabeçalho / estatísticas ================= */
function renderStats(){
  const areas = new Set(proofs.map(p=>p.area).filter(Boolean));
  $('#stats').innerHTML =
    `<b>${proofs.length}</b> demonstraç${proofs.length===1?'ão':'ões'}<br>` +
    `<b>${areas.size}</b> área${areas.size===1?'':'s'} da matemática`;
}

/* ================= vista: lista ================= */
function renderList(){
  const q = filters.q.trim().toLowerCase();
  const visible = proofs.filter(p => {
    if (filters.area && p.area !== filters.area) return false;
    if (filters.tecnica && p.tecnica !== filters.tecnica) return false;
    if (q) {
      const blob = `${p.titulo} ${p.enunciado} ${p.demonstracao} ${p.area} ${p.tecnica} ${p.fonte}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });

  const areasInUse = [...new Set(proofs.map(p=>p.area).filter(Boolean))].sort();
  const tecInUse = [...new Set(proofs.map(p=>p.tecnica).filter(Boolean))].sort();

  app.innerHTML = `
    <div class="toolbar">
      <input type="search" id="f-q" placeholder="Buscar por título, enunciado, fonte…" value="${esc(filters.q)}" aria-label="Buscar demonstrações">
      <select id="f-area" aria-label="Filtrar por área">
        <option value="">Todas as áreas</option>
        ${areasInUse.map(a=>`<option ${filters.area===a?'selected':''}>${esc(a)}</option>`).join('')}
      </select>
      <select id="f-tec" aria-label="Filtrar por técnica">
        <option value="">Todas as técnicas</option>
        ${tecInUse.map(t=>`<option ${filters.tecnica===t?'selected':''}>${esc(t)}</option>`).join('')}
      </select>
      <button class="btn" id="btn-new">+ Nova demonstração</button>
    </div>
    <div class="list">
      ${visible.length ? visible.map(p => {
        const n = proofs.indexOf(p) + 1;
        return `
        <article class="entry" data-id="${p.id}" tabindex="0" role="button" aria-label="Abrir: ${esc(p.titulo)}">
          <div class="entry-margin">
            <span class="num">${String(n).padStart(2,'0')}</span>
            ${fmtDate(p.criadoEm || '')}
          </div>
          <div>
            <h2 class="entry-title">${esc(p.titulo)}</h2>
            ${p.enunciado ? `<p class="entry-statement">${esc(p.enunciado)}</p>` : ''}
            <div class="entry-tags">
              ${p.area ? `<span class="tag area">${esc(p.area)}</span>` : ''}
              ${p.tecnica ? `<span class="tag">${esc(p.tecnica)}</span>` : ''}
            </div>
          </div>
        </article>`;
      }).join('') : `
        <div class="empty">
          <div class="glyph">∎</div>
          <h2>${proofs.length ? 'Nada encontrado com esses filtros' : 'O acervo está vazio'}</h2>
          <p>${proofs.length ? 'Ajuste a busca ou limpe os filtros para ver tudo.' : 'Registre a primeira demonstração que marcou sua vida matemática.'}</p>
          ${proofs.length ? '' : '<button class="btn" id="btn-new-empty">+ Nova demonstração</button>'}
        </div>`}
    </div>`;

  renderMath(app.querySelector('.list'));

  $('#f-q').addEventListener('input', e => { filters.q = e.target.value; renderList(); });
  $('#f-area').addEventListener('change', e => { filters.area = e.target.value; renderList(); });
  $('#f-tec').addEventListener('change', e => { filters.tecnica = e.target.value; renderList(); });
  $('#btn-new')?.addEventListener('click', () => go({ name:'edit' }));
  $('#btn-new-empty')?.addEventListener('click', () => go({ name:'edit' }));
  app.querySelectorAll('.entry').forEach(el => {
    const open = () => go({ name:'detail', id: el.dataset.id });
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); open(); } });
  });

  /* restaurar foco da busca quando o usuário está digitando */
  if (document.activeElement === document.body && filters.q) {
    const inp = $('#f-q'); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
  }
}

/* ================= vista: detalhe ================= */
function renderDetail(id){
  const p = proofs.find(x => x.id === id);
  if (!p) return go({ name:'list' });
  const n = proofs.indexOf(p) + 1;

  app.innerHTML = `
    <div class="proof-page">
      <button class="crumb" id="back">← voltar ao acervo</button>
      <div class="proof-head">
        <div>
          <div class="proof-kicker">Demonstração nº ${String(n).padStart(2,'0')}</div>
          <h2 class="proof-title">${esc(p.titulo)}</h2>
        </div>
        <div class="proof-actions">
          <button class="btn ghost small" id="edit">Editar</button>
          <button class="btn danger small" id="del">Excluir</button>
        </div>
      </div>
      <div class="proof-meta">
        ${p.area ? `<span>área · <b>${esc(p.area)}</b></span>` : ''}
        ${p.tecnica ? `<span>técnica · <b>${esc(p.tecnica)}</b></span>` : ''}
        ${p.criadoEm ? `<span>registro · <b>${fmtDate(p.criadoEm)}</b></span>` : ''}
      </div>
      ${p.enunciado ? `
      <div class="thm-block">
        <span class="label">Teorema.</span><span class="body">${richText(p.enunciado).replace(/^<p>|<\/p>$/g,'')}</span>
      </div>` : ''}
      <div class="proof-body">
        <span class="label">Demonstração.</span>
        ${richText(p.demonstracao)}
        <div class="qed" aria-label="fim da demonstração"><div class="stone"></div></div>
      </div>
      ${p.fonte ? `<div class="proof-source">onde vi · ${richText(p.fonte).replace(/<\/?p>/g,'')}</div>` : ''}
    </div>`;

  renderMath(app);
  $('#back').addEventListener('click', () => go({ name:'list' }));
  $('#edit').addEventListener('click', () => go({ name:'edit', id }));
  $('#del').addEventListener('click', async () => {
    if (!confirm(`Excluir “${p.titulo.replace(/\$/g,'')}” do acervo? Esta ação não pode ser desfeita.`)) return;
    proofs = proofs.filter(x => x.id !== id);
    await saveProofs();
    toast('Demonstração excluída.');
    go({ name:'list' });
  });
}

/* ================= vista: editor ================= */
function renderEditor(id){
  const p = id ? proofs.find(x => x.id === id) : null;

  const selOpts = (list, current) => {
    const base = list.map(o => `<option ${current===o?'selected':''}>${esc(o)}</option>`).join('');
    const extra = current && !list.includes(current) ? `<option selected>${esc(current)}</option>` : '';
    return base + extra;
  };

  app.innerHTML = `
    <div class="editor">
      <button class="crumb" id="back">← voltar sem salvar</button>
      <h2>${p ? 'Editar demonstração' : 'Nova demonstração'}</h2>
      <p class="hint">Use LaTeX livremente: <code>$x^2$</code> para fórmulas na linha e <code>$$ … $$</code> para destacadas. <code>**negrito**</code> e <code>*itálico*</code> também funcionam. Parágrafos separados por linha em branco.</p>

      <div class="field">
        <label for="e-titulo">Título do teorema <span class="req">*</span></label>
        <input type="text" id="e-titulo" value="${esc(p?.titulo || '')}" placeholder="ex.: Desigualdade das médias (MA ≥ MG)">
      </div>

      <div class="field-row">
        <div class="field">
          <label for="e-area">Área</label>
          <select id="e-area">${selOpts(AREAS, p?.area || '')}</select>
        </div>
        <div class="field">
          <label for="e-tec">Técnica de demonstração</label>
          <select id="e-tec">${selOpts(TECNICAS, p?.tecnica || '')}</select>
        </div>
      </div>

      <div class="field">
        <label for="e-enun">Enunciado</label>
        <textarea id="e-enun" placeholder="O enunciado preciso do teorema…">${esc(p?.enunciado || '')}</textarea>
      </div>

      <div class="field">
        <label for="e-dem">Demonstração <span class="req">*</span></label>
        <textarea id="e-dem" class="tall" placeholder="A demonstração completa, passo a passo…">${esc(p?.demonstracao || '')}</textarea>
      </div>

      <div class="field">
        <label>Pré-visualização</label>
        <div class="preview-box" id="preview"><span class="ph">A demonstração renderizada aparecerá aqui enquanto você digita.</span></div>
      </div>

      <div class="field">
        <label for="e-fonte">Onde vi esta demonstração</label>
        <input type="text" id="e-fonte" value="${esc(p?.fonte || '')}" placeholder="ex.: aula do prof. X, livro do Elon, vídeo, prova de concurso…">
      </div>

      <div class="editor-actions">
        <button class="btn" id="save">${p ? 'Salvar alterações' : 'Adicionar ao acervo'}</button>
        <button class="btn ghost" id="cancel">Cancelar</button>
      </div>
    </div>`;

  const back = () => go(p ? { name:'detail', id } : { name:'list' });
  $('#back').addEventListener('click', back);
  $('#cancel').addEventListener('click', back);

  /* pré-visualização ao vivo */
  let pvTimer;
  const updatePreview = () => {
    clearTimeout(pvTimer);
    pvTimer = setTimeout(() => {
      const en = $('#e-enun').value.trim();
      const dm = $('#e-dem').value.trim();
      const box = $('#preview');
      if (!en && !dm) {
        box.innerHTML = '<span class="ph">A demonstração renderizada aparecerá aqui enquanto você digita.</span>';
        return;
      }
      box.innerHTML =
        (en ? `<div class="thm-block" style="margin-bottom:18px"><span class="label">Teorema.</span><span class="body">${richText(en).replace(/^<p>|<\/p>$/g,'')}</span></div>` : '') +
        (dm ? `<div class="proof-body"><span class="label">Demonstração.</span>${richText(dm)}</div>` : '');
      renderMath(box);
    }, 350);
  };
  $('#e-enun').addEventListener('input', updatePreview);
  $('#e-dem').addEventListener('input', updatePreview);
  updatePreview();

  $('#save').addEventListener('click', async () => {
    const titulo = $('#e-titulo').value.trim();
    const demonstracao = $('#e-dem').value.trim();
    if (!titulo) { toast('Dê um título ao teorema.'); $('#e-titulo').focus(); return; }
    if (!demonstracao) { toast('A demonstração não pode ficar vazia.'); $('#e-dem').focus(); return; }

    const data = {
      titulo,
      area: $('#e-area').value,
      tecnica: $('#e-tec').value,
      enunciado: $('#e-enun').value.trim(),
      demonstracao,
      fonte: $('#e-fonte').value.trim()
    };

    let targetId;
    if (p) {
      Object.assign(p, data);
      targetId = p.id;
    } else {
      const novo = { id: uid(), criadoEm: today(), ...data };
      proofs.unshift(novo);
      targetId = novo.id;
    }
    await saveProofs();
    toast(p ? 'Alterações salvas. ∎' : 'Demonstração registrada. ∎');
    go({ name:'detail', id: targetId });
  });
}

/* ================= exportar / importar ================= */
$('#btn-export').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(proofs, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `repositorio-demonstracoes-${today()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
});
$('#btn-import').addEventListener('click', () => $('#file-import').click());
$('#file-import').addEventListener('change', async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data)) throw new Error();
    const existing = new Set(proofs.map(p=>p.id));
    let added = 0;
    for (const item of data) {
      if (!item || typeof item.titulo !== 'string' || typeof item.demonstracao !== 'string') continue;
      const id = (item.id && !existing.has(item.id)) ? item.id : uid();
      existing.add(id);
      proofs.push({
        id,
        titulo: item.titulo,
        area: String(item.area || ''),
        tecnica: String(item.tecnica || ''),
        enunciado: String(item.enunciado || ''),
        demonstracao: item.demonstracao,
        fonte: String(item.fonte || ''),
        criadoEm: String(item.criadoEm || today())
      });
      added++;
    }
    await saveProofs();
    toast(`${added} demonstraç${added===1?'ão importada':'ões importadas'}.`);
    go({ name:'list' });
  } catch {
    toast('Arquivo inválido. Use um .json exportado daqui.');
  }
  e.target.value = '';
});

/* ================= navegação ================= */
function go(next){
  view = next;
  renderStats();
  if (view.name === 'detail') renderDetail(view.id);
  else if (view.name === 'edit') renderEditor(view.id);
  else renderList();
  window.scrollTo({ top: 0 });
}

/* ================= início ================= */
(async () => {
  app.innerHTML = '<div class="empty"><div class="glyph">∎</div><h2>Abrindo o acervo…</h2></div>';
  await loadProofs();
  go({ name:'list' });
})();
</script>
</body>
</html>
