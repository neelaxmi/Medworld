const $=s=>document.querySelector(s);
const dialog=$("#mechanismDialog"),step=$("#mechanismStep"),stepTitle=$("#mechanismStepTitle"),stepText=$("#mechanismStepText"),progress=$("#mechanismProgress"),play=$("#mechanismPlay");
const tabs=[...document.querySelectorAll("[data-mech-tab]")];
const datasets={
flow:[
["FLOW 01 / 08","Systemic venous return","Blood returning from the body enters the right atrium through the superior and inferior venae cavae. The current anatomical asset includes the superior vena cava; the inferior vena cava is an atlas reference, not a selectable mesh.","superior-vena-cava",["superior-vena-cava","right-atrium"],"#5da9d8"],
["FLOW 02 / 08","Right atrial filling","The right atrium receives systemic venous blood and passes it through the tricuspid valve into the right ventricle. The tricuspid valve is not a separate mesh in this asset.","right-atrium",["superior-vena-cava","right-atrium"],"#5da9d8"],
["FLOW 03 / 08","Right ventricular ejection","Right ventricular contraction raises pressure. When it exceeds pulmonary arterial pressure, the pulmonary valve opens and blood enters the pulmonary trunk.","right-ventricle",["right-atrium","right-ventricle","pulmonary-trunk"],"#5da9d8"],
["FLOW 04 / 08","Pulmonary circulation","Blood travels through pulmonary arteries to lung capillaries for gas exchange. The pulmonary arterial branches and lungs are not part of the current heart mesh.","pulmonary-trunk",["right-ventricle","pulmonary-trunk"],"#5da9d8"],
["FLOW 05 / 08","Pulmonary venous return","Oxygenated blood returns from the lungs through pulmonary veins to the left atrium. Pulmonary veins are atlas references but are not separate meshes in this asset.","left-atrium",["pulmonary-trunk","left-atrium"],"#e66b63"],
["FLOW 06 / 08","Left ventricular filling","Blood crosses the mitral valve from the left atrium into the left ventricle. The mitral valve is described in the atlas but is not a selectable mesh.","left-ventricle",["left-atrium","left-ventricle"],"#e66b63"],
["FLOW 07 / 08","Aortic ejection","Left ventricular contraction raises pressure above aortic pressure. The aortic valve opens and blood is ejected into the ascending aorta.","ascending-aorta",["left-ventricle","ascending-aorta"],"#e66b63"],
["FLOW 08 / 08","Systemic distribution","The aorta distributes oxygenated blood to systemic tissues. Animated particles connect included 3D structures; omitted vascular segments are explained rather than falsely rendered.","aortic-arch",["ascending-aorta","aortic-arch"],"#e66b63"]],
cycle:[
["CYCLE 01 / 06","Passive ventricular filling","During diastole, ventricular pressure is below atrial pressure. The tricuspid and mitral valves are open; the aortic and pulmonary valves are closed.","right-ventricle",null,null],
["CYCLE 02 / 06","Atrial systole","Atrial depolarisation (P wave) is followed by atrial contraction, adding the final portion of ventricular filling. AV valves remain open.","right-atrium",null,null],
["CYCLE 03 / 06","Isovolumetric contraction","After ventricular depolarisation (QRS), ventricular pressure rises. The mitral and tricuspid valves close (S1); all four valves are briefly closed.","left-ventricle",null,null],
["CYCLE 04 / 06","Ventricular ejection","When ventricular pressure exceeds aortic and pulmonary arterial pressure, semilunar valves open and blood is ejected into the great arteries.","ascending-aorta",["left-ventricle","ascending-aorta"],"#e66b63"],
["CYCLE 05 / 06","Isovolumetric relaxation","Ventricles relax. The aortic and pulmonary valves close (S2); all valves are briefly closed while ventricular pressure falls.","left-ventricle",null,null],
["CYCLE 06 / 06","Filling resumes","When ventricular pressure falls below atrial pressure, the AV valves open and ventricular filling begins again.","right-ventricle",null,null]],
electric:[
["SIGNAL 01 / 05","SA node fires","The sinoatrial node near the SVC–right atrial junction normally initiates the heartbeat. It is an atlas reference, not a separate mesh in this model.","right-atrium",null,null],
["SIGNAL 02 / 05","Atrial depolarisation","The impulse spreads through atrial myocardium, producing the P wave and then atrial contraction.","right-atrium",null,null],
["SIGNAL 03 / 05","AV nodal delay","The impulse slows in the AV node near the lower interatrial septum, allowing time for ventricular filling.","left-atrium",null,null],
["SIGNAL 04 / 05","His–Purkinje system","The impulse travels through the AV bundle, bundle branches and Purkinje network. These pathways are atlas references, not meshes in the current asset.","ventricular-wall",null,null],
["SIGNAL 05 / 05","Ventricular activation","Ventricular myocardium depolarises and contracts in a coordinated sequence. This focuses on the ventricular wall; individual conduction fibres are not rendered.","left-ventricle",null,null]],
control:[
["CONTROL 01 / 04","Autonomic regulation","The medulla and autonomic pathways modulate intrinsic cardiac activity; they do not normally initiate each heartbeat.","right-atrium",null,null],
["CONTROL 02 / 04","Sympathetic input","Sympathetic cardiac fibres generally increase heart rate, AV conduction velocity and contractility.","right-atrium",null,null],
["CONTROL 03 / 04","Parasympathetic input","Vagal activity releases acetylcholine and generally slows SA-node firing and AV-node conduction.","right-atrium",null,null],
["CONTROL 04 / 04","Integrated response","Autonomic tone interacts with venous return, arterial pressure and circulating hormones to adjust cardiac output.","ventricular-wall",null,null]]
};
let tab="flow",index=0,timer=null,readyTimer=null,range;
function stop(){if(timer)clearInterval(timer);timer=null;play.textContent="▶ Play";}
function animateStep(){const api=window.MedworldHeart;if(!api)return;api.clearFlow();api.setPulse(false);const x=datasets[tab][index];if(!api.getReady())return;if(x[3])api.focusStructure(x[3],1100);if(x[4]?.length>1)api.startFlow(x[4],x[5]||"#63d5c1");if(tab==="cycle"&&[2,3,4].includes(index))api.setPulse(true);}
function render(){const data=datasets[tab],x=data[index];step.textContent=x[0];stepTitle.textContent=x[1];stepText.textContent=x[2];progress.style.width=((index+1)/data.length*100)+"%";if(range){range.max=String(data.length-1);range.value=String(index);}$("#mechanismPrev").disabled=index===0;$("#mechanismNext").disabled=index===data.length-1;animateStep();}
function setTab(t){stop();tab=t;index=0;tabs.forEach(b=>b.classList.toggle("active",b.dataset.mechTab===t));render();}
function close(){stop();clearInterval(readyTimer);dialog.hidden=true;document.body.classList.remove("atlas-dialog-open");window.MedworldHeart?.exitLab();}
function open(){dialog.hidden=false;document.body.classList.add("atlas-dialog-open");window.MedworldHeart?.enterLab();setTab("flow");let tries=0;readyTimer=setInterval(()=>{tries++;if(window.MedworldHeart?.getReady()){clearInterval(readyTimer);animateStep();}if(tries>80)clearInterval(readyTimer);},250);}
range=document.createElement("input");range.type="range";range.id="mechanismTimeline";range.min="0";range.max="7";range.step="1";range.value="0";range.setAttribute("aria-label","Simulation timeline");range.addEventListener("input",()=>{stop();index=Number(range.value);render();});$("#mechanismPlay").parentElement.parentElement.insertBefore(range,$("#mechanismPlay").parentElement);
$("#openMechanism").addEventListener("click",open);$("#closeMechanism").addEventListener("click",close);dialog.addEventListener("click",e=>{if(e.target===dialog)close();});
tabs.forEach(b=>b.addEventListener("click",()=>setTab(b.dataset.mechTab)));
$("#mechanismPrev").addEventListener("click",()=>{stop();index=Math.max(0,index-1);render();});
$("#mechanismNext").addEventListener("click",()=>{stop();index=Math.min(datasets[tab].length-1,index+1);render();});
play.addEventListener("click",()=>{if(timer){stop();return;}if(index===datasets[tab].length-1)index=0;render();play.textContent="Ⅱ Pause";timer=setInterval(()=>{if(index>=datasets[tab].length-1){stop();return;}index++;render();},4200);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dialog.hidden)close();});render();