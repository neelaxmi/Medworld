const $=s=>document.querySelector(s);
const panel=$("#systemPanel"),visual=$("#systemVisual"),title=$("#systemTitle"),kicker=$("#systemKicker"),description=$("#systemDescription");
const flowSteps=[
["SYSTEMIC VEINS","RIGHT ATRIUM","TRICUSPID VALVE","RIGHT VENTRICLE","PULMONARY VALVE","PULMONARY TRUNK","LUNGS","PULMONARY VEINS","LEFT ATRIUM","MITRAL VALVE","LEFT VENTRICLE","AORTIC VALVE","AORTA","BODY"],
["Body tissues return oxygen-poor blood through the superior and inferior venae cavae to the right atrium. The right ventricle sends it through the pulmonary valve and pulmonary arteries to the lungs. Oxygenated blood returns through pulmonary veins to the left atrium, passes through the mitral valve into the left ventricle, then exits through the aortic valve and aorta to systemic tissues."]
];
const coronary=[["AORTIC ROOT","LEFT CORONARY","LAD / ANTERIOR INTERVENTRICULAR","SEPTAL + DIAGONAL BRANCHES","ANTERIOR LV + SEPTUM"],["LEFT CORONARY","CIRCUMFLEX","OBTUSE MARGINAL BRANCHES","LATERAL / POSTEROLATERAL LV"],["AORTIC ROOT","RIGHT CORONARY","RIGHT MARGINAL","RIGHT ATRIUM + RV"],["RIGHT OR LEFT DOMINANT","POSTERIOR DESCENDING (PDA)","INFERIOR WALL + POSTERIOR SEPTUM"]];
const conduction=[["SA NODE","ATRIAL MYOCARDIUM","AV NODE","AV BUNDLE / HIS","RIGHT + LEFT BUNDLE BRANCHES","PURKINJE NETWORK","VENTRICULAR MYOCARDIUM"],["The SA node initiates the normal impulse. Atrial activation follows. Conduction slows in the AV node, allowing ventricular filling, then travels through the His bundle, bundle branches and Purkinje network to coordinate ventricular activation."]];
function pathway(groups,desc){visual.innerHTML=groups.map((g,i)=>'<div class="atlas-path-row">'+g.map((x,j)=>'<span class="atlas-path-node '+(i===0?'cool':'warm')+'">'+x+'</span>'+(j<g.length-1?'<b class="atlas-path-arrow">→</b>':'')).join('')+'</div>').join('');description.innerHTML=desc.map(x=>'<p>'+x+'</p>').join('');}
document.querySelectorAll("[data-system]").forEach(b=>b.addEventListener("click",()=>{const type=b.dataset.system;panel.hidden=false;document.querySelectorAll("[data-system]").forEach(x=>x.classList.toggle("active",x===b));if(type==="flow"){kicker.textContent="HAEMODYNAMIC PATHWAY";title.textContent="Complete blood-flow circuit";pathway([flowSteps[0].slice(0,7),flowSteps[0].slice(7)],flowSteps[1]);}else if(type==="coronary"){kicker.textContent="CORONARY ARTERIAL TREE";title.textContent="Myocardial blood supply";pathway(coronary,[ "The right and left coronary arteries arise from the aortic root. Common branch patterns are shown; coronary dominance and individual anatomy vary.","Coronary perfusion is predominantly during diastole in the left coronary circulation. The diagram is a teaching map, not patient-specific angiography."]);}else{kicker.textContent="CARDIAC ELECTROPHYSIOLOGY";title.textContent="Electrical conduction pathway";pathway(conduction,[conduction[1][0],"The conduction system is shown schematically; fine anatomical course and variants are not rendered as 3D meshes in the current heart asset."]);}panel.scrollIntoView({behavior:"smooth",block:"nearest"});}));
$("#closeSystem").addEventListener("click",()=>{panel.hidden=true;document.querySelectorAll("[data-system]").forEach(x=>x.classList.remove("active"));});
const dialog=$("#mechanismDialog"),mechVisual=$("#mechanismVisual"),step=$("#mechanismStep"),stepTitle=$("#mechanismStepTitle"),stepText=$("#mechanismStepText"),progress=$("#mechanismProgress"),play=$("#mechanismPlay");
const datasets={
cycle:[
["PHASE 01 / 06","Passive ventricular filling","During diastole, ventricular pressure is below atrial pressure. The atrioventricular valves are open and blood flows from the atria into the ventricles. The semilunar valves remain closed."],
["PHASE 02 / 06","Atrial systole","Atrial depolarisation precedes atrial contraction. The atria contract and add the final portion of ventricular filling; the AV valves remain open."],
["PHASE 03 / 06","Isovolumetric contraction","Ventricular depolarisation initiates contraction. Ventricular pressure rises and the mitral and tricuspid valves close (S1). For a brief interval, all valves are closed and ventricular volume is unchanged."],
["PHASE 04 / 06","Ventricular ejection","When ventricular pressure exceeds aortic and pulmonary arterial pressure, the aortic and pulmonary valves open. Blood is ejected into the aorta and pulmonary trunk."],
["PHASE 05 / 06","Isovolumetric relaxation","Ventricles relax. When arterial pressure exceeds ventricular pressure, the aortic and pulmonary valves close (S2). All valves are briefly closed while ventricular pressure falls."],
["PHASE 06 / 06","Ventricular filling begins again","When ventricular pressure falls below atrial pressure, the AV valves open and filling resumes. The cycle repeats. Timing and pressures vary with heart rate and loading."]
],
flow:[
["FLOW 01 / 04","Right heart receives venous return","Systemic venous blood enters the right atrium through the superior and inferior venae cavae and coronary sinus."],
["FLOW 02 / 04","Right ventricle pumps to lungs","Blood crosses the tricuspid valve into the right ventricle, then passes through the pulmonary valve and pulmonary arteries to the lungs."],
["FLOW 03 / 04","Pulmonary veins return oxygenated blood","Gas exchange occurs in pulmonary capillaries. Oxygenated blood returns to the left atrium through the pulmonary veins."],
["FLOW 04 / 04","Left ventricle supplies the body","Blood crosses the mitral valve into the left ventricle, then passes through the aortic valve into the aorta and systemic circulation."]
],
electric:[
["SIGNAL 01 / 05","SA node initiates the impulse","The sinoatrial node in the right atrium normally initiates sinus rhythm."],
["SIGNAL 02 / 05","Atrial depolarisation","The impulse spreads through atrial myocardium, producing atrial depolarisation and then atrial contraction."],
["SIGNAL 03 / 05","AV nodal delay","Conduction slows through the AV node, allowing time for the ventricles to complete filling."],
["SIGNAL 04 / 05","His–Purkinje conduction","The impulse travels through the AV bundle (Bundle of His), right and left bundle branches, and Purkinje fibres."],
["SIGNAL 05 / 05","Coordinated ventricular activation","Ventricular myocardium depolarises and contracts in a coordinated sequence, generating ejection."]
],
control:[
["CONTROL 01 / 04","Autonomic input","The medulla and autonomic pathways modulate intrinsic cardiac activity; they do not normally initiate each heartbeat."],
["CONTROL 02 / 04","Sympathetic stimulation","Sympathetic fibres, mainly via cardiac plexuses, increase heart rate, conduction velocity and contractility through noradrenergic signalling."],
["CONTROL 03 / 04","Parasympathetic stimulation","Vagal activity releases acetylcholine and generally slows SA-node firing and AV-node conduction."],
["CONTROL 04 / 04","Integrated response","Autonomic tone, circulating hormones, venous return and arterial pressure interact to adjust cardiac output and cardiovascular function."]
]};
let tab="cycle",index=0,timer=null;
function render(){
 const data=datasets[tab],item=data[index];step.textContent=item[0];stepTitle.textContent=item[1];stepText.textContent=item[2];progress.style.width=((index+1)/data.length*100)+"%";
 const isFlow=tab==="flow",isElectric=tab==="electric",isControl=tab==="control";
 mechVisual.innerHTML='<div class="atlas-heart-schematic '+(isFlow?'flow-mode':isElectric?'electric-mode':isControl?'control-mode':'cycle-mode')+'"><div class="atlas-schematic-top">CARDIAC FUNCTION / CONCEPTUAL SCHEMATIC</div><div class="atlas-chamber-grid"><div class="atlas-chamber ra">RIGHT ATRIUM</div><div class="atlas-chamber la">LEFT ATRIUM</div><div class="atlas-valve tv">TRICUSPID</div><div class="atlas-valve mv">MITRAL</div><div class="atlas-chamber rv">RIGHT VENTRICLE</div><div class="atlas-chamber lv">LEFT VENTRICLE</div><div class="atlas-valve pv">PULMONARY</div><div class="atlas-valve av">AORTIC</div></div><div class="atlas-schematic-bottom"><span>VENOUS RETURN</span><b>→</b><span>LUNGS</span><b>→</b><span>SYSTEMIC OUTPUT</span></div><div class="atlas-schematic-pulse"></div></div>';
 mechVisual.querySelector(".atlas-heart-schematic").style.setProperty("--phase",index);
 $("#mechanismPrev").disabled=index===0;$("#mechanismNext").disabled=index===data.length-1;
}
function stop(){if(timer)clearInterval(timer);timer=null;play.textContent="▶ Play sequence";}
function setTab(t){stop();tab=t;index=0;document.querySelectorAll("[data-mech-tab]").forEach(b=>b.classList.toggle("active",b.dataset.mechTab===t));render();}
$("#openMechanism").addEventListener("click",()=>{dialog.hidden=false;document.body.classList.add("atlas-dialog-open");setTab("cycle");});
$("#closeMechanism").addEventListener("click",()=>{stop();dialog.hidden=true;document.body.classList.remove("atlas-dialog-open");});
dialog.addEventListener("click",e=>{if(e.target===dialog){stop();dialog.hidden=true;document.body.classList.remove("atlas-dialog-open");}});
document.querySelectorAll("[data-mech-tab]").forEach(b=>b.addEventListener("click",()=>setTab(b.dataset.mechTab)));
$("#mechanismPrev").addEventListener("click",()=>{stop();index=Math.max(0,index-1);render();});
$("#mechanismNext").addEventListener("click",()=>{stop();index=Math.min(datasets[tab].length-1,index+1);render();});
play.addEventListener("click",()=>{if(timer){stop();return;}if(index===datasets[tab].length-1)index=0;play.textContent="Ⅱ Pause";render();timer=setInterval(()=>{if(index>=datasets[tab].length-1){stop();return;}index++;render();},3600);play.textContent="Ⅱ Pause";});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dialog.hidden){stop();dialog.hidden=true;document.body.classList.remove("atlas-dialog-open");}});
render();