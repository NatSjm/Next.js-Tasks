"use client"
import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table"

import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Form from "@/components/Form";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div>
            <div className="flex items-center gap-4 py-4">

                <Popover>
                    <div className="flex gap-1 items-center">
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !(table.getColumn("deadline")?.getFilterValue()) && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {(table.getColumn("deadline")?.getFilterValue() as string) ?? 'Pick a date'}
                            </Button>

                        </PopoverTrigger>
                        <Button onClick={(() => table.getColumn("deadline")?.setFilterValue(undefined))}
                                className="px-2 " variant={'secondary'} size={'sm'}>Clear</Button>
                    </div>

                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={table.getColumn("deadline")?.getFilterValue() ? new Date(table.getColumn("deadline")?.getFilterValue() as string) : undefined}
                            onSelect={(value:  Date | undefined) => {
                                table.getColumn("deadline")?.setFilterValue(value ? format(value, "yyyy-MM-dd") : undefined)
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <Select value={(table.getColumn("priority")?.getFilterValue() as string) ?? ""}
                        onValueChange={(value: string) => {
                            //the Select does not let assign nullish value here
                            if(value === "All") value = ""
                            table.getColumn("priority")?.setFilterValue(value)
                        }
                        }>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Priority"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"All"}>All</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                </Select>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="ml-auto">Add new</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add new task</DialogTitle>
                        </DialogHeader>

                        <Form
                        />
                        <DialogClose asChild>
                            <button id="close-new" hidden type="button">close</button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
