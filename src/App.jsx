import {useState,useEffect} from 'react'
import {SV,BB,ADDR,PH,dur,tm,dlab,iso,ld,save,slots,cal,dl,TERMS} from './data.js'

const TITLES={'':'Barbers and Braids in Durban',services:'Services and Prices',about:'About Us',book:'Book and Contact',terms:'Terms and Conditions',privacy:'Privacy Policy'}
const Row=({s})=><div className="rw"><div><b>{s[1]}</b><br/><span className="mu">{dur(s[3])}</span></div><div className="pr">R{s[2]}</div><a className="btn sm" href={`#/book/${s[0]}`}>Book</a></div>
const Hours=()=><>Mon to Fri: 08:00 to 18:00<br/>Saturday: 08:00 to 16:00<br/>Sunday: Closed</>
const Braid=()=><svg viewBox="0 0 320 320" role="img" aria-label="Braid emblem"><circle cx="160" cy="160" r="150" fill="#12564a"/><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="15"><path d="M100 60l30 34-30 34 30 34-30 34 30 34-30 34" stroke="#f0b429"/><path d="M160 60l-30 34 30 34-30 34 30 34-30 34 30 34" stroke="#eef2ee"/><path d="M160 60l30 34-30 34 30 34-30 34 30 34-30 34" stroke="#f0b429"/><path d="M220 60l-30 34 30 34-30 34 30 34-30 34 30 34" stroke="#eef2ee"/></g></svg>
const Logo=()=><svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#f0b429"/><path d="M13 8l14 21M27 8L13 29" stroke="#0e2a24" strokeWidth="3" strokeLinecap="round"/><circle cx="12" cy="32" r="3.5" fill="none" stroke="#0e2a24" strokeWidth="2.5"/><circle cx="28" cy="32" r="3.5" fill="none" stroke="#0e2a24" strokeWidth="2.5"/></svg>

function Header({r}){
  const [open,setOpen]=useState(false)
  useEffect(()=>setOpen(false),[r])
  const L=[['','Home'],['services','Services'],['about','About'],['book','Contact']]
  return <header><div className="w hb">
    <a className="logo" href="#/" aria-label="Roots & Fade Studio home"><Logo/><span>Roots &amp; Fade</span></a>
    <nav className={open?'open':''} aria-label="Main">{L.map(([k,n])=><a key={k} href={`#/${k}`} className={r===k?'on':''}>{n}</a>)}</nav>
    <div className="hr"><a className="btn g sm" href="#/book">Book Now</a><button id="mb" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(o=>!o)}>&#9776;</button></div>
  </div></header>
}
const Footer=()=><footer><div className="w"><div className="fg">
  <div><h3>Roots &amp; Fade Studio</h3><p>Sharp cuts and beautiful braids, rooted in Durban since 2016.</p><a className="btn g sm" href="#/book">Book Now</a></div>
  <div><h3>Explore</h3><a href="#/">Home</a><a href="#/services">Services</a><a href="#/about">About</a><a href="#/book">Contact and booking</a></div>
  <div><h3>Visit us</h3><p style={{margin:0}}>27 Florida Road, Morningside<br/>Durban, 4001</p><a href="tel:+27315550142">{PH}</a><a href="mailto:hello@rootsandfade.co.za">hello@rootsandfade.co.za</a></div>
  <div><h3>Opening hours</h3><p style={{margin:0}}><Hours/></p></div>
  <div><h3>Follow us</h3>{[['Instagram','https://www.instagram.com/'],['Facebook','https://www.facebook.com/'],['TikTok','https://www.tiktok.com/'],['WhatsApp','https://wa.me/27315550142']].map(([n,u])=><a key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}</div>
</div><div className="fb"><div>&copy; {new Date().getFullYear()} Roots &amp; Fade Studio. All rights reserved.</div><span><a href="#/terms">Terms &amp; Conditions</a><a href="#/privacy">Privacy Policy</a></span></div></div></footer>

function Modal(){
  const [show,setShow]=useState(false)
  const shut=()=>{setShow(false);try{sessionStorage.setItem('rfm','1')}catch{}}
  useEffect(()=>{
    const t=setTimeout(()=>{let s=null;try{s=sessionStorage.getItem('rfm')}catch{};if(!s)setShow(true)},4000)
    const k=e=>e.key==='Escape'&&shut()
    addEventListener('keydown',k);return()=>{clearTimeout(t);removeEventListener('keydown',k)}
  },[])
  if(!show)return null
  return <div className="ov" onClick={e=>e.target===e.currentTarget&&shut()}><div className="md" role="dialog" aria-modal="true" aria-labelledby="mt">
    <button className="x" aria-label="Close offer" onClick={shut} autoFocus>&times;</button>
    <h2 id="mt">10% off your first visit</h2><p>New to Roots &amp; Fade? Use this code when you book online.</p>
    <div className="code">FIRST10</div><br/><a className="btn" href="#/book" onClick={shut}>Book and save 10%</a><br/><br/><button className="btn o sm" onClick={shut}>No thanks</button>
  </div></div>
}

const Home=()=><>
  <section className="hero"><div className="w hg"><div><h1>Sharp cuts and beautiful braids, rooted in Durban.</h1><p>Barbers and braiders under one roof in Morningside. Walk in looking good, walk out feeling even better.</p><div className="ba"><a className="btn g" href="#/book">Book your chair</a><a className="btn o" href="#/services">See services and prices</a></div></div><Braid/></div></section>
  <section className="s"><div className="w"><h2>Why people come back</h2><div className="gr"><div className="cd"><h3>Barbers who listen</h3><p>Every cut starts with a chat about what you want and what suits you.</p></div><div className="cd"><h3>Braids without the pain</h3><p>Gentle parting, light tension and protective styles that last.</p></div><div className="cd"><h3>The full finish</h3><p>Hot towels, line-ups and quality products come standard.</p></div></div></div></section>
  <section className="s" style={{paddingTop:0}}><div className="w"><h2>Popular services</h2><div className="gr">{['fade','combo','knot'].map(i=>{const s=SV.find(x=>x[0]===i);return <div className="cd" key={i}><h3>{s[1]}</h3><p className="mu">{dur(s[3])}</p><p className="pr">R{s[2]}</p><a className="btn sm" href={`#/book/${i}`}>Book this</a></div>})}</div></div></section>
  <section className="s" style={{paddingTop:0}}><div className="w"><h2>What clients say</h2><div className="gr">{[['Best fade in Durban. Thabo gets it right every single time.','Lwazi, Musgrave'],['My knotless braids lasted six weeks and my scalp felt great. Naledi is an artist.','Ayanda, Berea'],['Took my son for his first cut. Patient, quick and he left smiling.','Michael, Morningside']].map(([q,n])=><div className="cd" key={n}><p>{q}</p><b>{n}</b></div>)}</div></div></section>
  <section className="band"><div className="w"><h2>Ready for a fresh look?</h2><a className="btn g" href="#/book">Book now</a></div></section>
</>

const Services=()=><section className="s"><div className="w"><h1>Services and prices</h1><p className="mu">All prices in rand. Braid times depend on hair length and thickness.</p>
  <h2 style={{marginTop:32}}>Barber</h2>{SV.filter(s=>s[4]==='b').map(s=><Row key={s[0]} s={s}/>)}
  <h2 style={{marginTop:40}}>Braids</h2>{SV.filter(s=>s[4]==='r').map(s=><Row key={s[0]} s={s}/>)}
  <p className="mu" style={{marginTop:24}}>First visit? Use code FIRST10 for 10% off when you book.</p></div></section>

const About=()=><section className="s"><div className="w"><h1>Our story</h1><div className="lg"><p>Roots &amp; Fade began in 2016 with one chair in a family lounge in KwaZulu-Natal, where Naledi Zulu braided hair for neighbours on weekends. Word spread fast, and clients asked for a barber to sit beside her.</p><p>Today we are a full studio on Florida Road with four skilled professionals. We still work the way that first lounge did: unhurried, friendly and proud of every finished head.</p></div>
  <h2 style={{marginTop:40}}>Meet the team</h2><div className="gr">{BB.map(b=><div className="cd" key={b[0]}><div className="av">{b[1].split(' ').map(x=>x[0]).join('')}</div><h3>{b[1]}</h3><b>{b[2]}</b><p className="mu">{b[4]}</p></div>)}</div>
  <p style={{marginTop:32}}><a className="btn" href="#/book">Book with us</a></p></div></section>

const Legal=({k})=><section className="s"><div className="w lg">{k==='terms'?<><h1>Terms and Conditions</h1><p className="mu">Last updated 1 September 2026</p>{TERMS.map(([h,t])=><div key={h}><h3>{h}</h3><p>{t}</p></div>)}</>:<><h1>Privacy Policy</h1><p>We collect your name, phone number and email only to manage your appointment. We do not sell your information. We keep booking records for up to 12 months and handle them in line with the Protection of Personal Information Act (POPIA). To see, correct or delete your information, email hello@rootsandfade.co.za.</p></>}</div></section>

function Book({pre}){
  const [f,setF]=useState({svc:SV.some(s=>s[0]===pre)?pre:'',bar:'any',date:'',pick:null,cn:'',ph:'',em:'',promo:''})
  const [err,setErr]=useState(''),[done,setDone]=useState(null)
  const up=(k,v,reset)=>setF(p=>({...p,[k]:v,...(reset?{pick:null}:{})}))
  const s=SV.find(x=>x[0]===f.svc),n=new Date()
  const r=s&&f.date?slots(f.date,s,f.bar):undefined
  const price=s?(f.promo.trim().toUpperCase()==='FIRST10'?Math.round(s[2]*.9):s[2]):0
  const submit=e=>{
    e.preventDefault()
    if(!s)return setErr('Please choose a service.')
    if(!f.date)return setErr('Please choose a date.')
    if(f.pick===null)return setErr('Please pick a time.')
    if(f.cn.trim().length<2)return setErr('Please enter your full name.')
    if(f.ph.replace(/\D/g,'').length<9)return setErr('Please enter a valid phone number.')
    if(!/^\S+@\S+\.\S+$/.test(f.em.trim()))return setErr('Please enter a valid email address.')
    const hit=(slots(f.date,s,f.bar)||[]).find(x=>x[0]===f.pick)
    if(!hit){up('pick',null);return setErr('That time was just taken. Please pick another.')}
    const br=BB.find(b=>b[0]===(f.bar==='any'?hit[1][0]:f.bar)),ref='RF'+Date.now().toString(36).toUpperCase().slice(-6)
    const bk={d:f.date,s:f.pick,e:f.pick+s[3],b:br[0],ref,sv:s[1],br:br[1]}
    const first=f.cn.trim().split(' ')[0],cap=first.charAt(0).toUpperCase()+first.slice(1)
    save([...ld(),bk]);setErr('');setDone({bk,c:cal(bk),price,name:cap});scrollTo(0,0)
  }
  return <section className="s"><div className="w"><h1>Book your appointment</h1><div className="bk">
    {done?<div className="cd" role="status" style={{gridColumn:'1/-1'}}><h2>You're booked, {done.name}!</h2>
      <p><b>{done.bk.sv}</b> with {done.bk.br}<br/>{dlab(done.bk.d)}, {tm(done.bk.s)} to {tm(done.bk.e)}<br/>{ADDR}<br/>Price: R{done.price}, paid in store<br/>Booking reference: <b>{done.bk.ref}</b></p>
      <p className="mu">Keep your reference. To change your booking, call {PH} at least 24 hours before.</p>
      <div className="ba"><a className="btn" href={done.c.g} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a><button className="btn g" type="button" onClick={()=>dl(done.c.ics)}>Add to Apple Calendar (.ics)</button><a className="btn o" href="#/">Back to home</a></div></div>
    :<><div className="cd"><form onSubmit={submit} noValidate>
      <label htmlFor="svc">Service</label>
      <select id="svc" value={f.svc} onChange={e=>setF(p=>({...p,svc:e.target.value,bar:'any',pick:null}))}><option value="">Select a service</option>
        {[['b','Barber'],['r','Braids']].map(([t,l])=><optgroup key={t} label={l}>{SV.filter(x=>x[4]===t).map(x=><option key={x[0]} value={x[0]}>{x[1]} (R{x[2]}, {dur(x[3])})</option>)}</optgroup>)}</select>
      <label htmlFor="bar">Barber or braider</label>
      <select id="bar" value={f.bar} onChange={e=>up('bar',e.target.value,1)}><option value="any">Any available</option>{BB.filter(b=>!s||b[3]===s[4]).map(b=><option key={b[0]} value={b[0]}>{b[1]}</option>)}</select>
      <label htmlFor="date">Date</label>
      <input type="date" id="date" min={iso(n)} max={iso(new Date(+n+60*864e5))} value={f.date} onChange={e=>up('date',e.target.value,1)}/>
      <label>Time</label>
      <div className="sl" aria-live="polite">{r===undefined?<span className="mu">Choose a service and date to see available times.</span>:r===null?<span className="mu">We are closed on Sundays. Please pick another day.</span>:r.length?r.map(x=><button key={x[0]} type="button" className={'t'+(f.pick===x[0]?' on':'')} onClick={()=>up('pick',x[0])}>{tm(x[0])}</button>):<span className="mu">Fully booked. Try another day or person.</span>}</div>
      <label htmlFor="cn">Full name</label><input id="cn" autoComplete="name" value={f.cn} onChange={e=>up('cn',e.target.value)}/>
      <label htmlFor="ph">Phone number</label><input id="ph" type="tel" autoComplete="tel" value={f.ph} onChange={e=>up('ph',e.target.value)}/>
      <label htmlFor="em">Email</label><input id="em" type="email" autoComplete="email" value={f.em} onChange={e=>up('em',e.target.value)}/>
      <label htmlFor="promo">Promo code (optional)</label><input id="promo" placeholder="FIRST10" value={f.promo} onChange={e=>up('promo',e.target.value)}/>
      <div className="sm2">{s?<><b>{s[1]}</b> for {dur(s[3])}<br/>{f.date?dlab(f.date):'Pick a date'}{f.pick!==null&&` at ${tm(f.pick)} to ${tm(f.pick+s[3])}`}<br/>Price: <b>R{price}</b>{price<s[2]&&' (10% first-visit discount applied)'}</>:'Your booking summary will appear here.'}</div>
      <p className="er" role="alert">{err}</p><button className="btn" type="submit" style={{width:'100%'}}>Confirm booking</button></form></div>
    <div className="cd"><h3>Visit or contact us</h3><p>{ADDR}</p><p><a href="tel:+27315550142">{PH}</a><br/><a href="mailto:hello@rootsandfade.co.za">hello@rootsandfade.co.za</a></p><h3>Opening hours</h3><p><Hours/></p><p className="mu">Please arrive 5 minutes early. Payment is made in store.</p></div></>}
  </div></div></section>
}

export default function App(){
  const [h,setH]=useState(location.hash)
  useEffect(()=>{const f=()=>{setH(location.hash);scrollTo(0,0)};addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[])
  const p=h.split('/');let r=p[1]||'';if(!(r in TITLES))r=''
  useEffect(()=>{document.title=TITLES[r]+' | Roots & Fade Studio'},[r])
  return <>
    <Header r={r}/>
    <main>{r===''?<Home/>:r==='services'?<Services/>:r==='about'?<About/>:r==='book'?<Book key={p[2]||''} pre={p[2]}/>:<Legal k={r}/>}</main>
    <Footer/><Modal/>
  </>
}
