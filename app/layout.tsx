import type React from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import CustomCursor from "@/components/custom-cursor"; // 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADmyBRAND - Streamline Your Workflow",
  description: "Boost productivity, reduce costs, and scale your business with our all-in-one SaaS platform.",
  generator: "v0.dev",
  icons: {
    icon: "/logo.png", // Change to your actual logo filename if needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/*Custom cursor div */}
        <div className="cursor"></div>
        {/* Cursor logic */}
        <CustomCursor />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
