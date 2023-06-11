import { Nunito } from "next/font/google";

import "./global.css";

export const metadata = {
  title: "Danabus",
  description: "Danabus clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
