const today = new Date().toISOString().slice(0,10);
let trials = [
  {
    id: 'DEMO-CTRI-001', source: 'CTRI', secondary: 'DEMO-NCT-101', cancer: 'Lung', state: 'Maharashtra', city: 'Mumbai', phase: 'Phase 3',
    title: 'Biomarker-guided maintenance study in advanced non-small cell lung cancer',
    summary: 'Synthetic interventional study record used to demonstrate general discovery, provenance, and a recently verified site contact path.',
    registryStatus: 'Open to recruitment', registryUpdated: '2026-08-02', registryAge: '42 days',
    verifyKey: 'verified_recruiting', verifyLabel: 'Verified recruiting', verifyTone: 'good', verifiedAt: '2026-09-10', verifyAge: '3 days ago', verifyMethod: 'Site trial coordinator · authorised email',
    location: 'Harbour Oncology Research Centre, Mumbai', sponsor: 'Synthetic Oncology Research Network', design: 'Randomised interventional study',
    generalCriteria: 'Advanced non-small cell lung cancer; protocol-defined biomarker and prior-treatment conditions apply. Trial team performs formal screening.',
    operational: 'Site accepts general screening inquiries through its trial office. No patient information is required for the first contact.',
    confidence: 95, due: false, discrepancy: false,
    activity: [
      ['2026-09-10 15:22', 'Site verification recorded', 'A. Rao · authorised email'],
      ['2026-09-08 09:05', 'Registry snapshot refreshed', 'CTRI · synthetic fixture'],
      ['2026-09-08 09:05', 'Cross-registry ID linked', 'Deterministic secondary-ID rule']
    ]
  },
  {
    id: 'DEMO-CTRI-002', source: 'CTRI', secondary: 'No declared NCT ID', cancer: 'Head and neck', state: 'Delhi', city: 'New Delhi', phase: 'Phase 2',
    title: 'Perioperative immunotherapy study in resectable oral cavity cancer',
    summary: 'Synthetic record demonstrating an open registry declaration with no authoritative response from the listed site.',
    registryStatus: 'Open to recruitment', registryUpdated: '2026-06-16', registryAge: '89 days',
    verifyKey: 'no_authoritative_response', verifyLabel: 'No authoritative response', verifyTone: 'warn', verifiedAt: '2026-09-07', verifyAge: 'attempted 6 days ago', verifyMethod: 'Two trial-office attempts · no confirmation',
    location: 'North Capital Cancer Institute, New Delhi', sponsor: 'Synthetic Academic Cancer Group', design: 'Open-label interventional study',
    generalCriteria: 'Resectable oral cavity cancer; protocol-defined stage, fitness, and prior-treatment criteria apply.',
    operational: 'The registry declaration remains visible, but the site has not confirmed current screening availability.',
    confidence: 54, due: true, discrepancy: false,
    activity: [
      ['2026-09-07 11:34', 'Verification attempt recorded', 'A. Rao · trial-office call'],
      ['2026-09-04 16:20', 'Verification attempt recorded', 'Shared trial office · public-query route'],
      ['2026-09-01 08:50', 'Registry snapshot refreshed', 'CTRI · synthetic fixture']
    ]
  },
  {
    id: 'DEMO-CTRI-003', source: 'CTRI', secondary: 'DEMO-NCT-303', cancer: 'Supportive care', state: 'Tamil Nadu', city: 'Chennai', phase: 'Phase 2',
    title: 'Navigation and symptom-support workflow during definitive radiotherapy',
    summary: 'Synthetic operational study record showing a direct disagreement between registry-declared and site-confirmed recruitment state.',
    registryStatus: 'Open to recruitment', registryUpdated: '2026-09-01', registryAge: '12 days',
    verifyKey: 'registry_site_discrepancy', verifyLabel: 'Site reports temporary pause', verifyTone: 'bad', verifiedAt: '2026-09-12', verifyAge: '1 day ago', verifyMethod: 'Institutional trial office · recorded call',
    location: 'Coastal Cancer Care Centre, Chennai', sponsor: 'Synthetic Supportive Care Consortium', design: 'Pragmatic interventional study',
    generalCriteria: 'Adults receiving protocol-defined radiotherapy; site team confirms formal inclusion and exclusion criteria.',
    operational: 'Site trial office reports a temporary screening pause while the registry still displays open recruitment. Follow-up is due.',
    confidence: 48, due: true, discrepancy: true,
    activity: [
      ['2026-09-12 10:18', 'Registry/site discrepancy recorded', 'K. Iyer · trial-office call'],
      ['2026-09-12 10:15', 'Site assertion recorded', 'Temporarily paused'],
      ['2026-09-11 09:10', 'Registry snapshot refreshed', 'CTRI · synthetic fixture']
    ]
  },
  {
    id: 'DEMO-NCT-004', source: 'ClinicalTrials.gov', secondary: 'DEMO-CTRI-404', cancer: 'Breast', state: 'Karnataka', city: 'Bengaluru', phase: 'Phase 3',
    title: 'Adjuvant strategy study in HER2-positive early breast cancer',
    summary: 'Synthetic cross-registry example with a not-yet-recruiting declaration and site startup confirmation.',
    registryStatus: 'Not yet recruiting', registryUpdated: '2026-09-08', registryAge: '5 days',
    verifyKey: 'verified_not_recruiting', verifyLabel: 'Site startup confirmed', verifyTone: 'neutral', verifiedAt: '2026-09-09', verifyAge: '4 days ago', verifyMethod: 'Sponsor trial operations · authorised update',
    location: 'Garden City Oncology Institute, Bengaluru', sponsor: 'Synthetic Breast Research Alliance', design: 'Randomised interventional study',
    generalCriteria: 'HER2-positive early breast cancer; protocol-defined pathology, stage, prior-treatment, and timing criteria apply.',
    operational: 'Site confirms startup activities but is not accepting screening inquiries. Recheck after the stated activation window.',
    confidence: 83, due: true, discrepancy: false,
    activity: [
      ['2026-09-09 13:45', 'Site startup state confirmed', 'Sponsor trial operations'],
      ['2026-09-08 09:00', 'Registry snapshot refreshed', 'ClinicalTrials.gov API fixture'],
      ['2026-09-08 09:00', 'Secondary ID linked', 'Declared identifier rule']
    ]
  }
];
let currentRole = 'coordinator';
const followedTrialIds = new Set(['DEMO-CTRI-001','DEMO-CTRI-003']);
let alertRules = 4;
let alerts = [
  {id:'ALT-301',type:'trial',tone:'warn',title:'Registry status changed',body:'DEMO-CTRI-001 changed from Not yet recruiting to Open to recruitment in the latest synthetic registry snapshot.',source:'CTRI snapshot · 18 minutes ago',recipients:['Treating oncologist','Research coordinator'],unread:true},
  {id:'ALT-302',type:'verification',tone:'bad',title:'Registry and site do not agree',body:'DEMO-CTRI-003 is listed as open, but the site reports a temporary pause. A coordinator owns the follow-up.',source:'Site trial office · 1 hour ago',recipients:['Research coordinator','Site steward'],unread:true},
  {id:'ALT-303',type:'handoff',tone:'good',title:'Referral acknowledged',body:'The trial office acknowledged INQ-1038. Formal screening remains with the trial team.',source:'Trial office · 3 hours ago',recipients:['Treating oncologist','Research coordinator'],unread:true},
  {id:'ALT-304',type:'verification',tone:'warn',title:'Site verification expires soon',body:'The site assertion for DEMO-NCT-004 reaches its review date tomorrow.',source:'Verification policy · today',recipients:['Research coordinator'],unread:true},
  {id:'ALT-305',type:'handoff',tone:'neutral',title:'Board task written to EMR',body:'Task/SYN-TASK-901 was created and is waiting for treating-unit acknowledgement.',source:'EMR adapter · yesterday',recipients:['Treating unit','Board presenter'],unread:false}
];

let selectedTrialId = trials[0].id;
let profileOpen = true;
let profileOriginId = selectedTrialId;
let profileOriginScrollY = 0;
let profileOriginListScrollTop = 0;
let selectedVerificationId = trials[2].id;
let activeTab = 'overview';
let ctriOutage = false;
let caseSelectedTrialId = trials[0].id;
let currentArtifactName = '';
let packetDrafted = false;
let boardDecisionRecorded = false;
const criterionDecisions = new Map();
const trialRoomThreads = new Map();
let trialRoomSequence = 1;
let currentInboxKind = 'updates';
const inboxReadIds = new Set();
let inquiries = [
  {id:'INQ-1042', trialId:'DEMO-CTRI-003', question:'Resolve registry discrepancy', owner:'A. Rao', due:'2026-09-14', route:'Site trial office', status:'sent', created:'2026-09-12'},
  {id:'INQ-1038', trialId:'DEMO-CTRI-002', question:'Confirm site recruitment', owner:'Trial office', due:'2026-09-15', route:'Registry public-query channel', status:'acknowledged', created:'2026-09-07'}
];
let auditEvents = [
  {id:'EVT-2048', at:'2026-09-13 08:40', actor:'System fixture', title:'Prototype workspace opened', note:'Synthetic data loaded in browser memory', type:'system'},
  {id:'EVT-2047', at:'2026-09-12 10:18', actor:'K. Iyer', title:'Registry/site discrepancy recorded', note:'DEMO-CTRI-003 · site reports temporary pause', type:'verification'},
  {id:'EVT-2046', at:'2026-09-12 10:16', actor:'A. Rao', title:'Inquiry marked sent', note:'INQ-1042 · site trial office', type:'task'},
  {id:'EVT-2045', at:'2026-09-10 15:22', actor:'A. Rao', title:'Site verification recorded', note:'DEMO-CTRI-001 · verified recruiting', type:'verification'},
  {id:'EVT-2044', at:'2026-09-08 09:05', actor:'Source adapter', title:'Registry snapshot refreshed', note:'Three synthetic CTRI records processed', type:'source'}
];

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const trialById = (id) => trials.find(t => t.id === id);
const formatDate = (value) => {
  if(!value) return 'Not reported';
  const normalized=/^\d{4}-\d{2}$/.test(value)?`${value}-01`:value;
  const parsed=new Date(`${normalized}T00:00:00`);
  return Number.isNaN(parsed.getTime())?value:new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',year:'numeric'}).format(parsed);
};
const statusPill = (trial) => `<span class="status-pill ${trial.verifyTone}"><span class="status-dot"></span>${trial.verifyLabel}</span>`;
const statusHuman = {draft:'Draft',approved:'Human approved',sent:'Sent',acknowledged:'Acknowledged',closed:'Closed',unable:'Unable to contact'};
const roleProfiles = {
  coordinator:{initials:'AR',name:'A. Rao',label:'Research coordinator',institution:'Metro Cancer Centre',verified:true},
  oncologist:{initials:'MS',name:'Dr M. Shah',label:'Treating oncologist',institution:'Metro Cancer Centre',verified:true},
  site:{initials:'SS',name:'Site steward',label:'Verified site coordinator',institution:'Trial site · synthetic',verified:true},
  auditor:{initials:'AU',name:'Read-only auditor',label:'Read-only auditor',institution:'OncoGrid validation',verified:false}
};

const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, character => {
  const entities = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'};
  return entities[character];
});
const plainText = (value) => {
  const decoder=document.createElement('textarea');
  decoder.innerHTML=String(value ?? '');
  return decoder.value;
};
const validSourceUrl = (value, id) => value === `https://clinicaltrials.gov/study/${id}` ? value : `https://clinicaltrials.gov/study/${id}`;
const roomResolutionLabels = {
  answer:'Official site response',
  informal:'Informal answer',
  task:'Action created',
  correction:'Source correction proposed',
  unresolved:'Unresolved',
  outdated:'Closed as outdated'
};

function roomThreadsFor(trialId) {
  if(!trialRoomThreads.has(trialId))trialRoomThreads.set(trialId,[]);
  return trialRoomThreads.get(trialId);
}
let registrySnapshotMeta = null;
let registryLoadState = 'loading';
let registryLoadError = '';
let registryLoadRequest = 0;

function fullDate(value) {
  if(!value) return today;
  if(/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
  return /^\d{4}-\d{2}-\d{2}$/.test(value)?value:today;
}

function ageLabel(value) {
  const parsed=new Date(`${fullDate(value)}T00:00:00Z`);
  const now=new Date(`${today}T00:00:00Z`);
  const days=Math.max(0,Math.round((now-parsed)/86400000));
  return days===0?'today':`${days} days`;
}

function operationalScore(raw) {
  const statusScore=raw.overallStatus==='RECRUITING'?45:raw.overallStatus==='NOT_YET_RECRUITING'?25:10;
  const date=new Date(`${fullDate(raw.lastUpdatePostedDate||raw.statusVerifiedDate)}T00:00:00Z`);
  const days=Math.max(0,Math.round((new Date(`${today}T00:00:00Z`)-date)/86400000));
  const freshness=Math.max(0,40-Math.min(40,Math.floor(days/15)*5));
  const sites=Math.min(15,Number(raw.indiaRecruitingSiteCount||0)*3);
  return statusScore+freshness+sites;
}

function mapRegistryTrial(raw) {
  const locations=Array.isArray(raw.indiaLocations)?raw.indiaLocations:[];
  const location=locations.find(item=>item.status==='RECRUITING')||locations[0]||{};
  const conditions=Array.isArray(raw.conditions)?raw.conditions.map(escapeHTML):[];
  const secondaryIds=Array.isArray(raw.secondaryIds)?raw.secondaryIds:[];
  const ctri=secondaryIds.find(item=>String(item.id||'').toUpperCase().startsWith('CTRI/'));
  const registryDate=fullDate(raw.lastUpdatePostedDate||raw.statusVerifiedDate);
  const siteCount=Number(raw.indiaSiteCount||locations.length||0);
  const recruitingCount=Number(raw.indiaRecruitingSiteCount||0);
  return {
    id: escapeHTML(raw.id),
    source: 'ClinicalTrials.gov',
    sourceUrl: validSourceUrl(raw.sourceUrl,raw.id),
    secondary: escapeHTML(ctri?.id||secondaryIds[0]?.id||'No declared CTRI ID'),
    cancer: conditions[0]||'Cancer condition not reported',
    conditions,
    state: escapeHTML(location.state||'State not reported'),
    city: escapeHTML(location.city||'City not reported'),
    phase: Array.isArray(raw.phases)&&raw.phases.length?raw.phases.map(escapeHTML).join(' / '):'Phase not reported',
    title: escapeHTML(raw.briefTitle||'Title not reported'),
    officialTitle: escapeHTML(raw.officialTitle||raw.briefTitle||'Official title not reported'),
    summary: escapeHTML(raw.briefSummary||'Summary not reported in the registry record.'),
    registryStatus: escapeHTML(raw.statusLabel||raw.overallStatus||'Status not reported'),
    registryUpdated: registryDate,
    registryAge: ageLabel(registryDate),
    verifyKey: 'unverified',
    verifyLabel: 'Not independently site-verified',
    verifyTone: 'warn',
    verifiedAt: registryDate,
    verifyAge: 'registry data only',
    verifyMethod: 'No separate site confirmation recorded',
    location: escapeHTML(`${location.facility||'Facility not reported'}, ${location.city||'City not reported'}`),
    sponsor: escapeHTML(raw.leadSponsor||'Sponsor not reported'),
    design: escapeHTML([raw.studyType,raw.primaryPurpose].filter(Boolean).join(' · ')||'Design not reported'),
    generalCriteria: escapeHTML(raw.eligibilityCriteria||'Eligibility criteria not reported. Open the source registry record for current details.'),
    operational: escapeHTML(`ClinicalTrials.gov lists ${siteCount} India site${siteCount===1?'':'s'}; ${recruitingCount} ${recruitingCount===1?'is':'are'} marked recruiting. Site capacity has not been independently verified.`),
    confidence: operationalScore(raw),
    due: true,
    discrepancy: false,
    activity: [
      [registrySnapshotMeta?.retrievedAtLabel||'Snapshot time', 'Registry snapshot loaded', 'ClinicalTrials.gov API v2'],
      [formatDate(registryDate), 'Registry record last updated', escapeHTML(raw.id)],
      [formatDate(raw.statusVerifiedDate), 'Registry status verified date', escapeHTML(raw.statusLabel||'Status not reported')]
    ],
    indiaLocations: locations.map(item=>({facility:escapeHTML(item.facility),city:escapeHTML(item.city),state:escapeHTML(item.state),status:escapeHTML(item.status)})),
    interventions: Array.isArray(raw.interventions)?raw.interventions.map(escapeHTML):[],
    minimumAge: escapeHTML(raw.minimumAge),
    maximumAge: escapeHTML(raw.maximumAge),
    sex: escapeHTML(raw.sex),
    realRegistryRecord: true
  };
}

function replaceSelectOptions(select, label, values) {
  select.replaceChildren(new Option(label,'all'));
  values.forEach(value=>select.add(new Option(plainText(value),value)));
  select.value='all';
}

function populateRegistryFilters() {
  const conditionCounts=new Map();
  trials.forEach(trial=>(trial.conditions?.length?trial.conditions:[trial.cancer]).filter(Boolean).forEach(condition=>conditionCounts.set(condition,(conditionCounts.get(condition)||0)+1)));
  const topConditions=[...conditionCounts.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,24).map(([condition])=>condition);
  const states=[...new Set(trials.map(trial=>trial.state).filter(value=>value&&value!=='State not reported'))].sort();
  replaceSelectOptions($('#cancer-filter'),'All cancer conditions',topConditions);
  replaceSelectOptions($('#state-filter'),'All Indian states',states);
}

function seedRegistryWorkflowData() {
  followedTrialIds.clear();
  trials.filter(trial=>trial.registryStatus==='Recruiting').slice(0,2).forEach(trial=>followedTrialIds.add(trial.id));
  const followed=[...followedTrialIds].map(trialById).filter(Boolean);
  if(followed[0]){
    alerts[0]={id:'ALT-301',type:'trial',tone:'warn',title:'Registry status snapshot loaded',body:`${followed[0].id} is registry-declared ${followed[0].registryStatus}. The listed site is not independently verified.`,source:'ClinicalTrials.gov snapshot',recipients:['Treating oncologist','Research coordinator'],unread:true};
    inquiries[0].trialId=followed[0].id;
  }
  if(followed[1]){
    alerts[1]={id:'ALT-302',type:'verification',tone:'warn',title:'Site verification needed',body:`${followed[1].id} has an India location in the registry and needs an authorised site check.`,source:'Verification queue',recipients:['Research coordinator','Site steward'],unread:true};
    inquiries[1].trialId=followed[1].id;
  }
}

async function loadRegistrySnapshot() {
  const requestId=++registryLoadRequest;
  const bar=$('#registry-data-bar');
  const previousSelectedId=selectedTrialId;
  const refreshButton=$('#refresh-results');
  registryLoadState='loading';
  registryLoadError='';
  refreshButton.disabled=true;
  refreshButton.innerHTML=`${icon('refresh')}Loading source`;
  renderTrials();
  try{
    const response=await fetch('./data/india-oncology-trials.json',{cache:'no-store'});
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    const snapshot=await response.json();
    if(snapshot.schemaVersion!==1||!Array.isArray(snapshot.trials)||!snapshot.trials.length) throw new Error('Invalid snapshot contract');
    if(requestId!==registryLoadRequest)return;
    registrySnapshotMeta={
      retrievedAt:snapshot.retrievedAt,
      retrievedAtLabel:new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short'}).format(new Date(snapshot.retrievedAt)),
      dataTimestamp:snapshot.source?.dataTimestamp||'Not reported',
      retainedCount:snapshot.retainedCount
    };
    const mapped=snapshot.trials.map(mapRegistryTrial).filter(Boolean);
    if(!mapped.length) throw new Error('No usable trial records');
    trials=mapped;
    selectedTrialId=trials.some(trial=>trial.id===previousSelectedId)?previousSelectedId:trials[0].id;
    selectedVerificationId=trials.find(trial=>trial.registryStatus==='Recruiting')?.id||trials[0].id;
    caseSelectedTrialId=selectedTrialId;
    seedRegistryWorkflowData();
    populateRegistryFilters();
    const initialRows=filteredTrials();
    if(initialRows.length&&!initialRows.slice(0,60).some(trial=>trial.id===selectedTrialId))selectedTrialId=initialRows[0].id;
    caseSelectedTrialId=selectedTrialId;
    profileOriginId=selectedTrialId;
    activeTab='overview';
    registryLoadState='ready';
    $('#record-type-label').textContent='Real registry records · synthetic cases';
    bar.classList.remove('error');
    bar.innerHTML=`<strong>${trials.length} real India oncology trials loaded</strong><span>ClinicalTrials.gov · registry-declared · data ${escapeHTML(snapshot.source?.dataTimestamp||'timestamp not reported')}</span><span class="spacer"></span><a href="${escapeHTML(snapshot.source?.documentationUrl||'https://clinicaltrials.gov/data-api/about-api')}" target="_blank" rel="noopener noreferrer">Source and API</a>`;
    renderTrials();renderCase();renderCandidates();renderVerification();renderInquiries();renderAlerts();renderBoard();renderAudit();
  }catch(error){
    if(requestId!==registryLoadRequest)return;
    registryLoadState='error';
    registryLoadError=error.message;
    const retainedState=registrySnapshotMeta?'The last loaded registry records remain visible.':'Clearly labelled synthetic fallback records remain visible.';
    bar.classList.add('error');
    bar.innerHTML=`<strong>Real registry snapshot could not be loaded</strong><span>${escapeHTML(error.message)}. ${retainedState}</span><span class="spacer"></span><a href="https://clinicaltrials.gov/data-api/about-api" target="_blank" rel="noopener noreferrer">ClinicalTrials.gov API</a>`;
    $('#record-type-label').textContent=registrySnapshotMeta?'Last loaded real records':'Synthetic fallback records';
    if(!registrySnapshotMeta)populateRegistryFilters();
    renderTrials();
  }finally{
    if(requestId===registryLoadRequest){
      refreshButton.disabled=false;
      refreshButton.innerHTML=`${icon('refresh')}Refresh source`;
    }
  }
}

function showToast(message) {
  const region = $('#toast-region');
  const node = document.createElement('div');
  node.className = 'toast';
  node.innerHTML = `${icon('check')}<span>${message}</span>`;
  region.appendChild(node);
  setTimeout(() => node.remove(), 3600);
}

function filteredTrials() {
  const query = $('#trial-search').value.trim().toLowerCase();
  const cancer = $('#cancer-filter').value;
  const verify = $('#verify-filter').value;
  const state = $('#state-filter').value;
  const sort = $('#sort-results').value;
  let rows = trials.filter(t => {
    const searchable = [t.title,t.cancer,...(t.conditions||[]),...(t.interventions||[]),t.phase,t.city,t.state,t.id,t.sponsor,t.registryStatus,t.verifyLabel,...(t.indiaLocations||[]).flatMap(location=>[location.facility,location.city,location.state])].join(' ').toLowerCase();
    const verifyMatch = verify === 'all' || (verify === 'verified' && ['verified_recruiting','verified_not_recruiting'].includes(t.verifyKey)) || (verify === 'attention' && (t.due || t.discrepancy)) || (verify === 'unverified' && ['unverified','no_authoritative_response'].includes(t.verifyKey));
    return (!query || searchable.includes(query)) && (cancer === 'all' || (t.conditions?.length?t.conditions:[t.cancer]).includes(cancer)) && (state === 'all' || t.state === state) && verifyMatch;
  });
  if (sort === 'confidence') rows.sort((a,b)=>b.confidence-a.confidence);
  if (sort === 'recent') rows.sort((a,b)=>b.verifiedAt.localeCompare(a.verifiedAt));
  if (sort === 'title') rows.sort((a,b)=>a.title.localeCompare(b.title));
  return rows;
}

function renderTrials() {
  const list=$('#result-list');
  const detail=$('#trial-detail');
  const count=$('#result-count');
  const sourceDate=$('#library-source-date');
  if(registryLoadState==='loading'){
    count.textContent='Loading registry snapshot';
    sourceDate.textContent='ClinicalTrials.gov source and snapshot date pending';
    list.setAttribute('aria-busy','true');
    list.innerHTML=`<p class="sr-only">Loading trial records</p><div class="skeleton card" aria-hidden="true"></div><div class="skeleton card" aria-hidden="true"></div><div class="skeleton card" aria-hidden="true"></div>`;
    detail.innerHTML=`<div class="detail-head"><div class="skeleton" style="height:14px;width:34%;margin-bottom:14px" aria-hidden="true"></div><div class="skeleton" style="height:34px;width:82%;margin-bottom:10px" aria-hidden="true"></div><div class="skeleton" style="height:52px" aria-hidden="true"></div><p class="sr-only">Loading selected trial</p></div>`;
    return;
  }

  list.setAttribute('aria-busy','false');
  const rows=filteredTrials();
  const visibleRows=rows.slice(0,60);
  const snapshotDate=registrySnapshotMeta?.dataTimestamp?.slice(0,10);
  const recordKind=registrySnapshotMeta?'registry':'synthetic fallback';
  count.textContent=rows.length>visibleRows.length?`${rows.length} ${recordKind} trials · showing first ${visibleRows.length}`:`${rows.length} ${recordKind} ${rows.length===1?'trial':'trials'}`;
  sourceDate.textContent=snapshotDate?`ClinicalTrials.gov snapshot · ${formatDate(snapshotDate)}`:'Registry snapshot unavailable · synthetic fallback';
  const errorState=registryLoadState==='error'?`<div class="library-state error" role="alert"><strong>Registry snapshot unavailable</strong><p>${escapeHTML(registryLoadError)}. ${registrySnapshotMeta?'The last loaded registry records remain below.':'The records below are synthetic fallback examples.'}</p><button class="button small" type="button" id="retry-registry-load">${icon('refresh')}Retry source</button></div>`:'';

  if(!rows.length){
    list.innerHTML=errorState+`<div class="empty-state"><div class="empty-symbol">${icon('search')}</div><h2>No general records found</h2><p>Try a broader condition or clear the source-status filters. No patient details are needed.</p><button class="button" type="button" id="empty-reset">Clear filters</button></div>`;
    detail.innerHTML=`<div class="detail-head"><h2>No record selected</h2><p class="summary">The detail panel updates when a general trial record is selected.</p></div>`;
    $('#empty-reset')?.addEventListener('click',clearFilters);
    $('#retry-registry-load')?.addEventListener('click',loadRegistrySnapshot);
    return;
  }

  if(!visibleRows.some(trial=>trial.id===selectedTrialId)){
    selectedTrialId=visibleRows[0].id;
    if(profileOpen)profileOriginId=selectedTrialId;
  }
  list.innerHTML=errorState+visibleRows.map(trial=>{
    const siteCount=(trial.indiaLocations||[]).length;
    return `
      <button class="trial-card ${profileOpen&&trial.id===selectedTrialId?'selected':''}" type="button" data-trial-id="${trial.id}" aria-pressed="${profileOpen&&trial.id===selectedTrialId}">
        <div class="trial-card-top"><span class="tag">${trial.phase}</span><span class="tag">${siteCount} India site${siteCount===1?'':'s'}</span><span class="updated">${trial.city}, ${trial.state}</span></div>
        <h2>${trial.title}</h2>
        <div class="trial-source-trace"><strong>${trial.source}</strong><span>${trial.id}</span><span>registry updated ${formatDate(trial.registryUpdated)}</span></div>
        <div class="trial-meta"><span class="tag">${trial.cancer}</span>${trial.discrepancy?'<span class="tag" style="color:var(--red);background:var(--red-soft)">source conflict</span>':''}</div>
        <div class="dual-status-mini"><div class="mini-state registry"><span>Registry declares</span><strong>${trial.registryStatus}</strong></div><div class="mini-state verified ${trial.verifyTone}"><span>Site confirmation</span><strong>${trial.verifyLabel}</strong></div></div>
      </button>`;
  }).join('')+(rows.length>visibleRows.length?`<div class="notice"><strong>${rows.length-visibleRows.length} more records.</strong> Narrow the condition, state, status, or search text to review them.</div>`:'');
  $$('.trial-card',list).forEach(button=>button.addEventListener('click',()=>{
    selectedTrialId=button.dataset.trialId;
    profileOriginId=selectedTrialId;
    profileOriginScrollY=window.scrollY;
    profileOriginListScrollTop=list.scrollTop;
    profileOpen=true;
    activeTab='overview';
    renderTrials();
    $('#trial-profile-title')?.focus({preventScroll:window.innerWidth>720});
  }));
  $('#retry-registry-load')?.addEventListener('click',loadRegistrySnapshot);
  if(profileOpen){
    detail.classList.remove('profile-closed');
    renderDetail(trialById(selectedTrialId));
  }else{
    detail.classList.add('profile-closed');
    const selected=trialById(selectedTrialId);
    detail.innerHTML=`<div class="detail-prompt"><div class="empty-symbol">${icon('compass')}</div><h2>Choose a trial to inspect</h2><p>${selected?`Returned from ${selected.id}. `:''}Your filters and list position remain unchanged.</p></div>`;
  }
}

function renderDetail(t) {
  const target=$('#trial-detail');
  const snapshotDate=registrySnapshotMeta?.dataTimestamp?.slice(0,10);
  const retrievedLabel=t.realRegistryRecord?(registrySnapshotMeta?.retrievedAtLabel||'Snapshot retrieval time unavailable'):'Synthetic fallback fixture';
  const conditions=(t.conditions?.length?t.conditions:[t.cancer]).filter(Boolean);
  const interventions=(t.interventions||[]).filter(Boolean);
  const sites=t.indiaLocations?.length?t.indiaLocations:[{
    facility:t.location,
    city:t.city,
    state:t.state,
    status:t.registryStatus
  }];
  const sitesByState=new Map();
  sites.forEach(site=>{
    const state=site.state||'State not reported';
    if(!sitesByState.has(state))sitesByState.set(state,[]);
    sitesByState.get(state).push(site);
  });
  const siteGroups=[...sitesByState.entries()]
    .sort(([a],[b])=>a.localeCompare(b))
    .map(([state,stateSites])=>`
      <section class="site-group">
        <header><h3>${state}</h3><span>${stateSites.length} site${stateSites.length===1?'':'s'} in snapshot</span></header>
        <div class="site-list">
          ${stateSites
            .sort((a,b)=>(a.city||'').localeCompare(b.city||'')||(a.facility||'').localeCompare(b.facility||''))
            .map(site=>`
              <div class="site-row">
                <div class="site-identity"><strong>${site.facility||'Facility not reported'}</strong><span>${site.city||'City not reported'} · Registry site state: ${String(site.status||'not reported').replaceAll('_',' ').toLowerCase()}</span></div>
                <div class="site-assertion"><span>Site confirmation</span><strong>${t.realRegistryRecord?'Not independently confirmed':t.verifyLabel}</strong></div>
              </div>`).join('')}
        </div>
      </section>`).join('');
  const confirmationUnknown=['unverified','no_authoritative_response'].includes(t.verifyKey);
  const confirmationConflict=t.discrepancy||t.verifyKey==='registry_site_discrepancy';
  const confirmationTone=confirmationConflict?'conflict':confirmationUnknown?'unknown':'confirmed';
  const confirmationTitle=confirmationConflict?'Registry and site sources conflict':confirmationUnknown?'Site confirmation remains unknown':'Human site confirmation recorded';
  const confirmationCopy=confirmationConflict
    ?`${t.verifyLabel}. The registry declaration remains ${t.registryStatus}; neither assertion overwrites the other.`
    :confirmationUnknown
      ?`${t.verifyLabel}. Registry recruitment state does not establish whether any listed India site can screen today.`
      :`${t.verifyLabel}. Authority: ${t.verifyMethod}; recorded ${formatDate(t.verifiedAt)}.`;
  const activityTimeline=`<div class="timeline">${t.activity.map(item=>`<div class="timeline-item"><strong>${item[1]}</strong><span>${item[0]} · ${item[2]}</span></div>`).join('')}</div>`;
  const sourceLink=t.realRegistryRecord?`<a href="${t.sourceUrl}" target="_blank" rel="noopener noreferrer">Open the authoritative registry record</a>`:'Synthetic fallback has no external registry source.';
  const roomThreads=roomThreadsFor(t.id);
  const currentParticipant=roleProfiles[currentRole];
  const roomReadOnly=currentRole==='auditor';
  const relatedHandoffs=inquiries.filter(item=>item.trialId===t.id).length;
  const roomThreadMarkup=roomThreads.length?roomThreads.map(thread=>{
    const resolution=thread.resolution;
    const remainsOpen=!resolution||resolution==='unresolved';
    const resolutionLabel=resolution?roomResolutionLabels[resolution]:'Awaiting confirmation';
    const resolutionTone=resolution==='answer'?'confirmed':resolution==='correction'?'correction':resolution==='task'?'task':resolution==='informal'?'informal':'unresolved';
    return `
      <article class="room-thread" id="thread-${thread.id}" tabindex="-1" data-room-thread="${thread.id}">
        <header><div><span>${escapeHTML(thread.category)}</span><h4>${escapeHTML(thread.question)}</h4></div><span class="room-thread-state ${resolutionTone}">${resolutionLabel}</span></header>
        <p class="room-thread-meta">Asked by ${escapeHTML(thread.authorName)} · ${escapeHTML(thread.authorRole)} · ${escapeHTML(thread.askedAt)}</p>
        ${resolution?`<div class="room-resolution ${resolutionTone}"><strong>${resolutionLabel}</strong><p>${escapeHTML(thread.resolutionNote)}</p><span>${escapeHTML(thread.resolvedBy)} · ${escapeHTML(thread.resolvedRole)} · ${escapeHTML(thread.resolvedAt)}${thread.actionId?` · ${escapeHTML(thread.actionId)}`:''}${thread.resolution==='correction'?' · registry source unchanged':''}</span></div>`:''}
        ${remainsOpen?`
          <form class="room-resolution-form" data-room-resolution-form="${thread.id}">
            <label><span>Record outcome</span><select class="select" name="resolution" data-room-resolution-select ${roomReadOnly?'disabled':''}><option value="answer">Official site response</option><option value="informal">Informal answer</option><option value="task">Create action</option><option value="correction">Propose source correction</option><option value="unresolved" ${resolution==='unresolved'?'selected':''}>Remain unresolved</option><option value="outdated">Close as outdated</option></select></label>
            <label class="room-resolution-note"><span>Human-authored note</span><textarea class="field" name="note" rows="2" maxlength="500" required placeholder="Record the answer, action, correction, or why this remains unresolved." ${roomReadOnly?'disabled':''}></textarea></label>
            <div class="room-task-fields" hidden>
              <label><span>Owner</span><select class="select" name="owner" ${roomReadOnly?'disabled':''}><option value="A. Rao">A. Rao · coordinator</option><option value="Dr M. Shah">Dr M. Shah · oncologist</option><option value="Site steward">Site steward · trial site</option></select></label>
              <label><span>Due date</span><input class="field" type="date" name="due" min="${today}" ${roomReadOnly?'disabled':''}></label>
            </div>
            <button class="button small" type="submit" ${roomReadOnly?'disabled':''}>Record outcome</button>
          </form>`:''}
      </article>`;
  }).join(''):`<div class="room-empty"><div class="empty-symbol">${icon('send')}</div><h4>No questions yet</h4><p>Ask a general operational question. Patient-specific discussion does not belong in this shared room.</p></div>`;
  const tabData={
    overview:`
      <section class="profile-section" aria-labelledby="profile-overview-heading">
        <div class="profile-section-heading"><div><span>Overview</span><h3 id="profile-overview-heading">Registry facts in context</h3></div><p>General trial information only; no patient context affects this view.</p></div>
        <div class="profile-fact-grid">
          <div class="fact"><label>Phase</label><strong>${t.phase}</strong></div>
          <div class="fact"><label>Lead sponsor</label><strong>${t.sponsor}</strong></div>
          <div class="fact"><label>Study design</label><strong>${t.design}</strong></div>
          <div class="fact"><label>Conditions</label><strong>${conditions.join(' · ')||'Not reported'}</strong></div>
          <div class="fact wide"><label>Official registry title</label><p>${t.officialTitle||t.title}</p></div>
          <div class="fact wide"><label>Interventions</label><p>${interventions.join(' · ')||'Not reported in the retained snapshot fields.'}</p></div>
          <div class="fact wide"><label>Why this record is here</label><p>${t.operational}</p></div>
        </div>
        <details class="profile-disclosure">
          <summary>Registry eligibility text</summary>
          <div class="disclosure-body"><p>${t.generalCriteria}</p><div class="notice"><strong>Not a pre-screen:</strong> Registry text can be incomplete or method-specific. The trial team performs formal screening; Trial Relay does not calculate eligibility.</div></div>
        </details>
        <details class="profile-disclosure">
          <summary>Source provenance and change history</summary>
          <div class="disclosure-body">
            <div class="profile-fact-grid">
              <div class="fact"><label>Primary source</label><strong>${t.source}</strong></div>
              <div class="fact"><label>Primary identifier</label><strong>${t.id}</strong></div>
              <div class="fact"><label>Declared secondary identifier</label><strong>${t.secondary}</strong></div>
              <div class="fact"><label>Registry updated</label><strong>${formatDate(t.registryUpdated)}</strong></div>
              <div class="fact"><label>Snapshot data date</label><strong>${snapshotDate?formatDate(snapshotDate):'Not reported'}</strong></div>
              <div class="fact"><label>Snapshot retrieved</label><strong>${retrievedLabel}</strong></div>
              <div class="fact wide"><label>Authoritative link</label><p>${sourceLink}</p></div>
            </div>
            ${activityTimeline}
          </div>
        </details>
      </section>`,
    sites:`
      <section class="profile-section" aria-labelledby="profile-sites-heading">
        <div class="profile-section-heading"><div><span>Sites and status</span><h3 id="profile-sites-heading">${sites.length} retained India site${sites.length===1?'':'s'}</h3></div><p>Registry site state and human operational confirmation remain separate.</p></div>
        <div class="contact-route"><div>${icon('link')}<span><strong>Current authorised contact route</strong><small>Use the source registry record. Contact names, email addresses, and phone numbers are not retained in this snapshot.</small></span></div>${t.realRegistryRecord?`<a class="button small" href="${t.sourceUrl}" target="_blank" rel="noopener noreferrer">Open source</a>`:''}</div>
        <div class="site-groups">${siteGroups}</div>
        <details class="profile-disclosure">
          <summary>Verification and source history</summary>
          <div class="disclosure-body">${activityTimeline}</div>
        </details>
      </section>`,
    room:`
      <section class="trial-room" aria-labelledby="trial-room-heading">
        <div class="profile-section-heading"><div><span>Trial room</span><h3 id="trial-room-heading" tabindex="-1">Questions around ${t.id}</h3></div><p>Focused operational discussion. Pinned source facts cannot be changed by messages.</p></div>
        <div class="room-pins" aria-label="Pinned trial facts">
          <div class="room-pin source"><span>Registry source</span><strong>${t.source} · ${t.id}</strong><small>${t.realRegistryRecord?`<a href="${t.sourceUrl}" target="_blank" rel="noopener noreferrer">Open record</a>`:'Synthetic fallback'}</small></div>
          <div class="room-pin"><span>Registry state</span><strong>${t.registryStatus}</strong><small>Updated ${formatDate(t.registryUpdated)}</small></div>
          <div class="room-pin ${confirmationTone}"><span>Site confirmation</span><strong>${t.verifyLabel}</strong><small>${confirmationConflict?'Conflict remains open':confirmationUnknown?'Awaiting authorised source':formatDate(t.verifiedAt)}</small></div>
          <div class="room-pin"><span>India context</span><strong>${sites.length} retained site${sites.length===1?'':'s'}</strong><small>${followedTrialIds.has(t.id)?'Following this trial':'Not currently followed'}</small></div>
        </div>
        <div class="room-layout">
          <div class="room-main">
            <form class="room-composer" id="room-question-form">
              <div class="room-composer-heading"><div>${icon('send')}<span><strong>Ask a general operational question</strong><small>Addressed to the verified site coordinator. Status stays awaiting confirmation until an authorised response.</small></span></div><span class="status-pill neutral"><span class="status-dot"></span>${roomReadOnly?'Read only':currentParticipant.label}</span></div>
              <div class="room-composer-fields">
                <label><span>Category</span><select class="select" id="room-question-category" ${roomReadOnly?'disabled':''}><option>Site status</option><option>Protocol clarification</option><option>Documents and missing information</option><option>Referral process</option><option>General discussion</option></select></label>
                <label class="room-question-copy"><span>Question</span><textarea class="field" id="room-question-copy" rows="3" minlength="10" maxlength="500" required placeholder="Ask about site status, contact route, protocol logistics, documents, or referral process." ${roomReadOnly?'disabled':''}></textarea></label>
              </div>
              <label class="room-safety-check"><input type="checkbox" id="room-question-safe" required ${roomReadOnly?'disabled':''}><span><strong>No patient-identifying or patient-specific information</strong>This shared room is for general trial operations only.</span></label>
              <div class="room-composer-actions"><span>Browser-session demonstration · reload clears messages</span><button class="button primary" type="submit" ${roomReadOnly?'disabled':''}>Post question</button></div>
            </form>
            <div class="room-thread-list" aria-live="polite">${roomThreadMarkup}</div>
          </div>
          <aside class="room-participants" aria-label="Trial room participants">
            <div class="room-side-heading"><span>Participants</span><strong>Verified roles</strong></div>
            <div class="room-participant"><span class="room-participant-avatar">MS</span><div><strong>Dr M. Shah</strong><small>Treating oncologist · Metro Cancer Centre</small></div><span class="room-participant-state">Verified</span></div>
            <div class="room-participant"><span class="room-participant-avatar">AR</span><div><strong>A. Rao</strong><small>Research coordinator · Metro Cancer Centre</small></div><span class="room-participant-state">Verified</span></div>
            <div class="room-participant"><span class="room-participant-avatar site">SS</span><div><strong>Site steward</strong><small>Site coordinator · synthetic trial site</small></div><span class="room-participant-state official">Official source</span></div>
            <div class="room-boundary">${icon('shield')}<p><strong>Official-response boundary</strong>Only the verified site role can publish an official site response or source correction. Other participants can answer informally, create work, or record that the question remains unresolved.</p></div>
            <div class="room-related"><span>Related handoffs</span><strong>${relatedHandoffs}</strong><small>General inquiries or referral tasks linked to this trial</small></div>
          </aside>
        </div>
      </section>`
  };
  if(!tabData[activeTab])activeTab='overview';
  target.innerHTML=`
    <div class="detail-head trial-entity">
      <button class="button small ghost detail-close" type="button" id="close-trial-profile">${icon('x')}Close profile</button>
      <div class="profile-source-plane"><span>Registry source</span><strong>${t.source} · ${t.id}</strong><small>Registry updated ${formatDate(t.registryUpdated)} · snapshot ${snapshotDate?formatDate(snapshotDate):'date unavailable'}</small></div>
      <div class="detail-overline"><span class="priority-badge ${t.realRegistryRecord?'p1':'p0'}">${t.realRegistryRecord?'real registry record':'synthetic fallback'}</span><span class="record-id">${t.secondary}</span></div>
      <h2 id="trial-profile-title" tabindex="-1">${t.title}</h2>
      <p class="summary">${t.summary}</p>
    </div>
    <div class="profile-status-relationship">
      <section class="profile-status registry"><span class="status-label">Registry declares</span><strong>${t.registryStatus}</strong><p>${t.source} · ${formatDate(t.registryUpdated)} · ${t.registryAge}</p></section>
      <section class="profile-status site ${confirmationTone}"><span class="status-label">Independent site confirmation</span><strong>${t.verifyLabel}</strong><p>${confirmationUnknown?'No separate current site assertion retained':`${t.verifyMethod} · ${formatDate(t.verifiedAt)}`}</p></section>
    </div>
    <div class="profile-assertion ${confirmationTone}" role="${confirmationConflict?'alert':'note'}">${icon(confirmationConflict?'warning':confirmationUnknown?'clock':'check')}<div><strong>${confirmationTitle}</strong><span>${confirmationCopy}</span></div></div>
    <div class="detail-actions">
      <button class="button primary" type="button" id="review-with-case">${icon('user')}Review with synthetic EMR case</button>
      <button class="button" type="button" id="open-trial-room">${icon('send')}Open Trial room</button>
      <button class="button" type="button" id="start-inquiry">${icon('briefcase')}General site inquiry</button>
      <button class="button" type="button" id="compare-sources">${icon('link')}Compare sources</button>
      <button class="button ${followedTrialIds.has(t.id)?'success':''}" type="button" id="toggle-follow" aria-pressed="${followedTrialIds.has(t.id)}">${icon('bell')}${followedTrialIds.has(t.id)?'Following trial':'Follow trial'}</button>
      ${t.realRegistryRecord?`<a class="button" href="${t.sourceUrl}" target="_blank" rel="noopener noreferrer">${icon('link')}Open registry record</a>`:''}
      <button class="button" type="button" id="copy-reference">${icon('copy')}Copy reference</button>
    </div>
    <div class="tabs" role="tablist" aria-label="Trial profile sections">${[['overview','Overview'],['sites','Sites & status'],['room',`Trial room${roomThreads.length?` · ${roomThreads.length}`:''}`]].map(([key,label])=>`<button class="tab-button ${activeTab===key?'active':''}" type="button" role="tab" aria-selected="${activeTab===key}" aria-controls="trial-profile-panel" data-tab="${key}">${label}</button>`).join('')}</div>
    <div class="tab-content" id="trial-profile-panel">${tabData[activeTab]}</div>`;
  $('#close-trial-profile').addEventListener('click',()=>{
    profileOpen=false;
    activeTab='overview';
    renderTrials();
    $('#result-list').scrollTop=profileOriginListScrollTop;
    window.scrollTo({top:profileOriginScrollY,behavior:'instant'});
    $$('.trial-card',$('#result-list')).find(button=>button.dataset.trialId===profileOriginId)?.focus({preventScroll:true});
  });
  $('#review-with-case').addEventListener('click',()=>{
    caseSelectedTrialId=t.id;
    renderCase();
    switchView('case');
  });
  $('#start-inquiry').addEventListener('click',()=>openInquiry(t.id));
  $('#compare-sources').addEventListener('click',()=>openCompare(t.id));
  $('#open-trial-room').addEventListener('click',()=>{
    activeTab='room';
    renderDetail(t);
    $('#trial-room-heading')?.focus({preventScroll:false});
  });
  $('#toggle-follow').addEventListener('click',()=>{
    if(followedTrialIds.has(t.id)){
      followedTrialIds.delete(t.id);
      showToast(`Stopped following ${t.id}. New trial-status alerts will stop.`);
    }else{
      followedTrialIds.add(t.id);
      showToast(`Following ${t.id}. Your team can now receive factual status alerts.`);
    }
    renderDetail(t);
    $('#toggle-follow')?.focus({preventScroll:true});
    renderAlerts();
  });
  $('#copy-reference').addEventListener('click',()=>copyText(`${t.id} — ${plainText(t.title)} — ${t.realRegistryRecord?'ClinicalTrials.gov registry record':'synthetic fallback record'}`,'Reference copied.'));
  $('#room-question-form')?.addEventListener('submit',event=>{
    event.preventDefault();
    if(roomReadOnly||!event.currentTarget.reportValidity())return;
    const question=$('#room-question-copy',target).value.trim();
    if(question.length<10){
      showToast('Write a complete operational question.');
      $('#room-question-copy',target).focus();
      return;
    }
    const participant=roleProfiles[currentRole];
    const id=`ROOM-${String(trialRoomSequence++).padStart(3,'0')}`;
    roomThreads.unshift({
      id,
      category:$('#room-question-category',target).value,
      question,
      authorName:participant.name,
      authorRole:participant.label,
      askedAt:`${formatDate(today)} · this session`,
      resolution:null
    });
    auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:`${today} session`,actor:participant.name,title:'Trial room question posted',note:`${t.id} · ${id} · no patient data`,type:'conversation'});
    renderDetail(t);
    renderAudit();
    $(`#thread-${id}`,target)?.focus({preventScroll:false});
    showToast(`${id} posted. Site confirmation remains unchanged until an authorised source responds.`);
  });
  $$('[data-room-resolution-select]',target).forEach(select=>{
    const syncTaskFields=()=>{
      const form=select.closest('form');
      const fields=$('.room-task-fields',form);
      const taskSelected=select.value==='task';
      fields.hidden=!taskSelected;
      $('select[name="owner"]',form).required=taskSelected;
      $('input[name="due"]',form).required=taskSelected;
    };
    select.addEventListener('change',syncTaskFields);
    syncTaskFields();
  });
  $$('[data-room-resolution-form]',target).forEach(form=>form.addEventListener('submit',event=>{
    event.preventDefault();
    if(roomReadOnly||!form.reportValidity())return;
    const thread=roomThreads.find(item=>item.id===form.dataset.roomResolutionForm);
    if(!thread)return;
    const resolution=form.elements.resolution.value;
    if(['answer','correction'].includes(resolution)&&currentRole!=='site'){
      showToast('Only the verified site role can record an official response or source correction.');
      form.elements.resolution.focus();
      return;
    }
    const note=form.elements.note.value.trim();
    if(!note){
      form.elements.note.focus();
      return;
    }
    const participant=roleProfiles[currentRole];
    thread.resolution=resolution;
    thread.resolutionNote=note;
    thread.resolvedBy=participant.name;
    thread.resolvedRole=participant.label;
    thread.resolvedAt=`${formatDate(today)} · this session`;
    if(resolution==='task'){
      const actionId=`INQ-${1043+inquiries.length}`;
      inquiries.unshift({id:actionId,trialId:t.id,question:note,owner:form.elements.owner.value,due:form.elements.due.value,route:'Trial room',status:'draft',created:today});
      thread.actionId=actionId;
    }
    auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:`${today} session`,actor:participant.name,title:`Trial room outcome: ${roomResolutionLabels[resolution]}`,note:`${t.id} · ${thread.id}${thread.actionId?` · ${thread.actionId}`:''}`,type:resolution==='task'?'task':'conversation'});
    if(followedTrialIds.has(t.id)&&resolution!=='unresolved'){
      alerts.unshift({id:`ALT-${400+alerts.length}`,type:'trial',tone:resolution==='answer'?'good':resolution==='correction'?'warn':'neutral',title:`Trial room: ${roomResolutionLabels[resolution]}`,body:`${t.id} · ${note}`,source:`${participant.label} · this session`,recipients:['Treating oncologist','Research coordinator'],unread:true});
    }
    renderDetail(t);
    renderInquiries();
    renderAlerts();
    renderAudit();
    $(`#thread-${thread.id}`,target)?.focus({preventScroll:true});
    showToast(resolution==='correction'?`${thread.id} recorded a proposed correction. The registry source was not changed.`:`${thread.id} recorded as ${roomResolutionLabels[resolution].toLowerCase()}.`);
  }));
  $$('.tab-button',target).forEach(button=>button.addEventListener('click',()=>{
    activeTab=button.dataset.tab;
    renderDetail(t);
    $(`.tab-button[data-tab="${activeTab}"]`,target)?.focus({preventScroll:true});
  }));
}

function clearFilters() {
  $('#trial-search').value=''; $('#cancer-filter').value='all'; $('#verify-filter').value='all'; $('#state-filter').value='all'; $('#sort-results').value='confidence'; renderTrials(); $('#trial-search').focus();
}

function openInquiry(trialId=selectedTrialId) {
  const t = trialById(trialId) || trials[0];
  selectedTrialId=t.id;
  $('#inquiry-trial-label').textContent=`${plainText(t.id)} · ${plainText(t.title)}`;
  $('#inquiry-form').dataset.trialId=t.id;
  $('#inquiry-safe').checked=false;
  $('#inquiry-note').value='';
  $('#inquiry-due').value='2026-09-16';
  $('#inquiry-dialog').showModal();
  $('#inquiry-type').focus();
}

function openVerification(trialId=selectedVerificationId) {
  const t=trialById(trialId);
  if(!t) return;
  $('#verification-trial-label').textContent=`${plainText(t.id)} · ${plainText(t.title)}`;
  $('#verification-form').dataset.trialId=t.id;
  $('#verification-authority').checked=false;
  $('#verification-note').value='';
  $('#verification-date').value=today;
  $('#verification-dialog').showModal();
  $('#verification-status').focus();
}

function openCompare(trialId) {
  const t=trialById(trialId);
  $('#compare-trial-label').textContent=`${t.id} · synthetic comparison`;
  $('#compare-content').innerHTML=`<div class="compare-grid"><div class="compare-card"><span class="tag">Registry source</span><h3>${t.source}</h3><div class="compare-row"><label>Status</label><strong>${t.registryStatus}</strong></div><div class="compare-row"><label>Updated</label><strong>${formatDate(t.registryUpdated)}</strong></div><div class="compare-row"><label>Record ID</label><strong>${t.id}</strong></div><div class="compare-row"><label>Secondary ID</label><strong>${t.secondary}</strong></div></div><div class="compare-card"><span class="tag">Human site source</span><h3>Operational assertion</h3><div class="compare-row"><label>Status</label><strong>${t.verifyLabel}</strong></div><div class="compare-row"><label>Confirmed</label><strong>${formatDate(t.verifiedAt)}</strong></div><div class="compare-row"><label>Method</label><strong>${t.verifyMethod}</strong></div><div class="compare-row"><label>Conflict</label><strong>${t.discrepancy?'Yes — unresolved':'None recorded'}</strong></div></div></div><div class="notice" style="margin-top:12px"><strong>No precedence shortcut:</strong> the product may display a discrepancy, but a named human owns its disposition. Neither source silently overwrites the other.</div>`;
  $('#compare-dialog').showModal();
}

function renderCase() {
  const t=trialById(caseSelectedTrialId) || trialById(selectedTrialId) || trials[0];
  caseSelectedTrialId=t.id;
  $('#case-selected-trial-title').textContent=plainText(t.title);
  $('#case-selected-trial-meta').textContent=`${plainText(t.id)} · ${plainText(t.phase)} · ${plainText(t.city)} · ${plainText(t.verifyLabel)}`;
  $('#board-trial-title').textContent=plainText(t.title);
  const criteria=[
    ['Protocol disease cohort','Clinician compares the protocol text with the clinician-confirmed diagnosis.','Pathology report + Condition'],
    ['Recorded disease setting','Clinician reviews the protocol stage/state wording and current EMR source.','Oncology encounter'],
    ['Protocol biomarker requirement','Clinician checks method, threshold, specimen, and accepted report.','Molecular report'],
    ['Prior treatment and timing','Clinician checks lines, component drugs, dates, washout, and recovery.','Treatment timeline']
  ];
  $('#case-criteria-list').innerHTML=criteria.map((c,index)=>{
    const key=`${t.id}:${index}`;
    const value=criterionDecisions.get(key)||'not_reviewed';
    return `<div class="criterion-row"><div class="criterion-copy"><strong>${c[0]}</strong><span>${c[1]}</span></div><span class="criterion-source">${icon('link')}${c[2]}</span><label><span class="sr-only">Human review state for ${c[0]}</span><select class="criterion-select" data-criterion-key="${key}"><option value="not_reviewed" ${value==='not_reviewed'?'selected':''}>Not reviewed</option><option value="confirmed" ${value==='confirmed'?'selected':''}>Confirmed by clinician</option><option value="not_met" ${value==='not_met'?'selected':''}>Not met — human decision</option><option value="clarify" ${value==='clarify'?'selected':''}>Needs clarification</option></select></label></div>`;
  }).join('');
  $$('[data-criterion-key]').forEach(select=>select.addEventListener('change',()=>{
    criterionDecisions.set(select.dataset.criterionKey,select.value);
    auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:18',actor:'Dr M. Shah',title:'Criterion review state recorded',note:`${select.dataset.criterionKey} · ${select.options[select.selectedIndex].text}`,type:'clinical-human'});
    updateCriteriaCount();
    renderAudit();
    showToast('Human review state saved. No overall eligibility result was calculated.');
  }));
  updateCriteriaCount();
}

function updateCriteriaCount() {
  const prefix=`${caseSelectedTrialId}:`;
  const reviewed=[...criterionDecisions.entries()].filter(([key,value])=>key.startsWith(prefix)&&value!=='not_reviewed').length;
  $('#criteria-review-count').textContent=`${reviewed} of 4`;
}

function openArtifact(name) {
  currentArtifactName=name;
  $('#artifact-dialog-title').textContent=name;
  $('#artifact-dialog-body').innerHTML=`<div class="detail-grid"><div class="fact"><label>EMR source</label><strong>Oncology EMR · synthetic</strong></div><div class="fact"><label>Record status</label><strong>Final / available</strong></div><div class="fact"><label>Source date</label><strong>28 Aug–11 Sep 2026</strong></div><div class="fact wide"><label>Source assertion preview</label><p>This demonstration intentionally omits realistic clinical prose. A production workspace opens the original EMR artifact and keeps any extracted assertion linked to its exact source location.</p></div><div class="notice wide"><strong>No interpretation:</strong> Trial Relay does not infer diagnosis, stage, response, risk, or suitability from this artifact.</div></div>`;
  $('#artifact-dialog').showModal();
}

function openPacket() {
  const t=trialById(caseSelectedTrialId);
  $('#packet-trial-label').textContent=`${plainText(t.id)} · ${plainText(t.title)}`;
  $('#packet-authorised').checked=false;
  $('#packet-dialog').showModal();
}

function renderBoard() {
  const t=trialById(caseSelectedTrialId)||trials[0];
  $('#board-trial-title').textContent=plainText(t.title);
  if(!boardDecisionRecorded) return;
  $('#board-decision-state').textContent='Human decision recorded · ready for write-back';
  $('#board-decision-copy').innerHTML='<strong>Operational disposition:</strong> Authorise coordinator to contact the verified site for formal trial-team screening. Clinical decision content remains in the signed EMR record.';
  $('#board-writeback').disabled=false;
  $('#board-lifecycle').innerHTML='<div class="board-stage done"><span class="board-stage-marker">1</span><div><strong>Case selected</strong><span>Treating oncologist · 13 Sep</span></div></div><div class="board-stage done"><span class="board-stage-marker">2</span><div><strong>Packet sources reviewed</strong><span>Presenter · synthetic artifacts</span></div></div><div class="board-stage done"><span class="board-stage-marker">3</span><div><strong>Board discussion completed</strong><span>Human participants</span></div></div><div class="board-stage done"><span class="board-stage-marker">4</span><div><strong>Decision reference signed</strong><span>MDT-DEMO-2026-0916-01</span></div></div><div class="board-stage current"><span class="board-stage-marker">5</span><div><strong>EMR task pending</strong><span>Owner and acknowledgement ready</span></div></div>';
}

function renderHome() {
  const inboxItems=buildInboxItems();
  const unread=inboxItems.filter(item=>item.unread).length;
  const attention=trials.filter(trial=>trial.due||trial.discrepancy).length;
  const openInquiries=inquiries.filter(inquiry=>!['closed','unable'].includes(inquiry.status)).length;
  const snapshotDate=registrySnapshotMeta?.dataTimestamp?.slice(0,10);
  $('#home-trial-count').textContent=`${trials.length} registry record${trials.length===1?'':'s'}`;
  $('#home-unread-count').textContent=unread;
  $('#home-verification-count').textContent=attention;
  $('#home-inquiry-count').textContent=openInquiries;
  $('#inbox-update-count').textContent=inboxItems.filter(item=>item.kind==='updates').length;
  $('#inbox-message-count').textContent=inboxItems.filter(item=>item.kind==='messages').length;
  $('#inbox-task-count').textContent=inboxItems.filter(item=>item.kind==='tasks').length;
  $('#home-source-date').textContent=snapshotDate?`ClinicalTrials.gov snapshot · ${formatDate(snapshotDate)}`:'Synthetic fallback while registry snapshot loads';
}

function buildInboxItems() {
  const items=[];
  const verificationTrialIds=new Set(trials.filter(trial=>trial.due||trial.discrepancy).map(trial=>trial.id));
  const dueLabel=value=>{
    if(!value)return 'Not scheduled';
    if(value<today)return `Overdue · ${formatDate(value)}`;
    if(value===today)return `Due today · ${formatDate(value)}`;
    return `Due ${formatDate(value)}`;
  };
  alerts.forEach(alert=>{
    if(alert.title.startsWith('Trial room:'))return;
    const trial=trials.find(candidate=>`${alert.title} ${alert.body}`.includes(candidate.id));
    const linkedInquiry=inquiries.find(inquiry=>alert.body.includes(inquiry.id));
    if(alert.type==='verification'&&trial&&verificationTrialIds.has(trial.id))return;
    const kind=alert.type==='handoff'?'messages':'updates';
    items.push({
      id:`alert:${alert.id}`,
      alertId:alert.id,
      kind,
      title:alert.title,
      body:alert.body,
      context:trial?`${trial.id} · ${trial.city}`:linkedInquiry?`${linkedInquiry.id} · ${linkedInquiry.trialId}`:alert.type==='handoff'?'Handoff or EMR task':'Operational workflow',
      owner:alert.recipients.join(', '),
      due:'No deadline',
      source:alert.source,
      tone:alert.tone,
      unread:alert.unread&&!inboxReadIds.has(`alert:${alert.id}`),
      targetView:alert.type==='handoff'?'inquiries':alert.type==='verification'?'verification':'explore',
      trialId:trial?.id||trialById(linkedInquiry?.trialId)?.id,
      inquiryId:linkedInquiry?.id
    });
  });
  for(const [trialId,threads] of trialRoomThreads.entries()){
    const trial=trialById(trialId);
    threads.forEach(thread=>{
      if(thread.resolution==='task')return;
      const resolved=thread.resolution&&!['unresolved'].includes(thread.resolution);
      items.push({
        id:`thread:${thread.id}`,
        kind:'messages',
        title:thread.resolution?roomResolutionLabels[thread.resolution]:'Question awaiting response',
        body:thread.resolutionNote||thread.question,
        context:`${trialId}${trial?` · ${trial.city}`:''}`,
        owner:resolved?'No next action':'Verified site coordinator',
        due:resolved?'Resolved this session':'No due date assigned',
        source:thread.resolution?`${thread.resolvedRole} · Trial room`:`${thread.authorRole} · Trial room`,
        tone:thread.resolution==='answer'?'good':thread.resolution==='correction'?'bad':thread.resolution==='unresolved'?'warn':'neutral',
        unread:!inboxReadIds.has(`thread:${thread.id}`),
        targetView:'room',
        trialId,
        threadId:thread.id
      });
    });
  }
  inquiries.forEach(inquiry=>{
    if(['closed','unable'].includes(inquiry.status))return;
    const representedByAlert=alerts.some(alert=>alert.body.includes(inquiry.id));
    if(inquiry.status==='acknowledged'&&representedByAlert)return;
    const trial=trialById(inquiry.trialId);
    const kind=inquiry.status==='acknowledged'?'messages':'tasks';
    items.push({
      id:`inquiry:${inquiry.id}`,
      kind,
      title:inquiry.status==='acknowledged'?'Referral or inquiry acknowledged':`${statusHuman[inquiry.status]||inquiry.status} handoff`,
      body:inquiry.question,
      context:`${inquiry.id} · ${inquiry.trialId}`,
      owner:inquiry.owner||'Unassigned',
      due:dueLabel(inquiry.due),
      source:`${inquiry.route} · human workflow state`,
      tone:inquiry.due<today?'bad':inquiry.status==='sent'?'warn':'neutral',
      unread:kind==='messages'&&!inboxReadIds.has(`inquiry:${inquiry.id}`),
      targetView:'inquiries',
      trialId:trial?.id,
      inquiryId:inquiry.id
    });
  });
  trials.filter(trial=>trial.due||trial.discrepancy).forEach(trial=>{
    items.push({
      id:`verification:${trial.id}`,
      kind:'tasks',
      title:trial.discrepancy?'Resolve registry and site conflict':'Confirm current India-site state',
      body:trial.discrepancy?`${trial.verifyLabel}; registry remains ${trial.registryStatus}.`:`${trial.verifyLabel}. Obtain an authorised site assertion or keep the state unknown.`,
      context:`${trial.id} · ${trial.city}, ${trial.state}`,
      owner:'Research coordinator',
      due:'Not scheduled',
      source:`${trial.source} · registry updated ${formatDate(trial.registryUpdated)}`,
      tone:trial.discrepancy?'bad':'warn',
      unread:false,
      targetView:'verification',
      trialId:trial.id
    });
  });
  return items;
}

function renderAlerts() {
  const items=buildInboxItems();
  const counts={
    updates:items.filter(item=>item.kind==='updates').length,
    messages:items.filter(item=>item.kind==='messages').length,
    tasks:items.filter(item=>item.kind==='tasks').length
  };
  $('#inbox-update-count').textContent=counts.updates;
  $('#inbox-message-count').textContent=counts.messages;
  $('#inbox-task-count').textContent=counts.tasks;
  const unread=items.filter(item=>item.unread).length;
  $('#alert-count').textContent=unread;
  $$('[data-inbox-kind]').forEach(button=>{
    const active=button.dataset.inboxKind===currentInboxKind;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
  });
  const labels={
    updates:['Updates','Source and workflow changes · unread first'],
    messages:['Messages','Human responses and conversation states · newest first'],
    tasks:['Tasks','Owned next steps · overdue and assigned work first']
  };
  $('#inbox-stream-title').textContent=labels[currentInboxKind][0];
  $('#inbox-stream-summary').textContent=labels[currentInboxKind][1];
  const rows=items
    .filter(item=>item.kind===currentInboxKind)
    .sort((a,b)=>Number(b.unread)-Number(a.unread)||Number(b.due.startsWith('Overdue'))-Number(a.due.startsWith('Overdue')));
  $('#mark-alerts-read').disabled=!rows.some(item=>item.unread);
  const visibleRows=rows.slice(0,60);
  $('#inbox-visible-count').innerHTML=`<span class="status-dot"></span>${rows.length} visible`;
  const stream=$('#inbox-stream');
  stream.innerHTML=visibleRows.length?visibleRows.map(item=>`
    <article class="inbox-row ${item.unread?'unread':''}" role="listitem" data-inbox-id="${item.id}">
      <div class="inbox-row-symbol ${item.tone==='bad'?'bad':item.tone==='warn'?'warn':item.tone==='good'?'good':''}">${icon(item.kind==='updates'?'database':item.kind==='messages'?'send':'check')}</div>
      <div class="inbox-row-content">
        <div class="inbox-row-title"><span>${item.kind.slice(0,-1)}</span><strong>${escapeHTML(item.title)}</strong></div>
        <p>${escapeHTML(item.body)}</p>
        <dl class="inbox-row-facts">
          <div><dt>Context</dt><dd>${escapeHTML(item.context)}</dd></div>
          <div><dt>Owner</dt><dd>${escapeHTML(item.owner)}</dd></div>
          <div><dt>Due state</dt><dd>${escapeHTML(item.due)}</dd></div>
          <div><dt>Source</dt><dd>${escapeHTML(item.source)}</dd></div>
        </dl>
      </div>
      <div class="inbox-row-actions">
        <span class="status-pill ${item.unread?'good':item.tone==='bad'?'bad':'neutral'}"><span class="status-dot"></span>${item.unread?'Unread':item.kind==='tasks'?item.due:'Read'}</span>
        <button class="button small" type="button" data-inbox-open="${item.id}">Open context</button>
        ${item.unread?`<button class="button small ghost" type="button" data-inbox-read="${item.id}">Mark read</button>`:''}
      </div>
    </article>`).join('')+(rows.length>visibleRows.length?`<div class="notice"><strong>${rows.length-visibleRows.length} more tasks.</strong> Open the attached verification or handoff context to work the complete queue.</div>`:''):`<div class="empty-state"><div class="empty-symbol">${icon(currentInboxKind==='updates'?'database':currentInboxKind==='messages'?'send':'check')}</div><h2>No ${labels[currentInboxKind][0].toLowerCase()}</h2><p>This browser-session workspace has no items in this Inbox view.</p></div>`;
  const markRead=item=>{
    inboxReadIds.add(item.id);
    if(item.alertId){
      const alert=alerts.find(candidate=>candidate.id===item.alertId);
      if(alert)alert.unread=false;
    }
  };
  $$('[data-inbox-read]',stream).forEach(button=>button.addEventListener('click',()=>{
    const item=items.find(candidate=>candidate.id===button.dataset.inboxRead);
    if(item)markRead(item);
    renderAlerts();
  }));
  $$('[data-inbox-open]',stream).forEach(button=>button.addEventListener('click',()=>{
    const item=items.find(candidate=>candidate.id===button.dataset.inboxOpen);
    if(!item)return;
    markRead(item);
    if(item.targetView==='room'&&item.trialId){
      $('#trial-search').value=item.trialId;
      $('#cancer-filter').value='all';
      $('#verify-filter').value='all';
      $('#state-filter').value='all';
      selectedTrialId=item.trialId;
      profileOriginId=item.trialId;
      profileOpen=true;
      activeTab='room';
      renderTrials();
      switchView('explore');
      $(`#thread-${item.threadId}`)?.focus({preventScroll:false});
    }else if(item.targetView==='verification'&&item.trialId){
      selectedVerificationId=item.trialId;
      switchView('verification');
    }else if(item.targetView==='inquiries'){
      switchView('inquiries');
    }else if(item.trialId){
      $('#trial-search').value=item.trialId;
      selectedTrialId=item.trialId;
      profileOriginId=item.trialId;
      profileOpen=true;
      activeTab='overview';
      renderTrials();
      switchView('explore');
    }else{
      renderAlerts();
      showToast('This item has no more specific linked context in the current validation data.');
    }
  }));
  const followed=trials.filter(trial=>followedTrialIds.has(trial.id));
  $('#followed-count').textContent=followed.length;
  $('#followed-trials').innerHTML=followed.length?followed.map(trial=>`<div class="source-fact"><span><strong style="display:block;color:var(--ink-2)">${trial.id}</strong>${trial.city} · ${trial.verifyLabel}</span><button class="button small ghost" type="button" data-unfollow="${trial.id}">Stop</button></div>`).join(''):'<div class="empty-state"><h2>No followed trials</h2><p>Open a trial and choose Follow trial.</p></div>';
  $$('[data-unfollow]').forEach(button=>button.addEventListener('click',()=>{
    followedTrialIds.delete(button.dataset.unfollow);
    renderAlerts();
    if(selectedTrialId===button.dataset.unfollow&&profileOpen)renderDetail(trialById(selectedTrialId));
    showToast(`Stopped alerts for ${button.dataset.unfollow}.`);
  }));
  renderHome();
}

function renderCandidates() {
  const filter=$('#candidate-filter')?.value||'all';
  $$('[data-candidate-state]').forEach(row=>{
    row.style.display=filter==='all'||row.dataset.candidateState===filter?'grid':'none';
  });
}

function renderVerification() {
  const queue=[...trials].filter(t=>t.due || t.discrepancy).sort((a,b)=>Number(b.discrepancy)-Number(a.discrepancy));
  const conflicts=queue.filter(t=>t.discrepancy).length;
  const verifiedThisWeek=trials.filter(t=>t.verifyKey!=='no_authoritative_response').length;
  if(queue.length && !queue.some(t=>t.id===selectedVerificationId)) selectedVerificationId=queue[0].id;
  $('#verification-attention-count').textContent=queue.length;
  $('#verification-week-count').textContent=verifiedThisWeek;
  $('#verification-conflict-count').textContent=conflicts;
  $('#verification-open-pill').innerHTML=`<span class="status-dot"></span>${queue.length} open`;
  $('#verify-selected').disabled=queue.length===0;
  renderHome();
  $('#verification-list').innerHTML=queue.map((t,i)=>`<button class="queue-item ${t.id===selectedVerificationId?'active':''}" type="button" data-id="${t.id}"><span class="queue-rank">${String(i+1).padStart(2,'0')}</span><span class="queue-title"><strong>${t.title}</strong><span>${t.id} · ${t.city}</span></span><span class="queue-cell"><span>Registry</span><strong>${t.registryStatus}</strong></span><span class="queue-cell"><span>Site</span><strong>${t.verifyLabel}</strong></span>${statusPill(t)}</button>`).join('');
  $$('.queue-item').forEach(btn=>btn.addEventListener('click',()=>{selectedVerificationId=btn.dataset.id;renderVerification();}));
  const t=trialById(selectedVerificationId);
  if(!t || !queue.length) {
    $('#verification-workbench').innerHTML='<div class="panel-body"><h2 class="workbench-title">Queue is clear</h2><p style="color:var(--muted);font-size:11px">No synthetic assertion currently needs attention.</p></div>';
    return;
  }
  $('#verification-workbench').innerHTML=`<div class="panel-head"><div><h2>Verification workbench</h2><p>${t.id}</p></div><span class="spacer"></span>${statusPill(t)}</div><div class="panel-body"><h2 class="workbench-title">${t.title}</h2><div class="workbench-meta"><span class="tag">${t.city}</span><span class="tag">${t.registryAge} registry age</span>${t.discrepancy?'<span class="tag" style="background:var(--red-soft);color:var(--red)">source conflict</span>':''}</div><ul class="rule-list"><li><span class="check">1</span><span>Confirm the source is authorised to speak for site operations.</span></li><li><span class="check">2</span><span>Record exactly what was stated; keep registry value unchanged.</span></li><li><span class="check">3</span><span>Attach method, date, evidence reference, and expiry.</span></li><li><span class="check">4</span><span>Do not include patient or eligibility information.</span></li></ul><button class="button primary" style="width:100%;margin-top:16px" type="button" id="workbench-verify">${icon('check')}Record verification</button></div>`;
  $('#workbench-verify').addEventListener('click',()=>openVerification(t.id));
}

function renderInquiries() {
  const filter=$('#inquiry-filter')?.value || 'all';
  const rows=inquiries.filter(i=>filter==='all'||(filter==='open'&&!['closed','unable'].includes(i.status))||(filter==='closed'&&['closed','unable'].includes(i.status)));
  renderHome();
  const wrap=$('#inquiry-table-wrap');
  if(!rows.length){wrap.innerHTML='<div class="empty-state" style="margin:14px"><h2>No inquiries in this state</h2><p>Change the filter or create a general site inquiry from a trial record.</p></div>';return;}
  wrap.innerHTML=`<table class="inquiry-table"><thead><tr><th>Trial</th><th>Question</th><th>Owner</th><th>Due</th><th>State</th><th>Next action</th></tr></thead><tbody>${rows.map(i=>{const t=trialById(i.trialId);const next=i.status==='draft'?'Approve':i.status==='approved'?'Mark sent':i.status==='sent'?'Mark acknowledged':i.status==='acknowledged'?'Close':'Closed';return `<tr><td class="inquiry-trial" data-label="Trial"><strong>${t?.title||'Synthetic trial'}</strong><span>${i.id} · ${i.trialId}</span></td><td data-label="Question">${i.question}</td><td data-label="Owner">${i.owner}</td><td data-label="Due">${formatDate(i.due)}</td><td data-label="State"><span class="status-pill ${i.status==='closed'?'good':i.status==='sent'?'warn':'neutral'}"><span class="status-dot"></span>${statusHuman[i.status]}</span></td><td data-label="Next"><div class="stage-control"><button class="button small ${i.status==='acknowledged'?'success':''}" type="button" data-advance="${i.id}" ${['closed','unable'].includes(i.status)?'disabled':''}>${next}</button>${!['closed','unable'].includes(i.status)?`<button class="button small ghost" type="button" data-unable="${i.id}">Unable</button>`:''}</div></td></tr>`}).join('')}</tbody></table>`;
  $$('[data-advance]',wrap).forEach(btn=>btn.addEventListener('click',()=>advanceInquiry(btn.dataset.advance)));
  $$('[data-unable]',wrap).forEach(btn=>btn.addEventListener('click',()=>setInquiryUnable(btn.dataset.unable)));
}

function advanceInquiry(id){
  const item=inquiries.find(i=>i.id===id); if(!item)return;
  const next={draft:'approved',approved:'sent',sent:'acknowledged',acknowledged:'closed'}[item.status]; if(!next)return;
  const before=item.status; item.status=next;
  auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:05',actor:'A. Rao',title:`Inquiry marked ${statusHuman[next].toLowerCase()}`,note:`${id} · from ${statusHuman[before]}`,type:'task'});
  if(next==='acknowledged'){
    alerts.unshift({id:`ALT-${400+alerts.length}`,type:'handoff',tone:'good',title:'Referral acknowledged',body:`${id} was acknowledged. Formal screening remains with the trial team.`,source:'Human task event · just now',recipients:['Treating oncologist','Research coordinator'],unread:true});
    renderAlerts();
  }
  renderInquiries();renderAudit();showToast(`${id} moved to ${statusHuman[next]}.`);
}
function setInquiryUnable(id){const item=inquiries.find(i=>i.id===id);if(!item)return;item.status='unable';auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:06',actor:'A. Rao',title:'Inquiry closed — unable to contact',note:id,type:'task'});renderInquiries();renderAudit();showToast(`${id} closed as unable to contact.`);}

function renderAudit(){
  $('#audit-list').innerHTML=auditEvents.map(e=>`<div class="audit-row"><time>${e.at}</time><span class="audit-actor">${e.actor}</span><span class="audit-event"><strong>${e.title}</strong><span>${e.note}</span></span><span class="audit-type"><span class="tag">${e.type}</span><br><span style="font-family:var(--font-data);color:var(--muted);font-size:8px">${e.id}</span></span></div>`).join('');
}

function renderSources(){
  const c=$('#ctri-source');
  c.classList.toggle('unavailable',ctriOutage);
  const pill=c.querySelector('.status-pill');
  pill.className=`status-pill ${ctriOutage?'bad':'warn'}`;
  pill.innerHTML=`<span class="status-dot"></span>${ctriOutage?'Unavailable · demo':'Permission unresolved'}`;
  $('#source-alert').classList.toggle('visible',ctriOutage);
  $('#toggle-outage').innerHTML=`${icon(ctriOutage?'refresh':'warning')}${ctriOutage?'Restore CTRI demo':'Simulate CTRI outage'}`;
}

function copyText(text,message){
  if(navigator.clipboard?.writeText){navigator.clipboard.writeText(text).then(()=>showToast(message)).catch(()=>showToast('Copy is unavailable in this browser context.'));}
  else showToast('Copy is unavailable in this browser context.');
}

const viewLabels={
  home:'Home',guide:'How to use',explore:'Trials',case:'Patients',candidates:'Patient reviews',
  verification:'Verification tasks',inquiries:'Messages and referrals',alerts:'Inbox',board:'Tumour board',
  activity:'Audit activity',integrations:'EMR integration',analytics:'Operations analytics',
  sources:'Registry sources',priorities:'Feature priorities'
};
const primaryViewFor={
  home:'home',guide:'home',priorities:'home',integrations:'home',analytics:'home',sources:'home',activity:'home',
  explore:'explore',verification:'alerts',inquiries:'alerts',case:'case',candidates:'case',board:'case',alerts:'alerts'
};

function switchView(target){
  if(!viewLabels[target]) target='home';
  const moveFocus=Boolean(document.activeElement?.closest('.view'));
  const primaryTarget=primaryViewFor[target]||target;
  $$('.nav-button').forEach(button=>{
    const active=button.dataset.target===primaryTarget;
    button.classList.toggle('active',active);
    if(active) button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  });
  $$('.view').forEach(view=>view.classList.toggle('active',view.dataset.view===target));
  $('#crumb-title').textContent=viewLabels[target];
  document.title=`${viewLabels[target]} — Trial Relay`;
  history.replaceState(null,'',`#${target}`);
  window.scrollTo({top:0,behavior:'instant'});
  if(target==='case')renderCase();
  if(target==='candidates')renderCandidates();
  if(target==='verification')renderVerification();
  if(target==='inquiries')renderInquiries();
  if(target==='alerts')renderAlerts();
  if(target==='board')renderBoard();
  if(target==='activity')renderAudit();
  if(target==='sources')renderSources();
  if(moveFocus){
    const heading=$(`.view[data-view="${target}"] h1`);
    if(heading){
      heading.setAttribute('tabindex','-1');
      heading.focus({preventScroll:true});
    }
  }
}

$('#inquiry-form').addEventListener('submit',(event)=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity())return;
  const trialId=event.currentTarget.dataset.trialId;
  const id=`INQ-${1043+inquiries.length}`;
  inquiries.unshift({id,trialId,question:$('#inquiry-type').value,owner:$('#inquiry-owner').value.split(' — ')[0],due:$('#inquiry-due').value,route:$('#inquiry-route').value,status:'draft',created:today});
  auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:02',actor:'A. Rao',title:'General site inquiry drafted',note:`${id} · ${trialId} · no patient data`,type:'task'});
  $('#inquiry-dialog').close(); renderInquiries(); renderAudit(); showToast(`${id} created as a draft. Human approval is still required.`);
});

$('#verification-form').addEventListener('submit',(event)=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity())return;
  const t=trialById(event.currentTarget.dataset.trialId); if(!t)return;
  const key=$('#verification-status').value;
  const mapping={verified_recruiting:['Verified recruiting','good'],verified_not_recruiting:['Verified not recruiting','neutral'],temporarily_paused:['Temporarily paused','bad'],no_authoritative_response:['No authoritative response','warn'],registry_site_discrepancy:['Registry/site discrepancy','bad']};
  const previousLabel=t.verifyLabel;
  t.verifyKey=key;t.verifyLabel=mapping[key][0];t.verifyTone=mapping[key][1];t.verifiedAt=$('#verification-date').value;t.verifyAge='recorded today';t.verifyMethod=`${$('#verification-source').value} · ${$('#verification-method').value}`;t.discrepancy=key==='registry_site_discrepancy';t.due=['no_authoritative_response','registry_site_discrepancy','temporarily_paused'].includes(key);
  auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:04',actor:'A. Rao',title:'Site verification assertion recorded',note:`${t.id} · ${t.verifyLabel}`,type:'verification'});
  if(followedTrialIds.has(t.id)&&previousLabel!==t.verifyLabel){
    alerts.unshift({id:`ALT-${400+alerts.length}`,type:'verification',tone:t.verifyTone,title:'Site verification changed',body:`${t.id} changed from ${previousLabel} to ${t.verifyLabel}. Registry status remains separate.`,source:'Authorised verifier · just now',recipients:['Treating oncologist','Research coordinator','Site steward'],unread:true});
  }
  $('#verification-dialog').close(); renderTrials();renderVerification();renderAlerts();renderAudit();showToast(`Verification saved for ${t.id}. Registry value remains unchanged.`);
});

$('#packet-form').addEventListener('submit',(event)=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity())return;
  packetDrafted=true;
  const id=`REF-${2200+inquiries.length}`;
  inquiries.unshift({id,trialId:caseSelectedTrialId,question:'Review referral packet for formal site screening',owner:$('#packet-owner').value.split(' — ')[0],due:$('#packet-expiry').value,route:$('#packet-recipient').value,status:'draft',created:today});
  auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:21',actor:'A. Rao',title:'Referral packet manifest drafted',note:`${id} · 3 selected EMR references · not released`,type:'packet'});
  $('#packet-dialog').close();
  renderInquiries();
  renderAudit();
  showToast(`${id} created as a draft. Source documents remain in the EMR; human release is required.`);
});

$('#board-form').addEventListener('submit',(event)=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity())return;
  boardDecisionRecorded=true;
  auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:24',actor:'Board recorder',title:'Human board disposition recorded',note:`${$('#board-record-ref').value} · ${$('#board-disposition').value}`,type:'board'});
  $('#board-dialog').close();
  renderBoard();
  renderAudit();
  showToast('Human board disposition recorded. Clinical decision content was not generated or rewritten.');
});

$('#alert-rule-form').addEventListener('submit',(event)=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity())return;
  const recipients=$$('input[name="alert-recipient"]:checked').map(input=>input.value);
  const channels=$$('input[name="alert-channel"]:checked').map(input=>input.value);
  if(!recipients.length||!channels.length){
    showToast('Choose at least one recipient and one delivery channel.');
    return;
  }
  const trialId=$('#alert-trial').value;
  followedTrialIds.add(trialId);
  alertRules+=1;
  alerts.unshift({id:`ALT-${306+alertRules}`,type:'trial',tone:'neutral',title:'New alert rule saved',body:`${$('#alert-trigger').value} for ${trialId}.`,source:`Rule ${alertRules} · synthetic`,recipients,unread:false});
  auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 10:12',actor:'A. Rao',title:'Operational alert rule created',note:`${trialId} · ${recipients.join(', ')} · ${channels.join(', ')}`,type:'alert'});
  $('#alert-rule-dialog').close();
  renderAlerts();
  renderAudit();
  showToast(`Alert rule saved for ${trialId}. No clinical recommendation was created.`);
});



$('#open-case-workspace').addEventListener('click',()=>{renderCase();switchView('case');});
$('#return-to-search').addEventListener('click',()=>switchView('explore'));
$('#prepare-packet').addEventListener('click',openPacket);
$('#add-to-board').addEventListener('click',()=>{renderBoard();switchView('board');showToast('Synthetic case added to the board agenda by a human action.');});
$('#preview-writeback').addEventListener('click',()=>$('#writeback-dialog').showModal());
$$('[data-preview-artifact]').forEach(button=>button.addEventListener('click',()=>openArtifact(button.dataset.previewArtifact)));
$('#confirm-source-fact').addEventListener('click',()=>{
  auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:19',actor:'Dr M. Shah',title:'Source assertion confirmed for workspace',note:`${currentArtifactName} · synthetic source`,type:'clinical-human'});
  $('#artifact-dialog').close();
  renderAudit();
  showToast('Clinician confirmation recorded with its source reference.');
});
$('#record-board-decision').addEventListener('click',()=>{$('#board-human-authored').checked=false;$('#board-dialog').showModal();});
$('#open-board-case').addEventListener('click',()=>{renderCase();switchView('case');});
$('#board-writeback').addEventListener('click',()=>$('#writeback-dialog').showModal());
$('#test-writeback').addEventListener('click',()=>$('#writeback-dialog').showModal());
$('#simulate-writeback').addEventListener('click',()=>{
  auditEvents.unshift({id:`EVT-${2050+auditEvents.length}`,at:'2026-09-13 09:27',actor:'EMR adapter',title:'Synthetic Task write-back completed',note:'Task/SYN-TASK-901 · version precondition accepted',type:'integration'});
  alerts.unshift({id:`ALT-${400+alerts.length}`,type:'handoff',tone:'good',title:'EMR task written',body:'Task/SYN-TASK-901 was written to the EMR and is waiting for treating-unit acknowledgement.',source:'EMR adapter · just now',recipients:['Treating unit','Board presenter','Research coordinator'],unread:true});
  $('#writeback-dialog').close();
  if(boardDecisionRecorded){
    $('#board-decision-state').textContent='Written to EMR · acknowledgement pending';
    $('#board-writeback').disabled=true;
    $('#board-lifecycle').innerHTML='<div class="board-stage done"><span class="board-stage-marker">1</span><div><strong>Case selected</strong><span>Treating oncologist · 13 Sep</span></div></div><div class="board-stage done"><span class="board-stage-marker">2</span><div><strong>Packet sources reviewed</strong><span>Presenter · synthetic artifacts</span></div></div><div class="board-stage done"><span class="board-stage-marker">3</span><div><strong>Board discussion completed</strong><span>Human participants</span></div></div><div class="board-stage done"><span class="board-stage-marker">4</span><div><strong>Decision reference signed</strong><span>MDT-DEMO-2026-0916-01</span></div></div><div class="board-stage done"><span class="board-stage-marker">5</span><div><strong>Task written to EMR</strong><span>Task/SYN-TASK-901 · acknowledgement pending</span></div></div>';
  }
  renderAlerts();
  renderAudit();
  showToast('Synthetic EMR write-back completed with an audit event.');
});
$('#role-select').addEventListener('change',(event)=>{
  currentRole=event.target.value;
  const role=roleProfiles[currentRole];
  $('#role-initial').textContent=role.initials;
  $('#role-description').textContent=role.label;
  if(profileOpen&&activeTab==='room')renderDetail(trialById(selectedTrialId));
  showToast(`Prototype role switched to ${role.label}. Production permissions require institutional policy.`);
});
$('#notification-button').addEventListener('click',()=>switchView('alerts'));
$('#analytics-period').addEventListener('click',()=>showToast('Analytics are synthetic and operational only; no clinical outcome data are included.'));
$('#start-guided-use').addEventListener('click',()=>switchView('explore'));
$('#open-guide-priorities').addEventListener('click',()=>switchView('priorities'));
$('#candidate-filter').addEventListener('change',renderCandidates);
$('#add-current-candidate').addEventListener('click',()=>showToast('SYN-2047 is already in the human-created review queue.'));
$$('[data-open-candidate]').forEach(button=>button.addEventListener('click',()=>{
  if(button.dataset.openCandidate==='SYN-2047'){
    renderCase();
    switchView('case');
  }else{
    showToast(`${button.dataset.openCandidate} is a synthetic read-only example. Its displayed state comes from a named human or trial team.`);
  }
}));
$('#new-alert-rule').addEventListener('click',()=>{$('#alert-safe').checked=false;$('#alert-rule-dialog').showModal();});
$('#mark-alerts-read').addEventListener('click',()=>{
  const visibleItems=buildInboxItems().filter(item=>item.kind===currentInboxKind);
  visibleItems.forEach(item=>{
    inboxReadIds.add(item.id);
    if(item.alertId){
      const alert=alerts.find(candidate=>candidate.id===item.alertId);
      if(alert)alert.unread=false;
    }
  });
  renderAlerts();
  showToast(`${visibleItems.length} visible ${currentInboxKind} marked read.`);
});
$$('[data-inbox-kind]').forEach(button=>button.addEventListener('click',()=>{
  currentInboxKind=button.dataset.inboxKind;
  renderAlerts();
  $('#inbox-stream-title').focus({preventScroll:true});
}));
$$('.close-dialog').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
$$('.nav-button').forEach(button=>button.addEventListener('click',()=>switchView(button.dataset.target)));
$$('[data-home-target],[data-context-target]').forEach(button=>button.addEventListener('click',()=>switchView(button.dataset.homeTarget||button.dataset.contextTarget)));
['trial-search','cancer-filter','verify-filter','state-filter','sort-results'].forEach(id=>$('#'+id).addEventListener(id==='trial-search'?'input':'change',renderTrials));
$('#clear-filters').addEventListener('click',clearFilters);
$('#command-trigger').addEventListener('click',()=>{switchView('explore');setTimeout(()=>$('#trial-search').focus(),0);});
$('#refresh-results').addEventListener('click',async()=>{await loadRegistrySnapshot();if(registryLoadState==='ready')showToast('ClinicalTrials.gov snapshot refreshed. Site confirmation remains separate.');});
$('#verify-selected').addEventListener('click',()=>openVerification(selectedVerificationId));
$('#new-inquiry-global').addEventListener('click',()=>openInquiry(selectedTrialId));
$('#inquiry-filter').addEventListener('change',renderInquiries);
$('#toggle-outage').addEventListener('click',()=>{ctriOutage=!ctriOutage;renderSources();showToast(ctriOutage?'CTRI outage simulated. Last snapshots are now stale.':'CTRI demo source restored.');});
$('#copy-audit').addEventListener('click',()=>copyText(auditEvents.map(e=>e.id).join(', '),'Audit event IDs copied.'));
document.addEventListener('keydown',(event)=>{
  if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){event.preventDefault();switchView('explore');setTimeout(()=>$('#trial-search').focus(),0);}
  if(event.key==='Escape')$$('dialog[open]').forEach(d=>d.close());
});

const initialHash=location.hash.slice(1);
$('#role-select').value='coordinator';
$('#role-initial').textContent=roleProfiles.coordinator.initials;
$('#role-description').textContent=roleProfiles.coordinator.label;
$('#trial-search').value='';
$('#cancer-filter').value='all';
$('#verify-filter').value='all';
$('#state-filter').value='all';
$('#sort-results').value='confidence';
renderTrials();renderCase();renderCandidates();renderVerification();renderInquiries();renderAlerts();renderBoard();renderAudit();renderSources();
switchView(viewLabels[initialHash]?initialHash:'home');
loadRegistrySnapshot();
