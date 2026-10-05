
(function(){
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', ()=>{
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('open');
    });
  }

  const preloader = document.getElementById('preloader');
  if(preloader){
    window.addEventListener('load', ()=> setTimeout(()=> preloader.classList.add('hide'), 1700));
  }

  const enters = document.querySelectorAll('.enter');
  if('IntersectionObserver' in window && enters.length){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    enters.forEach(el => io.observe(el));
  } else {
    enters.forEach(el => el.classList.add('visible'));
  }

  // Assistant
  const launch = document.getElementById('assistantLaunch');
  const assistant = document.getElementById('assistant');
  const closeBtn = document.getElementById('assistantClose');
  const chatLog = document.getElementById('chatLog');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const inputWrap = document.getElementById('chatInputWrap');

  const flow = [
    {key:'name', q:'Olá! Antes de te encaminhar, como você prefere ser chamado?'},
    {key:'whats', q:'Perfeito. Qual é o seu WhatsApp com DDD?'},
    {key:'email', q:'Qual é o melhor e-mail profissional para retorno?'},
    {key:'challenge', q:'Qual é o principal desafio ou objetivo da sua empresa hoje em telecom?'},
    {key:'time', q:'Você prefere receber o contato na manhã ou na tarde?'}
  ];
  const answers = {};
  let step = 0;
  function addMsg(text, who='bot'){
    if(!chatLog) return;
    const el = document.createElement('div');
    el.className = 'msg ' + who;
    el.textContent = text;
    chatLog.appendChild(el);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  function askStep(){ if(step < flow.length) addMsg(flow[step].q,'bot'); }
  function resetChat(){
    if(!chatLog) return; chatLog.innerHTML=''; step = 0; Object.keys(answers).forEach(k=> delete answers[k]); askStep();
  }
  function finishChat(){
    const n = answers.name || 'cliente';
    const time = answers.time || 'manhã';
    addMsg(`Muito obrigado pelas informações, ${n}! O nosso pré-atendimento foi concluído com sucesso. O nosso Consultor Principal vai analisar o seu perfil e entrará em contacto direto consigo via WhatsApp no período da ${time} para agendar o seu diagnóstico gratuito. Tenha um excelente dia!`, 'bot');
    if(inputWrap) inputWrap.innerHTML = '<a class="btn-blob primary" id="sendLeadWhatsapp" href="#"><span>Enviar relatório pelo WhatsApp</span></a>';
    const report = [
      'Pré-atendimento Atlys',
      `Nome: ${answers.name||''}`,
      `WhatsApp: ${answers.whats||''}`,
      `E-mail: ${answers.email||''}`,
      `Desafio principal: ${answers.challenge||''}`,
      `Melhor horário: ${answers.time||''}`
    ].join('\n');
    const url = 'https://wa.me/5511941451956?text=' + encodeURIComponent(report);
    setTimeout(()=>{
      const btn = document.getElementById('sendLeadWhatsapp');
      if(btn){ btn.href = url; btn.target = '_blank'; btn.rel='noopener'; }
    },0);
  }
  function submitChat(){
    if(!chatInput || !chatInput.value.trim()) return;
    const val = chatInput.value.trim();
    addMsg(val,'user');
    answers[flow[step].key] = val;
    chatInput.value='';
    step++;
    if(step < flow.length) setTimeout(askStep, 360);
    else setTimeout(finishChat, 420);
  }
  if(launch && assistant){
    launch.addEventListener('click', ()=>{assistant.classList.toggle('open'); if(assistant.classList.contains('open') && !chatLog.childElementCount) askStep();});
  }
  if(closeBtn && assistant){ closeBtn.addEventListener('click', ()=> assistant.classList.remove('open')); }
  if(chatSend) chatSend.addEventListener('click', submitChat);
  if(chatInput) chatInput.addEventListener('keydown', e => { if(e.key === 'Enter') submitChat(); });

  function submitToWhatsapp(form, number){
    const fd = new FormData(form); const parts = [];
    for(const [key,value] of fd.entries()){ if(String(value).trim()) parts.push(`${key}: ${String(value).trim()}`); }
    const text = form.dataset.prefix ? form.dataset.prefix + '\n\n' + parts.join('\n') : parts.join('\n');
    window.open('https://wa.me/' + number + '?text=' + encodeURIComponent(text), '_blank');
  }
  document.querySelectorAll('[data-wa-form]').forEach(form => {
    form.addEventListener('submit', e => { e.preventDefault(); submitToWhatsapp(form, form.dataset.wa || '5511941451956'); });
  });

  // device filtering
  if(window.ATLYS_DEVICES && document.getElementById('deviceGrid')){
    const grid = document.getElementById('deviceGrid');
    const counter = document.getElementById('deviceCounter');
    const brandButtons = [...document.querySelectorAll('[data-brand-filter]')];
    const searchInput = document.getElementById('deviceSearch');
    const buildCard = item => `
      <article class="device-card enter" data-brand="${item.brand}" data-search="${(item.model + ' ' + item.brand + ' ' + item.storage).toLowerCase()}">
        <div class="device-visual">
          <img class="base" src="assets/img/devices/${item.slug}-1.svg" alt="Apresentação visual do ${item.model} ${item.storage}">
          <img class="alt" src="assets/img/devices/${item.slug}-2.svg" alt="Segunda apresentação visual do ${item.model} ${item.storage}">
        </div>
        <div class="device-body">
          <div class="device-meta">
            <div>
              <div class="device-brand">${item.brand}</div>
              <h3 style="margin-top:12px">${item.model}</h3>
            </div>
            <div class="device-storage">${item.storage}</div>
          </div>
          <p>${item.desc}</p>
          <div class="feature-badges">${item.features.map(f=>`<span>${f}</span>`).join('')}</div>
          <div class="device-actions">
            <a class="btn-blob primary" href="#formAparelhos"><span>Consultar condições</span></a>
            <a class="btn-blob secondary" href="https://wa.me/5511941451956?text=${encodeURIComponent('Olá! Tenho interesse no aparelho ' + item.model + ' ' + item.storage)}" target="_blank" rel="noopener"><span>Falar no WhatsApp</span></a>
          </div>
        </div>
      </article>`;
    grid.innerHTML = window.ATLYS_DEVICES.map(buildCard).join('');
    const cards = ()=> [...grid.querySelectorAll('.device-card')];
    function filter(){
      const brand = document.querySelector('[data-brand-filter].active')?.dataset.brandFilter || 'all';
      const term = (searchInput?.value || '').toLowerCase().trim();
      let visible = 0;
      cards().forEach(card => {
        const okBrand = brand === 'all' || card.dataset.brand === brand;
        const okSearch = !term || card.dataset.search.includes(term);
        const show = okBrand && okSearch;
        card.style.display = show ? '' : 'none';
        if(show) visible++;
      });
      if(counter) counter.textContent = `${visible} aparelho(s) exibido(s)`;
    }
    brandButtons.forEach(btn => btn.addEventListener('click', ()=>{
      brandButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      filter();
    }));
    if(searchInput) searchInput.addEventListener('input', filter);
    filter();
    document.querySelectorAll('.device-card.enter').forEach(el => el.classList.add('visible'));
  }
})();
