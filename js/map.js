function dec(x,i,px,py){const f=(c,a,b,w,h)=>{x.fillStyle=c;x.fillRect(px+a,py+b,w,h)};
switch(i){case 0:f("#5b3a1e",0,3,1,2);f("#1f5d2a",-1,0,3,3);f("#3fa352",0,0,1,1);break;
case 1:f("#2d4a2b",-1,2,4,2);f("#6b8a4e",0,0,1,3);break;
case 2:f("#2e7d32",0,0,1,4);f("#2e7d32",-1,1,1,1);f("#2e7d32",1,2,1,1);break;
case 3:f("#7dd3fc",0,0,2,4);f("#e0f6ff",0,0,1,2);break;
case 4:f("#fff",0,0,1,1);f("#bcd4e6",-1,1,3,1);f("#7a93a8",-2,2,5,2);break;
case 5:f("#fff",0,1,1,4);f("#eee",-1,0,3,1);break;
case 6:f("#bfe9ff",-1,0,3,1);f("#8fd3ee",0,1,1,1);break;
case 7:f("#8a86a0",0,0,2,3);f("#a8a4c0",0,0,2,1);break;
case 8:f("#fff2b0",0,0,1,1);f("#c99a10",-1,1,3,1);f("#a67c1f",-2,2,5,2);break;
default:f("#ff7a18",0,0,3,1);f("#222",-1,1,5,2);f("#ff3b00",0,3,2,1)}}
const zf=(px,py)=>Math.min(4,Math.max(0,Math.floor((px+Math.sin(py*.2)*4)/40)));
const NP=[[20,58],[60,36],[100,62],[140,32],[180,58]];
function drawMap(t){const x=$("mc"+t).getContext("2d");
for(let px=0;px<200;px++)for(let py=0;py<100;py++){const z=zf(px,py),i=t*5+z,r=R[i],n=(((px*73856093)^(py*19349663))>>>0)%9,lk=!unl(i);x.fillStyle=zf(px+1,py)!=z?"#15122a":lk?(n<2?"#3a3a4c":"#444458"):(n<2?r.bg2:r.bg);x.fillRect(px,py,1,1)}
for(let z=0;z<5;z++){const i=t*5+z;if(!unl(i))continue;const rd=rng(i*31+7);for(let k=0;k<9;k++){const px=z*40+5+rd()*30,py=8+rd()*84;if(Math.hypot(px-NP[z][0],py-NP[z][1])>11)dec(x,i,Math.round(px),Math.round(py))}}
x.fillStyle="#e9dcb0";for(let z=0;z<4;z++)for(let q=0;q<=1;q+=.1)x.fillRect(Math.round(NP[z][0]+(NP[z+1][0]-NP[z][0])*q),Math.round(NP[z][1]+(NP[z+1][1]-NP[z][1])*q),2,2);
const cur=R.findIndex((_,i)=>unl(i)&&!S.cl[i]);
for(let z=0;z<5;z++){const i=t*5+z,r=R[i],[nx,ny]=NP[z],u=unl(i);x.fillStyle="#15122a";x.fillRect(nx-6,ny-6,13,13);x.fillStyle=u?"#f2e6c0":"#777";x.fillRect(nx-5,ny-5,11,11);x.fillStyle=u?r.bg:"#555";x.fillRect(nx-3,ny-3,7,7);
if(!u){x.fillStyle="#222";x.fillRect(nx-2,ny-1,5,4);x.fillRect(nx-1,ny-3,3,2)}
else if(S.cl[i]){x.fillStyle="#4ade80";[[-2,0],[-1,1],[0,2],[1,1],[2,0],[3,-1]].forEach(([a,b])=>x.fillRect(nx+a,ny+b-1,1,2))}
if(i==sel){x.strokeStyle="#ffd23f";x.lineWidth=1;x.strokeRect(nx-8.5,ny-8.5,16,16)}
if(i==cur)x.drawImage(HERO[0],nx-5,ny-6-HERO[0].height+(Math.floor(Date.now()/400)%2))}}
