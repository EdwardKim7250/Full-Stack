"use client";

const EAST = [
  { seed:1, name:"Detroit Pistons", record:"60–22", pct:18.2, bar:83, color:"#C8102E", inj:false },
  { seed:2, name:"Boston Celtics", record:"56–26", pct:16.1, bar:73, color:"#007A33", inj:false },
  { seed:3, name:"New York Knicks", record:"53–29", pct:11.8, bar:54, color:"#006BB6", inj:false },
  { seed:4, name:"Cleveland Cavaliers", record:"52–30", pct:10.5, bar:48, color:"#860038", inj:false },
  { seed:5, name:"Toronto Raptors", record:"46–36", pct:5.9, bar:27, color:"#CE1141", inj:true },
  { seed:6, name:"Atlanta Hawks", record:"46–36", pct:5.3, bar:24, color:"#E03A3E", inj:false },
  { seed:7, name:"Philadelphia 76ers", record:"45–37", pct:4.4, bar:20, color:"#0077C0", inj:false },
  { seed:8, name:"Orlando Magic", record:"45–37", pct:3.8, bar:17, color:"#006BB6", inj:true },
];
const WEST = [
  { seed:1, name:"OKC Thunder", record:"64–18", pct:22.0, bar:100, color:"#007AC1", inj:false },
  { seed:2, name:"San Antonio Spurs", record:"62–20", pct:17.0, bar:77, color:"#aaa", inj:false },
  { seed:3, name:"Denver Nuggets", record:"54–28", pct:12.9, bar:59, color:"#0E2240", inj:true },
  { seed:4, name:"Los Angeles Lakers", record:"53–29", pct:11.1, bar:50, color:"#552583", inj:false },
  { seed:5, name:"Houston Rockets", record:"52–30", pct:8.8, bar:40, color:"#CE1141", inj:false },
  { seed:6, name:"Minnesota Timberwolves", record:"49–33", pct:6.5, bar:30, color:"#005083", inj:false },
  { seed:7, name:"Portland Trail Blazers", record:"42–40", pct:2.9, bar:13, color:"#E56020", inj:false },
  { seed:8, name:"Phoenix Suns", record:"45–37", pct:2.1, bar:10, color:"#C8102E", inj:true },
];
const NEWS = [
  { dot:"#f97316", text:"Nikola Jokic (Nuggets) questionable — knee soreness drops Denver odds by 3.1%", meta:"2 hours ago · Injury Report" },
  { dot:"#3b82f6", text:"Joel Embiid (76ers) probable for playoffs — Philadelphia odds improve to 3.8%", meta:"5 hours ago · Injury Report" },
  { dot:"#22c55e", text:"OKC Thunder clinch #1 seed in the West with win over Dallas", meta:"Yesterday · Clinched" },
  { dot:"#a855f7", text:"Wembanyama drops 38 pts in Spurs Game 1 win over Houston", meta:"Yesterday · Game Recap" },
];

function Row({ t }: { t: typeof EAST[0] }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px", borderBottom:"0.5px solid #e5e7eb", fontSize:12 }}>
      <span style={{ width:14, textAlign:"center", fontSize:10, color:"#9ca3af" }}>{t.seed}</span>
      <span style={{ width:8, height:8, borderRadius:"50%", background:t.color, flexShrink:0 }} />
      <span style={{ flex:1 }}>{t.name}</span>
      <span style={{ width:44, fontSize:11, color:"#6b7280" }}>{t.record}</span>
      <div style={{ width:70, background:"#e5e7eb", borderRadius:3, height:3 }}>
        <div style={{ width:`${t.bar}%`, height:3, borderRadius:3, background: t.bar > 70 ? "#f97316" : "#3b82f6" }} />
      </div>
      <span style={{ width:34, textAlign:"right", fontSize:11, color:"#6b7280" }}>{t.pct}%</span>
      {t.inj && <span style={{ fontSize:9, padding:"1px 5px", borderRadius:20, background:"#fee2e2", color:"#dc2626" }}>INJ</span>}
    </div>
  );
}

const card = { background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:12, overflow:"hidden" as const };
const panelHead = { display:"flex" as const, alignItems:"center" as const, justifyContent:"space-between" as const, padding:"11px 14px", borderBottom:"0.5px solid #e5e7eb" };

export default function Dashboard() {
  return (
    <div style={{ padding:"20px 24px", background:"#f9fafb", minHeight:"100vh" }}>
      <div style={{ fontSize:20, fontWeight:500, marginBottom:3 }}>NBA Playoff Tracker</div>
      <div style={{ fontSize:12, color:"#6b7280", marginBottom:18 }}>2025–26 Season · Updated April 27, 2026</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:18 }}>
        {[
          { label:"Current Round", val:"First Round", color:"#f97316", small:true },
          { label:"Series in Progress", val:"7", color:"#3b82f6" },
          { label:"Teams Remaining", val:"15", color:"#16a34a" },
          { label:"Key Injuries", val:"6", color:"#dc2626" },
        ].map(c => (
          <div key={c.label} style={{ background:"#f3f4f6", borderRadius:8, padding:"12px 14px" }}>
            <div style={{ fontSize:11, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:5 }}>{c.label}</div>
            <div style={{ fontSize:c.small?14:20, fontWeight:500, color:c.color, paddingTop:c.small?3:0 }}>{c.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <div style={card}>
          <div style={panelHead}>
            <span style={{ fontSize:13, fontWeight:500 }}>Eastern Conference</span>
            <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:"#eff6ff", color:"#2563eb", fontWeight:500 }}>East</span>
          </div>
          {EAST.map(t => <Row key={t.seed} t={t} />)}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={card}>
            <div style={panelHead}>
              <span style={{ fontSize:13, fontWeight:500 }}>Western Conference</span>
              <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:"#fff7ed", color:"#c2410c", fontWeight:500 }}>West</span>
            </div>
            {WEST.map(t => <Row key={t.seed} t={t} />)}
          </div>

          <div style={card}>
            <div style={panelHead}>
              <span style={{ fontSize:13, fontWeight:500 }}>Injury & News Feed</span>
              <span style={{ fontSize:11, color:"#9ca3af" }}>4 alerts</span>
            </div>
            {NEWS.map((n, i) => (
              <div key={i} style={{ display:"flex", gap:10, padding:"10px 14px", borderBottom:"0.5px solid #e5e7eb" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:n.dot, marginTop:5, flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:12, lineHeight:1.5 }}>{n.text}</div>
                  <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{n.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
