const $=i=>document.getElementById(i);
let S={xp:0,coins:0,kills:0,col:0,bk:0,cl:{},best:{},pf:false,q:{},time:0,cls:0,st:{},sk:{h:"#5a3a1e",s:"#f5c9a0",b:"#3b82f6",r:"#e63946",a:"n"},up:{hp:0,sp:0,sw:0}};
try{const j=JSON.parse(localStorage.getItem("pq3"));if(j)S=Object.assign(S,j)}catch(e){}
const save=()=>{try{localStorage.setItem("pq3",JSON.stringify(S))}catch(e){}};
const lvl=()=>Math.floor(S.xp/150)+1,ttl=()=>lvl()<3?"Novato":lvl()<6?"Explorador":lvl()<10?"Herói":"Lenda",unl=i=>i==0||!!S.cl[i-1],stg=i=>S.cl[i]?3:(S.st[i]||0);
let sel=0,view="dash",G=null,keys={},last=0,raf=0;
function toast(m){const t=$("toast");t.textContent=m;t.style.display="block";clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display="none",2800)}
function checkQ(){Q.forEach((q,i)=>{if(!S.q[i]&&q[3](S)>=q[4]){S.q[i]=1;S.xp+=q[2];toast("✅ "+q[0]+" (+"+q[2]+" XP)")}})}
