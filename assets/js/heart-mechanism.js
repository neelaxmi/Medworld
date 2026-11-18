const $=s=>document.querySelector(s);
const dialog=$("#mechanismDialog"),visual=$("#mechanismVisual"),step=$("#mechanismStep"),title=$("#mechanismStepTitle"),copy=$("#mechanismStepText"),progress=$("#mechanismProgress"),play=$("#mechanismPlay");
const heart=()=>window.MedworldHeart;
const scenes={
 flow:[
  ["01 / SYSTEMIC VENOUS RETURN","Blood enters the right atrium","Follow venous return from the superior vena cava into the right atrium. The inferior vena cava and coronary sinus are part of the full pathway but are not separate meshes in this source model.","superior-vena-cava",["superior-vena-cava","right-atrium"],"#55a9e8"],
  ["02 / RIGHT VENTRICULAR FILLING","Right atrium to right ventricle","Blood crosses the tricuspid valve into the right ventricle. The valve itself is explained in the atlas; it is not a selectable mesh in this model.","right-ventricle",["right-atrium","right-ventricle"],"#55a9e8"],
  ["03 / PULMONARY EJECTION","Right ventricle to pulmonary trunk","Right ventricular contraction ejects blood through the pulmonary valve into the pulmonary trunk and onward to the lungs. The pulmonary valve and distal pulmonary arteries are not separately modelled here.","pulmonary-trunk",["right-ventricle","pulmonary-trunk"],"#55a9e8"],
  ["04 / PULMONARY RETURN","Lungs to left atrium","After gas exchange in pulmonary capillaries, oxygenated blood returns through pulmonary veins to the left atrium. Pulmonary veins and lung tissue are not included in the current GLB asset.","left-atrium",["pulmonary-trunk","left-atrium"],"#df514d"],
  ["05 / LEFT VENTRICULAR FILLING","Left atrium to left ventricle","Blood passes through the mitral valve into the left ventricle. The mitral valve is a reference-only atlas entry, not a separate mesh in this model.","left-ventricle",["left-atrium","left-ventricle"],"#df514d"],
  ["06 / SYSTEMIC EJECTION","Left ventricle to aorta","Left ventricular systole raises pressure; blood crosses the aortic valve and enters the ascending aorta and arch. The valve is not separately modelled in the current asset.","ascending-aorta",["left-ventricle","ascending-aorta","aortic-arch"],"#df514d"]
 ],
 cycle:[
  ["01 / DIASTOLE","Ventricular filling","Ventricular pressure is below atrial pressure. The AV valves are open and blood enters the ventricles. This is a camera-led anatomy explanation; valve leaflets are not yet animated as independent meshes.","right-atrium",["right-atrium","right-ventricle"],"#55a9e8"],
  ["02 / ATRIAL SYSTOLE","Atrial contraction completes filling","Atrial depolarisation (P wave) precedes atrial contraction. The atria add the final portion of ventricular filling.","left-atrium",["right-atrium","left-atrium"],"#df514d"],
  ["03 / ISOVOLUMETRIC CONTRACTION","Ventricular pressure rises","After the QRS complex, ventricular pressure rises. The mitral and tricuspid valves close (S1); all four valves are briefly closed and volume remains constant.","left-ventricle",["right-ventricle","left-ventricle"],"#df514d"],
  ["04 / EJECTION","Blood leaves both ventricles","When ventricular pressure exceeds arterial pressure, the pulmonary and aortic valves open and blood is ejected into the great arteries.","aortic-arch",["right-ventricle","pulmonary-trunk","left-ventricle","ascending-aorta"],"#df514d"],
  ["05 / ISOVOLUMETRIC RELAXATION","Semilunar valves close","Ventricular repolarisation (T wave) is followed by relaxation. Aortic and pulmonary valves close (S2); all valves are briefly closed while ventricular pressure falls.","ascending-aorta",["ascending-aorta","pulmonary-trunk"],"#df514d"],
  ["06 / FILLING RESTARTS","The cycle repeats","When ventricular pressure falls below atrial pressure, AV valves open and ventricular filling begins again. Actual myocardial deformation requires a time-resolved animated heart mesh, which is a separate asset requirement.","right-atrium",["superior-vena-cava","right-atrium","left-atrium"],"#55a9e8"]
 ],
 coronary:[
  ["01 / CORONARY ORIGIN","Coronary arteries arise from the aortic root","The right and left coronary arteries originate from the aortic sinuses. The present 3D asset contains grouped right and left coronary trees.","ascending-aorta",["ascending-aorta","right-coronary","left-coronary"],"#e46c55"],
  ["02 / LEFT CORONARY","LCA supplies much of the left myocardium","The left main coronary artery commonly divides into LAD and circumflex branches. The current mesh groups this tree; individual LAD/LCx branches are not separately selectable.","left-coronary",["left-coronary","left-atrium","left-ventricle"],"#e46c55"],
  ["03 / RIGHT CORONARY","RCA supplies right-sided territories","The right coronary artery commonly gives right marginal and, in right-dominant hearts, posterior descending branches. Branch anatomy varies.","right-coronary",["right-coronary","right-atrium","right-ventricle"],"#e46c55"],
  ["04 / MYOCARDIAL PERFUSION","Coronary flow nourishes cardiac muscle","Coronary branches distribute oxygenated blood to the myocardium. Left coronary perfusion occurs predominantly during diastole. This source asset does not provide a segmented capillary bed.","ventricular-wall",["left-coronary","right-coronary","ventricular-wall"],"#e46c55"]
 ],
 electric:[
  ["01 / SA NODE","Impulse initiation","The sinoatrial node in the upper right atrium normally initiates sinus rhythm. The node is not a separate mesh in the current GLB model.","right-atrium",[],"#f1c85b"],
  ["02 / ATRIAL ACTIVATION","Impulse spreads through atrial myocardium","Atrial depolarisation spreads through atrial tissue (P wave). A dedicated conduction-system model is required to show the internodal pathways anatomically.","left-atrium",[],"#f1c85b"],
  ["03 / AV NODE DELAY","Conduction slows at the AV node","The AV node delays conduction, allowing ventricular filling. Its precise anatomical location is near the lower interatrial septum; no AV node mesh is present in this asset.","right-atrium",[],"#f1c85b"],
  ["04 / HIS–PURKINJE SYSTEM","Rapid ventricular conduction","The impulse travels through the AV bundle, right and left bundle branches, and Purkinje fibres. These structures require a dedicated segmented conduction model; they are not present in the current GLB.","ventricular-wall",[],"#f1c85b"]
 ]
};
let mode="flow",index=0,timer=null,playing=false;\nconst scrub=document.createElement("input");scrub.type="range";scrub.min="0";scrub.step="1";scrub.className="cinema-scrubber";scrub.setAttribute("aria-label","Simulation timeline");$("#mechanismProgress").parentElement.after(scrub);scrub.addEventListener("input",()=>{stop();index=Number(scrub.value);render();});
function render(){
 const list=scenes[mode],s=list[index];scrub.max=String(list.length-1);scrub.value=String(index);step.textContent=s[0];title.textContent=s[1];copy.textContent=s[2];progress.style.width=((index+1)/list.length*100)+"%";
 $("#mechanismPrev").disabled=index===0;$("#mechanismNext").disabled=index===list.length-1;
 visual.innerHTML='<div class="cinema-hud"><span class="cinema-tag">LIVE 3D CAMERA / '+mode.toUpperCase()+'</span><div class="cinema-target">'+s[1]+'</div><div class="cinema-caption">'+s[2]+'</div><div class="cinema-track"><span style="width:'+((index+1)/list.length*100)+'%"></span></div><div class="cinema-note">MODEL COVERAGE: selected source meshes only · conceptual flow path · not a diagnostic simulation</div></div>';
 if(heart()?.getReady()){
  if(s[3])heart().focusStructure(s[3],1250);
  if(s[4]?.length)heart().startFlow(s[4],s[5]);else heart().clearFlow();
  heart().setPulse(mode==="cycle");
 }
}
function stop(){if(timer)clearInterval(timer);timer=null;playing=false;play.textContent="▶ Play simulation";}
function setMode(m){stop();mode=m;index=0;document.querySelectorAll("[data-mech-tab]").forEach(b=>b.classList.toggle("active",b.dataset.mechTab===m));render();}
function close(){stop();dialog.hidden=true;document.body.classList.remove("atlas-dialog-open");heart()?.exitLab();}
$("#openMechanism").addEventListener("click",()=>{dialog.hidden=false;document.body.classList.add("atlas-dialog-open");heart()?.enterLab();setMode("flow");});
$("#closeMechanism").addEventListener("click",close);
dialog.addEventListener("click",e=>{if(e.target===dialog)close();});
document.querySelectorAll("[data-mech-tab]").forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.mechTab)));
$("#mechanismPrev").addEventListener("click",()=>{stop();index=Math.max(0,index-1);render();});
$("#mechanismNext").addEventListener("click",()=>{stop();index=Math.min(scenes[mode].length-1,index+1);render();});
play.addEventListener("click",()=>{if(playing){stop();return;}if(index===scenes[mode].length-1)index=0;playing=true;play.textContent="Ⅱ Pause";render();timer=setInterval(()=>{if(index>=scenes[mode].length-1){stop();return;}index++;render();},5200);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dialog.hidden)close();});
render();
