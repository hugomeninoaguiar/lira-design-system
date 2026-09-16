# CLAUDE.md — Lira Design System

## O que isto é

Um sistema, dois produtos, quatro superfícies. Primitivas partilhadas e um tema
semântico por superfície. Nada aqui é para ser consumido como um todo.

## As quatro superfícies, e a regra de nunca as misturar

| Superfície | Tema | Onde vive o produto |
|---|---|---|
| Women · Mobile | `tokens/semantic/core.json` | `lira` (app móvel) |
| Women · Web | `tokens/semantic/women-web.json` | `lira-website` |
| Pro · Web (marketing) | `tokens/semantic/pro-web.json` | `lira-website`, só em `/lira-for-professionals` |
| Pro · App (clínica) | `tokens/semantic/pro-app.json` | `lira-clinical-protocol` |

Uma superfície usa só o seu tema. Importar os tokens de outra é como um produto
acaba com o aspecto de outro. O pro-app é slate e violeta nas escalas do Tailwind
e não se parece com nada do resto: nunca lhe tragas cores de fora nem leves as
dele para dentro. A única excepção é deliberada e está documentada no próprio
token: o `green.300` é o anel de foco do pro-app, a única cor da marca que aquela
superfície guarda.

Nota sobre o `lira-website`: ele serve duas superfícies ao mesmo tempo, a Women
na maior parte do site e a Pro em `/lira-for-professionals`. Em setembro de 2026,
o selector `[data-surface="pro"]` existe no `globals.css` do site e nada em `src/`
o activa, por isso a página de profissionais renderiza com a superfície Women.
Ou se liga, ou se tira o bloco: deixá-lo é como alguém mais tarde assume que a
página está tematizada quando não está.

## As primitivas são a fonte única

`tokens/primitives/*.json` é onde as cores existem. Os temas semânticos só
apontam para elas com `{color.x.y}`. Se precisas de um valor que não existe, cria
a primitiva e aponta o semântico para ela: não escrevas hexadecimais nos temas.

Uma primitiva pode servir dois semânticos ao mesmo tempo. O `warm.400` é ao mesmo
tempo `text.muted` e `border.strong` no women-web, e o `cool.300` faz o mesmo par
no pro-web. Mudar-lhe o valor para corrigir um uso estraga o outro. Correcções de
um uso fazem-se sempre no semântico.

## Contraste

Os tokens de texto são para texto e têm de cumprir as WCAG 2.1 AA: 4,5:1 para
texto corrido, 3:1 para texto grande (24px, ou 18,66px a negrito) e para
indicadores de foco (critério 1.4.11). Mede contra todos os fundos que o próprio
tema declara, não só contra o branco: o `background.heroPrimary` do women-web é o
pior caso e é fácil esquecê-lo.

Na paleta quente não há espaço para três níveis de texto legível. O `text.muted`
do women-web e do pro-web aponta de propósito para o mesmo valor do
`text.secondary`: o tom mais claro que ainda passa fica a 1,06:1 do secundário,
ou seja é a mesma cor. A hierarquia entre os dois faz-se pelo tamanho, pelas
maiúsculas e pelo espaçamento entre letras, não pela cor.

## O build, e o que ele não faz

`npm run build:tokens` gera `dist/js/` e `dist/react-native/`. Commita `tokens/` e
`dist/` juntos, como diz o CONTRIBUTING. `npm run check:brand` confirma que os
ficheiros de marca batem certo com os da app.

O build só consome as primitivas, o `core.json`, o `typography.json` e os
componentes. **Os três ficheiros de superfície (women-web, pro-web, pro-app) não
entram no `dist`.** Quem os lê é o `docs/index.html` e, à mão, cada produto. Se
acrescentares um token a um tema de superfície, ele não aparece no `dist` e tens
de o levar tu ao produto.

## Três espelhos escritos à mão, e todos derivam

O `src/app/globals.css` do `lira-website` copia estas primitivas e semânticas para
variáveis CSS à mão. O `tailwind.config.ts` do mesmo repositório copia-as outra
vez, em classes. E o `docs/index.html` daqui copia-as uma terceira vez, com os
hexadecimais gravados dentro do `<style>`.

Nada regenera nenhum dos três. Quando mudares um token aqui, leva-o aos três na
mesma sessão, ou a próxima pessoa lê duas verdades e acredita na errada. Já
aconteceu: o `green.500` esteve com dois valores diferentes entre os repositórios
até setembro de 2026.

Cuidado com o `tailwind.config.ts` do site em particular: ele corre em Tailwind 4,
que não gera classe nenhuma a partir de uma chave em camelCase e falha em
silêncio, sem erro na build. Os nomes têm de sair em kebab-case.

## A app móvel instala de main, sem versão fixa

O `package.json` da app móvel tem
`"@lira/design-system": "github:hugomeninoaguiar/lira-design-system"`. Sem tag,
sem commit fixo. Qualquer coisa que entre no main deste repositório chega à
próxima build da app. Não há rede de segurança.

## Anomalias conhecidas, para não as leres como erro

A escala `color.green` não é monótona. O 500 é o degrau mais escuro de todos
(luminosidade 17%), o 600 (31%) é mais claro que o 700 (26%), e o 200, 300 e 400
estão a três pontos de luminosidade uns dos outros (78, 77, 75). Está registado no
`$description` do green.500 e fica assim por decisão de setembro de 2026.
