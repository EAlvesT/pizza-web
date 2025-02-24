"use client"

import Link from "next/link";
import Image from "next/image";
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const logoImg = '/logo.svg';

export function Header(){
    const router = useRouter();

    async function handleLogout(){
        deleteCookie("session", { path: "/" })
        toast.success("Logout feito com sucesso.")
        
        router.replace("/")
    }

    return(
        <header className="h-[5rem]">
            <div className="max-w-7xl h-[5rem] mx-auto px-4 flex items-center justify-between">
                <Link href="/dashboard">
                    <Image
                        alt="Logo Sujeito Pizza"
                        src={logoImg}
                        className="w-auto h-auto"
                        width={190}
                        height={60}
                        priority
                        quality={100}
                    />
                </Link>

                <nav className="flex items-center gap-4">
                    <Link href="/dashboard/category" className="text-[var(--white)] hover:text-[var(--red-900)] duration-300">
                        Categoria
                    </Link>
                    <Link href="/dashboard/product" className="text-[var(--white)] hover:text-[var(--red-900)] duration-300">
                        Produto
                    </Link>

                    <form action={handleLogout}>
                        <button type="submit" className="ml-4 hover:scale-125 duration-300">
                            <LogOutIcon size={24} color="#FFF"/>
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}