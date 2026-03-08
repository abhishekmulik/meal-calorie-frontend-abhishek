"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider, ThemeProviderProps } from "next-themes"
import { ReactNode } from "react"

const queryClient = new QueryClient()


const ThemeAppProvider = ({ children, ...props }: ThemeProviderProps) => <ThemeProvider {...props}>{children}</ThemeProvider>



export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeAppProvider attribute="class" defaultTheme="light">
                {children}
            </ThemeAppProvider>
        </QueryClientProvider>
    )
}