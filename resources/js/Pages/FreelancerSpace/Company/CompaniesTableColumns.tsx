import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstagramLogoIcon, LinkedInLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Flag from "react-flagkit";
import useRoute from "@/Hooks/useRoute";
import { InternalLinkCell, LocationCell, PhoneCell } from "@/components/table/cell";

export const columns: ColumnDef<App.Http.Resources.CompanyResource>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: () => "Name",
    accessorFn: col => col.name,
    cell: ({ row }) => {
      const route = useRoute();
      return <InternalLinkCell href={route("freelancer-space.company.show", [row.original.id])}>{row.original.name}</InternalLinkCell>;
    },
  },
  {
    id: "phone",
    accessorKey: "phone_1",
    header: () => "Phone",
    accessorFn: col => col.phone_1,
    cell: ({ row }) => <PhoneCell phone_rfc3966={row.original.phone_1_rfc3966}>{row.original.phone_1_readable}</PhoneCell>,
  },
  {
    id: "address",
    accessorKey: "address_1",
    header: () => "Address",
    accessorFn: col => col.address_1,
    cell: ({ row }) => <LocationCell location={row.original.address_1}>{row.original.address_1}</LocationCell>,
  },
  {
    id: "links",
    header: () => "Links",
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
