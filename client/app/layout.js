import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata = {
  title: "Idea's Bangladesh",
  description: "Empowering Bangladesh through innovation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Nunito font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-nunito antialiased bg-white">
        <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
