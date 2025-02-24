"use client"

import { useFormStatus } from "react-dom";

interface Props{
    name: string;
}

export function Button({ name }: Props){
    const { pending } = useFormStatus();

    return(
        <button
            type="submit"
            disabled={pending}
            className="h-[var(--alturaInputeBotao)] rounded-lg bg-[var(--green-900)] font-bold text-lg text-[var(--white)]"
        >
            {pending ? "Carregando..." : name}
        </button>
    )
}