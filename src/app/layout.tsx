import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={"bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]"}
      >
        <div className="fixed w-max h-[40%]">
          <Sidebar />
        </div>
        {children}
      </body>
    </html>
  );
}
