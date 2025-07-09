import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/Header";
import { useUserStore } from "./store/user";


import axios from "../lib/axios"
import { profileUrls } from "../lib/Constants/BackendURLS"
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: "TickTask",
  description: "A Todo app for organising your day",
};

const fetchPrfileData = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    let responseData = await axios.get(profileUrls.viewProfile, { headers: { "Cookie": `token=${token}` } })
    return responseData.data.data
  }
  catch (ex) {
    if (ex instanceof Error) {

      console.log(ex.message)
    }
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  let data = await fetchPrfileData()

  console.log(data)
  return (
    <html lang="en" suppressHydrationWarning>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header userData={data} />
          {children}
          <Toaster richColors expand={true} />
        </ThemeProvider>

      </body>
    </html>
  );
}
