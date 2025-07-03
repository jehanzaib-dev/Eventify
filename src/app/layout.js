import "@/styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import {ToastContainer} from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Eventify",
  description: "Find the best events world wide",
  icons:{
    icon:"/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="layout">
        <Navbar />
        {children}
        <ToastContainer position="top-center" autoClose={3000}/>
        <Footer />
        </div>
      </body>
    </html>
  );
}