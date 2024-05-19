"use client";

import { useTransition } from "react";
import {Checkbox} from "@/components/ui/checkbox";
import * as React from "react";
import updateCompleted from "@/actions/updateCompleted";

type Props = {
    id: number;
    completed: boolean;
};

export const CompletedCheckbox: React.FC<Props> = ({ id, completed }) => {
    const [isPending, startTransition] = useTransition();

    const handleChangeCompletedTask = (value: boolean) => {
        if(isPending) return;
        startTransition(async () => {
            await updateCompleted(id, value);
        });
    };

    return (
        <Checkbox
            checked={completed}
            onCheckedChange={handleChangeCompletedTask}
            aria-label="Complete"
        />

    );
};

export default CompletedCheckbox;
