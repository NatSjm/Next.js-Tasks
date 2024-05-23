"use server";
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {getObjectFromFormData} from "@/utils/getObjectFromFormData";

const supabase = createClient();
export default async function addTodo(formData: FormData) {
    const dataObject = getObjectFromFormData(formData);
    const {data, error} = await supabase.from("todos").insert(dataObject);
    if (error) {
        console.error(error);
        return;
    }
    revalidatePath("/todo");
}
