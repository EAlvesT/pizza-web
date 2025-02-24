import { Form } from "./components/form";
import { api } from '@/services/api'
import { getCoookieServer } from '@/lib/cookieServer'

export default async function Product(){
    const token = await getCoookieServer();

    const response = await api.get("/category", {
        headers:{
            Authorization: `Bearer ${token} `
        }
    })

    return(
        <Form categories={response.data}/>
    )
}