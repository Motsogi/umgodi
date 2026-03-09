import { useState, useEffect } from "react";

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
  { id: 17, name: "Bernini Blush 6-pack", brand: "Bernini", category: "Cider", size: "6√ó275ml", emoji: "üçæ", popular: false, price: 90 },
  { id: 18, name: "Johnnie Walker Red 750ml", brand: "Johnnie Walker", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 289 },
  { id: 19, name: "Johnnie Walker Black 750ml", brand: "Johnnie Walker", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 389 },
  { id: 20, name: "Jack Daniel's 750ml", brand: "Jack Daniel's", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 319 },
  { id: 21, name: "Jameson Irish 750ml", brand: "Jameson", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 299 },
  { id: 22, name: "Klipdrift Premium 750ml", brand: "Klipdrift", category: "Whisky", size: "750ml", emoji: "ü•É", popular: true, price: 189 },
  { id: 23, name: "Glenfiddich 12yr 750ml", brand: "Glenfiddich", category: "Whisky", size: "750ml", emoji: "ü•É", popular: false, price: 699 },
  { id: 24, name: "Chivas Regal 12yr 750ml", brand: "Chivas", category: "Whisky", size: "750ml", emoji: "ü•É", popular: false, price: 549 },
  { id: 25, name: "Smirnoff 1L", brand: "Smirnoff", category: "Vodka", size: "1L", emoji: "üç∏", popular: true, price: 199 },
  { id: 26, name: "Absolut Original 750ml", brand: "Absolut", category: "Vodka", size: "750ml", emoji: "üç∏", popular: true, price: 249 },
  { id: 27, name: "Cruz Watermelon 750ml", brand: "Cruz", category: "Vodka", size: "750ml", emoji: "üçâ", popular: true, price: 189 },
  { id: 28, name: "Skyy Vodka 750ml", brand: "Skyy", category: "Vodka", size: "750ml", emoji: "üç∏", popular: false, price: 229 },
  { id: 29, name: "C√Æroc 750ml", brand: "C√Æroc", category: "Vodka", size: "750ml", emoji: "üç∏", popular: false, price: 499 },
  { id: 30, name: "Captain Morgan 750ml", brand: "Captain Morgan", category: "Rum & Gin", size: "750ml", emoji: "üè¥‚Äç‚ò†Ô∏è", popular: true, price: 229 },
  { id: 31, name: "Bacardi White 750ml", brand: "Bacardi", category: "Rum & Gin", size: "750ml", emoji: "üè¥‚Äç‚ò†Ô∏è", popular: false, price: 219 },
  { id: 32, name: "Bombay Sapphire 750ml", brand: "Bombay", category: "Rum & Gin", size: "750ml", emoji: "ü´ô", popular: false, price: 349 },
  { id: 33, name: "Hendrick's Gin 750ml", brand: "Hendrick's", category: "Rum & Gin", size: "750ml", emoji: "ü´ô", popular: false, price: 499 },
  { id: 34, name: "Inverroche Gin 750ml", brand: "Inverroche", category: "Rum & Gin", size: "750ml", emoji: "ü´ô", popular: false, price: 399 },
  { id: 35, name: "Four Cousins Sweet Red 750ml", brand: "Four Cousins", category: "Wine", size: "750ml", emoji: "üç∑", popular: true, price: 75 },
  { id: 36, name: "Drostdy-Hof Cabernet 750ml", brand: "Drostdy-Hof", category: "Wine", size: "750ml", emoji: "üç∑", popular: true, price: 79 },
  { id: 37, name: "Nederburg Ros√© 750ml", brand: "Nederburg", category: "Wine", size: "750ml", emoji: "üç∑", popular: false, price: 99 },
  { id: 38, name: "Two Oceans Sauvignon 750ml", brand: "Two Oceans", category: "Wine", size: "750ml", emoji: "üç∑", popular: false, price: 89 },
  { id: 39, name: "Robertson Merlot 750ml", brand: "Robertson", category: "Wine", size: "750ml", emoji: "üç∑", popular: false, price: 85 },
  { id: 40, name: "J.C. Le Roux La Vall√©e 750ml", brand: "J.C. Le Roux", category: "Bubbly", size: "750ml", emoji: "ü•Ç", popular: true, price: 99 },
  { id: 41, name: "J.C. Le Roux Ros√© 750ml", brand: "J.C. Le Roux", category: "Bubbly", size: "750ml", emoji: "ü•Ç", popular: true, price: 105 },
  { id: 42, name: "Pongr√°cz Brut 750ml", brand: "Pongr√°cz", category: "Bubbly", size: "750ml", emoji: "ü•Ç", popular: false, price: 179 },
  { id: 43, name: "Graham Beck Brut 750ml", brand: "Graham Beck", category: "Bubbly", size: "750ml", emoji: "ü•Ç", popular: false, price: 199 },
  { id: 44, name: "Mo√´t & Chandon 750ml", brand: "Mo√´t", category: "Bubbly", size: "750ml", emoji: "ü•Ç", popular: false, price: 899 },
  { id: 45, name: "Amarula 750ml", brand: "Amarula", category: "Liqueur", size: "750ml", emoji: "üêò", popular: true, price: 199 },
  { id: 46, name: "Olmeca Tequila 750ml", brand: "Olmeca", category: "Liqueur", size: "750ml", emoji: "üåµ", popular: true, price: 249 },
  { id: 47, name: "Jose Cuervo Gold 750ml", brand: "Jose Cuervo", category: "Liqueur", size: "750ml", emoji: "üåµ", popular: false, price: 279 },
  { id: 48, name: "J√§germeister 750ml", brand: "J√§germeister", category: "Liqueur", size: "750ml", emoji: "ü¶å", popular: false, price: 289 },
];

const ZONES = [
  { name: "Zone 1", areas: "CBD, Sonheuwel, Berghof", km: "0‚Äì5km", fee: 50, driverEarns: 35 },
  { name: "Zone 2", areas: "West Acres, Kamagugu, Valencia, Mataffin", km: "6‚Äì12km", fee: 65, driverEarns: 50 },
];

const CATS = ["üî• Popular", "All", "Beer", "Cider", "Whisky", "Vodka", "Rum & Gin", "Wine", "Bubbly", "Liqueur"];

function MugIcon({ size = 48, animated = false }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 48 54" fill="none"
      style={animated ? { animation: "mugPop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards", opacity: 0 } : {}}>
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

function Wordmark({ size = "lg" }) {
  const fs = size === "lg" ? 26 : size === "md" ? 20 : 15;
  const ts = size === "lg" ? 9 : 8;
  const iconSz = size === "lg" ? 30 : size === "md" ? 24 : 18;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <MugIcon size={iconSz} />
      <div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: fs, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1, textShadow: "0 2px 16px rgba(232,160,32,0.25)" }}>umgodi</div>
        <div style={{ fontSize: ts, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'Ubuntu',sans-serif", marginTop: 2 }}>After hours, sorted.</div>
      </div>
    </div>
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
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Ubuntu:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::-webkit-scrollbar{display:none;}
    @keyframes mugPop{0%{opacity:0;transform:scale(0.3) translateY(30px)}65%{opacity:1;transform:scale(1.08) translateY(-4px)}100%{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes wordIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeOut{from{opacity:1}to{opacity:0}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
    @keyframes glow{0%,100%{opacity:0.15}50%{opacity:0.3}}
    @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  `;

  const app = { fontFamily: "'Ubuntu',sans-serif", background: "#080810", minHeight: "100vh", maxWidth: 420, margin: "0 auto", color: "#fff" };
  const scr = { padding: 20, paddingBottom: 110 };
  const btn = (bg = "#E8A020") => ({ width: "100%", padding: 15, background: `linear-gradient(135deg,${bg},${bg}bb)`, border: "none", borderRadius: 14, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 12, fontFamily: "'Ubuntu',sans-serif", boxShadow: `0 4px 20px ${bg}33` });
  const inp = { width: "100%", background: "#111120", border: "1px solid #1e1e30", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 14, marginTop: 8, outline: "none", fontFamily: "'Ubuntu',sans-serif" };
  const alertBox = c => ({ background: `${c}0d`, border: `1px solid ${c}33`, borderRadius: 14, padding: 14, marginBottom: 12 });

  if (splash) return (
    <div style={{ ...app, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at center, #160e02 0%, #080810 100%)" }}>
      <style>{css}</style>
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,160,32,0.07) 0%, transparent 70%)", animation: "glow 2.5s ease infinite" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, animation: splashPhase === 2 ? "fadeOut 0.6s ease forwards" : "none" }}>
        <div style={{ filter: "drop-shadow(0 8px 40px rgba(232,160,32,0.45))" }}><MugIcon size={100} animated={true} /></div>
        {splashPhase >= 1 && (
          <div style={{ textAlign: "center", animation: "wordIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 48, color: "#fff", letterSpacing: "-1.5px", textShadow: "0 4px 32px rgba(232,160,32,0.3)" }}>umgodi</div>
            <div style={{ fontSize: 11, letterSpacing: "3.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "'Ubuntu',sans-serif", marginTop: 8 }}>After hours, sorted.</div>
          </div>
        )}
      </div>
    </div>
  );

  if (screen === "home") return (
    <div style={app}>
      <style>{css}</style>
      <div style={{ padding: "18px 20px 0", position: "sticky", top: 0, zIndex: 10, background: "linear-gradient(180deg,#080810 80%,transparent)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <Wordmark size="lg" />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>Open ¬∑ 12PM‚Äì2AM</div>
          </div>
        </div>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>üîç</div>
          <input style={{ ...inp, marginTop: 0, paddingLeft: 40, background: "#0e0e1c", border: "1px solid #1a1a2e" }} placeholder="Search Castle, Savanna, Jack Daniel's..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => { setFilter(c); setSearch(""); }} style={{ padding: "6px 14px", borderRadius: 20, border: filter === c ? "1px solid rgba(232,160,32,0.8)" : "1px solid #1e1e30", background: filter === c ? "rgba(232,160,32,0.15)" : "transparent", color: filter === c ? "#E8A020" : "#555", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Ubuntu',sans-serif" }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ margin: "4px 20px 14px", background: "linear-gradient(135deg,#160e02,#241206)", border: "1px solid rgba(232,160,32,0.18)", borderRadius: 22, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, background: "radial-gradient(circle,rgba(232,160,32,0.1) 0%,transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: 12, right: 16, opacity: 0.1 }}><MugIcon size={64} /></div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 900, lineHeight: 1.3, marginBottom: 6, color: "#fff" }}>Your late night spot,<br />delivered. üåô</div>
        <div style={{ fontSize: 12, color: "#E8A020", fontWeight: 600 }}>Nelspruit ¬∑ ~30 mins ¬∑ üîí Photo-verified</div>
      </div>

      <div style={{ padding: "0 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
          {search ? `Results for "${search}"` : filter === "üî• Popular" ? "üî• Most Popular" : filter === "All" ? "All Products" : filter}
          <span style={{ fontSize: 11, color: "#333", fontWeight: 400, marginLeft: 6 }}>{filtered.length} items</span>
        </div>
        <div style={{ fontSize: 10, color: "#2a2a3a" }}>üè™ Lucky Star ¬∑ CBD</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 20px" }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: "#0e0e1a", border: `1px solid ${cart[p.id] ? "rgba(232,160,32,0.35)" : "#1a1a2a"}`, borderRadius: 18, padding: 14, position: "relative", transition: "border 0.2s" }}>
            {p.popular && !search && <div style={{ position: "absolute", top: 9, right: 9, background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.25)", borderRadius: 7, padding: "2px 5px", fontSize: 9, color: "#E8A020", fontWeight: 700 }}>üî•</div>}
            <div style={{ fontSize: 32, marginBottom: 8 }}>{p.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2, lineHeight: 1.3, color: "rgba(255,255,255,0.88)" }}>{p.name}</div>
            <div style={{ fontSize: 10, color: "#3a3a4a", marginBottom: 6 }}>{p.size}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#E8A020" }}>R{p.price}</div>
            {cart[p.id] ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, background: "#16162a", borderRadius: 10, padding: "4px 10px" }}>
                <button onClick={() => rem(p.id)} style={{ background: "none", border: "none", color: "#E8A020", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>‚àí</button>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{cart[p.id]}</span>
                <button onClick={() => add(p.id)} style={{ background: "none", border: "none", color: "#E8A020", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>+</button>
              </div>
            ) : (
              <button onClick={() => add(p.id)} style={{ width: "100%", marginTop: 10, padding: "8px 0", background: "linear-gradient(135deg,#E8A020,#C8601A)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Ubuntu',sans-serif" }}>Add to order</button>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px 20px", color: "#333" }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>üîç</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>No results for "{search}"</div>
          <div style={{ fontSize: 11, marginTop: 4, color: "#222" }}>Try another brand or product name</div>
        </div>
      )}

      <div style={{ height: 110 }} />
      {count > 0 && (
        <div onClick={() => setScreen("cart")} style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 40px)", maxWidth: 380, background: "linear-gradient(135deg,#E8A020,#C8601A)", borderRadius: 16, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", boxShadow: "0 8px 32px rgba(232,160,32,0.3)", zIndex: 100 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>View Order ({count} items)</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>R{subtotal} + delivery</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>Checkout ‚Üí</div>
        </div>
      )}
    </div>
  );

  if (screen === "cart") return (
    <div style={app}>
      <style>{css}</style>
      <div style={scr}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Ubuntu',sans-serif" }}>‚Üê Back</button>
          <Wordmark size="sm" />
        </div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, marginBottom: 20 }}>Your Order üõí</div>
        {Object.entries(cart).map(([id, qty]) => {
          const p = CATALOGUE.find(p => p.id === +id);
          return (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #141424" }}>
              <span style={{ fontSize: 26 }}>{p.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#444", marginTop: 1 }}>{p.size} √ó {qty}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#E8A020" }}>R{p.price * qty}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => rem(p.id)} style={{ background: "#16162a", border: "none", color: "#E8A020", width: 26, height: 26, borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>‚àí</button>
                  <button onClick={() => add(p.id)} style={{ background: "#16162a", border: "none", color: "#E8A020", width: 26, height: 26, borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>+</button>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>üìç Delivery Zone</div>
          {ZONES.map(z => (
            <div key={z.name} onClick={() => setZone(z)} style={{ padding: 14, background: zone?.name === z.name ? "#141408" : "#0e0e1a", border: `1px solid ${zone?.name === z.name ? "#E8A020" : "#1a1a2a"}`, borderRadius: 14, cursor: "pointer", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{z.name} ‚Äî R{z.fee}</div>
                  <div style={{ fontSize: 12, color: "#555", marginTop: 3 }}>{z.areas}</div>
                  <div style={{ fontSize: 11, color: "#2a2a3a", marginTop: 2 }}>{z.km} from CBD</div>
                </div>
                {zone?.name === z.name && <span style={{ color: "#E8A020", fontSize: 20 }}>‚úì</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 4 }}>
          {[["Subtotal", `R${subtotal}`], ["Delivery", `R${zone?.fee || 50}`]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14, color: "#444" }}><span>{l}</span><span>{v}</span></div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 18, fontWeight: 800, borderTop: "1px solid #141424", marginTop: 4 }}><span>Total</span><span style={{ color: "#E8A020" }}>R{total}</span></div>
        </div>
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>üìç Address</div>
          <input style={inp} placeholder="Enter your delivery address..." value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>üí≥ Payment</div>
          {[{ id: "snapscan", label: "SnapScan", icon: "üì±" }, { id: "payfast", label: "PayFast (Card)", icon: "üí≥" }].map(m => (
            <div key={m.id} onClick={() => setPay(m.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: pay === m.id ? "#0a160a" : "#0e0e1a", border: `1px solid ${pay === m.id ? "#4ade80" : "#1a1a2a"}`, borderRadius: 12, cursor: "pointer", marginTop: 8 }}>
              <span style={{ fontSize: 22 }}>{m.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{m.label}</span>
              {pay === m.id && <span style={{ marginLeft: "auto", color: "#4ade80" }}>‚úì</span>}
            </div>
          ))}
        </div>
        <div style={{ ...alertBox("#60a5fa"), marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", marginBottom: 3 }}>üîí Photo-Verified Delivery</div>
          <div style={{ fontSize: 11, color: "#444" }}>Photos auto-deleted when you confirm receipt.</div>
        </div>
        <button style={btn()} onClick={() => { setScreen("tracking"); setStage(1); }}>Place Order üöÄ</button>
      </div>
    </div>
  );

  if (screen === "tracking") return (
    <div style={app}>
      <style>{css}</style>
      <div style={scr}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><Wordmark size="md" /></div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[["customer", "üë§ Customer"], ["driver", "üõµ Driver"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px 0", background: tab === t ? "linear-gradient(135deg,#E8A020,#C8601A)" : "#0e0e1a", border: tab === t ? "none" : "1px solid #1a1a2a", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Ubuntu',sans-serif" }}>{l}</button>
          ))}
        </div>
        {tab === "customer" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 60, animation: stage >= 2 ? "bounce 2s infinite" : "none", marginBottom: 12 }}>{stage === 4 ? "üéâ" : stage >= 2 ? "üõµ" : "üì¶"}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900 }}>{stage === 4 ? "Delivered! üç∫" : stage === 3 ? "Driver at your door!" : stage === 2 ? "On the way! üõµ" : "Order Confirmed!"}</div>
              <div style={{ fontSize: 13, color: "#444", marginTop: 6 }}>Est. ~25 mins ¬∑ Lucky Star CBD</div>
            </div>
            {[{label:"Order received & paid",icon:"‚úÖ",s:1},{label:"Store packed ‚Äî photo taken üì∏",icon:"üì¶",s:1},{label:"Driver collected ‚Äî photo taken üì∏",icon:"üõµ",s:2},{label:"Driver at your door ‚Äî photo taken üì∏",icon:"üìç",s:3},{label:"Confirmed by you ‚úÖ",icon:"üéâ",s:4}].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: stage > step.s ? "#0a140a" : stage === step.s ? "#14140a" : "#0e0e1a", border: `1px solid ${stage > step.s ? "#4ade8022" : stage === step.s ? "#E8A02033" : "#141424"}`, borderRadius: 12, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: stage > step.s ? "#4ade80" : stage === step.s ? "#E8A020" : "#1e1e2e", flexShrink: 0, boxShadow: stage === step.s ? "0 0 8px #E8A02066" : "none" }} />
                <span style={{ fontSize: 16 }}>{step.icon}</span>
                <span style={{ fontSize: 13, fontWeight: stage >= step.s ? 600 : 400, color: stage >= step.s ? "#fff" : "#333" }}>{step.label}</span>
              </div>
            ))}
            {stage >= 2 && stage < 4 && (
              <div style={{ ...alertBox("#E8A020"), marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#E8A020", marginBottom: 8 }}>üì∏ Photos on Record</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[{ l: "Pickup", d: pickup }, { l: "Delivery", d: delivery }].map(ph => (
                    <div key={ph.l} style={{ flex: 1, background: ph.d ? "#0a140a" : "#0e0e1a", border: `1px solid ${ph.d ? "#4ade8033" : "#1a1a2a"}`, borderRadius: 10, padding: 10, textAlign: "center", fontSize: 12, color: ph.d ? "#4ade80" : "#333" }}>{ph.d ? "‚úÖ " : "‚è≥ "}{ph.l} photo</div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#333", marginTop: 8 }}>Auto-deleted on your confirmation</div>
              </div>
            )}
            {stage === 3 && !problem && (
              <>
                <button style={btn("#22c55e")} onClick={() => { setPickup(false); setDelivery(false); setStage(4); }}>‚úÖ Received & All Good ‚Äî Delete Photos</button>
                <button onClick={() => setProblem(true)} style={{ width: "100%", padding: 14, background: "transparent", border: "1px solid #ef4444", borderRadius: 14, color: "#ef4444", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 8, fontFamily: "'Ubuntu',sans-serif" }}>‚ö†Ô∏è Report a Problem</button>
              </>
            )}
            {problem && <div style={{ ...alertBox("#ef4444"), marginTop: 12 }}><div style={{ fontSize: 13, color: "#ef4444", fontWeight: 700 }}>‚ö†Ô∏è Photos kept. Management contacts you within 30 mins.</div></div>}
            {stage === 4 && (
              <>
                <div style={{ ...alertBox("#22c55e"), textAlign: "center", marginTop: 12 }}><div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>üóëÔ∏è Photos Deleted ¬∑ Enjoy! üç∫</div></div>
                <button style={btn()} onClick={() => { setScreen("home"); setCart({}); setStage(0); setPickup(false); setDelivery(false); setProblem(false); setZone(null); }}>Order Again üç∫</button>
              </>
            )}
            {stage < 3 && (
              <div style={{ marginTop: 16, padding: 14, background: "#080810", border: "1px solid #111120", borderRadius: 14 }}>
                <div style={{ fontSize: 10, color: "#222", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Demo Controls</div>
                {stage === 1 && <button style={{ ...btn("#6366f1"), marginTop: 0 }} onClick={() => { setPickup(true); setStage(2); }}>Simulate: Driver Collected üì∏</button>}
                {stage === 2 && <button style={{ ...btn("#8b5cf6"), marginTop: 0 }} onClick={() => { setDelivery(true); setStage(3); }}>Simulate: Driver Arrived üì∏</button>}
              </div>
            )}
          </>
        )}
        {tab === "driver" && (
          <>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Driver Dashboard üõµ</div>
            <div style={{ fontSize: 12, color: "#333", marginBottom: 20 }}>Standford Elizabeth Group t/a Umgodi</div>
            <div style={{ background: "#0e0e1a", border: "1px solid rgba(232,160,32,0.15)", borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#E8A020", marginBottom: 10 }}>üì¶ Active Order #UM2847</div>
              {[["üè™ Pickup","Lucky Star Chinese Shop, CBD"],["üìç Deliver to","14 Sonheuwel Ave, Nelspruit"],["üó∫Ô∏è Zone","Zone 1 ¬∑ ~3.2km ¬∑ Earn R35"]].map(([l,v]) => (
                <div key={l} style={{ fontSize: 13, color: "#555", marginBottom: 6 }}><span style={{ color: "#777" }}>{l}:</span> {v}</div>
              ))}
              <div style={{ fontSize: 13, fontWeight: 700, margin: "14px 0 10px" }}>üì∏ Required Photos</div>
              {[{label:"Pickup Photo",sub:"Photo of packed order at store",done:pickup,action:()=>{setPickup(true);setStage(2);},canTap:!pickup},{label:"Delivery Photo",sub:pickup?"Photo at customer door":"Complete pickup first",done:delivery,action:()=>{setDelivery(true);setStage(3);},canTap:pickup&&!delivery}].map((ph,i)=>(
                <div key={i} onClick={ph.canTap?ph.action:undefined} style={{ background: ph.done?"#0a140a":"#080810", border:`2px dashed ${ph.done?"#4ade8066":"#1a1a2a"}`, borderRadius:14, padding:18, textAlign:"center", marginBottom:12, cursor:ph.canTap?"pointer":"default" }}>
                  {ph.done?<><div style={{fontSize:28,marginBottom:4}}>‚úÖ</div><div style={{fontSize:13,color:"#4ade80",fontWeight:700}}>{ph.label} Captured</div></>:<><div style={{fontSize:28,marginBottom:4}}>üì∑</div><div style={{fontSize:13,color:ph.canTap?"#666":"#2a2a3a",fontWeight:600}}>Tap ‚Äî {ph.label}</div><div style={{fontSize:11,color:"#2a2a3a"}}>{ph.sub}</div></>}
                </div>
              ))}
              {stage===4&&<div style={{...alertBox("#22c55e")}}><div style={{fontSize:13,color:"#22c55e",fontWeight:700}}>‚úÖ Confirmed! R35 added to your earnings.</div></div>}
            </div>
            <div style={{ background: "#0e0e1a", border: "1px solid #141424", borderRadius: 16, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#444", marginBottom: 12 }}>üí∞ Tonight's Earnings</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[{l:"Deliveries",v:"7"},{l:"Earned",v:"R280"},{l:"Avg/drop",v:"R40"}].map(s=>(
                  <div key={s.l} style={{ flex:1, background:"#080810", borderRadius:12, padding:"12px 8px", textAlign:"center" }}>
                    <div style={{fontSize:20,fontWeight:800,color:"#E8A020"}}>{s.v}</div>
                    <div style={{fontSize:11,color:"#333",marginTop:2}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

