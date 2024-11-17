import React from "react";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PaginationLinks from "@/components/PaginationLinks";
import { Link } from "@inertiajs/react";
import { Ziggy } from "@/ziggy";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstagramLogoIcon, LinkedInLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Flag from "react-flagkit";
import useRoute from "@/Hooks/useRoute";

type Props = App.ResourceCollection<App.Http.Resources.CompanyResource> & React.ComponentProps<typeof PaginationLinks>;

export default function CompaniesTable(props: Props) {
  const table = useReactTable<App.Http.Resources.CompanyResource>({
    data: props.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="">
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
                {props.data.length} of {props.meta?.total} row(s) selected.
              </span>
              <PaginationLinks {...props} compact />
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

const columns: ColumnDef<App.Http.Resources.CompanyResource>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: () => <span className="ml-4">Name</span>,
    accessorFn: col => col.name,
    cell: ({ row }) => {
      const route = useRoute();
      return (
        <Button variant={"link"} className="block truncate max-w-56">
          <Link href={route("freelancer-space.company.show", [row.original.id])}>{row.original.name}</Link>
        </Button>
      );
    },
  },
  {
    id: "phone",
    accessorKey: "phone_1",
    header: () => <span className="ml-4">Phone</span>,
    accessorFn: col => col.phone_1,
    cell: ({ row }) => (
      <Button variant={"link"} className="block truncate max-w-56">
        <a href={row.original.phone_1_rfc3966}>{row.original.phone_1_readable}</a>
      </Button>
    ),
  },
  {
    id: "address",
    accessorKey: "address_1",
    header: () => <span className="ml-4">Address</span>,
    accessorFn: col => col.address_1,
    cell: ({ row }) => (
      <Button variant={"link"} className="block truncate max-w-56">
        <a href={`https://www.google.com/maps/search/?api=1&query=${row.original.address_1}`}>{row.original.address_1}</a>
      </Button>
    ),
  },
  {
    id: "links",
    header: () => <span className="ml-2">Links</span>,
    cell: ({ row }) => <CompanyLinks company={row.original} />,
  },
  {
    id: "tags",
    header: "Tags",
    cell: ({ row }) => <CompanyTags company={row.original} />,
  },
];

type CompanyTagsProps = {
  company: App.Http.Resources.CompanyResource;
};

export function CompanyTags({ company }: CompanyTagsProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {company.activity_status && <Badge className={cn(company.activity_status === "active" ? "bg-green-500" : "bg-red-500")}>{company.activity_status}</Badge>}
      {company.company_term_readable && <Badge variant={"secondary"}>{company.company_term_readable}</Badge>}
      {company.country && (
        <Badge variant={"outline"} className="space-x-1">
          <span>{company.country}</span>
          <Flag country={company.country} size={14} />
        </Badge>
      )}
    </div>
  );
}

type CompanyLinksProps = {
  company: App.Http.Resources.CompanyResource;
};

export function CompanyLinks({ company }: CompanyLinksProps) {
  return (
    <div className="">
      {company.website_url && (
        <Button variant={"ghost"} className="size-6">
          <a href={company.website_url}>
            <GlobeIcon className="inline-block w-4 h-4" />
          </a>
        </Button>
      )}
      {company.instagram_url && (
        <Button variant={"ghost"} className="size-6">
          <a href={company.instagram_url}>
            <InstagramLogoIcon className="inline-block w-4 h-4" />
          </a>
        </Button>
      )}
      {company.linkedin_url && (
        <Button variant={"ghost"} className="size-6">
          <a href={company.linkedin_url}>
            <LinkedInLogoIcon className="inline-block w-4 h-4" />
          </a>
        </Button>
      )}
    </div>
  );
}
