"use client";
import { useState } from "react";

const ARTICLES = [
  { id:1, cat:"injury", bar:"#dc2626", tag:"Injury", tagStyle:{background:"#fef2f2",color:"#991b1b"}, time:"1 hr ago",
    title:"Anthony Edwards listed as day-to-day with knee hyperextension",
    desc:"Minnesota's star guard was hurt late in Game 2. His status significantly impacts the Timberwolves' odds against Denver.",
    teams:[{name:"Minnesota Timberwolves",color:"#005083"}], impact:"Championship odds ▼ 3.1%", up:false },
  { id:2, cat:"injury", bar:"#dc2626", tag:"Injury", tagStyle:{background:"#fef2f2",color:"#991b1b"}, time:"3 hrs ago",
    title:"Nikola Jokic listed as questionable for Game 2 with knee soreness",
    desc:"The Nuggets star sat out practice Thursday. Denver's medical staff remains cautious heading into a pivotal game.",
    teams:[{name:"Denver Nuggets",color:"#0E2240"}], impact:"Championship odds ▼ 2.8%", up:false },
  { id:3, cat:"recap", bar:"#3b82f6", tag:"Game Recap", tagStyle:{background:"#eff6ff",color:"#1d4ed8"}, time:"5 hrs ago",
    title:"Wembanyama drops 38 pts as Spurs take Game 1 over Rockets 114–98",
    desc:"Victor Wembanyama was dominant in his playoff debut — 38 points, 12 rebounds, 6 blocks.",
    teams:[{name:"San Antonio Spurs",color:"#aaa"},{name:"Houston Rockets",color:"#CE1141"}], impact:"Spurs odds ▲ 2.2%", up:true },
  { id:4, cat:"odds", bar:"#16a34a", tag:"Odds Shift", tagStyle:{background:"#f0fdf4",color:"#166534"}, time:"Yesterday",
    title:"Kevin Durant ruled out for Game 5 vs. Lakers",
    desc:"Houston confirmed Durant will miss the remainder of the series with a calf strain.",
    teams:[{name:"Houston Rockets",color:"#CE1141"}], impact:"Championship odds ▼ 1.4%", up:false },
  { id:5, cat:"recap", bar:"#3b82f6", tag:"Game Recap", tagStyle:{background:"#eff6ff",color:"#1d4ed8"}, time:"Yesterday",
    title:"OKC Thunder rout Clippers 121–99 in dominant Game 1",
    desc:"Shai Gilgeous-Alexander posted 34 points and 9 assists as OKC made an emphatic playoff statement.",
    teams:[{name:"OKC Thunder",color:"#007AC1"},{name:"LA Clippers",color:"#C8102E"}], impact:"Thunder odds ▲ 1.1%", up:true },
  { id:6, cat:"general", bar:"#9ca3af", tag:"General", tagStyle:{background:"#f3f4f6",color:"#6b7280"}, time:"2 days ago",
    title:"Celtics–Magic series shaping up as closest first-round matchup",
    desc:"Advanced metrics give Orlando a 30% chance of the upset — the highest of any 7-seed this year.",
    teams:[{name:"Boston Celtics",color:"#007A33"},{name:"Orlando Magic",color:"#0077C0"}], impact:null, up:false },
];

const INJURIES = [
  {name:"Anthony Edwards",team:"Timberwolves",color:"#005083",detail:"Knee hyperextension",status:"Day-to-Day",sc:{background:"#fff7ed",color:"#c2410c"}},
  {name:"Nikola Jokic",team:"Nuggets",color:"#0E2240",detail:"Knee soreness",status:"Questionable",sc:{background:"#fff7ed",color:"#c2410c"}},
  {name:"Kawhi Leonard",team:"Clippers",color:"#C8102E",detail:"Load management",status:"Out",sc:{background:"#fef2f2",color:"#dc2626"}},
  {name:"Joel Embiid",team:"76ers",color:"#006BB6",detail:"Knee",status:"Probable",sc:{background:"#f0fdf4",color:"#16a34a"}},
  {name:"Anthony Davis",team:"Lakers",color:"#552583",detail:"Back tightness",status:"Questionable",sc:{background:"#fff7ed",color:"#c2410c"}},
  {name:"Scottie Barnes",team:"Raptors",color:"#CE1141",detail:"Ankle sprain",status:"Questionable",sc:{background:"#fff7ed",color:"#c2410c"}},
];

const ODDS = [
  {name:"OKC Thunder",color:"#007AC1",pct:22.1,bar:100,delta:"+1.6",up:true},
  {name:"SA Spurs",color:"#aaa",pct:18.3,bar:83,delta:"+2.2",up:true},
  {name:"Detroit Pistons",color:"#C8102E",pct:16.6,bar:75,delta:"+0.9",up:true},
  {name:"Boston Celtics",color:"#007A33",pct:14.4,bar:65,delta:"—",up:null},
  {name:"Denver Nuggets",color:"#0E2240",pct:10.5,bar:48,delta:"▼3.1",up:false},
  {name:"LA Lakers",color:"#552583",pct:7.7,bar:35,delta:"—",up:null},
];

const CAT: Record<string,string> = {Injuries:"injury",Recaps:"recap","Odds Shifts":"odds",General:"general"};
const card = { background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:12, overflow:"hidden" as const };

export default function News() {
  const [filter, setFilter] = useState("All");
  const articles = filter==="All" ? ARTICLES : ARTICLES.filter(a=>a.cat===CAT[filter]);

  return (
    <div style={{ padding:"20px 24px", background:"#f9fafb", minHeight:"100vh" }}>
      <div style={{ fontSize:20, fontWeight:500, marginBottom:3 }}>News & Updates</div>
      <div style={{ fontSize:12, color:"#6b7280", marginBottom:18 }}>Injuries, game recaps, and odds shifts — all in one place</div>

      <div style={{ display:"flex", gap:7, marginBottom:18, flexWrap:"wrap" as const }}>
        {["All","Injuries","Recaps","Odds Shifts","General"].map(f => (
          <button key={f} onClick={()=>setFilter(f)}
            style={{ fontSize:12, padding:"4px 12px", borderRadius:20, cursor:"pointer",
              border: filter===f ? "none" : "0.5px solid #d1d5db",
              background: filter===f ? "#f97316" : "#fff",
              color: filter===f ? "#fff" : "#6b7280" }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:16 }}>
        <div>
          {articles.map(a => (
            <div key={a.id} style={{ ...card, display:"flex", gap:12, padding:14, marginBottom:10 }}>
              <div style={{ width:3, borderRadius:3, background:a.bar, flexShrink:0, alignSelf:"stretch" }} />
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, fontWeight:500, ...a.tagStyle }}>{a.tag}</span>
                  <span style={{ fontSize:11, color:"#9ca3af", marginLeft:"auto" }}>{a.time}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:500, lineHeight:1.4, marginBottom:4 }}>{a.title}</div>
                <div style={{ fontSize:12, color:"#6b7280", lineHeight:1.55, marginBottom:8 }}>{a.desc}</div>
                <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" as const }}>
                  {a.teams.map(t => (
                    <span key={t.name} style={{ display:"flex", alignItems:"center", gap:5, background:"#f3f4f6", padding:"2px 8px", borderRadius:20, fontSize:11, color:"#6b7280" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:t.color }} />{t.name}
                    </span>
                  ))}
                  {a.impact && <span style={{ fontSize:11, marginLeft:"auto", color:a.up?"#16a34a":"#dc2626" }}>{a.impact}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={card}>
            <div style={{ padding:"11px 14px", borderBottom:"0.5px solid #e5e7eb", fontSize:13, fontWeight:500 }}>Injury Report</div>
            {INJURIES.map(inj => (
              <div key={inj.name} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 14px", borderBottom:"0.5px solid #f3f4f6", fontSize:12 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:inj.color, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:500 }}>{inj.name}</div>
                  <div style={{ fontSize:11, color:"#6b7280" }}>{inj.team} · {inj.detail}</div>
                </div>
                <span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, ...inj.sc }}>{inj.status}</span>
              </div>
            ))}
          </div>

          <div style={card}>
            <div style={{ padding:"11px 14px", borderBottom:"0.5px solid #e5e7eb", fontSize:13, fontWeight:500 }}>Live Championship Odds</div>
            {ODDS.map(o => (
              <div key={o.name} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px", borderBottom:"0.5px solid #f3f4f6", fontSize:12 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:o.color, flexShrink:0 }} />
                <span style={{ flex:1 }}>{o.name}</span>
                <div style={{ width:56, background:"#e5e7eb", borderRadius:3, height:3 }}>
                  <div style={{ width:`${o.bar}%`, height:3, borderRadius:3, background:"#f97316" }} />
                </div>
                <span style={{ fontSize:11, color:"#6b7280", width:34, textAlign:"right" }}>{o.pct}%</span>
                <span style={{ fontSize:10, width:30, textAlign:"right", color: o.up===true?"#16a34a":o.up===false?"#dc2626":"#9ca3af" }}>{o.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
