import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AtomLearn AI | The Future of Adaptive Learning",
  description: "Stop following static paths. Experience personalized education powered by real-time adaptive AI intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased selection:bg-blue-500/30`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
