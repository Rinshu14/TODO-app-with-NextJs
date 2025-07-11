import ProtectedClient from "@/components/ProtectedClient";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        
        <ProtectedClient>
            {children}
        </ProtectedClient>
    );
}
