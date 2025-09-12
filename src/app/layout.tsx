import "./globals.css";

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
       
        {children}
      </body>
    </html>
  );
}
