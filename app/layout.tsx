import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "@/utils/theme";
import { Poppins } from "@/utils/font";
import { ReduxProvider } from "@/redux/ReduxProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "IAIRE Board",
  description: "Intelligence Redefined",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={Poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

