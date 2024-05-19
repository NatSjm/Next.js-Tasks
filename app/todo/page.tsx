import {createClient} from "@/utils/supabase/server";
import {columns} from "@/components/columns"
import {DataTable} from "@/components/DataTable"
export default async function DemoPage() {
    const supabase = createClient();
    const {data} = await supabase.from("todos").select("id, name, description, deadline, priority, completed");


    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold my-4">Tasks</h1>
            <DataTable columns={columns} data={data || []}/>
        </div>
    )
}