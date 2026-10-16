const items=[
['song-2023','2023','宋庆龄少年儿童发明奖','人工智能（编程）作品金奖','编程'],
['gd-2025','2025','第二十二届广东省少年儿童发明奖','一等奖','发明'],
['macau-2024','2024','第十二届澳门国际创新发明展','金奖 · 语你同行','发明'],
['archimedes-2024','2024','第二十七届阿基米德国际发明展','金奖 · 团队作品','发明'],
['fll-2025','2025','FIRST LEGO League Macao Challenge','亚军 · 团队奖','机器人'],
['icc-2024','2024','全球发明大会中国区全国总决赛','三等奖 · 语你同行','发明'],
['python-2026','2026','中国电子学会青少年软件编程等级考试','Python 四级','编程'],
['academic-2024','2024','澳门浸信中学「名人堂」','年度学术优异奖','学业']
];
const traditional=document.documentElement.lang==='zh-Hant';
const words=traditional?{'宋庆龄少年儿童发明奖':'宋慶齡少年兒童發明獎','人工智能（编程）作品金奖':'人工智能（編程）作品金獎','第二十二届广东省少年儿童发明奖':'第二十二屆廣東省少年兒童發明獎','一等奖':'一等獎','第十二届澳门国际创新发明展':'第十二屆澳門國際創新發明展','金奖 · 语你同行':'金獎 · 語你同行','第二十七届阿基米德国际发明展':'第二十七屆阿基米德國際發明展','金奖 · 团队作品':'金獎 · 團隊作品','亚军 · 团队奖':'亞軍 · 團隊獎','全球发明大会中国区全国总决赛':'全球發明大會中國區全國總決賽','三等奖 · 语你同行':'三等獎 · 語你同行','中国电子学会青少年软件编程等级考试':'中國電子學會青少年軟件編程等級考試','Python 四级':'Python 四級','澳门浸信中学「名人堂」':'澳門浸信中學「名人堂」','年度学术优异奖':'年度學術優異獎','编程':'編程','发明':'發明','机器人':'機械人','学业':'學業'}:{};
const tr=s=>words[s]||s;
const grid=document.querySelector('#award-grid');
const dialog=document.querySelector('#evidence-dialog');
function render(filter='all'){
  grid.replaceChildren();
  const selected=items.filter(x=>filter==='all'||x[4]===filter);
  document.querySelector('#result-count').textContent=selected.length+(traditional?' 項記錄':' 项记录');
  for(const [slug,year,title,award,cat] of selected){
    const card=document.createElement('article');card.className='award-card';
    const button=document.createElement('button');button.type='button';button.className='award-image';button.setAttribute('aria-label',(traditional?'放大證書：':'放大证书：')+tr(title));
    const im=document.createElement('img');im.src='assets/'+slug+'.jpg';im.alt=tr(title)+' · '+tr(award);im.loading='lazy';im.width=300;im.height=380;button.append(im);
    button.addEventListener('click',()=>{document.querySelector('#dialog-title').textContent=year+' / '+tr(title);const full=document.querySelector('#dialog-image');full.src=im.src;full.alt=im.alt;document.querySelector('#dialog-download').href='downloads/'+slug+'.pdf';dialog.showModal()});
    const meta=document.createElement('p');meta.className='award-meta';meta.textContent=year+' / '+tr(cat);
    const heading=document.createElement('h3');heading.textContent=tr(title);
    const a=document.createElement('p');a.className='award-name';a.textContent=tr(award);
    const download=document.createElement('a');download.href='downloads/'+slug+'.pdf';download.target='_blank';download.rel='noopener';download.textContent='PDF ↗';download.setAttribute('aria-label',(traditional?'打開證書 PDF：':'打开证书 PDF：')+tr(title));
    const copy=document.createElement('div');copy.className='award-copy';copy.append(meta,heading,a);
    card.append(button,copy,download);grid.append(card);
  }
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});render(button.dataset.filter)}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
render();
