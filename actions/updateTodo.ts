"use server";
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

const supabase = createClient();
export default async function addTodo(formData: FormData) {
    if (!formData) return;
    const {id, ...dataObject} = Object.fromEntries(Array.from(formData.entries()).filter(([key, value]) => value && value.toString().trim() !== ''));
    const {data, error} = await supabase
        .from('todos')
        .update(dataObject)
        .eq('id', id)
        .select()

    if (error) {
        console.error(error);
        return;
    }
    revalidatePath("/todo");
}
