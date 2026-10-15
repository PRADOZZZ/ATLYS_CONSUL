# ATLYS — PROTOTIPO2

## Concluído nesta etapa
- Direção visual escura e mais quadrada aplicada.
- Header condensado, com navegação principal simplificada.
- Hero reproporcionado em duas colunas, com fotografia real da equipe.
- Botões secundários cinza e cantos reduzidos em cards, inputs, modais e filtros.
- Nova faixa animada de operadoras/parceiros.
- Serviços convertidos para grade escura com 10 soluções.
- Jornada consultiva com quatro etapas e linha animada.
- Área de clientes convertida para seção escura com esteira contínua.
- Área de reputação/Google adicionada em formato de esteira.
- Links oficiais adicionados somente aos clientes identificados com segurança.
- Loja preservada e adaptada visualmente para a nova identidade.
- 22 produtos continuam funcionais com filtros, busca, carrinho, localStorage, checkout e WhatsApp.
- 22 produtos agora possuem uma segunda fonte visual distinta para a alternância de 6 segundos.
- Fallback de imagem quebrada não mostra mais a logo da Atlys como se fosse produto.

## Testado
- 32 verificações automáticas de loja, carrinho, filtros, checkout, acessibilidade básica e responsividade.
- Sem overflow horizontal nas páginas principais em 1440px e 390px.
- Sintaxe dos arquivos JavaScript.
- Referências locais de HTML/CSS/JS/imagens.

## Pendente / próxima etapa
- Baixar para o projeto as fotos dos aparelhos que ainda dependem de URLs externas, para eliminar risco de hotlink.
- Fazer validação visual manual final em navegadores reais e ajustar detalhes finos caso necessário.
- Confirmar com o cliente os números/cases antes da publicação definitiva.

## Segurança e APIs — atualização
- Adicionado `assets/js/security.js` com sanitização, validação, honeypot e limitação básica de tentativas.
- Adicionado `assets/js/apis.js` com BrasilAPI (CNPJ) e ViaCEP (CEP/endereço).
- Checkout passa a validar CNPJ/WhatsApp antes de gerar o pedido.
- CNPJ pode preencher razão social, CEP, cidade, UF e endereço quando disponível.
- CEP pode preencher cidade, UF e endereço.
- Dados pessoais do pedido não são mais salvos em `localStorage`; apenas o carrinho permanece persistido.
- Adicionados `vercel.json` e `_headers` com CSP, HSTS, nosniff, anti-framing, Referrer-Policy e Permissions-Policy.
- Removidos handlers inline do carrinho para permitir uma CSP mais restritiva.
- Adicionado `SECURITY.md` com arquitetura e limitações de segurança.
- Teste `tests/security_api_test.py`: 7 verificações aprovadas.

### Pendente conhecido
- As imagens dos aparelhos ainda dependem de fontes externas; `tests/check_product_images.mjs` indica 0/22 com duas imagens reais locais. Isso não foi mascarado nesta etapa.
