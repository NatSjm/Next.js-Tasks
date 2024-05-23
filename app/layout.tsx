import {GeistSans} from "geist/font/sans";
import "./globals.css";

export const metadata = {
    title: "Next tasks",
    description: "Tasks for next steps in the project",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
        <body>
        <main className="container">
            {children}
        </main>
        </body>
        </html>
    );
}

