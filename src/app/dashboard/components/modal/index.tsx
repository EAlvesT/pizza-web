"use client"

import { X } from 'lucide-react';
import { OrderContext } from "@/providers/order";
import { use } from 'react';
import { calculateTotalOrder } from '@/lib/helper';
import Image from 'next/image';

export function ModalOrder() {
    const { onRequestClose, order, finishOrder } = use(OrderContext);
    const orderDetail = order[0];

    async function handleFinishOrder() {
        await finishOrder(orderDetail.order.id)
    }

    return (
        <dialog className="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.50)] z-40 overflow-auto flex items-center justify-center px-4 backdrop-blur-sm">
            <section className="bg-[var(--dark-700)] my-auto p-4 rounded-lg w-full max-w-[600px] relative text-[var(--white)] max-h-[87%] overflow-y-auto">
                <button
                    type='button'
                    onClick={onRequestClose}
                >
                    <X size={40} color='#ff3f4b' />
                </button>

                <article>
                    <h2 className='font-bold text-2xl mb-4 mt-2'>Detalhes do pedido</h2>

                    <span className='bg-[var(--dark-900)] p-2 rounded-md'>
                        Mesa <b>{orderDetail.order.table}</b>
                    </span>

                    {orderDetail.order?.name && (
                        <span className='p-2 rounded-md ml-4'>
                            <b>{orderDetail.order.name}</b>
                        </span>
                    )}

                    {order.map(item => (
                        <section
                            className='flex flex-col my-4 text-lg'
                            key={item.id}
                        >
                            <Image
                                alt='Imagem produto'
                                src={item.product.banner}
                                width={120}
                                height={120}
                            />
                            <span>
                                Qtd: {item.amount} - <b>{item.product.name}</b> - R$ {parseFloat(item.product.price) * item.amount}
                            </span>
                            <span
                                className='text-[#ccc] mt-1'
                            >{item.product.description}</span>
                        </section>
                    ))}

                    <h3 className='mt-2 mb-4 font-bold text-xl'>Valor total: R$ {calculateTotalOrder(order)}</h3>

                    <button
                        className='bg-[var(--green-900)] p-2 rounded-md font-bold text-black'
                        type='button'
                        onClick={handleFinishOrder}
                    >
                        Concluir pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}