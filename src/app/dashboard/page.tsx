import { Orders } from "./components/orders";
import { api } from "@/services/api";
import { getCoookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type"

const token = await getCoookieServer();

async function getOrders(): Promise<OrderProps[] | []>{
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
    const orders = await getOrders();

    

    return(
        <>
            <Orders orders={orders}/>
        </>
    )
}

export const runtime = "nodejs";