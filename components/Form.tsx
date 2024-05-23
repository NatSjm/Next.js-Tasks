import * as React from "react";
import {Task} from "@/components/columns";
import addTodo from "@/actions/addTodo";
import updateTodo from "@/actions/updateTodo";


interface FormProps {
    task?: Task;
}

const Form = ({task}: FormProps) => {
    const dialogClose = () => {
        const closeId = task ? 'close' : 'close-new';
        document.getElementById(closeId)?.click();
    };
    return (
        <form className="flex flex-col space-y-4 w-full p-4" action={task ? updateTodo : addTodo}
              onSubmit={() => dialogClose()}>
            <input id="id" name="id" type="hidden" defaultValue={task?.id}/>
            <div className="flex items-center space-x-4">
                <label htmlFor="name" className="w-1/3 text-left">Name</label>
                <input id="name" required name="name" defaultValue={task?.name} autoComplete="off"
                       className="border-2 border-gray-300 p-2 rounded-md w-[260px] !ml-0 flex-grow focus:border-gray-300 focus:outline-none"
                       type="text" placeholder="Name"/>
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="description" className="w-1/3 text-left">Description</label>
                <input id="description" name="description" defaultValue={task?.description} autoComplete="off"
                       className="border-2 border-gray-300 p-2 w-[260px] !ml-0 rounded-md flex-grow focus:border-gray-300 focus:outline-none"
                       type="text" placeholder="Description"/>
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="priority" className="w-1/3 text-left">Priority</label>
                <select id="priority" name="priority" defaultValue={task?.priority}
                        className="border-2 border-gray-300 p-2 rounded-md flex-grow focus:border-gray-300 focus:outline-none w-[260px] !ml-0">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="deadline" className="w-1/3 text-left">Deadline</label>
                <input id="deadline" name="deadline" defaultValue={task?.deadline}
                       className="border-2 border-gray-300 p-2 rounded-md flex-grow focus:border-gray-300 focus:outline-none w-[260px] !ml-0"
                       type="date"/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
                    type="submit">
                {task ? 'Update' : 'Submit'}
            </button>
        </form>
    )
};
export default Form;