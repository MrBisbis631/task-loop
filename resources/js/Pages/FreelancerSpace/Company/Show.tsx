import React from "react";

type Props = {
  company: App.Http.Resources.CompanyResource;
};

function Show({ company }: Props) {
  return <div>{JSON.stringify(company, null, 2)}</div>;
}

export default Show;
