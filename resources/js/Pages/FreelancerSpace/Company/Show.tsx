import ModelDetails from "@/components/ModelDetails";
import React from "react";

type Props = {
  company: App.Http.Resources.CompanyResource;
};

function Show({ company }: Props) {
  const companyDetails = [
    {
      label: "Default address",
      value: company.address_1,
      link: {
        href: `https://www.google.com/maps/search/?api=1&query=${company.address_1}`,
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "Additional address",
      value: company.address_2,
      link: {
        href: `https://www.google.com/maps/search/?api=1&query=${company.address_2}`,
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "Default phone",
      value: company.phone_1_readable,
      link: {
        href: company.phone_1_rfc3966,
        isInner: false,
        onBlank: false,
      },
    },
    {
      label: "Additional phone",
      value: company.phone_2_readable,
      link: {
        href: company.phone_2_rfc3966,
        isInner: false,
        onBlank: false,
      },
    },
    {
      label: "State",
      value: company.state,
    },
    {
      label: "Zip code",
      value: company.zip_code,
    },
    {
      label: "Preferred payment method",
      value: company.preferred_payment_method_readable,
    },
  ];

  return (
    <div className="">
      <ModelDetails items={companyDetails} />
    </div>
  );
}

export default Show;
