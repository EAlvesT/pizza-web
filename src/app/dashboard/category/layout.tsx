import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sujeito Pizza - Nova Categoria",
    description: "Criando nova categoria de produto"
}

export default function CategoryLayout({ children }: { children: React.ReactNode }){
    return(
        <>
            {children}
        </>
    )
}