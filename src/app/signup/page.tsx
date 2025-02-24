import Image from "next/image";
import logoImg from '../../../public/logo.svg';
import Link from "next/link";
import { api } from "@/services/api"
import { redirect } from "next/navigation"
import { toast } from "sonner";

export default function Signup(){
    async function handleRegister(formData: FormData){
        "use server"

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        if(name === "" || email === "" || password === ""){
            console.log("Preencha todos os campos")
            return;
        }

        try{
            await api.post("/users", {
                name,
                email,
                password
            })
            .then(() => {
                toast.success("Usuário cadastrado com sucesso!")
            })

        }catch(err){
            console.log("Erro");
            console.log(err);
            return;
        }

        redirect("/");
    }

    return(
        <>
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <Image
                    src={logoImg}
                    alt='Logo da pizzaria'
                />

                <section className='mt-6 flex flex-col items-center justify-center gap-4 w-[600px] max-[620px]:w-11/12'>
                    <h1 className="text-[var(--white)] font-bold text-xl">Criando sua conta</h1>
                    <form className='text-[var(--white)] pb-4 text-lg flex flex-col w-11/12 gap-4' action={handleRegister}>
                        <input
                            type='text'
                            required
                            name='name'
                            placeholder='Digite seu nome...'
                            className='h-[var(--alturaInputeBotao)] py-0 px-4 rounded-lg border border-[var(--gray-100)] bg-[var(--dark-900)] text-[var(--white)] placeholder:text-[rgba(255,255,255,0.700)]'
                        />

                        <input
                            type='email'
                            required
                            name='email'
                            placeholder='Digite seu email...'
                            className='h-[var(--alturaInputeBotao)] py-0 px-4 rounded-lg border border-[var(--gray-100)] bg-[var(--dark-900)] text-[var(--white)] placeholder:text-[rgba(255,255,255,0.700)]'
                        />

                        <input
                            type='password'
                            required
                            name='password'
                            placeholder='**********'
                            className='h-[var(--alturaInputeBotao)] py-0 px-4 rounded-lg border border-[var(--gray-100)] bg-[var(--dark-900)] text-[var(--white)] placeholder:text-[rgba(255,255,255,0.700)]'
                        />

                        <button type='submit' className='h-[var(--alturaInputeBotao)] text-[16px] bg-[var(--red-900)] rounded-lg text-[var(--white)] font-bold flex items-center justify-center hover:scale-[1.05] duration-300'>
                            Cadastrar
                        </button>
                    </form>

                    <Link href="/" className='text-[var(--white)]'>
                        Já possui uma conta? Faça login...
                    </Link>
                </section>
            </div>
        </>
    )
}