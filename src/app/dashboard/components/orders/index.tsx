"use client"

import { use } from 'react'
import { RefreshCcw } from 'lucide-react';
import { OrderProps } from "@/lib/order.type";
import { ModalOrder } from '../modal';
import { OrderContext } from '@/providers/order'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props{
    orders: OrderProps[];
}

export function Orders({ orders }: Props){
    const { onRequestOpen, isOpen } = use(OrderContext);
    const router = useRouter();

    async function handleDetailOrder(order_id: string){
        await onRequestOpen(order_id);
    }

    function atualizaPedidos(){
        router.refresh();
        toast.success("Pedidos atualizados")
    }

    return(
        <>
            <main className="max-w-[720px] my-6 mx-auto px-4 flex justify-between flex-col">
                <section className="flex items-center gap-3 mb-4 mt-6">
                    <h1 className='text-[var(--white)] font-bold text-xl'>Últimos pedidos</h1>
                    <button type="button" onClick={atualizaPedidos}>
                        <RefreshCcw size={24} color='#3fffa3'/>
                    </button>
                </section>

                <section className='flex flex-col gap-4'>
                    {orders.length === 0 && (
                        <span className='text-[var(--gray-100)] font-bold'>Nenhum pedido aberto no momento...</span>
                    )}

                    {orders.map(order => (
                        <button
                            key={order.id}
                            type='button' 
                            className='flex bg-[var(--dark-900)] items-center text-lg rounded-lg text-[var(--white)] hover:brightness-125 duration-200'
                            onClick={ () => handleDetailOrder(order.id)}
                        >
                            <div className='w-2 bg-[var(--green-900)] h-16 rounded-s-lg mr-4'></div>
                            <span>Mesa: {order.table}</span>
                        </button>
                    ))}
                </section>
            </main>
            
            { isOpen && <ModalOrder/> }
        </>
    )
}