import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don’s Org Map — The people behind the bots",
  description: "Meet Dhivagar’s Grok Bot team. One Chief of Staff, six desks, and a cast built to get things done.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
