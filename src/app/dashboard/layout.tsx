import { Header } from "./components/header";
import { OrderProvider } from '@/providers/order'

export default function DashboardLayout({ children }: { children: React.ReactNode }){
    return(
        <>
            <OrderProvider>
                <Header/>
                {children}
            </OrderProvider>
        </>
    )
}