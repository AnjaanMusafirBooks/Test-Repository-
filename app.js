(function () {
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var rs = function (n) { return "₹" + n; };

  function price(b, big) {
    var off = b.mrp && b.mrp > b.price ? Math.round((1 - b.price / b.mrp) * 100) : 0;
    return '<div class="price' + (big ? " big" : "") + '">' +
      (big ? '<p class="plabel">' + esc(SITE.priceLabel) + "</p>" : "") +
      '<span class="now">' + rs(b.price) + "</span>" +
      (off ? '<s>' + rs(b.mrp) + '</s><span class="off">' + off + "% OFF</span>" : "") + "</div>";
  }

  function buy(b, cls) {
    cls = cls || "btn";
    if (b.checkout) return '<a class="' + cls + ' primary" href="' + esc(b.checkout) + '" target="_blank" rel="noopener">Buy Now</a>';
    return '<span class="' + cls + ' off-btn" aria-disabled="true">जल्द उपलब्ध</span>';
  }

  function badge(b) { return b.popular ? '<span class="badge">Popular</span>' : ""; }
  function link(b) { return "book.html?book=" + encodeURIComponent(b.id); }

  function card(b) {
    return '<article class="card">' + badge(b) +
      '<a href="' + link(b) + '"><img src="' + esc(b.cover) + '" alt="' + esc(b.title) + ' — eBook cover" loading="lazy"></a>' +
      "<h3>" + esc(b.title) + "</h3><p class=\"sub\">" + esc(b.subtitle) + "</p>" +
      '<p class="meta">' + esc(b.author) + " · " + b.pages + " पेज</p>" + price(b) +
      '<div class="actions"><a class="btn" href="' + link(b) + '">View Book</a>' + buy(b) + "</div></article>";
  }

  function home() {
    var f = BOOKS.filter(function (b) { return b.featured; })[0];
    var fs = $("#featured");
    if (f && fs) {
      fs.innerHTML = '<div class="wrap feat">' +
        '<a class="feat-img" href="' + link(f) + '"><img src="' + esc(f.cover) + '" alt="' + esc(f.title) + ' — eBook cover"></a>' +
        '<div><p class="kicker">Featured Book</p>' + badge(f) + "<h2>" + esc(f.title) + "</h2><p class=\"sub\">" + esc(f.subtitle) + "</p>" +
        "<p>" + esc(f.desc) + "</p>" + price(f, true) +
        '<div class="actions"><a class="btn" href="' + link(f) + '">View Book</a>' + buy(f) + "</div></div></div>";
    } else if (fs) { fs.hidden = true; }
    $("#grid").innerHTML = BOOKS.map(card).join("");
    var hc = $("#herocovers");
    if (hc) hc.innerHTML = BOOKS.slice(0, 4).map(function (b) { return '<img src="' + esc(b.cover) + '" alt="">'; }).join("");
  }

  function list(a) { return "<ul>" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }

  function book() {
    var id = new URLSearchParams(location.search).get("book");
    var b = BOOKS.filter(function (x) { return x.id === id; })[0];
    var root = $("#book");
    if (!b) { root.innerHTML = '<div class="wrap" style="padding:4rem 0"><h1>यह किताब नहीं मिली</h1><p><a class="btn" href="index.html#books">सारी किताबें देखें</a></p></div>'; return; }
    document.title = b.title + " — Anjaan Musafir Books";
    var md = document.querySelector('meta[name="description"]');
    if (md) md.content = b.title + " — " + b.subtitle + ". Hindi eBook, Anjaan Musafir Books.";
    var pv = b.preview && b.preview.enabled && b.preview.pages.length
      ? '<section class="wrap sec"><h2>Preview</h2><div class="pv">' + b.preview.pages.map(function (p, i) { return '<img src="' + esc(p) + '" alt="' + esc(b.title) + ' preview ' + (i + 1) + '" loading="lazy">'; }).join("") + "</div></section>" : "";
    var faq = [
      ["यह eBook किस भाषा में है?", b.language + " में।"],
      ["eBook कैसे मिलेगी?", "Payhip पर भुगतान पूरा होने के बाद eBook का access/download मिल जाता है। यह Digital PDF है।"],
      ["क्या refund मिलेगा?", "डिजिटल उत्पाद होने के कारण सामान्य परिस्थितियों में refund, return या cancellation संभव नहीं है। पूरी जानकारी Refund Policy पेज पर है।"],
      ["भुगतान या access में दिक्कत आए तो?", "हमें " + SITE.email + " पर लिखिए। हम समस्या समझने और हल करने की कोशिश करेंगे।"]
    ];
    root.innerHTML =
      '<section class="bhero"><div class="wrap bgrid">' +
      '<img src="' + esc(b.cover) + '" alt="' + esc(b.title) + ' — eBook cover">' +
      "<div>" + badge(b) + "<h1>" + esc(b.title) + '</h1><p class="sub">' + esc(b.subtitle) + "</p>" +
      '<p class="meta">लेखक: ' + esc(b.author) + " · " + b.pages + " पेज · " + esc(b.language) + "</p>" + price(b, true) +
      '<div class="actions">' + buy(b) + "</div></div></div></section>" +
      '<section class="wrap sec narrow"><h2>इस किताब के बारे में</h2><p>' + esc(b.desc) + "</p></section>" +
      '<section class="wrap sec narrow"><h2>किताब के अंदर क्या है</h2>' + list(b.inside) + "</section>" +
      (b.chapters ? '<section class="wrap sec narrow"><h2>अध्याय</h2><ol class="chaps">' + b.chapters.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ol></section>" : "") +
      '<section class="wrap sec narrow"><h2>यह किताब किसके लिए है</h2>' + list(b.forWho) + "</section>" +
      '<section class="wrap sec narrow"><h2>किताब की जानकारी</h2><dl><dt>लेखक</dt><dd>' + esc(b.author) + "</dd><dt>पेज</dt><dd>" + b.pages +
      "</dd><dt>भाषा</dt><dd>" + esc(b.language) + "</dd><dt>Format</dt><dd>Digital eBook (PDF)</dd></dl>" + (b.note ? '<p class="note">' + esc(b.note) + "</p>" : "") + "</section>" + pv +
      '<section class="wrap sec narrow"><h2>FAQ</h2>' + faq.map(function (q) { return "<details><summary>" + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p></details>"; }).join("") + "</section>" +
      '<section class="final"><div class="wrap"><h2>' + esc(b.title) + "</h2>" + price(b, true) + '<div class="actions c">' + buy(b) + '<a class="btn light" href="index.html#books">और किताबें</a></div></div></section>' +
      '<section class="wrap sec"><h2>और किताबें</h2><div class="grid">' + BOOKS.filter(function (x) { return x.id !== b.id; }).map(card).join("") + "</div></section>" +
      '<div class="sticky">' + price(b) + buy(b) + "</div>";
  }

  function chrome() {
    var l = SITE.legal;
    $("#foot").innerHTML = '<div class="wrap fgrid"><div><p class="brand">ANJAAN MUSAFIR BOOKS</p><p>हर सफ़र बाहर जाने का नहीं होता।</p></div>' +
      '<nav aria-label="Footer"><a href="index.html#books">Books</a><a href="index.html#about">About</a><a href="index.html#contact">Contact</a>' +
      '<a href="' + l.privacy + '">Privacy Policy</a><a href="' + l.terms + '">Terms &amp; Conditions</a><a href="' + l.refund + '">Refund Policy</a></nav>' +
      '<div><a href="mailto:' + SITE.email + '">' + SITE.email + '</a><a href="' + SITE.instagram + '" target="_blank" rel="noopener">Instagram ' + SITE.instagramName + "</a></div></div>" +
      '<p class="wrap copy">© 2026 Anjaan Musafir Books · Owned &amp; Operated by Nitendra Sahu · All Rights Reserved.</p>';
    var m = $("#menu"), n = $("#nav");
    m.addEventListener("click", function () { var o = n.classList.toggle("open"); m.setAttribute("aria-expanded", o); });
    n.addEventListener("click", function (e) { if (e.target.tagName === "A") { n.classList.remove("open"); m.setAttribute("aria-expanded", false); } });
    var c = $("#contactlinks");
    if (c) c.innerHTML = '<a href="mailto:' + SITE.email + '">' + SITE.email + '</a><a href="' + SITE.instagram + '" target="_blank" rel="noopener">Instagram ' + SITE.instagramName + "</a>";
  }

  chrome();
  if (document.body.dataset.page === "home") home(); else book();
})();
