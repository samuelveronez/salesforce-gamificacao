# Manual para IA — GSA Unificado na Salesforce de desenvolvimento

Versão 3.0 • 7 de novembro de 2026 • Base: PRD unificado, com experiência configurada nas páginas nativas Salesforce.

**Experiência atual:** [app GSA Unificado separado](https://orgfarm-d714274d9d-dev-ed.develop.lightning.force.com/lightning/app/06maj00000brb8zAAA), com Home Lightning por papel, abas operacionais compartilhadas e páginas nativas de Case/Claim. O Path nativo do outro agente foi preservado. A antiga réplica em LWC foi retirada da navegação. A referência vigente de configuração é `salesforce-sinistro-360/docs/GSA-EXPERIENCIA-NATIVA.md`; a documentação da primeira implantação permanece como histórico. Nesta revisão, seis testes LWC e lint passaram; perfis, permissões, layouts e dados não foram alterados. Nenhum push foi feito no GitHub.

## 1. Fonte de verdade

Transportar para o Salesforce a experiência já consolidada na [POC GSA Unificado](https://poc.veronez.app/gsa-unificado/index.html), seguindo seu [PRD F01–F15](https://poc.veronez.app/gsa-unificado/prd.html). A unificação já existe; não é uma hipótese a ser redesenhada a partir das versões antigas.

A POC reuniu gamificação, versão operacional, gestão nativa e console. Sua proposta é **um papel, uma régua, uma jornada**. O núcleo é score único → próxima ação → trava com time dono → escalação → decisão da mesa → retorno à fila. Reconhecimento é opcional e posterior ao piloto.

As cópias examinadas estão em `referencias-gsa-unificado/index.html` e `referencias-gsa-unificado/prd.html`. Os materiais antigos deste workspace são contexto secundário e não substituem o PRD unificado.

## 2. Destino e inventário comprovado

| Item | Evidência |
|---|---|
| Repositório | [samuelveronez/sinistro-360](https://github.com/samuelveronez/sinistro-360), privado |
| Base Git examinada | `main`, commit `2a05d287ef4d5cd70229d7d73140e4d044236805` |
| Org | `00Daj00001F5qw5EAB`, Veronez.app, **Developer Edition** |
| Alias CLI | `sinistro360` |
| Domínio | `orgfarm-d714274d9d-dev-ed.develop.lightning.force.com` |
| Registro fornecido | Claim `a02aj00000kbsgTAAQ` / CLM-0001, relacionado ao Case `500aj00003umtZvAAI` |
| Projeto DX | Pacote `force-app`, API declarada `68.0` |
| Checkout deste trabalho | `salesforce-sinistro-360/`, branch local `codex/gsa-unificado` |
| Concorrência | Outro agente trabalha na mesma org e no GitHub |

A conexão foi comprovada com consulta à Organization. O `DomainNotFoundError` anterior ocorreu sob restrição de rede; o mesmo CLI funcionou após permitir acesso externo. Não recriar org ou refazer login sem repetir o diagnóstico.

Reutilizar Case, Account, Contact, `Apolice_Simulada__c`, `Claim_Simulado__c`, `Pendencia_Operacional__c`, `Evento_Operacional__c`, `Participante_Sinistro__c`, `Historico_Responsaveis__c`, `Alocacao_Organizacional__c`, WorkOrder e WorkOrderLineItem.

A org tem mudanças ausentes do Git: página `Sinistro_360_Case`, campos de alerta e Flows `Sinistro_Abertura`, `Analisar_Sinistro`, `Sinistro_Retorno_Vistoria`, `Sinistro_Pendencias_Vencidas` e `Sinistro_Entitlement`. Cópias foram recuperadas para `salesforce-sinistro-360/baseline-org/`. São fotografia para inspeção, **não** um pacote a reimplantar sobre o outro agente.

ServiceAppointment é consultável, mas isso não comprova agenda preenchida, Field Service configurado ou licença de cada usuário.

## 3. Seis papéis da experiência

| Papel | Pergunta e tela |
|---|---|
| Diretoria | O estoque está saudável e onde está o risco? Estoque/SLA por etapa, exceções e medição de valor |
| Mesa central | O que só eu posso destravar hoje? Exceções, decisões e quem trava quem |
| Supervisor/gerente | Meu time dá conta hoje? Carga por pessoa, travas e revisão de qualidade |
| Analista | O que eu trato agora? Próximo caso, fila por score e travados separados |
| Regulador | Qual vistoria e qual orçamento faço primeiro? Agenda e orçamento na mesma régua |
| Oficinas e peças | Minha rede está cheia, e o que segura o reparo? Capacidade, peças e dependências |

Os seis papéis acima são personas do PRD, não seis abas internas a reproduzir. A Home usa componentes nativos e visibilidade pelo papel organizacional existente. Atualmente há Diretoria de Sinistros, Gerência de Operações, Liderança de Colisão e Analistas de Sinistros. Não criar outros papéis nem trocar perfis/permissões para simular as personas ausentes. Não usar seletor de papel dentro da página.

## 4. Jornada única e compatibilidade

O PRD define **Aviso → Análise → Vistoria → Regulação e orçamento → Reparo → Entrega**.

As picklists existentes diferem: Case tem Aviso, Vistoria, Análise, Aguardando peças, Reparo, Pagamento e Encerrado; Claim tem Aviso, Cobertura, Vistoria, Orçamento, Decisão e Pagamento. Não substituir nem sincronizar automaticamente essas listas.

Na experiência vigente, o Path é o nativo `Etapas_do_Sinistro`, baseado em `Case.Etapa_Operacional__c`. Não desenhar outro chevron nem apresentar `GSA_Etapa__c` como segunda autoridade visual. Esse campo aditivo permanece como dado da primeira POC; o mapeamento para as seis etapas abstratas do PRD é uma pendência de reconciliação. Não atualizar dados/Flows silenciosamente para fazer as jornadas parecerem equivalentes. A página nativa usa os campos, ações e Flows existentes para a operação.

## 4.1 Composição nativa obrigatória

- Manter o app GSA Unificado separado, sem alterar Sinistro_360/Sinistro_360_Console.
- Usar `GSA_Inicio` como Home padrão apenas desse app, com regras nativas de visibilidade por `User.UserRole.Name`.
- Reutilizar os dashboards nativos Executivo, Líder e Analista existentes, sem alterar suas fontes ou permissões.
- Usar páginas `GSA_Case_Operacional` e `GSA_Claim_Operacional`, atribuídas no app: cabeçalhos, detalhes, relacionados, atividades e marcos nativos.
- Reservar LWC para `gsaProximoCaso` (uma recomendação que abre o Case nativo) e `gsaAcoesCaso` (score e exceções na lateral). Não criar cabeçalho de aplicação, navegação, personas, detalhe completo ou Path dentro deles.
- Manter as abas Início, Casos, Claims, Ordens de trabalho, Pendências, Eventos, Relatórios e Painéis como navegação compartilhada Salesforce.
- Validar com `manifest/gsa-native-pages.xml`. Esta revisão não inclui perfis, permission sets, layouts, Flows ou PathAssistant no manifesto.

## 5. PRD completo e recorte por capacidade

| Feature | Onda/tipo no PRD | Implementação e limites |
|---|---|---|
| F01 — Score único | 1 / Configuração | SLA/cliente/valor, total e prioridade; pesos/cortes em Custom Metadata |
| F02 — Jornada única | 1 / Nativo | Seis etapas, caminho e listas; preservar etapas antigas até reconciliar |
| F03 — Fila/próximo a tratar | 1 / LWC | Home por papel, score, motivo, prazo e navegação ao Case |
| F04 — Trava com time dono | 1 / Configuração | Time/motivo obrigatórios; pendência, início e histórico; retirar da fila tratável |
| F05 — Escalar | 1 / Configuração | Pedido obrigatório, mesa recebe imediatamente e evento fica no Case |
| F06 — Mesa e decisão | 1 / LWC | Exceções, tipo/motivo da decisão, resolver trava e devolver à fila; capacidade depende de F08 |
| F07 — Painéis | 1 / Nativo | Estoque/SLA/etapas/regional; relatórios de origem e assinatura de e-mail precisam de configuração própria |
| F08 — Carga/redistribuição | 2 / LWC | Contagem real por responsável; definir capacidade e mover apenas P2/P3 com registro |
| F09 — Vistoria | 1 / Nativo | WorkOrders e compromissos relacionados; agenda depende da configuração Field Service |
| F10 — Regulação/orçamento | 2 / Integração | Status, data, valor e responsável; lote horário; depende de API/arquivo real |
| F11 — Oficinas | 3 / Integração | Fila, capacidade, retrabalho e reclamações; depende da rede |
| F12 — Peças | 3 / Integração | Peça crítica, estoque, prazo e alternativo; consulta manual identificada |
| F13 — Reconhecimento | 4 / LWC | Desligado por padrão; primeiro da fila **e** dentro do prazo; confirmar após revisão independente |
| F14 — Timeline unificada | 3 / Integração | Eventos Salesforce já podem aparecer; externos dependem de F10–F12 |
| F15 — Medição de valor | 1 / Nativo | Fontes, baseline e controle; não inventar P90, minutos ou benefícios |

Uma tela disponível não significa todos os critérios da feature entregues. Produzir matriz de evidências por critério; completar o recorte nativo possível e sinalizar o restante.

## 6. Score correto

```text
Score = SLA (até 40) + Cliente (até 35) + Valor/severidade (até 25)
P1: >=70 | P2: >=40 e <70 | P3: <40
```

- SLA: percentual do prazo da etapa consumido, limitado ao teto; prazo vencido atinge 40. Datas ausentes precisam ser sinalizadas.
- Cliente: sem sinal = 0; reclamação ou NPS detrator = 17; ouvidoria, Procon ou segundo contato = 35.
- Valor: faixa de reserva acrescida de severidade por perda total, terceiro ou vítima, limitada a 25.
- Pesos e cortes: configuração Salesforce ajustável sem alteração de código.

O PRD não especifica limites monetários de reserva ou parcelas por severidade. Uma tabela inicial **proposta da POC**, a validar, é: reserva <10 mil = 5; 10–20 mil = 10; 20–50 mil = 15; >=50 mil = 20; severidade soma 5; teto 25. Não apresentar essa tabela como decisão aprovada no PRD.

Ordenar pelo score decrescente; desempatar por criação e Id. Separar travados da fila tratável, mantendo seu score visível. Capturar no servidor score, prazo e condição de primeiro da fila no momento da ação. A regra antiga “pendência crítica primeiro, depois prazo” não substitui o score unificado.

## 7. Travas e mesa: fluxo obrigatório

1. Analista/regulador informa **time dono e motivo**. Referências: Segurado, Field Service, Regulação, Oficina e Peças.
2. Gravar pendência operacional, data inicial e evento. O caso sai da fila tratável e aparece no recorte do time responsável.
3. Mesa recebe escalação manual imediatamente, cliente crítico e trava com **3 dias úteis**. Capacidade acima de 100% é gatilho adicional quando existir capacidade planejada.
4. Mesa informa tipo e justificativa; servidor valida permissão e estado.
5. Resolver trava, preservar histórico e devolver à fila, reordenada pelo score.

Se a versão contar apenas segunda a sexta, declarar que **não considera feriados**. Não usar dias corridos como dias úteis. “Autorizar fornecedor alternativo” pode registrar decisão demonstrativa, mas não implica pedido externo. “Mover regional” só está executado quando houver mudança real e auditada de responsável/regional.

Mudança de Case, pendência e evento devem ser atômicos. Usar bloqueio do Case, versão esperada e chave única da operação. Duplo clique ou tela desatualizada não podem gerar segundo avanço. Falha em uma gravação reverte o conjunto.

## 8. Reconhecimento

Desligado por padrão, habilitado somente no recorte autorizado após validar o piloto. A condição do PRD é **primeiro da fila e dentro do prazo**. Não reaproveitar a soma independente da POC antiga para pontuar ação fora da prioridade ou do prazo.

Se adotados 15 pontos por ação elegível, documentar como valor demonstrativo. Revisão de qualidade pode existir sem reconhecimento. Executor não revisa a própria ação; aprovação/rejeição exige motivo, não ocorre duas vezes e só aprovação confirma pontos. Totais com limite de consulta precisam mostrar janela e recorte.

## 9. Evitar conflito com o outro agente

- Usar checkout e branch isolados. Não fazer push/merge sem instrução específica.
- Criar nomes `GSA_*`/`GsaUnificado*`; conferir ausência de colisão na org imediatamente antes do primeiro deploy.
- Implantar **somente** `manifest/gsa-unificado.xml`. Não enviar `force-app` inteiro: isso poderia sobrescrever componentes antigos com versões desatualizadas.
- Preservar aplicação Sinistro 360, páginas, layouts, Flows e picklists originais. Aplicação/aba GSA nova pode coexistir.
- Não adicionar ações a layouts compartilhados sem reconciliar o estado atual.
- Dados fictícios separados por chave `POC-GSA-`; não atualizar o Claim indicado ou Cases do outro agente na carga.
- O Flow `Sinistro_Abertura` já cria Claim e eventos ao inserir Case. Não duplicá-los na carga.
- Não desativar automações do outro agente para fazer testes passarem.

## 10. Segurança

Criar custom permissions e permission sets distintos para operação, mesa e gestão. Atribuir inicialmente apenas ao usuário autorizado da org de dev; não conceder Modify All Data/View All Data como atalho.

Leituras respeitam compartilhamento e CRUD/FLS; `with sharing` sozinho não é suficiente. Validar acesso de edição ao Case antes de escrever. Campos de auditoria/revisão/estado são somente leitura nos permission sets da POC. Se o serviço escrever em system mode, restringir a elevação às operações previstas e documentá-la. Nunca aceitar campos arbitrários, executor, score ou quantidade de pontos do navegador.

Não expor tokens, URLs com sessão ou arquivos de credenciais. Não versionar `.sf`, `.sfdx`, evidências privadas ou dados pessoais. Usar dados fictícios identificáveis.

## 11. Execução

Ler instruções aplicáveis, estado Git e diferenças da org. Ler as seis telas e o PRD antes de escolher o recorte. Conferir org/alias; permissão de rede é diferente de novo login. Todos os comandos de projeto abaixo são executados dentro de `salesforce-sinistro-360/`.

```powershell
$env:SF_DISABLE_LOG_FILE = 'true'
$env:SF_DISABLE_TELEMETRY = 'true'
$targetOrg = 'sinistro360'
sf data query --target-org $targetOrg --query 'SELECT Id, Name, OrganizationType, IsSandbox FROM Organization'
sf project deploy preview --manifest manifest/gsa-native-pages.xml --target-org $targetOrg
sf project deploy start --manifest manifest/gsa-native-pages.xml --target-org $targetOrg --dry-run --wait 30
```

Developer Edition pode ter IsSandbox=false; ler tipo e identidade em conjunto. Conferir flags no `--help` instalado. Dry-run valida e testa sem aplicar. Acompanhar jobs pelo ID até resultado final.

O usuário autorizou implementar e implantar na org de desenvolvimento. Prosseguir nesse escopo; se houver ação fora dele ou aprovação obrigatória da ferramenta, apresentar exatamente a ação e o motivo.

```powershell
sf project deploy start --manifest manifest/gsa-native-pages.xml --target-org $targetOrg --wait 30
```

Nesta revisão de experiência, não atribuir permission sets nem trocar usuários/perfis. A camada de dados e os acessos da primeira implantação já existem e devem ser preservados. Conferir no navegador a Home, os registros e o Path nativos; validação de metadata não equivale a validação visual.

## 12. Aceite e evidências

| Cenário | Resultado |
|---|---|
| Telas e PRD | Seis papéis reconhecíveis; F01–F15 mapeadas |
| Score | Tetos/cortes corretos, composição e motivo |
| Jornada | Seis etapas sem destruir campos/Flows atuais |
| Trava | Time/motivo obrigatórios, persistência e saída da fila tratável |
| Escalação/decisão | Pedido na mesa, decisão registrada e retorno à fila |
| Concorrência | Versão desatualizada não produz segundo avanço |
| Atomicidade | Falha no evento reverte Case e pendência |
| Reconhecimento | Desligado por padrão; prioridade/prazo e revisão independente |
| Acesso | Papel/parâmetro de API não concede permissão |
| Integrações | Ausência e parcialidade identificadas, sem números inventados |
| Preservação | Claim, Cases, Flows, layouts e aplicação original mantidos |
| Persistência | Reabrir tela recupera dados Salesforce, sem localStorage |
| Medição | Baseline/controle separados dos números ilustrativos |

Registrar Passou/Falhou/Não executado com evidência. Distinguir código local, dry-run, deploy, carga e verificação visual. Enumerar critérios parciais, como F07 sem assinatura de e-mail e F09 sem agenda preenchida.

## 13. Entrega e recuperação

Entregar link da aba, roteiro, manifesto, testes, carga idempotente e matriz PRD × implementação. Em problema, preferir interromper o uso da nova aplicação. Não restaurar a fotografia antiga sobre mudanças posteriores do outro agente. Deploy de metadata não reverte dados. Exclusão exige analisar dependências; limpeza deve identificar somente registros POC-GSA, nunca a org inteira.

## 14. Prompt para continuar

> Continue a POC GSA Unificado na Developer Edition de alias sinistro360 conforme https://poc.veronez.app/gsa-unificado/index.html e seu PRD. Siga os seis papéis, score 40/35/25, seis etapas e fluxo trava → time dono → mesa → fila. Leia este manual e os arquivos locais. Outro agente trabalha na org e no GitHub: preserve componentes existentes, use branch isolada e manifesto restrito, sem push/merge. Reutilize os objetos Sinistro 360 e não duplique claims do Flow de abertura. Implemente o recorte nativo possível, teste e implante no escopo autorizado pelo usuário. Sinalize integrações/licenças pendentes. Reconhecimento desligado por padrão, com prioridade e prazo obrigatórios. Entregue evidências, distinguindo completo, parcial e pendente.

## 15. Fontes

- [POC unificada](https://poc.veronez.app/gsa-unificado/index.html) e [PRD](https://poc.veronez.app/gsa-unificado/prd.html), fontes principais.
- [Sinistro 360](https://github.com/samuelveronez/sinistro-360), base DX; consultas e metadata da org complementam o Git.
- [Salesforce CLI — deploy](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html).
- [Salesforce — segurança Apex](https://developer.salesforce.com/docs/platform/lwc/guide/apex-security).

Esta revisão substitui a definição hipotética e as regras das POCs antigas do manual anterior.
