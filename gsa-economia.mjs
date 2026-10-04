export const example = {
  settings: {capex: 3000000, upfront: 0, discount: 10, opStart: 4, ramp: 6, month: 12},
  groups: [
    {id:'analistas', name:'Analistas tradicionais', hours:132, cost:10000},
    {id:'liquidadores', name:'Liquidadores · PT e roubo/furto', hours:132, cost:12000},
    {id:'n2', name:'N2 técnico', hours:132, cost:14000},
    {id:'fale', name:'Fale com o analista', hours:132, cost:9000}
  ],
  operations: [
    {group:'analistas', kind:'permanece', name:'Intervenções de análise que permanecem', volume:8000, before:8, after:5, coverage:80, conversion:50},
    {group:'liquidadores', kind:'permanece', name:'Processos de liquidação que permanecem', volume:1000, before:30, after:18, coverage:70, conversion:50},
    {group:'n2', kind:'permanece', name:'Demandas técnicas que permanecem', volume:600, before:25, after:17, coverage:75, conversion:50},
    {group:'fale', kind:'permanece', name:'Conversas de corretor que permanecem', volume:3000, before:8, after:6, coverage:80, conversion:50},
    {group:'analistas', kind:'elimina', name:'Redigitação em sistema auxiliar', volume:1000, before:4, after:0, coverage:80, conversion:50},
    {group:'liquidadores', kind:'elimina', name:'Conferência duplicada substituída por integração', volume:400, before:5, after:0, coverage:70, conversion:50},
    {group:'n2', kind:'elimina', name:'Triagem de encaminhamento indevido', volume:150, before:6, after:0, coverage:75, conversion:50},
    {group:'fale', kind:'elimina', name:'Conversas de status evitadas por comunicação proativa', volume:1000, before:4, after:0, coverage:80, conversion:50}
  ],
  technology: [
    {kind:'saving',name:'Infraestrutura e contratos do legado retirados',amount:40000,start:7},
    {kind:'saving',name:'Desenvolvimento e sustentação com gasto efetivamente evitado',amount:20000,start:7},
    {kind:'cost',name:'Licenças incrementais Salesforce e canais',amount:25000,start:1},
    {kind:'cost',name:'Integrações, suporte e sustentação incrementais',amount:10000,start:1}
  ],
  others: [
    {name:'Pagamentos incorretos evitados · perda financeira, sem mão de obra',amount:0,conversion:0,start:7},
    {name:'Recuperação incremental em ressarcimento/salvados · líquida de custos',amount:0,conversion:0,start:7},
    {name:'Outros custos externos evitados · sem sobreposição com FTE',amount:0,conversion:0,start:7}
  ]
};

export function calculateBusinessCase(data) {
  const byGroup = new Map(data.groups.map(g=>[g.id,{...g,maintained:0,eliminated:0,hoursSaved:0,fte:0,potential:0,realizable:0,baselineHours:0,afterHours:0}]));
  const rows = data.operations.map(row=>{
    const g=byGroup.get(row.group);
    if(!g) throw new Error('Grupo inexistente');
    const applicable=row.volume*row.coverage/100;
    // Cobertura menor que 100% mantém o esforço original na parcela não coberta.
    const baseline=row.volume*row.before/60;
    const saved=applicable*(row.before-row.after)/60;
    const fte=saved/g.hours;
    const potential=fte*g.cost;
    // Degradação de esforço aumenta a carga/custo integralmente; conversão não a esconde.
    const realizable=potential>=0?potential*row.conversion/100:potential;
    g.baselineHours+=baseline;g.afterHours+=baseline-saved;g.hoursSaved+=saved;
    g[row.kind==='elimina'?'eliminated':'maintained']+=saved;
    g.fte+=fte;g.potential+=potential;g.realizable+=realizable;
    return {...row,saved,fte,potential,realizable};
  });
  const groups=[...byGroup.values()].map(g=>({...g,baselineFte:g.baselineHours/g.hours,afterFte:g.afterHours/g.hours}));
  const operation=groups.reduce((sum,g)=>sum+g.realizable,0);
  const investment=data.settings.capex+data.settings.upfront;
  const rate=Math.pow(1+data.settings.discount/100,1/12)-1;
  let cumulative=-investment, npv=-investment;
  const months=[];
  for(let month=1;month<=60;month++) {
    const elapsed=month-data.settings.opStart+1;
    const ramp=elapsed<=0?0:data.settings.ramp===0?1:Math.min(1,elapsed/data.settings.ramp);
    const op=operation*ramp;
    const techSaving=data.technology.filter(r=>r.kind==='saving'&&month>=r.start).reduce((s,r)=>s+r.amount,0);
    const techCost=data.technology.filter(r=>r.kind==='cost'&&month>=r.start).reduce((s,r)=>s+r.amount,0);
    const other=data.others.filter(r=>month>=r.start).reduce((s,r)=>s+r.amount*r.conversion/100,0);
    const gross=op+techSaving+other, net=gross-techCost;
    cumulative+=net;npv+=net/Math.pow(1+rate,month);
    months.push({month,ramp,op,techSaving,techCost,other,gross,net,cumulative});
  }
  const years=Array.from({length:5},(_,i)=>{
    const slice=months.slice(i*12,i*12+12);
    return {year:i+1,gross:slice.reduce((s,m)=>s+m.gross,0),cost:slice.reduce((s,m)=>s+m.techCost,0),net:slice.reduce((s,m)=>s+m.net,0),cumulative:slice.at(-1).cumulative};
  });
  const net60=months.reduce((s,m)=>s+m.net,0), benefit60=months.reduce((s,m)=>s+m.gross,0);
  // Recuperação durável no horizonte: não marca payback se o saldo volta a ficar negativo.
  const recovery=investment>0?months.findIndex((m,i)=>m.cumulative>=0&&months.slice(i).every(n=>n.cumulative>=0)):-1;
  return {rows,groups,months,years,investment,operation,net60,benefit60,npv,
    netReturn:net60-investment,roi:investment>0?(net60-investment)/investment:null,
    payback:recovery>=0?recovery+1:null,
    totalHours:groups.reduce((s,g)=>s+g.hoursSaved,0),totalFte:groups.reduce((s,g)=>s+g.fte,0),
    potential:groups.reduce((s,g)=>s+g.potential,0)};
}

if(typeof document!=='undefined') {
  let data=structuredClone(example);
  const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
  const number=v=>v.toLocaleString('pt-BR',{maximumFractionDigits:2});
  const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const field=(section,index,key,value,min=0,max=1e9,step='any')=>`<input aria-label="${escape(key)} · ${escape(section==='settings'?'Premissas':section==='groups'?data.groups[index].name:data[section][index].name)}" data-section="${section}" data-index="${index}" data-key="${key}" type="number" min="${min}" max="${max}" step="${step}" value="${value}">`;
  function inputs() {
    document.getElementById('group-inputs').innerHTML=data.groups.map((g,i)=>`<tr><th scope="row">${escape(g.name)}</th><td>${field('groups',i,'hours',g.hours,1,744)}</td><td>${field('groups',i,'cost',g.cost)}</td></tr>`).join('');
    document.getElementById('operation-inputs').innerHTML=data.operations.map((r,i)=>`<tr><th scope="row">${escape(r.name)}<small>${escape(data.groups.find(g=>g.id===r.group).name)} · ${r.kind==='elimina'?'atividade eliminada/substituída':'atividade que permanece'}</small></th><td>${field('operations',i,'volume',r.volume)}</td><td>${field('operations',i,'before',r.before)}</td><td>${field('operations',i,'after',r.after)}</td><td>${field('operations',i,'coverage',r.coverage,0,100)}</td><td>${field('operations',i,'conversion',r.conversion,0,100)}</td></tr>`).join('');
    document.getElementById('tech-inputs').innerHTML=data.technology.map((r,i)=>`<tr><th scope="row">${escape(r.name)}<small>${r.kind==='saving'?'Gasto retirado/evitado':'Novo custo recorrente incremental'}</small></th><td>${field('technology',i,'amount',r.amount)}</td><td>${field('technology',i,'start',r.start,1,61,1)}</td></tr>`).join('');
    document.getElementById('other-inputs').innerHTML=data.others.map((r,i)=>`<tr><th scope="row">${escape(r.name)}</th><td>${field('others',i,'amount',r.amount)}</td><td>${field('others',i,'conversion',r.conversion,0,100)}</td><td>${field('others',i,'start',r.start,1,61,1)}</td></tr>`).join('');
    const names={capex:'Capex total do GSA (R$)',upfront:'Desembolso inicial adicional fora do Capex (R$)',discount:'Taxa de desconto anual (%)',opStart:'Mês de início do benefício operacional',ramp:'Meses de entrada gradual (0 = imediata)',month:'Mês exibido no resumo (1–60)'};
    document.getElementById('financial-inputs').innerHTML=Object.entries(data.settings).map(([key,value])=>`<label>${names[key]}${field('settings',0,key,value,key==='opStart'||key==='month'?1:0,key==='discount'?100:key==='opStart'?61:key==='month'||key==='ramp'?60:1e10,['opStart','ramp','month'].includes(key)?1:'any')}</label>`).join('');
  }
  function valid() {
    return [...document.querySelectorAll('#business-case input')].every(el=>el.value.trim()!==''&&el.checkValidity()&&Number.isFinite(Number(el.value)));
  }
  function update() {
    const error=document.getElementById('model-error'),output=document.getElementById('model-output');
    if(!valid()){error.textContent='Corrija os campos vazios ou fora dos limites. Resultados e exportação ficam indisponíveis até a correção.';output.hidden=true;document.getElementById('export-economy').disabled=true;return}
    error.textContent='';output.hidden=false;document.getElementById('export-economy').disabled=false;
    const result=calculateBusinessCase(data), month=result.months[data.settings.month-1];
    const cards=[['Economia líquida · mês '+data.settings.month,money(month.net),'Após custos recorrentes; antes do investimento inicial.'],['Economia líquida · ano 1',money(result.years[0].net),'Soma dos meses 1–12, com entrada gradual.'],['Economia líquida · 5 anos',money(result.net60),'Soma dos 60 meses, antes do investimento inicial.'],['Saldo após investimento · 5 anos',money(result.netReturn),'Economia líquida menos Capex e desembolso adicional.'],['ROI simples · 5 anos',result.roi===null?'Não calculável':number(result.roi*100)+'%','Saldo em 5 anos ÷ investimento inicial.'],['Payback no horizonte',result.payback===null?'Não recuperado / não aplicável':'Mês '+result.payback,'Primeiro mês com recuperação mantida até o mês 60.'],['VPL · 5 anos',money(result.npv),'Fluxos mensais descontados à taxa anual informada.'],['Capacidade liberada em regime',number(result.totalFte)+' FTE',number(result.totalHours)+' horas/mês; não representa redução automática de quadro.']];
    document.getElementById('economy-cards').innerHTML=cards.map(([title,value,note])=>`<div class="economy-card"><small>${title}</small><strong>${value}</strong><p>${note}</p></div>`).join('');
    document.getElementById('group-output').innerHTML=result.groups.map(g=>`<tr><th scope="row">${escape(g.name)}</th><td>${number(g.baselineFte)}</td><td>${number(g.afterFte)}</td><td>${number(g.maintained)}</td><td>${number(g.eliminated)}</td><td>${number(g.fte)}</td><td>${money(g.potential)}</td><td>${money(g.realizable)}</td></tr>`).join('')+`<tr><th>Total · atividades modeladas</th><td>${number(result.groups.reduce((s,g)=>s+g.baselineFte,0))}</td><td>${number(result.groups.reduce((s,g)=>s+g.afterFte,0))}</td><td>${number(result.groups.reduce((s,g)=>s+g.maintained,0))}</td><td>${number(result.groups.reduce((s,g)=>s+g.eliminated,0))}</td><td>${number(result.totalFte)}</td><td>${money(result.potential)}</td><td>${money(result.operation)}</td></tr>`;
    document.getElementById('year-output').innerHTML=result.years.map(y=>`<tr><th scope="row">Ano ${y.year}</th><td>${money(y.gross)}</td><td>${money(y.cost)}</td><td>${money(y.net)}</td><td>${money(y.cumulative)}</td></tr>`).join('');
    document.getElementById('bridge-output').innerHTML=[['Operação · parcela realizável',month.op],['Tecnologia · custos retirados/evitados',month.techSaving],['Outras economias monetizadas',month.other],['Novos custos recorrentes',-month.techCost],['Economia líquida do mês',month.net]].map(([name,value])=>`<tr><th scope="row">${name}</th><td>${money(value)}</td></tr>`).join('');
    const stable=result.months[59];
    document.getElementById('regime-note').textContent=`Investimento inicial: ${money(result.investment)}. Mês 60: ${money(stable.net)} líquidos; anualização desse mês: ${money(stable.net*12)} (não é a economia do ano 1). Valor potencial de capacidade: ${money(result.potential)}/mês; parcela operacional realizável em regime: ${money(result.operation)}/mês.`;
    const warnings=[];
    if(data.operations.some(r=>r.after>r.before))warnings.push('Há atividades com aumento de esforço; o modelo inclui a perda integralmente.');
    if(data.operations.some(r=>r.kind==='elimina'&&r.after>0))warnings.push('Há atividades eliminadas com esforço residual; ele foi descontado do ganho.');
    if(result.operation<result.potential)warnings.push('A parcela de capacidade sem conversão financeira fica fora do ROI.');
    warnings.push('Volumes, tempos, custos, conversões e Capex iniciais são ilustrativos. Substitua por evidências antes de usar o resultado como business case aprovado.');
    document.getElementById('model-warning').textContent=warnings.join(' ');
  }
  document.getElementById('business-case').addEventListener('input',e=>{
    const el=e.target;if(!el.dataset.section)return;
    const section=el.dataset.section,key=el.dataset.key;
    if(section==='settings')data.settings[key]=Number(el.value);else data[section][Number(el.dataset.index)][key]=Number(el.value);
    update();
  });
  document.getElementById('reset-economy').onclick=()=>{data=structuredClone(example);inputs();update()};
  document.getElementById('export-economy').onclick=()=>{
    if(!valid())return;const result=calculateBusinessCase(data);
    const csv=[['GSA · cenário editável, não resultado realizado'],['Premissas financeiras'],...Object.entries(data.settings),['Grupos','Horas produtivas/FTE','Custo mensal/FTE'],...data.groups.map(g=>[g.name,g.hours,g.cost]),['Atividades','Grupo','Tipo','Volume','Antes min','Depois min','Cobertura %','Conversão %'],...data.operations.map(r=>[r.name,r.group,r.kind,r.volume,r.before,r.after,r.coverage,r.conversion]),['Tecnologia','Tipo','R$/mês','Mês de início'],...data.technology.map(r=>[r.name,r.kind,r.amount,r.start]),['Outras economias','R$/mês','Conversão %','Início'],...data.others.map(r=>[r.name,r.amount,r.conversion,r.start]),['Mês','Rampa','Operação','Tecnologia evitada','Novos custos','Outras','Economia bruta','Economia líquida','Acumulado após investimento'],...result.months.map(m=>[m.month,m.ramp,m.op,m.techSaving,m.techCost,m.other,m.gross,m.net,m.cumulative]),['ROI 60 meses',result.roi??'Não calculável'],['VPL',result.npv],['Payback',result.payback??'Não recuperado / não aplicável']].map(row=>row.map(v=>'"'+String(typeof v==='number'?v.toFixed(6).replace('.',','):v).replaceAll('"','""')+'"').join(';')).join('\r\n');
    const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='gsa-cenario-economia.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  inputs();update();
}
