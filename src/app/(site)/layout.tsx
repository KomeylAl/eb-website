import Navbar from "@/components/layout/Navbar";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import PageTransitionProvider from "@/components/common/providers/PageTransitionProvider";
import Providers from "../(dashboard)/admin/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100/50">
      <div className="w-full fixed top-0 right-0 z-20">
        <Navbar />
      </div>
      <PageTransitionProvider>
        <Providers>
          {children}
        </Providers>
      </PageTransitionProvider>
      <Footer />
    </div>
  );
}
