import { Orders } from "./components/orders";
import { api } from "@/services/api";
import { getCoookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type"

export const runtime = "nodejs";

async function getOrders(token: string | null): Promise<OrderProps[] | []>{
    try{
        const response = await api.get("/orders", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return response.data || [];

    }catch(err){
        console.log(err)
        return [];
    }
    
}

export default async function Dashboard(){
    const token = await getCoookieServer();
    const orders = await getOrders(token);

    return(
        <>
            <Orders orders={orders}/>
        </>
    )
}