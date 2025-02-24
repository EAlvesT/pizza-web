"use client"

import { Button } from '@/app/dashboard/components/button';
import { UploadCloud } from 'lucide-react'
import Image from 'next/image';
import { ChangeEvent } from 'react'
import { useState } from 'react'
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient'
import { toast } from 'sonner';

interface CategoryProps{
    id: string;
    name: string;
}

interface Props{
    categories: CategoryProps[];
}

export function Form({ categories }: Props){
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");
    
    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                toast.warning("Formato não permitido.")
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image))
        }
    }

    async function handleregisterProduct(formData: FormData){
        const categoryIndex = formData.get("category");
        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");

        if(!name || !categoryIndex || !price || !description || !image){
            toast.warning("Preencha todos os campos corretamente.")
            return;
        }

        const data = new FormData();

        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image)

        const token = await getCookieClient();

        await api.post("/product", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            toast.success("Produto cadastrado com sucesso!")
            setPreviewImage("")
        })
        .catch((err) => {
            toast.error("Erro ao cadastrar produto!")
            console.log(err)
            return;
        })

    }

    return(
        <main className="max-w-[720px] my-12 mx-auto px-4 flex flex-col">
            <h1 className="text-[var(--white)] text-2xl font-bold">Novo produto</h1>

            <form className="flex flex-col my-4 gap-4" action={handleregisterProduct}>
                <label className='w-full h-72 relative bg-[var(--dark-900)] rounded-lg flex items-center justify-center cursor-pointer flex-col mb-4 border border-[var(--gray-100)]'>
                    <span className='z-10 opacity-80 hover:scale-125 hover:opacity-100 duration-300'>
                        <UploadCloud size={30} color='#fff'/>
                    </span>
                    <input
                        type='file'
                        accept='image/png, image/jpeg'
                        required
                        onChange={handleFile}
                        className='hidden'
                    />

                    {previewImage && (
                        <Image
                            alt='Imagem de preview'
                            src={previewImage}
                            className='w-full h-full rounded-lg object-cover'
                            fill
                            quality={100}
                            priority
                        />
                    )}
                </label>

                <select
                    name='category'
                    className='w-full h-[var(--alturaInputeBotao)] rounded-lg bg-[var(--dark-900)] text-[var(--white)] px-2 border border-[var(--gray-100)]'
                    defaultValue=""
                >
                    <option value="">------</option>
                    {categories.map( (category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                    type='text'
                    name='name'
                    placeholder='Digite o nome do produto...'
                    required
                    className='h-[var(--alturaInputeBotao)] bg-[var(--dark-900)] border border-[var(--gray-100)] rounded-lg px-2 text-[var(--white)]'
                />

                <input
                    type='text'
                    name='price'
                    placeholder='Preço do produto...'
                    required
                    className='h-[var(--alturaInputeBotao)] bg-[var(--dark-900)] border border-[var(--gray-100)] rounded-lg px-2 text-[var(--white)]'
                />

                <textarea
                    className='bg-[var(--dark-900)] border border-[var(--gray-100)] w-full min-h-24 resize-none rounded-lg p-2 text-[var(--white)]'
                    placeholder='Digite a descrição do produto...'
                    name='description'
                ></textarea>

                <Button name='Cadastrar produto'/>
            </form>
        </main>
    )
}