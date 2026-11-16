// Progressive enhancement: original 331-question storage format is unchanged.
(function(){
 const el=id=>document.getElementById(id);
 const KEY='bloom-together-custom-v3';let cfg={cardColor:'#edcdd5',backgroundColor:'#f9f3ef',cardFont:'serif',coverStyle:'petals',mode:'solo',depth:'all',players:2};
 try{cfg={...cfg,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{}
 const persist=()=>localStorage.setItem(KEY,JSON.stringify(cfg));
 const levels=['light','meaningful','deep','vulnerable'];
 // Stable classification per question: every original question is preserved and reachable with All depths.
 function levelFor(text){let h=2166136261;for(const c of text){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return levels[(h>>>0)%4]}
 function apply(){document.documentElement.style.setProperty('--custom-card',cfg.cardColor);document.documentElement.style.setProperty('--custom-bg',cfg.backgroundColor);document.body.dataset.font=cfg.cardFont;document.body.dataset.cover=cfg.coverStyle;el('cardColor').value=cfg.cardColor;el('backgroundColor').value=cfg.backgroundColor;el('cardFont').value=cfg.cardFont;el('coverStyle').value=cfg.coverStyle;el('gameMode').value=cfg.mode;el('playerCount').value=cfg.players;el('playDepth').value=cfg.depth;el('depthFilter').value=cfg.depth}
 for(const [id,keyName] of [['cardColor','cardColor'],['backgroundColor','backgroundColor'],['cardFont','cardFont'],['coverStyle','coverStyle']])el(id).addEventListener('input',e=>{cfg[keyName]=e.target.value;persist();apply()});
 function filteredIndices(){const d=state.decks.find(d=>d.id===deckId);if(!d)return[];return d.questions.map((q,i)=>({q,i})).filter(x=>cfg.depth==='all'||levelFor(x.q)===cfg.depth).map(x=>x.i)}
 let turn=0,faceDown=false;
 function updateOrder(){order=filteredIndices();index=0;turn=0;window.bloomEnhanceRender?.()}
 el('depthFilter').addEventListener('change',e=>{cfg.depth=e.target.value;persist();apply()});
 el('playDepth').addEventListener('change',e=>{cfg.depth=e.target.value;persist();apply();updateOrder();renderCard()});
 el('gameMode').addEventListener('change',e=>{cfg.mode=e.target.value;persist();turn=0;renderCard()});
 el('playerCount').addEventListener('change',e=>{cfg.players=Math.max(2,Math.min(12,Number(e.target.value)||2));persist();apply();renderCard()});
 const card=el('card');function flip(){faceDown=!faceDown;card.classList.toggle('flipped',faceDown);el('flipCard').textContent=faceDown?'Reveal question ↻':'Flip card ↻'}
 el('flipCard').addEventListener('click',flip);
 card.addEventListener('click',e=>{if(e.target.closest('button'))return;flip()});
 let startX=0,startY=0;
 card.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY},{passive:true});
 card.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3){faceDown=false;card.classList.remove('flipped');el(dx<0?'next':'previous').click()}},{passive:true});
 function advanceTurn(){if(['turns','couples','group','challenge'].includes(cfg.mode))turn++}
 el('next').addEventListener('click',()=>{advanceTurn();faceDown=false;card.classList.remove('flipped');renderCard()});
 el('previous').addEventListener('click',()=>{turn=Math.max(0,turn-1);faceDown=false;card.classList.remove('flipped');renderCard()});
 el('randomChallenge').addEventListener('click',()=>{const available=state.decks.filter(d=>d.questions.length);if(!available.length)return;cfg.mode='challenge';cfg.depth='all';persist();start(available[Math.floor(Math.random()*available.length)].id);order=filteredIndices();index=Math.floor(Math.random()*order.length);renderCard()});
 window.bloomEnhanceStart=function(){order=filteredIndices();index=0;turn=0;faceDown=false;card.classList.remove('flipped');el('flipCard').textContent='Flip card ↻';apply()};
 window.bloomEnhanceRender=function(){const d=state.decks.find(d=>d.id===deckId);if(!d)return;const q=d.questions[order[index]];el('depthBadge').textContent=q?levelFor(q).toUpperCase():'';el('progress').textContent=order.length?`QUESTION ${index+1} OF ${order.length}`:'NO QUESTIONS AT THIS DEPTH';el('question').textContent=q||'No questions at this depth. Try All depths.';el('favorite').disabled=!q;const n=cfg.mode==='couples'?2:cfg.players;el('turnIndicator').textContent=cfg.mode==='solo'?'Take your time — there is no rush.':cfg.mode==='challenge'?`🎲 Challenge ${turn+1}: answer, then pass the phone.`:`${cfg.mode==='couples'?'Couples night':cfg.mode==='group'?'Group play':'Take turns'} · Player ${(turn%n)+1} of ${n}`;};
 // Refresh card after original navigation and shuffle, without changing favorite handling.
 el('shuffle').addEventListener('click',()=>{faceDown=false;card.classList.remove('flipped')});
 // If old version's navigation wraps, the existing deck order is preserved.
 apply();
})();