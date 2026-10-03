# Escopo — GSA Performance Missions

## Objetivo

Apresentar ao time e às lideranças uma experiência navegável de gamificação integrada à operação de Sinistro Auto, com aparência inspirada no Salesforce Lightning.

## Tecnologia e execução

Aplicativo local em `app/`, usando React, TypeScript, Vite e Salesforce Lightning Design System. `iniciar-aplicacao.cmd` inicia a aplicação e abre o navegador. O comando de build gera `app/dist/` para distribuição futura.

## Telas

| Tela | Experiência |
|---|---|
| Início | Meta diária, indicadores, fila priorizada, próximo caso e missões |
| Minha carteira | Busca por número ou segurado, filtros e abertura de registros |
| Sinistro | Jornada, resumo, atividades, histórico, relacionados e registro de ação |
| Missões e conquistas | Evolução individual, progressão, selos e missão da equipe |
| Visão do gestor | Indicadores ilustrativos, distribuição da carteira e validação de qualidade |
| Regras | Pontuação, complexidade, qualidade e métricas do piloto |
| Referências | Pesquisa e três HTMLs originais acessíveis na aplicação |

## Fluxo demonstrável

Prioridade recomendada → abertura do sinistro → registro da decisão → avanço da etapa → pontos provisórios → revisão do gestor → pontos confirmados.

Uma ação é concluída apenas uma vez. A confirmação pelo gestor também ocorre apenas uma vez. A missão de SLA só avança em ações recomendadas e dentro do prazo. A missão de qualidade e a redução coletiva só avançam após validação. O botão de reinício restaura os dados iniciais.

## Limites desta versão

Dados fictícios. Indicadores de negócio e histórico inicial são ilustrativos. A etapa avança de forma simplificada para apresentar o efeito da ação. Não há integração com Salesforce, autenticação, revisão automática, janela real de retrabalho nem avaliação de colaboradores. O estado fica armazenado no navegador local.

## Referência

Pesquisa preservada em `referencia-gamificacao-sinistro-auto.md` e materiais HTML originais na raiz do projeto. A versão local não publica arquivos na internet.
