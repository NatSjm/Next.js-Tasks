"use client";

import deleteTodo from "@/actions/deleteTodo";
import {useTransition} from "react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

type Props = {
    id: number;
};

export const DeleteTaskMenuItem: React.FC<Props> = ({id}) => {
    const [isPending, startTransition] = useTransition();

    const handleDeleteTask = (id: number) => {
        if (isPending) return;
        startTransition(async () => {
            await deleteTodo(id);
        });
    };

    return (
        <DropdownMenuItem
            onClick={() => handleDeleteTask(id)}
        >Delete</DropdownMenuItem>

    );
};

export default DeleteTaskMenuItem;
