# Salesforce Gamificação — GSA Performance Missions

Aplicação demonstrativa navegável para apresentar ao time e às lideranças a experiência de gamificação em Sinistro Auto, inspirada no Salesforce Lightning.

## Executar localmente

Requer Node.js e npm. No Windows, execute `iniciar-aplicacao.cmd`; na primeira execução, as dependências serão instaladas e o navegador será aberto.

Ou execute:

```sh
cd app
npm install
npm run dev
```

Para compilar: `npm run build` na pasta `app`.

## Experiência

Painel do analista, carteira priorizada, detalhe do sinistro, registro de ações, missões, conquistas, revisão do gestor e regras de pontuação. Dados fictícios, sem integração com Salesforce. Os eventos da demonstração são persistidos apenas no navegador e podem ser reiniciados.

## Materiais

- `ESCOPO-APLICACAO.md`: escopo e roteiro da experiência.
- `referencia-gamificacao-sinistro-auto.md`: pesquisa fornecida como referência.
- HTMLs na raiz: apresentação, blueprint e POC original.
- `app/README.md`: roteiro de apresentação e regras implementadas.

As dependências estão declaradas em `package.json` e fixadas no `package-lock.json`. `node_modules` fica fora do Git; para apresentar sem internet, instale as dependências previamente no computador de apresentação ou leve uma cópia local com essa pasta, compatível com Windows.
