import { useState, useEffect, useRef } from "react";

const CATALOGUE = [
  { id: 1, name: "Castle Lager 6-pack", brand: "Castle", category: "Beer", size: "6√ó340ml", emoji: "üç∫", popular: true, price: 89 },
  { id: 2, name: "Castle Lite 6-pack", brand: "Castle", category: "Beer", size: "6√ó340ml", emoji: "üç∫", popular: true, price: 92 },
  { id: 3, name: "Black Label 6-pack", brand: "Black Label", category: "Beer", size: "6√ó340ml", emoji: "üç∫", popular: true, price: 89 },
  { id: 4, name: "Carling Black Label 750ml", brand: "Carling", category: "Beer", size: "750ml", emoji: "üç∫", popular: true, price: 22 },
  { id: 5, name: "Heineken 6-pack", brand: "Heineken", category: "Beer", size: "6√ó330ml", emoji: "üç∫", popular: true, price: 110 },
  { id: 6, name: "Hansa Pilsener 6-pack", brand: "Hansa", category: "Beer", size: "6√ó340ml", emoji: "üç∫", popular: false, price: 85 },
  { id: 7, name: "Amstel Lager 6-pack", brand: "Amstel", category: "Beer", size: "6√ó340ml", emoji: "üç∫", popular: false, price: 88 },
  { id: 8, name: "Corona Extra 6-pack", brand: "Corona", category: "Beer", size: "6√ó355ml", emoji: "üç∫", popular: false, price: 120 },
  { id: 9, name: "Windhoek Lager 6-pack", brand: "Windhoek", category: "Beer", size: "6√ó340ml", emoji: "üç∫", popular: false, price: 95 },
  { id: 11, name: "Savanna Dry 6-pack", brand: "Savanna", category: "Cider", size: "6√ó330ml", emoji: "üçã", popular: true, price: 105 },
  { id: 12, name: "Savanna Premium 6-pack", brand: "Savanna", category: "Cider", size: "6√ó330ml", emoji: "üçã", popular: false, price: 110 },
  { id: 13, name: "Hunters Gold 6-pack", brand: "Hunters", category: "Cider", size: "6√ó330ml", emoji: "üçã", popular: true, price: 95 },
  { id: 14, name: "Hunters Dry 6-pack", brand: "Hunters", category: "Cider", size: "6√ó330ml", emoji: "üçã", popular: false, price: 95 },
  { id: 15, name: "Brutal Fruit Ruby 6-pack", brand: "Brutal Fruit", category: "Cider", size: "6√ó330ml", emoji: "üçì", popular: true, price: 98 },
  { id: 16, name: "Flying Fish Lemon 6-pack", brand: "Flying Fish", category: "Cider", size: "6√ó330ml", emoji: "üêü", popular: false, price: 100 },
  { id: 18, name: "Johnnie Walker Red 750ml", brand: "Johnnie Walker", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 289 },
  { id: 19, name: "Johnnie Walker Black 750ml", brand: "Johnnie Walker", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 389 },
  { id: 20, name: "Jack Daniel's 750ml", brand: "Jack Daniel's", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 319 },
  { id: 21, name: "Jameson Irish 750ml", brand: "Jameson", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 299 },
  { id: 22, name: "Klipdrift Premium 750ml", brand: "Klipdrift", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 189 },
  { id: 25, name: "Smirnoff 1818 750ml", brand: "Smirnoff", category: "Vodka", size: "750ml", emoji: "üç∏", popular: true, price: 199 },
  { id: 26, name: "Absolut Original 750ml", brand: "Absolut", category: "Vodka", size: "750ml", emoji: "üç∏", popular: true, price: 249 },
  { id: 27, name: "Cruz Watermelon 750ml", brand: "Cruz", category: "Vodka", size: "750ml", emoji: "üçâ", popular: true, price: 189 },
  { id: 28, name: "C√Æroc 750ml", brand: "C√Æroc", category: "Vodka", size: "750ml", emoji: "üç∏", popular: false, price: 499 },
  { id: 30, name: "Hennessy VS 750ml", brand: "Hennessy", category: "Cognac", size: "750ml", emoji: "ü•É", popular: true, price: 599 },
  { id: 31, name: "Hennessy VSOP 750ml", brand: "Hennessy", category: "Cognac", size: "750ml", emoji: "ü•É", popular: true, price: 899 },
  { id: 32, name: "R√©my Martin VS 750ml", brand: "R√©my Martin", category: "Cognac", size: "750ml", emoji: "ü•É", popular: false, price: 549 },
  { id: 33, name: "Captain Morgan 750ml", brand: "Captain Morgan", category: "Rum", size: "750ml", emoji: "üè¥‚Äç‚ò†Ô∏è", popular: true, price: 229 },
  { id: 34, name: "Bacardi White 750ml", brand: "Bacardi", category: "Rum", size: "750ml", emoji: "üè¥‚Äç‚ò†Ô∏è", popular: false, price: 219 },
  { id: 35, name: "Bombay Sapphire 750ml", brand: "Bombay", category: "Gin", size: "750ml", emoji: "ü´ô", popular: true, price: 349 },
  { id: 36, name: "Gordon's Pink Gin 750ml", brand: "Gordon's", category: "Gin", size: "750ml", emoji: "üå∏", popular: true, price: 249 },
  { id: 37, name: "Hendrick's Gin 750ml", brand: "Hendrick's", category: "Gin", size: "750ml", emoji: "ü•í", popular: false, price: 499 },
  { id: 38, name: "Four Cousins Sweet Red 750ml", brand: "Four Cousins", category: "Wine", size: "750ml", emoji: "üç∑", popular: true, price: 75 },
  { id: 39, name: "Drostdy-Hof Adelpragt 750ml", brand: "Drostdy-Hof", category: "Wine", size: "750ml", emoji: "üç∑", popular: true, price: 79 },
  { id: 40, name: "J.C. Le Roux La Vall√©e 750ml", brand: "J.C. Le Roux", category: "Bubbly", size: "750ml", emoji: "ü•Ç", popular: true, price: 99 },
  { id: 41, name: "Pongr√°cz Brut 750ml", brand: "Pongr√°cz", category: "Bubbly", size: "750ml", emoji: "ü•Ç", popular: false, price: 179 },
  { id: 42, name: "J√§germeister 750ml", brand: "J√§germeister", category: "Yegas", size: "750ml", emoji: "ü¶å", popular: true, price: 289 },
  { id: 43, name: "Olmeca Tequila Gold 750ml", brand: "Olmeca", category: "Yegas", size: "750ml", emoji: "üåµ", popular: true, price: 249 },
  { id: 44, name: "Amarula 750ml", brand: "Amarula", category: "Yegas", size: "750ml", emoji: "üêò", popular: true, price: 199 },
  { id: 45, name: "Coca Cola 2L", brand: "Coca Cola", category: "Mixers", size: "2L", emoji: "ü•§", popular: true, price: 28 },
  { id: 46, name: "Schweppes Tonic 6-pack", brand: "Schweppes", category: "Mixers", size: "6-pack", emoji: "ü•§", popular: true, price: 65 },
  { id: 47, name: "Fever-Tree Indian Tonic 750ml", brand: "Fever-Tree", category: "Mixers", size: "750ml", emoji: "üåø", popular: false, price: 89 },
  { id: 48, name: "Ice Bag 2kg", brand: "Ice", category: "Extras", size: "2kg", emoji: "üßä", popular: true, price: 25 },
  { id: 49, name: "Simba Chips 145g", brand: "Simba", category: "Extras", size: "145g", emoji: "üçü", popular: true, price: 22 },
  { id: 50, name: "Doritos Nacho Cheese 145g", brand: "Doritos", category: "Extras", size: "145g", emoji: "üåΩ", popular: true, price: 25 },
  { id: 51, name: "Grandpa Headache Powders", brand: "Grandpa", category: "Extras", size: "12-pack", emoji: "üíä", popular: false, price: 35 },
  { id: 52, name: "Durex Originals 3-pack", brand: "Durex", category: "Extras", size: "3-pack", emoji: "üõ°Ô∏è", popular: false, price: 89 },
];

const ZONES = [
  { name: "Zone 1", areas: "CBD, Sonheuwel, Berghof", km: "0‚Äì5km", fee: 50 },
  { name: "Zone 2", areas: "West Acres, Kamagugu, Valencia, Mataffin", km: "6‚Äì12km", fee: 65 },
];

const CATS = ["üî• Popular", "All", "Beer", "Cider", "Whisky", "Cognac", "Vodka", "Rum", "Gin", "Wine", "Bubbly", "Yegas", "Mixers", "Extras"];

function MugIcon({ size = 48 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 48 54" fill="none">
      <ellipse cx="22" cy="8" rx="14" ry="6" fill="white" opacity="0.92"/>
      <ellipse cx="14" cy="7" rx="5" ry="4" fill="white" opacity="0.7"/>
      <ellipse cx="30" cy="7" rx="4" ry="3.5" fill="white" opacity="0.7"/>
      <rect x="8" y="12" width="28" height="34" rx="5" fill="url(#mg)"/>
      <rect x="12" y="16" width="6" height="20" rx="3" fill="white" opacity="0.15"/>
      <path d="M36 20 Q46 20 46 30 Q46 40 36 40" stroke="url(#hg)" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <defs>
        <linearGradient id="mg" x1="8" y1="12" x2="36" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8C060"/><stop offset="50%" stopColor="#E8A020"/><stop offset="100%" stopColor="#C8601A"/>
        </linearGradient>
        <linearGradient id="hg" x1="36" y1="20" x2="46" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8A020"/><stop offset="100%" stopColor="#C8601A"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function App() {
  const [splash, setSplash] = useState(true);
  const [splashPhase, setSplashPhase] = useState(0);
  const [screen, setScreen] = useState("home");
  const [cart, setCart] = useState({});
  const [filter, setFilter] = useState("üî• Popular");
  const [zone, setZone] = useState(null);
  const [address, setAddress] = useState("");
  const [pay, setPay] = useState("snapscan");
  const [stage, setStage] = useState(0);
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [problem, setProblem] = useState(false);
  const [tab, setTab] = useState("customer");
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => setSplashPhase(1), 700);
    setTimeout(() => setSplashPhase(2), 2000);
    setTimeout(() => setSplash(false), 2800);
  }, []);

  const filtered = CATALOGUE.filter(p => {
    const matchCat = filter === "All" ? true : filter === "üî• Popular" ? p.popular : p.category === filter;
    const matchSearch = search === "" ? true : p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const add = id => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = id => setCart(c => { const u = { ...c }; u[id] > 1 ? u[id]-- : delete u[id]; return u; });
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((s, [id, q]) => s + (CATALOGUE.find(p => p.id === +id)?.price || 0) * q, 0);
  const total = subtotal + (zone?.fee || 50);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-track{background:#f1f1f1;}
    ::-webkit-scrollbar-thumb{background:#E8A020;border-radius:3px;}
    @keyframes mugPop{0%{opacity:0;transform:scale(0.3) translateY(30px)}65%{opacity:1;transform:scale(1.08) translateY(-4px)}100%{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes wordIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeOut{from{opacity:1}to{opacity:0}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
    @keyframes glow{0%,100%{opacity:0.15}50%{opacity:0.3}}
    @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    .product-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(200,96,26,0.15)!important;}
    .product-card{transition:all 0.25s ease!important;}
    .cat-btn:hover{background:rgba(232,160,32,0.12)!important;color:#E8A020!important;}
    .add-btn:hover{opacity:0.88!important;transform:scale(0.98)!important;}
    .nav-link:hover{color:#E8A020!important;}
  `;

  // ‚îÄ‚îÄ SPLASH ‚îÄ‚îÄ
  if (splash) return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "radial-gradient(ellipse at center, #160e02 0%, #080810 100%)" }}>
      <style>{css}</style>
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,160,32,0.08) 0%, transparent 70%)", animation: "glow 2.5s ease infinite" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, animation: splashPhase === 2 ? "fadeOut 0.6s ease forwards" : "none" }}>
        <div style={{ filter: "drop-shadow(0 8px 40px rgba(232,160,32,0.45))" }}><MugIcon size={110} /></div>
        {splashPhase >= 1 && (
          <div style={{ textAlign: "center", animation: "wordIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 52, color: "#fff", letterSpacing: "-1.5px", textShadow: "0 4px 32px rgba(232,160,32,0.3)" }}>umgodi</div>
            <div style={{ fontSize: 12, letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans',sans-serif", marginTop: 8 }}>After hours, sorted.</div>
          </div>
        )}
      </div>
    </div>
  );

  const NavBar = () => (
    <nav style={{ background: "#0e0a04", borderBottom: "1px solid rgba(232,160,32,0.12)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 60 : 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { setScreen("home"); setCart({}); }}>
          <MugIcon size={isMobile ? 28 : 36} />
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: isMobile ? 20 : 26, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>umgodi</div>
            {!isMobile && <div style={{ fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: 1 }}>After hours, sorted.</div>}
          </div>
        </div>

        {/* Search ‚Äî desktop only */}
        {!isMobile && screen === "home" && (
          <div style={{ flex: 1, maxWidth: 420, margin: "0 40px", position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.4 }}>üîç</div>
            <input
              style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 16px 10px 40px", color: "#fff", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif" }}
              placeholder="Search Castle, Hennessy, Savanna..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            <div style={{ fontSize: isMobile ? 11 : 13, color: "#4ade80", fontWeight: 600 }}>Open ¬∑ 12PM‚Äì2AM</div>
          </div>
          {count > 0 && (
            <button onClick={() => setScreen("cart")} style={{ background: "linear-gradient(135deg,#E8A020,#C8601A)", border: "none", borderRadius: 12, padding: isMobile ? "8px 14px" : "10px 20px", color: "#fff", fontWeight: 700, fontSize: isMobile ? 13 : 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 16px rgba(232,160,32,0.3)" }}>
              üõí {isMobile ? count : `${count} items ¬∑ R${subtotal}`}
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  // ‚îÄ‚îÄ HOME ‚îÄ‚îÄ
  if (screen === "home") return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#faf8f5", minHeight: "100vh" }}>
      <style>{css}</style>
      <NavBar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#0e0a04 0%,#1a0f02 50%,#241206 100%)", padding: isMobile ? "32px 20px" : "60px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: "radial-gradient(circle,rgba(232,160,32,0.08) 0%,transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -40, left: "40%", width: 200, height: 200, background: "radial-gradient(circle,rgba(200,96,26,0.06) 0%,transparent 70%)", borderRadius: "50%" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: isMobile ? 11 : 12, letterSpacing: "3px", textTransform: "uppercase", color: "#E8A020", fontWeight: 700, marginBottom: 12 }}>üåô Nelspruit's #1 After Hours Delivery</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 28 : 52, fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16, maxWidth: 600 }}>
              Your late night spot,<br /><span style={{ color: "#E8A020" }}>delivered.</span>
            </div>
            <div style={{ fontSize: isMobile ? 13 : 16, color: "rgba(255,255,255,0.5)", marginBottom: 24, maxWidth: 480 }}>
              200+ products ¬∑ Beer, Spirits, Wine, Snacks & more ¬∑ Photo-verified delivery ¬∑ ~30 mins
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["üç∫ Beer & Cider", "ü•É Spirits", "üç∑ Wine", "üßä Ice & Snacks"].map(t => (
                <div key={t} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{t}</div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <div style={{ opacity: 0.12, flexShrink: 0 }}><MugIcon size={180} /></div>
          )}
        </div>
      </div>

      {/* Mobile search */}
      {isMobile && (
        <div style={{ padding: "12px 16px", background: "#fff", borderBottom: "1px solid #f0ede8" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.4 }}>üîç</div>
            <input style={{ width: "100%", background: "#f5f2ee", border: "none", borderRadius: 10, padding: "10px 16px 10px 36px", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", color: "#333" }} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      )}

      {/* Main layout */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0" : "0 40px", display: "flex", gap: 32, alignItems: "flex-start" }}>

        {/* Sidebar ‚Äî desktop only */}
        {!isMobile && (
          <div style={{ width: 220, flexShrink: 0, position: "sticky", top: 88, paddingTop: 32, paddingBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#aaa", marginBottom: 12, paddingLeft: 12 }}>Categories</div>
            {CATS.map(c => (
              <button key={c} className="cat-btn" onClick={() => { setFilter(c); setSearch(""); }}
                style={{ width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 10, border: "none", background: filter === c ? "rgba(232,160,32,0.12)" : "transparent", color: filter === c ? "#C8601A" : "#555", fontSize: 14, fontWeight: filter === c ? 700 : 500, cursor: "pointer", marginBottom: 2, fontFamily: "'DM Sans',sans-serif", borderLeft: filter === c ? "3px solid #E8A020" : "3px solid transparent", transition: "all 0.15s" }}>
                {c}
              </button>
            ))}

            {/* Delivery info */}
            <div style={{ marginTop: 24, background: "#fff", borderRadius: 16, padding: 16, border: "1px solid #f0ede8" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#333", marginBottom: 10 }}>üöó Delivery Zones</div>
              {ZONES.map(z => (
                <div key={z.name} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#C8601A" }}>{z.name} ‚Äî R{z.fee}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{z.areas}</div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: "#bbb", marginTop: 8, borderTop: "1px solid #f0ede8", paddingTop: 8 }}>üîí Photo-verified delivery</div>
            </div>
          </div>
        )}

        {/* Product area */}
        <div style={{ flex: 1, paddingTop: isMobile ? 0 : 32, paddingBottom: 100 }}>

          {/* Mobile category scroll */}
          {isMobile && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 16px", background: "#fff", borderBottom: "1px solid #f0ede8" }}>
              {CATS.map(c => (
                <button key={c} onClick={() => { setFilter(c); setSearch(""); }}
                  style={{ padding: "6px 14px", borderRadius: 20, border: filter === c ? "1px solid #E8A020" : "1px solid #e8e3dc", background: filter === c ? "rgba(232,160,32,0.1)" : "#fff", color: filter === c ? "#C8601A" : "#666", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'DM Sans',sans-serif" }}>{c}</button>
              ))}
            </div>
          )}

          {/* Section header */}
          <div style={{ padding: isMobile ? "16px 16px 8px" : "0 0 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 800, color: "#1a0f02", fontFamily: "'Playfair Display',serif" }}>
                {search ? `Results for "${search}"` : filter === "üî• Popular" ? "üî• Most Popular" : filter === "All" ? "All Products" : filter}
              </div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{filtered.length} products available</div>
            </div>
            <div style={{ fontSize: 11, color: "#ccc", display: "flex", alignItems: "center", gap: 4 }}>üè™ Lucky Star ¬∑ CBD</div>
          </div>

          {/* Product grid */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(200px, 1fr))", gap: isMobile ? 10 : 16, padding: isMobile ? "0 16px" : "0" }}>
            {filtered.map(p => (
              <div key={p.id} className="product-card" style={{ background: "#fff", border: `1.5px solid ${cart[p.id] ? "#E8A020" : "#f0ede8"}`, borderRadius: isMobile ? 16 : 20, padding: isMobile ? 14 : 18, position: "relative", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", cursor: "default" }}>
                {p.popular && (
                  <div style={{ position: "absolute", top: 10, right: 10, background: "linear-gradient(135deg,#E8A020,#C8601A)", borderRadius: 6, padding: "2px 7px", fontSize: 9, color: "#fff", fontWeight: 700 }}>üî• HOT</div>
                )}
                <div style={{ fontSize: isMobile ? 32 : 40, marginBottom: 10 }}>{p.emoji}</div>
                <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, marginBottom: 3, lineHeight: 1.3, color: "#1a0f02" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#bbb", marginBottom: 10 }}>{p.size}</div>
                <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 800, color: "#C8601A", marginBottom: 10 }}>R{p.price}</div>
                {cart[p.id] ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fdf6ee", borderRadius: 10, padding: "4px 10px", border: "1px solid rgba(232,160,32,0.2)" }}>
                    <button onClick={() => rem(p.id)} style={{ background: "none", border: "none", color: "#E8A020", fontSize: 22, fontWeight: 700, cursor: "pointer", lineHeight: 1 }}>‚àí</button>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#1a0f02" }}>{cart[p.id]}</span>
                    <button onClick={() => add(p.id)} style={{ background: "none", border: "none", color: "#E8A020", fontSize: 22, fontWeight: 700, cursor: "pointer", lineHeight: 1 }}>+</button>
                  </div>
                ) : (
                  <button className="add-btn" onClick={() => add(p.id)} style={{ width: "100%", padding: "9px 0", background: "linear-gradient(135deg,#E8A020,#C8601A)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 3px 10px rgba(232,160,32,0.25)" }}>Add to order</button>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#bbb" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>üîç</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#888" }}>No results for "{search}"</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>Try another brand or product name</div>
            </div>
          )}
        </div>
      </div>

      {/* Floating cart ‚Äî mobile */}
      {count > 0 && isMobile && (
        <div onClick={() => setScreen("cart")} style={{ position: "fixed", bottom: 20, left: 20, right: 20, background: "linear-gradient(135deg,#E8A020,#C8601A)", borderRadius: 16, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", boxShadow: "0 8px 32px rgba(232,160,32,0.35)", zIndex: 100 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>View Order ({count} items)</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>R{subtotal} + delivery</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>Checkout ‚Üí</div>
        </div>
      )}
    </div>
  );

  // ‚îÄ‚îÄ CART ‚îÄ‚îÄ
  if (screen === "cart") return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#faf8f5", minHeight: "100vh" }}>
      <style>{css}</style>
      <NavBar />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: isMobile ? "20px 16px 100px" : "40px 40px 100px" }}>
        <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#888", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>‚Üê Back to menu</button>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 24 : 32, fontWeight: 900, color: "#1a0f02", marginBottom: 24 }}>Your Order üõí</div>

        <div style={{ display: isMobile ? "block" : "grid", gridTemplateColumns: "1fr 360px", gap: 32 }}>
          {/* Items */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #f0ede8", marginBottom: isMobile ? 20 : 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#888", marginBottom: 16, textTransform: "uppercase", letterSpacing: "1px" }}>Order Items</div>
            {Object.entries(cart).map(([id, qty]) => {
              const p = CATALOGUE.find(p => p.id === +id);
              return (
                <div key={id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #f5f2ee" }}>
                  <span style={{ fontSize: 28 }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a0f02" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>{p.size}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#C8601A" }}>R{p.price * qty}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => rem(p.id)} style={{ background: "#fdf6ee", border: "1px solid #f0e8d8", color: "#E8A020", width: 28, height: 28, borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>‚àí</button>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#1a0f02", width: 20, textAlign: "center", lineHeight: "28px" }}>{qty}</span>
                      <button onClick={() => add(p.id)} style={{ background: "#fdf6ee", border: "1px solid #f0e8d8", color: "#E8A020", width: 28, height: 28, borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div>
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #f0ede8", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#888", marginBottom: 16, textTransform: "uppercase", letterSpacing: "1px" }}>Delivery Zone</div>
              {ZONES.map(z => (
                <div key={z.name} onClick={() => setZone(z)} style={{ padding: 14, background: zone?.name === z.name ? "#fdf6ee" : "#faf8f5", border: `1.5px solid ${zone?.name === z.name ? "#E8A020" : "#f0ede8"}`, borderRadius: 12, cursor: "pointer", marginBottom: 10, transition: "all 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1a0f02" }}>{z.name} ‚Äî R{z.fee}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{z.areas}</div>
                    </div>
                    {zone?.name === z.name && <span style={{ color: "#E8A020", fontSize: 18 }}>‚úì</span>}
                  </div>
                </div>
              ))}

              <input style={{ width: "100%", background: "#faf8f5", border: "1px solid #f0ede8", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", color: "#333", marginTop: 8 }} placeholder="üìç Enter delivery address..." value={address} onChange={e => setAddress(e.target.value)} />
            </div>

            <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #f0ede8", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#888", marginBottom: 14, textTransform: "uppercase", letterSpacing: "1px" }}>Payment</div>
              {[{ id: "snapscan", label: "SnapScan", icon: "üì±" }, { id: "payfast", label: "PayFast (Card)", icon: "üí≥" }].map(m => (
                <div key={m.id} onClick={() => setPay(m.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: pay === m.id ? "#fdf6ee" : "#faf8f5", border: `1.5px solid ${pay === m.id ? "#E8A020" : "#f0ede8"}`, borderRadius: 12, cursor: "pointer", marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{m.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1a0f02" }}>{m.label}</span>
                  {pay === m.id && <span style={{ marginLeft: "auto", color: "#E8A020", fontWeight: 700 }}>‚úì</span>}
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #f0ede8" }}>
              {[["Subtotal", `R${subtotal}`], ["Delivery", `R${zone?.fee || 50}`]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, color: "#888" }}><span>{l}</span><span>{v}</span></div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", fontSize: 20, fontWeight: 800, borderTop: "1px solid #f0ede8", marginTop: 8, color: "#1a0f02" }}><span>Total</span><span style={{ color: "#C8601A" }}>R{total}</span></div>
              <div style={{ background: "#f0f9f0", border: "1px solid #c6e8c6", borderRadius: 10, padding: "10px 14px", marginTop: 14, fontSize: 12, color: "#4a8a4a" }}>üîí Photo-verified delivery ‚Äî photos auto-deleted on confirmation</div>
              <button style={{ width: "100%", padding: 16, background: "linear-gradient(135deg,#E8A020,#C8601A)", border: "none", borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", marginTop: 14, fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 24px rgba(232,160,32,0.3)" }} onClick={() => { setScreen("tracking"); setStage(1); }}>Place Order üöÄ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ‚îÄ‚îÄ TRACKING ‚îÄ‚îÄ
  if (screen === "tracking") return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#faf8f5", minHeight: "100vh" }}>
      <style>{css}</style>
      <NavBar />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "20px 16px 100px" : "40px 40px 100px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[["customer", "üë§ Customer View"], ["driver", "üõµ Driver View"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "12px 0", background: tab === t ? "linear-gradient(135deg,#E8A020,#C8601A)" : "#fff", border: tab === t ? "none" : "1px solid #f0ede8", borderRadius: 12, color: tab === t ? "#fff" : "#888", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: tab === t ? "0 4px 16px rgba(232,160,32,0.25)" : "none" }}>{l}</button>
          ))}
        </div>

        {tab === "customer" && (
          <div style={{ background: "#fff", borderRadius: 24, padding: isMobile ? 20 : 32, border: "1px solid #f0ede8" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 64, animation: stage >= 2 ? "bounce 2s infinite" : "none", marginBottom: 14 }}>{stage === 4 ? "üéâ" : stage >= 2 ? "üõµ" : "üì¶"}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 22 : 28, fontWeight: 900, color: "#1a0f02" }}>{stage === 4 ? "Delivered! üç∫" : stage === 3 ? "Driver at your door!" : stage === 2 ? "On the way! üõµ" : "Order Confirmed!"}</div>
              <div style={{ fontSize: 14, color: "#aaa", marginTop: 6 }}>Est. ~25 mins ¬∑ Lucky Star CBD</div>
            </div>
            {[{label:"Order received & paid",icon:"‚úÖ",s:1},{label:"Store packed ‚Äî photo taken üì∏",icon:"üì¶",s:1},{label:"Driver collected ‚Äî photo taken üì∏",icon:"üõµ",s:2},{label:"Driver at your door ‚Äî photo taken üì∏",icon:"üìç",s:3},{label:"Confirmed by you ‚úÖ",icon:"üéâ",s:4}].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: stage > step.s ? "#f0faf0" : stage === step.s ? "#fdf6ee" : "#faf8f5", border: `1px solid ${stage > step.s ? "#c6e8c6" : stage === step.s ? "#f0d8b0" : "#f0ede8"}`, borderRadius: 12, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: stage > step.s ? "#4ade80" : stage === step.s ? "#E8A020" : "#e0dbd4", flexShrink: 0, boxShadow: stage === step.s ? "0 0 8px rgba(232,160,32,0.5)" : "none" }} />
                <span style={{ fontSize: 18 }}>{step.icon}</span>
                <span style={{ fontSize: 14, fontWeight: stage >= step.s ? 600 : 400, color: stage >= step.s ? "#1a0f02" : "#bbb" }}>{step.label}</span>
              </div>
            ))}
            {stage === 3 && !problem && (
              <>
                <button style={{ width: "100%", padding: 15, background: "linear-gradient(135deg,#22c55e,#16a34a)", border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 16, fontFamily: "'DM Sans',sans-serif" }} onClick={() => { setPickup(false); setDelivery(false); setStage(4); }}>‚úÖ Received & All Good ‚Äî Delete Photos</button>
                <button onClick={() => setProblem(true)} style={{ width: "100%", padding: 14, background: "transparent", border: "1.5px solid #ef4444", borderRadius: 14, color: "#ef4444", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 10, fontFamily: "'DM Sans',sans-serif" }}>‚ö†Ô∏è Report a Problem</button>
              </>
            )}
            {problem && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 14, marginTop: 12 }}><div style={{ fontSize: 13, color: "#ef4444", fontWeight: 700 }}>‚ö†Ô∏è Photos kept. Management contacts you within 30 mins.</div></div>}
            {stage === 4 && (
              <>
                <div style={{ background: "#f0faf0", border: "1px solid #c6e8c6", borderRadius: 12, padding: 16, textAlign: "center", marginTop: 16 }}><div style={{ fontSize: 15, fontWeight: 700, color: "#22c55e" }}>üóëÔ∏è Photos Deleted ¬∑ Enjoy! üç∫</div></div>
                <button style={{ width: "100%", padding: 15, background: "linear-gradient(135deg,#E8A020,#C8601A)", border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 14, fontFamily: "'DM Sans',sans-serif" }} onClick={() => { setScreen("home"); setCart({}); setStage(0); setPickup(false); setDelivery(false); setProblem(false); setZone(null); }}>Order Again üç∫</button>
              </>
            )}
            {stage < 3 && (
              <div style={{ marginTop: 20, padding: 16, background: "#faf8f5", border: "1px solid #f0ede8", borderRadius: 14 }}>
                <div style={{ fontSize: 11, color: "#ccc", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Demo Controls</div>
                {stage === 1 && <button style={{ width: "100%", padding: 13, background: "#6366f1", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }} onClick={() => { setPickup(true); setStage(2); }}>Simulate: Driver Collected üì∏</button>}
                {stage === 2 && <button style={{ width: "100%", padding: 13, background: "#8b5cf6", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }} onClick={() => { setDelivery(true); setStage(3); }}>Simulate: Driver Arrived üì∏</button>}
              </div>
            )}
          </div>
        )}

        {tab === "driver" && (
          <div style={{ background: "#fff", borderRadius: 24, padding: isMobile ? 20 : 32, border: "1px solid #f0ede8" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: "#1a0f02", marginBottom: 4 }}>Driver Dashboard üõµ</div>
            <div style={{ fontSize: 12, color: "#bbb", marginBottom: 24 }}>Standford Elizabeth Group t/a Umgodi</div>
            <div style={{ background: "#fdf6ee", border: "1px solid #f0d8b0", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#C8601A", marginBottom: 14 }}>üì¶ Active Order #UM2847</div>
              {[["üè™ Pickup","Lucky Star Chinese Shop, CBD"],["üìç Deliver to","14 Sonheuwel Ave, Nelspruit"],["üó∫Ô∏è Zone","Zone 1 ¬∑ ~3.2km ¬∑ Earn R35"]].map(([l,v]) => (
                <div key={l} style={{ fontSize: 14, color: "#666", marginBottom: 8 }}><span style={{ fontWeight: 600, color: "#888" }}>{l}:</span> {v}</div>
              ))}
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a0f02", margin: "16px 0 12px" }}>üì∏ Required Photos</div>
              {[{label:"Pickup Photo",sub:"Photo of packed order at store",done:pickup,action:()=>{setPickup(true);setStage(2);},canTap:!pickup},{label:"Delivery Photo",sub:pickup?"Photo at customer door":"Complete pickup first",done:delivery,action:()=>{setDelivery(true);setStage(3);},canTap:pickup&&!delivery}].map((ph,i)=>(
                <div key={i} onClick={ph.canTap?ph.action:undefined} style={{ background: ph.done?"#f0faf0":"#faf8f5", border:`2px dashed ${ph.done?"#86efac":"#e0dbd4"}`, borderRadius:14, padding:20, textAlign:"center", marginBottom:12, cursor:ph.canTap?"pointer":"default" }}>
                  {ph.done?<><div style={{fontSize:28,marginBottom:6}}>‚úÖ</div><div style={{fontSize:14,color:"#22c55e",fontWeight:700}}>{ph.label} Captured</div></>:<><div style={{fontSize:28,marginBottom:6}}>üì∑</div><div style={{fontSize:14,color:ph.canTap?"#888":"#ccc",fontWeight:600}}>Tap ‚Äî {ph.label}</div><div style={{fontSize:12,color:"#ccc",marginTop:4}}>{ph.sub}</div></>}
                </div>
              ))}
              {stage===4&&<div style={{background:"#f0faf0",border:"1px solid #c6e8c6",borderRadius:10,padding:12}}><div style={{fontSize:13,color:"#22c55e",fontWeight:700}}>‚úÖ Confirmed! R35 added to your earnings.</div></div>}
            </div>
            <div style={{ background: "#faf8f5", borderRadius: 16, padding: 20, border: "1px solid #f0ede8" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#888", marginBottom: 14 }}>üí∞ Tonight's Earnings</div>
              <div style={{ display: "flex", gap: 12 }}>
                {[{l:"Deliveries",v:"7"},{l:"Earned",v:"R280"},{l:"Avg/drop",v:"R40"}].map(s=>(
                  <div key={s.l} style={{ flex:1, background:"#fff", borderRadius:12, padding:"14px 10px", textAlign:"center", border:"1px solid #f0ede8" }}>
                    <div style={{fontSize:22,fontWeight:800,color:"#C8601A"}}>{s.v}</div>
                    <div style={{fontSize:11,color:"#aaa",marginTop:4}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

