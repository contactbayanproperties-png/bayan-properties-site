const (window.__LISTINGS || FALLBACK_LISTINGS) = [{"id": "BP-001", "title": "Appartement moderne — Triangle d’Or", "zone": "Casablanca", "type": "Appartement", "operation": "Location", "price_mad": 13500, "meuble": true, "charges_incluses": true, "dispo": true, "bedrooms": 2, "bathrooms": 2, "surface_m2": 92, "images": ["assets/img/BP-001.jpg"], "highlights": ["Résidence sécurisée", "Parking", "Proche commodités"]}, {"id": "BP-002", "title": "Villa premium — Dar Bouazza", "zone": "Dar Bouazza", "type": "Villa", "operation": "Location", "price_mad": 32000, "meuble": false, "charges_incluses": false, "dispo": true, "bedrooms": 4, "bathrooms": 3, "surface_m2": 280, "images": ["assets/img/BP-002.jpg"], "highlights": ["Jardin", "Résidence sécurisée", "Quartier recherché"]}, {"id": "BP-003", "title": "Appartement fonctionnel — Bouskoura", "zone": "Bouskoura", "type": "Appartement", "operation": "Location", "price_mad": 9000, "meuble": false, "charges_incluses": true, "dispo": false, "bedrooms": 2, "bathrooms": 1, "surface_m2": 78, "images": ["assets/img/BP-003.jpg"], "highlights": ["Résidence verte", "Accès rapide", "Bon rapport qualité/prix"]}, {"id": "BP-004", "title": "Villa contemporaine — Benslimane", "zone": "Benslimane", "type": "Villa", "operation": "Vente", "price_mad": 3450000, "meuble": false, "charges_incluses": false, "dispo": true, "bedrooms": 5, "bathrooms": 4, "surface_m2": 360, "images": ["assets/img/BP-004.jpg"], "highlights": ["Volumes", "Calme", "Potentiel investissement"]}, {"id": "BP-005", "title": "Studio meublé — Centre-ville", "zone": "Casablanca", "type": "Studio", "operation": "Location", "price_mad": 6500, "meuble": true, "charges_incluses": true, "dispo": true, "bedrooms": 1, "bathrooms": 1, "surface_m2": 42, "images": ["assets/img/BP-005.jpg"], "highlights": ["Prêt à vivre", "Wifi inclus", "Idéal mobilité"]}, {"id": "BP-006", "title": "Appartement familial — Racine", "zone": "Casablanca", "type": "Appartement", "operation": "Vente", "price_mad": 2200000, "meuble": false, "charges_incluses": false, "dispo": false, "bedrooms": 3, "bathrooms": 2, "surface_m2": 140, "images": ["assets/img/BP-006.jpg"], "highlights": ["Quartier premium", "Lumineux", "Bonne distribution"]}];

async function loadListings(){
  try{
    const res = await fetch("content/listings.json", {cache:"no-store"});
    if(!res.ok) throw new Error("bad status");
    const data = await res.json();
    // support either array or {items:[...]}
    const items = Array.isArray(data) ? data : (data.items || []);
    // If Decap saved under {items}, return that. If not, return array.
    return items.length ? items : (Array.isArray(data) ? data : []);
  }catch(e){
    console.warn("Using fallback listings (local)", e);
    return (typeof (window.__LISTINGS || FALLBACK_LISTINGS) !== "undefined") ? (window.__LISTINGS || FALLBACK_LISTINGS) : [];
  }
}


function bindOwnerWhatsApp(){
  const msg = `Bonjour Bayan Properties, j’ai un bien à proposer.\nType: ...\nOpération: (Location/Vente)\nVille/Quartier: ...\nPrix: ...\nMeublé: Oui/Non\nCharges: Incluses/Standard\nPhotos: (je les envoie ici)\nPouvez-vous me proposer un rendez-vous ? Merci.`;
  document.querySelectorAll('[data-wa-owner="1"]').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.preventDefault();
      openWhatsApp(msg);
    });
  });
}


function bindMobileMenu(){
  const btn = document.getElementById("burgerBtn");
  const drawer = document.getElementById("mobileDrawer");
  if(!btn || !drawer) return;

    const close = ()=>{ drawer.classList.remove("is-open"); btn.setAttribute("aria-expanded","false"); };
  const open = ()=>{ drawer.classList.add("is-open"); btn.setAttribute("aria-expanded","true"); };

  btn.addEventListener("click", ()=>{
    const isOpen = drawer.classList.contains("is-open");
    isOpen ? close() : open();
  });

  drawer.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click", ()=> close());
  });

  document.addEventListener("click", (e)=>{
    if(!drawer.classList.contains("is-open")) return;
    const t = e.target;
    if(t === btn || btn.contains(t) || drawer.contains(t)) return;
    close();
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") close();
  });
}

const PROPERTIES = [
  {
    id:"BP-001",
    title:"Appartement moderne — Triangle d’Or",
    operation:"location",
    type:"appartement",
    zone:"casablanca",
    price:14500,
    currency:"MAD",
    period:"/mois",
    area:120,
    beds:2,
    baths:2,
    meuble:true,
    charges:true,
    dispo:true,
    image:"assets/img/BP-001.jpg",
    chargesDetails:{wifi:true,eau:true,electricite:true,syndic:false},
  },
  {
    id:"BP-002",
    title:"Villa premium — Dar Bouazza",
    operation:"location",
    type:"villa",
    zone:"dar-bouazza",
    price:38000,
    currency:"MAD",
    period:"/mois",
    area:320,
    beds:4,
    baths:3,
    meuble:false,
    charges:false,
    dispo:true,
    image:"assets/img/BP-002.jpg",
    chargesDetails:{wifi:false,eau:false,electricite:false,syndic:false},
  },
  {
    id:"BP-003",
    title:"Appartement fonctionnel — Bouskoura",
    operation:"vente",
    type:"appartement",
    zone:"bouskoura",
    price:1850000,
    currency:"MAD",
    period:"",
    area:98,
    beds:2,
    baths:2,
    meuble:false,
    charges:false,
    dispo:false,
    image:"assets/img/BP-003.jpg",
    chargesDetails:{},
  },
  {
    id:"BP-004",
    title:"Villa contemporaine — Benslimane",
    operation:"vente",
    type:"villa",
    zone:"benslimane",
    price:5200000,
    currency:"MAD",
    period:"",
    area:410,
    beds:5,
    baths:4,
    meuble:true,
    charges:false,
    dispo:true,
    image:"assets/img/BP-004.jpg",
    chargesDetails:{wifi:true,eau:false,electricite:false,syndic:false},
  },
  {
    id:"BP-005",
    title:"Studio meublé — Centre-ville",
    operation:"location",
    type:"appartement",
    zone:"casablanca",
    price:6500,
    currency:"MAD",
    period:"/mois",
    area:42,
    beds:1,
    baths:1,
    meuble:true,
    charges:false,
    dispo:true,
    image:"assets/img/BP-005.jpg",
    chargesDetails:{wifi:true,eau:true,electricite:false,syndic:false},
  },
  {
    id:"BP-006",
    title:"Appartement familial — Racine",
    operation:"location",
    type:"appartement",
    zone:"casablanca",
    price:12000,
    currency:"MAD",
    period:"/mois",
    area:110,
    beds:3,
    baths:2,
    meuble:false,
    charges:true,
    dispo:false,
    image:"assets/img/BP-006.jpg",
    chargesDetails:{wifi:false,eau:true,electricite:true,syndic:true},
  },
];

const ZONE_LABEL = {
  "casablanca":"Casablanca",
  "dar-bouazza":"Dar Bouazza",
  "bouskoura":"Bouskoura",
  "benslimane":"Benslimane",
};

function formatMoney(n){
  return new Intl.NumberFormat('fr-FR').format(n);
}

function badgeHTML(p){
  const b = [];
  b.push(p.meuble ? `<span class="badge badge-meuble">MEUBLÉ</span>` : `<span class="badge badge-nonmeuble">NON MEUBLÉ</span>`);
  b.push(p.charges ? `<span class="badge badge-charges">CHARGES INCLUSES</span>` : `<span class="badge badge-standard">STANDARD</span>`);
  b.push(p.dispo ? `<span class="badge badge-dispo">DISPONIBLE</span>` : `<span class="badge badge-indispo">INDISPONIBLE</span>`);
  return b.join("");
}

function listingCard(p){
  return `
  <article class="listing" data-id="${p.id}">
    <div class="thumb" style="background-image:url('${p.image}')">
      <div class="badges">${badgeHTML(p)}</div>
    </div>
    <div class="l-body">
      <div class="price">
        <strong>${formatMoney(p.price)} ${p.currency}</strong>
        <span>${p.operation === "location" ? p.period : ""}</span>
      </div>
      <div class="l-title">${p.title}</div>
      <div class="meta">
        <span><b>${ZONE_LABEL[p.zone]}</b></span>
        <span>${p.area} m²</span>
        <span>${p.beds} ch</span>
        <span>${p.baths} sdb</span>
        <span class="small">Réf: ${p.id}</span>
      </div>
      <div class="l-actions">
        <a class="btn btn-ghost" href="property.html?id=${encodeURIComponent(p.id)}">Détails</a>
        <a class="btn btn-primary" data-wa="1" href="#">WhatsApp</a>
      </div>
    </div>
  </article>`;
}

function renderListings(targetId, limit=null, filter=null){
  const el = document.getElementById(targetId);
  if(!el) return;

  let items = [...PROPERTIES];
  if(filter) items = items.filter(filter);
  if(limit) items = items.slice(0,limit);
  el.innerHTML = items.map(listingCard).join("");

  el.querySelectorAll('[data-wa="1"]').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.preventDefault();
      const card = e.target.closest('.listing');
      const id = card?.dataset?.id || "";
      const p = PROPERTIES.find(x=>x.id===id);
      const msg = `Bonjour Bayan Properties, je suis intéressé(e) par le bien Réf: ${p.id}. Pouvez-vous me proposer une visite ? Merci.`;
      openWhatsApp(msg);
    });
  });
}

function getParam(name){
  return new URLSearchParams(window.location.search).get(name);
}

function openWhatsApp(message){
  const phone = window.BAYAN_WHATSAPP || "212600000000";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url,'_blank');
}

function bindGlobalWhatsApp(){
  document.querySelectorAll('[data-wa-global="1"]').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.preventDefault();
      const msg = `Bonjour Bayan Properties, je souhaite des informations et une visite. Voici mon besoin : [Location/Vente], [Zone], [Budget], [Meublé Oui/Non], [Charges incluses Oui/Non].`;
      openWhatsApp(msg);
    });
  });
}

function bindFilters(){
  const form = document.getElementById("filtersForm");
  if(!form) return;

  const getVal = (id)=> (document.getElementById(id)?.value || "");
  const toInt = (v)=> v ? parseInt(v,10) : null;

  const apply = ()=>{
    const operation = getVal("f_operation");
    const type = getVal("f_type");
    const zone = getVal("f_zone");
    const meuble = getVal("f_meuble");
    const charges = getVal("f_charges");
    const dispo = getVal("f_dispo");
    const min = toInt(getVal("f_min"));
    const max = toInt(getVal("f_max"));

    const filter = (p)=>{
      if(operation && p.operation !== operation) return false;
      if(type && p.type !== type) return false;
      if(zone && p.zone !== zone) return false;
      if(meuble){
        const m = meuble === "oui";
        if(p.meuble !== m) return false;
      }
      if(charges){
        const c = charges === "oui";
        if(p.charges !== c) return false;
      }
      if(dispo){
        const d = dispo === "oui";
        if(p.dispo !== d) return false;
      }
      if(min !== null && p.price < min) return false;
      if(max !== null && p.price > max) return false;
      return true;
    };

    renderListings("listingsGrid", null, filter);
  };

  form.addEventListener("change", apply);
  form.addEventListener("input", (e)=>{
    if(["f_min","f_max"].includes(e.target.id)) apply();
  });

  document.getElementById("f_reset")?.addEventListener("click",(e)=>{
    e.preventDefault();
    form.reset();
    apply();
  });

  apply();
}

function renderPropertyDetail(){
  const id = getParam("id");
  const p = PROPERTIES.find(x=>x.id===id);
  const wrap = document.getElementById("propertyDetail");
  if(!wrap) return;

  if(!p){
    wrap.innerHTML = `<div class="card"><h2>Bien introuvable</h2><p>La référence demandée n’existe pas.</p></div>`;
    return;
  }

  const chargesBlock = p.charges ? `
    <ul>
      <li>WiFi : ${p.chargesDetails?.wifi ? "Inclus" : "Non inclus"}</li>
      <li>Eau : ${p.chargesDetails?.eau ? "Incluse" : "Non incluse"}</li>
      <li>Électricité : ${p.chargesDetails?.electricite ? "Incluse" : "Non incluse"}</li>
      <li>Syndic : ${p.chargesDetails?.syndic ? "Inclus" : "Selon résidence"}</li>
    </ul>
  ` : `
    <p><b>Charges :</b> Standard (selon consommation & syndic). Détails fournis sur demande.</p>
  `;

  wrap.innerHTML = `
  <section class="section">
    <div class="container">
      <div class="row" style="align-items:flex-start">
        <div style="flex:1.5;min-width:320px">
          <div class="listing" style="border-radius:22px">
            <div class="thumb" style="aspect-ratio:16/9;background-image:url('${p.image}')">
              <div class="badges">${badgeHTML(p)}</div>
            </div>
            <div class="l-body">
              <div class="price">
                <strong>${formatMoney(p.price)} ${p.currency}</strong>
                <span>${p.operation === "location" ? p.period : ""}</span>
              </div>
              <div class="l-title" style="font-size:18px">${p.title}</div>
              <div class="meta">
                <span><b>${ZONE_LABEL[p.zone]}</b></span>
                <span>${p.area} m²</span>
                <span>${p.beds} ch</span>
                <span>${p.baths} sdb</span>
                <span class="small">Réf: ${p.id}</span>
              </div>
              <div class="l-actions">
                <a class="btn btn-primary" id="waProperty" href="#">WhatsApp — Visite</a>
                <a class="btn btn-secondary" href="listings.html">Retour aux biens</a>
              </div>
            </div>
          </div>
        </div>

        <div style="flex:1;min-width:300px">
          <div class="card" style="border-radius:22px">
            <h2 style="margin-top:0">Caractéristiques</h2>
            <p class="sub" style="margin-top:-6px">Informations clés pour une visite efficace.</p>
            <div class="row" style="gap:10px">
              <div class="kpi" style="flex:1"><strong>${p.area} m²</strong><span>Surface</span></div>
              <div class="kpi" style="flex:1"><strong>${p.beds}</strong><span>Chambres</span></div>
              <div class="kpi" style="flex:1"><strong>${p.baths}</strong><span>Salles de bain</span></div>
            </div>
            <hr style="border:none;border-top:1px solid var(--line);margin:14px 0">
            <h3 style="margin:0 0 8px;color:var(--navy)">Disponibilité</h3>
            <p style="margin:0"><b>${p.dispo ? "Disponible" : "Indisponible"}</b> — ${p.dispo ? "Visites possibles sur rendez-vous." : "Ce bien n’est plus disponible pour le moment."}</p>
            <hr style="border:none;border-top:1px solid var(--line);margin:14px 0">
            <h3 style="margin:0 0 8px;color:var(--navy)">Charges</h3>
            ${chargesBlock}
            <hr style="border:none;border-top:1px solid var(--line);margin:14px 0">
            <h3 style="margin:0 0 8px;color:var(--navy)">Description</h3>
            <p style="line-height:1.7;margin:0">
              Ce bien offre une distribution fonctionnelle et des finitions soignées, dans un emplacement recherché.
              Idéal pour un style de vie confortable, avec un accès rapide aux principaux axes et commodités.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  document.getElementById("waProperty")?.addEventListener("click",(e)=>{
    e.preventDefault();
    const msg = `Bonjour Bayan Properties, je suis intéressé(e) par le bien Réf: ${p.id}. Pouvez-vous me proposer une visite ? Merci.`;
    openWhatsApp(msg);
  });
}

document.addEventListener("DOMContentLoaded", async ()=>{
  window.__LISTINGS = await loadListings();

  bindMobileMenu();

  bindGlobalWhatsApp();
  bindOwnerWhatsApp();
  renderListings("featuredGrid", 6);
  renderListings("listingsGrid", null);
  bindFilters();
  renderPropertyDetail();
});
