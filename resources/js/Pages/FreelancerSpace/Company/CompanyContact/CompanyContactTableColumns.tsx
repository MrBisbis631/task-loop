import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { EmailCell, PhoneCell, TextCell } from "@/components/Cell";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
export const columns: ColumnDef<App.Http.Resources.CompanyContactResource>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: () => "Name",
    accessorFn: col => `${col.first_name} ${col.last_name}`,
    cell: ({ row }) => <TextCell>{`${row.original.first_name} ${row.original.last_name}`}</TextCell>,
  },
  {
    id: "job_title",
    accessorKey: "job_title",
    header: () => "Job Title",
    cell: ({ row }) => <TextCell>{row.original.job_title}</TextCell>,
  },
  {
    id: "email",
    accessorKey: "email",
    header: () => "Email",
    cell: ({ row }) => <EmailCell email={row.original.email} />,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: () => "Phone",
    cell: ({ row }) => <PhoneCell phone_rfc3966={row.original.phone_rfc3966}>{row.original.phone_readable}</PhoneCell>,
  },
  {
    id: "tags",
    accessorKey: "tags",
    header: () => "Tags",
    cell: ({ row }) => <Tags companyContact={row.original} />,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: () => null,
    cell: ({ row }) => <Actions companyContact={row.original} />,
  },
];

function Tags({ companyContact }: { companyContact: App.Http.Resources.CompanyContactResource }) {
  return (
    <div className="gap-1 flex flex-wrap">
      {companyContact.activity_status_readable && <Badge className={cn("text-nowrap", companyContact.activity_status === "active" ? "bg-green-500" : companyContact.activity_status === "inactive" ? "bg-red-500" : companyContact.activity_status === "in_validation" ? "bg-yellow-500" : null)}>{companyContact.activity_status_readable}</Badge>}
      {companyContact.preferred_contact_method_readable && <Badge variant={"outline"}>{companyContact.preferred_contact_method_readable}</Badge>}
    </div>
  );
}

function Actions({ companyContact }: { companyContact: App.Http.Resources.CompanyContactResource }) {
  return (
    <div className="size-6 ml-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="size-6 my-auto">
            <MoreVertical width={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="left" align="start">
          {/* TODO actions */}
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </div>
  );
}
