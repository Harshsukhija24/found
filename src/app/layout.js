import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Found",
  description: "created by Harshsukhija",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
