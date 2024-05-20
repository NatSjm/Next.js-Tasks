"use server";
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {getObjectFromFormData} from "@/utils/getObjectFromFormData";

const supabase = createClient();
export default async function addTodo(formData: FormData) {
    const id = formData.get('id');
    const dataObject = getObjectFromFormData(formData);
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
