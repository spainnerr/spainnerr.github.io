(() => {
  "use strict";
  const panel = document.getElementById("repository-guide-answer");
  if (!panel) return;
  const entries = {"start": {"question": "Como funciona o acervo?", "answer": "O acervo reúne 23 teoremas em 9 áreas. Cada entrada apresenta enunciado, hipóteses, resultados usados e demonstração. Escolha um assunto e abra “Ler hipóteses e demonstração”.", "link": "./teoremas.html#acervo"}, "search": {"question": "Como encontrar um teorema?", "answer": "Digite um assunto na busca do acervo e combine os filtros de área e técnica. A busca inclui enunciados, hipóteses e demonstrações. Use “Limpar” para ver todos os teoremas.", "link": "./teoremas.html#acervo"}, "statement": {"question": "O que diz o enunciado?", "answer": "O enunciado expressa precisamente o resultado do teorema. Leia-o junto das hipóteses para identificar os objetos envolvidos, as condições e a conclusão.", "link": "./teoremas.html#acervo"}, "hypotheses": {"question": "O que são as hipóteses?", "answer": "São as condições em que o teorema vale. Confira todas antes de aplicar o resultado. Por exemplo, a versão de Pitágoras no acervo exige um triângulo retângulo não degenerado no plano euclidiano.", "link": "./teoremas.html#seed-9"}, "dependencies": {"question": "O que são os resultados usados?", "answer": "São definições, propriedades ou outros teoremas que sustentam a demonstração. Eles indicam os conhecimentos necessários para acompanhar a prova. Nem todo resultado auxiliar tem uma demonstração própria neste acervo.", "link": "./teoremas.html#como-usar"}, "proof": {"question": "Como ler uma demonstração?", "answer": "Leia o enunciado, confira as hipóteses e revise os resultados usados. Depois acompanhe cada passo da demonstração e observe como ele conduz à conclusão. A técnica indicada ajuda a reconhecer a estrutura do argumento.", "link": "./teoremas.html#acervo"}, "share": {"question": "Como compartilhar um teorema?", "answer": "Abra a demonstração e clique em “Link deste teorema”. Copie o endereço do navegador. O link abre diretamente a entrada escolhida.", "link": "./teoremas.html#acervo"}, "download": {"question": "Como baixar o acervo?", "answer": "Use o link abaixo para baixar o arquivo JSON com os enunciados, hipóteses, resultados usados e demonstrações. Ele contém os textos do acervo em formato estruturado.", "link": "./assets/teoremas.json"}};
  const buttons = [...document.querySelectorAll("[data-guide-question]")];
  buttons.forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.guideQuestion;
    if (!Object.prototype.hasOwnProperty.call(entries, id)) return;
    const entry = entries[id];
    const heading = document.createElement("h3"); heading.textContent = entry.question;
    const answer = document.createElement("p"); answer.textContent = entry.answer;
    const link = document.createElement("a"); link.href = entry.link;
    link.textContent = id === "download" ? "Baixar acervo em JSON ↓" : "Abrir no acervo →";
    if (id === "download") link.setAttribute("download", "teoremas.json");
    panel.replaceChildren(heading, answer, link);
    buttons.forEach(b => b.setAttribute("aria-pressed", String(b === button)));
  }));
})();
