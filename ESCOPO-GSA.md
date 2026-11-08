# GSA — Gestão de Sinistro Auto

## Objetivo e uso deste documento

Consolidar o escopo do programa GSA e as funcionalidades em implantação, em evolução e a construir, a partir do contexto fornecido. Este documento serve como referência para produto, refinamento e planejamento; não comprova o status atual das entregas.

O texto de origem reúne discussões de diferentes momentos de 2026. Não há inventário validado que permita afirmar, funcionalidade por funcionalidade, o que está concluído, em desenvolvimento ou ainda não iniciado. Por isso, os agrupamentos abaixo indicam o posicionamento no escopo e na evolução do programa. Status, responsáveis, datas e evidências devem ser confirmados no backlog e com os times.

## Propósito do projeto

Modernizar a gestão do Sinistro Auto usando Salesforce, especialmente Financial Services Cloud / Claims e capacidades do ecossistema, como centro da experiência operacional e da orquestração do trabalho.

O projeto combina três objetivos:

1. Substituir o legado com continuidade e segurança operacional.
2. Transformar a operação, reduzindo prazo, contatos e retrabalho e aumentando produtividade, previsibilidade e rastreabilidade.
3. Estruturar processos e dados para ampliar automação e assistência por Inteligência Artificial.

O resultado esperado é permitir crescimento da carteira sem aumento proporcional da estrutura operacional, com melhor experiência para cliente, corretor, analista e liderança.

## Limites e abrangência

O GSA deve atender progressivamente as naturezas de Sinistro Auto, consolidando no Caso/Sinistro informações, atividades, documentos, comunicações, decisões, regras, exceções e próximas ações.

Salesforce atua como camada central de gestão e orquestração. Sistemas especialistas podem continuar responsáveis por etapas específicas, conectados por integrações. Paridade significa preservar capacidades necessárias à operação; não exige reproduzir literalmente telas ou procedimentos do legado.

O fluxo abrangido vai do aviso até a liquidação e o encerramento:

Aviso/intake → dados de apólice e aviso → criação do processo → validações e decisão → reservas → regulação → distribuição ao analista/Dono do Processo → reparo e demais processos aplicáveis → pagamentos/liquidação → encerramento.

Documentos, comunicação, rastreabilidade e monitoramento acompanham toda a jornada. Salvados, sindicância, ressarcimento e jurídico entram conforme a natureza e as regras do caso.

### Naturezas contempladas na expansão

| Natureza | Escopo esperado | Situação a confirmar |
|---|---|---|
| Naturezas da solução inicial | Fluxo nominal, exceções, regras, integrações e operação | Relação das naturezas e prontidão atual não informadas |
| Colisão Terceiro | Jornada ponta a ponta e dependências específicas | Citada no roadmap; status atual não comprovado |
| Incêndio e Alagamento | Jornada ponta a ponta e dependências específicas | Citada no roadmap; status atual não comprovado |
| Lucros Cessantes | Jornada ponta a ponta e dependências específicas | Citada no roadmap; status atual não comprovado |
| Dano Material | Jornada ponta a ponta e dependências específicas | Citada no roadmap; status atual não comprovado |

Uma natureza só está pronta para substituir o legado quando o fluxo principal, as exceções relevantes, as regras, as integrações e a operação estiverem validados.

## Base em implantação e evolução

O contexto relata um piloto controlado em produção em maio/junho de 2026, em três estados da região Norte, com baixo volume, convivência com o legado e possibilidade de liga/desliga. Essa referência demonstra implantação naquele período, mas não confirma cobertura funcional ou situação atual.

As capacidades abaixo compõem a base funcional a implementar, validar e estabilizar em cada natureza. A classificação como base não significa que todas estejam em desenvolvimento neste momento.

| Frente funcional | Funcionalidades no escopo | Resultado esperado |
|---|---|---|
| Intake e abertura | Receber aviso, obter dados da apólice e do aviso, gravar e criar o processo | Entrada consistente e rastreável |
| Core Caso/Sinistro | Consolidar dados do segurado, terceiro, corretor, veículo e coberturas; status, substatus e relacionamento entre registros | Visão operacional centralizada |
| Workflow e orquestração | Etapas, atividades executadas e futuras, tarefas, pendências, regras de avanço e exceções | Sinistro avançando com clareza de responsabilidade |
| Distribuição | Filas, atribuição ao analista/Dono do Processo, grupos, especialidades e regiões | Trabalho direcionado ao responsável adequado |
| Regras e decisão | Validações, regras de negócio, encaminhamentos e tratamento de exceções | Decisões consistentes e auditáveis |
| Documentos e histórico | Documentos, histórico de movimentações, comunicações e decisões | Evidências acessíveis durante toda a jornada |
| Regulação e reparo | Regulação, vistorias, oficina, detalhes do reparo, peças pendentes, consultor de peças e carro reserva | Acompanhamento das etapas externas e seus bloqueios |
| Financeiro e encerramento | Reservas por cobertura, constituição e movimentação de reservas, pagamentos, liquidação e encerramento | Continuidade financeira e conclusão rastreável |
| Integrações | Troca de dados, atualização de situação e visibilidade de falhas nas interfaces | Continuidade entre Salesforce e sistemas especialistas |
| Monitoramento | Indicadores, incidentes, conciliação com legado e rastreabilidade | Evidências para estabilização e rollout |

As frentes representam responsabilidades funcionais, não necessariamente módulos técnicos separados no Salesforce.

## Funcionalidades a construir ou ampliar

### Expansão de processos e integrações

| Capacidade | Entregas funcionais esperadas |
|---|---|
| Novas naturezas | Fluxos completos de Colisão Terceiro, Incêndio e Alagamento, Lucros Cessantes e Dano Material, incluindo exceções e integrações |
| Sindicância | Orquestrar encaminhamento, acompanhamento e retorno ao processo de sinistro |
| Salvados | Integrar informações e etapas aplicáveis à jornada do sinistro |
| Ressarcimento e jurídico | Encaminhar, acompanhar situação e incorporar retornos e decisões ao caso |
| Comunicação | Comunicação com cliente/corretor, histórico consolidado, WhatsApp ativo e CX One, conforme desenho a validar |
| Jornada do Dono do Processo | Responsabilidades, pendências, acompanhamento e comunicação ao longo da jornada |
| Regulação, oficinas e peças | Ampliar integração e visibilidade de etapas, retornos, prazos e bloqueios |
| Pagamentos e reservas | Evoluir integrações financeiras e automatização de pagamento e acordo |
| Motores de regras e decisão | Ampliar decisões estruturadas e encaminhamentos automáticos |
| GSA–Emissão | Solicitação de endosso de cancelamento com dados/documentos, validação, fila, análise, emissão ou negativa justificada e auditoria |
| Novos Negócios e portfólio | Validar abrangência da substituição do sistema de Novos Negócios e dependências com demais squads |

Na integração GSA–Emissão, foram considerados os estados pendente, enviado, em análise, emitido e não permitido. O desenho definitivo e os critérios de transição precisam ser refinados.

Sistemas e domínios citados incluem SOMA, SIASI, Vulcano, COU, Fourway, plataformas de regulação, oficinas, salvados, sindicância, ressarcimento, jurídico e canais de comunicação. A lista é referência de dependências, não confirmação de interfaces já entregues. MuleSoft/APIs foram discutidos como meios de conexão.

### Workspace e produtividade do analista

- Carteira priorizada por regras, com prazo, aging, última movimentação, status e substatus.
- Próxima ação orientada, atividades pendentes, alertas e exceções visíveis.
- Resumo do caso, dados essenciais, documentos e histórico acessíveis no contexto do sinistro.
- Visão integrada de reparo, vistorias, oficina, peças, carro reserva e reservas financeiras.
- Relacionamento entre sinistros e visão das atividades já executadas e futuras.
- Redução de navegação entre sistemas e de busca manual por informações.

A lista priorizada deve orientar o trabalho e permitir medir desvios, processos pulados e exceções. A preferência discutida é acompanhar a disciplina por regras e dashboards; um bloqueio técnico de escolha não está definido como requisito.

### Gestão por exceção, dados e analytics

- Dashboards de casos sem avanço, concentração de risco, aging por pessoa/fila, risco de prazo e bloqueios de integração.
- Visibilidade de execução fora da prioridade e de utilização efetiva das funcionalidades.
- Relatórios envolvendo Cases, Claims, Work Orders e Work Order Line Items, com filtros por analista, grupo, especialidade, região e hierarquia.
- Validação dos relacionamentos e da disponibilidade de campos para combinar dados de Claim, Work Order e itens nos relatórios.
- Process Mining para tempos entre etapas, filas, reprocessamentos, gargalos e desvios.
- Qualidade de dados e conciliação GSA versus legado para apoiar operação e migração.

### Automação e IA

| Capacidade prevista | Uso esperado |
|---|---|
| Resumo inteligente | Resumir sinistro e últimas movimentações |
| Próxima ação recomendada | Identificar pendências e orientar avanço do processo |
| Classificação e priorização | Apoiar organização da carteira e detecção de casos de risco |
| Respostas assistidas | Gerar sugestões de comunicação para corretores/clientes |
| Pesquisa unificada | Recuperar informações relevantes do caso e dos sistemas conectados |
| Monitoramento | Apoiar acompanhamento de prazo e detecção de exceções |
| Execução autorizada | Automatizar tarefas dentro de regras, permissões e rastreabilidade definidas |
| Assistência à gestão | Apoiar leitura de riscos, bloqueios e oportunidades de melhoria |

A implementação depende de dados, status, regras, tarefas e integrações suficientemente estruturados. Cada uso deve definir limites de atuação, necessidade de revisão humana e evidências de execução.

### Gamificação leve

Capacidade em exploração para estimular o avanço correto e tempestivo do sinistro, aderente à experiência Salesforce/FSC:

- Pontos, selos e feedbacks por avanço útil do processo.
- Regras que considerem complexidade, prazo, qualidade e aderência à prioridade.
- Indicadores para identificar seleção de casos fáceis, distorções e competição prejudicial.

A gamificação depende de métricas e regras consistentes. Quantidade de cliques ou ações, isoladamente, não deve gerar reconhecimento.

Neste repositório, a aplicação demonstrativa de gamificação tem escopo próprio em [ESCOPO-APLICACAO.md](ESCOPO-APLICACAO.md). A demonstração usa dados fictícios e não comprova implementação ou integração dessas capacidades no GSA.

## Organização e priorização do backlog

Cada demanda deve ser classificada para explicitar seu papel na implantação:

| Classe | Critério |
|---|---|
| Continuidade/paridade | Indispensável para substituir o legado com segurança |
| Gap de implantação | Corrige ausência ou comportamento inadequado identificado na validação |
| Produtividade/experiência | Melhora a forma de trabalhar e reduz esforço operacional |
| Inovação/automação/IA | Amplia inteligência e automação progressivamente |

As ondas conceituais são: base, equivalência e estabilização; experiência, produtividade e automação; inteligência, escala e IA. Melhorias não devem bloquear a substituição básica sem justificativa operacional, e itens indispensáveis não devem ser adiados apenas por serem classificados como paridade.

Os roadmaps citados tinham horizontes até Q1/Q2 de 2027, com revisões de sequência ao longo de 2026. São referências históricas; datas vigentes precisam ser confirmadas. Estimativas de capacidade, story points e estoque do Jira presentes no contexto também são cenários, não compromissos atuais.

### Definition of Ready

Antes de desenvolvimento, cada história deve ter:

- Objetivo e resultado esperado claros.
- Processo principal, regras de negócio e exceções relevantes.
- Critérios de aceite e cenários verificáveis, incluindo BDD quando aplicável.
- Dados, integrações, dependências e riscos identificados.
- Protótipo quando necessário e validação com negócio/operação.
- Dúvidas críticas resolvidas e compreensão suficiente para estimativa técnica.

O backlog deve distinguir épicos, histórias e enablers e registrar decisões, gaps legado × GSA, paridade, melhorias, inovação e itens pós-rollout. A capacidade deve considerar discovery, refinamento, solução, desenvolvimento, testes, homologação, implantação e estabilização.

## Condições para implantação e expansão

Prontidão precisa ser comprovada em três dimensões: funcionalidade, operação e resultado.

| Gate conceitual | Evidência esperada |
|---|---|
| G0 — Iniciar validação | Escopo, cenários e condições de validação preparados |
| G1 — Funcionalidades críticas | Capacidades essenciais e integrações testadas |
| G2 — Piloto controlado | Operação assistida em produção com contingência |
| G3 — Estabilidade e indicadores | Indicadores dentro dos limites definidos e estabilidade aceitável |
| G4 — Rollout/expansão | Decisão de avanço sustentada pelas evidências anteriores |

O avanço exige ausência de incidentes críticos P0/P1, operação treinada, rastreabilidade, integrações funcionando, contingência disponível e ausência de risco operacional ou relevante ao cliente. Limites e período de observação devem ser definidos para cada onda.

Falhas críticas, degradação relevante de prazo/qualidade, perda de rastreabilidade, etapa inviável ou inconsistência grave de dados devem acionar avaliação de pausa ou retorno temporário ao legado.

São necessários matriz de prontidão por natureza, registro de incidentes, livro de bordo, riscos e dependências, conciliação com legado, decisão de go/no-go e hypercare. Treinamento, comunicação, adoção e preparação do Dono do Processo fazem parte da prontidão operacional.

## Indicadores de sucesso

| Dimensão | Indicadores a acompanhar |
|---|---|
| Prazo e fluxo | Lead time, aging, processos parados, backlog e tempos entre etapas |
| Produtividade | Volume movimentado e produtividade por analista/time, considerando complexidade e qualidade |
| Qualidade | Retrabalho, tarefas reabertas, erros, incidentes e estabilidade do fluxo |
| Experiência | Contatos por sinistro, primeira resposta, qualidade percebida e NPS/CSAT quando aplicável |
| Adoção | Uso efetivo de funcionalidades/telas, adesão à prioridade e motivos de resistência |
| Migração | Naturezas prontas ponta a ponta, volume migrado e taxa de fallback ao legado |
| Automação | Automação/STP quando aplicável e efeito sobre prazo e esforço |

Metas, fontes, fórmulas e limites ainda precisam ser definidos ou confirmados. Sucesso deve ser medido pela operação segura, mais rápida e produtiva, e não apenas por número de features ou pontos entregues.

## Diretrizes de solução e dependências

Priorizar capacidades nativas Salesforce, Flow, filas, objetos e relacionamentos, regras, dashboards e componentes Lightning/LWC aderentes ao Lightning Design System. Apex e customizações maiores devem ter justificativa de valor e manutenção. Decisões de experiência devem ponderar ganho operacional e esforço técnico.

O escopo depende de articulação entre Produto/Negócio, Arquitetura/LTs, desenvolvimento/QA, operação, dados, infraestrutura, GMO/treinamento e gestão integrada de riscos e cronograma. Integrações com Pagamentos e Reserva, Novos Negócios/Liquidação/Salvados, R3, SIASE e demais iniciativas precisam ter contratos e responsabilidades claros.

## Confirmações necessárias para atualizar o escopo

1. Inventário das naturezas atuais e prontidão de cada uma.
2. Status real de cada funcionalidade: em refinamento, preparada, em desenvolvimento, em testes, em piloto ou entregue.
3. Cobertura e situação das integrações, incluindo contingências e responsáveis.
4. Backlog vigente com classificação, prioridade, critérios de aceite e dependências.
5. Roadmap atual, capacidade validada e critérios de go/no-go.
6. Baselines, metas e fontes dos indicadores de resultado.

A decisão central por onda é comprovar que a parte do Sinistro Auto abrangida pode sair do legado e operar no GSA de forma segura, produtiva e sustentável. Após estabilização, a evolução deve focar em eliminar trabalho, automatizar atividades e aplicar IA para reduzir prazo e aumentar produtividade.
