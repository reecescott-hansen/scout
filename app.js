/* =====================================================
   Scout — app.js
   Vanilla JS · Claude API · localStorage
   ===================================================== */

const KEY_PROFILE = 'scout_profile';
const KEY_SAVED   = 'scout_saved';
const KEY_API_KEY = 'scout_api_key';

let savedFilter = 'all';

// ── Bootstrap ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initPills('#interestPills');
  initPills('#profilePills');
  initProfileForm();
  initFindPage();
  initSavedPage();
  initApiModal();
  syncProfileBanner();
  syncApiKeyBtn();
});

// ══════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════
function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(name) {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    const active = btn.dataset.tab === name;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${name}`);
  });

  if (name === 'saved') renderSaved();
  if (name === 'find') syncProfileBanner();
}

// ══════════════════════════════════════════════════════
// PILLS
// ══════════════════════════════════════════════════════
function initPills(sel) {
  document.querySelector(sel)?.querySelectorAll('.pill').forEach(p => {
    p.addEventListener('click', () => p.classList.toggle('active'));
  });
}

function getActivePills(sel) {
  return [...document.querySelectorAll(`${sel} .pill.active`)].map(p => p.dataset.interest);
}

function setActivePills(sel, interests = []) {
  document.querySelectorAll(`${sel} .pill`).forEach(p => {
    p.classList.toggle('active', interests.includes(p.dataset.interest));
  });
}

// ══════════════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════════════
function getProfile() {
  return JSON.parse(localStorage.getItem(KEY_PROFILE) || '{}');
}

function initProfileForm() {
  loadProfileIntoForm();
  document.getElementById('profileForm').addEventListener('submit', e => {
    e.preventDefault();
    saveProfile();
  });
}

function loadProfileIntoForm() {
  const p = getProfile();
  if (p.name)      document.getElementById('profileName').value  = p.name;
  if (p.grade)     document.getElementById('profileGrade').value = p.grade;
  if (p.gpa)       document.getElementById('profileGpa').value   = p.gpa;
  if (p.email)     document.getElementById('profileEmail').value = p.email;
  if (p.bio)       document.getElementById('profileBio').value   = p.bio;
  if (p.interests) setActivePills('#profilePills', p.interests);
}

function saveProfile() {
  const profile = {
    name:      document.getElementById('profileName').value.trim(),
    grade:     document.getElementById('profileGrade').value,
    gpa:       document.getElementById('profileGpa').value,
    email:     document.getElementById('profileEmail').value.trim(),
    bio:       document.getElementById('profileBio').value.trim(),
    interests: getActivePills('#profilePills'),
  };
  localStorage.setItem(KEY_PROFILE, JSON.stringify(profile));
  syncProfileBanner();

  const toast = document.getElementById('saveConfirm');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

// Sync profile summary into Find page banner + find filters
function syncProfileBanner() {
  const p = getProfile();

  // Avatar initial
  const avatar = document.getElementById('bannerAvatar');
  avatar.textContent = p.name ? p.name.trim()[0].toUpperCase() : '?';

  // Name + detail
  const nameEl   = document.getElementById('bannerName');
  const detailEl = document.getElementById('bannerDetail');

  if (p.name) {
    nameEl.textContent = p.name;
    const parts = [];
    if (p.grade) parts.push(p.grade);
    if (p.gpa)   parts.push(`GPA ${p.gpa}`);
    detailEl.textContent = parts.length ? parts.join(' · ') : 'Set grade & GPA for better matches';
  } else {
    nameEl.textContent   = 'Complete your profile';
    detailEl.textContent = 'for personalised matches';
  }

  // Pre-fill find filters from profile
  if (p.grade) document.getElementById('gradeSelect').value = p.grade;
  if (p.gpa)   document.getElementById('gpaInput').value   = p.gpa;
  if (p.interests) setActivePills('#interestPills', p.interests);
}

// ══════════════════════════════════════════════════════
// FIND PAGE
// ══════════════════════════════════════════════════════
function initFindPage() {
  document.getElementById('findBtn').addEventListener('click', handleFind);
  document.getElementById('retryBtn').addEventListener('click', handleFind);
}

async function handleFind() {
  const apiKey = localStorage.getItem(KEY_API_KEY);
  if (!apiKey) { openApiModal(); return; }

  const grade     = document.getElementById('gradeSelect').value;
  const gpa       = document.getElementById('gpaInput').value;
  const interests = getActivePills('#interestPills');
  const types     = [...document.querySelectorAll('.opp-type:checked')].map(c => c.value);
  const profile   = getProfile();

  showFindState('loading');

  try {
    const opps = await fetchOpportunities(apiKey, buildPrompt({ grade, gpa, interests, types, profile }));
    renderResults(opps);
    showFindState('results');
  } catch (err) {
    console.error(err);
    document.getElementById('errorMsg').textContent =
      err.message || 'Something went wrong. Check your API key and try again.';
    showFindState('error');
  }
}

function showFindState(state) {
  // Fullscreen loader overlays everything
  document.getElementById('fullscreenLoader').classList.toggle('hidden', state !== 'loading');

  // In-page elements
  document.getElementById('findBtn').classList.toggle('hidden', state === 'loading' || state === 'results');
  document.getElementById('errorState').classList.toggle('hidden', state !== 'error');
  document.getElementById('resultsGrid').classList.toggle('hidden', state !== 'results');

  // Show find btn again when showing results or error
  if (state === 'results' || state === 'error') {
    document.getElementById('findBtn').classList.remove('hidden');
  }
}

function buildPrompt({ grade, gpa, interests, types, profile }) {
  const who = profile.name ? `Student: ${profile.name}.` : 'A student.';
  const bio  = profile.bio  ? `Bio: ${profile.bio}` : '';

  return `You are an expert college counselor helping students find real opportunities.

${who} Grade: ${grade || 'unspecified'}. GPA: ${gpa || 'unspecified'}.
Interests: ${interests.length ? interests.join(', ') : 'unspecified'}.
Opportunity types: ${types.join(', ')}.
${bio}

Return exactly 6 real, well-known student opportunities matching this profile.
Respond ONLY with a valid JSON array — no prose, no markdown, no code fences.

Each object must have exactly these fields:
{
  "name": "Full official name",
  "organization": "Sponsoring org",
  "type": "scholarship" | "internship" | "program" | "competition",
  "matchReason": "One compelling sentence (2nd person, starting with 'You')",
  "deadline": "Month YYYY or 'Rolling' or 'Varies'",
  "award": "Dollar amount or benefit description",
  "url": "Official website URL"
}

Prioritise well-known, reputable, currently active opportunities. Be specific and accurate.`;
}

async function fetchOpportunities(apiKey, prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages:   [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${res.status}`);
  }

  const data  = await res.json();
  const text  = data.content?.[0]?.text || '';
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('Unexpected response from Claude. Please try again.');

  const parsed = JSON.parse(match[0]);
  if (!Array.isArray(parsed)) throw new Error('Invalid response format.');
  return parsed;
}

// ══════════════════════════════════════════════════════
// RENDER RESULTS
// ══════════════════════════════════════════════════════
function renderResults(opps) {
  const list = document.getElementById('resultsGrid');
  list.innerHTML = '';
  opps.forEach((opp, i) => list.appendChild(createCard(opp, i, 'find')));
}

function createCard(opp, index, mode) {
  const saved   = getSavedOpps();
  const isSaved = saved.some(s => s.name === opp.name);
  const type    = (opp.type || 'program').toLowerCase();

  const card = document.createElement('div');
  card.className = 'opp-card';
  card.style.animationDelay = `${index * 100}ms`;

  if (mode === 'find') {
    card.innerHTML = `
      <span class="type-badge ${type}">${capitalise(type)}</span>
      <div>
        <div class="card-title">${esc(opp.name)}</div>
        <div class="card-org">${esc(opp.organization || '')}</div>
      </div>
      <div class="card-match">${esc(opp.matchReason || '')}</div>
      <div class="card-meta">
        <div class="meta-item">
          <span class="meta-label">Deadline</span>
          <span class="meta-value">${esc(opp.deadline || 'TBD')}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Award / Benefit</span>
          <span class="meta-value">${esc(opp.award || '—')}</span>
        </div>
      </div>
      <div class="card-actions">
        <a class="btn-visit-full" href="${sanitizeUrl(opp.url)}" target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Visit Site
        </a>
        <button class="btn-save-full ${isSaved ? 'saved' : ''}">${isSaved ? '✓ Saved' : 'Save'}</button>
      </div>`;

    const saveBtn = card.querySelector('.btn-save-full');
    if (!isSaved) {
      saveBtn.addEventListener('click', () => {
        saveOpportunity(opp);
        saveBtn.textContent = '✓ Saved';
        saveBtn.classList.add('saved');
      });
    }
  }

  if (mode === 'saved') {
    const status = opp._status || 'Planning';
    card.innerHTML = `
      <span class="type-badge ${type}">${capitalise(type)}</span>
      <div>
        <div class="card-title">${esc(opp.name)}</div>
        <div class="card-org">${esc(opp.organization || '')}</div>
      </div>
      <div class="card-match">${esc(opp.matchReason || '')}</div>
      <div class="card-meta">
        <div class="meta-item">
          <span class="meta-label">Deadline</span>
          <span class="meta-value">${esc(opp.deadline || 'TBD')}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Award / Benefit</span>
          <span class="meta-value">${esc(opp.award || '—')}</span>
        </div>
      </div>
      <div class="card-saved-footer">
        <select class="status-select">
          <option value="Planning"    ${status === 'Planning'    ? 'selected' : ''}>📋 Planning</option>
          <option value="In progress" ${status === 'In progress' ? 'selected' : ''}>🔄 In Progress</option>
          <option value="Applied"     ${status === 'Applied'     ? 'selected' : ''}>✅ Applied</option>
        </select>
        <div class="saved-card-btns">
          <a class="btn-visit-sm" href="${sanitizeUrl(opp.url)}" target="_blank" rel="noopener noreferrer">Visit ↗</a>
          <button class="btn-remove" title="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>`;

    card.querySelector('.status-select').addEventListener('change', e => updateStatus(opp.name, e.target.value));
    card.querySelector('.btn-remove').addEventListener('click', () => { removeOpportunity(opp.name); renderSaved(); });
  }

  return card;
}

// ══════════════════════════════════════════════════════
// SAVED
// ══════════════════════════════════════════════════════
function initSavedPage() {
  document.getElementById('savedFilters').addEventListener('click', e => {
    const chip = e.target.closest('.status-chip');
    if (!chip) return;
    document.querySelectorAll('.status-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    savedFilter = chip.dataset.filter;
    renderSaved();
  });
}

function renderSaved() {
  const all      = getSavedOpps();
  const filtered = savedFilter === 'all' ? all : all.filter(o => o._status === savedFilter);
  const applied  = all.filter(o => o._status === 'Applied').length;

  document.getElementById('savedMeta').innerHTML =
    `<strong>${all.length}</strong> saved · <strong>${applied}</strong> applied`;

  const list  = document.getElementById('savedGrid');
  const empty = document.getElementById('savedEmpty');
  list.innerHTML = '';

  if (filtered.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  filtered.forEach((opp, i) => list.appendChild(createCard(opp, i, 'saved')));
}

function getSavedOpps()         { return JSON.parse(localStorage.getItem(KEY_SAVED) || '[]'); }
function saveOpportunity(opp)   {
  const list = getSavedOpps();
  if (list.some(s => s.name === opp.name)) return;
  list.unshift({ ...opp, _status: 'Planning', _savedAt: Date.now() });
  localStorage.setItem(KEY_SAVED, JSON.stringify(list));
}
function removeOpportunity(name) {
  localStorage.setItem(KEY_SAVED, JSON.stringify(getSavedOpps().filter(o => o.name !== name)));
}
function updateStatus(name, status) {
  localStorage.setItem(KEY_SAVED, JSON.stringify(getSavedOpps().map(o => o.name === name ? { ...o, _status: status } : o)));
}

// ══════════════════════════════════════════════════════
// API KEY MODAL (bottom sheet)
// ══════════════════════════════════════════════════════
function initApiModal() {
  document.getElementById('apiKeyBtn').addEventListener('click', openApiModal);
  document.getElementById('modalClose').addEventListener('click', closeApiModal);

  document.getElementById('saveApiKey').addEventListener('click', () => {
    const val = document.getElementById('apiKeyInput').value.trim();
    if (val && !val.startsWith('•')) {
      localStorage.setItem(KEY_API_KEY, val);
      syncApiKeyBtn();
      closeApiModal();
    } else if (val && val.startsWith('•')) {
      closeApiModal(); // masked existing key — no change
    }
  });

  document.getElementById('clearApiKey').addEventListener('click', () => {
    localStorage.removeItem(KEY_API_KEY);
    document.getElementById('apiKeyInput').value = '';
    syncApiKeyBtn();
  });

  document.getElementById('apiModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeApiModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeApiModal();
  });
}

function openApiModal() {
  const existing = localStorage.getItem(KEY_API_KEY);
  document.getElementById('apiKeyInput').value = existing ? '•'.repeat(16) : '';
  document.getElementById('apiModal').classList.remove('hidden');
  setTimeout(() => document.getElementById('apiKeyInput').focus(), 50);
}

function closeApiModal() {
  document.getElementById('apiModal').classList.add('hidden');
}

function syncApiKeyBtn() {
  const hasKey = !!localStorage.getItem(KEY_API_KEY);
  const btn    = document.getElementById('apiKeyBtn');
  btn.classList.toggle('has-key', hasKey);
  document.getElementById('apiKeyLabel').textContent = hasKey ? 'Key Set ✓' : 'API Key';
}

// ══════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════
function capitalise(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function sanitizeUrl(url) {
  if (!url) return '#';
  try {
    const u = new URL(url);
    return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : '#';
  } catch { return '#'; }
}
