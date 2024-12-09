import React from "react";

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
  contacts: App.ResourceCollection<App.Http.Resources.CompanyContactResource>;
};

function Index({ companyContactActivityStatusEnumAsArray, contactMethodEnumAsArray, company, contacts, query, activityStatus }: Props) {
  return <div>Index</div>;
}

export default Index;
