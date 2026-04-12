import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Açaiteria & Sorveteria Premium",
  description: "Peça agora e receba em casa. O melhor açaí e gelatos artesanais da região com entrega rápida.",
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
