"use server";
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

const supabase = createClient();

export default async function updateCompleted(id: number, completed: boolean) {

    const {data, error} = await supabase
        .from('todos')
        .update({completed})
        .eq('id', id)
        .select()

    if (error) {
        console.error("Error deleting todo:", error);
        return;
    }

    revalidatePath("/todo");
}
