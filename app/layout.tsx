import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Açai & Cia",
  description: "Peça agora e receba em casa. O melhor açaí e sorvete da região com entrega rápida!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
