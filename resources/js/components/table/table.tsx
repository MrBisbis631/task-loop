import React from "react";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PaginationLinks from "@/components/PaginationLinks";
import { TooltipProvider } from "@/components/ui/tooltip";

type Props<T> = App.ResourceCollection<T> &
  React.ComponentProps<typeof Table> & {
    columns: ColumnDef<T>[];
    resourceName: string;
  };

export default function CompanyContactTable<T>({ columns, data, meta, resourceName, ...props }: Props<T>) {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TooltipProvider>
      <Table {...props}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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

        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className="flex items-baseline justify-between">
                <span>
                  {data.length} of {meta?.total} row(s) selected.
                </span>
                <PaginationLinks resourceName={resourceName} meta={meta} compact />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TooltipProvider>
  );
}
