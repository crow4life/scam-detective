import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scam Detective | See the signs. Stay one step ahead.",
  description: "Understand suspicious messages, profiles, websites, and online offers with clear, practical guidance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
