import { Separator } from "@/components/ui/separator";
import { CompanyLinks, CompanyTags } from "@/Pages/FreelancerSpace/Company/CompaniesTable";
import React from "react";

export default {
  "freelancer-space.external-api-details.index": {
    head: "External API Details",
    title: () => <span>External API Details</span>,
    description: () => <span>Manage your external API details.</span>,
    route: {
      name: "External API Details",
      routeName: "freelancer-space.external-api-details.index",
    },
    canAccess: user => user.role === "freelancer" || user.role === "admin" || user.role === "super-admin",
  },
  "freelancer-space.company.index": {
    head: "Companies",
    title: () => <span>Companies</span>,
    description: () => <span>Manage your companies.</span>,
    route: {
      name: "Companies",
      routeName: "freelancer-space.company.index",
    },
    canAccess: user => user.role === "freelancer" || user.role === "admin" || user.role === "super-admin",
  },
  "freelancer-space.company.show": {
    head: "Company",
    title: ({ company }) => <span>{company.name}</span>,
    description: ({ company }) => (
      <div className="flex gap-1">
        {company.linkedin_url || company.linkedin_url || company.website_url ? (
          <>
            <CompanyLinks company={company} />
            <div className="pr-2">
              <Separator orientation="vertical" className="" />
            </div>
          </>
        ) : null}
        <CompanyTags company={company} />
      </div>
    ),
    route: {
      name: "Company",
      routeName: "freelancer-space.company.index",
    },
    getSubroute: ({ company }) => ({ name: company.name, url: ["freelancer-space.company.show", [company.id]] }),
    canAccess: user => user.role === "freelancer" || user.role === "admin" || user.role === "super-admin",
    pageItems: ({ company }) => [{ name: "Details", url: ["freelancer-space.company.show", [company.id]], isActive: true }],
  },
} as { [key: string]: Page.PageDetailsBuilder<unknown> };
