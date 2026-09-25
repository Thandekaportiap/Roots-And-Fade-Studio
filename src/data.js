export const ADDR='27 Florida Road, Morningside, Durban, 4001',PH='031 555 0142'
// [id, name, price (R), minutes, type: b=barber r=braids]
export const SV=[['cut','Classic Haircut',120,45,'b'],['fade','Skin or Taper Fade',150,45,'b'],['beard','Beard Trim and Shape',80,30,'b'],['kids','Kids Cut (under 12)',90,30,'b'],['combo','Cut and Beard Combo',190,75,'b'],['shave','Hot Towel Shave',110,30,'b'],['corn','Cornrows (straight back)',250,120,'r'],['box','Box Braids',550,240,'r'],['knot','Knotless Braids',750,300,'r'],['kb','Kids Braids',220,90,'r']]
export const BB=[['sipho','Sipho Dlamini','Master Barber','b','Twelve years of classic cuts, clean lines and honest advice.'],['thabo','Thabo Nkosi','Fade Specialist','b','Skin fades, tapers and sharp designs. Book early on Saturdays.'],['naledi','Naledi Zulu','Founder and Lead Braider','r','Started braiding in her family lounge. Knotless and box braids are her signature.'],['zanele','Zanele Mkhize','Braid Artist','r','Protective styles with a gentle hand. Kids are always welcome in her chair.']]
const OH=[null,[8,18],[8,18],[8,18],[8,18],[8,18],[8,16]] // Sunday closed
export const dur=m=>m>=60?Math.floor(m/60)+' h'+(m%60?' '+m%60+' min':''):m+' min'
export const tm=s=>String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0')
export const dlab=ds=>{const[y,m,d]=ds.split('-').map(Number);return new Date(y,m-1,d).toLocaleDateString('en-ZA',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
export const iso=x=>x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')
export const ld=()=>{try{return JSON.parse(localStorage.getItem('rf')||'[]')}catch{return[]}}
export const save=b=>{try{localStorage.setItem('rf',JSON.stringify(b))}catch{}}
// Returns null (closed) or [[startMinutes,[freePeopleIds]]]. Blocks overlapping bookings per person.
export function slots(ds,s,bar){const[y,m,d]=ds.split('-').map(Number),h=OH[new Date(y,m-1,d).getDay()];if(!h)return null
const bk=ld().filter(b=>b.d===ds),pool=BB.filter(b=>b[3]===s[4]&&(bar==='any'||b[0]===bar)).map(b=>b[0]),now=new Date(),out=[]
for(let t=h[0]*60;t+s[3]<=h[1]*60;t+=30){if(new Date(y,m-1,d,0,t)<=now)continue
const free=pool.filter(p=>!bk.some(b=>b.b===p&&t<b.e&&t+s[3]>b.s));if(free.length)out.push([t,free])}return out}
// Calendar event from the customer's selected booking. Shop is UTC+2 (SAST) all year, no DST.
export function cal(b){const[y,m,d]=b.d.split('-').map(Number),pad=n=>String(n).padStart(2,'0')
// Local (floating) wall-clock stamp for Google's template link — paired with ctz so the
// pre-save screen always shows the correct Africa/Johannesburg time, whatever the viewer's
// own calendar default is set to.
const loc=mins=>`${y}${pad(m)}${pad(d)}T${pad(mins/60|0)}${pad(mins%60)}00`
const stL=loc(b.s),enL=loc(b.e)
// Absolute UTC stamp (SAST minus 2 hours) for the .ics file, which has no viewer-timezone ambiguity.
const u=x=>new Date(Date.UTC(y,m-1,d,0,x-120)),f=x=>x.toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'')
const stU=f(u(b.s)),enU=f(u(b.e))
const title=b.sv+' at Roots & Fade Studio',det='With '+b.br+'. Booking ref '+b.ref+'. Please arrive 5 minutes early. To change your booking call '+PH+'.'
const e2=t=>t.replace(/\\/g,'\\\\').replace(/[,;]/g,'\\$&').replace(/\n/g,'\\n')
const g='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(title)+'&dates='+stL+'/'+enL+'&ctz=Africa/Johannesburg&details='+encodeURIComponent(det)+'&location='+encodeURIComponent(ADDR)
const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Roots and Fade Studio//Booking//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:'+b.ref+'@rootsandfade.co.za','DTSTAMP:'+f(new Date()),'DTSTART:'+stU,'DTEND:'+enU,'SUMMARY:'+e2(title),'LOCATION:'+e2(ADDR),'DESCRIPTION:'+e2(det),'BEGIN:VALARM','TRIGGER:-PT60M','ACTION:DISPLAY','DESCRIPTION:Appointment reminder','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n')
return{g,ics}}
export function dl(ics){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));a.download='roots-and-fade-appointment.ics';document.body.appendChild(a);a.click();a.remove()}
export const TERMS=[['1. Bookings','Appointments can be booked online, by phone or in store. A booking is confirmed once you receive a booking reference on screen. Please provide accurate contact details so we can reach you if we need to change your appointment.'],['2. Cancellations and rescheduling','Please give us at least 24 hours notice to cancel or reschedule by calling '+PH+'. Late cancellations and no-shows for braiding appointments may be charged 50% of the service price on your next visit.'],['3. Late arrivals','We hold your slot for 15 minutes. After that, we may shorten your service or reschedule you so clients after you are not delayed.'],['4. Prices and payment','Prices are in South African rand and include VAT where applicable. Braiding prices are a guide and may change for very long, thick or previously treated hair; we will tell you before starting. Payment is made in store by cash or card after your service.'],['5. Promotions','The FIRST10 code gives 10% off one service for first-time clients and cannot be combined with other offers.'],['6. Children','Children under 12 must be accompanied by a parent or guardian for the whole appointment.'],['7. Health and allergies','Tell your professional about skin conditions, allergies or scalp sensitivity before your service. We may decline a service if we believe it is unsafe for you.'],['8. Satisfaction','If you are unhappy with your result, tell us within 48 hours and we will fix it free of charge where reasonably possible.'],['9. Liability','We take care of your belongings but are not responsible for lost or damaged items. Nothing here limits your rights under the Consumer Protection Act.'],['10. Changes and law','We may update these terms and will publish changes on this page. These terms are governed by the laws of South Africa. Questions? Email hello@rootsandfade.co.za.']]
