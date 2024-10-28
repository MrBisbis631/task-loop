import React, { useEffect, useState, useRef } from "react";
import useTypedPage from "@/Hooks/useTypedPage";
import AppLayout from "@/Layouts/AppLayout";
import ExternApiDetailsCard from "./ExternApiDetailsCard";
import PaginationLinks from "@/components/PaginationLinks";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useDebounceValue } from "usehooks-ts";
import { router } from "@inertiajs/react";
import CreateExternalApiDetailsCard from "./CreateExternApiDetailsCard";
import PageTitle from "@/components/PageTitle";

type Props = {
  externApiDetails: App.PaginatedResponse<App.Models.ExternApiDetail>;
  query: string | null;
};

function Index() {
  const {
    props: { externApiDetails, query },
    url,
  } = useTypedPage<Props>();

  const [search, setSearch] = useState(query ?? "");
  const [debouncedSearch, _] = useDebounceValue(search, 400);
  const searchRef = useRef<React.ElementRef<typeof Input>>(null);

  useEffect(() => {
    if (search !== query) {
      router.visit(url, {
        method: "get",
        only: ["externApiDetails", "query"],
        preserveState: true,
        replace: true,
        data: { query: search, page: 1 },
      });
    }
  }, [debouncedSearch]);

  return (
    <AppLayout title="Extern API Details">
      <div className="flex flex-col justify-between gap-2 p-2 min-h-[calc(100vh-80px)]">
        <div className="">
          <PageTitle title="Extern API Details" description="Manage your extern API details." />
          <label className="block mb-2 relative md:max-w-sm group">
            <MagnifyingGlassIcon className="absolute size-4 left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground group-has-[:focus-visible]:text-slate-700" />
            <Input ref={searchRef} type="search" placeholder="Search" className="pl-7" value={search} onChange={e => setSearch(e.target.value)} />
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
    </AppLayout>
  );
}

export default Index;
