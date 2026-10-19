/* sprites */
const PL={h:"#5a3a1e",s:"#f5c9a0",e:"#111",r:"#e63946",b:"#3b82f6",B:"#1e4fb0",k:"#2b2b3a",y:"#ffd23f",Y:"#b8860b",R:"#ff4d6d",w:"#fff",g:"#7be0ff"};
function sp(rows,pal){const k=document.createElement("canvas");k.width=rows[0].length;k.height=rows.length;const x=k.getContext("2d");rows.forEach((r,j)=>[...r].forEach((ch,i)=>{const c=(pal&&pal[ch])||PL[ch];if(c&&ch!=".") {x.fillStyle=c;x.fillRect(i,j,1,1)}}));return k}
const HB=["...hhhh...","..hhhhhh..","..hssssh..","..sesses..","...ssss...","..rrrrrr..",".bbbbbbbb.","sbbBBBBbbs",".bbbbbbbb.","..bbbbbb.."];
const shd=(h,f)=>"#"+[1,3,5].map(i=>Math.round(parseInt(h.substr(i,2),16)*f).toString(16).padStart(2,"0")).join("");
let HERO;function buildHero(){const k=S.sk;let hb=[...HB],pre=[];if(k.a=="c"){hb[0]="..y.yy.y..";hb[1]="..yyyyyy.."}if(k.a=="m")pre=["....pp....","...pppp...","..pppppp..",".pppppppp."];if(k.a=="v"){hb[0]="w..hhhh..w".slice(0,10);hb[1]="ww.hhhh.ww"}
const pal={h:k.h,s:k.s,b:k.b,B:shd(k.b,.6),r:k.r,p:k.r};HERO=[sp([...pre,...hb,"..kk..kk..","..kk..kk.."],pal),sp([...pre,...hb,"..kk...kk.","...kk.kk.."],pal)]}buildHero();
const SLR=["....mmmm....","..mmllmmmm..",".mmlmmmmmmm.",".mmmmmmmmmm.","mmeemmmmeemm","mmeemmmmeemm","mmmmmmmmmmmm","mdmmmmmmmmdm",".dddddddddd."];
const SL=R.map(r=>sp(SLR,{m:r.sl[0],d:r.sl[1],l:r.sl[2]}));
const BS=[SL[0],sp(["........mmm...",".......mm..m..","..mmmm.m...m..",".mmmmmmm..mm..","mmeemmmmmmm...","mmmmmmmmmm....",".dm.dm.dm.dm..","d..d..d..d...."],{m:"#b5651d",d:"#6b3a10",e:"#111"}),sp(["...llmmll...","..mmmmmmmm..","..meemmeem..","..mmmmmmmm..","ll.mddddm.ll","mmmmmmmmmmmm","mmmmmmmmmmmm","mm.mmmmmm.mm","mm.mmmmmm.mm","dd.mmddmm.dd","...dd..dd...","..ddd..ddd.."],{m:"#4aa3df",d:"#245a85",l:"#c9efff",e:"#ff3b3b"}),sp([".......mm.mm..","mm....mmmmmmm.","mmmmmmmmmmmrm.",".mmmmmmmmmmmmw",".mmllllmmmmmm.","..mmmmmmmmm...","..md.dm..md.dm","..d..d....d..d"],{m:"#aab6c8",l:"#e8eef7",d:"#5d6b82",w:"#fff"}),sp(["d.......mm..mm","dd.....mmmmmm.",".dd.mmmmmmyymm","ddddmmmmmmmmmw",".dmmmmmmmmmmm.","ddmmlllmmmmm..","dmmmlllmmmmmm.","..mmlllmmmm...","..mm.mmmm.mm..","..dd.....dd..."],{m:"#d62828",d:"#7a1111",l:"#ffd166",w:"#fff"})];
const HRT=sp([".RR.RR.","RRRRRRR","RRRRRRR",".RRRRR.","..RRR..","...R..."]),COIN=sp([".yyyy.","yyYYyy","yYyyYy","yYyyYy","yyYYyy",".yyyy."]),POT=sp(["..ww..","..gg..",".gggg.","gwgggg","gggggg",".gggg."]);
const dw=(x,k,px,py,sc,fl)=>{x.save();x.translate(px,py);if(fl)x.scale(-1,1);x.drawImage(k,-k.width*sc/2,-k.height*sc/2,k.width*sc,k.height*sc);x.restore()};
function rng(s){return()=>(s=(s*16807)%2147483647)/2147483647}
/* mapa */
const BB=[BS[0],sp(["d..d....d..d",".d.d.mm.d.d.","..dmmmmmmd..","dddmmeemmddd","..dmmmmmmd..","d.dmmmmmmd.d",".d..mmmm..d.","d....mm....d"],{m:"#3b2a5a",d:"#1d1430",e:"#ff3b3b"}),BS[1],BS[2],BS[3],
sp(["ww........ww",".ww.mmmm.ww.","..mmmmmmmm..","..mrmmmmrm..","..mmwwwwmm..","...mmmmmm...","ssmmmmmmmmss","ssddddddddss",".s.mmmmmm.s.","...mmmmmm...","...mm..mm...","..mmm..mmm..","..kk....kk.."],{m:"#8a4b2a",s:"#c98a5c",d:"#5a2d14",w:"#f3ead2",r:"#ff3b3b",k:"#222"}),
sp(["....mmmmmm....","..mmmmmmmmmm..",".mmmmmmmmmmmm.",".mmeemmmmeemm.",".mmeemmmmeemm.",".mmmmmmmmmmmm.","..mmmmmmmmmm..",".mm.mm..mm.mm.","mm..mm..mm..mm","m..m..m..m..m."],{m:"#7b3fa0",e:"#ffd23f"}),
sp([".mm..mm..mm...","mmmm.mmmm.mmmm","mrmm.mrmm.mrmm","wmmw.wmmw.wmmw",".mmmmmmmmmmmm.","..mmmmmmmmmm..","..mmmmmmmmmmmm","..mmmmmmmmmmmm","..md.dm..md.dm","..d..d....d..d"],{m:"#3a3a48",d:"#1c1c26",r:"#ff3b3b",w:"#fff"}),
sp(["..ww....mm.mm.",".wwww..mmmmmm.","wwewww.mmmmmmm","oowww.mmmmmmm.",".owwwmmmmmmmm.","..wwmmmmmmmm..","...mmmmmmmmmm.","...mmmmmmmmmm.","...md.mm.md.mm","...d..d..d..d."],{m:"#d9a441",w:"#f4f1e8",o:"#ff9f1c",e:"#111",d:"#8a5f12"}),BS[4]];
