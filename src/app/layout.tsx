import "./globals.css";
import InfoBar from "./UIcomponents/Infobar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <InfoBar />
        <main className="relative z-0">{children}</main>
      </body>
    </html>
  );
}
