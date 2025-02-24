import Link from 'next/link';
import logoImg from '../../public/logo.svg';
import Image from 'next/image';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Page(){
  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get("email");
    const password = formData.get("password");

    if(email === "" || password === ""){
      return;
    }

    try{
      const response = await api.post("/session", {
        email,
        password
      })

      if(!response.data.token){
        return;
      }

      const expressTime = 60 * 60 * 24 * 30;
      const cookieStore = await cookies();
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    }catch(err){
      console.log(err)
      return;
    }

    redirect("/dashboard")
  }

  return(
    <>
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <Image
          src={logoImg}
          alt='Logo da pizzaria'
        />

        <section className='mt-6 flex flex-col items-center justify-center gap-4 w-[600px] max-[620px]:w-11/12'>
          <form className='text-[var(--white)] pb-4 text-lg flex flex-col w-11/12 gap-4' action={handleLogin}>
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
              placeholder='Digite sua senha...'
              className='h-[var(--alturaInputeBotao)] py-0 px-4 rounded-lg border border-[var(--gray-100)] bg-[var(--dark-900)] text-[var(--white)] placeholder:text-[rgba(255,255,255,0.700)]'
            />

            <button type='submit' className='h-[var(--alturaInputeBotao)] text-[16px] bg-[var(--red-900)] rounded-lg text-[var(--white)] font-bold flex items-center justify-center hover:scale-[1.05] duration-300'>
              Acessar
            </button>
          </form>

          <Link href="/signup" className='text-[var(--white)]'>
            Não tem uma conta? Cadastre-se...
          </Link>
        </section>
      </div>
    </>
  )
}