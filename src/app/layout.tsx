import { Providers } from "@/store/provider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body className="">
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
