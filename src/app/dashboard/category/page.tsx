import { Button } from "../components/button";
import { api } from "@/services/api";
import { getCoookieServer } from '@/lib/cookieServer';
import { redirect } from "next/navigation";

export default function Category(){
    async function handleRegisterCategory(formData: FormData){
        "use server"
        const name = formData.get("name");
        
        if(name === "") return;

        const data = {
            name: name,
        }

        const token = await getCoookieServer();

        await api.post("/category", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            redirect("/dashboard");
        })
        .catch((err) => {
            console.log(err)
            return;
        })
    }

    return(
        <main className="max-w-[720px] my-5 mx-auto flex flex-col">
            <h1 className="text-[var(--white)] text-2xl font-bold">Nova categoria</h1>

            <form
                className="flex flex-col my-4 gap-4"
                action={handleRegisterCategory}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Nome da categoria, ex: Pizzas"
                    required
                    className="h-10 bg-[var(--dark-900)] rounded-lg px-4 text-[var(--white)] border-[1px] border-[var(--gray-100)]"
                />

                <Button name="Cadastrar"/>
            </form>
        </main>
    )
}