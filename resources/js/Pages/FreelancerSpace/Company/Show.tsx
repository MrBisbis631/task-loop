import DetailsCard from "@/components/DataCard";
import { googleMapsLink } from "@/lib/utils";
import React from "react";
import UpdateGeneralDetailsCompanyForm from "./UpdateGeneralDetailsCompanyForm";
import UpdateContactDetailsCompanyForm from "./UpdateContactDetailsCompanyForm";
import { getName } from "i18n-iso-countries";

type Props = {
  company: App.Http.Resources.CompanyResource;
  companyTypes: { label: string; value: string }[];
};

export default function Show({ company, companyTypes }: Props) {
  return (
    <div className="">
      <div className="flex flex-wrap gap-2">
        <DetailsCard title="General details" description="Company general details" items={getGeneralDetails(company)} actions={<UpdateGeneralDetailsCompanyForm company={company} companyTypes={companyTypes} />} />
        <DetailsCard title="Contact details" description="Company contact and addresses details" items={getContactDetails(company)} actions={<UpdateContactDetailsCompanyForm company={company} />} />
        <DetailsCard title="Payment details" description="Company payment and taxing details" items={getPaymentDetails(company)} />
      </div>
    </div>
  );
}

function getContactDetails(company: App.Http.Resources.CompanyResource) {
  return [
    {
      label: "Email",
      value: company.email,
      link: {
        href: `mailto:${company.email}`,
        isInner: false,
        onBlank: false,
      },
    },
    {
      label: "Address",
      value: company.address_1,
      link: {
        href: googleMapsLink(company.address_1),
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "Phone",
      value: company.phone_1_readable,
      link: {
        href: company.phone_1_rfc3966,
        isInner: false,
        onBlank: false,
      },
    },
    {
      label: "State\\District",
      value: company.state,
    },
    {
      label: "Country",
      value: getName(company.country, "en") || "",
    },
  ];
}

function getPaymentDetails(company: App.Http.Resources.CompanyResource) {
  return [
    {
      label: "Default currency",
      value: company.preferred_currency,
    },
    {
      label: "billing address",
      value: company.billing_address,
      link: {
        href: googleMapsLink(`${getName(company.country, "en") || ""},${company.state},${company.billing_address}`),
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "Tax identification number",
      value: company.tax_identification_number,
    },
    {
      label: "VAT number",
      value: company.vat_number,
    },
    {
      label: "Tax region country",
      value: company.tax_region_country,
    },
    {
      label: "Tax filing category",
      value: company.tax_filing_category,
    },
  ];
}

function getGeneralDetails(company: App.Http.Resources.CompanyResource) {
  return [
    {
      label: "Company name",
      value: company.name,
    },
    {
      label: "Activity status",
      value: company.activity_status,
    },
    {
      label: "Company type",
      value: company.company_type_readable,
    },
    {
      label: "Website",
      value: company.website_url,
      link: {
        href: company.website_url,
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "LinkedIn",
      value: company.linkedin_url,
      link: {
        href: company.linkedin_url,
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "Instagram",
      value: company.instagram_url,
      link: {
        href: company.instagram_url,
        isInner: false,
        onBlank: true,
      },
    },
  ];
}
