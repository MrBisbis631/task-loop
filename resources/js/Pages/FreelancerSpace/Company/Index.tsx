import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { router } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import { Label } from "@/components/ui/label";
import ResourceCollectionTable from "@/components/table/table";
import { columns } from "./CompaniesTableColumns";

type Props = {
  companies: App.ResourceCollection<App.Http.Resources.CompanyResource>;
  query?: string;
  onlyActive?: boolean;
};

export default function Company({ companies, query, onlyActive }: Props) {
  const [search, setSearch] = useState(query);
  const [onlyActiveCheckbox, setOnlyActiveCheckbox] = useState(onlyActive ?? false);

  const [debouncedSearch, _] = useDebounceValue(search, 200);
  useEffect(() => {
    if (debouncedSearch !== query || onlyActive !== onlyActiveCheckbox) {
      router.visit("", {
        method: "get",
        preserveState: true,
        replace: true,
        data: { query: debouncedSearch, onlyActive: onlyActiveCheckbox, page: 1 },
      });
    }
  }, [debouncedSearch, onlyActiveCheckbox]);

  return (
    <div>
      <div className="">
        <label className="block mb-2 relative md:max-w-sm group">
          <MagnifyingGlassIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground group-has-[:focus-visible]:text-slate-700" />
          <Input type="search" placeholder="Search" className="pl-7" value={search} onChange={e => setSearch(e.target.value)} />
        </label>
        <div className="flex gap-2 items-center ">
          <Checkbox id="onlyActive" name="onlyActive" checked={onlyActiveCheckbox} onChange={e => setOnlyActiveCheckbox(e.target.checked)} />
          <Label className="text-muted-foreground" htmlFor="onlyActive">
            Show only active companies.
          </Label>
        </div>
      </div>
      <ResourceCollectionTable {...companies} columns={columns} resourceName="companies" />
    </div>
  );
}
