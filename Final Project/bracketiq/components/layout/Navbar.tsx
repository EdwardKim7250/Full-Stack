"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href:"/", label:"Dashboard" },
  { href:"/simulator", label:"Simulator" },
  { href:"/bracket", label:"Bracket" },
  { href:"/news", label:"News" },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <nav style={{ background:"#fff", borderBottom:"0.5px solid #e5e7eb", padding:"0 24px", height:48, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50 }}>
      <Link href="/" style={{ fontSize:15, fontWeight:500, textDecoration:"none", color:"#111827" }}>
        Bracket<span style={{ color:"#f97316" }}>IQ</span>
      </Link>
      <div style={{ display:"flex", gap:20 }}>
        {LINKS.map(l => (
          <Link key={l.href} href={l.href}
            style={{ fontSize:13, textDecoration:"none", color: path===l.href?"#111827":"#6b7280",
              borderBottom: path===l.href?"2px solid #f97316":"2px solid transparent", paddingBottom:2 }}>
            {l.label}
          </Link>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:"#dc2626", color:"#fff", fontSize:11, fontWeight:500, padding:"3px 8px", borderRadius:20 }}>
        <span style={{ width:5, height:5, borderRadius:"50%", background:"#fff", animation:"pulse 1.2s infinite" }} />
        Live
      </div>
    </nav>
  );
}
