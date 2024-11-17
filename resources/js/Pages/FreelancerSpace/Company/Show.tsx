import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import useRoute from "@/Hooks/useRoute";
import { Separator } from "@/components/ui/separator";
import { CompanyLinks, CompanyTags } from "./CompaniesTable";

type Props = {
  company: App.Http.Resources.CompanyResource;
};

function ComponyHeader({ company }: Props) {
  return (
    <div className="flex gap-1">
      <CompanyLinks company={company} />
      <div className="pr-2">
        <Separator orientation="vertical" className="" />
      </div>
      <CompanyTags company={company} />
    </div>
  );
}

function Show({ company }: Props) {
  const route = useRoute();

  const appLayoutRoute = { name: company.name, url: route("freelancer-space.company.index") };
  const appLayoutSubRoute = { name: company.name, url: route("freelancer-space.company.show", [company.id]) };
  return (
    <AppLayout pageTitle={company.name} subRoute={appLayoutSubRoute} route={appLayoutRoute} pageDescription={<ComponyHeader company={company} />}>
      <div>{JSON.stringify(company, null, 2)}</div>
    </AppLayout>
  );
}

export default Show;
