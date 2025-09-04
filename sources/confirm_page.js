(function(){
  function msg(key, args = []) {
    try {
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key, args) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key, args) || '';
    } catch(_) {}
    return '';
  }
  const p = new URLSearchParams(location.search);
  const count = Number(p.get('c')||'0');
  const list = p.get('list')||'';
  const more = p.get('more')||'';
  const def = (p.get('def')||'yes').toLowerCase()==='no'?'no':'yes';
  const token = p.get('t')||'';
  const textEl = document.getElementById('text');
  const btnYes = document.getElementById('yes');
  const btnNo = document.getElementById('no');
  let text = '';
  if (count <= 1) text = msg('confirmAddOne',[list]) || `Add attachment: ${list}?`;
  else text = msg('confirmAddMany',[String(count), list, more]) || `Add attachments (${count}): ${list}${more?`, +${more} more`:''}?`;
  textEl.textContent = text;
  btnYes.textContent = msg('confirmYes') || 'Yes';
  btnNo.textContent = msg('confirmNo') || 'No';
  btnYes.addEventListener('click', async()=>{ try{ await browser.runtime.sendMessage({type:'rwa:confirm-result', t: token, ok: true}); }catch(_){} window.close(); });
  btnNo.addEventListener('click', async()=>{ try{ await browser.runtime.sendMessage({type:'rwa:confirm-result', t: token, ok: false}); }catch(_){} window.close(); });
  setTimeout(()=>{ (def==='no'?btnNo:btnYes).focus(); }, 0);
  window.addEventListener('keydown', (e)=>{
    if (e.key==='Escape'){ e.preventDefault(); btnNo.click(); }
    if (e.key==='Enter'){ e.preventDefault(); (document.activeElement===btnNo?btnNo:btnYes).click(); }
  });
})();

