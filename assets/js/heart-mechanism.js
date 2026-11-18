const $=s=>document.querySelector(s);
const dialog=$("#mechanismDialog"),step=$("#mechanismStep"),stepTitle=$("#mechanismStepTitle"),stepText=$("#mechanismStepText"),progress=$("#mechanismProgress"),play=$("#mechanismPlay");
const tabs=[...document.querySelectorAll("[data-mech-tab]")];
const datasets={
flow:[
["FLOW 01 / 10","Systemic venous return","Deoxygenated blood returns from the upper body through the superior vena cava and from the lower body through the inferior vena cava. Both empty into the right atrium.","right-atrium",["superior-vena-cava","right-atrium"],"#4d9ed0"],
["FLOW 02 / 10","Right atrial filling","The right atrium receives systemic venous blood. During ventricular diastole, the tricuspid valve opens and blood moves into the right ventricle.","tricuspid-valve",["right-atrium","tricuspid-valve","right-ventricle"],"#4d9ed0"],
["FLOW 03 / 10","Right ventricular ejection","Right ventricular systole raises pressure, closes the tricuspid valve and opens the pulmonary valve. Blood is ejected into the pulmonary trunk.","pulmonary-valve",["right-ventricle","pulmonary-valve","pulmonary-trunk"],"#4d9ed0"],
["FLOW 04 / 10","Pulmonary arteries → lungs","The pulmonary trunk divides into right and left pulmonary arteries. Blood passes through lung capillaries where carbon dioxide is released and oxygen is acquired. The lungs are outside this heart-only mesh.","pulmonary-trunk",["pulmonary-trunk"],"#4d9ed0"],
["FLOW 05 / 10","Pulmonary venous return","Oxygenated blood returns from the lungs through usually four pulmonary veins and enters the left atrium.","pulmonary-veins",["pulmonary-veins","left-atrium"],"#df514e"],
["FLOW 06 / 10","Left atrial filling","The left atrium receives oxygenated pulmonary venous blood. The mitral valve opens during ventricular diastole, allowing blood to enter the left ventricle.","mitral-valve",["left-atrium","mitral-valve","left-ventricle"],"#df514e"],
["FLOW 07 / 10","Left ventricular ejection","Left ventricular systole closes the mitral valve. When ventricular pressure exceeds aortic pressure, the aortic valve opens and blood enters the aorta.","aortic-valve",["left-ventricle","aortic-valve","aorta"],"#df514e"],
["FLOW 08 / 10","Systemic distribution","Oxygenated blood travels from the aorta through systemic arteries to tissue capillaries, where oxygen is delivered. Peripheral systemic vessels are outside this heart mesh.","aorta",["aorta"],"#df514e"],
["FLOW 09 / 10","Return to the right heart","After tissue exchange, deoxygenated blood returns through systemic veins to the superior and inferior venae cavae, completing the circulation loop.","superior-vena-cava",["superior-vena-cava","right-atrium"],"#4d9ed0"],
["FLOW 10 / 10","One complete circulation","Pulmonary circulation oxygenates blood in the lungs; systemic circulation delivers oxygen to tissues. The right and left sides work in series, with the two circuits connected through the lungs.","right-atrium",["right-atrium","right-ventricle","pulmonary-trunk","pulmonary-veins","left-atrium","left-ventricle","aorta"],"#df514e"]],
cycle:[
["CYCLE 01 / 06","Ventricular filling","During diastole, ventricular pressure is below atrial pressure. The mitral and tricuspid valves are open; the aortic and pulmonary valves are closed.","right-ventricle",null,null],
["CYCLE 02 / 06","Atrial systole","Atrial depolarisation (P wave) is followed by atrial contraction, adding the final portion of ventricular filling.","right-atrium",null,null],
["CYCLE 03 / 06","Isovolumetric contraction","After ventricular depolarisation (QRS), ventricular pressure rises. The mitral and tricuspid valves close (S1); all four valves are briefly closed.","left-ventricle",null,null],
["CYCLE 04 / 06","Ventricular ejection","When ventricular pressure exceeds aortic and pulmonary arterial pressure, semilunar valves open and blood is ejected into the great arteries.","aortic-valve",["left-ventricle","aortic-valve","aorta"],"#df514e"],
["CYCLE 05 / 06","Isovolumetric relaxation","Ventricles relax. The aortic and pulmonary valves close (S2); all valves are briefly closed while ventricular pressure falls.","pulmonary-valve",null,null],
["CYCLE 06 / 06","Filling resumes","When ventricular pressure falls below atrial pressure, the AV valves open and ventricular filling begins again.","right-atrium",null,null]],
coronary:[
["CORONARY 01 / 06","Coronary origins","The right and left coronary arteries arise from the right and left aortic sinuses at the aortic root.","aorta",["aorta","right-coronary-artery","left-main-coronary-artery"],"#df514e"],
["CORONARY 02 / 06","Right coronary artery","The RCA runs in the right atrioventricular groove and supplies the right atrium and variable portions of the ventricles.","right-coronary-artery",["aorta","right-coronary-artery"],"#df514e"],
["CORONARY 03 / 06","Left main coronary artery","The left main coronary artery arises from the left aortic sinus and commonly divides into the LAD and circumflex arteries.","left-main-coronary-artery",["aorta","left-main-coronary-artery"],"#df514e"],
["CORONARY 04 / 06","LAD pathway","The LAD travels in the anterior interventricular sulcus and commonly supplies the anterior LV wall, apex and anterior septum.","left-anterior-descending-artery",["left-main-coronary-artery","left-anterior-descending-artery"],"#df514e"],
["CORONARY 05 / 06","Circumflex pathway","The circumflex artery courses in the left atrioventricular groove and supplies lateral and sometimes posterolateral LV territories.","circumflex-artery",["left-main-coronary-artery","circumflex-artery"],"#df514e"],
["CORONARY 06 / 06","Coronary venous return","Cardiac veins drain myocardium toward the coronary sinus, which opens into the right atrium. Coronary dominance and branch patterns vary.","coronary-sinus",["cardiac-veins","coronary-sinus"],"#4d9ed0"]],
electric:[
["SIGNAL 01 / 05","SA node fires","The sinoatrial node near the SVC–right atrial junction normally initiates the heartbeat.","sa-node",null,null],
["SIGNAL 02 / 05","Atrial depolarisation","The impulse spreads through atrial myocardium, producing the P wave and then atrial contraction.","right-atrium",null,null],
["SIGNAL 03 / 05","AV nodal delay","The impulse slows in the AV node near the lower interatrial septum, allowing time for ventricular filling.","av-node",null,null],
["SIGNAL 04 / 05","His–Purkinje system","The impulse travels through the AV bundle, bundle branches and Purkinje network.","bundle-of-his",null,null],
["SIGNAL 05 / 05","Ventricular activation","Ventricular myocardium depolarises and contracts in a coordinated sequence.","purkinje-fibers",null,null]],
control:[
["CONTROL 01 / 04","Autonomic regulation","The medulla and autonomic pathways modulate intrinsic cardiac activity; they do not normally initiate each heartbeat.","right-atrium",null,null],
["CONTROL 02 / 04","Sympathetic input","Sympathetic cardiac fibres generally increase heart rate, AV conduction velocity and contractility.","right-atrium",null,null],
["CONTROL 03 / 04","Parasympathetic input","Vagal activity releases acetylcholine and generally slows SA-node firing and AV-node conduction.","sa-node",null,null],
["CONTROL 04 / 04","Integrated response","Autonomic tone interacts with venous return, arterial pressure and circulating hormones to adjust cardiac output.","left-ventricle",null,null]]
};
let tab="flow",index=0,timer=null,readyTimer=null,range;
function stop(){if(timer)clearInterval(timer);timer=null;play.textContent="▶ Play";}
function animateStep(){const api=window.MedworldHeart;if(!api)return;api.clearFlow();api.setPulse(false);const x=datasets[tab][index];if(!api.getReady())return;if(x[3])api.focusStructure(x[3],900);if(x[4]?.length>1)api.startFlow(x[4],x[5]||"#63d5c1");if(tab==="cycle"&&[2,3,4].includes(index))api.setPulse(true);if(x[3])api.selectStructure(x[3]);}
function render(){const data=datasets[tab],x=data[index];step.textContent=x[0];stepTitle.textContent=x[1];stepText.textContent=x[2];progress.style.width=((index+1)/data.length*100)+"%";if(range){range.max=String(data.length-1);range.value=String(index);}$("#mechanismPrev").disabled=index===0;$("#mechanismNext").disabled=index===data.length-1;animateStep();}
function setTab(t){stop();tab=t;index=0;tabs.forEach(b=>b.classList.toggle("active",b.dataset.mechTab===t));render();}
function close(){stop();clearInterval(readyTimer);dialog.hidden=true;document.body.classList.remove("atlas-dialog-open");window.MedworldHeart?.exitLab();}
function open(){dialog.hidden=false;document.body.classList.add("atlas-dialog-open");window.MedworldHeart?.enterLab();setTab("flow");let tries=0;readyTimer=setInterval(()=>{tries++;if(window.MedworldHeart?.getReady()){clearInterval(readyTimer);animateStep();}if(tries>80)clearInterval(readyTimer);},250);}
range=document.createElement("input");range.type="range";range.id="mechanismTimeline";range.min="0";range.max="9";range.step="1";range.value="0";range.setAttribute("aria-label","Simulation timeline");range.addEventListener("input",()=>{stop();index=Number(range.value);render();});const controls=$("#mechanismPlay").parentElement;controls.parentElement.insertBefore(range,controls);
$("#openMechanism").addEventListener("click",open);$("#closeMechanism").addEventListener("click",close);dialog.addEventListener("click",e=>{if(e.target===dialog)close();});
tabs.forEach(b=>b.addEventListener("click",()=>setTab(b.dataset.mechTab)));
$("#mechanismPrev").addEventListener("click",()=>{stop();index=Math.max(0,index-1);render();});
$("#mechanismNext").addEventListener("click",()=>{stop();index=Math.min(datasets[tab].length-1,index+1);render();});
play.addEventListener("click",()=>{if(timer){stop();return;}if(index===datasets[tab].length-1)index=0;render();play.textContent="Ⅱ Pause";timer=setInterval(()=>{if(index>=datasets[tab].length-1){stop();return;}index++;render();},4200);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dialog.hidden)close();});render();