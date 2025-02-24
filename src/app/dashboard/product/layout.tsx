import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sujeito Pizza - Novo Produto",
    description: "Criando novo produto para o cardápio"
}

export default function ProductLayout({ children }: { children: React.ReactNode }){
    return(
        <>
            {children}
        </>
    )
}