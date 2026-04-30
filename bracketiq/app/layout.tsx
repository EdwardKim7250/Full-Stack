import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "BracketIQ — NBA Playoff Tracker",
  description: "Live NBA playoff standings, odds predictions, and injury impact tracker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin:0, fontFamily:"system-ui, -apple-system, sans-serif", background:"#f9fafb" }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
