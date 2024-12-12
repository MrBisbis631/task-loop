import React, { useEffect, useRef, useState } from "react";
import { columns } from "./CompanyContactTableColumns";
import ResourceCollectionTable from "@/components/ResourceCollectionTable";
import { useRoute } from "ziggy-js";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type Props = {
  query?: string;
  activityStatus?: string;
  contactMethodEnumAsArray: {
    value: string;
    label: string;
  }[];
  companyContactActivityStatusEnumAsArray: {
    value: string;
    label: string;
  }[];
  company: App.Http.Resources.CompanyResource;
  companyContacts: App.ResourceCollection<App.Http.Resources.CompanyContactResource>;
};

function Index({ companyContactActivityStatusEnumAsArray, contactMethodEnumAsArray, company, companyContacts, query, activityStatus }: Props) {
  const route = useRoute();
  const [search, setSearch] = useState(query ?? "");
  const [debouncedSearch, _] = useDebounceValue(search, 200);

  useEffect(() => {
    if (search !== query) {
      router.visit(route("freelancer-space.company.company-contact.index", [company.id]), {
        method: "get",
        only: ["companyContacts", "query"],
        preserveState: true,
        replace: true,
        data: { query: search, page: 1 },
      });
    }
  }, [debouncedSearch]);
  return (
    <div>
      <label className="block mb-2 relative md:max-w-sm group">
        <MagnifyingGlassIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground group-has-[:focus-visible]:text-slate-700" />
        <Input type="search" placeholder="Search" className="pl-7" value={search} onChange={e => setSearch(e.target.value)} />
      </label>{" "}
      <ResourceCollectionTable {...companyContacts} columns={columns} resourceName="companyContacts" />
    </div>
  );
}

export default Index;