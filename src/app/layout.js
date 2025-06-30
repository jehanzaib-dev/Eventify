import "./globals.css";
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
      <body>
        <Navbar />
        <div className="container">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}