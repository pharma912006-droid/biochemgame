const $=i=>document.getElementById(i),T=window.THREE,K={};
if(!T){$('load').innerHTML='<h1>HEARTCARE</h1><p>The 3D library could not load. An internet connection is needed the first time.</p>';throw 0}
const LV=[{n:'THE BLOODSTREAM',L:500,sp:20,ob:4,it:9,base:7,nar:0,col:0xb02a3a,fog:0x3a0a12,w:[.7,.3,0,0],m:'Collect healthy items and reach the heart'},
{n:'THE CHOLESTEROL ZONE',L:700,sp:25,ob:8,it:8,base:6,nar:4,col:0xa8603a,fog:0x3a1810,w:[.45,.2,.2,.15],m:'Dodge plaques, use shields, reach the heart'},
{n:'SAVE THE HEART',L:900,sp:30,ob:12,it:7,base:5.6,nar:6,col:0x6a1530,fog:0x14061c,w:[.3,.2,.3,.2],m:'Reach the heart and restore it'}];
const J=Object.assign({},LV[0],{n:'JOURNEY TO THE HEART',L:1500,sp:18,it:10,base:7,nar:2,m:'Collect healthy items and reach the heart'});const ZZ=z=>LV[Math.max(0,Math.min(2,Math.floor(-z/(J.L/3))))];
const F={pill:'Medicines work best when taken exactly as prescribed: the right dose, at the right time, every day.',plaque:'High LDL cholesterol can contribute to plaque buildup inside arteries.',exercise:'Adults should generally aim for at least 150 minutes of moderate-intensity physical activity per week.',omega:'Omega-3 fatty acids are found in foods such as fatty fish. Their cardiovascular effects depend on overall diet and individual health.',fruit:'Fruits, vegetables, whole grains, legumes and unsaturated fats support cardiovascular health.',damage:'Smoking damages blood vessels and increases cardiovascular risk.',narrow:'High blood pressure increases strain on the heart and blood vessels.',clot:'Blood clots can block arteries. Sudden chest pain, weakness or trouble speaking needs urgent medical care.',water:'Staying well hydrated supports normal blood volume and circulation.',shield:'Prevention works best with regular check-ups and medicines when a clinician prescribes them.',orb:'Blood pressure, cholesterol and glucose can all be checked by a healthcare professional.',rbc:'Red blood cells carry oxygen from the lungs to every organ in the body.'};
const D={pill:["Prescribed Medication","Medicines such as statins, blood-pressure tablets or blood thinners protect the heart only when taken as prescribed. Never stop, skip or change a dose on your own. Ask your doctor or pharmacist about side effects, missed doses and interactions."],plaque:["Cholesterol Plaque","Plaque narrows arteries and can rupture, triggering a clot. LDL is often called ‘bad’ cholesterol. A blood test shows your levels, and your clinician decides whether lifestyle changes or medicines are needed."],exercise:["Physical Activity","Regular movement helps lower blood pressure, improves cholesterol and strengthens the heart. Brisk walking counts. Start gradually, and ask your clinician first if you already have a heart condition."],omega:["Omega-3","Fatty fish such as salmon or sardines can be part of a heart-healthy diet. Supplements are not a cure; ask your doctor or pharmacist before taking them, especially if you use blood thinners."],fruit:["Healthy Diet","Fibre-rich foods, with less salt, sugary drinks and saturated or trans fats, help protect your arteries. No single food can prevent or cure heart disease; the overall pattern matters."],damage:["Smoking and Vessel Damage","Chemicals in tobacco smoke injure the vessel lining and make clots and plaque more likely. Quitting lowers risk at any age, and pharmacists can explain stop-smoking options."],narrow:["Blood Pressure","High blood pressure often has no symptoms, so regular checks matter. Less salt, activity, a healthy weight and prescribed medicines taken as directed help keep it in range."],clot:["Blood Clots","A clot can block blood flow to the heart or brain. Call your local emergency number (123 in Egypt) for crushing chest pain, sudden weakness, a drooping face or trouble speaking."],water:["Hydration","Water supports blood volume and circulation. Choose it over sugary drinks. People with heart failure or kidney disease may have fluid limits set by their doctor."],shield:["Prevention","Check-ups and prescribed medicines, such as statins or blood-pressure drugs, work like a shield over the years. Never stop them without asking your clinician or pharmacist."],orb:["Know Your Numbers","Blood pressure, LDL cholesterol, blood sugar and weight are key risk numbers. Knowing them lets you and your clinician act early, before symptoms appear."],rbc:["Red Blood Cells","They carry oxygen using haemoglobin. The heart pumps them to every organ, which is why a weak heart or low red cell count can cause tiredness and breathlessness."]};
const S={pill:[600,.25,'triangle',.2,900],fruit:[520,.15,'sine',.2,880],omega:[880,.2,'triangle',.2,1320],exercise:[300,.2,'square',.08,900],water:[700,.15,'sine',.2,500],shield:[400,.3,'sawtooth',.08,1200],orb:[660,.3,'sine',.2,1760],hit:[160,.3,'sawtooth',.3,50],bump:[300,.15,'square',.1,200],over:[300,.9,'sawtooth',.25,50],win:[523,.8,'triangle',.25,1046]};
let R,scene,cam,W,pl,PL,st='load',lv=0,back='menu',AC,MG,mi=0,ts=1,MH,HG,pg,pts,FPg,errd=0;
const PN=260,PV=new Float32Array(PN*3),PB=new Float32Array(PN*3),PLf=new Float32Array(PN),FL=[],RB=[];
const G={hp:100,en:100,sc:0,n:0,seen:new Set(),ch:0,z:0,px:0,py:0,vx:0,vy:0,o:[],nr:[],dg:[],hs:1,hit:0,inv:0,boost:0,pulse:0,shake:0,i:0,t:0,ct:0,P:LV[0],ls:{}};
const cfg={vol:.7,mute:false,q:1,pres:false};
const cx=z=>Math.sin(z*.012)*8+Math.sin(z*.031)*3;
const rad=z=>{let n=0;for(const s of G.nr)n=Math.max(n,1-Math.abs(z-s)/24);return G.P.base*(1-.25*Math.min(1,n*1.6))+Math.min(18,Math.max(0,-z-G.P.L-6)*.9)};
const rng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const gm={ico:new T.IcosahedronGeometry(1,1),sph:new T.SphereGeometry(1,16,12),tor:new T.TorusGeometry(1,.35,8,18),cone:new T.ConeGeometry(.5,2.2,8),oct:new T.OctahedronGeometry(1)};
gm.disc=new T.LatheGeometry([[.001,.16],[.25,.26],[.55,.3],[.8,.24],[.95,.1],[.95,-.1],[.8,-.24],[.55,-.3],[.25,-.26],[.001,-.16]].map(p=>new T.Vector2(p[0],p[1])),20);
gm.lump=new T.IcosahedronGeometry(1,2);{const p=gm.lump.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),n=1+.16*Math.sin(x*5+1)*Math.sin(y*4)+.12*Math.sin(z*6+2)+.08*Math.sin((x+y+z)*9);p.setXYZ(i,x*n,y*n,z*n)}}gm.lump.computeVertexNormals();gm.ring=new T.TorusGeometry(1,.07,8,28);gm.cyl=new T.CylinderGeometry(.3,.3,.6,12).rotateZ(Math.PI/2);
const mat=(c,e,o)=>new T.MeshStandardMaterial(Object.assign({color:c,emissive:c,emissiveIntensity:e,roughness:.4,metalness:.1},o));
const M={plaque:mat(0xe0c070,.35,{roughness:.6,flatShading:true,emissive:0x7a5a10}),rbc:mat(0xc01830,.3,{side:T.DoubleSide,roughness:.3}),clot:mat(0x5a0a14,.7,{emissive:0xb01028,roughness:.25,metalness:.3}),damage:mat(0x6a5a50,.1,{emissive:0x501010}),fruit:mat(0xff8a2a,.5),omega:mat(0xffd24a,.7,{metalness:.6}),exercise:mat(0x3dff9a,.8),water:mat(0x4aa8ff,.8,{transparent:true,opacity:.85}),shield:mat(0x2ee6d0,.8,{wireframe:true}),shg:mat(0x2ee6d0,.3,{transparent:true,opacity:.3}),orb:mat(0xff5aa0,1.2),halo:mat(0xff5aa0,.6,{transparent:true,opacity:.25}),leaf:mat(0x3dd16a,.4),pillA:mat(0xe02040,.6),pillB:mat(0xf4f4f4,.5)};
for(const[k,c]of Object.entries({fruit:0xff8a2a,omega:0xffd24a,exercise:0x3dff9a,water:0x4aa8ff,shield:0x2ee6d0,orb:0xff5aa0,pill:0xff6a7a}))M['h'+k]=mat(c,1.2,{transparent:true,opacity:.16,depthWrite:false});
function itemMesh(t){const g=new T.Group(),s=(geo,m,a,y)=>{const o=new T.Mesh(geo,m);o.scale.set(a[0],a[1],a[2]);o.position.y=y||0;g.add(o)};
if(t=='fruit'){s(gm.sph,M.fruit,[.6,.6,.6]);s(gm.sph,M.leaf,[.25,.1,.4],.62)}else if(t=='omega')s(gm.tor,M.omega,[.6,.6,.6]);else if(t=='exercise')s(gm.oct,M.exercise,[.5,.9,.5]);
else if(t=='water'){s(gm.sph,M.water,[.5,.5,.5]);s(gm.cone,M.water,[.45,.45,.45],.75)}else if(t=='shield'){s(gm.ico,M.shield,[.8,.8,.8]);s(gm.sph,M.shg,[.7,.7,.7])}else if(t=='pill'){const a=new T.Mesh(gm.sph,M.pillA),b=new T.Mesh(gm.sph,M.pillB),c=new T.Mesh(gm.cyl,M.pillA),d=new T.Mesh(gm.cyl,M.pillB);a.scale.setScalar(.3);a.position.x=-.6;b.scale.setScalar(.3);b.position.x=.6;c.position.x=-.3;d.position.x=.3;g.add(a,b,c,d);g.rotation.z=.6}else{s(gm.sph,M.orb,[.5,.5,.5]);s(gm.sph,M.halo,[.9,.9,.9])}s(gm.sph,M['h'+t],[1.15,1.15,1.15]);return g}
function heartGeo(){const s=new T.Shape();s.moveTo(5,5);s.bezierCurveTo(5,5,4,0,0,0);s.bezierCurveTo(-6,0,-6,7,-6,7);s.bezierCurveTo(-6,11,-3,15.4,5,19);s.bezierCurveTo(12,15.4,16,11,16,7);s.bezierCurveTo(16,7,16,0,10,0);s.bezierCurveTo(7,0,5,5,5,5);const g=new T.ExtrudeGeometry(s,{depth:4,bevelEnabled:true,bevelThickness:1.5,bevelSize:1.5,bevelSegments:4,curveSegments:16});g.center();g.rotateZ(Math.PI);return g}
function init(){
R=new T.WebGLRenderer({antialias:true});R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.35;document.body.prepend(R.domElement);scene=new T.Scene();cam=new T.PerspectiveCamera(70,1,.1,300);
scene.add(new T.AmbientLight(0xff9bb0,.6));PL=new T.PointLight(0xffffff,1.4,50);scene.add(PL);PL2=new T.PointLight(0x4aa8ff,.9,40);scene.add(PL2);
HG=heartGeo();MH=new T.Mesh(HG,new T.MeshStandardMaterial({color:0xd6283e,emissive:0x701020,emissiveIntensity:.8,roughness:.35,fog:false}));MH.scale.setScalar(.55);scene.add(MH);
pl=new T.Group();const add=(geo,m,s,p)=>{const o=new T.Mesh(geo,m);o.scale.set(s[0],s[1],s[2]);o.position.set(p[0],p[1],p[2]);pl.add(o);return o};
const hull=mat(0xe8eef2,.05,{metalness:.7,roughness:.25}),red=mat(0xd6283e,.7),glow=mat(0x4aa8ff,1.6);
add(gm.sph,hull,[.55,.45,1.1],[0,0,0]);add(gm.sph,mat(0x2ee6d0,.5,{transparent:true,opacity:.65}),[.38,.3,.55],[0,.3,-.35]);add(gm.sph,red,[.12,.03,.35],[0,.46,.25]);add(gm.sph,red,[.35,.03,.12],[0,.46,.25]);add(gm.sph,mat(0x2ee6d0,.4),[1,.04,.3],[0,0,.5]);
pl.eng=[add(gm.sph,glow,[.14,.14,.3],[-.3,-.05,1.1]),add(gm.sph,glow,[.14,.14,.3],[.3,-.05,1.1])];pl.sh=add(gm.sph,M.shg,[1.5,1.3,2],[0,0,0]);pl.ring=add(gm.ring,glow,[.8,.8,1],[0,0,-.1]);pl.visible=false;scene.add(pl);
pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(new Float32Array(PN*3).fill(-9999),3));pg.setAttribute('color',new T.BufferAttribute(new Float32Array(PN*3),3));
pts=new T.Points(pg,new T.PointsMaterial({size:.5,vertexColors:true,transparent:true,blending:T.AdditiveBlending,depthWrite:false}));pts.frustumCulled=false;scene.add(pts);
FPg=new T.BufferGeometry();FPg.setAttribute('position',new T.BufferAttribute(new Float32Array(780),3));const fp=new T.Points(FPg,new T.PointsMaterial({size:.22,color:0xffc0cc,transparent:true,opacity:.8,depthWrite:false}));fp.frustumCulled=false;scene.add(fp);
for(let i=0;i<260;i++)FL.push({z:-Math.random()*120,a:Math.random()*6.28,r:Math.sqrt(Math.random())});
for(let i=0;i<36;i++){const m=new T.Mesh(gm.disc,M.rbc);m.scale.set(1.1,1.1,1.1);scene.add(m);RB.push({m,z:-Math.random()*120,a:Math.random()*6.28,r:Math.sqrt(Math.random())})}
addEventListener('resize',rs);setQ();build(0);
}
function rs(){R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
function setQ(){R.setPixelRatio([.6,1,Math.min(devicePixelRatio,2)][cfg.q]);rs()}
function build(i){
if(W){scene.remove(W);G.dg.forEach(d=>d.dispose())}
W=new T.Group();scene.add(W);G.dg=[];G.o=[];G.i=0;G.fl=[];const P=J;G.P=P;G.nr=[];for(let k=1;k<=P.nar;k++)G.nr.push(-P.L*k/(P.nar+1));
scene.background=new T.Color(P.fog);scene.fog=new T.FogExp2(P.fog,.013);
const N=Math.ceil((P.L+60)/3),Sg=28,pos=[],col=[],idx=[],c0=new T.Color(P.col),c1=new T.Color(0xffa0b0);
for(let i=0;i<=N;i++){const z=10-i*3,r=rad(z),c=cx(z);for(let j=0;j<Sg;j++){const a=j/Sg*6.2832,rr=r*(1+.05*Math.sin(a*5+z*.2)+.03*Math.sin(a*9-z*.5));pos.push(c+Math.cos(a)*rr,Math.sin(a)*rr,z);const k=(.5+.5*Math.sin(a*7+z*.15)*Math.sin(z*.07+a))*.5,m=new T.Color(ZZ(z).col).lerp(c1,k);col.push(m.r,m.g,m.b)}}
for(let i=0;i<N;i++)for(let j=0;j<Sg;j++){const a=i*Sg+j,b=i*Sg+(j+1)%Sg,c=a+Sg,d=b+Sg;idx.push(a,b,c,b,d,c)}
const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('color',new T.Float32BufferAttribute(col,3));g.setIndex(idx);g.computeVertexNormals();
const tm=new T.MeshStandardMaterial({vertexColors:true,roughness:.5,side:T.DoubleSide,emissive:c0.clone().multiplyScalar(.28)});W.add(new T.Mesh(g,tm));G.tm=tm;G.dg.push(g,tm);const rg=new T.MeshBasicMaterial({color:0xff7a90,transparent:true,opacity:.18,blending:T.AdditiveBlending,depthWrite:false});G.dg.push(rg);for(let z=-20;z>-P.L-40;z-=26){const m=new T.Mesh(gm.ring,rg),q=rad(z)*.97;m.position.set(cx(z),0,z);m.scale.set(q,q,1);W.add(m)}
const hm=new T.Mesh(HG,new T.MeshStandardMaterial({color:0x6a1a28,emissive:0x3a0610,emissiveIntensity:.8,roughness:.4,fog:false}));hm.scale.setScalar(.9);hm.position.set(cx(-P.L-22),0,-P.L-22);W.add(hm);G.hm=hm;G.dg.push(hm.material);
const hl=new T.PointLight(0xff4060,2,60);hl.position.set(hm.position.x,0,hm.position.z+8);W.add(hl);
let ai=0,aj=1,bi=0;const BG=['fruit','water','omega','fruit','exercise','water','omega','shield','orb','fruit','pill'];const r=rng(77+i*13),add=(o,m)=>{o.m=m;o.on=1;m.position.set(cx(o.z)+o.lx,o.ly,o.z);W.add(m);G.o.push(o)};
for(let z=-45;z>-P.L+5;z-=100/ZZ(z).ob*(.85+r()*.3)){
const x=r(),w=ZZ(z).w,t=x<w[0]?'plaque':x<w[0]+w[1]?'rbc':x<w[0]+w[1]+w[2]?'clot':'damage',Rr=rad(z),a=(ai+=2.4+(r()-.5)*.5),o={k:'o',t,z,ph:r()*6.283,r:1.2,d:8,lx:0,ly:0};let m;
if(t=='plaque'){const s=Math.min(1.3+r()*1.1,Rr*.3);m=new T.Mesh(gm.lump,M.plaque);m.scale.set(s,s*.8,s);o.r=s*.85;o.d=14;const d=Rr-s*.5;o.lx=Math.cos(a)*d;o.ly=Math.sin(a)*d;m.rotation.set(r()*3,r()*3,0)}
else if(t=='rbc'){m=new T.Mesh(gm.disc,M.rbc);m.scale.set(1.5,1.5,1.5);o.bx=Math.cos(a)*Rr*.4;o.ly=Math.sin(a)*Rr*.4;o.am=Rr*.4;o.mv=1;o.lx=o.bx}
else if(t=='clot'){m=new T.Mesh(gm.lump,M.clot);m.scale.setScalar(1.5);o.r=1.5;o.d=20;o.rho=Rr*.45;o.w=(r()<.5?-1:1)*(1+r()*.6);o.mv=2;o.lx=o.rho}
else{m=new T.Mesh(gm.cone,M.damage);m.rotation.z=a+Math.PI/2;m.scale.set(1.3,1,1.3);o.r=1.1;o.d=10;const d=Rr-1.1;o.lx=Math.cos(a)*d;o.ly=Math.sin(a)*d}
add(o,m)}
for(let z=-30;z>-P.L;z-=100/P.it*(.85+r()*.3)){if(G.o.some(q=>q.k=='o'&&Math.abs(q.z-z)<7))z-=8;const x=r(),ty=BG[bi++%11],Rr=rad(z),a=(aj+=2.4+(r()-.5)*.5),d=Math.sqrt(r())*Rr*.62;add({k:'i',t:ty,z,r:1.1,lx:Math.cos(a)*d,ly:Math.sin(a)*d},itemMesh(ty))}
G.o.sort((a,b)=>b.z-a.z)}
function burst(x,y,z,c,n){const col=new T.Color(c),p=pg.attributes.position.array;for(let k=0;k<PN&&n>0;k++)if(PLf[k]<=0){PLf[k]=1;p[k*3]=x;p[k*3+1]=y;p[k*3+2]=z;for(let j=0;j<3;j++)PV[k*3+j]=(Math.random()-.5)*8;PB[k*3]=col.r;PB[k*3+1]=col.g;PB[k*3+2]=col.b;n--}}
function trail(x,y,z,c){const col=new T.Color(c),p=pg.attributes.position.array;for(let k=0;k<PN;k++)if(PLf[k]<=0){PLf[k]=.55;p[k*3]=x;p[k*3+1]=y;p[k*3+2]=z;PV[k*3]=(Math.random()-.5)*.8;PV[k*3+1]=(Math.random()-.5)*.8;PV[k*3+2]=4;PB[k*3]=col.r;PB[k*3+1]=col.g;PB[k*3+2]=col.b;return}}
function fl(o){G.fl.push({m:o.m,t:0,s:o.m.scale.clone()})}
function fx(dt){const p=pg.attributes.position.array,c=pg.attributes.color.array;
for(let k=0;k<PN;k++)if(PLf[k]>0){PLf[k]-=dt*1.5;if(PLf[k]<=0){p[k*3+1]=-9999;continue}for(let j=0;j<3;j++){p[k*3+j]+=PV[k*3+j]*dt;c[k*3+j]=PB[k*3+j]*PLf[k]}}
pg.attributes.position.needsUpdate=pg.attributes.color.needsUpdate=true;
const fp=FPg.attributes.position.array,rc=o=>{if(o.z>G.z+14){o.z=G.z-110-Math.random()*15;o.a=Math.random()*6.28;o.r=Math.sqrt(Math.random())}else if(o.z<G.z-135)o.z=G.z+10};
FL.forEach((f,i)=>{f.z-=dt*6;rc(f);const r=f.r*rad(f.z)*.93;fp[i*3]=cx(f.z)+Math.cos(f.a)*r;fp[i*3+1]=Math.sin(f.a)*r;fp[i*3+2]=f.z});FPg.attributes.position.needsUpdate=true;
RB.forEach(b=>{b.z-=dt*9;rc(b);const r=b.r*rad(b.z)*.8;b.m.position.set(cx(b.z)+Math.cos(b.a)*r,Math.sin(b.a)*r,b.z);b.m.rotation.x+=dt;b.m.rotation.y+=dt*.7})}
function aud(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.connect(AC.destination);vol();
const b=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=AC.createBufferSource();s.buffer=b;s.loop=true;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=260;const g=AC.createGain();g.gain.value=.12;s.connect(f);f.connect(g);g.connect(MG);s.start();
const sc=[261.6,293.7,329.6,392,440];setInterval(()=>{if(st=='play'||st=='menu')tone(sc[(mi++*3)%5]*(mi%4?1:.5),.9,'sine',.05)},700);beat()}catch(e){}}
function beat(){setTimeout(beat,st=='play'?Math.max(450,900-(100-G.hp)*4):900);if(AC&&(st=='play'||st=='menu')){tone(70,.12,'sine',.5,40);setTimeout(()=>tone(60,.14,'sine',.4,35),170)}}
function vol(){if(MG)MG.gain.value=cfg.mute?0:cfg.vol}
function tone(f,d,ty,v,f2){if(!AC)return;const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(MG);o.start(t);o.stop(t+d)}
const sfx=k=>{const a=S[k];a&&tone(a[0],a[1],a[2],a[3],a[4])};
function show(id){document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id==id))}
function setSt(s){st=s;document.body.classList.toggle('play',s=='play'||s=='pause'||s=='learn')}
function msg(t,ms){const e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(G.tt);G.tt=setTimeout(()=>e.classList.remove('on'),ms||5000)}
function fact(k){if(G.seen.has(k)||!F[k]||st!='play')return;G.seen.add(k);G.tch=0;setSt('learn');$('lk').textContent='🫀 KNOWLEDGE '+G.seen.size+' / '+Object.keys(F).length;$('lt').textContent=D[k][0];$('lf').textContent=F[k];$('ld').textContent=D[k][1];const b=$('lb');b.disabled=true;setTimeout(()=>b.disabled=false,1200);show('learn')}
function closeLearn(){if(st=='learn'){setSt('play');show('')}}
function flash(){const f=$('flash');f.style.opacity=.6;setTimeout(()=>f.style.opacity=0,120)}
function ban(t){const b=$('ban');b.textContent=t;b.style.opacity=1;setTimeout(()=>b.style.opacity=0,2400)}
function err(e){if(errd++)return;const x=$('err');x.style.display='block';x.textContent='Error: '+(e&&e.message||e)}
function newGame(){Object.assign(G,{hp:100,en:100,sc:0,n:0,ch:0,cnt:{},hits:{},seen:new Set()});startLevel(0)}
function startLevel(i){lv=i;build(i);Object.assign(G,{z:0,px:0,py:0,vx:0,vy:0,inv:0,boost:0,regen:0,pulse:0,hit:0,shake:0,hs:1,t:0,ct:0,hp:Math.min(100,G.hp+(i?20:0))});G.ls={sc:G.sc,n:G.n};ts=1;pl.visible=true;MH.visible=false;setSt('play');show('');ban('ZONE 1 — '+LV[0].n);if(!i)msg('Drag to steer (or WASD / arrows). Double-tap or Space = Pulse.',6000)}
function retry(){G.sc=G.ls.sc;G.n=G.ls.n;G.hp=100;G.en=100;startLevel(lv)}
function toMenu(){setSt('menu');lv=0;build(0);G.z=0;pl.visible=false;MH.visible=true;show('menu')}
function pause(){if(st=='play'){setSt('pause');show('pause')}}
function resume(){if(st=='pause'){setSt('play');show('')}}
function useAb(){if(st=='play'&&G.ch>0&&G.pulse<=0){G.ch--;G.pulse=5;sfx('orb');msg('Pulse active: magnet + slow motion',2000)}}
function take(o){o.on=0;fl(o);const t=o.t;G.cnt[t]=(G.cnt[t]||0)+1;
if(t=='fruit'){G.hp=Math.min(100,G.hp+25);G.sc+=50}else if(t=='omega')G.sc+=200;else if(t=='exercise'){G.boost=5;G.sc+=50}else if(t=='water'){G.en=Math.min(100,G.en+35);G.sc+=50}else if(t=='shield'){G.inv=6;G.sc+=50}else if(t=='pill'){G.regen=8;G.sc+=75}else{G.ch=Math.min(3,G.ch+1);G.sc+=100}
G.n++;sfx(t);burst(o.m.position.x,o.m.position.y,o.m.position.z,{fruit:0xff8a2a,omega:0xffd24a,exercise:0x3dff9a,water:0x4aa8ff,shield:0x2ee6d0,orb:0xff5aa0,pill:0xff6a7a}[t],14);fact(t)}
function hurt(o){const p=o.m.position;if(G.inv>0){o.on=0;fl(o);G.sc+=25;sfx('bump');burst(p.x,p.y,p.z,0x2ee6d0,12);return}
if(G.hit>0)return;G.hp-=o.d*.6;G.hits[o.t]=(G.hits[o.t]||0)+1;G.hit=1.5;G.shake=.4;G.hs=.55;flash();sfx('hit');burst(p.x,p.y,p.z,0xff2040,18);fact(o.t=='rbc'?'rbc':o.t);if(G.hp<=0){setSt('over');sfx('over');$('os').innerHTML='Score <b>'+(G.sc|0)+'</b> · Distance <b>'+(-G.z|0)+' m</b> · Items <b>'+G.n+'</b>';show('over')}}
function play(dt){const P=G.P;G.t+=dt;for(const k of['inv','boost','pulse','hit','shake','regen'])G[k]=Math.max(0,G[k]-dt);if(G.regen>0)G.hp=Math.min(100,G.hp+dt*2.5);
ts+=((G.pulse>0?.6:1)-ts)*Math.min(1,dt*4);G.hs=Math.min(1,G.hs+dt*.9);G.en=Math.max(0,G.en-dt*.8);
const sp=P.sp*(1+.15*(G.zi||0))*(G.boost>0?1.35:1)*(G.en<=0?.55:1)*ts*G.hs,ix=(K.r?1:0)-(K.l?1:0),iy=(K.u?1:0)-(K.d?1:0),e=Math.min(1,dt*8);
const tx=G.tch?Math.max(-14,Math.min(14,(G.tx-G.px)*7)):ix*12,ty=G.tch?Math.max(-14,Math.min(14,(G.ty-G.py)*7)):iy*12;G.vx+=(tx-G.vx)*e;G.vy+=(ty-G.vy)*e;G.px+=G.vx*dt;G.py+=G.vy*dt;G.z-=sp*dt;
const z=G.z,mx=rad(z)-1,l=Math.hypot(G.px,G.py);if(l>mx){G.px*=mx/l;G.py*=mx/l}
G.sc+=dt*sp*.3;pl.position.set(cx(z)+G.px,G.py,z);pl.rotation.set(G.vy*.04,-G.vx*.03,-G.vx*.07);PL.position.set(pl.position.x,G.py+1.5,z+3);PL2.position.set(pl.position.x,G.py,z-14);trail(pl.position.x+(Math.random()-.5)*.5,G.py+(Math.random()-.5)*.3,z+1.3,G.boost>0?0xffd24a:0x4aa8ff);
pl.sh.visible=G.inv>0;G.tm.emissiveIntensity=1+.6*Math.max(0,Math.sin(G.t*6));pl.ring.scale.set(.8+Math.sin(G.t*6)*.06,.8+Math.sin(G.t*6)*.06,1);pl.eng.forEach(m=>m.scale.z=.3+Math.random()*.25*(G.boost>0?3:1));
if(G.nr.some(s=>Math.abs(z-s)<28))fact('narrow');
const o=G.o;while(G.i<o.length&&o[G.i].z>z+4)G.i++;
for(let j=G.i;j<o.length&&o[j].z>z-90;j++){const b=o[j];if(!b.on)continue;const dz=b.z-z;
if(b.mv==1){b.lx=b.bx+Math.sin(G.t*1.5+b.ph)*b.am;b.m.rotation.y+=dt}else if(b.mv==2){const q=b.ph+G.t*b.w;b.lx=Math.cos(q)*b.rho;b.ly=Math.sin(q)*b.rho;b.m.scale.setScalar(1.5+Math.sin(G.t*6)*.15);b.m.rotation.x+=dt*1.2;b.m.rotation.y+=dt*.9}
else if(b.k=='i'){b.m.rotation.y+=dt*2;b.m.scale.setScalar(1+Math.sin(G.t*5+b.z)*.1);if(G.pulse>0&&dz<0&&dz>-26){b.lx+=(G.px-b.lx)*dt*5;b.ly+=(G.py-b.ly)*dt*5}}
b.m.position.set(cx(b.z)+b.lx,b.ly+(b.k=='i'?Math.sin(G.t*3+b.z)*.3:0),b.z);
if(Math.abs(dz)<2.8&&Math.hypot(b.lx-G.px,b.ly-G.py,dz)<b.r+(b.k=='i'?.9:.4))b.k=='i'?take(b):hurt(b)}
G.fl=G.fl.filter(f=>{f.t+=dt/.35;f.m.scale.copy(f.s).multiplyScalar(Math.max(.01,1-f.t*f.t));f.m.position.lerp(pl.position,Math.min(1,f.t*.7));f.m.rotation.y+=dt*14;if(f.t>=1){W.remove(f.m);return false}return true});
if(st!='play')return;
if(z<-P.L-8){if(0){setSt('card');sfx('win');$('ct').textContent='LEVEL '+(lv+1)+' COMPLETE';$('cs').innerHTML='Score <b>'+(G.sc|0)+'</b> · Items <b>'+G.n+'</b><br>Next: '+LV[lv+1].n;show('card')}else{setSt('cine');G.ct=0;pl.visible=false;sfx('win')}return}
zone(dt);camU(dt);hud();ecg(dt)}
const C1=new T.Color(0x6a1a28),C2=new T.Color(0xff2a4a),E1=new T.Color(0x3a0610),E2=new T.Color(0xff2040);
function cine(dt){G.ct+=dt;const h=G.hm,k=Math.min(1,G.ct/3.5),m=h.material,c=h.position,zc=-G.P.L-6-k*3;
m.color.lerpColors(C1,C2,k);m.emissive.lerpColors(E1,E2,k);m.emissiveIntensity=.8+k*1.2;h.scale.setScalar(.9*(1+Math.sin(G.ct*7)*.05*k));h.rotation.y=Math.sin(G.ct*.5)*.4;
cam.position.set(cx(zc)+Math.sin(G.ct*.5)*2.5,2,zc);cam.lookAt(c);if(Math.random()<.5)burst(c.x+(Math.random()-.5)*14,(Math.random()-.5)*12,c.z+4,0xff7090,3);
if(G.ct>6.5){setSt('win');sfx('win');{const cc=G.cnt,hh=G.hits,g=k=>cc[k]||0,x=k=>hh[k]||0,gr=G.hp>=70?'Excellent':G.hp>=40?'Good':'Needs care';$('ws').innerHTML='<b>YOUR HEART REPORT</b><br>Heart health <b>'+(G.hp|0)+'%</b> · '+gr+' · Score <b>'+(G.sc|0)+'</b> · Items <b>'+G.n+'</b><br>Healthy habits collected: 🍊 '+g('fruit')+' · 💧 '+g('water')+' · 🥇 '+g('omega')+' · ⚡ '+g('exercise')+' · 💊 '+g('pill')+' · 🛡 '+g('shield')+'<br>Hazards hit: plaques '+x('plaque')+' · clots '+x('clot')+' · cell traffic '+x('rbc')+' · damaged walls '+x('damage')+'<br><b>Your 3 takeaways:</b> 1) Get your blood pressure and cholesterol checked. 2) Move regularly and eat for your heart. 3) Take medicines as prescribed and talk to your pharmacist.<br>Facts you learned:'}$('wl').innerHTML=[...G.seen].map(k=>'<li><b>'+D[k][0]+':</b> '+F[k]+'</li>').join('');show('win')}}
function menu(dt){G.t+=dt;MH.position.set(cx(0)+(innerWidth>innerHeight?3.6:0),0,-9);MH.rotation.y+=dt*.6;MH.scale.setScalar(.55*(1+Math.max(0,Math.sin(G.t*5.5))*.06));cam.position.set(cx(0),.4,6);cam.lookAt(cx(0),0,-9)}
function camU(dt){const z=G.z,e=Math.min(1,dt*6),s=G.shake*.8;cam.position.x+=(cx(z+9)+G.px*.55-cam.position.x)*e;cam.position.y+=(G.py*.55+1.6-cam.position.y)*e;cam.position.z=z+9;cam.position.x+=(Math.random()-.5)*s;cam.position.y+=(Math.random()-.5)*s;
cam.lookAt(cx(z-14)+G.px*.4,G.py*.4,z-14);cam.rotateZ(-G.vx*.004);cam.fov+=((70+(G.boost>0?12:0)-(G.pulse>0?6:0))-cam.fov)*e;cam.updateProjectionMatrix()}
function hud(){$('hb').style.width=G.hp+'%';$('eb').style.width=G.en+'%';$('pb').style.width=Math.min(100,-G.z/G.P.L*100)+'%';$('sc').textContent='SCORE '+(G.sc|0);$('ds').textContent=(-G.z|0)+' m';$('it').textContent='ITEMS '+G.n;$('lv').textContent='ZONE '+((G.zi||0)+1)+' · '+LV[G.zi||0].n;$('ms').textContent=G.P.m;
$('chips').innerHTML=(G.inv>0?'<b>SHIELD</b>':'')+(G.boost>0?'<b>BOOST</b>':'')+(G.regen>0?'<b>MEDICINE</b>':'')+(G.pulse>0?'<b>PULSE</b>':'')+(G.en<=0?'<b>LOW ENERGY</b>':'')+(G.ch>0&&G.pulse<=0?'<b>PULSE READY x'+G.ch+'</b>':'');$('ab').textContent='PULSE '+'◆'.repeat(G.ch)+'◇'.repeat(3-G.ch)}
const EC={b:new Array(120).fill(0),ph:0,acc:0};
function ecg(dt){const c=$('ecg').getContext('2d'),per=Math.max(.5,1-(100-G.hp)*.006);EC.ph=(EC.ph+dt/per)%1;EC.acc+=dt*90;
while(EC.acc>=1){EC.acc--;const p=EC.ph;let y=p<.1?Math.sin(p/.1*Math.PI)*.15:p>.16&&p<.2?-(p-.16)/.04*.2:p>=.2&&p<.26?-.2+(p-.2)/.06*1.2:p>=.26&&p<.32?1-(p-.26)/.06*1.5:p>=.32&&p<.36?-.5+(p-.32)/.04*.5:p>.45&&p<.6?Math.sin((p-.45)/.15*Math.PI)*.25:0;y+=(Math.random()-.5)*(100-G.hp)/100*.6;EC.b.push(y);EC.b.shift()}
c.clearRect(0,0,160,36);c.strokeStyle=G.hp<35?'#ff4060':'#2ee6d0';c.lineWidth=1.6;c.beginPath();EC.b.forEach((y,i)=>{const X=i*1.33,Y=26-y*20;i?c.lineTo(X,Y):c.moveTo(X,Y)});c.stroke()}
function zone(dt){const zi=Math.max(0,Math.min(2,Math.floor(-G.z/(J.L/3))));if(zi!=G.zi){G.zi=zi;if(zi)ban('ZONE '+(zi+1)+' — '+LV[zi].n)}const c=new T.Color(LV[zi].fog);scene.fog.color.lerp(c,dt*1.5);scene.background.lerp(c,dt*1.5)}
function lab(){$('bm').textContent='SOUND: '+(cfg.mute?'OFF':'ON');$('bq').textContent='GRAPHICS: '+['LOW','MEDIUM','HIGH'][cfg.q];$('bp').textContent='PRESENTATION MODE: '+(cfg.pres?'ON':'OFF')}
const A={learned:closeLearn,play:newGame,how:()=>show('how'),about:()=>show('about'),set:()=>{back=st=='pause'?'pause':'menu';show('set')},menu:toMenu,back:()=>show(back),resume,restart:newGame,retry,next:()=>startLevel(lv+1),mute:()=>{cfg.mute=!cfg.mute;vol();lab()},q:()=>{cfg.q=(cfg.q+1)%3;setQ();lab()},pres:()=>{cfg.pres=!cfg.pres;document.body.classList.toggle('pres',cfg.pres);lab()},fs:()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
document.querySelectorAll('button[data-a]').forEach(b=>b.onclick=()=>{aud();A[b.dataset.a]()});
let tp=null,lastTap=0;
addEventListener('pointerdown',e=>{if(st!='play'||e.target.closest('button,input'))return;tp={id:e.pointerId,x:e.clientX,y:e.clientY,sx:G.px,sy:G.py,t:performance.now(),m:0};G.tch=1;G.tx=G.px;G.ty=G.py});
addEventListener('pointermove',e=>{if(!tp||e.pointerId!=tp.id)return;const k=22/Math.min(innerWidth,innerHeight),dx=e.clientX-tp.x,dy=e.clientY-tp.y;tp.m=Math.max(tp.m,Math.hypot(dx,dy));G.tx=tp.sx+dx*k;G.ty=tp.sy-dy*k});
const tup=e=>{if(!tp||e.pointerId!=tp.id)return;const n=performance.now();if(tp.m<12&&n-tp.t<300){if(n-lastTap<350)useAb();lastTap=n}tp=null;G.tch=0};
addEventListener('pointerup',tup);addEventListener('pointercancel',tup);
$('vol').oninput=e=>{cfg.vol=+e.target.value;vol()};
const KM={ArrowLeft:'l',a:'l',A:'l',ArrowRight:'r',d:'r',D:'r',ArrowUp:'u',w:'u',W:'u',ArrowDown:'d',s:'d',S:'d'};
addEventListener('keydown',e=>{if(st=='learn'){if((e.code=='Space'||e.key=='Enter')&&!$('lb').disabled){e.preventDefault();closeLearn()}return}const k=KM[e.key];if(k){K[k]=1;e.preventDefault()}else if(e.code=='Space'){e.preventDefault();useAb()}else if(e.key=='Escape'||e.key=='p'){st=='play'?pause():resume()}});
addEventListener('keyup',e=>{const k=KM[e.key];if(k)K[k]=0});addEventListener('blur',()=>{for(const k in K)K[k]=0;pause()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
document.querySelectorAll('#pad [data-k]').forEach(b=>{const k=b.dataset.k;b.onpointerdown=e=>{e.preventDefault();K[k]=1};b.onpointerup=b.onpointerleave=b.onpointercancel=()=>K[k]=0});
$('ab').onpointerdown=e=>{e.preventDefault();useAb()};
if(matchMedia('(pointer:coarse)').matches)document.body.classList.add('touch');
addEventListener('error',e=>err(e.error||e.message));
let lt=0;const loop=t=>{requestAnimationFrame(loop);const dt=Math.min((t-lt)/1e3,.05)||0;lt=t;try{if(st=='play')play(dt);else if(st=='menu')menu(dt);else if(st=='cine')cine(dt);if(st!='pause'&&st!='load')fx(dt);R.render(scene,cam)}catch(e){err(e)}};
try{init();lab();menu(0);requestAnimationFrame(loop);setTimeout(()=>{setSt('menu');show('menu')},1400)}catch(e){err(e)}
