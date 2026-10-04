(() => {
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
const bookById=id=>BOOKS.find(b=>b.id===id);
const link=b=>`book.html?book=${encodeURIComponent(b.id)}`;
const discount=b=>Math.round((1-b.price/b.mrp)*100);
function buy(b,cls="btn btn-gold"){return b.checkout?`<a class="${cls}" href="${esc(b.checkout)}" target="_blank" rel="noopener">अभी ख़रीदें · ${money(b.price)}</a>`:`<span class="btn btn-disabled">जल्द उपलब्ध</span>`}
function price(b){return `<div class="price"><strong>${money(b.price)}</strong><del>${money(b.mrp)}</del><span>${discount(b)}% off</span></div>`}
function badge(b){return b.popular?`<span class="badge">POPULAR</span>`:b.featured?`<span class="badge">EDITOR'S PICK</span>`:"";}
function card(b){
 return `<article class="book-card" data-topics="${b.topics.join(" ")}" data-title="${esc((b.title+" "+b.subtitle).toLowerCase())}">
   <a class="cover-wrap" href="${link(b)}"><img src="${esc(b.cover)}" alt="${esc(b.title)} cover" loading="lazy" onerror="this.classList.add('missing-cover');this.alt='Cover preview unavailable'"><span class="cover-fallback">${esc(b.title)}</span></a>
   <div class="card-body">${badge(b)}<h3><a href="${link(b)}">${esc(b.title)}</a></h3><p>${esc(b.subtitle)}</p><div class="card-meta">${b.pages} pages · ${esc(b.language)}</div>${price(b)}<div class="card-actions"><a class="btn btn-outline" href="${link(b)}">किताब देखें</a><button class="heart" data-wish="${b.id}" aria-label="Wishlist">${wishlistHas(b.id)?"♥":"♡"}</button></div></div>
 </article>`;
}
function wishlistHas(id){return JSON.parse(localStorage.getItem("am_wishlist")||"[]").includes(id)}
function toggleWish(id){
 let a=JSON.parse(localStorage.getItem("am_wishlist")||"[]"); a=a.includes(id)?a.filter(x=>x!==id):[...a,id]; localStorage.setItem("am_wishlist",JSON.stringify(a)); return a.includes(id)
}
function bindWish(){ $$(".heart").forEach(btn=>btn.onclick=()=>{btn.textContent=toggleWish(btn.dataset.wish)?"♥":"♡"; toast(toggleWishPreview(btn.dataset.wish));}); }
function toggleWishPreview(id){return wishlistHas(id)?"Wishlist में जोड़ दिया गया।":"Wishlist से हटा दिया गया।"}
function toast(t){let x=$("#toast");if(!x){x=document.createElement("div");x.id="toast";document.body.appendChild(x)}x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}

function footer(){
 const f=$("#foot"); if(!f)return;
 f.innerHTML=`<footer class="footer"><div class="wrap footer-grid">
 <div><a class="brand footer-brand" href="index.html"><span class="brand-mark">AM</span><span><b>ANJAAN MUSAFIR</b><small>BOOKS</small></span></a><p>हर सफ़र बाहर जाने का नहीं होता।</p></div>
 <div><b>Explore</b><a href="index.html#books">Books</a><a href="circle.html">Circle</a><a href="resources.html">Free Resources</a><a href="partner.html">Partner</a></div>
 <div><b>Support</b><a href="contact.html">Contact</a><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms & Conditions</a><a href="refund.html">Refund Policy</a></div>
 <div><b>Connect</b><a href="mailto:${SITE.email}">${SITE.email}</a><a href="${SITE.instagram}" target="_blank" rel="noopener">${SITE.instagramName}</a></div>
 </div><div class="wrap footer-bottom"><span>© 2026 Anjaan Musafir Books</span><span>Owned & Operated by Nitendra Sahu</span></div></footer>`;
}
function nav(){
 const m=$("#menuBtn"),n=$("#siteNav"); if(!m||!n)return;
 m.onclick=()=>{let o=n.classList.toggle("open");m.setAttribute("aria-expanded",o)};
 n.onclick=e=>{if(e.target.tagName==="A")n.classList.remove("open")};
}
function home(){
 const f=BOOKS.find(b=>b.featured)||BOOKS[0], fs=$("#featured");
 fs.innerHTML=`<div class="wrap feature-card"><div class="feature-cover"><img src="${f.cover}" alt="${esc(f.title)} cover"><span class="feature-stamp">EDITOR'S PICK</span></div><div class="feature-copy"><p class="eyebrow">FEATURED BOOK</p><h2>${esc(f.title)}</h2><p class="lead">${esc(f.subtitle)}</p><p>${esc(f.desc)}</p><div class="feature-points"><span>✓ ${f.pages} pages</span><span>✓ ${esc(f.language)}</span><span>✓ Digital PDF</span></div>${price(f)}<div class="actions">${buy(f)}<a class="btn btn-outline" href="${link(f)}">पूरी जानकारी</a></div></div></div>`;
 renderGrid();
 $$("#filters .filter").forEach(x=>x.onclick=()=>setFilter(x.dataset.filter));
 $$(".path-card").forEach(x=>x.onclick=()=>{setFilter(x.dataset.filter);document.querySelector("#books").scrollIntoView({behavior:"smooth"})});
 $("#bookSearch").oninput=renderGrid;
 $$(".heart").forEach(btn=>btn.onclick=()=>{let added=toggleWish(btn.dataset.wish);btn.textContent=added?"♥":"♡";toast(added?"Wishlist में जोड़ दिया गया।":"Wishlist से हटा दिया गया।")});
 quiz();
 const thoughts=["हर जवाब तुरंत मिलना ज़रूरी नहीं है। कभी-कभी थोड़ा रुकना भी एक जवाब होता है।","छोटा कदम भी कदम है—बस उसे अगला कदम बनने दीजिए।","Clarity हमेशा सोचने से नहीं आती; कभी-कभी शुरू करने से आती है।","आपको हर चीज़ एक साथ ठीक नहीं करनी है। एक चीज़ से शुरू कीजिए।"];
 const day=new Date().getDate()%thoughts.length; $("#thoughtText").textContent=thoughts[day]; $("#thoughtDate").textContent="आज का विचार · "+new Date().toLocaleDateString("hi-IN",{day:"numeric",month:"long",year:"numeric"});
 $("#shareThought").onclick=()=>shareText($("#thoughtText").textContent);
}
let currentFilter="all";
function setFilter(f){currentFilter=f;$$(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===f));renderGrid()}
function renderGrid(){
 const q=($("#bookSearch")?.value||"").toLowerCase().trim();
 const list=BOOKS.filter(b=>(currentFilter==="all"||b.topics.includes(currentFilter)) && (!q||(b.title+" "+b.subtitle+" "+b.desc).toLowerCase().includes(q)));
 $("#grid").innerHTML=list.map(card).join(""); $("#emptyBooks").hidden=list.length>0;
 bindWish();
}
function quiz(){
 const modal=$("#quizModal");if(!modal)return;
 $("#quizOpen").onclick=()=>{modal.classList.add("show");modal.setAttribute("aria-hidden","false")};
 $("#quizClose").onclick=close;modal.onclick=e=>{if(e.target===modal)close()};
 function close(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}
 $$(".quiz-options button").forEach(btn=>btn.onclick=()=>{
   const map={mind:"dimag-ka-shor",career:"ai-career",habits:"aadaton-ke-paar",growth:"vicharon-ki-kaid"};
   const b=bookById(map[btn.dataset.answer]),r=$("#quizResult");r.hidden=false;r.innerHTML=`<b>आपके लिए सुझाव:</b><h3>${esc(b.title)}</h3><p>${esc(b.subtitle)}</p><a class="btn btn-gold" href="${link(b)}">किताब देखें →</a>`;r.scrollIntoView({behavior:"smooth",block:"nearest"});
 })
}
async function shareText(text){const data={title:"Anjaan Musafir Books",text};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(text);toast("विचार copy हो गया।")}}catch(e){}}

function bookPage(){
 const id=new URLSearchParams(location.search).get("book"),b=bookById(id),root=$("#book");
 if(!b){root.innerHTML=`<section class="wrap not-found"><h1>किताब नहीं मिली</h1><p>शायद link गलत है।</p><a class="btn btn-gold" href="index.html#books">सारी किताबें देखें</a></section>`;return}
 document.title=`${b.title} — Anjaan Musafir Books`;
 root.innerHTML=`<section class="book-hero"><div class="wrap book-hero-grid"><div class="book-cover-large"><img src="${b.cover}" alt="${esc(b.title)} cover"><button class="wish-large" data-wish="${b.id}">${wishlistHas(b.id)?"♥ Wishlist":"♡ बाद में खरीदूँगा"}</button></div><div class="book-intro">${badge(b)}<p class="eyebrow">DIGITAL EBOOK</p><h1>${esc(b.title)}</h1><p class="book-sub">${esc(b.subtitle)}</p><p class="meta">लेखक: ${esc(b.author)} · ${b.pages} pages · ${esc(b.language)}</p>${price(b)}<div class="actions">${buy(b)}<button class="btn btn-outline" id="shareBook">Share ↗</button></div><p class="safe-note">🔒 Payment Payhip checkout पर · eBook payment के बाद digital access</p></div></div></section>
 <section class="wrap book-section two-col"><div><p class="eyebrow">क्यों पढ़ें?</p><h2>यह किताब किस काम आएगी?</h2><p>${esc(b.desc)}</p></div><div class="benefit-box"><b>आपको क्या मिलेगा</b><span>✓ साफ़ और सरल explanation</span><span>✓ Practical ideas</span><span>✓ Actionable steps जहाँ relevant हों</span><span>✓ Digital PDF access</span></div></section>
 <section class="soft-section"><div class="wrap book-section"><p class="eyebrow">INSIDE THE BOOK</p><h2>किताब के अंदर क्या है?</h2><div class="inside-grid">${b.inside.map((x,i)=>`<div><span>0${i+1}</span><p>${esc(x)}</p></div>`).join("")}</div></div></section>
 ${b.chapters?`<section class="wrap book-section"><p class="eyebrow">CHAPTERS</p><h2>अंदर का पूरा रास्ता</h2><div class="chapter-list">${b.chapters.map((x,i)=>`<div><span>${String(i+1).padStart(2,"0")}</span><p>${esc(x)}</p></div>`).join("")}</div></section>`:""}
 <section class="wrap book-section two-col"><div><p class="eyebrow">FOR YOU?</p><h2>यह किताब आपके लिए है अगर…</h2><ul class="check-list">${b.forWho.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div class="honest-box"><b>ईमानदार नोट</b><p>${esc(b.note)}</p></div></section>
 ${b.id==="vicharon-ki-kaid"?`<section class="wrap combo-box"><div><p class="eyebrow">LOW-PRICE START</p><h2>शुरुआत सिर्फ़ ₹49 से।</h2><p>अगर आप पहले हमारे काम को आज़माना चाहते हैं, यह एक simple starting point है।</p></div>${buy(b)}</section>`:""}
 <section class="faq-section"><div class="wrap book-section narrow"><p class="eyebrow">FAQ</p><h2>खरीदने से पहले आपके सवाल</h2>
 ${[
 ["eBook कैसे मिलेगी?","Payhip पर payment पूरा होने के बाद digital access/download मिलता है।"],
 ["यह किस format में है?","यह digital PDF eBook है।"],
 ["क्या refund मिलेगा?","Digital product होने के कारण सामान्य परिस्थितियों में refund/return/cancellation उपलब्ध नहीं है। पूरी जानकारी Refund Policy में है।"],
 ["Payment या access में दिक्कत हो तो?","${SITE.email} पर लिखिए। Payment/reference details के साथ समस्या बताइए।"],
 ["क्या यह printed book है?","नहीं। यह digital eBook है।"]
 ].map(q=>`<details><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join("")}</div></section>
 <section class="final-cta"><div class="wrap"><p class="eyebrow">READY?</p><h2>अगर यह वही किताब है जिसकी आपको अभी ज़रूरत है…</h2><div class="actions center">${buy(b)}<a class="btn btn-light" href="index.html#books">और किताबें देखें</a></div></div></section>
 <section class="wrap book-section"><p class="eyebrow">YOU MAY ALSO LIKE</p><h2>शायद ये भी आपके काम आएँ</h2><div class="book-grid">${BOOKS.filter(x=>x.id!==b.id).slice(0,3).map(card).join("")}</div></section>
 <div class="mobile-buy">${price(b)}${buy(b,"btn btn-gold")}</div>`;
 const w=$(".wish-large");if(w)w.onclick=()=>{let added=toggleWish(b.id);w.textContent=added?"♥ Wishlist":"♡ बाद में खरीदूँगा";toast(added?"Wishlist में जोड़ दिया गया।":"Wishlist से हटा दिया गया।")};
 $("#shareBook").onclick=()=>shareText(`${b.title} — ${b.subtitle}\n${location.href}`);
 bindWish();
}
function genericPage(){
 if($("#resourcesPage")){}
}
footer();nav();
if(document.body.dataset.page==="home")home(); else if(document.body.dataset.page==="book")bookPage();
})();