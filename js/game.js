/* jogo */
const cv=$("cv"),c=cv.getContext("2d"),W=640,H=384;c.imageSmoothingEnabled=false;
const hit=(x,y,r)=>G.rocks.some(k=>{const cx=Math.max(k.x,Math.min(x,k.x+k.w)),cy=Math.max(k.y,Math.min(y,k.y+k.h));return(x-cx)**2+(y-cy)**2<r*r});
function mv(o,dx,dy,r){o.x+=dx;if(hit(o.x,o.y,r)||o.x<r||o.x>W-r)o.x-=dx;o.y+=dy;if(hit(o.x,o.y,r)||o.y<r||o.y>H-r)o.y-=dy}
function free(r,d){let x,y,n=0;do{x=30+Math.random()*(W-60);y=30+Math.random()*(H-60);n++}while((hit(x,y,r+8)||Math.hypot(x-G.p.x,y-G.p.y)<d)&&n<200);return{x,y}}
function lay(L,rd,i){const o=[];
if(L==1)o.push({x:130,y:90+rd()*20,w:300,h:24},{x:210,y:250-rd()*20,w:300,h:24});
else if(L==2)[[150,80],[450,80],[150,260],[450,260],[300,170]].forEach(a=>o.push({x:a[0],y:a[1],w:44,h:44}));
else if(L==3)o.push({x:200,y:0,w:24,h:230},{x:340,y:154,w:24,h:230},{x:480,y:0,w:24,h:230});
else if(L==4)o.push({x:240,y:120,w:160,h:24},{x:240,y:240,w:160,h:24},{x:240,y:144,w:24,h:96},{x:376,y:144,w:24,h:30});
else for(let k=0;k<6+i;k++){const w=36+rd()*50,h=36+rd()*50;o.push({x:120+rd()*(W-180),y:rd()*(H-h),w,h})}
return o}
function play(i){if(!unl(i))return;sel=i;G=null;show("jogar")}
function start(i){const r=R[i],rd=rng(i*97+13),mh=3+S.up.hp+(S.cls==0?1:0);
G={i,pj:[],sh:[],p:{x:60,y:H/2,fx:1,fy:0},mh,hp:mh,t:0,inv:0,atk:0,cd:0,boost:0,got:0,dmg:false,paused:false,over:false,rocks:lay(r.L,rd,i),coins:[],sl:[],pk:[],fx:[],dec:[],b:null,bd:0};
for(let k=0;k<70;k++)G.dec.push([rd()*W,rd()*H,rd()<.5?2:3]);
for(let k=0;k<r.c;k++)G.coins.push({...free(10,0),ph:Math.random()*6});
for(let k=0;k<r.s;k++)G.sl.push({...free(12,220),dx:0,dy:0,w:0});
$("gt").textContent=TT[i>4?1:0][1]+" Mapa "+(i%5+1)+" · "+r.n;$("ov").className="";cancelAnimationFrame(raf);last=performance.now();raf=requestAnimationFrame(loop)}
function ov(h){$("ov").innerHTML="<div>"+h+"</div>";$("ov").className="on"}
function hurt(){const g=G;if(g.inv>0||g.over)return;g.hp--;g.inv=1.2;g.dmg=true;if(g.hp<=0){g.over=true;save();ov("<h1>Você caiu 💀</h1><p>"+g.got+"/"+R[g.i].c+" moedas</p><button class='pri' onclick='start("+g.i+")'>Tentar de novo</button><button onclick='show(\"mapa\")'>Mapa</button>")}}
function win(){const g=G,r=R[g.i],i=g.i;g.over=true;const sc=g.got*10+Math.max(0,Math.round(120-g.t))*2+g.hp*20+100,gx=40+i*20,gc=15+i*8,first=!S.cl[i];
if(sc>(S.best[i]||0))S.best[i]=sc;S.cl[i]=true;if(first)S.bk++;S.xp+=gx;S.coins+=gc;if(!g.dmg)S.pf=true;checkQ();save();
ov("<h1>"+r.b+" derrotado! 👑</h1><p>Pontuação <b>"+sc+"</b> · recorde "+S.best[i]+"<br>+"+gx+" XP · +"+gc+" 🪙"+(first&&i<9?"<br>🔓 "+R[i+1].n+(i==4?" (Território 2!)":"")+" desbloqueado":"")+"</p>"+(i<9?"<button class='pri' onclick='play("+(i+1)+")'>Próximo mapa</button>":"<p>🏆 Você salvou o mundo!</p>")+"<button onclick='play("+i+")'>Repetir</button><button onclick='show(\"mapa\")'>Mapa</button>")}
const PR=[["Clássico",0,{h:"#5a3a1e",s:"#f5c9a0",b:"#3b82f6",r:"#e63946",a:"n"}],["Ninja",0,{h:"#111111",s:"#f0c8a0",b:"#2a3347",r:"#e63946",a:"n"}],["Viking",1,{h:"#c97a2b",s:"#f2c29b",b:"#8a5a2b",r:"#dddddd",a:"v"}],["Mago",2,{h:"#e5e5e5",s:"#e8b890",b:"#7c3aed",r:"#f2b705",a:"m"}],["Fantasma",3,{h:"#ffffff",s:"#ffffff",b:"#cfd8ff",r:"#9fb0ff",a:"n"}],["Rei",5,{h:"#222222",s:"#d9a070",b:"#c1121f",r:"#ffd23f",a:"c"}]];
function pick(j){S.sk={...PR[j][2]};buildHero();save();render()}
function cs(k,v){S.sk[k]=v;buildHero();pv()}
function pv(){const e=$("pt");if(!e)return;const x=e.getContext("2d");x.clearRect(0,0,48,64);x.imageSmoothingEnabled=false;dw(x,HERO[0],24,32,4)}
const CD=[.5,.55,.9,.6];
const nr=(x,y,rr)=>G.sl.some(s=>Math.hypot(s.x-x,s.y-y)<rr+8)||(G.b&&Math.hypot(G.b.x-x,G.b.y-y)<rr+R[G.i].br);
function kill(s){const g=G,r=R[g.i];S.kills++;S.xp+=5;g.fx.push({x:s.x,y:s.y,t:.4,c:r.sl[0]});const q=Math.random();if(q<.22&&g.hp<g.mh)g.pk.push({x:s.x,y:s.y,k:"h"});else if(q<.34)g.pk.push({x:s.x,y:s.y,k:"p"});checkQ()}
function hurtB(){const g=G,b=g.b;b.hp--;b.fl=.15;g.fx.push({x:b.x,y:b.y,t:.4,c:"#fff"});if(b.hp<=0){g.b=null;g.bd=1;win()}}
function dmgAt(x,y,rr){const g=G;let h=0;g.sl=g.sl.filter(s=>{if(Math.hypot(s.x-x,s.y-y)<rr+8){kill(s);h=1;return false}return true});const b=g.b;if(b&&Math.hypot(b.x-x,b.y-y)<rr+R[g.i].br){hurtB();h=1}return h}
function shot(dx,dy,v,k,t){G.sh.push({x:G.p.x,y:G.p.y,vx:dx*v,vy:dy*v,t,k})}
function fire(){const g=G,p=g.p,k=1+.15*S.up.sw,m=S.cls;g.cd=CD[m];g.atk=.2;
if(m==0)dmgAt(p.x+p.fx*14,p.y+p.fy*14,44+8*S.up.sw);
else if(m==1)shot(p.fx,p.fy,430*k,"a",.8);
else if(m==2)shot(p.fx,p.fy,230*k,"m",1.1);
else[-.3,0,.3].forEach(a=>{const c=Math.cos(a),s=Math.sin(a);shot(p.fx*c-p.fy*s,p.fx*s+p.fy*c,380*k,"n",.5)})}
function update(dt){const g=G,p=g.p,r=R[g.i];g.t+=dt;S.time+=dt;g.inv=Math.max(0,g.inv-dt);g.atk=Math.max(0,g.atk-dt);g.cd=Math.max(0,g.cd-dt);g.boost=Math.max(0,g.boost-dt);
let dx=(keys.ArrowRight||keys.d||keys.D?1:0)-(keys.ArrowLeft||keys.a||keys.A?1:0),dy=(keys.ArrowDown||keys.s||keys.S?1:0)-(keys.ArrowUp||keys.w||keys.W?1:0);g.mvg=dx||dy;
if(g.mvg){const m=Math.hypot(dx,dy);dx/=m;dy/=m;p.fx=dx;p.fy=dy;const v=170*(1+.12*S.up.sp)*(S.cls==3?1.15:1)*(g.boost>0?1.5:1)*dt;mv(p,dx*v,dy*v,10)}
if(keys[" "]&&g.cd<=0)fire();
g.sh=g.sh.filter(q=>{q.x+=q.vx*dt;q.y+=q.vy*dt;q.t-=dt;const rk=hit(q.x,q.y,5)||q.x<0||q.x>W||q.y<0||q.y>H;
if(q.k=="m"){if(rk||q.t<=0||nr(q.x,q.y,10)){dmgAt(q.x,q.y,46);g.fx.push({x:q.x,y:q.y,t:.4,c:"#b48bff"});return false}return true}
return !(rk||q.t<=0||dmgAt(q.x,q.y,6))});
g.coins=g.coins.filter(k=>{if(Math.hypot(k.x-p.x,k.y-p.y)<17){g.got++;S.col++;S.coins++;checkQ();return false}return true});
g.pk=g.pk.filter(k=>{if(Math.hypot(k.x-p.x,k.y-p.y)<17){if(k.k=="h")g.hp=Math.min(g.mh,g.hp+1);else g.boost=6;return false}return true});
g.sl.forEach(s=>{const d=Math.hypot(p.x-s.x,p.y-s.y);s.w-=dt;if(d<170){mv(s,(p.x-s.x)/d*r.sp*dt,(p.y-s.y)/d*r.sp*dt,11)}else{if(s.w<=0){s.w=1+Math.random();const a=Math.random()*6.28;s.dx=Math.cos(a);s.dy=Math.sin(a)}mv(s,s.dx*28*dt,s.dy*28*dt,11)}if(d<20)hurt()});
if(!g.coins.length&&!g.b&&!g.bd){g.b={...free(24,250),hp:r.hp,mh:r.hp,ch:r.bc,sp:3,fl:0};toast("👑 "+r.b+" apareceu!")}
if(g.b){const b=g.b,d=Math.hypot(p.x-b.x,p.y-b.y)||1;b.ch-=dt;if(b.ch<-.5)b.ch=r.bc;b.fl=Math.max(0,b.fl-dt);b.sp-=dt;const v=(b.ch<0?r.sp*2.6:r.sp*r.bv)*dt,sg=r.kp&&d<190?-1:r.kp&&d<260?0:1;mv(b,sg*(p.x-b.x)/d*v,sg*(p.y-b.y)/d*v,r.br);
if(b.sp<=0){b.sp=r.sh?1.6:5;if(r.sh)g.pj.push({x:b.x,y:b.y,vx:(p.x-b.x)/d*210,vy:(p.y-b.y)/d*210,t:3,c:r.pc});if(r.sm&&g.sl.length<4)g.sl.push({x:b.x,y:b.y,dx:0,dy:0,w:0})}if(d<r.br+12)hurt()}
g.pj=g.pj.filter(q=>{q.x+=q.vx*dt;q.y+=q.vy*dt;q.t-=dt;if(Math.hypot(q.x-p.x,q.y-p.y)<14){hurt();return false}return q.t>0&&!hit(q.x,q.y,6)});
g.fx.forEach(f=>f.t-=dt);g.fx=g.fx.filter(f=>f.t>0)}
function draw(){const g=G,r=R[g.i],p=g.p,m=S.cls;c.fillStyle=r.bg;c.fillRect(0,0,W,H);c.fillStyle=r.bg2;for(let x=0;x<W;x+=32)for(let y=0;y<H;y+=32)if((x+y)/32%2==0)c.fillRect(x,y,32,32);
c.fillStyle=r.dc;g.dec.forEach(d=>c.fillRect(d[0],d[1],d[2]*2,2));
g.rocks.forEach(k=>{c.fillStyle="rgba(0,0,0,.3)";c.fillRect(k.x+5,k.y+6,k.w,k.h);c.fillStyle=r.rk;c.fillRect(k.x,k.y,k.w,k.h);c.fillStyle="rgba(255,255,255,.2)";c.fillRect(k.x,k.y,k.w,8);c.fillStyle="rgba(0,0,0,.25)";c.fillRect(k.x,k.y+k.h-8,k.w,8);c.strokeStyle="rgba(0,0,0,.5)";c.lineWidth=2;c.strokeRect(k.x+1,k.y+1,k.w-2,k.h-2)});
const sh=(x,y,w)=>{c.fillStyle="rgba(0,0,0,.28)";c.beginPath();c.ellipse(x,y,w,w/2.5,0,0,6.3);c.fill()};
g.coins.forEach(k=>{sh(k.x,k.y+9,7);dw(c,COIN,k.x,k.y+Math.sin(g.t*4+k.ph)*2,2.5)});
g.pk.forEach(k=>{sh(k.x,k.y+9,8);dw(c,k.k=="h"?HRT:POT,k.x,k.y+Math.sin(g.t*5)*2,3)});
g.sl.forEach(s=>{sh(s.x,s.y+10,12);dw(c,SL[g.i],s.x,s.y+2,2+Math.sin(g.t*6+s.x)*.15)});
if(g.b){const b=g.b;sh(b.x,b.y+r.br,r.br+6);if(b.fl>0)c.filter="brightness(2.5)";dw(c,BB[r.bs],b.x,b.y,5+Math.sin(g.t*5)*.2,r.fl==1?p.x>b.x:r.fl==2?p.x<b.x:false);c.filter="none";if(r.bs==0){c.fillStyle="#ffd23f";c.fillRect(b.x-18,b.y-34,36,8);for(let k=0;k<3;k++)c.fillRect(b.x-18+k*14,b.y-42,8,8)}if(b.ch<0){c.fillStyle="#f00";c.fillRect(b.x-14,b.y-r.br-8,28,4)}}
g.pj.forEach(q=>{c.fillStyle=q.c||"#ff7a18";c.beginPath();c.arc(q.x,q.y,8,0,6.3);c.fill();c.fillStyle="#fff";c.beginPath();c.arc(q.x,q.y,3,0,6.3);c.fill()});
if(g.inv<=0||Math.floor(g.t*14)%2){sh(p.x,p.y+13,10);dw(c,HERO[g.mvg?Math.floor(g.t*8)%2:0],p.x,p.y,2,p.fx<0)}
const a0=Math.atan2(p.fy,p.fx);
if(m==0&&g.atk>0){const a=a0+(g.atk/.2-.5)*2.2,L=24+4*S.up.sw;c.save();c.translate(p.x,p.y);c.rotate(a);c.fillStyle="#e8f4ff";c.fillRect(10,-2,L,4);c.fillStyle="#9fb3c8";c.fillRect(10,-2,L,1);c.fillStyle="#b8860b";c.fillRect(7,-5,4,10);c.restore()}
if(m==1){const bx=p.x+p.fx*9,by=p.y+p.fy*9;c.strokeStyle="#8a5a2b";c.lineWidth=3;c.beginPath();c.arc(bx,by,11,a0-1.2,a0+1.2);c.stroke();c.strokeStyle="#fff";c.lineWidth=1;c.beginPath();c.moveTo(bx+Math.cos(a0-1.2)*11,by+Math.sin(a0-1.2)*11);c.lineTo(bx+Math.cos(a0+1.2)*11,by+Math.sin(a0+1.2)*11);c.stroke()}
if(m==2){c.fillStyle="#8a5a2b";c.fillRect(p.x+9,p.y-12,3,26);c.fillStyle=g.cd>0?"#6b4fa0":"#b48bff";c.beginPath();c.arc(p.x+10,p.y-15,5,0,6.3);c.fill()}
g.sh.forEach(q=>{if(q.k=="m"){c.fillStyle="#b48bff";c.beginPath();c.arc(q.x,q.y,9,0,6.3);c.fill();c.fillStyle="#fff";c.beginPath();c.arc(q.x,q.y,4,0,6.3);c.fill();return}c.save();c.translate(q.x,q.y);c.rotate(Math.atan2(q.vy,q.vx));if(q.k=="a"){c.fillStyle="#8a5a2b";c.fillRect(-10,-1,16,2);c.fillStyle="#fff";c.fillRect(6,-3,5,6)}else{c.fillStyle="#cfd8e8";c.fillRect(-6,-2,12,4);c.fillStyle="#222";c.fillRect(-6,-1,4,2)}c.restore()});
g.fx.forEach(f=>{c.fillStyle=f.c;for(let a=0;a<8;a++)c.fillRect(f.x+Math.cos(a*.8)*(.4-f.t)*90,f.y+Math.sin(a*.8)*(.4-f.t)*90,5,5)});
for(let k=0;k<g.mh;k++){c.globalAlpha=k<g.hp?1:.25;dw(c,HRT,20+k*20,18,2.2)}c.globalAlpha=1;
c.font="bold 15px monospace";c.fillStyle="#fff";c.strokeStyle="#000";c.lineWidth=3;const tx="  "+g.got+"/"+r.c+"   "+g.t.toFixed(0)+"s"+(g.boost>0?"  🧪"+g.boost.toFixed(0):"");c.strokeText(tx,10,44);c.fillText(tx,10,44);dw(c,COIN,18,39,1.6);
if(g.b){c.fillStyle="#000";c.fillRect(W/2-100,10,200,14);c.fillStyle="#e63946";c.fillRect(W/2-98,12,196*g.b.hp/g.b.mh,10);c.fillStyle="#fff";c.textAlign="center";c.strokeText(r.b,W/2,42);c.fillText(r.b,W/2,42);c.textAlign="left"}
$("obj").textContent=CL[m][1]+" "+CL[m][0]+" · "+(g.b?"derrote o "+r.b+"!":"colete as moedas ("+g.coins.length+") para invocar o "+r.b);
if(g.paused&&!g.over)ov("<h1>Pausado</h1><button class='pri' onclick='pause()'>Continuar</button>")}
function pause(){if(!G||G.over)return;G.paused=!G.paused;if(!G.paused)$("ov").className="";last=performance.now()}
function loop(ts){if(!G||view!="jogar")return;const dt=Math.min(.05,(ts-last)/1000);last=ts;if(!G.paused&&!G.over)update(dt);draw();raf=requestAnimationFrame(loop)}
addEventListener("keydown",e=>{if(view!="jogar")return;if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))e.preventDefault();if(e.key=="p"||e.key=="P"||e.key=="Escape")pause();keys[e.key]=1});
addEventListener("keyup",e=>delete keys[e.key]);
document.querySelectorAll(".pad button").forEach(b=>{const k=b.dataset.k,on=e=>{e.preventDefault();keys[k]=1},off=()=>delete keys[k];b.addEventListener("pointerdown",on);["pointerup","pointerleave","pointercancel"].forEach(t=>b.addEventListener(t,off))});
