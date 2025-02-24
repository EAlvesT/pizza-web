import { cookies } from "next/headers";

export async function getCoookieServer(){
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    return token || null;
}