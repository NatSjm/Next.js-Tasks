"use server";
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

const supabase = createClient();

export default async function deleteTodo(todoId: number) {

    if (!todoId) {
        return;
    }

    const {data, error} = await supabase
        .from("todos")
        .delete()
        .eq("id", todoId);


    if (error) {
        console.error("Error deleting todo:", error);
        return;
    }

    revalidatePath("/todo");
}
