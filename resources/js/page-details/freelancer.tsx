import { Separator } from "@/components/ui/separator";
import { CompanyLinks, CompanyTags } from "@/Pages/FreelancerSpace/Company/CompaniesTable";
import React from "react";

export default {
  "freelancer-space.external-api-details.index": {
    head: "External API Details",
    title: () => <span>External API Details</span>,
    description: () => <span>Manage your external API details.</span>,
    getRoute: () => ({
      name: "External API Details",
      url: "freelancer-space.external-api-details.index",
    }),
    canAccess: user => user.role === "freelancer" || user.role === "admin" || user.role === "super-admin",
  },
  "freelancer-space.company.index": {
    head: "Companies",
    title: () => <span>Companies</span>,
    description: () => <span>Manage your companies.</span>,
    getRoute: () => ({
      name: "Companies",
      url: "freelancer-space.company.index",
    }),
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
    getRoute: () => ({
      name: "Company",
      url: "freelancer-space.company.index",
    }),
    getSubroute: ({ company }) => ({ name: company.name, url: ["freelancer-space.company.show", [company.id]] }),
    canAccess: user => user.role === "freelancer" || user.role === "admin" || user.role === "super-admin",
    pageItems: ({ company }) => [
      { name: "See all", url: ["freelancer-space.company.index"] },
      { name: "Details", url: ["freelancer-space.company.show", [company.id]] },
      { name: "Contacts", url: ["freelancer-space.company.company-contact.index", [company.id]] },
    ],
  },
  "freelancer-space.company.company-contact.index": {
    head: "Company Contacts",
    title: ({ company }) => <span>{company.name} Contacts</span>,
    description: () => <span>Manage your company contacts.</span>,
    getRoute: ({ company }) => ({ name: company.name, url: ["freelancer-space.company.show", [company.id]] }),
    getSubroute: ({ company }) => ({
      name: "Company Contacts",
      url: ["freelancer-space.company.company-contact.index", [company.id]],
    }),
    canAccess: user => user.role === "freelancer" || user.role === "admin" || user.role === "super-admin",
    pageItems: ({ company }) => [
      { name: "See all", url: ["freelancer-space.company.index"] },
      { name: "Details", url: ["freelancer-space.company.show", [company.id]] },
      { name: "Contacts", url: ["freelancer-space.company.company-contact.index", [company.id]] },
    ],
  },
} as { [key: string]: Page.PageDetailsBuilder<unknown> };
