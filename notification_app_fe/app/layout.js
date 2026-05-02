import "./globals.css";

export const metadata = {
  title: "Campus Notifications",
  description: "Campus Notifications App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
