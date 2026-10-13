import {useState} from 'react';
import {Home, Layers3, Settings, Download, UserRound, Play, ShieldCheck, ChevronRight, Github, CircleHelp, CheckCircle2} from 'lucide-react';

type Page = 'Home'|'Profile'|'Updates'|'Account'|'Einstellungen';
type Profile = {id:string;name:string;edition:string;tag:string};
const profiles:Profile[]=[
  {id:'void',name:'VOID Client',edition:'Minecraft 1.21.11 · Fabric',tag:'OFFICIAL'},
  {id:'vanilla',name:'Vanilla',edition:'Minecraft · Standard',tag:'VANILLA'},
  {id:'fabric',name:'Fabric',edition:'Minecraft · Modded',tag:'CUSTOM'}
];
const icons={Home,Profile:Layers3,Updates:Download,Account:UserRound,Einstellungen:Settings};
const githubRepo=''; // Später auf owner/repo setzen, z. B. example/void-launcher
export default function App(){
 const [page,setPage]=useState<Page>('Home');
 const [profile,setProfile]=useState(localStorage.getItem('void-profile')||'void');
 const [ram,setRam]=useState(Number(localStorage.getItem('void-ram')||4));
 const [message,setMessage]=useState('');
 const [checking,setChecking]=useState(false);
 const selected=profiles.find(p=>p.id===profile)||profiles[0];
 function choose(id:string){setProfile(id);localStorage.setItem('void-profile',id)}
 async function checkUpdates(){
  if(!githubRepo){setMessage('Trage zuerst dein GitHub-Repository in src/App.tsx ein.');return}
  setChecking(true);setMessage('Suche nach Updates ...');
  try{const response=await fetch(`https://api.github.com/repos/${githubRepo}/releases/latest`,{headers:{Accept:'application/vnd.github+json'}});
   if(!response.ok)throw new Error(`GitHub API: ${response.status}`);
   const release=await response.json() as {tag_name?:string;html_url?:string};
   setMessage(`Neueste veröffentlichte Version: ${release.tag_name||'unbekannt'}. Download über GitHub Releases.`);
  }catch(e){setMessage(`Update-Prüfung fehlgeschlagen: ${String(e)}`)}finally{setChecking(false)}
 }
 return <div className="shell"><aside className="sidebar"><div className="brand"><img src="/assets/void-icon.png" alt="VOID"/><div><strong>VOID</strong><span>LAUNCHER</span></div></div>
  <div className="section-label">NAVIGATION</div><nav>{(Object.keys(icons) as Page[]).map(p=>{const Icon=icons[p];return <button key={p} className={'nav-item '+(page===p?'active':'')} onClick={()=>{setPage(p);setMessage('')}}><Icon size={18}/>{p}{page===p&&<ChevronRight size={15} className="chevron"/>}</button>})}</nav>
  <div className="sidebar-bottom"><div className="status"><span className="dot"/>Launcher 0.1.0 · Alpha</div><div className="mini">VOID SOFTWARE<br/>BUILT FOR PLAYERS</div></div></aside>
  <main className="main"><header><div className="breadcrumbs">VOID LAUNCHER <span>/</span> {page.toUpperCase()}</div><button className="account-pill" onClick={()=>setPage('Account')}><UserRound size={17}/> Nicht angemeldet</button></header>
   {page==='Home'&&<><div className="hero"><div className="hero-copy"><div className="eyebrow"><span className="pulse"/> NEXT GENERATION MINECRAFT</div><h1>ENTER THE<br/><em>VOID.</em></h1><p>Dein Minecraft. Dein Client. Dein Universum.</p><button className="play" onClick={()=>setMessage('Minecraft-Start ist noch nicht implementiert. Als Nächstes verbinden wir Microsoft-Login und die Installationsengine.')}><Play size={20} fill="currentColor"/> SPIELEN <ChevronRight size={18}/></button><small>Ausgewählt: {selected.name} · {selected.edition}</small></div><img className="hero-logo" src="/assets/void-icon.png" alt="VOID Logo"/></div>
    <div className="columns"><section className="panel"><div className="panel-title">SPIELPROFIL <button onClick={()=>setPage('Profile')}>Alle Profile <ChevronRight size={14}/></button></div><div className="profile-feature"><div className="profile-symbol">V</div><div><b>{selected.name}</b><p>{selected.edition}</p></div><span className="tag">{selected.tag}</span></div></section><section className="panel"><div className="panel-title">SYSTEM STATUS <ShieldCheck size={18}/></div><div className="status-row"><span>Launcher-Oberfläche</span><b className="green">BEREIT</b></div><div className="status-row"><span>Microsoft-Login</span><b>AUSSTEHEND</b></div><div className="status-row"><span>Minecraft-Installation</span><b>AUSSTEHEND</b></div></section></div>
   </>}
   {page==='Profile'&&<div className="page-content"><div className="eyebrow">GAME MANAGEMENT</div><h2>Deine Profile</h2><p>Wähle aus, welche Minecraft-Installation du später starten möchtest.</p><div className="profile-grid">{profiles.map(p=><button className={'profile-card '+(profile===p.id?'selected':'')} key={p.id} onClick={()=>choose(p.id)}><div className="profile-symbol">{p.id==='void'?'V':p.id==='fabric'?'F':'M'}</div><span className="tag">{p.tag}</span><h3>{p.name}</h3><p>{p.edition}</p>{profile===p.id&&<span className="chosen"><CheckCircle2 size={15}/> Ausgewählt</span>}</button>)}</div><p className="note">Profilwahl ist bereits gespeichert. Minecraft-Installationen und eigene Profile folgen im Backend.</p></div>}
   {page==='Updates'&&<div className="page-content"><div className="eyebrow">VERSION CONTROL</div><h2>Updates</h2><p>GitHub Releases bilden später die zentrale Quelle für Launcher- und Client-Updates.</p><div className="panel update-panel"><Download size={28}/><div><h3>VOID Launcher 0.1.0</h3><p>Lokale Entwicklungsfassung</p></div><button className="secondary" disabled={checking} onClick={checkUpdates}>{checking?'Prüfe ...':'Nach Updates suchen'}</button></div><p className="note">Diese Version prüft nur das neueste GitHub-Release. Automatischer Download, Signaturprüfung und Installation folgen.</p></div>}
   {page==='Account'&&<div className="page-content"><div className="eyebrow">IDENTITY</div><h2>Microsoft Account</h2><p>Später meldest du dich hier sicher mit deinem Microsoft-Konto an, um Minecraft Java Edition zu starten.</p><div className="panel account-panel"><UserRound size={38}/><h3>Kein Account verbunden</h3><p>Offizieller Microsoft OAuth-Login wird im nächsten Entwicklungsschritt implementiert.</p><button className="secondary" onClick={()=>setMessage('Der Microsoft-Login ist noch nicht eingerichtet. Es werden keine Zugangsdaten abgefragt.')}>Microsoft-Login (in Vorbereitung)</button></div></div>}
   {page==='Einstellungen'&&<div className="page-content"><div className="eyebrow">PREFERENCES</div><h2>Einstellungen</h2><p>Passe die später verwendeten Startparameter an.</p><div className="panel settings-panel"><div><h3>Arbeitsspeicher</h3><p>Geplante RAM-Zuweisung für Minecraft</p></div><div className="range"><b>{ram} GB</b><input type="range" min="2" max="16" step="1" value={ram} onChange={e=>{setRam(+e.target.value);localStorage.setItem('void-ram',e.target.value)}}/></div></div><div className="panel settings-panel"><div><h3>Entwicklungsmodus</h3><p>Aktuelle Version: 0.1.0 · Tauri + React</p></div><Github size={22}/></div></div>}
   {message&&<div className="toast" role="status"><CircleHelp size={18}/><span>{message}</span><button onClick={()=>setMessage('')}>×</button></div>}
   <footer><span>VOID LAUNCHER <i>•</i> ALPHA 0.1.0</span><span>CRAFTED FOR THE VOID</span></footer>
  </main></div>
}
