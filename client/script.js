/* utils */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const API_BASE = 'http://localhost:3000/api'; // ajusta si hace falta

document.addEventListener('DOMContentLoaded', ()=> {
  $('#year').textContent = new Date().getFullYear();

  // SPA nav
  $$('.nav .nav-item').forEach(li=>{
    li.addEventListener('click', ()=>{
      $$('.nav .nav-item').forEach(x=>{
                                        x.classList.remove('active');
                                      }
      );
      li.classList.add('active');
      const view = li.dataset.view;
      $('#page-title').textContent = li.textContent.trim();
      $$('.view').forEach(v=>{
        v.classList.remove('active');
        v.classList.add('hidden');
      } );

      $(`#view-${view}`)?.classList.add('active');
       $(`#view-${view}`)?.classList.remove('hidden');

      if(window.innerWidth <= 1100) $('#sidebar').classList.remove('active');
      if(view === 'users') loadUsers();
    });
  });

  // menu & sidebar
  $('#menu-btn').addEventListener('click', ()=> $('#sidebar').classList.toggle('active'));
  $('#collapse-btn').addEventListener('click', ()=> $('#sidebar').classList.toggle('collapsed'));

  // user menu
  $('#user-btn').addEventListener('click', ()=> $('#user-menu').classList.toggle('hidden'));
  $('#btn-logout').addEventListener('click', ()=> openAuth());

  // auth modal toggles
  $('#close-auth').addEventListener('click', ()=> $('#auth').classList.add('hidden'));
  $('#show-register').addEventListener('click', (e)=> { e.preventDefault(); $('#auth-login').classList.add('hidden'); $('#auth-register').classList.remove('hidden'); });
  $('#show-login').addEventListener('click', (e)=> { e.preventDefault(); $('#auth-register').classList.add('hidden'); $('#auth-login').classList.remove('hidden'); });
  $('#show-forgot').addEventListener('click', (e)=> { e.preventDefault(); $('#auth-login').classList.add('hidden'); $('#auth-forgot').classList.remove('hidden');});
  $('#show-login2').addEventListener('click', (e)=> { e.preventDefault(); $('#auth-forgot').classList.add('hidden'); $('#auth-login').classList.remove('hidden');});

  // open auth demo (optional)
  // openAuth();

  // theme / primary color
  $('#primaryColor')?.addEventListener('input', e => document.documentElement.style.setProperty('--primary', e.target.value));
  $('#autoDark')?.addEventListener('change', ()=> autoDarkMode());
  autoDarkMode(); setInterval(autoDarkMode, 1000 * 60 * 5);

  // notifications demo
  let notCount = 3;
  $('#notif-btn').addEventListener('click', ()=>{
    notCount = Math.max(0, notCount - 1);
    $('#notif-badge').textContent = notCount;
    if(notCount === 0) $('#notif-badge').classList.add('hidden');
  });

  // charts and panels
  initCharts();
  initDragPanels();
  initDownloads();

  // users CRUD UI
  $('#btn-new-user').addEventListener('click', ()=> openUserModal());
  $('#modal-user-save').addEventListener('click', saveUserFromModal);
  $('#close-user-modal').addEventListener('click', ()=> $('#modal-user').classList.add('hidden'));
  $('#user-search').addEventListener('input', ()=> filterUsers($('#user-search').value));
  loadUsers(); // initial

  // calendar quick
  initCalendar();
});

/* ============= auto dark ============= */
function autoDarkMode(){
  if($('#autoDark') && $('#autoDark').checked){
    const h = new Date().getHours();
    if(h >= 19 || h <= 6) document.body.classList.add('dark'); else document.body.classList.remove('dark');
  }
}

/* ============= CHARTS ============= */
function initCharts(){
  // chart code (same behavior as earlier but refactored to use API if available)
  const barCanvas = document.getElementById('barChart');
  const lineCanvas = document.getElementById('lineChart');
  const pieCanvas = document.getElementById('pieChart');
  if(!barCanvas || !lineCanvas || !pieCanvas) return;

  const barCtx = barCanvas.getContext('2d');
  const lineCtx = lineCanvas.getContext('2d');
  const pieCtx = pieCanvas.getContext('2d');

  // initial sample data
  let barData = [500,700,400,850,900,1200,950,1300,1100,1400,1200,1500];
  let lineData = [300,400,550,700,850,950,1100,1300,1250,1500,1400,1600];
  let pieData = [45,25,20,10];
  const pieColors = ['#4cd137','#00a8ff','#e1b12c','#e84118'];

  function drawAll(p=1){
    drawBar(barCtx, barCanvas, barData, p);
    drawLine(lineCtx, lineCanvas, lineData, p);
    drawPie(pieCtx, pieCanvas, pieData, pieColors, p);
  }
  let prog = 0;
  function animate(){ prog = Math.min(1, prog + 0.03); drawAll(prog); if(prog < 1) requestAnimationFrame(animate); }
  animate();

  // simulate live updates (or fetch from API)
  setInterval(async ()=>{
    // try fetch from API first
    try {
      const json = await (await fetch(`${API_BASE}/chart-data`)).json();
      if(json && json.bar && json.line && json.pie){
        barData = json.bar; lineData = json.line; pieData = json.pie;
      }
    } catch(e){
      // fallback randomize
      barData = barData.map(v => Math.max(10, Math.round(v * (0.95 + Math.random()*0.1))));
      lineData = lineData.map(v => Math.max(10, Math.round(v * (0.95 + Math.random()*0.1))));
      pieData = pieData.map((v,i) => Math.max(1, Math.round((Math.random()*0.2+0.8)*v)));
      const total = pieData.reduce((a,b)=>a+b,0);
      pieData = pieData.map(v => Math.round((v/total)*100));
    }
    // quick animate redraw
    let p = 0;
    function anim2(){ p = Math.min(1, p + 0.06); drawAll(p); if(p < 1) requestAnimationFrame(anim2); }
    anim2();

    // update small stats
    $('#stat-revenue').textContent = Math.round(lineData.reduce((a,b)=>a+b,0)/lineData.length).toLocaleString();
    $('#stat-orders').textContent = Math.round(barData.reduce((a,b)=>a+b,0)/200).toLocaleString();

  }, 4000);
}

/* draw helpers */
function drawBar(ctx, canvas, data, progress=1){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const padding = 40;
  const chartH = canvas.height - padding*1.6;
  const max = Math.max(...data);
  const barW = 28;
  const gap = (canvas.width - padding*2 - barW*12) / 11;
  ctx.beginPath(); ctx.moveTo(padding,10); ctx.lineTo(padding,chartH+10); ctx.lineTo(canvas.width - padding/2, chartH+10); ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text') || '#222'; ctx.stroke();
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  for(let i=0;i<12;i++){
    const val = (data[i] || 0) * progress;
    const h = (val/max) * chartH;
    const x = padding + i*(barW + gap);
    const y = chartH + 10 - h;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#4cd137';
    ctx.fillRect(x,y,barW,h);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text') || '#222';
    ctx.font = '11px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(months[i], x + barW/2, chartH + 28);
  }
}

function drawLine(ctx, canvas, data, progress=1){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const padding=40; const chartH = canvas.height - padding*1.6;
  const max = Math.max(...data);
  const step = (canvas.width - padding*2) / (data.length -1);
  ctx.beginPath(); ctx.moveTo(padding,10); ctx.lineTo(padding,chartH+10); ctx.lineTo(canvas.width - padding/2, chartH+10);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text') || '#222'; ctx.stroke();
  ctx.beginPath();
  for(let i=0;i<data.length*progress;i++){
    const x = padding + i*step;
    const y = chartH + 10 - ((data[i]||0)/max)*chartH;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.strokeStyle = '#0984e3'; ctx.lineWidth = 2; ctx.stroke();
  for(let i=0;i<data.length*progress;i++){
    const x = padding + i*step;
    const y = chartH + 10 - ((data[i]||0)/max)*chartH;
    ctx.beginPath(); ctx.fillStyle = '#74b9ff'; ctx.arc(x,y,4,0,Math.PI*2); ctx.fill();
  }
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text') || '#222'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  for(let i=0;i<data.length;i++){ const x = padding + i*step; ctx.fillText(months[i], x, chartH + 28); }
}

function drawPie(ctx, canvas, data, colors, progress=1){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const cx = canvas.width/2, cy = canvas.height/2, r = 90;
  const total = data.reduce((a,b)=>a+b,0) || 1;
  let start = -Math.PI/2;
  for(let i=0;i<data.length;i++){
    const slice = (data[i]/total)*2*Math.PI*progress;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,start,start+slice); ctx.closePath();
    ctx.fillStyle = colors[i]; ctx.fill();
    start += slice;
  }
  // legend
  const labels = ["Electrónica","Ropa","Hogar","Juguetes"];
  ctx.font = '12px Poppins'; ctx.textAlign = 'left';
  for(let i=0;i<data.length;i++){
    ctx.fillStyle = colors[i]; ctx.fillRect(cx+120, cy - 60 + i*22, 12,12);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text') || '#222';
    ctx.fillText(`${labels[i]} (${data[i]}%)`, cx+140, cy - 50 + i*22);
  }
}

/* ============= Drag panels ============= */
function initDragPanels(){
  const panelsContainer = document.getElementById('panels');
  if(!panelsContainer) return;
  let dragEl = null;
  panelsContainer.addEventListener('dragstart', e=>{
    dragEl = e.target.closest('.panel');
    if(!dragEl) return;
    dragEl.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  panelsContainer.addEventListener('dragend', e=>{
    if(dragEl) dragEl.classList.remove('dragging');
    dragEl = null;
  });
  panelsContainer.addEventListener('dragover', e=>{
    e.preventDefault();
    const after = getDragAfterElement(panelsContainer, e.clientY);
    const dragging = document.querySelector('.panel.dragging');
    if(!dragging) return;
    if(after == null) panelsContainer.appendChild(dragging); else panelsContainer.insertBefore(dragging, after);
  });

  function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.panel:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height/2;
      if(offset < 0 && offset > closest.offset){
        return {offset: offset, element: child};
      } else return closest;
    }, {offset: Number.NEGATIVE_INFINITY}).element;
  }
}

/* ============= Downloads ============= */
function initDownloads(){
  $$('.download').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.target;
      const canvas = document.getElementById(id);
      if(!canvas) return;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${id}.png`;
      link.click();
    });
  });
}

/* ============= Users CRUD ============= */
let usersCache = [];
async function loadUsers(){
  try {
    const res = await fetch(`${API_BASE}/users`);
    usersCache = await res.json();
  } catch(e){
    // fallback demo data
    usersCache = [
      {id:1,name:'John Doe',email:'john@example.com',role:'admin'},
      {id:2,name:'Jane Smith',email:'jane@example.com',role:'user'}
    ];
  }
  renderUsers(usersCache);
}

function renderUsers(list){
  const tbody = $('#users-body');
  tbody.innerHTML = '';
  list.forEach(u=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.id}</td><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td>
      <td>
        <button class="icon-btn small" data-act="edit" data-id="${u.id}">✎</button>
        <button class="icon-btn small" data-act="del" data-id="${u.id}">🗑</button>
      </td>`;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('button[data-act]').forEach(b=>{
    b.addEventListener('click', async (e)=>{
      const id = +b.dataset.id;
      if(b.dataset.act === 'edit') openUserModal(usersCache.find(x=>x.id===id));
      if(b.dataset.act === 'del') {
        if(!confirm('Eliminar usuario?')) return;
        try {
          await fetch(`${API_BASE}/users/${id}`, {method:'DELETE'});
          await loadUsers();
        } catch(e){
          // local fallback
          usersCache = usersCache.filter(x=>x.id!==id);
          renderUsers(usersCache);
        }
      }
    });
  });
}

function filterUsers(q){
  q = q.toLowerCase().trim();
  renderUsers(usersCache.filter(u=>u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
}

function openUserModal(user = null){
  $('#modal-user').classList.remove('hidden');
  $('#modal-user-title').textContent = user ? 'Editar usuario' : 'Nuevo usuario';
  $('#modal-user-name').value = user ? user.name : '';
  $('#modal-user-email').value = user ? user.email : '';
  $('#modal-user-role').value = user ? user.role : 'user';
  $('#modal-user-save').dataset.id = user ? user.id : '';
}

async function saveUserFromModal(){
  const id = $('#modal-user-save').dataset.id;
  const name = $('#modal-user-name').value.trim();
  const email = $('#modal-user-email').value.trim();
  const role = $('#modal-user-role').value;
  if(!name || !email) return alert('Completa nombre y email');

  if(id){
    // update
    try {
      await fetch(`${API_BASE}/users/${id}`, {method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,role})});
      await loadUsers();
    } catch(e){
      // local fallback
      const u = usersCache.find(x=>x.id==id);
      u.name = name; u.email = email; u.role = role;
      renderUsers(usersCache);
    }
  } else {
    // create
    try {
      await fetch(`${API_BASE}/users`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,role})});
      await loadUsers();
    } catch(e){
      // local fallback
      const newid = usersCache.length ? Math.max(...usersCache.map(x=>x.id))+1 : 1;
      usersCache.push({id:newid,name,email,role});
      renderUsers(usersCache);
    }
  }
  $('#modal-user').classList.add('hidden');
}

/* ============= simple calendar ============= */
function initCalendar(){
  const cal = $('#calendar');
  if(!cal) return;
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  renderCalendar(cal, month, year);
}

function renderCalendar(root, month, year){
  root.innerHTML = '';
  const date = new Date(year, month, 1);
  const startDay = date.getDay();
  const daysInMonth = new Date(year, month+1,0).getDate();
  const tbl = document.createElement('div');
  tbl.style.display = 'grid'; tbl.style.gridTemplateColumns = 'repeat(7,1fr)'; tbl.style.gap = '6px';
  for(let i=0;i<startDay;i++){ const d = document.createElement('div'); d.style.height='60px'; tbl.appendChild(d); }
  for(let d=1; d<=daysInMonth; d++){
    const cell = document.createElement('div'); cell.style.height='60px'; cell.style.background='var(--card)'; cell.style.borderRadius='8px'; cell.style.padding='6px';
    cell.innerHTML = `<strong>${d}</strong><div class="mini-events"></div>`;
    tbl.appendChild(cell);
  }
  root.appendChild(tbl);
}

/* ============= Auth demo open ============= */
function openAuth(){ $('#auth').classList.remove('hidden'); }
