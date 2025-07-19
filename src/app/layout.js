import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventify",
  description: "Find the best events world wide",
  icons: { icon: "/favicon.ico" },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-gray-400 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </body>
    </html>
  );
}
