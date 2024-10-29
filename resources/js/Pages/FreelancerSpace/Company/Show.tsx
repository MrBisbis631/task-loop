import AppLayout from "@/Layouts/AppLayout";
import React from "react";

type Props = {
  company: App.Http.Resources.CompanyResource;
};

function Show({ company }: Props) {
  return (
    <AppLayout title="Company">
      <div>
        {JSON.stringify(company, null, 2)}
      </div>
    </AppLayout>
  );
}

export default Show;