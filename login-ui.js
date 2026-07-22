/* ============================================================
   login-ui.js — UI event handlers for login, modals, admin panel
   Loaded AFTER auth.js, BEFORE app.js
   ============================================================ */
(function(){
'use strict';

/* ── Login form tab switching ── */
function showTab(tab){
  const forms = { login:'loginForm', register:'registerForm', reset:'resetForm', 'reset-confirm':'resetConfirmForm' };
  Object.values(forms).forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });
  const target = forms[tab];
  if(target) document.getElementById(target).style.display = '';
  // Update tab buttons
  const tabs = document.querySelectorAll('.login-tabs button');
  tabs.forEach(b => b.classList.remove('active'));
  if(tab === 'login') tabs[0]?.classList.add('active');
  if(tab === 'register') tabs[1]?.classList.add('active');
  // Hide messages
  hideMsg();
}

function showError(msg){
  const el = document.getElementById('loginError');
  if(el){ el.textContent = msg; el.style.display = 'block'; }
  const suc = document.getElementById('loginSuccess');
  if(suc) suc.style.display = 'none';
}
function showSuccess(msg){
  const el = document.getElementById('loginSuccess');
  if(el){ el.textContent = msg; el.style.display = 'block'; }
  const err = document.getElementById('loginError');
  if(err) err.style.display = 'none';
}
function hideMsg(){
  const e = document.getElementById('loginError'); if(e) e.style.display = 'none';
  const s = document.getElementById('loginSuccess'); if(s) s.style.display = 'none';
}

/* ── Login handler ── */
async function handleLogin(e){
  e.preventDefault();
  hideMsg();
  const btn = document.getElementById('loginBtn');
  const email = document.getElementById('loginEmail').value.trim();
  const pw = document.getElementById('loginPassword').value;
  if(!email || !pw) return;
  btn.disabled = true; btn.textContent = 'Bezig...';
  const { error } = await gsAuth.signIn(email, pw);
  btn.disabled = false; btn.textContent = 'Inloggen';
  if(error) showError(_translateError(error.message));
}

/* ── Register handler ── */
async function handleRegister(e){
  e.preventDefault();
  hideMsg();
  const btn = document.getElementById('regBtn');
  const name = document.getElementById('regName').value.trim();
  const company = document.getElementById('regCompany').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pw = document.getElementById('regPassword').value;
  const pw2 = (document.getElementById('regPassword2') || {}).value;
  if(!name || !company || !email || !pw) return;
  if(pw !== pw2) return showError('De wachtwoorden komen niet overeen.');
  btn.disabled = true; btn.textContent = 'Bezig...';
  const result = await gsAuth.signUp(email, pw, name, company);
  btn.disabled = false; btn.textContent = 'Account aanmaken';
  if(result.error) return showError(_translateError(result.error.message));
  if(result.needsConfirmation){
    showSuccess('Check je e-mail voor een bevestigingslink.');
  } else if(result.needsApproval){
    showSuccess('Je account is aangemaakt en wacht op goedkeuring door een beheerder. Je ontvangt bericht zodra het is goedgekeurd.');
  }
}

/* ── Reset password handler ── */
async function handleReset(e){
  e.preventDefault();
  hideMsg();
  const email = document.getElementById('resetEmail').value.trim();
  if(!email) return;
  const { error } = await gsAuth.resetPassword(email);
  if(error) return showError(_translateError(error.message));
  showSuccess('Als dit e-mailadres bekend is, ontvang je een herstelmail.');
}

/* ── Reset password confirm ── */
async function handleResetConfirm(e){
  e.preventDefault();
  hideMsg();
  const pw = document.getElementById('newPassword').value;
  const pw2 = (document.getElementById('newPassword2') || {}).value;
  if(!pw || pw.length < 6) return showError('Wachtwoord moet minimaal 6 tekens zijn.');
  if(pw !== pw2) return showError('De wachtwoorden komen niet overeen.');
  const client = gsAuth.supabase;
  if(!client) return;
  const { error } = await client.auth.updateUser({ password: pw });
  if(error) return showError(_translateError(error.message));
  showSuccess('Wachtwoord gewijzigd. Je wordt ingelogd...');
  setTimeout(() => location.reload(), 1500);
}

/* ── Translate common Supabase errors ── */
function _translateError(msg){
  if(!msg) return 'Onbekende fout';
  const m = msg.toLowerCase();
  if(m.includes('invalid login')) return 'Onjuist e-mailadres of wachtwoord.';
  if(m.includes('email not confirmed')) return 'Bevestig eerst je e-mailadres via de link in je inbox.';
  if(m.includes('user already registered')) return 'Dit e-mailadres is al geregistreerd. Probeer in te loggen.';
  if(m.includes('password') && m.includes('6')) return 'Wachtwoord moet minimaal 6 tekens zijn.';
  if(m.includes('rate limit')) return 'Te veel pogingen. Wacht even en probeer opnieuw.';
  if(m.includes('network')) return 'Geen verbinding. Controleer je internet.';
  return msg;
}

/* ── User menu ── */
function toggleUserMenu(){
  const dd = document.getElementById('userDropdown');
  if(!dd) return;
  dd.classList.toggle('open');
  if(dd.classList.contains('open')){
    // Close on outside click
    setTimeout(() => {
      const handler = (e) => {
        if(!dd.contains(e.target) && e.target.id !== 'userAvatarBtn' && !e.target.closest('#userAvatarBtn')){
          dd.classList.remove('open');
          document.removeEventListener('click', handler);
        }
      };
      document.addEventListener('click', handler);
    }, 10);
  }
}

async function logout(){
  document.getElementById('userDropdown')?.classList.remove('open');
  await gsAuth.signOut();
}

/* ── Modal helpers ── */
function openModal(id){
  const el = document.getElementById(id);
  if(el) el.classList.add('open');
  document.getElementById('userDropdown')?.classList.remove('open');
}
function closeModal(id){
  const el = document.getElementById(id);
  if(el) el.classList.remove('open');
}

/* ── Projects modal ── */
async function openProjects(){
  openModal('projectsModal');
  const grid = document.getElementById('projectsGrid');
  const empty = document.getElementById('projectsEmpty');
  if(!grid) return;
  grid.innerHTML = '<p style="color:var(--muted);text-align:center;grid-column:1/-1">Laden...</p>';
  const { data } = await gsAuth.listProjects();
  if(!data || data.length === 0){
    grid.innerHTML = '';
    if(empty) empty.style.display = '';
    return;
  }
  if(empty) empty.style.display = 'none';
  grid.innerHTML = data.map(p => {
    const date = new Date(p.updated_at).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric' });
    return `<div class="project-card" onclick="gsLoginUI.loadProject('${p.id}')">
      <div class="pc-thumb">${p.thumbnail_path ? `<img src="${p.thumbnail_path}" alt="">` : 'Geen preview'}</div>
      <div class="pc-info">
        <div class="pc-name">${_esc(p.name)}</div>
        <div class="pc-meta">${p.logo_count || 0} logo's · ${p.sheet_format} · ${date}</div>
      </div>
      <div class="pc-actions">
        <button onclick="event.stopPropagation();gsLoginUI.deleteProject('${p.id}','${_esc(p.name)}')" class="danger">Verwijderen</button>
      </div>
    </div>`;
  }).join('');
}

async function loadProject(id){
  const { data, error } = await gsAuth.loadProject(id);
  if(error || !data){ alert('Kon project niet laden: ' + (error?.message || 'onbekend')); return; }
  closeModal('projectsModal');
  // Tell app.js to load the canvas
  if(window.gsbLoadProject) window.gsbLoadProject(data);
}

/* ── Save dialog flow ── */
function openSaveDialog(){
  if(!window.gsbGetProjectData){ alert('Builder niet geladen'); return; }
  const nameInput = document.getElementById('saveProjectName');
  // Pre-fill with current project name
  const current = window.gsbGetProjectData();
  if(nameInput){
    nameInput.value = current.name || 'Naamloos project';
  }
  openModal('saveNameModal');
  setTimeout(() => { if(nameInput){ nameInput.focus(); nameInput.select(); } }, 80);
}

function closeSaveDialog(){
  closeModal('saveNameModal');
}

async function confirmSave(){
  const nameInput = document.getElementById('saveProjectName');
  const name = (nameInput?.value || '').trim() || 'Naamloos project';
  closeSaveDialog();

  const projectData = window.gsbGetProjectData();
  projectData.name = name;

  const { data, error } = await gsAuth.saveProject(projectData);
  if(error){ alert('Opslaan mislukt: ' + error.message); return; }
  if(data?.id && window.gsbSetProjectId) window.gsbSetProjectId(data.id);

  // Pulse the user avatar so user knows where to find saved projects
  const avatar = document.getElementById('userAvatarBtn');
  if(avatar){
    avatar.classList.remove('save-pulse');
    void avatar.offsetWidth; // force reflow for re-trigger
    avatar.classList.add('save-pulse');
    avatar.addEventListener('animationend', () => avatar.classList.remove('save-pulse'), { once: true });
  }

  if(window.toast) window.toast(t('toastProjectSaved'), 'success');
}

// Backward-compatible alias
async function saveCurrentProject(){ openSaveDialog(); }

async function deleteProject(id, name){
  if(!confirm(`"${name}" verwijderen? Dit kan niet ongedaan worden.`)) return;
  const { error } = await gsAuth.deleteProject(id);
  if(error){ alert('Verwijderen mislukt: ' + error.message); return; }
  openProjects(); // Refresh list
}

/* ── Profile modal ── */
function openProfile(){
  openModal('profileModal');
  const p = gsAuth.profile;
  if(!p) return;
  document.getElementById('profName').value = p.display_name || '';
  document.getElementById('profCompany').value = p.company_name || '';
  const profTh = document.getElementById('profTheme');
  if(profTh) profTh.value = p.theme || 'light';
  const isStaff = p.role === 'admin' || p.role === 'printer';
  const plWrap = document.getElementById('profProofLogoWrap');
  if(plWrap) plWrap.style.display = isStaff ? '' : 'none';
  const plPrev = document.getElementById('profProofLogoPreview');
  if(plPrev){ if(p.proof_logo){ plPrev.src = p.proof_logo; plPrev.style.display = ''; } else plPrev.style.display = 'none'; }
  document.getElementById('profFormat').value = p.preferred_format || 'dtf55';
  document.getElementById('profUnit').value = p.preferred_unit || 'cm';
  document.getElementById('profLang').value = p.preferred_lang || 'nl';
}

async function handleProfileSave(e){
  e.preventDefault();
  const updates = {
    display_name: document.getElementById('profName').value.trim(),
    company_name: document.getElementById('profCompany').value.trim(),
    theme: (document.getElementById('profTheme') || {}).value || 'light',
    preferred_format: document.getElementById('profFormat').value,
    preferred_unit: document.getElementById('profUnit').value,
    preferred_lang: document.getElementById('profLang').value,
  };
  const { error } = await gsAuth.updateProfile(updates);
  if(error){ alert('Opslaan mislukt: ' + error.message); return; }
  // Wachtwoord wijzigen (optioneel veld)
  const pw1 = (document.getElementById('profPw1') || {}).value || '';
  const pw2 = (document.getElementById('profPw2') || {}).value || '';
  if(pw1 || pw2){
    if(pw1.length < 6){ if(window.toast) toast('Wachtwoord moet minimaal 6 tekens zijn', 'error', 4000); return; }
    if(pw1 !== pw2){ if(window.toast) toast(t('toastPwMismatch'), 'error', 4000); return; }
    const { error: pwErr } = await gsAuth.supabase.auth.updateUser({ password: pw1 });
    if(pwErr){ if(window.toast) toast(t('toastPwChangeFailed', pwErr.message || '?'), 'error', 5000); return; }
    if(window.toast) toast('Wachtwoord gewijzigd', 'success', 2500);
    document.getElementById('profPw1').value = '';
    document.getElementById('profPw2').value = '';
  }
  if(window.gsbApplyTheme) gsbApplyTheme(updates.theme);
  closeModal('profileModal');
  // Update user menu display
  const name = updates.display_name || gsAuth.user?.email?.split('@')[0] || '';
  const el = document.getElementById('userInitial');
  if(el) el.textContent = name ? name.charAt(0).toUpperCase() : '?';
  const nameEl = document.getElementById('userMenuName');
  if(nameEl) nameEl.textContent = name;
  if(window.toast) window.toast(t('toastProfileSaved'), 'success');
}

/* ── Admin panel ── */
function openAdmin(){
  if(!gsAuth.isAdmin) return;
  openModal('adminModal');
  adminTab('users');
  // Pre-load approval count for badge
  _updateApprovalBadge();
}

async function _updateApprovalBadge(){
  try{
    const { data } = await gsAuth.listUsers();
    const pending = (data || []).filter(u => u.approved === false && !u.blocked);
    const badge = document.getElementById('approvalBadge');
    if(badge){
      if(pending.length > 0){ badge.textContent = pending.length; badge.style.display = ''; }
      else { badge.style.display = 'none'; }
    }
  }catch(_){}
}

function adminTab(tab){
  const navItems = document.querySelectorAll('.admin-nav-item');
  navItems.forEach(b => b.classList.remove('active'));
  const contents = document.querySelectorAll('.admin-tab-content');
  contents.forEach(c => c.classList.remove('active'));
  const tabMap = { users:0, approval:1, settings:2, stats:3 };
  const idx = tabMap[tab] ?? 0;
  navItems[idx]?.classList.add('active');
  document.getElementById('adminTab' + ['Users','Approval','Settings','Stats'][idx])?.classList.add('active');
  if(tab === 'users') _loadAdminUsers();
  if(tab === 'approval') _loadAdminApprovals();
  if(tab === 'settings') _loadAdminSettings();
  if(tab === 'stats') _loadAdminStats();
}

async function _loadAdminUsers(){
  const container = document.getElementById('adminUsersTable');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';
  const { data } = await gsAuth.listUsers();

  // Build "create account" form + user table
  let html = `<div class="admin-create-form" id="adminCreateForm">
    <h4 style="margin:0 0 10px;font-size:.82rem;text-transform:uppercase;letter-spacing:.5px;color:var(--muted)">Account aanmaken</h4>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
      <div style="flex:1;min-width:140px"><label class="admin-lbl">Naam</label><input type="text" id="adminNewName" class="admin-inp" placeholder="Volledige naam"></div>
      <div style="flex:1;min-width:140px"><label class="admin-lbl">Bedrijf</label><input type="text" id="adminNewCompany" class="admin-inp" placeholder="Bedrijfsnaam"></div>
      <div style="flex:1.5;min-width:180px"><label class="admin-lbl">E-mail</label><input type="email" id="adminNewEmail" class="admin-inp" placeholder="naam@bedrijf.nl"></div>
      <div style="flex:0 0 auto"><label class="admin-lbl">Rol</label><select id="adminNewRole" class="admin-inp"><option value="user">Gebruiker</option><option value="printer">Printer</option><option value="admin">Admin</option></select></div>
      <button class="btn btn-primary btn-sm" style="height:34px;white-space:nowrap" onclick="gsLoginUI.adminCreateUser()">+ Aanmaken & mail versturen</button>
    </div>
    <p style="font-size:.72rem;color:var(--muted);margin:6px 0 0">De gebruiker ontvangt een e-mail om een eigen wachtwoord in te stellen.</p>
    <p id="adminCreateMsg" style="font-size:.78rem;margin:4px 0 0;min-height:16px"></p>
  </div>
  <div style="height:1px;background:var(--border);margin:14px 0"></div>`;

  if(!data || data.length === 0){ html += '<p>Geen gebruikers gevonden.</p>'; }
  else {
    html += `<table class="admin-table">
    <thead><tr><th>Naam</th><th>Bedrijf</th><th>E-mail</th><th>Rol</th><th>Status</th><th>Aangemeld</th><th>Actie</th></tr></thead>
    <tbody>${data.map(u => {
      const date = new Date(u.created_at).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric' });
      const badge = u.blocked ? 'badge-blocked' : u.approved === false ? 'badge-pending' : u.role === 'admin' ? 'badge-admin' : u.role === 'printer' ? 'badge-printer' : 'badge-user';
      const badgeText = u.blocked ? 'Geblokkeerd' : u.approved === false ? 'Wacht op goedkeuring' : u.role === 'admin' ? 'Admin' : u.role === 'printer' ? 'Printer' : 'Gebruiker';
      return `<tr>
        <td>${_esc(u.display_name || '—')}</td>
        <td>${_esc(u.company_name || '—')}</td>
        <td style="font-size:.82rem">${_esc(u.email || '—')}</td>
        <td><select onchange="gsLoginUI.changeRole('${u.id}',this.value)" ${u.id === gsAuth.user?.id ? 'disabled' : ''}>
          <option value="user" ${u.role==='user'?'selected':''}>Gebruiker</option>
          <option value="printer" ${u.role==='printer'?'selected':''}>Printer</option>
          <option value="admin" ${u.role==='admin'?'selected':''}>Admin</option>
        </select></td>
        <td><span class="badge ${badge}">${badgeText}</span></td>
        <td>${date}</td>
        <td style="white-space:nowrap">${u.id !== gsAuth.user?.id ? `<button class="btn-sm btn ${u.blocked ? 'btn-primary' : 'btn-accent'}" style="padding:5px 8px" title="${u.blocked ? 'Deblokkeren' : 'Blokkeren'}" onclick="gsLoginUI.toggleBlock('${u.id}',${!u.blocked})">${u.blocked ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><circle cx="12" cy="12" r="9"/><line x1="5.6" y1="5.6" x2="18.4" y2="18.4"/></svg>'}</button>
          <button class="btn-sm btn" style="background:#1d9aaf;color:#fff;margin-left:4px;padding:5px 8px" title="Nieuw tijdelijk wachtwoord instellen" onclick="gsLoginUI.setTempPassword('${u.id}','${_esc(u.display_name || u.company_name || 'deze gebruiker')}')"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.8 12.2L21 2M15 8l3 3"/></svg></button>
          <button class="btn-sm btn" style="background:#dc2626;color:#fff;margin-left:4px;padding:5px 8px" title="Account definitief verwijderen" onclick="gsLoginUI.deleteUser('${u.id}','${_esc(u.display_name || u.company_name || 'deze gebruiker')}')"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>` : ''}</td>
      </tr>`;
    }).join('')}</tbody></table>`;
  }
  container.innerHTML = html;
}

function _generatePassword(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let pw = '';
  for(let i = 0; i < 16; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
}

async function adminCreateUser(){
  const name = document.getElementById('adminNewName')?.value?.trim() || '';
  const company = document.getElementById('adminNewCompany')?.value?.trim() || '';
  const email = document.getElementById('adminNewEmail')?.value?.trim() || '';
  const role = document.getElementById('adminNewRole')?.value || 'user';
  const msg = document.getElementById('adminCreateMsg');
  if(!email){ if(msg) msg.innerHTML='<span style="color:#ef4444">E-mail is verplicht</span>'; return; }
  if(msg) msg.innerHTML='<span style="color:var(--muted)">Account aanmaken...</span>';
  // Auto-generate temp password — user will set their own via reset email
  const tempPw = _generatePassword();
  const result = await gsAuth.adminCreateUser(email, tempPw, name, company, role, true);
  if(result.error){
    if(msg) msg.innerHTML='<span style="color:#ef4444">Fout: '+_esc(result.error.message||result.error)+'</span>';
  } else {
    // Send password reset email so user can set their own password
    try { await gsAuth.sendPasswordReset(email); } catch(_){}
    if(msg) msg.innerHTML='<span style="color:#22c55e">Account aangemaakt — wachtwoord reset e-mail verstuurd naar '+_esc(email)+'</span>';
    ['adminNewName','adminNewCompany','adminNewEmail'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
    _loadAdminUsers();
  }
}

async function changeRole(userId, role){
  const { error } = await gsAuth.updateUserRole(userId, role);
  if(error){ if(window.toast) toast(t('toastRoleChangeFailed', error.message || '?'), 'error', 5000); }
  else { if(window.toast) toast('Rol bijgewerkt', 'success', 1500); }
  _loadAdminUsers();
}

async function setTempPassword(userId, name){
  if(!confirm('Nieuw tijdelijk wachtwoord instellen voor "' + name + '"?\n\nHet oude wachtwoord vervalt direct.')) return;
  // Leesbaar tijdelijk wachtwoord: TPS- + 8 tekens zonder verwarrende karakters
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let pw = 'TPS-';
  const rnd = new Uint32Array(8);
  crypto.getRandomValues(rnd);
  for(let i = 0; i < 8; i++) pw += chars[rnd[i] % chars.length];
  const { error } = await gsAuth.adminSetPassword(userId, pw);
  if(error){
    if(window.toast) toast(t('toastSetFailed', error.message || '?'), 'error', 5000);
    return;
  }
  prompt('Tijdelijk wachtwoord voor "' + name + '" — kopieer en deel dit veilig.\nAdvies: laat de gebruiker het direct wijzigen via Profiel of "Wachtwoord vergeten".', pw);
}

async function deleteUser(userId, name){
  const sure = confirm('Account van "' + name + '" definitief verwijderen?\n\nAlle opgeslagen opdrachten van deze gebruiker worden ook verwijderd. De persoon kan zich daarna opnieuw registreren met hetzelfde e-mailadres.');
  if(!sure) return;
  const { error } = await gsAuth.adminDeleteUser(userId);
  if(error){
    if(window.toast) toast(t('toastDeleteFailed', error.message || '?'), 'error', 5000);
    return;
  }
  if(window.toast) toast(t('toastAccountDeleted'), 'success');
  _loadAdminUsers();
}

async function toggleBlock(userId, blocked){
  const action = blocked ? 'blokkeren' : 'deblokkeren';
  if(!confirm(`Weet je zeker dat je deze gebruiker wilt ${action}?`)) {
    _loadAdminUsers(); // Reset select
    return;
  }
  await gsAuth.toggleBlockUser(userId, blocked);
  _loadAdminUsers();
}

async function _loadAdminApprovals(){
  const container = document.getElementById('adminApprovalTable');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';
  const { data } = await gsAuth.listUsers();
  // Filter pending (not approved and not blocked)
  const pending = (data || []).filter(u => u.approved === false && !u.blocked);
  const badge = document.getElementById('approvalBadge');
  if(badge){
    if(pending.length > 0){ badge.textContent = pending.length; badge.style.display = ''; }
    else { badge.style.display = 'none'; }
  }
  if(pending.length === 0){
    container.innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--muted)"><p style="font-size:1.5rem;margin:0 0 8px">✓</p><p>Geen openstaande aanvragen</p></div>';
    return;
  }
  container.innerHTML = `<table class="admin-table">
    <thead><tr><th>Naam</th><th>Bedrijf</th><th>E-mail</th><th>Aangemeld</th><th>Actie</th></tr></thead>
    <tbody>${pending.map(u => {
      const date = new Date(u.created_at).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric' });
      return `<tr>
        <td>${_esc(u.display_name || '—')}</td>
        <td>${_esc(u.company_name || '—')}</td>
        <td>${_esc(u.email || '—')}</td>
        <td>${date}</td>
        <td style="display:flex;gap:6px">
          <button class="btn btn-primary btn-sm" onclick="gsLoginUI.approveUser('${u.id}')">Goedkeuren</button>
          <button class="btn btn-accent btn-sm" onclick="gsLoginUI.rejectUser('${u.id}')">Afwijzen</button>
        </td>
      </tr>`;
    }).join('')}</tbody></table>`;
}

async function approveUser(userId){
  await gsAuth.approveUser(userId);
  if(window.toast) window.toast('Account goedgekeurd', 'success');
  _loadAdminApprovals();
  _loadAdminUsers();
}

async function rejectUser(userId){
  if(!confirm('Weet je zeker dat je dit account wilt afwijzen? Het account wordt geblokkeerd.')) return;
  await gsAuth.toggleBlockUser(userId, true);
  if(window.toast) window.toast('Account afgewezen', 'success');
  _loadAdminApprovals();
}

async function _loadAdminSettings(){
  const container = document.getElementById('adminSettingsForm');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';
  const settings = await gsAuth.getSettings();
  const rows = [
    { key:'default_gap_mm', label:'Standaard gap (mm)', type:'number', val: settings.default_gap_mm ?? 5 },
    { key:'default_format', label:'Standaard formaat', type:'select', val: settings.default_format ?? 'dtf55',
      options:[{v:'dtf55',l:'DTF 55cm'},{v:'dtf60',l:'DTF 60cm'},{v:'a3',l:'A3'},{v:'a4',l:'A4'},{v:'a5',l:'A5'}] },
    { key:'max_file_size_mb', label:'Max bestandsgrootte (MB)', type:'number', val: settings.max_file_size_mb ?? 50 },
  ];
  container.innerHTML = rows.map(r => {
    let input = '';
    if(r.type === 'select'){
      input = `<select id="setting_${r.key}" onchange="gsLoginUI.saveSetting('${r.key}',this.value)">${r.options.map(o => `<option value="${o.v}" ${o.v === r.val ? 'selected' : ''}>${o.l}</option>`).join('')}</select>`;
    } else {
      input = `<input type="${r.type}" id="setting_${r.key}" value="${r.val}" onchange="gsLoginUI.saveSetting('${r.key}',this.value)">`;
    }
    return `<div class="sf-row"><span class="sf-label">${r.label}</span><div class="sf-input">${input}</div></div>`;
  }).join('');
}

async function saveSetting(key, value){
  // Parse numbers
  if(key === 'default_gap_mm' || key === 'max_file_size_mb') value = Number(value);
  await gsAuth.updateSetting(key, JSON.stringify(value));
  if(window.toast) window.toast(t('toastSettingSaved'), 'success', 1500);
}

async function _loadAdminStats(){
  const container = document.getElementById('adminStatsContent');
  if(!container) return;
  container.innerHTML = '<p style="color:var(--muted)">Laden...</p>';

  // Overall stats
  const stats = await gsAuth.getUsageStats(30);
  const counts = stats.counts || {};
  const cards = [
    { label:'Totaal events (30d)', val: stats.totalEvents || 0 },
    { label:'Actieve dagen', val: stats.activeDays || 0 },
    { label:'Logins', val: counts.login || 0 },
    { label:'Exports', val: counts.export_pdf || 0 },
    { label:'Projecten opgeslagen', val: counts.save_project || 0 },
    { label:'Registraties', val: counts.signup || 0 },
  ];

  // Per-company stats
  const companyData = await gsAuth.getCompanyStats();
  const companies = companyData.data || [];

  let html = `<div class="stats-grid">${cards.map(c =>
    `<div class="stat-card"><div class="sc-val">${c.val}</div><div class="sc-label">${c.label}</div></div>`
  ).join('')}</div>`;

  // Company table — sorteerbaar op elke kolom (v2.55)
  _companyStatsData = companies;
  html += `<div style="height:1px;background:var(--border);margin:18px 0 14px"></div>`;
  html += `<h4 style="margin:0 0 10px;font-size:.82rem;text-transform:uppercase;letter-spacing:.5px;color:var(--muted)">Per bedrijf</h4>`;
  if(companies.length === 0){
    html += `<p style="color:var(--muted);font-size:.85rem">Nog geen activiteit geregistreerd.</p>`;
    container.innerHTML = html;
    return;
  }
  html += `<div id="companyStatsTable"></div>`;
  container.innerHTML = html;
  _renderCompanyTable();
}

/* ── Sorteerbare bedrijventabel ── */
var _companyStatsData = [];
var _companySort = { col: 'gangsheets', dir: -1 };

function _renderCompanyTable(){
  const wrap = document.getElementById('companyStatsTable');
  if(!wrap) return;
  const cols = [
    { key:'company',      label:'Bedrijf',            type:'str'  },
    { key:'gangsheets',   label:'Gangsheets',         type:'num'  },
    { key:'logins',       label:'Logins',             type:'num'  },
    { key:'lastActivity', label:'Laatste activiteit', type:'date' },
  ];
  const s = _companySort;
  const rows = [..._companyStatsData].sort((a, b) => {
    let av = a[s.col], bv = b[s.col];
    // dir 1 = oplopend, -1 = aflopend
    if(s.col === 'company'){
      av = (av||'').toLowerCase(); bv = (bv||'').toLowerCase();
      return av < bv ? -s.dir : av > bv ? s.dir : 0;
    }
    if(s.col === 'lastActivity'){
      av = av || ''; bv = bv || '';
      return av < bv ? -s.dir : av > bv ? s.dir : 0;
    }
    return ((av||0) - (bv||0)) * s.dir;
  });
  let html = `<table class="admin-table"><thead><tr>` + cols.map(c => {
    const active = s.col === c.key;
    const arrow = active ? (s.dir === -1 ? ' ▼' : ' ▲') : '';
    return `<th data-sort="${c.key}" style="cursor:pointer;user-select:none${active ? ';color:var(--primary)' : ''}">${c.label}${arrow}</th>`;
  }).join('') + `</tr></thead><tbody>`;
  rows.forEach(c => {
    const lastDate = c.lastActivity ? new Date(c.lastActivity).toLocaleDateString('nl-NL', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—';
    html += `<tr><td>${_esc(c.company)}</td><td><strong>${c.gangsheets}</strong></td><td>${c.logins}</td><td>${lastDate}</td></tr>`;
  });
  html += `</tbody></table>`;
  wrap.innerHTML = html;
  wrap.querySelectorAll('th[data-sort]').forEach(th => {
    th.onclick = () => {
      const key = th.dataset.sort;
      if(_companySort.col === key) _companySort.dir = -_companySort.dir;
      else _companySort = { col: key, dir: key === 'company' ? 1 : -1 };
      _renderCompanyTable();
    };
  });
}

/* ── HTML escape ── */
function _esc(s){ return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── Expose ── */

function _stripWhiteBg(c){
  try{
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
    const im = ctx.getImageData(0, 0, w, h);
    const d = im.data;
    const isWhite = i => d[i+3] > 200 && d[i] > 242 && d[i+1] > 242 && d[i+2] > 242;
    // Alleen strippen als de hoeken wit zijn (anders is er geen witte achtergrond)
    const corners = [0, (w-1)*4, (h-1)*w*4, ((h-1)*w + w-1)*4];
    if(corners.filter(isWhite).length < 3) return;
    const seen = new Uint8Array(w*h);
    const q = [];
    for(let x=0; x<w; x++){ q.push(x, (h-1)*w + x); }
    for(let y=0; y<h; y++){ q.push(y*w, y*w + w-1); }
    while(q.length){
      const p = q.pop();
      if(p < 0 || p >= w*h || seen[p]) continue;
      seen[p] = 1;
      const i = p*4;
      if(!isWhite(i)) continue;
      d[i+3] = 0;
      const x = p % w, y = (p - x) / w;
      if(x > 0) q.push(p-1);
      if(x < w-1) q.push(p+1);
      if(y > 0) q.push(p-w);
      if(y < h-1) q.push(p+w);
    }
    ctx.putImageData(im, 0, 0);
  }catch(_){ }
}

async function onProofLogoUpload(){
  const inp = document.getElementById('profProofLogo');
  const f = inp && inp.files ? inp.files[0] : null;
  if(!f) return;
  const ext = (f.name.split('.').pop() || '').toLowerCase();
  let out;
  try{
    if(ext === 'svg'){
      // SVG: op hoge resolutie renderen via de browser (viewBox-veilig)
      const txt = await f.text();
      const doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
      const root = doc.documentElement;
      if(!root.getAttribute('viewBox')){
        const aw = parseFloat(root.getAttribute('width')) || 300;
        const ah = parseFloat(root.getAttribute('height')) || 150;
        root.setAttribute('viewBox', '0 0 ' + aw + ' ' + ah);
      }
      const vb = root.getAttribute('viewBox').split(/[\s,]+/).map(Number);
      const w = 900, h = Math.max(2, Math.round(w * (vb[3] || 1) / (vb[2] || 1)));
      root.setAttribute('width', w); root.setAttribute('height', h);
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(root)], { type: 'image/svg+xml' }));
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      _stripWhiteBg(c);
      out = c.toDataURL('image/png');
    } else if(ext === 'pdf' || ext === 'ai' || ext === 'eps'){
      // PDF/AI direct via pdf.js; EPS eerst client-side naar PDF converteren
      let buf = await f.arrayBuffer();
      if(ext === 'eps'){
        if(!window._gsbConvertEps) throw new Error('EPS-conversie niet beschikbaar');
        if(window.toast) toast('EPS converteren\u2026 dit kan even duren', 'info', 4000);
        buf = await window._gsbConvertEps(buf);
      }
      if(!window.pdfjsLib) throw new Error('PDF-ondersteuning niet geladen');
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const page = await pdf.getPage(1);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: Math.min(6, 900 / base.width) });
      const c = document.createElement('canvas');
      c.width = Math.round(viewport.width); c.height = Math.round(viewport.height);
      await page.render({ canvasContext: c.getContext('2d'), viewport }).promise;
      _stripWhiteBg(c);
      out = c.toDataURL('image/png');
    } else {
      // Bitmap: verkleinen naar max 900px breed
      const dataUrl = await new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f); });
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = dataUrl; });
      const sc = Math.min(1, 900 / img.width);
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.width * sc));
      c.height = Math.max(1, Math.round(img.height * sc));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      _stripWhiteBg(c);
      out = c.toDataURL('image/png');
    }
  }catch(err){
    if(window.toast) toast(t('toastLogoReadFailed', err.message || '?'), 'error', 5000);
    inp.value = '';
    return;
  }
  const { error } = await gsAuth.updateProfile({ proof_logo: out });
  if(error){
    if(window.toast) toast(t('toastLogoSaveFailed', error.message || '?'), 'error', 6000);
    inp.value = '';
    return;
  }
  const fresh = (gsAuth.profile && gsAuth.profile.proof_logo) || out;
  const prev = document.getElementById('profProofLogoPreview');
  if(prev){ prev.src = fresh; prev.style.display = ''; }
  if(window.toast) toast(t('toastProofLogoSaved'), 'success', 3000);
}
async function removeProofLogo(){
  await gsAuth.updateProfile({ proof_logo: null });
  const prev = document.getElementById('profProofLogoPreview');
  if(prev) prev.style.display = 'none';
  if(window.toast) toast(t('toastOwnLogoRemoved'), 'info');
}

window.gsLoginUI = {
  onProofLogoUpload, removeProofLogo,
  deleteUser, setTempPassword,
  showTab, handleLogin, handleRegister, handleReset, handleResetConfirm,
  toggleUserMenu, logout,
  openModal, closeModal,
  openProjects, loadProject, saveCurrentProject, deleteProject,
  openSaveDialog, closeSaveDialog, confirmSave,
  openProfile, handleProfileSave,
  openAdmin, adminTab, changeRole, toggleBlock,
  adminCreateUser, approveUser, rejectUser,
  saveSetting,
};

})();
