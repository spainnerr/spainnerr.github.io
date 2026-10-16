# Repositório de teoremas

Acesse `teoremas.html` pelo menu Teoremas do site. O acervo público contém 23 teoremas recuperados do README da branch `claude/website-demonstrations-1wb78y`, revisão `cf1883531842a219d6a1e58d1ca6e039dc8f607b`.

## Como consultar

1. Busque por assunto ou combine os filtros de área e técnica.
2. Leia o enunciado e abra “Ler hipóteses e demonstração”.
3. Confira as hipóteses, os resultados usados e a prova.
4. Use “Link deste teorema” para compartilhar a entrada.

A página funciona como acervo público de consulta. Não há edição pública nem gravação das perguntas do guia. A Spainner AI oferece orientações cadastradas sobre o uso do acervo, sem API de IA ou cobrança por pergunta. KaTeX formata as expressões usando os mesmos recursos públicos já referenciados no acervo original.

## Conteúdo e manutenção

`assets/teoremas.json` contém os textos estruturados e permite download. Cada entrada possui `id`, `titulo`, `area`, `tecnica`, `enunciado`, `hipoteses`, `resultados_usados` e `demonstracao`. As notas históricas originais são preservadas no campo `fonte`; não foram verificadas como referências bibliográficas nesta revisão.

`teoremas.html` apresenta uma cópia estática desses dados para permitir leitura mesmo sem JavaScript. Ao atualizar o acervo, mantenha os dois arquivos sincronizados e preserve os identificadores existentes. `assets/teoremas.js` controla a busca e os filtros; `assets/repository-guide.js` contém o guia usado tanto no site quanto no acervo. Novos teoremas devem conter hipóteses explícitas e demonstração completa antes da publicação.

## Revisão matemática (autorrevisão)

Escopo: os 23 enunciados e provas herdados, com explicitação dos domínios, hipóteses e conhecimentos auxiliares. As provas são apresentadas relativamente aos resultados básicos listados em cada entrada; estes não são todos demonstrados no acervo. Não se trata de auditoria independente nem de verificação de fontes históricas.

Ajustes substantivos: Bernoulli começa em n=1, evitando a expressão 0^0 para x=-1; subconjuntos inclui o caso vazio; o problema dos conhecidos explicita a exclusão da própria pessoa; pontos sobre linhas divisórias recebem uma única célula; a série harmônica usa estimativa não estrita para incluir o primeiro bloco; a entrada de autovetores delimita o resultado a dois vetores efetivamente demonstrados; união de abertos explicita a família vazia. Os argumentos originais foram conservados.

O acervo original permanece preservado na branch de origem. Eventuais entradas pessoais salvas fora do GitHub não fazem parte dos 23 registros recuperados.
