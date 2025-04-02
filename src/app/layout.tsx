import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/container";
import { ClerkProvider } from "@clerk/nextjs";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Nick's Blog",
  description: "Thoughts on building and learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${gabarito.variable} antialiased min-h-screen`}>
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>
        </body>
      </html>
    </ClerkProvider>
  );
}
