const issues = [
['Education','We support parental involvement, school choice, local control, academic achievement, and practical skills.','We believe families should have a voice in education and students should be prepared for the future.'],
['Economy & Jobs','We support small businesses, job growth, fewer unnecessary regulations, fair wages, and safe working conditions.','We believe a growing economy creates opportunities for workers and businesses.'],
['Taxes & Spending','We support lower taxes, careful use of taxpayer funds, and reductions in unnecessary government spending.','We believe people and businesses should keep more of what they earn while public services are funded responsibly.'],
['Immigration','We support border security, enforcement of immigration laws, and an organized legal immigration system.','We view immigration as part of American history and believe the process should be fair and lawful.'],
['Healthcare','We support accessible, affordable healthcare, patient choice, provider competition, and protections for people with preexisting conditions.','We believe competition and patient control can help reduce costs and expand options.'],
['Environment & Energy','We support conservation, clean water, wildlife protection, and responsible domestic energy production.','We believe environmental stewardship and economic growth should be balanced.'],
['Second Amendment','We support the constitutional right of law-abiding citizens to own firearms and the enforcement of existing laws.','We believe constitutional rights should be paired with responsible ownership and public safety.'],
['Abortion','We generally support protecting unborn children while considering maternal health, medical emergencies, and democratic decision-making.','We recognize that abortion is a complex and personal issue involving competing rights and concerns.'],
['Marriage & Family','We support strong family and traditional religious values, respect for individuals, and freedom of belief.','We believe family and freedom of religion are important parts of community life.'],
['Illegal Drugs','We support action against illegal drug trafficking alongside education, prevention, treatment, and recovery opportunities.','We believe public safety and helping people recover should both be priorities.']
];
document.querySelector('#issues-grid').innerHTML=issues.map(([title,position,why],i)=>`<details class="issue" ${i<2?'open':''}><summary><span class="issue-number">${String(i+1).padStart(2,'0')}</span><strong>${title}</strong><span class="plus">+</span></summary><div class="issue-body"><p>${position}</p><p><b>Why we believe this:</b> ${why}</p></div></details>`).join('');
const nav=document.querySelector('#nav');document.querySelector('#menu').addEventListener('click',e=>{let open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();

// Wheel, trackpad, touch, and mouse dragging move each full photo inside its frame.
document.querySelectorAll('.scroll-portrait').forEach(viewer=>{
 const img=viewer.querySelector('img');let offset=0,startY=0,startOffset=0,dragging=false;
 function bounds(){return Math.max(0,img.getBoundingClientRect().height-viewer.clientHeight)}
 function move(delta){const max=bounds();const next=Math.max(0,Math.min(max,offset+delta));const changed=Math.abs(next-offset)>0.1;offset=next;img.style.transform=`translateY(${-offset}px)`;return changed}
 viewer.addEventListener('wheel',e=>{if(move(e.deltaY)){e.preventDefault()}},{passive:false});
 viewer.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;dragging=true;startY=e.clientY;startOffset=offset;viewer.setPointerCapture(e.pointerId)});
 viewer.addEventListener('pointermove',e=>{if(!dragging)return;const max=bounds();offset=Math.max(0,Math.min(max,startOffset+startY-e.clientY));img.style.transform=`translateY(${-offset}px)`});
 viewer.addEventListener('pointerup',()=>dragging=false);viewer.addEventListener('pointercancel',()=>dragging=false);
 viewer.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp'].includes(e.key)){const d=e.key==='ArrowDown'?45:e.key==='ArrowUp'?-45:e.key==='PageDown'?230:-230;if(move(d))e.preventDefault()}});
 window.addEventListener('resize',()=>move(0));img.addEventListener('load',()=>move(0));
});
