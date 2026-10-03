# GSA Performance Missions

Protótipo local navegável para apresentar a experiência de gamificação em Sinistro Auto. Interface inspirada no Salesforce Lightning, construída com React, TypeScript, Vite e estilos SLDS oficiais.

## Executar

Com Node.js instalado, abra um terminal nesta pasta:

```powershell
npm.cmd install
npm.cmd run dev
```

Abra o endereço informado pelo Vite. Para gerar a versão de distribuição: `npm.cmd run build`.

## Roteiro de apresentação

1. No início, abra o próximo caso recomendado.
2. Consulte as abas e a jornada do sinistro.
3. Conclua a próxima ação registrando uma decisão.
4. Volte ao início e observe a nova prioridade e a missão atualizada.
5. Na visão do gestor, valide a qualidade para confirmar os pontos.
6. Consulte missões, regras e materiais de referência.

O botão **Reiniciar demonstração** restaura a carteira inicial. As ações são salvas localmente neste navegador. Todos os nomes e dados são fictícios; não há conexão com Salesforce.

## Regras implementadas

Pontos provisórios = (10 por prioridade recomendada + 5 por cumprimento do SLA) × complexidade. Ação fora da prioridade não recebe o bônus de prioridade. Pontos só entram no total confirmado após a simulação de revisão do gestor. Não é possível pontuar novamente a mesma ação.

O cenário começa com 12 de 18 prioridades concluídas e 420 pontos confirmados. Os seis casos interativos completam a jornada de demonstração. Indicadores históricos, sequência e métricas da equipe são valores ilustrativos; a carteira, as missões e os pontos respondem às ações da sessão. Uma ação de demonstração avança uma etapa na jornada para tornar o efeito visível. A aprovação manual de qualidade representa uma revisão que em produção dependeria de evidências e janela de retrabalho.

## Fontes

Materiais originais na pasta superior, preservados, e cópias locais em `public/referencias/`. A pesquisa contém marcadores de citação sem os links bibliográficos originais.
