import React, { useEffect, useState, useRef } from "react";
import ExternApiDetailsCard from "./ExternApiDetailsCard";
import PaginationLinks from "@/components/PaginationLinks";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useDebounceValue } from "usehooks-ts";
import CreateExternalApiDetailsCard from "./CreateExternApiDetailsCard";
import useRoute from "@/Hooks/useRoute";
import { router } from "@inertiajs/react";

type Props = {
  externApiDetails: App.ResourceCollection<App.Http.Resources.ExternApiDetailResource>;
  query: string | null;
};

function Index({ externApiDetails, query }: Props) {
  const route = useRoute();
  const [search, setSearch] = useState(query ?? "");
  const [debouncedSearch, _] = useDebounceValue(search, 200);

  useEffect(() => {
    if (search !== query) {
      router.visit(route("freelancer-space.external-api-details.index"), {
        method: "get",
        only: ["externApiDetails", "query"],
        preserveState: true,
        replace: true,
        data: { query: search, page: 1 },
      });
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col justify-between gap-2 min-h-[calc(100vh-180px)]">
      <div className="">
        <label className="block mb-2 relative md:max-w-sm group">
          <MagnifyingGlassIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground group-has-[:focus-visible]:text-slate-700" />
          <Input type="search" placeholder="Search" className="pl-7" value={search} onChange={e => setSearch(e.target.value)} />
        </label>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <CreateExternalApiDetailsCard />
          {externApiDetails.data.map(externApiDetail => (
            <ExternApiDetailsCard key={externApiDetail.id} externApiDetail={externApiDetail} />
          ))}
        </div>
      </div>
      <PaginationLinks {...externApiDetails} resourceName="externApiDetails" />
    </div>
  );
}

export default Index;
