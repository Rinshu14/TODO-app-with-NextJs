import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { fetchProfileData, fetchTaskData } from "../lib/dataFetch"
import RootlayoutClient from "../components/RootlayoutClient";



export const metadata: Metadata = {
  title: "TickTask",
  description: "A Todo app for organising your day",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let userData = await fetchProfileData()
  let taskData = await fetchTaskData()


//  console.log(userData,taskData)
  return (
    <html lang="en" suppressHydrationWarning>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootlayoutClient userData={userData} taskData={taskData}>
            {children}
          </RootlayoutClient>


          <Toaster richColors expand={true} />
        </ThemeProvider >
      </body>
    </html >
  );
}







