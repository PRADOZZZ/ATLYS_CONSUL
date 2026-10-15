# CHECKPOINT — PROTOTIPO2

A direção visual foi atualizada para ficar mais escura, reta e próxima das referências enviadas.

## Implementado
- Hero escuro e proporcional.
- Header compacto.
- Faixa animada de parceiros/operadoras.
- Grade de 10 serviços.
- Jornada consultiva em 4 etapas.
- Clientes em esteira escura.
- Reputação/Google em esteira.
- Loja visualmente alinhada ao novo design.
- Duas fontes de foto distintas nos 22 aparelhos.

## Testado
- 32 testes automatizados aprovados.
- Carrinho, filtros, busca, checkout, localStorage, WhatsApp e menu mobile.
- Desktop 1440px e mobile 390px sem rolagem horizontal.

## Ainda falta para produção perfeita
- Salvar localmente todas as fotos dos aparelhos que ainda usam URLs externas.
- Validação final dos indicadores comerciais e cases pelo cliente.

## Checkpoint — Segurança e APIs
### Concluído
- Integração BrasilAPI para CNPJ.
- Integração ViaCEP para CEP/endereço.
- Validação/sanitização dos formulários e checkout.
- Honeypot e rate limit básico no cliente.
- Remoção de persistência de PII do pedido em localStorage.
- Headers de segurança de produção em `vercel.json` e `_headers`.
- CSP preparada para scripts locais e APIs autorizadas.
- Eventos inline removidos da loja.

### Testado
- CNPJ preenche empresa e CEP em resposta simulada.
- ViaCEP preenche cidade/endereço em resposta simulada.
- Checkout seguro gera pedido.
- PII não permanece em localStorage.
- Sem erros JavaScript no teste de segurança/API.

### Ainda falta
- Hospedar todas as imagens de aparelhos localmente e validar as duas fotos reais por modelo.
- Para pagamento online ou WhatsApp Business API oficial, criar backend/serverless com segredos em variáveis de ambiente; não expor tokens no frontend.
