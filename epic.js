// ===== ЭПИЧНЫЕ ЭФФЕКТЫ (дополнение к script.js) =====
function rays(x,y,ang,col,base){return(c,W,H,t)=>{c.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const a=ang+(i-2.5)*.13+Math.sin(t*.3+i)*.03,L=1.4*W,w=.05+.03*Math.sin(t*.5+i*2),
 x1=x*W+Math.cos(a-w)*L,y1=y*H+Math.sin(a-w)*L,x2=x*W+Math.cos(a+w)*L,y2=y*H+Math.sin(a+w)*L,al=base*(.6+.4*Math.sin(t*.7+i*1.7)),
 g=c.createRadialGradient(x*W,y*H,0,x*W,y*H,L*.8);g.addColorStop(0,`rgba(${col},${al})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.moveTo(x*W,y*H);c.lineTo(x1,y1);c.lineTo(x2,y2);c.fill()}c.globalCompositeOperation='source-over'}}
function motes(n,col,al){const m=[...Array(n)].map(()=>({x:R(),y:R(),p:R()*9,s:.5+R()*1.8,v:.004+R()*.012}));
 return(c,W,H,t,dt)=>{m.forEach(o=>{o.y-=o.v*dt;o.x+=Math.sin(t*.4+o.p)*.003*dt*10;if(o.y<0){o.y=1;o.x=R()}if(o.x<0)o.x=1;if(o.x>1)o.x=0;
 c.fillStyle=`rgba(${col},${al*(.4+.6*Math.abs(Math.sin(t*1.3+o.p)))})`;c.beginPath();c.arc(o.x*W,o.y*H,o.s,0,7);c.fill()})}}
function embers(x0,x1,y0,n){const e=[...Array(n)].map(()=>({x:x0+R()*(x1-x0),y:y0-R()*.3,a:R()*3,l:2+R()*3,p:R()*9,v:.05+R()*.1}));
 return(c,W,H,t,dt)=>{c.globalCompositeOperation='lighter';e.forEach(o=>{o.a+=dt;o.y-=o.v*dt;o.x+=Math.sin(t*2+o.p)*.02*dt;if(o.a>o.l){o.a=0;o.x=x0+R()*(x1-x0);o.y=y0}
 const k=1-o.a/o.l,g=c.createRadialGradient(o.x*W,o.y*H,0,o.x*W,o.y*H,5);g.addColorStop(0,`rgba(255,170,60,${k})`);g.addColorStop(1,'rgba(255,90,20,0)');c.fillStyle=g;c.fillRect(o.x*W-5,o.y*H-5,10,10)});c.globalCompositeOperation='source-over'}}
function rain(n){const d=[...Array(n)].map(()=>({x:R()*1.2,y:R(),v:.9+R()*.6,l:.02+R()*.03}));
 return(c,W,H,t,dt)=>{c.strokeStyle='rgba(220,225,230,.28)';c.lineWidth=1;c.beginPath();d.forEach(o=>{o.y+=o.v*dt;o.x-=o.v*dt*.25;if(o.y>1){o.y=-.05;o.x=R()*1.2}c.moveTo(o.x*W,o.y*H);c.lineTo((o.x-o.l*.25)*W,(o.y+o.l)*H)});c.stroke()}}
function fog(y,h,al,n){const f=[...Array(n)].map((_,i)=>({x:i/n,p:R()*9,s:.12+R()*.1}));
 return(c,W,H,t,dt)=>{f.forEach(o=>{o.x+=.012*dt;if(o.x>1.3)o.x=-.3;const X=o.x*W,Y=(y+Math.sin(t*.2+o.p)*.02)*H,r=o.s*W,g=c.createRadialGradient(X,Y,0,X,Y,r);
 g.addColorStop(0,`rgba(235,230,220,${al})`);g.addColorStop(1,'rgba(235,230,220,0)');c.save();c.translate(0,Y);c.scale(1,h*H/r);c.translate(0,-Y);c.fillStyle=g;c.fillRect(X-r,Y-r,r*2,r*2);c.restore()})}}
function flash(x0,x1,y0,y1){let nx=1,fx=0,fy=0,ft=-9;return(c,W,H,t)=>{if(t>nx){nx=t+.4+R()*1.6;ft=t;fx=x0+R()*(x1-x0);fy=y0+R()*(y1-y0)}const k=t-ft;
 if(k<.25){const a=1-k/.25,g=c.createRadialGradient(fx*W,fy*H,0,fx*W,fy*H,.07*W);g.addColorStop(0,`rgba(255,255,255,${a})`);g.addColorStop(1,'rgba(255,255,255,0)');c.globalCompositeOperation='lighter';c.fillStyle=g;c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over';
 c.fillStyle=`rgba(255,255,255,${a*.07})`;c.fillRect(0,0,W,H)}}}
const X={
1:[rays(.03,.08,.6,'255,235,190',.2),motes(60,'255,240,210',.7)],
2:[birds(5,.1,.4,.08,.016),fog(.64,.4,.16,6),motes(30,'255,250,235',.5)],
3:[rain(130),fog(.72,.4,.12,5)],
4:[rays(.31,.05,1.5,'255,225,170',.16),motes(40,'255,210,140',.7)],
5:[rays(.8,.12,2.45,'255,235,190',.24),motes(70,'255,240,210',.8)],
6:[embers(.3,.95,.9,50),glow(.5,.98,.5,'255,110,30',.28),fog(.8,.4,.1,4)],
7:[embers(.45,.85,.75,30),fog(.78,.35,.14,5),glow(.617,.59,.08,'255,200,120',.25)],
8:[embers(.4,.46,.47,25),fog(.72,.35,.12,5),motes(30,'255,250,220',.6)],
9:[flash(.05,.95,.5,.92),rays(.02,.3,.3,'255,235,200',.16),motes(40,'255,245,220',.6)],
10:[motes(60,'255,225,150',.9),rays(.83,.3,2.4,'160,255,140',.08)]};
Object.keys(X).forEach(k=>FX[k].push(...X[k]));
// параллакс от мыши
addEventListener('mousemove',e=>{const r=document.documentElement.style;r.setProperty('--mx',((e.clientX/innerWidth-.5)*-26)+'px');r.setProperty('--my',((e.clientY/innerHeight-.5)*-16)+'px')});
